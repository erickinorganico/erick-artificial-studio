// V14 · escenas 08–10: dos preguntas → datos distintos; frase para copiar; remate.
function chip(E, x, y, w, txt, a, {color = null, sub = null, dashed = false} = {}) {
  if (a <= 0) return; const c = E.ctx, s = E.lerp(.85, 1, E.ease.ob(a, 1.3)); c.save(); c.globalAlpha = E.cl(a); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(0,0,0,.75)'; c.filter = 'blur(10px)'; c.fillRect(-w / 2 + 6, -38, w, 92); c.filter = 'none';
  const g = c.createLinearGradient(0, -46, 0, 46); g.addColorStop(0, '#202020'); g.addColorStop(1, '#121212'); c.fillStyle = g;
  c.beginPath(); c.roundRect(-w / 2, -46, w, 92, 18); c.fill(); c.strokeStyle = color ? E.col(color) : 'rgba(242,242,240,.55)'; c.lineWidth = 4;
  c.setLineDash(dashed ? [12, 10] : []); c.stroke(); c.setLineDash([]);
  c.fillStyle = color ? E.col(color) : E.C.INK; c.textAlign = 'center'; c.font = `600 42px ${E.F.SANS}`; c.fillText(txt, 0, 15); c.restore();
}
function miniBars(E, x, y, a) { // 80/50 en relieve (mismo dato, sin recalcular)
  if (a <= 0) return; const c = E.ctx, k = E.ease.ioc(a);
  [['rojos', 80, -70], ['verdes', 50, 70]].forEach(([nm, v, dx]) => { const h = v * 2.4 * k, X = x + dx;
    const g = c.createLinearGradient(X - 40, 0, X + 40, 0); g.addColorStop(0, E.css(E.mix(E.tone(nm), [255, 255, 255], .25))); g.addColorStop(1, E.css(E.mix(E.tone(nm), [0, 0, 0], .45)));
    c.save(); c.globalAlpha = E.cl(a * 2); c.fillStyle = 'rgba(0,0,0,.6)'; c.beginPath(); c.ellipse(X, y + 6, 52, 12, 0, 0, 7); c.fill();
    c.fillStyle = g; c.fillRect(X - 40, y - h, 80, h); c.fillStyle = E.css(E.mix(E.tone(nm), [255, 255, 255], .4)); c.beginPath(); c.ellipse(X, y - h, 40, 10, 0, 0, 7); c.fill(); c.restore();
    E.sans(X, y - h - 26, String(v), E.cl(a * 2), {size: 46, color: nm}); });
}
// 08 · 25.16–32.85  «Si quieres saber qué vendió más, cuenta las ventas. Si quieres conocer preferencias, revisa también qué había disponible y pregunta a los clientes.»
SCENES.push({t0: 25.164, t1: 32.854, draw(E, t, lt) {
  E.bg(); const z = 1 + lt * .006; const c = E.ctx; c.save(); c.translate(540, 960); c.scale(z, z); c.translate(-540, -960);
  // pregunta 1 (arriba): se responde con el conteo
  const a1 = E.seg(t, 25.2, 25.55), dim1 = 1 - .45 * E.seg(t, 27.9, 28.3);
  c.globalAlpha = 1; E.sans(540, 250, '¿Qué vendió más?', a1 * dim1, {size: 64});
  miniBars(E, 470, 640, E.seg(t, 25.9, 26.7) * dim1); // r2: sin 1,7 s de texto solo
  const ok = E.seg(t, 26.9, 27.2) * dim1;
  if (ok > 0) { E.circle2d(760, 560, 40, {lw: 6, color: E.C.INK, a: ok}); c.save(); c.globalAlpha = ok; c.strokeStyle = E.C.INK; c.lineWidth = 8; c.lineCap = 'round';
    c.beginPath(); c.moveTo(740, 560); c.lineTo(755, 575); c.lineTo(782, 543); c.stroke(); c.restore(); E.label(760, 640, 'cuenta', ok, {size: 32}); }
  E.label(540, 720, 'basta con contar ventas', E.seg(t, 27.25, 27.55) * dim1, {size: 32});
  // divisor
  c.save(); c.globalAlpha = E.seg(t, 27.8, 28.1); c.strokeStyle = 'rgba(242,242,240,.25)'; c.lineWidth = 2; c.beginPath(); c.moveTo(160, 820); c.lineTo(920, 820); c.stroke(); c.restore();
  // pregunta 2 (abajo): pide más datos; la respuesta queda abierta
  E.sans(540, 950, '¿Qué prefieren?', E.seg(t, 27.95, 28.3), {size: 64});
  chip(E, 540, 1080, 420, 'ventas', E.seg(t, 28.4, 28.75));
  chip(E, 540, 1200, 520, '+ disponibilidad', E.seg(t, 29.5, 29.85), {color: 'duda'});
  chip(E, 540, 1320, 640, '+ preguntar a clientes', E.seg(t, 31.1, 31.45), {color: 'duda'});
  const qa = E.ease.ob(E.seg(t, 31.6, 32.0), 1.3);
  if (qa > 0) { E.circle2d(540, 1480, 54 * qa, {lw: 6, color: 'duda'}); E.sans(540, 1504, '?', qa, {size: 70, color: 'duda'});
    E.label(540, 1590, 'respuesta abierta', E.seg(t, 31.8, 32.1), {size: 32, color: 'duda'}); }
  c.restore();
  E.concept(540, 1740, 'vender más ≠ gustar más', E.seg(t, 32.0, 32.35), {size: 84});
}});

// 09 · 32.85–38.71  «Antes de pedirle conclusiones a la IA, agrega: “¿Estos datos responden mi pregunta? ¿Qué información falta?”»
// frase para copiar: grande, de una en una, sin utilería detrás.
function phrase(E, t, k = 0) { // k: 0 centrado grande → 1 arriba compacto (permanece hasta el final)
  const ys = E.lerp(1, .7, k), y0 = E.lerp(860, 250, k), c = E.ctx;
  c.save(); c.translate(540, y0); c.scale(ys, ys);
  const q1 = E.seg(t, 35.45, 35.8), q2 = E.seg(t, 37.37, 37.72);
  E.concept(0, 0, '¿Estos datos responden', q1, {size: 92}); E.concept(0, 104, 'mi pregunta?', q1, {size: 92});
  E.concept(0, 280, '¿Qué información', q2, {size: 92, color: 'duda'}); E.concept(0, 384, 'falta?', q2, {size: 92, color: 'duda'});
  // comillas de «copiar»: barra vertical a la izquierda
  const bar = E.ease.ioc(E.seg(t, 35.4, 38.0)); c.fillStyle = 'rgba(242,242,240,.6)'; c.fillRect(-470, -80, 6, 500 * bar); c.restore();
}
SCENES.push({t0: 32.854, t1: 38.714, draw(E, t, lt) {
  E.bg(); const z9 = 1.04 - lt * .007; E.ctx.save(); E.ctx.translate(540, 960); E.ctx.scale(z9, z9); E.ctx.translate(-540, -960); // r2: deriva lenta
  const lead = E.seg(t, 32.9, 33.25) * (1 - .4 * E.seg(t, 35.4, 35.7)) * (1 - E.seg(t, 38.1, 38.6));
  E.sans(540, 560, 'Antes de pedirle conclusiones a la IA,', lead, {size: 44, weight: 600});
  E.sans(540, 650, 'agrega:', E.seg(t, 34.8, 35.1) * (1 - .4 * E.seg(t, 35.4, 35.7)) * (1 - E.seg(t, 38.1, 38.6)), {size: 52});
  phrase(E, t, 0); E.ctx.restore();
}});

// 10 · 38.71–44.80  «Yo sigo con los verdes. Eso sí: por gusto, no por Excel.»  frase práctica sigue legible arriba; plato verde «mi gusto»; Excel aparte.
const END = {pos: [0, 5.6, -9.8], tgt: [0, .75, .6], fov: 36};
SCENES.push({t0: 38.714, t1: 44.8, draw(E, t, lt) {
  E.bg(); const k = E.ease.ioc(E.seg(lt, 0, .7));
  E.cam(...Object.values(drift(END, lt, .4)));
  if (k > .3) { E.floor([0, 0, .3], 5, {k}); E.dotPlane({step: 1, extent: 14, cz: 3, size: .06, alpha: k * .55}); }
  const come = E.ease.oc(E.seg(t, 38.85, 39.8));
  E.plate([E.lerp(.1, .1, come), 0, E.lerp(-2.6, .4, come)], 1.25 * come + .01, {sauce: 'verdes', seed: 9, alpha: E.cl(come * 3)});
  // Excel aparte (a la izquierda y atrás): no valida el gusto
  const xs = E.seg(t, 40.2, 40.7);
  if (xs > 0) E.ticket([-1.25, .02, 2.6], 1.2, .8, [Math.PI / 2, 0, -.18], {content: sheetContent(7, 1), alpha: xs});
  // etiqueta «mi gusto» clavada en el plato
  const tg = E.ease.ob(E.seg(t, 40.85, 41.3), 1.3), p = scr(E, [.1, .3, .4]);
  if (tg > 0) { const c = E.ctx; c.save(); c.globalAlpha = E.cl(tg); c.strokeStyle = E.C.INK; c.lineWidth = 3; c.beginPath(); c.moveTo(p.x + 60, p.y - 20); c.lineTo(p.x + 150, p.y - 120 * tg); c.stroke(); c.restore();
    chip(E, p.x + 210, p.y - 160 * tg, 260, 'mi gusto', tg, {color: 'verdes'}); }
  phrase(E, 99, k);
  E.concept(540, 1600, 'por gusto.', E.seg(t, 40.8, 41.15), {size: 100, color: 'verdes'});
  E.concept(540, 1720, 'no por Excel.', E.seg(t, 41.5, 41.85), {size: 100});
}});
