// engine-relieve.js — caja biselada, pila de fichas y terreno con relieve sombreado + curvas de nivel ocluidas.
window.extendRelieve = function (E) {
  const {ctx, cl, mix, css} = E, PR = E.PRESET, {dot, nrm, sub} = E.v;

  // caja con caras Lambert, degradado por cara y arista biselada que atrapa la luz; rot=[rx,ry,rz]
  E.box = (c, s, rot = [0, 0, 0], {tone = PR.dark ? 'graphite' : 'black', alpha = 1, bevel = 1} = {}) => {
    const [ax, ay, az] = rot, R = v => { let [x, y, z] = v;
      let t = y * Math.cos(ax) - z * Math.sin(ax); z = y * Math.sin(ax) + z * Math.cos(ax); y = t;
      t = x * Math.cos(ay) + z * Math.sin(ay); z = -x * Math.sin(ay) + z * Math.cos(ay); x = t;
      t = x * Math.cos(az) - y * Math.sin(az); y = x * Math.sin(az) + y * Math.cos(az); x = t; return [x, y, z]; };
    const v = []; for (const i of [-1, 1]) for (const j of [-1, 1]) for (const k of [-1, 1]) { const q = R([i * s[0] / 2, j * s[1] / 2, k * s[2] / 2]); v.push([c[0] + q[0], c[1] + q[1], c[2] + q[2]]); }
    const F = [[0, 1, 3, 2, [-1, 0, 0]], [4, 6, 7, 5, [1, 0, 0]], [0, 4, 5, 1, [0, -1, 0]], [2, 3, 7, 6, [0, 1, 0]], [0, 2, 6, 4, [0, 0, -1]], [1, 5, 7, 3, [0, 0, 1]]];
    const base = E.tone(tone), cp = E.camera.pos; ctx.save(); ctx.globalAlpha = alpha;
    const vis = F.map(f => { const n = R(f[4]); const cen = [0, 1, 2].map(i => (v[f[0]][i] + v[f[2]][i]) / 2);
      return {f, n, vis: dot(n, sub(cp, cen)) > 0, sh: dot(n, E.LIGHT)}; }).filter(o => o.vis);
    vis.forEach(o => { const pts = o.f.slice(0, 4).map(i => E.P(...v[i])); if (pts.some(p => !p)) return; E.path(pts);
      const k = cl(.22 + .78 * Math.max(0, o.sh)), col = mix([0, 0, 0], mix(base, [255, 255, 255], .25), k);
      const g = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[2].x, pts[2].y);
      g.addColorStop(0, css(mix(col, [255, 255, 255], .1))); g.addColorStop(1, css(mix(col, [0, 0, 0], .25)));
      ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.stroke(); o.pts = pts; });
    // bisel: la cara más iluminada recibe un filo claro (simula arista redondeada)
    const top = vis.filter(o => o.pts).sort((a, b) => b.sh - a.sh)[0];
    if (top && bevel) { E.path(top.pts); ctx.lineWidth = 2.2; ctx.strokeStyle = `rgba(255,255,255,${.28 + .3 * cl(top.sh)})`; ctx.lineJoin = 'round'; ctx.stroke(); }
    ctx.restore();
  };

  // pila de fichas (conteo): cada ficha = canto en sombra + cara superior con degradado; color semántico
  E.ringStack = (c, r, h, n, {alpha = 1, grow = 1, color = 'ink', lw = 1} = {}) => {
    const m = Math.max(1, Math.round(n * grow)), step = h / Math.max(1, n - 1), th = step * .72, col = E.tone(color);
    ctx.save(); ctx.globalAlpha = alpha; E.shadow([c[0], 0, c[2]], r * 1.1, {alpha: .3 * alpha});
    for (let i = 0; i < m; i++) { const y = c[1] + step * i;
      const bot = E.circ([c[0], y, c[2]], r, 40), tp = E.circ([c[0], y + th, c[2]], r, 40); if (bot.some(q => !q) || tp.some(q => !q)) continue;
      E.path(bot.slice(0, 21).concat(tp.slice(0, 21).reverse())); const xs = tp.map(q => q.x);
      const g = ctx.createLinearGradient(Math.min(...xs), 0, Math.max(...xs), 0);
      g.addColorStop(0, css(mix(col, [0, 0, 0], .25))); g.addColorStop(1, css(mix(col, [0, 0, 0], .7))); ctx.fillStyle = g; ctx.fill();
      E.path(tp); const L = i === m - 1 ? .35 : .12; const g2 = ctx.createLinearGradient(tp[30].x, tp[30].y, tp[10].x, tp[10].y);
      g2.addColorStop(0, css(mix(col, [255, 255, 255], L))); g2.addColorStop(1, css(mix(col, [0, 0, 0], .15))); ctx.fillStyle = g2; ctx.fill();
      ctx.lineWidth = .8 * lw; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.stroke(); }
    ctx.restore();
  };

  // terreno: campo de alturas h(x,z) teselado, sombreado Lambert+especular, desvanecido a negro en bordes/distancia,
  // curvas de nivel por marching squares dibujadas en orden de pintor (las colinas cercanas ocultan líneas lejanas)
  E.terrain = ({h, cx = 0, cz = 0, ext = 9, n = 52, levels = 18, lo = -3, hi = 1.5, alpha = 1, base = PR.groundBase, line = PR.groundLine, far = 30, lw = 1.5, accentBelow = null} = {}) => {
    const N = n + 1, G = new Array(N * N), cp = E.camera.pos;
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const x = cx - ext + 2 * ext * i / n, z = cz - ext + 2 * ext * j / n, y = h(x, z);
      G[j * N + i] = {x, y, z, p: E.P(x, y, z)}; }
    const cells = []; for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { const q = [G[j * N + i], G[j * N + i + 1], G[(j + 1) * N + i + 1], G[(j + 1) * N + i]];
      if (q.some(o => !o.p)) continue; cells.push({q, d: (q[0].p.z + q[2].p.z) / 2, i, j}); }
    cells.sort((a, b) => b.d - a.d); const H = E.camera ? E.H : 1920;
    const lev = []; for (let k = 0; k <= levels; k++) lev.push(lo + (hi - lo) * k / levels);
    ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    for (const C of cells) { const [a, b, c, d] = C.q, P = C.q.map(o => o.p);
      if (P.every(p => p.x < -40) || P.every(p => p.x > E.W + 40) || P.every(p => p.y < -40) || P.every(p => p.y > H + 40)) continue;
      const dx = (b.y - a.y + c.y - d.y) / 2 / (b.x - a.x), dz = (d.y - a.y + c.y - b.y) / 2 / (d.z - a.z), nn = nrm([-dx, 1, -dz]);
      const diff = Math.max(0, dot(nn, E.LIGHT)), mid = [(a.x + c.x) / 2, (a.y + c.y) / 2, (a.z + c.z) / 2];
      const vdir = nrm(sub(cp, mid)), hv = nrm([E.LIGHT[0] + vdir[0], E.LIGHT[1] + vdir[1], E.LIGHT[2] + vdir[2]]);
      const spec = Math.pow(Math.max(0, dot(nn, hv)), 24) * .22;
      const rr = Math.hypot(mid[0] - cx, mid[2] - cz) / ext, fade = alpha * cl(1 - C.d / far) * Math.pow(cl((1 - rr) * 1.5), 1.6);
      const sh = (.04 + .96 * diff * diff) * fade, col = base.map(v => cl(v * sh + 255 * spec * fade, 0, 255));
      E.path(P); ctx.fillStyle = css(col); ctx.fill(); ctx.lineWidth = .7; ctx.strokeStyle = css(col); ctx.stroke();
      // curvas de nivel de esta celda
      const vals = [a.y, b.y, c.y, d.y], mn = Math.min(...vals), mx = Math.max(...vals); if (fade < .02) continue;
      for (const L of lev) { if (L < mn || L > mx) continue; const pts = [];
        for (let e = 0; e < 4; e++) { const u = C.q[e], w = C.q[(e + 1) % 4]; if ((u.y - L) * (w.y - L) < 0) { const f = (L - u.y) / (w.y - u.y);
          pts.push({x: u.p.x + (w.p.x - u.p.x) * f, y: u.p.y + (w.p.y - u.p.y) * f}); } }
        if (pts.length < 2) continue; const below = accentBelow && L <= accentBelow.level;
        ctx.strokeStyle = below ? css(E.tone(accentBelow.color), cl(fade * (.45 + .55 * diff))) : `rgba(${line},${cl(fade * (.25 + .6 * diff))})`;
        ctx.lineWidth = lw * cl(P[0].s / 90, .5, 1.6); ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); ctx.lineTo(pts[1].x, pts[1].y);
        if (pts.length === 4) { ctx.moveTo(pts[2].x, pts[2].y); ctx.lineTo(pts[3].x, pts[3].y); } ctx.stroke(); } }
    ctx.restore();
  };
  // utilidades de relieve: suma de gaussianas (colinas >0, pozos <0)
  E.field = bumps => (x, z) => bumps.reduce((s, [bx, bz, amp, sg]) => s + amp * Math.exp(-((x - bx) ** 2 + (z - bz) ** 2) / (sg * sg)), 0);
};
