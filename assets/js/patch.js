/**
 * PATCH — nạp TRƯỚC i18n.js.
 * 1) localStorage bị chặn (Safari riêng tư, chặn cookie) sẽ ném lỗi và làm
 *    dừng toàn bộ main.js. Shim này thay bằng bộ nhớ tạm để trang vẫn chạy.
 * 2) Menu mobile đang đóng không được nhận focus bàn phím.
 */
(() => {
  'use strict';

  try {
    window.localStorage.getItem('__probe');
  } catch (_) {
    const mem = {};
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: (k) => (Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null),
        setItem: (k, v) => { mem[k] = String(v); },
        removeItem: (k) => { delete mem[k]; }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('mobileMenu');
    if (!menu) return;
    const sync = () => { menu.inert = !document.body.classList.contains('menu-open'); };
    new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    sync();
  });
})();
