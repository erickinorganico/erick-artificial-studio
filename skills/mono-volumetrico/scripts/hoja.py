"""Hojas de contacto con rótulo de tiempo.
  python hoja.py --images a.png b.png ... --out hoja.jpg [--cols 6 --w 270]
  python hoja.py --video final.mp4 --times 0.5,1.0,... --out hoja.jpg      (extrae con ffmpeg, -ss exacto)
  python hoja.py --video final.mp4 --every 0.333 --from 8 --to 14 --out seq.jpg   (secuencia consecutiva)
"""
import argparse, io, subprocess
from PIL import Image, ImageDraw, ImageFont


def grab(video, t):
    png = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{t:.3f}', '-i', video, '-frames:v', '1', '-f', 'image2pipe', '-c:v', 'png', '-'],
                         capture_output=True, check=True).stdout
    return Image.open(io.BytesIO(png)).convert('RGB')


def sheet(items, cols, w, out):
    th = int(w * 1920 / 1080); rows = (len(items) + cols - 1) // cols
    S = Image.new('RGB', (cols * w, rows * (th + 22)), (48, 48, 56))
    d = ImageDraw.Draw(S)
    try: f = ImageFont.truetype('consola.ttf', 16)
    except OSError: f = ImageFont.load_default()
    for k, (lab, im) in enumerate(items):
        x, y = (k % cols) * w, (k // cols) * (th + 22)
        S.paste(im.resize((w, th)), (x, y + 22)); d.rectangle([x, y, x + w, y + 21], fill=(20, 20, 20)); d.text((x + 4, y + 3), lab, fill=(255, 80, 80), font=f)
    S.save(out, quality=90); print(out, S.size)


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--images', nargs='*'); ap.add_argument('--video'); ap.add_argument('--times')
    ap.add_argument('--every', type=float); ap.add_argument('--from', dest='t0', type=float, default=0); ap.add_argument('--to', dest='t1', type=float)
    ap.add_argument('--cols', type=int, default=6); ap.add_argument('--w', type=int, default=270); ap.add_argument('--out', required=True)
    a = ap.parse_args()
    if a.images:
        items = [(p.replace('\\', '/').split('/')[-1], Image.open(p).convert('RGB')) for p in a.images]
    else:
        ts = [float(x) for x in a.times.split(',')] if a.times else [a.t0 + i * a.every for i in range(int(round((a.t1 - a.t0) / a.every)) + 1)]
        items = [(f'{t:.2f}s', grab(a.video, t)) for t in ts]
    sheet(items, a.cols, a.w, a.out)
