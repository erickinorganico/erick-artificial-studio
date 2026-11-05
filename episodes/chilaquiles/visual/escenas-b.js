// V14 · escenas 04–07: hipótesis «Imagina», cliente quería verde → compró rojo, dos huellas, ventas + disponibilidad.
const NEARV = {pos: [2.4, 6.6, -9.6], tgt: [1.6, .6, 0], fov: 34};
const WIDE = {pos: [0, 9.4, -11.8], tgt: [0, 0, .5], fov: 40};
function ago(E, x, y, a) { // sello ámbar AGOTADOS (dato que no está en el Excel)
  if (a <= 0) return; const c = E.ctx; c.save(); c.globalAlpha = E.cl(a); c.translate(x, y); c.rotate(-.06); const s = E.lerp(1.25, 1, E.ease.oc(a));
  c.scale(s, s); c.strokeStyle = E.col('duda'); c.lineWidth = 5; c.beginPath(); c.roundRect(-170, -46, 340, 80, 12); c.stroke();
  c.fillStyle = E.col('duda'); c.font = `600 50px ${E.F.SANS}`; c.textAlign = 'center'; c.fillText('AGOTADOS', 0, 12); c.restore();
}
const CUST0 = [0, .38, -3.4], CUSTV = [1.0, .38, -1.55], CUSTR = [-1.0, .38, -1.55];

// 04 · 11.08–13.56  «Imagina que los verdes se agotaron varios días.»
SCENES.push({t0: 11.083, t1: 13.557, draw(E, t, lt) {
  E.bg(); const H2 = {pos: [0, 10.4, -16.6], tgt: [0, 1.4, 0], fov: 34};
  camLerp(E, H2, drift(NEARV, lt, .5), E.ease.ioc(E.seg(lt, 0, .9)));
  E.floor([1.6, 0, 0], 6); E.dotPlane({step: 1, extent: 30, size: .06});
  const sink = 1 - E.ease.ioc(E.seg(lt, 0, .6)), empty = E.ease.ioc(E.seg(t, 12.0, 13.0));
  E.plate(PL, PRR, {sauce: 'rojos', seed: 3}); E.plate(PRt, PRR, {sauce: 'verdes', seed: 9, fill: 1 - empty});
  if (sink > 0) stacks(E, sink, sink);
  const p = scr(E, [PRt[0], 0, PRt[2] - PRR - .6]);
  const n = Math.max(0, Math.ceil(3 * (1 - empty)));
  E.number(p.x, p.y + 110, String(n), 'disponibles hoy', E.seg(t, 11.7, 11.95), {size: 92, color: n ? 'verdes' : 'duda', labelColor: 'duda'});
  ago(E, scr(E, PRt).x, scr(E, [PRt[0], 0, 0]).y - 230, E.seg(t, 12.95, 13.2));
  E.concept(540, 400, 'imagina…', E.seg(t, 11.1, 11.45), {size: 110});
}});

// 05 · 13.56–16.44  «Alguien quería verdes… y terminó pidiendo rojos.»  ficha de cliente: va al verde, no hay, gira al rojo; ticket rojo
SCENES.push({t0: 13.557, t1: 16.441, draw(E, t, lt) {
  E.bg(); camLerp(E, drift(NEARV, 2.47, .5), drift(WIDE, lt, .4), E.ease.ioc(E.seg(lt, 0, .8)));
  E.floor([0, 0, -1], 7); E.dotPlane({step: 1, extent: 30, size: .06});
  E.plate(PL, PRR, {sauce: 'rojos', seed: 3}); E.plate(PRt, PRR, {sauce: 'verdes', seed: 9, fill: 0});
  ago(E, scr(E, [PRt[0], 0, 1.2]).x, scr(E, [PRt[0], 0, 1.2]).y - 40, 1);
  const go = E.ease.ioc(E.seg(t, 13.75, 14.6)), back = E.ease.ioc(E.seg(t, 14.8, 15.8)), c = E.ctx;
  // trayectorias: intención (verde, discontinua) y compra (roja, continua)
  const path = (a, b, u, col, dash) => { if (u <= 0) return; const A = scr(E, [a[0], .02, a[2]]), B = scr(E, [E.lerp(a[0], b[0], u), .02, E.lerp(a[2], b[2], u)]);
    c.save(); c.setLineDash(dash); c.lineWidth = 6; c.lineCap = 'round'; c.strokeStyle = E.col(col); c.beginPath(); c.moveTo(A.x, A.y); c.lineTo(B.x, B.y); c.stroke(); c.restore(); };
  path(CUST0, CUSTV, go, 'verdes', [16, 14]); path(CUSTV, CUSTR, back, 'rojos', []);
  const stopBump = Math.sin(E.seg(t, 14.6, 14.85) * Math.PI) * .12;
  let pos = E.lerp3(CUST0, CUSTV, go); pos = [pos[0] - stopBump, pos[1], pos[2] - stopBump]; if (back > 0) pos = E.lerp3(CUSTV, CUSTR, back);
  E.sphere(pos, .38, {tone: 'pearl'});
  const cp = scr(E, [pos[0], .9, pos[2]]); E.label(cp.x, cp.y - 10, 'cliente', E.seg(t, 13.6, 13.85) * (1 - E.seg(t, 14.7, 14.9)), {size: 32, color: E.C.INK});
  // ticket rojo que nace de la compra
  const tk = E.ease.ob(E.seg(t, 15.75, 16.2), 1.2);
  if (tk > 0) E.ticket([CUSTR[0] - .2, 1.9 + .3 * tk, CUSTR[2] - .5], .9 * tk, 1.1 * tk, [0, 0, -.05], {content: (x, w, h) => {
    x.fillStyle = '#111'; x.font = `600 ${h * .14}px MonoSans`; x.textAlign = 'center'; x.fillText('ticket', w / 2, h * .26);
    x.fillStyle = '#e5484d'; x.beginPath(); x.arc(w / 2, h * .55, h * .14, 0, 7); x.fill(); x.fillStyle = '#111'; x.font = `600 ${h * .13}px MonoSans`; x.fillText('rojos', w / 2, h * .88); }});
  E.concept(540, 330, 'quería verdes', E.seg(t, 13.6, 13.95), {size: 100, color: 'verdes'});
  E.concept(540, 450, '→ compró rojos', E.seg(t, 14.85, 15.2), {size: 100, color: 'rojos'});
}});

// 06 · 16.44–19.97  «El ticket registra rojos. Su primera opción era otra.»  dos huellas del MISMO cliente
function twoTraces(E, t, {tk = 1, pref = 1, alpha = 1} = {}) {
  const c = E.ctx, cx = 540, by = 1180;
  E.sphere([0, .38, -1.55], .38, {tone: 'pearl', alpha});
  const s = scr(E, [0, .55, -1.55]);
  // huella 1: ticket (dato registrado, papel sólido)
  if (tk > 0) { const x = E.lerp(cx, 290, E.ease.ioc(tk)); c.save(); c.globalAlpha = alpha; c.strokeStyle = E.C.INK2; c.lineWidth = 3; c.beginPath(); c.moveTo(s.x - 20, s.y - 30); c.lineTo(x, by + 170); c.stroke(); c.restore();
    paperCard(E, x, by, 300, 340, alpha * E.cl(tk * 3), (x2, w, h) => { x2.fillStyle = '#111'; x2.font = `600 40px ${E.F.SANS}`; x2.textAlign = 'center'; x2.fillText('ticket', w / 2, 70);
      x2.fillStyle = '#e5484d'; x2.beginPath(); x2.arc(w / 2, 165, 52, 0, 7); x2.fill(); x2.fillStyle = '#111'; x2.font = `600 42px ${E.F.SANS}`; x2.fillText('rojos', w / 2, 285); }); }
  // huella 2: primera opción (no registrada: contorno discontinuo verde)
  if (pref > 0) { const x = E.lerp(cx, 790, E.ease.ioc(pref)); c.save(); c.globalAlpha = alpha * E.cl(pref * 2); c.setLineDash([12, 12]); c.strokeStyle = E.col('verdes'); c.lineWidth = 3;
    c.beginPath(); c.moveTo(s.x + 20, s.y - 30); c.lineTo(x, by + 170); c.stroke(); c.lineWidth = 5; c.beginPath(); c.roundRect(x - 150, by - 170, 300, 340, 16); c.stroke();
    c.setLineDash([]); c.fillStyle = E.col('verdes'); c.textAlign = 'center'; c.font = `600 38px ${E.F.SANS}`; c.fillText('1.ª opción', x, by - 100);
    c.beginPath(); c.arc(x, by - 5, 52, 0, 7); c.lineWidth = 6; c.stroke(); c.font = `600 42px ${E.F.SANS}`; c.fillText('verdes', x, by + 115); c.restore(); }
}
function paperCard(E, x, y, w, h, a, content) {
  const c = E.ctx; if (a <= 0) return; c.save(); c.globalAlpha = E.cl(a);
  c.fillStyle = 'rgba(0,0,0,.7)'; c.filter = 'blur(14px)'; c.fillRect(x - w / 2 + 10, y - h / 2 + 22, w, h); c.filter = 'none';
  c.fillStyle = '#5d5c58'; c.beginPath(); c.roundRect(x - w / 2, y - h / 2 + 7, w, h, 14); c.fill();
  const g = c.createLinearGradient(x - w / 2, y - h / 2, x + w / 2, y + h / 2); g.addColorStop(0, '#f2f1ec'); g.addColorStop(1, '#c9c8c2');
  c.fillStyle = g; c.beginPath(); c.roundRect(x - w / 2, y - h / 2, w, h, 14); c.fill(); c.translate(x - w / 2, y - h / 2); content(c, w, h); c.restore();
}
const TR = {pos: [0, 4.6, -12.5], tgt: [0, -1.0, -1.55], fov: 34};
SCENES.push({t0: 16.441, t1: 19.973, draw(E, t, lt) {
  E.bg(); camLerp(E, drift(WIDE, 2.9, .4), drift(TR, lt, .3), E.ease.ioc(E.seg(lt, 0, .7)));
  E.floor([0, 0, -1.5], 5); E.dotPlane({step: 1, extent: 30, size: .06, alpha: .7});
  const fade = 1 - E.seg(lt, 0, .5);
  if (fade > 0) { E.plate(PL, PRR, {sauce: 'rojos', seed: 3, alpha: fade}); E.plate(PRt, PRR, {sauce: 'verdes', seed: 9, fill: 0, alpha: fade}); }
  twoTraces(E, t, {tk: E.seg(t, 16.25, 17.1), pref: E.seg(t, 18.25, 18.95)});
  E.label(290, 1430, 'queda en el Excel', E.seg(t, 17.2, 17.5), {size: 32});
  E.label(790, 1430, 'no queda registrada', E.seg(t, 19.1, 19.4), {size: 32, color: 'duda'});
  E.concept(540, 420, 'preferencia ≠ compra', E.seg(t, 18.3, 18.7), {size: 96});
}});

// 07 · 19.97–25.16  «Esas ventas dicen qué se compró, con las opciones que había. No bastan para saber qué preferían.»
// regreso a 80/50 (sin tachar); la tarjeta de disponibilidad (ámbar) los acompaña; queda la duda de preferencia.
const G7 = {pos: [0, 9.6, -15.8], tgt: [0, 1.6, 0], fov: 36};
SCENES.push({t0: 19.973, t1: 25.164, draw(E, t, lt) {
  E.bg(); camLerp(E, drift(TR, 3.5, .3), drift(G7, lt, .4), E.ease.ioc(E.seg(lt, 0, .8)));
  E.floor([0, 0, 0], 7); E.dotPlane({step: 1, extent: 30, size: .06});
  const tr = 1 - E.seg(lt, 0, .3);
  if (tr > 0) twoTraces(E, t, {alpha: tr});
  const up = E.ease.ioc(E.seg(lt, .2, 1.1)), pa = E.seg(lt, .15, .5); // r2: platos no aparecen de golpe en el corte 20.0 s
  E.plate(PL, PRR, {sauce: 'rojos', seed: 3, alpha: pa}); E.plate(PRt, PRR, {sauce: 'verdes', seed: 9, alpha: pa});
  stacks(E, up, up); plateLabels(E, up); counts(E, E.seg(lt, .7, 1.0), 80, 50, {label: 'comprados'});
  // tarjeta de disponibilidad (información que el conteo no trae)
  const av = E.ease.ob(E.seg(t, 21.8, 22.3), 1.15), q = scr(E, [0, 0, -2.6]);
  if (av > 0) { const c = E.ctx; c.save(); c.globalAlpha = E.cl(av); c.translate(540, q.y + 40); c.scale(av, av);
    c.fillStyle = '#121212'; c.beginPath(); c.roundRect(-300, -80, 600, 160, 18); c.fill(); c.strokeStyle = E.col('duda'); c.lineWidth = 5; c.stroke();
    c.textAlign = 'center'; c.fillStyle = E.col('duda'); c.font = `400 34px ${E.F.MONO}`; c.fillText('disponibilidad', 0, -22);
    c.font = `600 44px ${E.F.SANS}`; c.fillStyle = E.C.INK; c.fillText('verdes: agotados', 0, 40); c.restore(); }
  E.concept(540, 380, 'qué se compró', E.seg(t, 20.2, 20.55), {size: 100, q: E.seg(t, 21.75, 21.95)});
  E.concept(540, 380, 'con lo que había', E.seg(t, 21.95, 22.3), {size: 100, q: E.seg(t, 22.95, 23.15)});
  E.concept(540, 380, '¿qué preferían?', E.seg(t, 24.15, 24.5), {size: 100, color: 'duda'});
  E.label(540, 470, 'no basta para saberlo', E.seg(t, 23.1, 23.4), {size: 34});
}});
