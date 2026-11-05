// engine-material.js — materiales v13: esfera esmaltada, plato de cerámica biselado, vasito, caja biselada,
// pila de fichas, terreno con relieve sombreado. Misma luz clave (E.LIGHT) para todos. Se carga antes de crear el motor.
window.extendMaterials = function (E) {
  const {ctx, cl, rgb, mix, css} = E, PR = E.PRESET, {dot, nrm, sub} = E.v;
  const TONES = {ink: [34, 34, 37], black: [34, 34, 37], pearl: [236, 236, 233], white: [236, 236, 233], chrome: [176, 178, 184], graphite: [78, 79, 84]};
  const tone = t => TONES[t] || E.accent(t);
  E.tone = tone;

  // ---------- esfera: difuso + terminador + luz de rebote del suelo + especular + contorno de separación ----------
  E.sphere = (c, r, {tone: tn = PR.dark ? 'chrome' : 'black', shadow = true, alpha = 1, groundY = 0, gloss = 1} = {}) => {
    if (shadow) E.shadow([c[0], groundY, c[2]], r * 1.05, {alpha: .32 * alpha * cl(1.4 - (c[1] - groundY - r) / (4 * r))});
    const p = E.P(...c); if (!p) return; const R = r * p.s; if (R < .5) return p;
    const b = tone(tn), lum = (b[0] + b[1] + b[2]) / 765; ctx.save(); ctx.globalAlpha = alpha;
    const hx = p.x - R * .36, hy = p.y - R * .42;
    const g = ctx.createRadialGradient(hx, hy, R * .04, p.x + R * .1, p.y + R * .12, R * 1.08);
    g.addColorStop(0, css(mix(b, [255, 255, 255], .42))); g.addColorStop(.38, css(b));
    g.addColorStop(.78, css(mix(b, [0, 0, 0], .62))); g.addColorStop(1, css(mix(b, [0, 0, 0], .82)));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, R, 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(p.x, p.y, R, 0, 7); ctx.clip();
    // rebote del suelo en el borde inferior (separa la esfera del negro sin halo exterior)
    const bo = ctx.createRadialGradient(p.x, p.y - R * .35, R * .9, p.x, p.y - R * .2, R * 1.35);
    bo.addColorStop(0, 'rgba(255,255,255,0)'); bo.addColorStop(1, `rgba(255,255,255,${PR.dark ? .16 : .06})`);
    ctx.fillStyle = bo; ctx.fillRect(p.x - R, p.y - R, 2 * R, 2 * R); ctx.restore();
    // especular: núcleo duro + lóbulo suave (rugosidad controlada)
    const sp = gloss * (lum > .7 ? .55 : .95);
    const s1 = ctx.createRadialGradient(hx, hy, 0, hx, hy, R * .5);
    s1.addColorStop(0, `rgba(255,255,255,${sp * .35})`); s1.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = s1; ctx.beginPath(); ctx.arc(hx, hy, R * .5, 0, 7); ctx.fill();
    const s2 = ctx.createRadialGradient(hx, hy, 0, hx, hy, R * .14);
    s2.addColorStop(0, `rgba(255,255,255,${sp})`); s2.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = s2; ctx.beginPath(); ctx.arc(hx, hy, R * .14, 0, 7); ctx.fill();
    if (!PR.dark && lum > .7) { ctx.lineWidth = cl(R * .03, 1, 4); ctx.strokeStyle = '#3a3a3a'; ctx.beginPath(); ctx.arc(p.x, p.y, R, 0, 7); ctx.stroke(); }
    ctx.restore(); return p;
  };

  // ---------- plato de cerámica: canto, ala biselada iluminada, pared interior en sombra, fondo hundido, salsa con brillo ----------
  const SAUCE = {black: 'rojos', grey: 'verdes'};
  const ell = (c, r, y, n = 72) => E.circ([c[0], y, c[2]], r, n);
  const lin = (a, b, stops) => { const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y); stops.forEach(([o, col]) => g.addColorStop(o, col)); return g; };
  E.plate = (c, r, {sauce = 'rojos', chips = 9, seed = 7, alpha = 1, fill = 1, split = 0} = {}) => {
    sauce = SAUCE[sauce] || sauce;
    E.shadow([c[0] + r * .08, 0, c[2] + r * .1], r * .98, {alpha: .3 * alpha, soft: .7});
    const p0 = E.P(...c); if (!p0) return; const y = c[1], th = r * .13; ctx.save(); ctx.globalAlpha = alpha;
    const La = E.P(c[0] - r, y, c[2] - r * .7), Lb = E.P(c[0] + r, y, c[2] + r * .7); if (!La || !Lb) { ctx.restore(); return p0; }
    // canto (pared exterior)
    path2(ell(c, r * .9, y - th)); ctx.fillStyle = lin(La, Lb, [[0, '#9a9a96'], [1, '#2c2c2c']]); ctx.fill();
    path2(ell(c, r, y)); ctx.fillStyle = lin(La, Lb, [[0, '#fbfbf8'], [.55, '#d9d9d5'], [1, '#8b8b87']]); ctx.fill();
    ctx.lineWidth = cl(r * p0.s * .012, .8, 2.5); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.stroke();
    // pared interior: inversa a la luz (la cara lejana a la luz es la iluminada por dentro)
    path2(ell(c, r * .78, y + .002)); ctx.fillStyle = lin(La, Lb, [[0, '#8e8e8a'], [.5, '#cfcfcb'], [1, '#f2f2ef']]); ctx.fill();
    path2(ell(c, r * .64, y - r * .05)); ctx.fillStyle = lin(La, Lb, [[0, '#d2d2ce'], [1, '#e8e8e4']]); ctx.fill();
    // brillo especular del ala en el lado de la luz
    const la = Math.atan2(E.LIGHT[2], E.LIGHT[0]);
    path2(E.circ([c[0], y + .003, c[2]], r * .9, 28, 0, 1, la - .7, la + .7), false);
    ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = cl(r * p0.s * .03, 1, 7); ctx.lineCap = 'round'; ctx.stroke();
    const rs = r * .56 * fill, ys = y - r * .04;
    if (sauce && sauce !== 'none' && fill > 0) {
      const halves = sauce === 'half' ? ['rojos', 'verdes'] : [sauce];
      halves.forEach((nm, k) => { const col = tone(nm), two = halves.length > 1;
        const a0 = two ? Math.PI / 2 + k * Math.PI : 0, a1 = two ? a0 + Math.PI : Math.PI * 2, off = two ? (k ? 1 : -1) * split * r : 0;
        const cc = [c[0] + off, ys, c[2]], pts = E.circ(cc, rs, 60, .06, seed + k, a0, a1); if (two) pts.push(E.P(...cc));
        const pc = E.P(...cc); path2(pts);
        const g = ctx.createRadialGradient(pc.x - rs * pc.s * .3, pc.y - rs * pc.s * .2, 0, pc.x, pc.y, rs * pc.s * 1.1);
        g.addColorStop(0, css(mix(col, [255, 255, 255], .28))); g.addColorStop(.5, css(col)); g.addColorStop(1, css(mix(col, [0, 0, 0], .45)));
        ctx.fillStyle = g; ctx.fill(); });
      if (sauce === 'half' && split < .02) { path2([E.P(c[0], ys + .01, c[2] - rs), E.P(c[0], ys + .01, c[2] + rs)], false); ctx.strokeStyle = '#f2f2ef'; ctx.lineWidth = cl(r * p0.s * .02, 1, 4); ctx.stroke(); }
      // totopos: facetas con tono por orientación, grosor y borde oscuro fino
      const R = E.rng(seed * 13 + 1);
      for (let i = 0; i < chips * fill; i++) {
        const a = R() * 6.283, d = Math.sqrt(R()) * rs * .78, sz = r * (.16 + R() * .08), rot = R() * 6.283, tilt = R();
        const cx = c[0] + Math.cos(a) * d + (sauce === 'half' ? (Math.cos(a) > 0 ? 1 : -1) * split * r : 0), cz = c[2] + Math.sin(a) * d;
        const tri = [0, 1, 2].map(k => E.P(cx + Math.cos(rot + k * 2.094) * sz, ys + .03 + k * .03 * tilt, cz + Math.sin(rot + k * 2.094) * sz));
        if (tri.some(q => !q)) continue; const dy = cl(sz * tri[0].s * .07, 1, 6);
        path2(tri.map(q => ({x: q.x, y: q.y + dy}))); ctx.fillStyle = '#2a2a28'; ctx.fill();
        const v = 200 + 52 * tilt; path2(tri); ctx.fillStyle = lin(tri[0], tri[1], [[0, `rgb(${v},${v},${v * .97 | 0})`], [1, `rgb(${v * .62 | 0},${v * .62 | 0},${v * .6 | 0})`]]);
        ctx.fill(); ctx.lineWidth = cl(dy * .5, .6, 2); ctx.strokeStyle = 'rgba(10,10,10,.85)'; ctx.lineJoin = 'round'; ctx.stroke();
      }
    }
    ctx.restore(); return p0;
  };
  function path2(pts, close = true) { return E.path(pts, close); }

  // ---------- vasito (salsa extra): cilindro con gradiente lateral, labio biselado, salsa con brillo ----------
  E.cup = (c, r, h, {sauce = 'verdes', alpha = 1} = {}) => {
    E.shadow([c[0], 0, c[2]], r * 1.05, {alpha: .3 * alpha});
    const p = E.P(...c); if (!p) return; ctx.save(); ctx.globalAlpha = alpha;
    const bot = E.circ(c, r * .82, 48), top = E.circ([c[0], c[1] + h, c[2]], r, 48);
    if (bot.some(q => !q) || top.some(q => !q)) { ctx.restore(); return p; }
    const xs = top.map(q => q.x), lx = Math.min(...xs), rx = Math.max(...xs);
    path2(bot.slice(0, 25).concat(top.slice(0, 25).reverse()));
    const g = ctx.createLinearGradient(lx, 0, rx, 0); g.addColorStop(0, '#f4f4f1'); g.addColorStop(.35, '#dcdcd8'); g.addColorStop(.8, '#7d7d79'); g.addColorStop(1, '#4a4a47');
    ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 1.2; ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.stroke();
    path2(top); ctx.fillStyle = '#f7f7f4'; ctx.fill(); ctx.stroke();
    const inner = E.circ([c[0], c[1] + h * .94, c[2]], r * .84, 48); path2(inner);
    const col = typeof sauce === 'string' && sauce[0] === '#' ? rgb(sauce) : tone(sauce);
    const ig = ctx.createLinearGradient(lx, 0, rx, 0); ig.addColorStop(0, css(mix(col, [0, 0, 0], .35))); ig.addColorStop(.6, css(col)); ig.addColorStop(1, css(mix(col, [255, 255, 255], .3)));
    ctx.fillStyle = ig; ctx.fill();
    ctx.restore(); return p;
  };
};
