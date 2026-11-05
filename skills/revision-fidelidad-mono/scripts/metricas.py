"""Métricas de lenguaje visual por muestreo (numpy+PIL+ffmpeg). Aplica los umbrales de SKILL.md §2.
  python metricas.py --video V.mp4 [--ref R.mp4 ...] [--every 0.5] [--out metricas.json]
"""
import argparse, json, subprocess
import numpy as np


def frames(video, every, w=270):
    h = int(w * 1920 / 1080)
    p = subprocess.run(['ffmpeg', '-v', 'error', '-i', video, '-vf', f'fps={1/every},scale={w}:{h}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(p, np.uint8).reshape(-1, h, w, 3).astype(np.float32)


def stats(video, every):
    F = frames(video, every); out = []
    for k, f in enumerate(F):
        lum = f @ np.array([.299, .587, .114]); mx, mn = f.max(2), f.min(2); sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1), 0)
        edge = np.concatenate([lum[:12].ravel(), lum[-12:].ravel(), lum[:, :8].ravel(), lum[:, -8:].ravel()])
        out.append({'t': round(k * every, 2), 'borde_med': float(np.median(edge)), 'blanco_pct': float((lum >= 235).mean() * 100),
                    'negro_pct': float((lum <= 30).mean() * 100), 'sat': float(sat.mean()), 'invertido': bool(np.median(lum) < 30)})
    diffs = [float(np.abs(F[i + 1] - F[i]).mean()) for i in range(len(F) - 1)]
    norm = [o for o in out if not o['invertido']]
    resumen = {'video': video, 'muestras': len(out), 'invertido_pct': round(100 * (len(out) - len(norm)) / len(out), 1),
               'borde_med_p10': round(float(np.percentile([o['borde_med'] for o in norm], 10)), 1), 'blanco_pct_mediana': round(float(np.median([o['blanco_pct'] for o in norm])), 1),
               'sat_media': round(float(np.mean([o['sat'] for o in out])), 4), 'sat_max': round(max(o['sat'] for o in out), 4),
               'muestras_congeladas': sum(d < .15 for d in diffs)}
    resumen['pasa'] = {'fondo': resumen['borde_med_p10'] >= 200, 'inversion<=30%': resumen['invertido_pct'] <= 30,
                       'paleta': resumen['sat_media'] < .05 and resumen['sat_max'] <= .10, 'espacio_negativo': resumen['blanco_pct_mediana'] >= 45}
    return resumen, out


if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('--video', required=True); ap.add_argument('--ref', action='append', default=[])
    ap.add_argument('--every', type=float, default=.5); ap.add_argument('--out'); a = ap.parse_args()
    res = {'propio': stats(a.video, a.every)[0], 'referencias': [stats(r, a.every)[0] for r in a.ref]}
    s = json.dumps(res, ensure_ascii=False, indent=1); print(s)
    if a.out: open(a.out, 'w', encoding='utf8').write(s)
