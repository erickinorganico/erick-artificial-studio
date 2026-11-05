"""V15 · mezcla: voz V14 EXACTA a ganancia unidad (L=R, sin compresión ni limitador) + stem SFX con ducking
dirigido por la envolvente de la voz y una muesca suave 2–4.5 kHz sólo mientras hay voz.
Uso: python -X utf8 mezclar.py <voz.wav> <sfx-preduck.wav> <cues-base.json> <frases.json> <outdir_audio> <evidencia.json>
"""
import json, sys
import numpy as np, soundfile as sf, pyloudnorm as pyln
from scipy.signal import butter, sosfilt
SR = 48000
DUCK_DB, NOTCH = 6.0, .45          # reducción SFX bajo voz; profundidad de muesca (fracción de banda restada)
TP_MAX = -1.0                      # techo de pico de muestra (sobremuestreo x4) para la mezcla

def smooth(x, att, rel, rate):
    a, r = np.exp(-1 / (att * rate)), np.exp(-1 / (rel * rate)); y = np.zeros_like(x); s = 0.0
    for i, v in enumerate(x):
        c = a if v > s else r; s = c * s + (1 - c) * v; y[i] = s
    return y

def tp(x):
    from scipy.signal import resample_poly
    return 20 * np.log10(np.max(np.abs(resample_poly(x, 4, 1, axis=0))) + 1e-12)

def lufs(m, x):
    try: return round(m.integrated_loudness(x), 2)
    except Exception: return None

def main(vf, sfxf, cuesf, frf, out, evf):
    v, _ = sf.read(vf, dtype='float64'); s, _ = sf.read(sfxf, dtype='float64'); n = len(v); s = s[:n]
    fr = json.load(open(frf, encoding='utf-8')); cues = json.load(open(cuesf, encoding='utf-8'))
    # actividad de voz: RMS 10 ms -> umbral -38 dBFS (pausas medidas -45..-54 dBFS) -> envolvente (ataque 15 ms, relajación 180 ms) con pre-roll 40 ms
    hop = 480; rms = np.sqrt(np.convolve(v ** 2, np.ones(hop) / hop, 'same')) + 1e-9
    act = (20 * np.log10(rms) > -38).astype(float); pre = int(.04 * SR); act = np.maximum(act, np.concatenate([act[pre:], np.zeros(pre)]))
    env = smooth(act[::48], .015, .18, 1000)  # control a 1 kHz (corrección: antes constantes 48x largas)
    env = np.interp(np.arange(n), np.arange(0, n, 48)[:len(env)], env)
    g = 10 ** (-DUCK_DB * env / 20)
    band = sosfilt(butter(2, [2000, 4500], 'bandpass', fs=SR, output='sos'), s, axis=0)
    sd = (s - NOTCH * band * env[:, None]) * g[:, None]
    mix = np.stack([v, v], 1) + sd
    # control de picos SIN limitador: si un tramo supera TP_MAX se baja sólo el SFX de ese tramo (rampa 20 ms)
    fixes = []
    for _ in range(4):
        over = 20 * np.log10(np.max(np.abs(mix), 1) + 1e-12) > TP_MAX - .3
        if not over.any(): break
        idx = np.flatnonzero(over); seg = np.split(idx, np.flatnonzero(np.diff(idx) > SR // 10) + 1)
        for sg in seg:
            a, b = max(0, sg[0] - SR // 20), min(n, sg[-1] + SR // 20); w = np.ones(b - a) * .7
            r = min(960, (b - a) // 2); w[:r] = np.linspace(1, .7, r); w[-r:] = np.linspace(.7, 1, r)
            sd[a:b] *= w[:, None]; fixes.append(round(a / SR, 3))
        mix = np.stack([v, v], 1) + sd
    sf.write(f'{out}/stems/sfx-v15-stem.wav', sd.astype(np.float32), SR, subtype='FLOAT')
    sf.write(f'{out}/stems/mezcla-v15.wav', mix, SR, subtype='PCM_24')
    # ---- mediciones (mismo medidor pyloudnorm BS.1770 para todo) ----
    m = pyln.Meter(SR); vv = np.stack([v, v], 1); mono = mix.mean(1)
    E = dict(medidor='pyloudnorm BS.1770-4 (mismo para V14/V15); estéreo = voz L=R', duck_db=DUCK_DB, muesca_2_4k5=NOTCH, tp_techo=TP_MAX,
             ajustes_pico_sfx_s=sorted(set(fixes)),
             voz_v14_mono=dict(lufs=lufs(m, v), tp_dBTP=round(tp(v), 2)),
             voz_v14_dualmono=dict(lufs=lufs(m, vv), tp_dBTP=round(tp(vv), 2)),
             sfx_stem=dict(lufs=lufs(m, sd), tp_dBTP=round(tp(sd), 2)),
             mezcla_v15=dict(lufs=lufs(m, mix), tp_dBTP=round(tp(mix), 2), muestras_clip=int((np.abs(mix) >= 1).sum())),
             mezcla_suma_mono=dict(lufs=lufs(m, mono), tp_dBTP=round(tp(mono), 2)),
             correlacion_LR=round(float(np.corrcoef(mix[:, 0], mix[:, 1])[0, 1]), 4),
             voz_identica_en_mezcla=bool(np.allclose((mix - sd)[:, 0], v, atol=1e-7)))
    # por frase: voz sola vs mezcla y relación voz/SFX (energía) dentro de la frase
    rows = []
    for f in fr:
        a, b = int(f['a'] * SR), int(f['b'] * SR)
        pv = 10 * np.log10(np.mean(v[a:b] ** 2) + 1e-12); ps = 10 * np.log10(np.mean(sd[a:b].mean(1) ** 2) + 1e-12)
        pm = 10 * np.log10(np.mean(mono[a:b] ** 2) + 1e-12)
        rows.append(dict(id=f['id'], voz_rms_dB=round(pv, 2), mezcla_mono_rms_dB=round(pm, 2), delta_dB=round(pm - pv, 2), voz_sobre_sfx_dB=round(pv - ps, 1)))
    E['frases'] = rows
    E['frase_delta_max_dB'] = max(r['delta_dB'] for r in rows); E['voz_sobre_sfx_min_dB'] = min(r['voz_sobre_sfx_dB'] for r in rows)
    # sincronía: onset (-30 dB del pico local) y ápice de cada cue en el stem final, contra el instante visual
    for c in cues:  # cada sonido aislado (biblioteca) en su posición exacta; ápice/onset medidos, no supuestos
        x, _ = sf.read(c['archivo'].replace('audio/', out + '/', 1), dtype='float64'); x = np.abs(x); pk = x.max()
        on = np.flatnonzero(x > pk * 10 ** (-30 / 20))[0]; ap = int(x.argmax())
        c['onset_medido_s'] = round(c['inicio_sonido'] + on / SR, 3); c['apex_medido_s'] = round(c['inicio_sonido'] + ap / SR, 3)
        c['offset_onset_vs_contacto_ms'] = round((c['onset_medido_s'] - c['t_contacto']) * 1000)
        c['offset_apex_vs_contacto_ms'] = round((c['apex_medido_s'] - c['t_contacto']) * 1000)
        a = int(c['inicio_sonido'] * SR); b = min(n, a + int(c['duracion_s'] * SR))
        c['pico_final_dBFS_tras_duck'] = round(20 * np.log10(np.abs(sd[a:b]).max() + 1e-12), 1)
        c['bajo_voz_pct'] = round(100 * float(env[a:b].mean()), 0)
    # colas: energía de los últimos 30 ms del stem y de la mezcla
    E['cola_final_sfx_dBFS'] = round(20 * np.log10(np.abs(sd[-1440:]).max() + 1e-12), 1)
    E['cola_final_mezcla_dBFS'] = round(20 * np.log10(np.abs(mix[-1440:]).max() + 1e-12), 1)
    json.dump(cues, open(f'{out}/cues-v15.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump(E, open(evf, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(json.dumps({k: E[k] for k in E if k != 'frases'}, ensure_ascii=False))

if __name__ == '__main__':
    main(*sys.argv[1:])
