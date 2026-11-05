"""Fondo negro y color semántico por muestreo (preset oscuro).
  python fondo_color.py --video V.mp4 --every 0.5 --out fondo.json
Mide por cuadro: luminancia mediana de una banda de borde de 40 px (fondo), % de píxeles del cuadro con
luminancia > 200 (áreas blancas), % de píxeles rojos y verdes saturados (acentos) y si coexisten.
Sólo mide; no prueba significado: el significado se revisa en la tabla escena→acento del informe."""
import argparse, json, subprocess
import numpy as np
ap = argparse.ArgumentParser(); ap.add_argument('--video'); ap.add_argument('--every', type=float, default=.5); ap.add_argument('--out'); a = ap.parse_args()
W, H = 270, 480
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', a.video, '-vf', f'fps={1/a.every},scale={W}:{H}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True, check=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W, 3).astype(np.float32); rows = []
for i, f in enumerate(fr):
    L = f @ [.2126, .7152, .0722]; b = 10
    border = np.concatenate([L[:b].ravel(), L[-b:].ravel(), L[:, :b].ravel(), L[:, -b:].ravel()])
    r, g, bl = f[..., 0], f[..., 1], f[..., 2]; mx = f.max(-1); mn = f.min(-1); sat = (mx - mn) / np.maximum(mx, 1)
    red = (sat > .45) & (r > 120) & (r > g * 1.6); green = (sat > .45) & (g > 110) & (g > r * 1.4)
    rows.append({'t': round(i * a.every, 2), 'borde_mediana': float(np.median(border)), 'borde_p90': float(np.percentile(border, 90)),
                 'pct_blanco': round(float((L > 200).mean() * 100), 2), 'pct_rojo': round(float(red.mean() * 100), 2), 'pct_verde': round(float(green.mean() * 100), 2)})
bm = [x['borde_mediana'] for x in rows]
summ = {'muestras': len(rows), 'borde_mediana_max': max(bm), 'borde_mediana_p50': float(np.median(bm)),
        'muestras_borde_mediana_gt_40': [x['t'] for x in rows if x['borde_mediana'] > 40],
        'pct_blanco_max': max(x['pct_blanco'] for x in rows), 'muestras_pct_blanco_gt_35': [x['t'] for x in rows if x['pct_blanco'] > 35],
        'muestras_con_acento': sum(1 for x in rows if x['pct_rojo'] + x['pct_verde'] > .05),
        'pct_acento_max': max(x['pct_rojo'] + x['pct_verde'] for x in rows)}
json.dump({'resumen': summ, 'cuadros': rows}, open(a.out, 'w'), indent=1); print(json.dumps(summ, ensure_ascii=False))
