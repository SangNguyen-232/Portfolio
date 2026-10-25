/* Count-up cho các chỉ số ở hero. Nạp sau main.js. */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('.count[data-to]');
  if (reduce || !('IntersectionObserver' in window)) return;
  const run = (el) => {
    const to = +el.dataset.to, t0 = performance.now(), dur = 1200;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((es) => es.forEach((en) => {
    if (en.isIntersecting) { io.unobserve(en.target); run(en.target); }
  }), { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
})();