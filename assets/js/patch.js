/** Safe preference storage. Load before the application modules. */
(() => {
  'use strict';

  // Keep writes in memory too: reads can succeed while writes fail (quota or
  // privacy settings), and must not restore an older persisted preference.
  const memory = new Map();
  window.PortfolioStorage = {
    getItem(key) {
      key = String(key);
      if (memory.has(key)) return memory.get(key);
      try {
        return window.localStorage.getItem(key);
      } catch (_) {
        return null;
      }
    },
    setItem(key, value) {
      key = String(key);
      value = String(value);
      memory.set(key, value);
      try {
        window.localStorage.setItem(key, value);
      } catch (_) {}
    },
    removeItem(key) {
      key = String(key);
      memory.set(key, null);
      try {
        window.localStorage.removeItem(key);
      } catch (_) {}
    }
  };
})();
