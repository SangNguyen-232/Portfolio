/**
 * =====================================================================
 * BACKGROUND CANVAS — mạng nơ-ron (neural network canvas)
 * Dùng y nguyên khung nền của mã tham chiếu: các node trôi, nối nhau khi
 * đủ gần, xung tín hiệu chạy dọc cạnh, chuột hút node lại gần.
 *
 * Vẫn xuất window.ScopeEngine với API cũ để main.js / terminal.js
 * không phải sửa (các hàm không còn tác dụng được để rỗng).
 * Bản 3D trước đó được giữ trong scope-3d.js.
 * =====================================================================
 */
window.ScopeEngine = (() => {
  'use strict';

  let initialized = false;

  const initNeuralNetwork = () => {
    const canvas = document.getElementById('net');
    if (!canvas || initialized) return;
    initialized = true;

    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = canvas.getContext('2d', { alpha: true });
    const COARSE = !FINE;
    let W = 0, H = 0, nodes = [], pulses = [], edges = [], raf = 0, last = -1000;
    const mouse = { x: -9999, y: -9999, on: false };
    const C = { cyan: [95, 227, 200], violet: [255, 181, 71], pink: [191, 242, 230] }; // mint · amber · pale mint
    const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = clamp(Math.round((W * H) / (COARSE ? 26000 : 13000)), 28, 120);
      while (nodes.length < target) nodes.push(mk());
      nodes.length = target;
    }
    function mk() {
      const r = Math.random();
      return { x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
        r: 1.2 + Math.random() * 1.8, c: r < .62 ? C.cyan : r < .85 ? C.violet : C.pink, ph: Math.random() * Math.PI * 2 };
    }
    const LINK = 150, MLINK = 230;
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (now - last < 1000 / 60) return; last = now;
      ctx.clearRect(0, 0, W, H);
      edges.length = 0;
      for (const p of nodes) {
        if (mouse.on) { const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy); if (d < MLINK && d > 2) { const f = (1 - d / MLINK) * .022; p.vx += dx / d * f; p.vy += dy / d * f; } }
        p.vx *= .995; p.vy *= .995;
        const sp = Math.hypot(p.vx, p.vy); if (sp > 1.1) { p.vx *= 1.1 / sp; p.vy *= 1.1 / sp; } if (sp < .08) { p.vx += (Math.random() - .5) * .05; p.vy += (Math.random() - .5) * .05; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -30) p.x = W + 30; else if (p.x > W + 30) p.x = -30;
        if (p.y < -30) p.y = H + 30; else if (p.y > H + 30) p.y = -30;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]; const dx = a.x - b.x, dy = a.y - b.y; if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          const d = Math.hypot(dx, dy); if (d > LINK) continue;
          const al = (1 - d / LINK) * .32;
          ctx.strokeStyle = rgba(a.c === b.c ? a.c : C.pink, al * .8);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          if (edges.length < 400) edges.push([a, b]);
        }
        if (mouse.on) {
          const dx = a.x - mouse.x, dy = a.y - mouse.y, d = Math.hypot(dx, dy);
          if (d < MLINK) { ctx.strokeStyle = rgba(C.cyan, (1 - d / MLINK) * .55); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
        }
      }
      for (const p of nodes) {
        const tw = .55 + .45 * Math.sin(now / 700 + p.ph);
        ctx.fillStyle = rgba(p.c, .25 * tw); ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = rgba(p.c, .95 * tw); ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      // signal pulses travelling along edges (neurons firing)
      if (edges.length && Math.random() < (mouse.on ? .14 : .07) && pulses.length < 14) { const [a, b] = edges[Math.floor(Math.random() * edges.length)]; pulses.push({ a, b, t: 0, s: .012 + Math.random() * .02 }); }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const q = pulses[i]; q.t += q.s; if (q.t >= 1) { pulses.splice(i, 1); continue; }
        const x = lerp(q.a.x, q.b.x, q.t), y = lerp(q.a.y, q.b.y, q.t), fade = Math.sin(q.t * Math.PI);
        ctx.fillStyle = rgba(C.violet, .4 * fade); ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${.95 * fade})`; ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
      }
      if (mouse.on) { ctx.fillStyle = rgba(C.cyan, .9); ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2); ctx.fill(); }
    }
    resize(); window.addEventListener('resize', resize);
    window.addEventListener('pointermove', (e) => { if (e.pointerType === 'touch') return; mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true; }, { passive: true });
    document.addEventListener('mouseleave', () => { mouse.on = false; });
    if (REDUCED) { frame(0); cancelAnimationFrame(raf); return; }
    document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(frame); });
    raf = requestAnimationFrame(frame);
  };

  return {
    initNeuralNetwork,
    setHoveredCard() {},
    setHoverCoords() {},
    setActiveSection() {},
    pulseDMA() {},
    triggerModule() {}
  };
})();