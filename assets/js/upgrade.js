/**
 * UPGRADE LAYER — Synchronized LED Border Controller
 * Manages GPU-accelerated LED border state, viewport visibility optimization,
 * and user shortcut [B] toggle with zero layout shift.
 */
(() => {
  'use strict';

  const root = document.documentElement;
  const KEY = 'sang_portfolio_led';
  const SELECTOR = '.glass, .nav-inner, .term, .stat, .pcard-visual';

  // Restore user LED preference from localStorage if available
  try {
    root.classList.toggle('no-led', !!(window.PortfolioStorage && window.PortfolioStorage.getItem(KEY) === 'off'));
  } catch (_) {}

  // Safely register CSS custom angle property for smooth hardware conic rotation
  if (window.CSS && typeof window.CSS.registerProperty === 'function') {
    try {
      window.CSS.registerProperty({
        name: '--led-a',
        syntax: '<angle>',
        inherits: false,
        initialValue: '0deg',
      });
    } catch (_) {
      // Already defined via CSS @property
    }
  }

  // Viewport IntersectionObserver: pauses LED animation when off-screen to preserve GPU/CPU cycles
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        target.classList.toggle('led-off', !isIntersecting);
      });
    }, { rootMargin: '100px' });

    const targets = new Set([
      ...document.querySelectorAll(SELECTOR),
      ...document.querySelectorAll('.section, .sec-head .sec-title')
    ]);

    targets.forEach((el) => {
      if (!el.classList.contains('nav-inner')) {
        observer.observe(el);
      }
    });
  }

  // Pause animations when browser tab is inactive / backgrounded
  const updateVisibility = () => {
    root.classList.toggle('led-paused', document.hidden);
  };
  document.addEventListener('visibilitychange', updateVisibility);
  updateVisibility();

  // Keyboard shortcut [B] to toggle running LED borders
  window.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.repeat || event.isComposing) return;
    if (event.ctrlKey || event.metaKey || event.altKey || event.key.toLowerCase() !== 'b') return;

    const active = document.activeElement;
    if (active && (active.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName))) {
      return;
    }
    if (document.querySelector('.modal-backdrop.open')) return;

    const off = root.classList.toggle('no-led');
    try {
      if (window.PortfolioStorage) window.PortfolioStorage.setItem(KEY, off ? 'off' : 'on');
    } catch (_) {}
  });
})();
