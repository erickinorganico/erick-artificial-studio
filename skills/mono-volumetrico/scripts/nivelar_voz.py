"""V14 · nivelación de la voz nueva (toma única ElevenLabs, Erick Inorganico).
No cambia palabras, tempo, pitch ni pausas: sólo ganancia.
1) decodifica MP3 original -> WAV 48 kHz mono float (original intacto)
2) mide loudness integrado BS.1770 por frase (frases = tramos entre pausas medidas con silencedetect -34 dB)
3) ganancia por frase hacia la mediana, limitada a ±4 dB, con rampas de 60 ms en las pausas (no dentro de palabras)
4) compresión suave (ffmpeg acompressor 2:1, umbral -22 dBFS, ataque 15 ms, release 180 ms)
5) loudnorm 2 pasadas lineal a -16 LUFS / TP -1.5 + limitador de seguridad
6) vuelve a medir por frase y global; escribe JSON con antes/después
Uso: python -X utf8 nivelar_voz.py <voz_original> <dir_salida> <json_evidencia> --frases <frases.json> [--pad 2.6]
frases.json = [{id, texto, a, b}] con tiempos de inicio/fin de cada frase medidos en la toma (silencedetect).
"""
import json, subprocess, sys, pathlib, re
import numpy as np, soundfile as sf, pyloudnorm as pyln

SRC, OUT, EV = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]), pathlib.Path(sys.argv[3])
PAD = float(sys.argv[sys.argv.index('--pad') + 1]) if '--pad' in sys.argv else 2.6
OUT.mkdir(parents=True, exist_ok=True); SR = 48000
run = lambda c: subprocess.run(c, capture_output=True, text=True, encoding='utf8', errors='replace')

# frases (texto literal del guion aprobado) en el orden de los tramos de voz medidos
FR = pathlib.Path(sys.argv[sys.argv.index('--frases') + 1]) if '--frases' in sys.argv else pathlib.Path(__file__).parent / 'frases.json'
FRASES = json.loads(FR.read_text(encoding='utf8'))

def decode(src, dst):
    r = run(['ffmpeg', '-v', 'error', '-y', '-i', str(src), '-ar', str(SR), '-ac', '1', '-c:a', 'pcm_f32le', str(dst)]); assert r.returncode == 0, r.stderr

def seg_lufs(x, meter, a, b):
    s = x[int(a * SR):int(b * SR)]
    if len(s) < int(.4 * SR):  # BS.1770 necesita >=400 ms: se rellena con la propia señal en bucle para medir frases cortas
        s = np.tile(s, int(np.ceil(.45 * SR / max(1, len(s)))))
    return float(meter.integrated_loudness(s))

def measure(x):
    m = pyln.Meter(SR); rows = []
    for f in FRASES: rows.append({**f, 'lufs': round(seg_lufs(x, m, f['a'], f['b']), 2), 'peak_dbfs': round(float(20 * np.log10(np.abs(x[int(f['a'] * SR):int(f['b'] * SR)]).max() + 1e-9)), 2)})
    L = [r['lufs'] for r in rows]
    return rows, {'integrado_lufs': round(float(m.integrated_loudness(x)), 2), 'frases_lufs_min': min(L), 'frases_lufs_max': max(L),
                  'frases_rango_db': round(max(L) - min(L), 2), 'frases_desv_std_db': round(float(np.std(L)), 2), 'pico_dbfs': round(float(20 * np.log10(np.abs(x).max())), 2)}

def ebur(path):
    r = run(['ffmpeg', '-hide_banner', '-nostats', '-i', str(path), '-af', 'ebur128=peak=true', '-f', 'null', '-'])
    t = r.stderr[r.stderr.rfind('Summary:'):]
    g = lambda k: float(re.search(k + r':\s*(-?[\d.]+)', t).group(1))
    return {'I_lufs': g(r'I'), 'LRA_lu': g(r'LRA'), 'true_peak_dbtp': g(r'Peak')}

orig_wav = OUT / 'voz-v14-original-48k.wav'; decode(SRC, orig_wav)
x, _ = sf.read(orig_wav, dtype='float64')
before_rows, before = measure(x); before['ebur128'] = ebur(orig_wav)

# 3) ganancia por frase hacia la mediana (sólo corrige desvíos > 0.5 dB), limitada ±4 dB, rampas en pausas
target = float(np.median([r['lufs'] for r in before_rows])); g = np.ones_like(x); gains = []
edges = [0.0] + [(FRASES[i]['b'] + FRASES[i + 1]['a']) / 2 for i in range(len(FRASES) - 1)] + [len(x) / SR]
gain_db = []
for r in before_rows:
    d = target - r['lufs']; d = 0.0 if abs(d) < .5 else float(np.clip(d, -4, 4)); gain_db.append(d)
for i, d in enumerate(gain_db):
    a, b = int(edges[i] * SR), int(edges[i + 1] * SR); g[a:b] = 10 ** (d / 20); gains.append({'frase': FRASES[i]['id'], 'ganancia_db': round(d, 2)})
ramp = int(.06 * SR); k = np.hanning(2 * ramp + 1); k /= k.sum(); g = np.convolve(np.pad(g, ramp, mode='edge'), k, mode='valid')
y = x * g
stage1 = OUT / '_etapa1-ganancia-frases.wav'; sf.write(stage1, y.astype(np.float32), SR, subtype='FLOAT')

# 4) compresión suave + 5) loudnorm 2 pasadas (lineal) + limitador de seguridad y relleno final de silencio (no altera la voz)
comp = 'acompressor=threshold=-22dB:ratio=2:attack=15:release=180:makeup=1:knee=4'
r = run(['ffmpeg', '-hide_banner', '-nostats', '-i', str(stage1), '-af', comp + ',loudnorm=I=-16:TP=-1.5:LRA=7:print_format=json', '-f', 'null', '-'])
js = json.loads(r.stderr[r.stderr.rfind('{'):r.stderr.rfind('}') + 1])
ln = (f"loudnorm=I=-16:TP=-1.5:LRA=7:measured_I={js['input_i']}:measured_TP={js['input_tp']}:measured_LRA={js['input_lra']}"
      f":measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true")
chain = f"{comp},{ln},alimiter=limit=0.82:attack=5:release=60:level=false,apad=pad_dur={PAD}"
lev_wav = OUT / 'voz-v14-nivelada-48k.wav'
r = run(['ffmpeg', '-v', 'error', '-y', '-i', str(stage1), '-af', chain, '-ar', str(SR), '-c:a', 'pcm_s24le', str(lev_wav)]); assert r.returncode == 0, r.stderr
lev_aac = OUT / 'voz-v14-nivelada.m4a'
r = run(['ffmpeg', '-v', 'error', '-y', '-i', str(lev_wav), '-c:a', 'aac', '-b:a', '256k', str(lev_aac)]); assert r.returncode == 0, r.stderr
z, _ = sf.read(lev_wav, dtype='float64'); after_rows, after = measure(z); after['ebur128_wav'] = ebur(lev_wav); after['ebur128_m4a'] = ebur(lev_aac)
after['duracion_s'] = round(len(z) / SR, 3); before['duracion_s'] = round(len(x) / SR, 3)
EV.write_text(json.dumps({'fuente': str(SRC), 'mediana_objetivo_frases_lufs': round(target, 2), 'ganancias_por_frase': gains,
    'cadena_ffmpeg': chain, 'loudnorm_paso1': js, 'antes': before, 'despues': after,
    'por_frase': [{'id': a['id'], 'texto': a['texto'], 'a': a['a'], 'b': a['b'], 'lufs_antes': a['lufs'], 'lufs_despues': b['lufs'], 'pico_despues_dbfs': b['peak_dbfs']}
                  for a, b in zip(before_rows, after_rows)],
    'nota': 'LUFS por frase con BS.1770 (pyloudnorm); frases <400 ms se miden en bucle. Duración de voz intacta; sólo se añade silencio final (apad).'},
    ensure_ascii=False, indent=1), encoding='utf8')
print(json.dumps({'antes': before, 'despues': after}, ensure_ascii=False, indent=1))
