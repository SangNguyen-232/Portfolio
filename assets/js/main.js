/**
 * =====================================================================
 * MAIN APPLICATION CONTROLLER
 * Nguyen Van Sang — Embedded Software Engineer Portfolio
 * Clean Architecture & Modern Front-End Engineering
 * =====================================================================
 */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* =====================================================================
     1. PRELOADER & INITIALIZATION
     ===================================================================== */
  const initPreloader = () => {
    const loader = document.getElementById('loader');
    if (!loader) {
      if (window.TerminalEngine) window.TerminalEngine.startTerminalTyping();
      return;
    }

    if (prefersReducedMotion) {
      loader.classList.add('done');
      if (window.TerminalEngine) window.TerminalEngine.startTerminalTyping();
      return;
    }

    setTimeout(() => {
      loader.classList.add('done');
      if (window.TerminalEngine) window.TerminalEngine.startTerminalTyping();
    }, 1400);
  };

  /* =====================================================================
     2. CUSTOM CYBER CURSOR & SPOTLIGHT
     ===================================================================== */
  const initCustomCursor = () => {
    if (!isFinePointer || prefersReducedMotion) return;

    let dot = document.querySelector('.cursor-dot');
    let ring = document.querySelector('.cursor-ring');
    const spot = document.getElementById('spot');

    if (!dot || !ring) {
      dot = document.createElement('div');
      dot.className = 'cursor-dot';
      ring = document.createElement('div');
      ring.className = 'cursor-ring';
      document.body.append(dot, ring);
    }

    document.body.classList.add('cursor-on');

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let spotX = window.innerWidth / 2, spotY = window.innerHeight / 3;
    let rafId = null;
    let hasPointer = false;

    const lerp = (a, b, t) => a + (b - a) * t;
    const positionCursor = () => {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      if (spot) {
        spot.style.setProperty('--x', `${spotX}px`);
        spot.style.setProperty('--y', `${spotY}px`);
      }
    };

    const renderCursor = () => {
      rafId = null;
      if (document.hidden) return;

      ringX = lerp(ringX, mouseX, 0.2);
      ringY = lerp(ringY, mouseY, 0.2);
      if (spot) {
        spotX = lerp(spotX, mouseX, 0.08);
        spotY = lerp(spotY, mouseY, 0.08);
      }

      const settled = Math.abs(ringX - mouseX) < 0.1 && Math.abs(ringY - mouseY) < 0.1 &&
        (!spot || (Math.abs(spotX - mouseX) < 0.1 && Math.abs(spotY - mouseY) < 0.1));
      if (settled) {
        ringX = spotX = mouseX;
        ringY = spotY = mouseY;
      }
      positionCursor();
      if (!settled) rafId = requestAnimationFrame(renderCursor);
    };

    const scheduleCursor = () => {
      if (rafId === null && !document.hidden) rafId = requestAnimationFrame(renderCursor);
    };

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      hasPointer = true;

      const isHovering = !!(e.target.closest && e.target.closest('a, button, [data-cursor], .tag, .pill, .pcard, .skill, .term-chip'));
      document.body.classList.toggle('cursor-hover', isHovering);
      scheduleCursor();
    }, { passive: true });

    window.addEventListener('pointerdown', () => document.body.classList.add('cursor-down'));
    window.addEventListener('pointerup', () => document.body.classList.remove('cursor-down'));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
        document.body.classList.remove('cursor-down');
      } else if (hasPointer) {
        scheduleCursor();
      }
    });

    positionCursor();
  };

  /* =====================================================================
     3. 3D TILT, MAGNETIC BUTTONS & SPOTLIGHT BORDER
     ===================================================================== */
  const initTiltAndSpotlight = () => {
    // Spotlight border on glass cards
    document.querySelectorAll('.spot').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      }, { passive: true });
    });

    if (!isFinePointer || prefersReducedMotion) return;

    // 3D Tilt on Cards
    document.querySelectorAll('.pcard, .skill, .do, .edu, .tl-card').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.classList.add('tilting');
        el.style.transform = `perspective(1000px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-3px)`;
      });

      el.addEventListener('pointerleave', () => {
        el.classList.remove('tilting');
        el.style.transform = '';
      });
    });

    // Magnetic Micro-Interactions on Interactive Elements
    document.querySelectorAll('.btn, .social, .totop, .mobile-socials a').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });
    });
  };

  /* =====================================================================
     4. BUTTON RIPPLE EFFECT
     ===================================================================== */
  const initButtonRipple = () => {
    if (prefersReducedMotion) return;

    document.addEventListener('pointerdown', (e) => {
      const btn = e.target.closest && e.target.closest('.btn, .term-chip, .btn-copy-quick');
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
      setTimeout(() => ripple.remove(), 700);
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
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.getElementById(href.slice(1));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
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
    if (prefersReducedMotion) return;

    const chars = '!<>-_/[]{}=+*^?#01';
    const scramble = (el) => {
      const text = el.textContent;
      let frame = 0;
      const queue = [...text].map((c, i) => ({
        c,
        start: i * 1.2,
        end: i * 1.2 + 10 + Math.random() * 8,
        char: ''
      }));

      const step = () => {
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
          requestAnimationFrame(step);
        } else {
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
      const isVi = localStorage.getItem('sang_portfolio_lang') === 'vi';
      title.textContent = isVi ? data.title_vi : data.title_en;
      sub.textContent = isVi ? data.sub_vi : data.sub_en;
      body.innerHTML = isVi ? data.body_vi : data.body_en;
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
      const focusable = [...modalDialog.querySelectorAll('a[href], button, input, textarea, select, [tabindex], [contenteditable="true"]')]
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
          document.body.classList.remove('menu-open');
          const mobileMenu = document.getElementById('mobileMenu');
          const burger = document.getElementById('burger');
          if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'true');
          if (burger) {
            burger.setAttribute('aria-expanded', 'false');
            burger.focus();
          }
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
      } else if (e.key.toLowerCase() === 't') {
        const term = document.getElementById('term');
        if (term) term.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key.toLowerCase() === 'p') {
        const proj = document.getElementById('projects');
        if (proj) proj.scrollIntoView({ behavior: 'smooth' });
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
    const copyBtn = document.getElementById('copyEmailBtn');
    const quickCopyEmail = document.getElementById('quickCopyEmail');

    const copyText = (text, successMsg) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(successMsg);
        }).catch(() => window.prompt('Copy:', text));
      } else {
        window.prompt('Copy:', text);
      }
    };

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const email = 'sangnguyen230204@gmail.com';
        const isVi = localStorage.getItem('sang_portfolio_lang') === 'vi';
        copyText(email, isVi ? 'Đã sao chép email: ' + email : 'Copied email: ' + email);
      });
    }

    if (quickCopyEmail) {
      quickCopyEmail.addEventListener('click', (e) => {
        e.preventDefault();
        const email = quickCopyEmail.dataset.copy || 'sangnguyen230204@gmail.com';
        const isVi = localStorage.getItem('sang_portfolio_lang') === 'vi';
        copyText(email, isVi ? 'Đã sao chép email: ' + email : 'Copied email: ' + email);
      });
    }
  };

  /* =====================================================================
     9. MOBILE MENU DRAWER
     ===================================================================== */
  const initMobileMenu = () => {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!burger || !mobileMenu) return;

    const toggleMenu = () => {
      const isOpen = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    };

    burger.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  };

  /* =====================================================================
     10. BOOTSTRAP CLIENT APPLICATION
     ===================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Init & Toggle
    const currentLang = localStorage.getItem('sang_portfolio_lang') || 'en';
    if (window.PortfolioData) {
      window.PortfolioData.applyTranslations(currentLang);
    }

    const langToggle = document.getElementById('langToggle');
    if (langToggle && window.PortfolioData) {
      langToggle.addEventListener('click', () => {
        const activeLang = localStorage.getItem('sang_portfolio_lang') || 'en';
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

    if (window.TerminalEngine) {
      window.TerminalEngine.initInteractiveTerminal();
    }

    // 5. Interaction Systems
    initCustomCursor();
    initTiltAndSpotlight();
    initButtonRipple();
    initScrollManager();
    initScrambleTitles();
    initModalsAndShortcuts();
    initClipboard();
    initMobileMenu();
  });
})();
