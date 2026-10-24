(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
const lerp = (a, b, t) => a + (b - a) * t, clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const mk = (tag, props) => Object.assign(document.createElement(tag), props);
const mouse = { x: -1e4, y: -1e4, on: false };

/* ambient layers (created here so index.html stays clean) */
document.body.prepend(mk('div', { id: 'spot' }), mk('canvas', { id: 'net' }));
$('#net').setAttribute('aria-hidden', 'true'); $('#spot').setAttribute('aria-hidden', 'true');

/* neural network canvas: drifting nodes, mouse attraction, travelling pulses */
(function network() {
  const cv = $('#net'), ctx = cv.getContext('2d'); if (!ctx || RM) return;
  const C = [[95, 227, 200], [255, 181, 71], [191, 242, 230]], col = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  let W, H, N = [], P = [], last = 0, raf;
  const size = () => {
    const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    const n = clamp(Math.round(W * H / (FINE ? 14000 : 28000)), 24, 90);
    while (N.length < n) N.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: 1 + Math.random() * 1.6, c: C[Math.random() < .7 ? 0 : Math.random() < .6 ? 1 : 2] });
    N.length = n;
  };
  const draw = (t) => {
    raf = requestAnimationFrame(draw); if (t - last < 30) return; last = t;
    ctx.clearRect(0, 0, W, H); const E = [];
    for (const p of N) {
      if (mouse.on) { const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy); if (d < 220 && d > 2) { const f = .02 * (1 - d / 220); p.vx += dx / d * f; p.vy += dy / d * f; } }
      p.vx *= .995; p.vy *= .995; const s = Math.hypot(p.vx, p.vy);
      if (s > 1) { p.vx /= s; p.vy /= s; } else if (s < .06) { p.vx += (Math.random() - .5) * .05; p.vy += (Math.random() - .5) * .05; }
      p.x = (p.x + p.vx + W + 30) % (W + 30); p.y = (p.y + p.vy + H + 30) % (H + 30);
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < N.length; i++) {
      const a = N[i];
      for (let j = i + 1; j < N.length; j++) {
        const b = N[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d > 140) continue;
        ctx.strokeStyle = col(a.c, (1 - d / 140) * .28); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); if (E.length < 300) E.push([a, b]);
      }
      if (mouse.on) { const d = Math.hypot(a.x - mouse.x, a.y - mouse.y); if (d < 200) { ctx.strokeStyle = col(C[1], (1 - d / 200) * .5); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); } }
    }
    for (const p of N) { ctx.fillStyle = col(p.c, .85); ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
    if (E.length && P.length < 10 && Math.random() < .08) { const [a, b] = E[Math.random() * E.length | 0]; P.push({ a, b, t: 0, s: .015 + Math.random() * .02 }); }
    for (let i = P.length - 1; i >= 0; i--) {
      const q = P[i]; q.t += q.s; if (q.t >= 1) { P.splice(i, 1); continue; }
      const x = lerp(q.a.x, q.b.x, q.t), y = lerp(q.a.y, q.b.y, q.t), f = Math.sin(q.t * Math.PI);
      ctx.fillStyle = col(C[1], .35 * f); ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.283); ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${.9 * f})`; ctx.beginPath(); ctx.arc(x, y, 2, 0, 6.283); ctx.fill();
    }
  };
  size(); addEventListener('resize', size);
  document.addEventListener('visibilitychange', () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(draw); });
  raf = requestAnimationFrame(draw);
})();

/* pointer: shared position, cursor dot + ring (native cursor stays visible), spotlight */
if (FINE) {
  addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true; }, { passive: true });
  document.addEventListener('mouseleave', () => { mouse.on = false; });
  if (!RM) {
    const dot = mk('div', { className: 'cursor-dot' }), ring = mk('div', { className: 'cursor-ring' }), spot = $('#spot');
    document.body.append(dot, ring);
    let rx = -100, ry = -100, sx = innerWidth / 2, sy = innerHeight / 3;
    addEventListener('pointermove', (e) => {
      document.body.classList.add('cursor-on');
      document.body.classList.toggle('cursor-hover', !!(e.target.closest && e.target.closest('a,button,[data-cursor],.tag,.chip,.mq')));
    }, { passive: true });
    addEventListener('pointerdown', () => document.body.classList.add('cursor-down'));
    addEventListener('pointerup', () => document.body.classList.remove('cursor-down'));
    const loop = () => {
      rx = lerp(rx, mouse.x, .18); ry = lerp(ry, mouse.y, .18); sx = lerp(sx, mouse.x, .08); sy = lerp(sy, mouse.y, .08);
      dot.style.transform = `translate(${mouse.x}px,${mouse.y}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      spot.style.setProperty('--x', sx + 'px'); spot.style.setProperty('--y', sy + 'px');
      requestAnimationFrame(loop);
    };
    loop();
  }
}

/* 3D tilt, magnetic buttons, hero chip parallax */
if (FINE && !RM) {
  $$('.pcard,.skill,.do,.edu,.tl-card').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transitionDelay = '0s'; el.classList.add('tilting');
      el.style.transform = `perspective(1000px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-3px)`;
    });
    el.addEventListener('pointerleave', () => { el.classList.remove('tilting'); el.style.transform = ''; });
  });
  $$('.btn,.social,.totop,.hero-socials a,.mobile-socials a').forEach((el) => {
    el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * .2).toFixed(1)}px,${((e.clientY - r.top - r.height / 2) * .2).toFixed(1)}px)`; });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
  const hero = $('#hero'), chips = $$('.chip'), depth = [1.6, 1.1, 1.4, .9];
  if (hero) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      chips.forEach((c, i) => { c.style.transform = `translate(${(x * 26 * depth[i % 4]).toFixed(1)}px,${(y * 26 * depth[i % 4]).toFixed(1)}px)`; });
    });
    hero.addEventListener('pointerleave', () => chips.forEach((c) => { c.style.transform = ''; }));
  }
}

/* section titles decode when they scroll into view */
(function scrambleTitles() {
  if (RM) return;
  const CH = '!<>-_/[]{}=+*^?#01';
  const run = (el) => {
    const text = el.textContent; let f = 0;
    const q = [...text].map((c, i) => ({ c, s: i * 1.2, e: i * 1.2 + 10 + Math.random() * 8, x: '' }));
    const step = () => {
      let o = '', d = 0;
      for (const k of q) {
        if (f >= k.e) { d++; o += k.c; }
        else if (f >= k.s) { if (!k.x || Math.random() < .3) k.x = k.c === ' ' ? ' ' : CH[Math.random() * CH.length | 0]; o += `<span style="color:var(--mint);opacity:.7">${k.x}</span>`; }
        else o += k.c === ' ' ? ' ' : '&nbsp;';
      }
      el.innerHTML = o; if (d < q.length) { f++; requestAnimationFrame(step); } else el.textContent = text;
    };
    step();
  };
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { io.unobserve(en.target); run(en.target); } }), { threshold: .6 });
  $$('.sec-title').forEach((el) => io.observe(el));
})();

/* project filter: visible cards pop in with a stagger */
const fl = $('#projectFilters');
if (fl) fl.addEventListener('click', () => setTimeout(() => $$('.pcard:not(.out)').forEach((c, i) => {
  c.classList.remove('pop'); void c.offsetWidth; c.style.setProperty('--pd', i * 70 + 'ms'); c.classList.add('pop');
}), 20));
})();
