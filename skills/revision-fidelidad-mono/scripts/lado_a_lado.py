"""Lado a lado a igual escala: filas de referencia y filas propias (evidencia interna; no insertar en el video).
  python lado_a_lado.py --pair R.mp4@12.0=V.mp4@3.6 --pair R2.mp4@54.5=V.mp4@23.9 ... --out lado.jpg [--w 270]
Cada --pair es una columna: arriba la referencia, abajo el cuadro propio, con rótulos de archivo y tiempo.
"""
import argparse, io, pathlib, subprocess
from PIL import Image, ImageDraw, ImageFont


def grab(video, t, w):
    png = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{t:.3f}', '-i', video, '-frames:v', '1', '-vf', f'scale={w}:-2', '-f', 'image2pipe', '-c:v', 'png', '-'],
                         capture_output=True, check=True).stdout
    return Image.open(io.BytesIO(png)).convert('RGB')


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--pair', action='append', required=True)
    ap.add_argument('--w', type=int, default=270); ap.add_argument('--out', required=True); a = ap.parse_args()
    cols = []
    for p in a.pair:
        ref, own = p.split('=')
        (rv, rt), (ov, ot) = ref.rsplit('@', 1), own.rsplit('@', 1)
        cols.append(((pathlib.Path(rv).parent.name or pathlib.Path(rv).stem, float(rt), grab(rv, float(rt), a.w)),
                     (pathlib.Path(ov).stem[:18], float(ot), grab(ov, float(ot), a.w))))
    th = max(max(c[0][2].height, c[1][2].height) for c in cols); lab = 22
    S = Image.new('RGB', (len(cols) * (a.w + 8), 2 * (th + lab) + 8), (60, 60, 60)); d = ImageDraw.Draw(S)
    try: f = ImageFont.truetype('consola.ttf', 15)
    except OSError: f = ImageFont.load_default()
    for i, (r, o) in enumerate(cols):
        x = i * (a.w + 8)
        for j, (name, t, im) in enumerate((r, o)):
            y = j * (th + lab + 8)
            d.text((x + 3, y + 3), f"{'REF' if j == 0 else 'PROPIO'} {name} {t:.1f}s", fill=(255, 210, 90) if j == 0 else (120, 220, 255), font=f)
            S.paste(im, (x, y + lab))
    S.save(a.out, quality=90); print(a.out, S.size)


if __name__ == '__main__':
    main()
