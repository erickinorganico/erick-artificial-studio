// engine.js — núcleo Canvas2D mono-volumétrico v13 (perspectiva propia, determinista, sin dependencias)
// Mundo: y arriba, plano en y=0. Presets de paleta: window.MONO_PRESETS[nombre]; el proyecto elige window.MONO_PRESET.
// Materiales (esfera, plato, vasito, caja, pila de fichas, terreno sombreado) en engine-material.js.
window.MONO_PRESETS = window.MONO_PRESETS || {};
// preset por defecto = lenguaje V12 (fondo blanco, monocromo). Otros presets viven en ../presets/*.js
window.MONO_PRESETS.blanco = {
  dark: false, bg: [[0, '#ffffff'], [.55, '#fafafa'], [1, '#e4e4e4']], ink: '#0b0b0b', ink2: '#6f6f6f', line: '#9a9a9a',
  dot: '120,120,120', paper: ['#ffffff', '#e2e2e2'], paperInk: '#0b0b0b', floor: 0, accents: {rojos: '#0b0b0b', verdes: '#9a9a9a'},
  tile: ['#ffffff', '#0b0b0b'], groundBase: [236, 236, 236], groundLine: '60,60,60',
};
function createEngine(ctx, W, H, presetName) {
  const E = {W, H, ctx};
  const PR = window.MONO_PRESETS[presetName] || window.MONO_PRESETS.blanco; E.PRESET = PR; E.presetName = presetName || 'blanco';
  const BLACK = '#0b0b0b', G1 = '#9a9a9a', G2 = '#bdbdbd', G3 = '#ededed';
  // BLACK = tinta sobre papel; INK = primer plano sobre el fondo del preset; A = acentos semánticos
  E.C = {BLACK, G1, G2, G3, INK: PR.ink, INK2: PR.ink2, LINE: PR.line, A: PR.accents};
  const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  E.cl = cl; E.lerp = (a, b, t) => a + (b - a) * t;
  E.lerp3 = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  E.seg = (t, a, b) => cl((t - a) / (b - a));
  E.ease = {
    ioc: t => (t = cl(t), t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    oc: t => 1 - Math.pow(1 - cl(t), 3),
    ic: t => Math.pow(cl(t), 3),
    oe: t => (t = cl(t), t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    ie: t => (t = cl(t), t <= 0 ? 0 : Math.pow(2, 10 * t - 10)),
    ioe: t => (t = cl(t), t === 0 || t === 1 ? t : t < .5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2),
    ob: (t, s = 1.4) => (t = cl(t) - 1, 1 + (s + 1) * t * t * t + s * t * t),
  };
  E.rng = seed => () => (seed = (seed * 16807) % 2147483647, (seed - 1) / 2147483646);
  // color: hex|rgb[] -> [r,g,b]; mezcla y salida css
  E.rgb = c => Array.isArray(c) ? c : (c = c.replace('#', ''), [0, 2, 4].map(i => parseInt(c.substr(i, 2), 16)));
  E.mix = (a, b, t) => { a = E.rgb(a); b = E.rgb(b); return a.map((v, i) => v + (b[i] - v) * t); };
  E.css = (c, a = 1) => { c = E.rgb(c); return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`; };
  E.accent = name => E.rgb((PR.accents && PR.accents[name]) || name);

  // ---------- cámara ----------
  let cam = null;
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const nrm = a => { const l = Math.hypot(...a) || 1; return a.map(v => v / l); };
  E.v = {sub, dot, crs, nrm};
  E.LIGHT = nrm([-.45, .8, -.4]); // luz clave arriba-izquierda-frente, común a todos los materiales
  E.cam = (pos, target, fov = 40, roll = 0) => {
    const f = nrm(sub(target, pos));
    let up = Math.abs(f[1]) > 0.999 ? [0, 0, 1] : [0, 1, 0];
    let r = nrm(crs(up, f)); let u = crs(f, r);
    if (roll) { const c = Math.cos(roll), s = Math.sin(roll);
      const r2 = r.map((v, i) => v * c + u[i] * s), u2 = u.map((v, i) => u[i] * c - r[i] * s); r = r2; u = u2; }
    cam = {pos, f, r, u, foc: (H / 2) / Math.tan(fov * Math.PI / 360)}; E.camera = cam;
    return cam;
  };
  E.P = (x, y, z) => {
    const d = [x - cam.pos[0], y - cam.pos[1], z - cam.pos[2]];
    const zz = dot(d, cam.f); if (zz < 0.05) return null;
    const s = cam.foc / zz;
    return {x: W / 2 + dot(d, cam.r) * s, y: H / 2 - dot(d, cam.u) * s, s, z: zz};
  };
  const path = (pts, close = true) => { ctx.beginPath(); let ok = false;
    for (const p of pts) { if (!p) continue; ok ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); ok = true; }
    if (close) ctx.closePath(); return ok; };
  E.path = path;
  const circ = (c, r, n = 72, wob = 0, seed = 1, a0 = 0, a1 = Math.PI * 2) => {
    const out = [], R = E.rng(seed), ph = [R() * 6, R() * 6, R() * 6];
    for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n;
      const w = 1 + wob * (Math.sin(a * 3 + ph[0]) * .5 + Math.sin(a * 5 + ph[1]) * .3 + Math.sin(a * 9 + ph[2]) * .2);
      out.push(E.P(c[0] + Math.cos(a) * r * w, c[1], c[2] + Math.sin(a) * r * w)); }
    return out; };
  E.circ = circ;

  // ---------- fondo, suelo y plano ----------
  // invert se conserva por compatibilidad: en presets oscuros el fondo ya es negro y invert sólo apaga el suelo.
  E.bg = (invert = 0) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; ctx.globalCompositeOperation = 'source-over';
    if (invert >= 1 && !PR.dark) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); return; }
    const g = ctx.createRadialGradient(W / 2, H * .46, H * .12, W / 2, H * .5, H * .78);
    PR.bg.forEach(([o, c]) => g.addColorStop(o, c)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    if (invert > 0 && !PR.dark) { ctx.fillStyle = `rgba(0,0,0,${invert})`; ctx.fillRect(0, 0, W, H); }
  };
  // suelo iluminado: mancha elíptica muy tenue bajo la acción (permite leer sombras de contacto sobre negro)
  E.floor = (c = [0, 0, 0], R = 7, {k = 1} = {}) => {
    if (!PR.floor || k <= 0) return; const p0 = E.P(...c); if (!p0) return;
    const pts = circ(c, R, 72).filter(Boolean); if (pts.length < 8) return;
    const rad = Math.max(...pts.map(p => Math.hypot(p.x - p0.x, p.y - p0.y)));
    ctx.save(); ctx.translate(p0.x, p0.y); const sy = Math.max(.12, (Math.max(...pts.map(p => p.y)) - Math.min(...pts.map(p => p.y))) / (2 * rad)); ctx.scale(1, sy);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rad); const f = PR.floor * k;
    g.addColorStop(0, `rgba(255,255,255,${f})`); g.addColorStop(.5, `rgba(255,255,255,${f * .45})`); g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rad, 0, 7); ctx.fill(); ctx.restore();
  };
  E.dotPlane = ({step = 1, extent = 24, y = 0, cx = 0, cz = 0, alpha = 1, far = 60, size = .045, color = PR.dot} = {}) => {
    const n = Math.ceil(extent / step);
    for (let i = -n; i <= n; i++) for (let j = -n; j <= n; j++) {
      const x = cx + i * step - ((cx % step)), z = cz + j * step - ((cz % step));
      const p = E.P(x, y, z); if (!p || p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) continue;
      const a = alpha * cl(1 - p.z / far) * cl((p.z - .5) / 2); if (a <= .01) continue;
      const w = cl(size * p.s, .8, 9);
      ctx.fillStyle = `rgba(${color},${a})`; ctx.fillRect(p.x - w, p.y - w * .35, w * 2, w * .7);
    }
  };
  E.ringOnPlane = (c, r, {lw = 2, color = PR.line, wob = 0, seed = 1, fill = null, n = 96, a0 = 0, a1 = Math.PI * 2, alpha = 1, dash = null} = {}) => {
    const pts = circ(c, r, n, wob, seed, a0, a1); ctx.globalAlpha = alpha;
    const full = a1 - a0 >= Math.PI * 2 - 1e-6;
    if (path(pts, full)) { if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      ctx.setLineDash(dash || []); ctx.lineWidth = lw; ctx.strokeStyle = color; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); ctx.setLineDash([]); }
    ctx.globalAlpha = 1;
  };
  E.contours = (c, {n = 8, r0 = 1, dr = .9, wob = .12, seed = 3, alpha = 1, lw = 1.6} = {}) => {
    for (let k = 0; k < n; k++) E.ringOnPlane(c, r0 + k * dr * (1 + k * .08), {lw: k === 0 ? lw * 1.6 : lw, color: k === 0 ? PR.ink2 : PR.line, wob: wob * (1 + k * .2), seed: seed + k, alpha: alpha * cl(1 - k / (n + 2))});
  };
  // sombra de contacto: núcleo denso + penumbra (oclusión) proyectada en el plano y
  E.shadow = (c, r, {alpha = .28, y = 0, soft = 1} = {}) => {
    const p = E.P(c[0], y, c[2]), q = E.P(c[0] + r, y, c[2]), v = E.P(c[0], y, c[2] + r);
    if (!p || !q || !v) return; const rx = Math.hypot(q.x - p.x, q.y - p.y), ry = Math.max(2, Math.hypot(v.x - p.x, v.y - p.y));
    const A = PR.dark ? cl(alpha * 2.6) : alpha;
    ctx.save(); ctx.translate(p.x, p.y); ctx.scale(1, ry / rx);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * (1 + soft * .6));
    g.addColorStop(0, `rgba(0,0,0,${A})`); g.addColorStop(.45, `rgba(0,0,0,${A * .55})`); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx * (1 + soft * .6), 0, 7); ctx.fill(); ctx.restore();
  };
  E.motionBlur = (dx, dy, n = 6) => {
    if (!E._tmp) { E._tmp = document.createElement('canvas'); E._tmp.width = W; E._tmp.height = H; }
    const tc = E._tmp.getContext('2d'); tc.clearRect(0, 0, W, H); tc.drawImage(ctx.canvas, 0, 0);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    for (let i = 1; i <= n; i++) { ctx.globalAlpha = .5 / i * 1.6 / n * 2; ctx.drawImage(E._tmp, dx * i / n, dy * i / n); }
    ctx.restore(); ctx.globalAlpha = 1;
  };
  if (window.extendMaterials) window.extendMaterials(E);
  if (window.extendRelieve) window.extendRelieve(E);
  return E;
}
if (typeof window !== 'undefined') window.createEngine = createEngine;
