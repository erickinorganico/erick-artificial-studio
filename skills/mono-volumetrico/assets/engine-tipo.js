// engine-tipo.js — papel/tickets en 3D, mosaicos, flechas y tipografía (se aplica después de createEngine)
// v13: colores de primer plano desde el preset (INK sobre fondo, BLACK sobre papel) y acentos semánticos opcionales.
function extendEngine(E) {
  const {ctx, W, H, cl} = E, BLACK = E.C.BLACK, INK = E.C.INK, INK2 = E.C.INK2, PR = E.PRESET;
  const SANS = '"MonoSans", "Segoe UI", Arial, sans-serif', SERIF = '"MonoSerif", Georgia, serif', MONO = 'Consolas, "Courier New", monospace';
  E.F = {SANS, SERIF, MONO};
  const col = c => c == null ? null : (c[0] === '#' || c.startsWith('rgb') ? c : E.css(E.tone(c)));
  E.col = col;
  // ticket de papel en 3D con grosor, degradado de papel y sombra de contacto; content(ctx,w,h) en coords locales (100 px/unidad)
  E.ticket = (c, w, h, rot = [0, 0, 0], {lines = 6, alpha = 1, shadow = true, content = null, lw = 3} = {}) => {
    const [ax, ay, az] = rot;
    const R = v => { let [x, y, z] = v, t;
      t = x * Math.cos(az) - y * Math.sin(az); y = x * Math.sin(az) + y * Math.cos(az); x = t;
      t = y * Math.cos(ax) - z * Math.sin(ax); z = y * Math.sin(ax) + z * Math.cos(ax); y = t;
      t = x * Math.cos(ay) + z * Math.sin(ay); z = -x * Math.sin(ay) + z * Math.cos(ay); x = t; return [c[0] + x, c[1] + y, c[2] + z]; };
    const k = [[-w / 2, h / 2, 0], [w / 2, h / 2, 0], [w / 2, -h / 2, 0], [-w / 2, -h / 2, 0]].map(R).map(v => E.P(...v));
    if (k.some(p => !p)) return;
    ctx.save();
    if (shadow) { ctx.filter = `blur(${cl(k[0].s * .12, 2, 30)}px)`; ctx.globalAlpha = (PR.dark ? .6 : .18) * alpha;
      E.path(k.map(p => ({x: p.x + p.s * .06, y: p.y + p.s * .14}))); ctx.fillStyle = '#000'; ctx.fill(); ctx.filter = 'none'; }
    ctx.globalAlpha = alpha; const th = cl(k[0].s * .035, 1.5, 9);
    E.path(k.map(p => ({x: p.x, y: p.y + th}))); ctx.fillStyle = '#5d5c58'; ctx.fill(); // canto del papel
    E.path(k); const g = ctx.createLinearGradient(k[0].x, k[0].y, k[2].x, k[2].y);
    g.addColorStop(0, PR.paper[0]); g.addColorStop(1, PR.paper[1]); ctx.fillStyle = g; ctx.fill();
    ctx.lineWidth = cl(lw * k[0].s / 240, .8, 3); ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.lineJoin = 'round'; ctx.stroke();
    const U = 100, ax_ = (k[1].x - k[0].x) / (w * U), ay_ = (k[1].y - k[0].y) / (w * U), bx = (k[3].x - k[0].x) / (h * U), by = (k[3].y - k[0].y) / (h * U);
    ctx.transform(ax_, ay_, bx, by, k[0].x, k[0].y);
    if (content) content(ctx, w * U, h * U);
    else { ctx.fillStyle = '#a9a8a2'; for (let i = 0; i < lines; i++) { const yy = h * U * (.18 + i * .7 / lines); ctx.fillRect(w * U * .12, yy, w * U * (i % 3 === 1 ? .5 : .76), h * U * .035); } }
    ctx.restore(); return k;
  };
  // icono de ticket (loseta con grosor) para mosaicos de volumen; dot = color semántico del punto (kind 1)
  E.icon = (x, y, s, rot = 0, {kind = 0, alpha = 1, dot = null} = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = alpha;
    const [tf, fg] = PR.tile;
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.roundRect(-s / 2, -s / 2 + s * .06, s, s, s * .14); ctx.fill();
    const g = ctx.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2); g.addColorStop(0, E.css(E.mix(tf, [255, 255, 255], .12))); g.addColorStop(1, tf);
    ctx.fillStyle = g; ctx.strokeStyle = fg; ctx.lineWidth = Math.max(1.2, s * .05);
    ctx.beginPath(); ctx.roundRect(-s / 2, -s / 2, s, s, s * .14); ctx.fill(); ctx.stroke(); ctx.fillStyle = fg;
    if (kind === 0) for (let i = 0; i < 4; i++) ctx.fillRect(-s * .3, -s * .26 + i * s * .16, s * (i === 3 ? .34 : .6), s * .07);
    else if (kind === 1) { ctx.fillStyle = col(dot) || fg; ctx.beginPath(); ctx.arc(0, 0, s * .26, 0, 7); ctx.fill(); }
    else { ctx.setLineDash([s * .08, s * .07]); ctx.beginPath(); for (let i = 0; i < 3; i++) { const a = -Math.PI / 2 + i * 2.094; ctx[i ? 'lineTo' : 'moveTo'](Math.cos(a) * s * .3, Math.sin(a) * s * .3 + s * .04); } ctx.closePath(); ctx.stroke(); }
    ctx.restore();
  };
  E.iconGrid = ({cell = 96, p = 1, hole = 0, hx = W / 2, hy = H / 2, seed = 5, jitter = .12, zoom = 1, kinds = 3, mark = null, dot = null} = {}) => {
    const R = E.rng(seed), s = cell * zoom, cols = Math.ceil(W / s) + 2, rows = Math.ceil(H / s) + 2;
    for (let j = -1; j < rows; j++) for (let i = -1; i < cols; i++) {
      const x = W / 2 + (i - cols / 2) * s, y = H / 2 + (j - rows / 2) * s, r1 = R(), r2 = R(), r3 = R();
      const d = Math.hypot(x - hx, y - hy); if (d < hole) continue;
      const appear = cl((p * 1.25 - (d / (H * .8)) - r1 * .25) * 5); if (appear <= 0) continue;
      const kind = mark ? mark(i, j, r3) : Math.floor(r3 * kinds);
      E.icon(x + (r2 - .5) * s * jitter, y + (r1 - .5) * s * jitter, s * .72 * E.ease.ob(appear, 1.2), (r2 - .5) * .25 * (1 - appear * .6), {kind, dot: dot ? dot(i, j, r3) : null});
    }
  };
  E.arrow = (a, b, {lw = 5, head = 22, color = INK, p = 1} = {}) => {
    const x = a.x + (b.x - a.x) * p, y = a.y + (b.y - a.y) * p, ang = Math.atan2(y - a.y, x - a.x); color = col(color);
    ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(x - Math.cos(ang) * head * .6, y - Math.sin(ang) * head * .6); ctx.stroke();
    if (p > .05) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - Math.cos(ang - .4) * head, y - Math.sin(ang - .4) * head); ctx.lineTo(x - Math.cos(ang + .4) * head, y - Math.sin(ang + .4) * head); ctx.closePath(); ctx.fill(); }
    ctx.restore();
  };
  // número sans + rótulo mono (color = acento semántico opcional del rótulo)
  E.number = (x, y, str, label = '', a = 1, {size = 84, color = null, labelColor = null} = {}) => {
    if (a <= 0) return; ctx.save(); ctx.globalAlpha = cl(a); ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = col(color) || INK; ctx.font = `600 ${size}px ${SANS}`; ctx.fillText(str, x, y);
    if (label) { ctx.fillStyle = col(labelColor) || INK2; ctx.font = `400 ${Math.max(30, Math.round(size * .36))}px ${MONO}`; ctx.fillText(label, x, y + size * .46); }
    ctx.restore();
  };
  // rótulo mono: mínimo 30 px (antes 24–30) para lectura a tamaño teléfono
  E.label = (x, y, str, a = 1, {size = 34, color = null, align = 'center', weight = 400} = {}) => {
    if (a <= 0) return; ctx.save(); ctx.globalAlpha = cl(a); ctx.textAlign = align; ctx.fillStyle = col(color) || INK2; ctx.font = `${weight} ${Math.max(30, size)}px ${MONO}`; ctx.fillText(str, x, y); ctx.restore();
  };
  // concepto serif itálica: p 0..1 entrada (desenfoque 14→0), q 0..1 salida. glow sólo si se pide (no universal)
  E.concept = (x, y, str, p = 1, {size = 96, glow = false, q = 0, color = null, align = 'center'} = {}) => {
    const a = cl(p) * (1 - cl(q)); if (a <= 0) return; ctx.save();
    const b = (1 - E.ease.oc(p)) * 14 + E.ease.ic(q) * 10; if (b > .3) ctx.filter = `blur(${b.toFixed(1)}px)`;
    ctx.globalAlpha = a; ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.font = `400 ${size}px ${SERIF}`;
    ctx.fillStyle = col(color) || INK;
    if (glow) { ctx.shadowColor = 'rgba(255,255,255,.55)'; ctx.shadowBlur = 18; ctx.fillText(str, x, y); ctx.shadowBlur = 0; }
    ctx.fillText(str, x, y + (1 - E.ease.oc(p)) * 10); ctx.restore();
  };
  E.sans = (x, y, str, a = 1, {size = 56, weight = 600, align = 'center', color = null} = {}) => {
    if (a <= 0) return; ctx.save(); ctx.globalAlpha = cl(a); ctx.textAlign = align; ctx.fillStyle = col(color) || INK; ctx.font = `${weight} ${size}px ${SANS}`; ctx.fillText(str, x, y); ctx.restore();
  };
  E.iris = (x, y, r, color = '#000') => { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), 0, 7); ctx.fill(); };
  E.circle2d = (x, y, r, {lw = 8, color = INK, fill = null, dotR = 0, a = 1, a0 = -Math.PI / 2, sweep = 1, dash = null} = {}) => {
    ctx.save(); ctx.globalAlpha = cl(a); ctx.beginPath(); ctx.arc(x, y, r, a0, a0 + Math.PI * 2 * cl(sweep));
    if (fill) { ctx.fillStyle = col(fill); ctx.fill(); } ctx.setLineDash(dash || []); ctx.lineWidth = lw; ctx.strokeStyle = col(color); ctx.lineCap = 'round'; ctx.stroke();
    if (dotR) { ctx.fillStyle = col(color); ctx.beginPath(); ctx.arc(x, y, dotR, 0, 7); ctx.fill(); } ctx.restore();
  };
  return E;
}
if (typeof window !== 'undefined') window.extendEngine = extendEngine;
