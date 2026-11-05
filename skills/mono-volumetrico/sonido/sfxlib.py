"""V15 · biblioteca de SFX PROCEDURALES (síntesis determinista numpy/scipy, semillas fijas).
No son grabaciones reales. Todas las voces devuelven mono float64 a 48 kHz, pico normalizado a 1.0.
Vocabulario: tick/ratchet (conteo), clink cerámico (platos), papel/impresión/sello (ticket, hoja),
aire/whoosh (movimiento), rodado (cliente), mazo/marimba (confirmación, remate verde), seco/quiebre (duda).
"""
import numpy as np
from scipy.signal import butter, sosfilt

SR = 48000


def _t(d):
    return np.arange(int(round(d * SR))) / SR


def _rng(seed):
    return np.random.default_rng(seed)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], 'bandpass', fs=SR, output='sos'), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, 'highpass', fs=SR, output='sos'), x)


def lp(x, f, order=2):
    return sosfilt(butter(order, f, 'lowpass', fs=SR, output='sos'), x)


def norm(x, peak=1.0):
    m = np.max(np.abs(x)) if len(x) else 0
    return x * (peak / m) if m > 0 else x


def fade(x, a=0.002, r=0.01):
    x = x.copy(); na, nr = int(a * SR), int(r * SR)
    if na: x[:na] *= np.linspace(0, 1, na)
    if nr: x[-nr:] *= np.linspace(1, 0, nr) ** 2
    return x


def env_exp(d, tau):
    return np.exp(-_t(d) / tau)


# ---------- transientes ----------
def tick(f=3200, d=0.035, seed=1, body=0.5):
    """click seco: ráfaga de ruido filtrada + resonancia corta (personalidad táctil)."""
    r = _rng(seed); t = _t(d)
    n = bp(r.standard_normal(len(t)), f * .6, min(f * 1.8, 16000)) * env_exp(d, .0035)
    s = np.sin(2 * np.pi * f * .5 * t) * env_exp(d, .008) * body
    return fade(norm(n + s), .0005, .005)


def ratchet(n, d, f0, f1, seed=1, accel=1.6):
    """n ticks en d s, acelerando y subiendo de tono (conteo, no literal)."""
    out = np.zeros(int((d + .06) * SR)); r = _rng(seed)
    u = np.linspace(0, 1, n) ** (1 / accel)
    for i, ui in enumerate(u):
        k = i / max(n - 1, 1); f = f0 * (f1 / f0) ** k * (1 + r.uniform(-.03, .03))
        x = tick(f, .03, seed + i, body=.35) * (.55 + .45 * k) * r.uniform(.85, 1)
        p = int(ui * d * SR); out[p:p + len(x)] += x[:len(out) - p]
    return norm(out)


def clunk(f=180, d=0.22, seed=3):
    """cierre de grupo: golpe de madera/plástico con cuerpo medio (sin subgrave inútil)."""
    t = _t(d); r = _rng(seed)
    body = sum(a * np.sin(2 * np.pi * f * m * t + r.uniform(0, 6)) * env_exp(d, tau)
               for m, a, tau in [(1, 1, .06), (2.76, .5, .03), (5.4, .25, .012)])
    click = hp(r.standard_normal(len(t)), 2000) * env_exp(d, .002) * .6
    return fade(hp(norm(body + click), 90), .0005, .03)


def clink(f=1850, d=0.5, seed=4):
    """cerámica (plato): parciales inarmónicos brillantes, decaimiento rápido."""
    t = _t(d); r = _rng(seed)
    x = sum(a * np.sin(2 * np.pi * f * m * t) * env_exp(d, tau)
            for m, a, tau in [(1, 1, .12), (2.32, .6, .07), (4.25, .35, .04), (6.1, .2, .025)])
    x += hp(r.standard_normal(len(t)), 3000) * env_exp(d, .0015) * .5
    return fade(norm(x), .0003, .05)


def mallet(f, d=0.6, seed=5, bright=1.0):
    """marimba sintética (barra de madera): fundamental + 4x y 10x, ataque suave."""
    t = _t(d); r = _rng(seed)
    x = (np.sin(2 * np.pi * f * t) * env_exp(d, .22) + .35 * bright * np.sin(2 * np.pi * f * 3.98 * t) * env_exp(d, .05)
         + .12 * bright * np.sin(2 * np.pi * f * 9.9 * t) * env_exp(d, .015))
    x += lp(r.standard_normal(len(t)), 4000) * env_exp(d, .002) * .15
    return fade(norm(x), .001, .08)


def bubble(f0=900, f1=1600, d=0.09, seed=6):
    """pop de burbuja (glissando ascendente corto) para apariciones."""
    t = _t(d); f = np.linspace(f0, f1, len(t)); ph = 2 * np.pi * np.cumsum(f) / SR
    return fade(norm(np.sin(ph) * np.sin(np.pi * t / d) ** .5 * env_exp(d, d / 2.5)), .001, .01)


def snap_dry(seed=7, d=0.16):
    """quiebre seco: chasquido + díada desafinada sorda (contraste, no alarma)."""
    t = _t(d); r = _rng(seed)
    sn = bp(r.standard_normal(len(t)), 1200, 6000) * env_exp(d, .004)
    dy = (np.sin(2 * np.pi * 233 * t) + np.sin(2 * np.pi * 247 * t)) * env_exp(d, .05) * .5
    return fade(hp(norm(sn + dy), 120), .0003, .03)


def thud(f=110, d=0.25, seed=8):
    t = _t(d); r = _rng(seed); f_t = f * (1 + .6 * np.exp(-t / .015))
    x = np.sin(2 * np.pi * np.cumsum(f_t) / SR) * env_exp(d, .07)
    x += lp(r.standard_normal(len(t)), 2500) * env_exp(d, .006) * .5
    return fade(hp(norm(x), 70), .0005, .04)


# ---------- texturas / movimiento ----------
def air(d, f0, f1, seed=9, q=0.9, shape='swell'):
    """whoosh: ruido con banda móvil; shape swell|in|out."""
    r = _rng(seed); n = r.standard_normal(int(d * SR)); out = np.zeros_like(n)
    blk = 480; fc = np.geomspace(f0, f1, len(n) // blk + 1)
    zi = None
    for i in range(0, len(n), blk):
        c = fc[i // blk]; sos = butter(2, [c / (1 + q), min(c * (1 + q), 20000)], 'bandpass', fs=SR, output='sos')
        y = sosfilt(sos, n[i:i + blk]); out[i:i + blk] = y
    u = np.linspace(0, 1, len(n))
    e = {'swell': np.sin(np.pi * u) ** 1.5, 'in': u ** 2 * (1 - u) ** .3 * 2, 'out': (1 - u) ** 2}[shape]
    return fade(norm(lp(out, 12000) * e), .005, .02)


def roll(d, seed=10):
    """rodado de esfera perla: grano fino modulado (sintético)."""
    r = _rng(seed); n = r.standard_normal(int(d * SR))
    g = bp(n, 300, 1800) * (1 + .5 * np.sin(2 * np.pi * 13 * _t(d)))
    u = np.linspace(0, 1, len(n)); e = np.sin(np.pi * u) ** .8
    return fade(norm(g * e), .01, .03)


def paper(d=0.25, seed=11, density=90):
    """papel: crujidos esparcidos 2–7 kHz + roce de banda ancha."""
    r = _rng(seed); out = hp(r.standard_normal(int(d * SR)), 1500) * .25
    for _ in range(int(density * d)):
        p = r.integers(0, len(out) - 400); out[p:p + 400] += tick(r.uniform(2500, 6500), 400 / SR, int(r.integers(1e6)), .1)[:400] * r.uniform(.3, 1)
    u = np.linspace(0, 1, len(out))
    return fade(norm(bp(out, 900, 9000) * np.sin(np.pi * u) ** .6), .004, .03)


def printer(d=0.36, rate=34, seed=12):
    """impresora térmica: tren de ticks + zumbido de motor suave."""
    out = np.zeros(int(d * SR)); r = _rng(seed)
    for i in range(int(d * rate)):
        x = tick(2100 + 300 * (i % 2), .02, seed + i, .3) * r.uniform(.6, 1); p = int(i / rate * SR); out[p:p + len(x)] += x[:len(out) - p]
    buzz = bp(np.sign(np.sin(2 * np.pi * 140 * _t(d))) * 1.0, 300, 2000) * .12
    return fade(norm(out + buzz), .005, .02)


def stamp(seed=13):
    """sello de goma: golpe sordo + palmada de papel."""
    a = thud(140, .22, seed); b = paper(.08, seed + 1, 200)
    out = np.zeros(len(a)); out += a; out[:len(b)] += b * .5
    return norm(out)


def drain(d, f0=900, f1=250, seed=14):
    """indicador que se vacía: tono hueco descendente + aire."""
    t = _t(d); f = np.geomspace(f0, f1, len(t)); ph = 2 * np.pi * np.cumsum(f) / SR
    x = (np.sin(ph) * .5 + .25 * np.sin(2 * ph)) * (1 - np.linspace(0, 1, len(t))) ** .7
    return fade(norm(x + air(d, 2000, 500, seed, shape='out') * .4), .01, .03)


def blip(f, d=0.07, seed=15):
    t = _t(d)
    return fade(norm(np.sin(2 * np.pi * f * t) * env_exp(d, .025) + .2 * np.sin(2 * np.pi * f * 2 * t) * env_exp(d, .01)), .001, .015)


def zip_line(d, f0, f1, seed=16):
    """trazo de línea: aire estrecho con grano de lápiz."""
    r = _rng(seed); g = air(d, f0, f1, seed, q=.35)
    gr = bp(r.standard_normal(len(g)), 3000, 8000) * (r.random(len(g)) > .985) * 3
    return fade(norm(g + gr * np.sin(np.pi * np.linspace(0, 1, len(g)))), .005, .02)
