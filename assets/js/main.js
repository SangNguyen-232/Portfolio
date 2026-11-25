/**
 * =====================================================================
 * MAIN APPLICATION CONTROLLER
 * Nguyen Van Sang — Embedded Software Engineer Portfolio
 * Clean Architecture & Modern Front-End Engineering
 * =====================================================================
 */

(() => {
  'use strict';

  // Safe preference storage
  const memoryStorage = new Map();
  window.PortfolioStorage = {
    getItem(key) {
      key = String(key);
      if (memoryStorage.has(key)) return memoryStorage.get(key);
      try {
        return window.localStorage.getItem(key);
      } catch (_) {
        return null;
      }
    },
    setItem(key, value) {
      key = String(key);
      value = String(value);
      memoryStorage.set(key, value);
      try {
        window.localStorage.setItem(key, value);
      } catch (_) {}
    }
  };

  const root = document.documentElement;
  const LED_KEY = 'sang_portfolio_led';
  try {
    root.classList.toggle('no-led', !!(window.PortfolioStorage.getItem(LED_KEY) === 'off'));
  } catch (_) {}

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotionState = motionQuery.matches;
  motionQuery.addEventListener('change', (event) => { reducedMotionState = event.matches; });
  const prefersReducedMotion = () => reducedMotionState;
  const scrollBehavior = () => prefersReducedMotion() ? 'auto' : 'smooth';
  let closeMobileMenu = () => {};

  /* =====================================================================
     1. PRELOADER & INITIALIZATION
     ===================================================================== */
  const initPreloader = () => {
    const loader = document.getElementById('loader');
    if (!loader) return;

    if (prefersReducedMotion()) {
      loader.classList.add('done');
      return;
    }

    setTimeout(() => {
      loader.classList.add('done');
    }, 1400);
  };

  /* =====================================================================
     2. POINTER TILT ON CARDS
     ===================================================================== */
  const initCardTilt = () => {
    const hover = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const cards = document.querySelectorAll('.pcard, .skill, .do, .edu, .tl-card, .term, .eng-card, .chat, .profile, .contact-card');
    let active = null;
    let bounds = null;
    let frame = null;
    let clientX = 0;
    let clientY = 0;

    const clear = () => {
      if (!active) return;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      active.style.removeProperty('transform');
      active.classList.remove('tilting', 'chip-active');
      window.ScopeEngine?.setHoveredCard(null, false);
      active = null;
      bounds = null;
    };

    const render = () => {
      frame = null;
      if (!bounds) bounds = active.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = Math.max(-0.5, Math.min(0.5, (clientX - bounds.left) / bounds.width - 0.5));
      const y = Math.max(-0.5, Math.min(0.5, (clientY - bounds.top) / bounds.height - 0.5));
      active.style.transform = `perspective(1000px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-3px)`;
    };

    const track = (event) => {
      if (!hover.matches || event.pointerType === 'touch' || document.hidden) return;
      if (active !== event.currentTarget) {
        clear();
        active = event.currentTarget;
        active.classList.add('tilting', 'chip-active');
        window.ScopeEngine?.setHoveredCard(active, true);
      }
      clientX = event.clientX;
      clientY = event.clientY;
      if (frame === null) frame = requestAnimationFrame(render);
    };

    cards.forEach((card) => {
      card.addEventListener('pointerenter', track, {passive: true});
      card.addEventListener('pointermove', track, {passive: true});
      const leave = () => { if (active === card) clear(); };
      card.addEventListener('pointerleave', leave);
      card.addEventListener('pointercancel', leave);
    });

    const invalidateBounds = () => { bounds = null; };
    window.addEventListener('scroll', invalidateBounds, {passive: true});
    window.addEventListener('resize', invalidateBounds);
    window.addEventListener('blur', clear);
    document.addEventListener('visibilitychange', () => { if (document.hidden) clear(); });
    hover.addEventListener('change', clear);
  };

  /* =====================================================================
     4. BUTTON RIPPLE EFFECT
     ===================================================================== */
  const initButtonRipple = () => {
    motionQuery.addEventListener('change', () => {
      if (prefersReducedMotion()) document.querySelectorAll('.ripple').forEach((el) => el.remove());
    });
    document.addEventListener('pointerdown', (e) => {
      if (prefersReducedMotion()) return;
      const btn = e.target.closest && e.target.closest('.btn, .pcard-link, .regen');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  };

  /* =====================================================================
     5. SCROLL MANAGER (PROGRESS, NAV SPY, REVEALS, TIMELINE)
     ===================================================================== */
  const initScrollManager = () => {
    const nav = document.getElementById('nav');
    const progressBar = document.getElementById('scrollProgressBar');
    const timeline = document.querySelector('.timeline');
    const sections = [...document.querySelectorAll('.nav-links a[href^="#"]')]
      .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
      .filter(Boolean);
    const navLinks = document.querySelectorAll('.nav-links a, #mobileMenu nav a, .toc a');
    const toc = document.getElementById('toc');
    const tocLinks = toc ? [...toc.querySelectorAll('a')] : [];
    const trackLine = document.getElementById('tocTrackLine');
    const laserLine = document.getElementById('tocLaserLine');
    const photonHead = document.getElementById('tocPhotonHead');
    let activeSectionId = null;

    const updateTocBeam = (activeId) => {
      if (!toc || !tocLinks.length || !trackLine || !laserLine || !photonHead) return;
      if (!toc.getClientRects().length) return;

      const tocRect = toc.getBoundingClientRect();
      if (tocRect.width === 0 || tocRect.height === 0) return;

      const points = tocLinks.map((link) => {
        const icon = link.querySelector('i');
        const r = icon.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - tocRect.left,
          y: r.top + r.height / 2 - tocRect.top
        };
      });

      const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
      trackLine.setAttribute('d', pathD);
      laserLine.setAttribute('d', pathD);

      const activeIndex = tocLinks.findIndex((link) => link.getAttribute('href') === `#${activeId}`);
      toc.classList.toggle('has-active', activeIndex >= 0);

      tocLinks.forEach((link, index) => {
        link.classList.toggle('passed', index < activeIndex);
        link.classList.toggle('active', index === activeIndex);
      });

      let totalLength = 0;
      for (let i = 0; i < points.length - 1; i++) {
        totalLength += Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y);
      }

      if (activeIndex < 0) {
        laserLine.style.strokeDasharray = `${totalLength} ${totalLength}`;
        laserLine.style.strokeDashoffset = `${totalLength}`;
        photonHead.style.opacity = '0';
        return;
      }

      let activeLength = 0;
      for (let i = 0; i < activeIndex; i++) {
        activeLength += Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y);
      }

      laserLine.style.strokeDasharray = `${totalLength} ${totalLength}`;
      laserLine.style.strokeDashoffset = `${Math.max(0, totalLength - activeLength)}`;

      const activePt = points[activeIndex];
      photonHead.style.transform = `translate(${activePt.x.toFixed(1)}px, ${activePt.y.toFixed(1)}px)`;
      photonHead.style.opacity = '1';
    };

    // Responsive click handling with instantaneous laser feedback
    tocLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.getElementById(href.slice(1));
          if (target) {
            // Preserve native anchor navigation, focus, and browser history.
            activeSectionId = href.slice(1);
            updateTocBeam(activeSectionId);
          }
        }
      });
    });
    const reveals = document.querySelectorAll('.reveal');
    const chatSection = document.getElementById('chat');

    // Directional tag stagger
    document.querySelectorAll('.projects .pcard').forEach((el, i) => el.classList.add(i % 2 ? 'from-r' : 'from-l'));
    document.querySelectorAll('.edu-grid .edu').forEach((el, i) => el.classList.add(i ? 'from-r' : 'from-l'));
    document.querySelectorAll('.skills .skill, .do-grid .do').forEach((el) => el.classList.add('zoom'));
    reveals.forEach((card) => {
      card.querySelectorAll('.tag').forEach((t, i) => t.style.setProperty('--i', i));
    });

    // IntersectionObserver for Reveals
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      reveals.forEach((r) => revealObserver.observe(r));

      if (chatSection) {
        const chatObserver = new IntersectionObserver((entries, obs) => {
          if (entries[0].isIntersecting) {
            if (window.TerminalEngine) window.TerminalEngine.startChatStream();
            obs.unobserve(chatSection);
          }
        }, { threshold: 0.3 });
        chatObserver.observe(chatSection);
      }
    } else {
      reveals.forEach((r) => r.classList.add('in'));
      if (chatSection && window.TerminalEngine) window.TerminalEngine.startChatStream();
    }

    // Single Optimized Scroll Listener
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    };

    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

    const updateScroll = () => {
      ticking = false;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // 1. Progress Bar
      if (progressBar && docHeight > 0) {
        const pct = clamp((scrollY / docHeight) * 100, 0, 100);
        progressBar.style.width = `${pct}%`;
      }

      // 2. Nav Scrolled Class
      if (nav) {
        nav.classList.toggle('scrolled', scrollY > 40);
      }

      // 3. Timeline Scale
      if (timeline) {
        const rect = timeline.getBoundingClientRect();
        const progress = clamp((window.innerHeight * 0.7 - rect.top) / rect.height, 0, 1);
        timeline.style.setProperty('--tl', progress.toFixed(3));
      }

      // 4. Active Section Spy
      let activeId = sections.length ? sections[0].id : '';
      const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      sections.forEach((sec) => {
        const scrollMargin = parseFloat(getComputedStyle(sec).scrollMarginTop) || 0;
        const top = sec.getBoundingClientRect().top + scrollY - scrollPadding - scrollMargin - 1;
        if (scrollY >= top) {
          activeId = sec.id;
        }
      });
      if (sections.length && docHeight > 0 && scrollY >= docHeight - 1) {
        activeId = sections[sections.length - 1].id;
      }

      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const isActive = href === `#${activeId}`;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });

      if (activeSectionId !== activeId) {
        activeSectionId = activeId;
        updateTocBeam(activeId);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateTocBeam(activeSectionId);
      onScroll();
    }, { passive: true });
    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateTocBeam(activeSectionId);
        onScroll();
      });
    }
    updateScroll();
    requestAnimationFrame(() => updateTocBeam(activeSectionId));
  };

  /* =====================================================================
     6. SECTION TITLE SCRAMBLE EFFECT
     ===================================================================== */
  const initScrambleTitles = () => {
    const running = new Map();
    motionQuery.addEventListener('change', () => {
      if (!prefersReducedMotion()) return;
      running.forEach(({ rafId, text, language }, el) => {
        cancelAnimationFrame(rafId);
        if (document.documentElement.lang === language) el.textContent = text;
      });
      running.clear();
    });
    const chars = '!<>-_/[]{}=+*^?#01';
    const scramble = (el) => {
      if (prefersReducedMotion()) return;
      const text = el.textContent;
      const language = document.documentElement.lang;
      let frame = 0;
      const queue = [...text].map((c, i) => ({
        c,
        start: i * 1.2,
        end: i * 1.2 + 10 + Math.random() * 8,
        char: ''
      }));

      const step = () => {
        // Translation may replace the title while its reveal is animating.
        if (document.documentElement.lang !== language) {
          running.delete(el);
          return;
        }
        let output = '', complete = 0;
        for (const item of queue) {
          if (frame >= item.end) {
            complete++;
            output += item.c;
          } else if (frame >= item.start) {
            if (!item.char || Math.random() < 0.3) {
              item.char = item.c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
            }
            output += `<span style="color:var(--mint);opacity:0.75">${item.char}</span>`;
          } else {
            output += item.c === ' ' ? ' ' : '&nbsp;';
          }
        }
        el.innerHTML = output;
        if (complete < queue.length) {
          frame++;
          running.set(el, { rafId: requestAnimationFrame(step), text, language });
        } else {
          running.delete(el);
          el.textContent = text;
        }
      };

      step();
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            io.unobserve(en.target);
            scramble(en.target);
          }
        });
      }, { threshold: 0.6 });

      document.querySelectorAll('.sec-title').forEach((el) => io.observe(el));
    }
  };

  /* =====================================================================
     7. ARCHITECTURE MODALS & KEYBOARD SHORTCUTS
     ===================================================================== */
  const initModalsAndShortcuts = () => {
    const backdrop = document.getElementById('modalBackdrop');
    const dialog = document.getElementById('modalDialog');
    const title = document.getElementById('modalTitle');
    const sub = document.getElementById('modalSub');
    const body = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalClose');
    const footerClose = document.getElementById('modalFooterClose');
    const inspectBtns = document.querySelectorAll('[data-modal]');

    const shortcutsModal = document.getElementById('shortcutsModal');
    const shortcutsClose = document.getElementById('shortcutsClose');
    const helperBtn = document.getElementById('shortcutsHelperBtn');

    const shortcutsDialog = shortcutsModal && shortcutsModal.querySelector('[role="dialog"]');
    let activeModal = null;
    let previousOverflow = '';
    const backgroundState = new Map();

    const restoreBackground = () => {
      backgroundState.forEach((wasInert, el) => { el.inert = wasInert; });
      backgroundState.clear();
    };

    const openDialog = (modalBackdrop, modalDialog) => {
      if (!modalBackdrop || !modalDialog) return;
      closeMobileMenu(false);
      const previousModal = activeModal;
      const opener = previousModal ? previousModal.opener : document.activeElement;
      if (!previousModal) previousOverflow = document.body.style.overflow;
      restoreBackground();

      modalBackdrop.classList.add('open');
      modalBackdrop.setAttribute('aria-hidden', 'false');
      modalDialog.style.visibility = 'visible';
      activeModal = { backdrop: modalBackdrop, dialog: modalDialog, opener };
      document.body.style.overflow = 'hidden';
      modalDialog.focus({ preventScroll: true });

      if (previousModal && previousModal.backdrop !== modalBackdrop) {
        previousModal.dialog.style.visibility = '';
        previousModal.backdrop.classList.remove('open');
        previousModal.backdrop.setAttribute('aria-hidden', 'true');
      }
      [...document.body.children].forEach((el) => {
        if (el === modalBackdrop) return;
        backgroundState.set(el, el.inert);
        el.inert = true;
      });
    };

    const closeDialog = () => {
      if (!activeModal) return;
      const closingModal = activeModal;
      activeModal = null;
      restoreBackground();
      document.body.style.overflow = previousOverflow;
      if (closingModal.opener && closingModal.opener.isConnected) {
        closingModal.opener.focus({ preventScroll: true });
      }
      if (closingModal.dialog.contains(document.activeElement)) document.activeElement.blur();
      closingModal.dialog.style.visibility = '';
      closingModal.backdrop.classList.remove('open');
      closingModal.backdrop.setAttribute('aria-hidden', 'true');
    };

    const openModal = (modalKey) => {
      const data = window.PortfolioData && window.PortfolioData.modalContentData[modalKey];
      if (!data || !backdrop || !dialog || !body || !title || !sub) return;
      const isVi = document.documentElement.lang === 'vi';
      title.textContent = isVi ? data.title_vi : data.title_en;
      sub.textContent = isVi ? data.sub_vi : data.sub_en;
      dialog.classList.toggle('iot-inspector', Boolean(data.renderBody));
      body.tabIndex = 0;
      if (data.renderBody) {
        data.renderBody(body, isVi ? 'vi' : 'en');
      } else {
        body.innerHTML = isVi ? data.body_vi : data.body_en;
        // Keep native scroll containers in the dialog's Tab cycle.
        body.querySelectorAll('.arch-card').forEach((card) => { card.tabIndex = 0; });
      }
      body.scrollTop = 0;
      openDialog(backdrop, dialog);
    };

    const toggleShortcutsModal = () => {
      if (activeModal && activeModal.backdrop === shortcutsModal) closeDialog();
      else openDialog(shortcutsModal, shortcutsDialog);
    };

    inspectBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-modal');
        if (key) openModal(key);
      });
    });
    if (closeBtn) closeBtn.addEventListener('click', closeDialog);
    if (footerClose) footerClose.addEventListener('click', closeDialog);
    if (helperBtn) helperBtn.addEventListener('click', toggleShortcutsModal);
    if (shortcutsClose) shortcutsClose.addEventListener('click', closeDialog);
    [backdrop, shortcutsModal].filter(Boolean).forEach((modalBackdrop) => {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeDialog();
      });
    });

    // Keep programmatic focus inside the open dialog as well as keyboard focus.
    document.addEventListener('focusin', (e) => {
      if (activeModal && !activeModal.dialog.contains(e.target)) {
        activeModal.dialog.focus({ preventScroll: true });
      }
    });

    const trapTab = (e) => {
      const modalDialog = activeModal.dialog;
      const focusable = [...modalDialog.querySelectorAll('a[href], button, details > summary, input, textarea, select, [tabindex], [contenteditable="true"]')]
        .filter((el) => !el.matches(':disabled') && el.tabIndex >= 0 &&
          !el.closest('[inert]') && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;
      if (!first) {
        e.preventDefault();
        modalDialog.focus({ preventScroll: true });
      } else if (e.shiftKey && (current === first || !focusable.includes(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || !focusable.includes(current))) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', (e) => {
      if (e.defaultPrevented) return;
      if (activeModal && e.key === 'Tab') {
        trapTab(e);
        return;
      }
      if (e.key === 'Escape') {
        if (activeModal) {
          e.preventDefault();
          closeDialog();
        } else if (document.body.classList.contains('menu-open')) {
          e.preventDefault();
          closeMobileMenu();
        }
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat || e.isComposing) return;
      const focused = document.activeElement;
      if (focused && (['INPUT', 'TEXTAREA', 'SELECT'].includes(focused.tagName) || focused.isContentEditable)) return;

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        toggleShortcutsModal();
        return;
      }
      if (activeModal) return;
      if (e.key.toLowerCase() === 'l') {
        const langToggle = document.getElementById('langToggle');
        if (langToggle) langToggle.click();
      } else if (e.key.toLowerCase() === 'b') {
        const off = root.classList.toggle('no-led');
        try {
          window.PortfolioStorage.setItem(LED_KEY, off ? 'off' : 'on');
        } catch (_) {}
      } else if (e.key.toLowerCase() === 't') {
        closeMobileMenu(false);
        const term = document.getElementById('term');
        if (term) {
          term.scrollIntoView({ behavior: scrollBehavior() });
          term.focus({ preventScroll: true });
        }
      } else if (e.key.toLowerCase() === 'p') {
        closeMobileMenu(false);
        const proj = document.getElementById('projects');
        if (proj) proj.scrollIntoView({ behavior: scrollBehavior() });
      }
    });
  };

  /* =====================================================================
     8. CLIPBOARD COPY & TOAST NOTIFICATION
     ===================================================================== */
  const showToast = (message) => {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg') || toast;
    if (!toast) return;

    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  const initClipboard = () => {
    const copyLinks = document.querySelectorAll('[data-copy]');

    const copyText = (text, successMsg) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(successMsg);
        }).catch(() => window.prompt('Copy:', text));
      } else {
        window.prompt('Copy:', text);
      }
    };

    copyLinks.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const value = el.dataset.copy || 'sangnguyen230204@gmail.com';
        const isPhone = el.dataset.copyType === 'phone';
        const isVi = document.documentElement.lang === 'vi';
        const msg = isPhone
          ? (isVi ? 'Đã sao chép số điện thoại: ' + value : 'Copied phone: ' + value)
          : (isVi ? 'Đã sao chép email: ' + value : 'Copied email: ' + value);
        copyText(value, msg);
      });
    });
  };

  /* =====================================================================
     9. MOBILE MENU DRAWER
     ===================================================================== */
  const initMobileMenu = () => {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!burger || !mobileMenu) return;

    let previousOverflow = '';
    const updateLabel = () => {
      const isOpen = document.body.classList.contains('menu-open');
      const lang = document.documentElement.lang === 'vi' ? 'vi' : 'en';
      const dict = window.PortfolioData && window.PortfolioData.i18n[lang];
      const key = isOpen ? 'a11y.menuClose' : 'a11y.menuOpen';
      burger.setAttribute('aria-label', (dict && dict[key]) || (isOpen ? 'Close menu' : 'Open menu'));
    };
    const setMenu = (isOpen, restoreFocus = true) => {
      const wasOpen = document.body.classList.contains('menu-open');
      if (isOpen && !wasOpen) previousOverflow = document.body.style.overflow;
      document.body.classList.toggle('menu-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      // Move focus before hiding the active menu subtree.
      if (!isOpen && wasOpen && (restoreFocus || mobileMenu.contains(document.activeElement))) {
        burger.focus({ preventScroll: true });
      }
      mobileMenu.inert = !isOpen;
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus({ preventScroll: true });
      } else if (wasOpen) {
        document.body.style.overflow = previousOverflow;
      }
      updateLabel();
    };
    closeMobileMenu = (restoreFocus = true) => setMenu(false, restoreFocus);
    setMenu(false, false);
    burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeMobileMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.defaultPrevented || e.key !== 'Tab' || !document.body.classList.contains('menu-open')) return;
      // The header stays visible above the drawer, including its language control.
      const focusable = [...document.querySelectorAll('#nav a[href], #nav button, #mobileMenu a[href]')]
        .filter((el) => !el.matches(':disabled') && el.getClientRects().length > 0 &&
          getComputedStyle(el).visibility !== 'hidden');
      const currentIndex = focusable.indexOf(document.activeElement);
      const nextIndex = (currentIndex + (e.shiftKey ? -1 : 1) + focusable.length) % focusable.length;
      e.preventDefault();
      focusable[nextIndex].focus();
    });
    window.addEventListener('resize', () => {
      if (document.body.classList.contains('menu-open') && getComputedStyle(burger).display === 'none') {
        closeMobileMenu(false);
      }
    }, { passive: true });
    new MutationObserver(updateLabel).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  };

  /* =====================================================================
     10. SYNCHRONIZED LED BORDER CONTROLLER
     ===================================================================== */
  const initLedController = () => {
    const syncVisibility = () => root.classList.toggle('led-paused', document.hidden);
    syncVisibility();
    document.addEventListener('visibilitychange', syncVisibility);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          target.classList.toggle('led-off', !isIntersecting);
        });
      }, { rootMargin: '100px' });

      const targets = new Set([
        ...document.querySelectorAll('.glass, .nav-inner, .term, .pcard-visual'),
        ...document.querySelectorAll('.section, .sec-head .sec-title')
      ]);

      targets.forEach((el) => {
        if (!el.classList.contains('nav-inner')) {
          observer.observe(el);
        }
      });
    }
  };

  /* =====================================================================
     11. BOOTSTRAP CLIENT APPLICATION
     ===================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Init & Toggle
    const currentLang = (window.PortfolioStorage && window.PortfolioStorage.getItem('sang_portfolio_lang')) || 'en';
    if (window.PortfolioData) {
      window.PortfolioData.applyTranslations(currentLang);
    }

    const langToggle = document.getElementById('langToggle');
    if (langToggle && window.PortfolioData) {
      langToggle.addEventListener('click', () => {
        const activeLang = document.documentElement.lang;
        const nextLang = activeLang === 'en' ? 'vi' : 'en';
        window.PortfolioData.applyTranslations(nextLang);
        if (window.TerminalEngine) {
          window.TerminalEngine.resetStream();
          window.TerminalEngine.startChatStream();
        }
      });
    }

    // 2. Chat Regenerate Button
    const regenBtn = document.getElementById('regenBtn');
    if (regenBtn && window.TerminalEngine) {
      regenBtn.addEventListener('click', () => {
        window.TerminalEngine.resetStream();
        window.TerminalEngine.startChatStream();
      });
    }

    // 3. Preloader
    initPreloader();

    // 4. Hardware & Canvas Modules
    if (window.ScopeEngine) {
      window.ScopeEngine.initNeuralNetwork();
    }

    // 5. Interaction Systems
    initCardTilt();
    initButtonRipple();
    initScrollManager();
    initScrambleTitles();
    initModalsAndShortcuts();
    initClipboard();
    initMobileMenu();
    initLedController();
    document.documentElement.classList.remove('no-js');
  });
})();
