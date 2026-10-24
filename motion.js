(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v)), lerp = (a, b, t) => a + (b - a) * t;
if (RM) return;

/* directional reveals + tag stagger index */
$$('.projects .pcard').forEach((el, i) => el.classList.add(i % 2 ? 'from-r' : 'from-l'));
$$('.edu-grid .edu').forEach((el, i) => el.classList.add(i ? 'from-r' : 'from-l'));
$$('.skills .skill, .do-grid .do, .bus-matrix, .telemetry-card, .analyzer-card').forEach((el) => el.classList.add('zoom'));
$$('.reveal').forEach((card) => $$('.tag', card).forEach((t, i) => t.style.setProperty('--i', i)));

/* button ripple */
document.addEventListener('pointerdown', (e) => {
  const b = e.target.closest && e.target.closest('.btn,.filter,.term-chip');
  if (!b) return;
  const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2;
  if (getComputedStyle(b).position === 'static') b.style.position = 'relative';
  b.style.overflow = 'hidden';
  const d = document.createElement('span'); d.className = 'ripple';
  d.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
  b.appendChild(d); setTimeout(() => d.remove(), 700);
});

/* scroll-linked: timeline draw, hero parallax, marquee speed from scroll velocity */
const tl = $('.timeline'), hv = $('.hero-visual');
const tracks = $$('.marquee .track').map((el) => ({ el, a: null }));
let lastY = scrollY, vel = 0, ticking = false;
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
function update() {
  ticking = false;
  const y = scrollY;
  if (tl) { const r = tl.getBoundingClientRect(); tl.style.setProperty('--tl', clamp((innerHeight * .7 - r.top) / r.height, 0, 1).toFixed(3)); }
  if (hv && y < innerHeight * 1.2) hv.style.transform = `translateY(${(y * -.06).toFixed(1)}px)`;
}
addEventListener('scroll', onScroll, { passive: true }); update();
(function loop() {
  const y = scrollY; vel = lerp(vel, y - lastY, .12); lastY = y;
  const rate = 1 + clamp(Math.abs(vel) * .18, 0, 6);
  for (const t of tracks) {
    if (!t.a) t.a = t.el.getAnimations()[0];
    if (t.a) t.a.playbackRate = lerp(t.a.playbackRate, rate, .15);
  }
  requestAnimationFrame(loop);
})();
})();
