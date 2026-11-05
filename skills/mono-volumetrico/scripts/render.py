"""Render determinista: escenas.js (Canvas) -> PNG por cuadro (Playwright/Chromium) -> ffmpeg H.264 + audio copiado.

Uso:
  python render.py --project <dir con escenas.js> --out final.mp4 [--audio voz.aac] [--from 0 --to 6] [--fps 30]
  python render.py --project <dir> --stills 1.0,2.5 --stills-dir fotos/
Fuentes: <project>/fonts o <project>/assets/fonts (InstrumentSerif-Italic.ttf, Montserrat-SemiBold.ttf); si faltan, usa del sistema.
Requiere: playwright (chromium) y ffmpeg en PATH. El motor se resuelve relativo a esta skill (../assets).
"""
import argparse, json, pathlib, subprocess, sys, time

SKILL = pathlib.Path(__file__).resolve().parent.parent
W, H = 1080, 1920


def page_html(project: pathlib.Path) -> str:
    fdir = next((d for d in (project / 'fonts', project / 'assets' / 'fonts') if d.is_dir()), None)
    faces = ''
    if fdir:
        for fam, fn in (('MonoSerif', 'InstrumentSerif-Italic.ttf'), ('MonoSans', 'Montserrat-SemiBold.ttf')):
            f = fdir / fn
            if f.exists():
                faces += f"@font-face{{font-family:'{fam}';src:url('{f.as_uri()}');}}\n"
    # orden: presets de la skill -> preset.js del proyecto -> materiales/relieve -> núcleo -> tipo -> escenas
    js = [f.read_text(encoding='utf8') for f in sorted((SKILL / 'presets').glob('*.js'))]
    js += [f.read_text(encoding='utf8') for f in (project / 'preset.js',) if f.exists()]
    js += [(SKILL / 'assets' / n).read_text(encoding='utf8') for n in ('engine-material.js', 'engine-relieve.js', 'engine.js', 'engine-tipo.js')]
    js += [f.read_text(encoding='utf8') for f in sorted(project.glob('escenas*.js'))]
    runner = """
    const cv=document.getElementById('c'),ctx=cv.getContext('2d');const E=extendEngine(createEngine(ctx,%d,%d,window.MONO_PRESET));
    window.renderAt=(t)=>{const S=window.SCENES;let s=S.find(x=>t>=x.t0&&t<x.t1)||S[S.length-1];
      ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.filter='none';s.draw(E,t,t-s.t0,s.t1-s.t0);return true;};
    window.ready=(async()=>{await document.fonts.load("96px MonoSerif");await document.fonts.load("600 84px MonoSans");return document.fonts.check("96px MonoSerif");})();
    """ % (W, H)
    body = ''.join(f'<script>{j}</script>' for j in js)
    return (f"<html><head><style>{faces}html,body{{margin:0;background:#000}}"
            f"body{{font-family:MonoSans}}</style></head><body><canvas id=c width={W} height={H}></canvas>"
            f"<span style='font-family:MonoSerif;position:absolute;left:-999px'>a</span>{body}<script>{runner}</script></body></html>")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--project', required=True); ap.add_argument('--out'); ap.add_argument('--audio')
    ap.add_argument('--fps', type=int, default=30); ap.add_argument('--from', dest='t0', type=float, default=0.0)
    ap.add_argument('--to', dest='t1', type=float); ap.add_argument('--duration', type=float)
    ap.add_argument('--stills'); ap.add_argument('--stills-dir', default='stills'); ap.add_argument('--html-only', action='store_true'); ap.add_argument('--crf', type=int, default=14)
    a = ap.parse_args()
    project = pathlib.Path(a.project).resolve()
    from playwright.sync_api import sync_playwright
    html = project / '_render_page.html'
    html.write_text(page_html(project), encoding='utf8')
    if a.html_only: print(html); return
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--allow-file-access-from-files'])
        pg = b.new_page(viewport={'width': W, 'height': H}, device_scale_factor=1)
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(html.as_uri()); fonts_ok = pg.evaluate('window.ready')
        print('fonts_ok', fonts_ok, file=sys.stderr)
        if a.stills:
            od = pathlib.Path(a.stills_dir); od.mkdir(parents=True, exist_ok=True)
            for t in [float(x) for x in a.stills.split(',')]:
                pg.evaluate(f'renderAt({t})'); pg.screenshot(path=str(od / f't{t:07.3f}.png'), clip={'x': 0, 'y': 0, 'width': W, 'height': H})
        else:
            t1 = a.t1 if a.t1 is not None else (a.duration or pg.evaluate('SCENES[SCENES.length-1].t1'))
            n = round((t1 - a.t0) * a.fps)
            cmd = ['ffmpeg', '-v', 'error', '-y', '-f', 'image2pipe', '-framerate', str(a.fps), '-c:v', 'png', '-i', '-']
            if a.audio: cmd += ['-i', a.audio, '-map', '0:v', '-map', '1:a', '-c:a', 'copy']
            cmd += ['-c:v', 'libx264', '-preset', 'slow', '-crf', str(a.crf), '-pix_fmt', 'yuv420p', '-r', str(a.fps),
                    '-movflags', '+faststart', a.out]
            ff = subprocess.Popen(cmd, stdin=subprocess.PIPE); st = time.time()
            for i in range(n):
                t = a.t0 + i / a.fps
                pg.evaluate(f'renderAt({t})')
                ff.stdin.write(pg.screenshot(type='png', clip={'x': 0, 'y': 0, 'width': W, 'height': H}))
                if i % 150 == 0: print(f'frame {i}/{n} {time.time()-st:.0f}s', file=sys.stderr)
            ff.stdin.close(); rc = ff.wait()
            print(json.dumps({'frames': n, 'fps': a.fps, 'seconds': round(time.time() - st, 1), 'ffmpeg_rc': rc, 'out': a.out}))
        if errs: print('PAGE ERRORS:', errs, file=sys.stderr); sys.exit(2)
        b.close()


if __name__ == '__main__':
    main()
