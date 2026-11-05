"""V15 · hoja de cues. Tiempo = instante visual tomado del código de escenas V14 (E.seg/ease) y contrastado con
revision/seq-*.jpg de BASE. 'anchor' = segundos dentro del sonido que deben coincidir con el contacto/ápice.
gain = pico del evento en dBFS ANTES del ducking. pan -1..1 (moderado, |pan|<=0.45).
Uso: python -X utf8 cues.py <salida_dir>  -> biblioteca WAV por cue + sfx-stem-preduck.wav + cues-v15.json
"""
import json, sys, hashlib, os
import numpy as np, soundfile as sf
import sfxlib as L

SR = L.SR
GAIN_OFFSET = float(os.environ.get('SFX_GAIN_OFFSET', '9'))  # dB global sobre toda la hoja (calibrado contra la voz)
# (id, t, anchor, accion visual, sonido, builder, gain_dBFS, pan, variacion)
C = []
def cue(i, t, a, acc, son, fn, g, pan=0.0, var=''):
    C.append(dict(id=i, t=t, anchor=a, accion=acc, sonido=son, fn=fn, gain_db=g, pan=pan, variacion=var))

# 01 · pregunta (0–3.55)
cue('c01', .10, 0, 'aparece plato rojo (ob, ápice ~0.2)', 'clink cerámico', lambda: L.clink(1850, .45, 41), -19, -.35, 'f=1850')
cue('c02', .19, 0, 'aparece plato verde', 'clink cerámico', lambda: L.clink(2180, .45, 42), -20, .35, 'f=2180 (par con c01)')
cue('c03', 1.30, .28, 'entra «¿qué prefieren?» (1.45–1.85)', 'aire pequeño ascendente', lambda: L.air(.45, 700, 3200, 43, shape='in'), -24, 0, 'swell in')
cue('c04', 1.50, 0, 'arco discontinuo se traza plato→plato (1.5–2.3)', 'trazo aireado con paneo L→R', lambda: L.zip_line(.8, 1500, 4500, 44), -25, 'sweep', 'pan -0.4→+0.4')
cue('c05', 2.75, .25, 'arco cae hacia la hoja (2.75–3.4)', 'aire descendente', lambda: L.air(.6, 3000, 900, 45, shape='swell'), -24, 0, '')
cue('c06', 3.05, .0, 'hoja de ventas se despliega (2.95–3.5, ob)', 'papel desplegándose', lambda: L.paper(.32, 46, 110), -17, 0, 'gap voz 3.27–3.55')
cue('c07', 3.42, 0, 'hoja asienta', 'tap papel/mesa', lambda: L.thud(160, .15, 47), -20, 0, '')
# 02 · conteo (3.55–8.35)
cue('c08', 3.62, 0, 'rótulo «Excel · ventas»', 'tick UI suave', lambda: L.tick(4200, .03, 48, .2), -27, 0, '')
cue('c09', 4.45, .1, 'pedidos salen volando de la hoja', 'aleteo de aire corto', lambda: L.air(.5, 1200, 2600, 49, q=.6), -26, -.15, '')
cue('c10', 4.60, 0, 'cuenta roja 0→80 (pila crece 4.55–5.75)', 'ratchet ascendente 16 clicks', lambda: L.ratchet(16, 1.12, 1500, 2600, 50), -22, -.4, 'grupo rojo: grave→medio')
cue('c11', 5.77, 0, 'pila roja completa (80)', 'cierre de grupo clunk', lambda: L.clunk(196, .22, 51), -19, -.4, 'G3')
cue('c12', 5.55, 0, 'cuenta verde 0→50 (5.55–6.5)', 'ratchet ascendente 10 clicks', lambda: L.ratchet(10, .92, 2000, 3300, 52), -23, .4, 'grupo verde: más agudo, menos clicks')
cue('c13', 6.52, 0, 'pila verde completa (50)', 'cierre de grupo clunk', lambda: L.clunk(247, .2, 53), -19, .4, 'B3 (timbre emparentado)')
cue('c14', 6.62, .05, 'hoja se desvanece (6.6–7.4)', 'roce de papel saliendo', lambda: L.paper(.4, 54, 40), -27, 0, '')
cue('c15', 6.90, 0, 'pila roja avanza: la IA elige «los rojos»', 'golpe de selección + burbuja', lambda: two(L.thud(150, .2, 55), L.bubble(700, 1300, .09, 56) * .6, 0), -21, -.3, '')
# 03 · contó bien / ¿respondió bien? (8.35–11.08)
cue('c16', 8.42, 0, 'pila roja regresa a línea', 'clink suave', lambda: L.clink(1600, .3, 57), -27, -.3, '')
cue('c17', 8.60, 0, '✓ cuenta correcta (círculo ob 8.45–8.85, palomita 8.6)', 'confirmación 2 notas marimba', lambda: two(L.mallet(784, .45, 58), L.mallet(1175, .55, 59), .09), -20, 0, 'G5→D6')
cue('c18', 9.20, 0, 'vínculo «prefieren» se traza (9.2–9.7)', 'zip fino ascendente', lambda: L.zip_line(.5, 1200, 3000, 60), -27, 0, '')
cue('c19', 9.82, 0, 'vínculo se rompe; ? ámbar (9.8–10.3)', 'quiebre seco (díada desafinada)', lambda: L.snap_dry(61), -19, 0, 'contraste, sin alarma')
# 04 · agotados (11.08–13.56)
cue('c20', 11.05, .2, 'corte; pilas se hunden, cámara al verde', 'aire descendente (deflate)', lambda: L.air(.7, 2400, 500, 62, shape='swell'), -21, .15, 'gap 10.76–11.08')
cue('c21', 11.72, 0, 'aparece «3 disponibles hoy»', 'blip verde', lambda: L.blip(1568, .07, 63), -25, .3, 'G6')
cue('c22', 12.00, 0, 'plato verde se vacía (12.0–13.0)', 'indicador que se vacía (descenso)', lambda: L.drain(1.0, 900, 260, 64), -25, .3, '')
cue('c23', 12.44, 0, 'contador 3→2', 'blip descendente', lambda: L.blip(1319, .06, 65), -25, .3, 'E6')
cue('c24', 12.56, 0, 'contador 2→1', 'blip descendente', lambda: L.blip(1047, .06, 66), -25, .3, 'C6')
cue('c25', 13.00, 0, 'contador 1→0: vacío', 'stop limpio (clunk corto)', lambda: L.clunk(130, .14, 67), -21, .3, '')
cue('c26', 13.08, 0, 'sello AGOTADOS (12.95–13.2, contacto)', 'sello de goma', lambda: L.stamp(68), -18, .3, '')
# 05 · cliente cambia elección (13.56–16.44)
cue('c27', 13.62, 0, 'rótulo «cliente» / «quería verdes»', 'burbuja verde', lambda: L.bubble(1100, 1900, .08, 69), -25, 0, '')
cue('c28', 13.75, 0, 'cliente rueda hacia el verde (13.75–14.6)', 'rodado + paneo centro→der', lambda: L.roll(.85, 70), -24, 'sweep:0,.35', '')
cue('c29', 14.66, 0, 'choca con plato vacío (bump 14.6–14.85)', 'golpe hueco (vacío)', lambda: L.clink(820, .3, 71), -19, .35, 'grave y hueco')
cue('c30', 14.80, 0, 'gira y rueda al rojo (14.8–15.8)', 'rodado + paneo der→izq', lambda: L.roll(1.0, 72), -24, 'sweep:.35,-.35', '')
cue('c31', 14.86, 0, 'entra «→ compró rojos»', 'burbuja roja (más grave)', lambda: L.bubble(800, 1300, .08, 73), -25, -.2, '')
cue('c32', 15.78, 0, 'cliente llega al rojo', 'contacto suave', lambda: L.clink(1500, .25, 74), -23, -.35, '')
cue('c33', 15.80, 0, 'ticket se imprime (15.75–16.2)', 'impresora térmica', lambda: L.printer(.36, 34, 75), -21, -.3, 'procedural')
cue('c34', 16.18, 0, 'ticket listo', 'corte de papel', lambda: L.paper(.07, 76, 260), -19, -.3, 'gap 16.24–16.44')
# 06 · dos huellas (16.44–19.97)
cue('c35', 16.50, .2, 'ticket se desliza a la izquierda (16.25–17.1)', 'papel deslizándose L', lambda: L.paper(.55, 77, 50), -24, -.35, '')
cue('c36', 17.08, 0, 'ticket asienta (sólido)', 'tap sólido', lambda: L.thud(190, .14, 78), -22, -.35, '')
cue('c37', 17.22, 0, '«queda en el Excel»', 'tick registro', lambda: two(L.tick(2600, .03, 79, .5), L.tick(3400, .03, 80, .5), .06), -25, -.35, 'par grave-agudo')
cue('c38', 18.25, .15, '1.ª opción se separa a la derecha (18.25–18.95)', 'aire hueco/fantasma R', lambda: L.air(.7, 1800, 4200, 81, q=.5), -24, .4, 'contraste: aire vs papel')
cue('c39', 18.92, 0, 'llega 1.ª opción: preferencia ≠ compra', 'clicks pareados L sólido / R hueco', lambda: None, -21, 'pair', 'estéreo + timbre (legible en mono)')
cue('c40', 19.12, 0, '«no queda registrada» (ámbar)', 'blip hueco descendente', lambda: two(L.blip(880, .06, 82), L.blip(740, .08, 83), .07), -26, .4, '')
# 07 · ventas + disponibilidad (19.97–25.16)
cue('c41', 20.17, 0, 'pilas suben otra vez (20.17–21.07)', 'ratchet doble corto', lambda: L.ratchet(9, .85, 1700, 2900, 84), -25, 0, 'variación de c10/c12')
cue('c42', 20.70, 0, 'números 80/50 «comprados»', 'par de clicks', lambda: two(L.tick(2400, .03, 85), L.tick(3000, .03, 86), .05), -24, 0, '')
cue('c43', 21.95, 0, 'tarjeta disponibilidad (ob 21.8–22.3)', 'impacto ligero + burbuja ámbar', lambda: two(L.thud(170, .18, 87), L.bubble(600, 1000, .1, 88) * .5, 0), -21, 0, '')
cue('c44', 24.12, .25, '«¿qué preferían?» ámbar', 'aire interrogativo ascendente', lambda: L.air(.5, 900, 3000, 89, shape='in'), -25, 0, '')
# 08 · dos preguntas (25.16–32.85)
cue('c45', 25.16, .18, 'corte a negro / «¿Qué vendió más?»', 'swish de transición', lambda: L.air(.3, 4000, 1200, 90, q=.8), -16, 0, 'acento en hueco 24.85–25.16')
cue('c46', 25.90, 0, 'miniBars crecen (25.9–26.7)', 'ratchet par R/L', lambda: L.ratchet(8, .75, 1800, 3000, 91), -24, 'sweep:-.25,.25', '')
cue('c47', 26.95, 0, '✓ «cuenta»', 'confirmación 2 notas (variación de c17)', lambda: two(L.mallet(880, .4, 92), L.mallet(1319, .5, 93), .08), -22, .25, 'A5→E6')
cue('c48', 27.80, 0, 'divisor se traza', 'zip L→R', lambda: L.zip_line(.3, 2500, 5000, 94), -19, 'sweep:-.4,.4', 'hueco 27.75–27.94')
cue('c49', 28.42, 0, 'chip «ventas»', 'slot-in neutro', lambda: two(L.tick(1800, .03, 95, .6), L.clunk(330, .12, 96), .03), -21, 0, 'nota 1')
cue('c50', 29.52, 0, 'chip «+ disponibilidad» (ámbar)', 'slot-in ámbar', lambda: two(L.tick(2200, .03, 97, .6), L.clunk(392, .12, 98), .03), -21, 0, 'nota 2 (sube)')
cue('c51', 31.12, 0, 'chip «+ preguntar a clientes»', 'slot-in ámbar', lambda: two(L.tick(2600, .03, 99, .6), L.clunk(494, .12, 100), .03), -21, 0, 'nota 3 (sube)')
cue('c52', 31.72, 0, '? «respuesta abierta» (ob 31.6–32.0)', 'díada suspendida suave', lambda: two(L.mallet(587, .6, 101, .6), L.mallet(784, .7, 102, .6), .05), -24, 0, 'sin resolver')
cue('c53', 32.02, 0, '«vender más ≠ gustar más»', 'clicks pareados L/R', lambda: None, -24, 'pair', 'eco de c39')
# 09 · frase para copiar (32.85–38.71)
cue('c54', 32.82, .15, 'corte a negro limpio', 'aire suave (exhalación)', lambda: L.air(.45, 2000, 600, 103), -19, 0, 'hueco 32.59–32.85')
cue('c55', 34.80, 0, '«agrega:»', 'tick', lambda: L.tick(3000, .03, 104, .4), -21, 0, 'hueco 34.70–34.81')
cue('c56', 35.42, 0, 'aparece «¿Estos datos responden mi pregunta?»', 'acento limpio (mazo + papel)', lambda: two(L.mallet(523, .5, 105, .5), L.paper(.06, 106, 200) * .4, 0), -18, 0, 'C5; reposo para leer')
cue('c57', 37.36, 0, 'aparece «¿Qué información falta?» (ámbar)', 'acento limpio', lambda: two(L.mallet(659, .5, 107, .5), L.paper(.06, 108, 200) * .4, 0), -18, 0, 'E5 (pregunta 2 sube)')
# 10 · remate (38.71–44.8)
cue('c58', 38.66, .2, 'frase sube y se compacta', 'aire ascendente', lambda: L.air(.6, 800, 3500, 109, shape='in'), -22, 0, '')
cue('c59', 39.45, 0, 'plato verde llega (38.85–39.8, oc)', 'clink cerámico de llegada', lambda: L.clink(1980, .5, 110), -21, 0, 'familia c01/c02')
cue('c60', 40.30, 0, 'Excel aparte (40.2–40.7)', 'papel cae a un lado', lambda: L.paper(.22, 111, 90), -24, -.4, '')
cue('c61', 40.95, 0, 'etiqueta «mi gusto» se clava (ob 40.85–41.3)', 'pin táctil + burbuja verde', lambda: two(L.tick(3600, .03, 112, .8), L.bubble(1100, 1900, .09, 113), .01), -21, .3, '')
cue('c62', 41.55, 0, '«no por Excel.»', 'tick seco', lambda: L.tick(1900, .04, 114, .7), -25, -.2, '')
cue('c63', 42.32, 0, 'remate verde: resolución', 'arpegio marimba verde + clink', lambda: arp([784, 988, 1175, 1568], .085, 115), -15, 0, 'G mayor ascendente; cola a 44.5')


def two(a, b, gap):
    n = max(len(a), int(gap * SR) + len(b)); o = np.zeros(n); o[:len(a)] += a; p = int(gap * SR); o[p:p + len(b)] += b * .9
    return L.norm(o)


def arp(fs, step, seed):
    out = np.zeros(int((step * len(fs) + 2.0) * SR))
    for i, f in enumerate(fs):
        x = L.mallet(f, 1.9 if i == len(fs) - 1 else .9, seed + i) * (.7 + .1 * i); p = int(i * step * SR); out[p:p + len(x)] += x
    c = L.clink(3136, .8, seed + 9) * .18; p = int(step * (len(fs) - 1) * SR); out[p:p + len(c)] += c
    return L.fade(L.norm(out), .001, .4)


def pan_gains(p):
    a = (p + 1) * np.pi / 4; return np.cos(a), np.sin(a)


def place(stem, x, t0, pan):
    n0 = int(round(t0 * SR)); x = x[:max(0, stem.shape[0] - n0)]
    if isinstance(pan, str) and pan.startswith('sweep'):
        a, b = (-.4, .4) if pan == 'sweep' else map(float, pan.split(':')[1].split(','))
        pp = np.linspace(a, b, len(x)); gl, gr = pan_gains(pp)
    else:
        gl, gr = pan_gains(float(pan))
    stem[n0:n0 + len(x), 0] += x * gl; stem[n0:n0 + len(x), 1] += x * gr


def main(outdir, dur=44.8):
    os.makedirs(os.path.join(outdir, 'biblioteca-sfx'), exist_ok=True)
    stem = np.zeros((int(round(dur * SR)), 2)); rec = []
    for c in C:
        g = 10 ** ((c['gain_db'] + GAIN_OFFSET) / 20)
        if c['pan'] == 'pair':  # par legible: L sólido (clunk+tick) / R hueco (blip aireado); distinto timbre, no sólo paneo
            l = two(L.tick(2300, .03, 900, .6), L.clunk(262, .1, 901), .0); b = L.blip(1175, .08, 902); r = L.norm(b + L.air(.08, 3000, 5000, 903)[:len(b)] * .5)
            place(stem, l * g, c['t'], -.35); place(stem, r * g * .85, c['t'] + .07, .35)
            x = two(l, r, .07); c_pan = 'L-.35 / R+.35 (+70 ms)'
        else:
            x = L.norm(c['fn']()) * g; place(stem, x, c['t'] - c['anchor'], c['pan']); x = x / g; c_pan = c['pan']
        f = os.path.join(outdir, 'biblioteca-sfx', f"{c['id']}.wav"); sf.write(f, L.norm(x, .89).astype(np.float32), SR, subtype='PCM_24')
        rec.append(dict(id=c['id'], t_contacto=c['t'], inicio_sonido=round(c['t'] - c['anchor'], 3), anchor_s=c['anchor'], accion=c['accion'], sonido=c['sonido'],
                        ganancia_pico_dBFS_preduck=c['gain_db'] + GAIN_OFFSET, ganancia_hoja_dB=c['gain_db'], offset_global_dB=GAIN_OFFSET, pan=c_pan, variacion=c['variacion'], duracion_s=round(len(x) / SR, 3),
                        origen='procedural (síntesis determinista numpy/scipy, sfxlib.py); no es grabación real', archivo=f"audio/biblioteca-sfx/{c['id']}.wav",
                        sha256=hashlib.sha256(open(f, 'rb').read()).hexdigest()))
    sf.write(os.path.join(outdir, 'stems', 'sfx-v15-preduck.wav'), stem.astype(np.float32), SR, subtype='FLOAT')
    json.dump(rec, open(os.path.join(outdir, 'cues-v15-base.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(len(rec), 'cues; pico stem', 20 * np.log10(np.max(np.abs(stem))))


if __name__ == '__main__':
    main(sys.argv[1])
