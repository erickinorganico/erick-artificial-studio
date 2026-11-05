// V14 · «La IA contó bien. ¿Respondió bien?» — escenas nuevas sobre la toma V14 (source/audio_v14/frases.json).
// Color fijo: rojo = chilaquiles rojos, verde = chilaquiles verdes, ámbar ('duda') = información que el Excel no tiene.
window.SCENES = [];
const PL = [-1.6, 0, 0], PRt = [1.6, 0, 0], PRR = 1.0;          // plato rojo (izq) / verde (der): lado fijo todo el video
const HOME = {pos: [0, 10, -15.5], tgt: [0, 1.0, 0], fov: 34};
const camLerp = (E, a, b, u) => E.cam(E.lerp3(a.pos, b.pos, u), E.lerp3(a.tgt, b.tgt, u), E.lerp(a.fov, b.fov, u));
const drift = (c, t, k = 1) => ({pos: [c.pos[0] + Math.sin(t * .35) * .25 * k, c.pos[1], c.pos[2] + t * .05 * k], tgt: c.tgt, fov: c.fov});
const scr = (E, v) => E.P(...v) || {x: 540, y: 960, s: 1};
const HR = 2.4, HV = 2.4 * 50 / 80;                               // alturas proporcionales a 80 / 50
function stacks(E, gR, gV, {alpha = 1, zR = 0} = {}) {
  if (gR > 0) E.ringStack([PL[0], .12, PL[2] + zR], .5, HR * .72, 20, {grow: gR, alpha, color: 'rojos'});
  if (gV > 0) E.ringStack([PRt[0], .12, PRt[2]], .5, HV * .72, 13, {grow: gV, alpha, color: 'verdes'});
}
function counts(E, a, nR = 80, nV = 50, {label = 'vendidos', zR = 0} = {}) {
  if (a <= 0) return;
  const l = scr(E, [PL[0], HR * .72 + .9, PL[2] + zR]), r = scr(E, [PRt[0], HR * .72 + .9, PRt[2]]);
  E.number(l.x, Math.min(l.y, r.y) - 20, String(Math.round(nR)), label, a, {size: 96, color: 'rojos'});
  E.number(r.x, Math.min(l.y, r.y) - 20, String(Math.round(nV)), label, a, {size: 96, color: 'verdes'});
}
function plateLabels(E, a) {
  const l = scr(E, [PL[0], 0, PL[2] - PRR - .5]), r = scr(E, [PRt[0], 0, PRt[2] - PRR - .5]);
  E.label(l.x, l.y + 40, 'rojos', a, {color: 'rojos'}); E.label(r.x, r.y + 40, 'verdes', a, {color: 'verdes'});
}
// hoja de ventas (Excel): papel con cuadrícula y filas marcadas con el color de cada pedido
const sheetContent = (rows = 9, vis = 1) => (ctx, w, h) => {
  ctx.fillStyle = '#d9d8d2'; ctx.fillRect(0, 0, w, h * .14);
  ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 2;
  for (let i = 1; i <= rows; i++) { const y = h * (.14 + i * .86 / rows); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(w * .22, 0); ctx.lineTo(w * .22, h); ctx.stroke();
  ctx.fillStyle = '#111'; ctx.font = `600 ${h * .085}px MonoSans`; ctx.textBaseline = 'middle'; ctx.fillText('salsa', w * .27, h * .07);
  for (let i = 0; i < Math.round(rows * vis); i++) { const y = h * (.14 + (i + .5) * .86 / rows), red = [0, 1, 3, 4, 6, 7].includes(i);
    ctx.fillStyle = red ? '#e5484d' : '#3fb950'; ctx.beginPath(); ctx.arc(w * .11, y, h * .03, 0, 7); ctx.fill();
    ctx.fillStyle = '#9d9c96'; ctx.fillRect(w * .27, y - h * .012, w * (red ? .42 : .5), h * .024); }
};
const SHEET = [0, .02, -3.15];

// 01 · 0–3.55  «Le pregunté a la IA: ¿Qué chilaquiles prefieren mis clientes?»
// dos platos; una pregunta los une (arco); la pregunta se convierte en la hoja de ventas que la IA revisará.
const TOP = {pos: [0, 15, -8.5], tgt: [0, .6, 0], fov: 34};
SCENES.push({t0: 0, t1: 3.546, draw(E, t) {
  E.bg(); camLerp(E, drift(TOP, t), drift(HOME, t), E.ease.ioc(E.seg(t, 0, 3.5)));
  E.floor([0, 0, 0], 7); E.dotPlane({step: 1, extent: 30, size: .06});
  const ap = E.ease.ob(E.seg(t, -.25, .45), 1.15);
  E.plate(PL, PRR * ap, {sauce: 'rojos', seed: 3}); E.plate(PRt, PRR * ap, {sauce: 'verdes', seed: 9});
  plateLabels(E, E.seg(t, .2, .6));
  // arco de la pregunta: de plato a plato, luego cae a la hoja
  const draw = E.ease.ioc(E.seg(t, 1.5, 2.3)), fall = E.ease.ioc(E.seg(t, 2.75, 3.4)), ctx = E.ctx;
  if (draw > 0 && fall < 1) { ctx.save(); ctx.setLineDash([14, 12]); ctx.lineWidth = 4; ctx.strokeStyle = E.css(E.C.INK, .85 * (1 - fall)); ctx.beginPath();
    for (let i = 0; i <= 40 * draw; i++) { const u = i / 40, x = E.lerp(PL[0], PRt[0], u) * (1 - fall), y = (Math.sin(u * Math.PI) * 2.2 + .3) * (1 - fall), z = E.lerp(0, SHEET[2], fall);
      const p = scr(E, [x, y, z]); i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); } ctx.stroke(); ctx.restore(); }
  const sh = E.ease.ob(E.seg(t, 2.95, 3.5), 1.1);
  if (sh > 0) E.ticket(SHEET, 2.2 * sh, 1.3 * sh, [Math.PI / 2, 0, 0], {content: sheetContent(9, 1)});
  E.concept(540, 380, '¿qué prefieren?', E.seg(t, 1.45, 1.85), {size: 104, q: E.seg(t, 3.2, 3.5)});
}});

// 02 · 3.55–8.35  «Revisó mi Excel: ochenta rojos, cincuenta verdes. “Los rojos”, respondió.»
// pedidos salen de la hoja y forman dos pilas; conteo 80/50; la pila roja avanza: la IA la elige.
SCENES.push({t0: 3.546, t1: 8.352, draw(E, t) {
  E.bg(); E.cam(...Object.values(drift(HOME, t)));
  E.floor([0, 0, 0], 7); E.dotPlane({step: 1, extent: 30, size: .06});
  const zR = -.55 * E.ease.ioc(E.seg(t, 6.85, 7.5));
  E.plate([PL[0], 0, zR], PRR, {sauce: 'rojos', seed: 3}); E.plate(PRt, PRR, {sauce: 'verdes', seed: 9});
  const gR = E.ease.ioc(E.seg(t, 4.55, 5.75)), gV = E.ease.ioc(E.seg(t, 5.55, 6.5));
  stacks(E, gR, gV, {zR}); plateLabels(E, 1);
  const out = E.seg(t, 6.6, 7.4);
  E.ticket(SHEET, 2.2, 1.3, [Math.PI / 2, 0, 0], {content: sheetContent(9, 1), alpha: 1 - out});
  // pedidos en vuelo: hoja -> pila de su color
  for (let i = 0; i < 26; i++) { const red = i % 13 < 8, s0 = red ? 4.45 + (i % 13) * .14 : 5.45 + (i % 13 - 8) * .18, u = E.ease.ioc(E.seg(t, s0, s0 + .55));
    if (u <= 0 || u >= 1) continue; const dst = red ? [PL[0], HR * .72 * gR + .3, zR] : [PRt[0], HV * .72 * gV + .3, 0];
    E.sphere([E.lerp(SHEET[0] + (i % 5 - 2) * .3, dst[0], u), E.lerp(.1, dst[1], u) + Math.sin(u * Math.PI) * 1.6, E.lerp(SHEET[2], dst[2], u)], .13, {tone: red ? 'rojos' : 'verdes', shadow: false}); }
  counts(E, E.seg(t, 4.6, 4.9), 80 * gR, 50 * gV, {zR});
  E.label(540, 330, 'Excel · ventas', E.seg(t, 3.6, 3.9) * (1 - E.seg(t, 6.6, 6.85)), {size: 36});
  E.label(540, 300, 'la IA responde', E.seg(t, 6.8, 7.1), {size: 34});
  E.concept(540, 410, '«los rojos»', E.seg(t, 6.85, 7.2), {size: 110, color: 'rojos'});
}});

// 03 · 8.35–11.08  «Contó bien. Pero ¿respondió bien?»  la cuenta queda intacta (✓); se corta el vínculo cuenta→«prefieren».
SCENES.push({t0: 8.352, t1: 11.083, draw(E, t, lt) {
  E.bg(); const H2 = {pos: [0, 10.4, -16.6], tgt: [0, 1.4, 0], fov: 34};
  camLerp(E, drift(HOME, 8.35), drift(H2, lt, .5), E.ease.ioc(E.seg(lt, 0, 2.6)));
  E.floor([0, 0, 0], 7); E.dotPlane({step: 1, extent: 30, size: .06});
  const zR = -.55 * (1 - E.ease.ioc(E.seg(t, 8.4, 9.0)));
  E.plate([PL[0], 0, zR], PRR, {sauce: 'rojos', seed: 3}); E.plate(PRt, PRR, {sauce: 'verdes', seed: 9});
  stacks(E, 1, 1, {zR}); plateLabels(E, 1); counts(E, 1, 80, 50, {zR});
  E.concept(540, 410, '«los rojos»', 1, {size: 110, color: 'rojos', q: E.seg(t, 8.35, 8.6)});
  // ✓ conteo correcto
  const ok = E.ease.ob(E.seg(t, 8.45, 8.85), 1.3), l = scr(E, [0, HR * .72 + .9, 0]);
  if (ok > 0) { E.circle2d(540, l.y - 50, 44 * ok, {lw: 6, color: E.C.INK});
    const c = E.ctx; c.save(); c.strokeStyle = E.C.INK; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(518, l.y - 50); c.lineTo(534, l.y - 34); c.lineTo(563, l.y - 68); c.globalAlpha = E.seg(t, 8.6, 8.8); c.stroke(); c.restore();
    E.label(540, l.y + 30, 'cuenta correcta', E.seg(t, 8.55, 8.9) * (1 - E.seg(t, 9.75, 9.95)), {size: 32}); }
  // vínculo «prefieren» — cuenta: se forma y luego se interrumpe con una duda ámbar
  const link = E.ease.ioc(E.seg(t, 9.2, 9.7)), brk = E.ease.oe(E.seg(t, 9.8, 10.3)), y0 = 470, y1 = l.y - 110, c = E.ctx;
  if (link > 0) { const ym = (y0 + y1) / 2, gap = 70 * brk; c.save(); c.lineWidth = 5; c.strokeStyle = E.C.INK; c.lineCap = 'round';
    c.beginPath(); c.moveTo(540, y0); c.lineTo(540, Math.min(E.lerp(y0, y1, link), ym - gap)); c.stroke();
    if (link > .5) { c.beginPath(); c.moveTo(540, ym + gap); c.lineTo(540, Math.max(ym + gap, E.lerp(y0, y1, link))); c.stroke(); } c.restore();
    if (brk > 0) { E.circle2d(540, ym, 46 * brk, {lw: 6, color: 'duda'}); E.sans(540, ym + 22 * brk, '?', brk, {size: 64 * brk + 1, color: 'duda'}); } }
  E.concept(540, 410, 'prefieren', E.seg(t, 9.15, 9.45), {size: 104, q: E.seg(t, 9.8, 10.0)});
  E.concept(540, 410, '¿preferidos?', E.seg(t, 9.95, 10.3), {size: 104, color: 'duda'});
}});
