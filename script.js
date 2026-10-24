/**
 * Nguyen Van Sang - Portfolio Scripts
 * Handles: Preloader, Canvas Network, Scroll Progress, Dynamic Navigation,
 * Terminal Simulation, Stat Counters, AI Chat Simulation, Scroll Reveals,
 * Project Filters, Copy to Clipboard, and Toast Notifications.
 */

(() => {
  'use strict';

  // State flag for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. PRELOADER & INITIALIZATION
     ========================================================================== */
  const initLoader = () => {
    const loader = document.getElementById('loader');
    const bootSteps = loader ? loader.querySelectorAll('.loader-text[data-step]') : [];

    if (!loader || prefersReducedMotion || !bootSteps.length) {
      startTerminalAnimation();
      return;
    }

    loader.hidden = false;
    let currentStep = 0;

    const runStep = () => {
      if (currentStep < bootSteps.length) {
        const step = bootSteps[currentStep];
        loader.dataset.step = step.dataset.step;
        bootSteps.forEach((message) => {
          message.hidden = message !== step;
        });
        currentStep++;
        setTimeout(runStep, currentStep === bootSteps.length ? 300 : 220);
      } else {
        setTimeout(() => {
          loader.classList.add('done');
          setTimeout(() => { loader.hidden = true; }, 600);
          startTerminalAnimation();
        }, 200);
      }
    };

    setTimeout(runStep, 150);
  };

  /* ==========================================================================
     2. BACKGROUND CANVAS PARTICLES NETWORK
     ========================================================================== */
  const initCanvasNetwork = () => {
    const canvas = document.getElementById('net');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasStyles = window.getComputedStyle(canvas);
    const networkColor = canvasStyles.getPropertyValue('--network-color').trim();
    const networkAccent = canvasStyles.getPropertyValue('--network-accent').trim();
    if (!networkColor || !networkAccent) return;
    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId = null;
    const mouse = { x: null, y: null, maxDist: 130 };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const density = Math.floor((width * height) / 18000);
      const count = Math.min(Math.max(density, 35), 85);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 1,
          color: Math.random() > 0.85 ? networkAccent : networkColor
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce at boundaries
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.maxDist) {
            const force = (1 - dist / mouse.maxDist) * 0.6;
            p1.x -= dx * force * 0.03;
            p1.y -= dy * force * 0.03;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${networkColor}, ${(1 - dist / mouse.maxDist) * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p1.color}, 0.75)`;
        ctx.fill();

        // Lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxConnection = 110;

          if (dist < maxConnection) {
            const alpha = (1 - dist / maxConnection) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${networkColor}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      } else if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(draw);
      }
    });

    resize();
    draw();
  };

  /* ==========================================================================
     3. SCROLL PROGRESS INDICATOR
     ========================================================================== */
  const initScrollProgress = () => {
    const progress = document.getElementById('progress');
    if (!progress) return () => {};

    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.value = Math.min(100, Math.max(0, scrolled));
      ticking = false;
    };

    const scheduleProgressUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', scheduleProgressUpdate, { passive: true });
    window.addEventListener('resize', scheduleProgressUpdate);
    window.addEventListener('pageshow', scheduleProgressUpdate);
    window.addEventListener('load', scheduleProgressUpdate);
    if ('ResizeObserver' in window) {
      const sizeObserver = new ResizeObserver(scheduleProgressUpdate);
      sizeObserver.observe(document.body);
    }
    updateProgress();
    return scheduleProgressUpdate;
  };

  /* ==========================================================================
     4. NAVIGATION: SCROLLED STATE, MOBILE TOGGLE & ACTIVE SPY
     ========================================================================== */
  const initNavigation = () => {
    const nav = document.getElementById('nav');
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [];

    // Sticky nav state
    const handleScrollNav = () => {
      if (!nav) return;
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScrollNav, { passive: true });
    handleScrollNav();

    // Mobile burger toggle
    if (nav && burger && navLinks) {
      const setMenuOpen = (isOpen) => {
        navLinks.classList.toggle('open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? burger.dataset.closeLabel : burger.dataset.openLabel);
      };

      burger.addEventListener('click', () => {
        setMenuOpen(burger.getAttribute('aria-expanded') !== 'true');
      });

      links.forEach((link) => {
        link.addEventListener('click', () => {
          setMenuOpen(false);
        });
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
          setMenuOpen(false);
          burger.focus();
        }
      });
      document.addEventListener('click', (event) => {
        if (!nav.contains(event.target)) setMenuOpen(false);
      });
      window.addEventListener('resize', () => {
        // CSS decides when the mobile button is visible.
        if (window.getComputedStyle(burger).display === 'none') setMenuOpen(false);
      });

      nav.classList.add('menu-ready');
      burger.hidden = false;
    }

    // ScrollSpy active link
    const sections = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window && sections.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
      };

      const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            links.forEach((link) => {
              if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'location');
              } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach((sec) => spyObserver.observe(sec));
    }
  };

  /* ==========================================================================
     5. HERO TERMINAL EMULATION
     ========================================================================== */
  const startTerminalAnimation = () => {
    const cmd1 = document.getElementById('cmd1');
    const out1 = document.getElementById('out1');
    const out1t = document.getElementById('out1t');
    const cmd2 = document.getElementById('cmd2');
    const out2 = document.getElementById('out2');
    const out2t = document.getElementById('out2t');

    if (!cmd1 || !out1 || !out1t || !cmd2 || !out2 || !out2t) return;

    // HTML is the source of truth; JavaScript only animates its content.
    const command1Text = cmd1.textContent;
    const output1Text = out1t.textContent;
    const command2Text = cmd2.textContent;
    const output2Text = out2t.textContent;

    const typeString = (element, text, speed, callback) => {
      let i = 0;
      element.textContent = '';
      const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
          clearInterval(timer);
          if (callback) setTimeout(callback, 200);
        }
      }, speed);
    };

    if (prefersReducedMotion) return;

    cmd1.textContent = '';
    cmd2.textContent = '';
    out1.classList.add('pending');
    out2.classList.add('pending');

    setTimeout(() => {
      typeString(cmd1, command1Text, 35, () => {
        out1t.textContent = output1Text;
        out1.classList.remove('pending');
        setTimeout(() => {
          typeString(cmd2, command2Text, 35, () => {
            out2t.textContent = output2Text;
            out2.classList.remove('pending');
          });
        }, 350);
      });
    }, 400);
  };

  /* ==========================================================================
     6. STATS COUNT-UP ANIMATION
     ========================================================================== */
  const initStatCounters = () => {
    const counters = document.querySelectorAll('.count[data-to]');
    if (!counters.length) return;

    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-to'), 10) || 0;
      if (prefersReducedMotion) {
        el.textContent = target.toLocaleString('en-US');
        return;
      }

      const duration = 1600;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(ease * target);

        el.textContent = currentVal.toLocaleString('en-US');

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = target.toLocaleString('en-US');
        }
      };

      requestAnimationFrame(updateCount);
    };

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      counters.forEach((c) => counterObserver.observe(c));
    } else {
      counters.forEach(animateCounter);
    }
  };

  /* ==========================================================================
     7. ABOUT AI ASSISTANT CHAT SIMULATION
     ========================================================================== */
  const initAiChat = () => {
    const chat = document.getElementById('chat');
    const typing = document.getElementById('typing');
    const stream = document.getElementById('stream');
    const regenBtn = document.getElementById('regen');

    if (!chat || !stream) return;

    const summaryText = stream.textContent;

    let isTyping = false;
    let hasPlayed = false;

    const playChatSequence = () => {
      if (isTyping) return;
      isTyping = true;

      if (prefersReducedMotion) {
        isTyping = false;
        return;
      }

      chat.classList.add('is-typing');
      chat.setAttribute('aria-busy', 'true');
      if (regenBtn) regenBtn.disabled = true;
      stream.textContent = '';
      if (typing) typing.classList.add('on');

      setTimeout(() => {
        if (typing) typing.classList.remove('on');
        stream.classList.add('live');

        let charIndex = 0;
        const speed = 18;

        const streamInterval = setInterval(() => {
          stream.textContent += summaryText.charAt(charIndex);
          charIndex++;

          if (charIndex >= summaryText.length) {
            clearInterval(streamInterval);
            stream.classList.remove('live');
            chat.classList.remove('is-typing');
            chat.setAttribute('aria-busy', 'false');
            if (regenBtn) regenBtn.disabled = false;
            isTyping = false;
          }
        }, speed);
      }, 750);
    };

    if (regenBtn) {
      regenBtn.addEventListener('click', () => {
        playChatSequence();
      });
      if (!prefersReducedMotion) regenBtn.hidden = false;
    }

    if ('IntersectionObserver' in window) {
      const chatObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            hasPlayed = true;
            playChatSequence();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      chatObserver.observe(chat);
    } else {
      playChatSequence();
    }
  };

  /* ==========================================================================
     8. SCROLL REVEAL OBSERVER
     ========================================================================== */
  const initScrollReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (prefersReducedMotion) {
      reveals.forEach((el) => el.classList.add('in'));
      return;
    }

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            entry.target.classList.remove('pending');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      reveals.forEach((el) => {
        el.classList.add('pending');
        revealObserver.observe(el);
      });
    } else {
      reveals.forEach((el) => el.classList.add('in'));
    }
  };

  /* ==========================================================================
     9. PROJECT FILTERING
     ========================================================================== */
  const initProjectFilters = (onLayoutChange) => {
    const filterContainer = document.getElementById('filters');
    const projectGrid = document.getElementById('projectGrid');
    if (!filterContainer || !projectGrid) return;

    const filterButtons = filterContainer.querySelectorAll('.filter');
    const projectCards = projectGrid.querySelectorAll('.pcard');

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';

        // Update active class
        filterButtons.forEach((button) => {
          const isActive = button === btn;
          button.classList.toggle('active', isActive);
          button.setAttribute('aria-pressed', String(isActive));
        });

        // Filter projects
        projectCards.forEach((card) => {
          const category = card.getAttribute('data-cat');
          card.hidden = filter !== 'all' && category !== filter;
          if (!card.hidden) {
            card.classList.remove('pending');
            card.classList.add('in');
          }
        });
        onLayoutChange();
      });
    });
    filterContainer.hidden = false;
  };

  /* ==========================================================================
     10. COPY EMAIL & TOAST NOTIFICATION
     ========================================================================== */
  const initCopyAndToast = () => {
    const copyBtn = document.getElementById('copyBtn');
    const emailLink = document.querySelector('#contact a.email[href^="mailto:"]');
    const toast = document.getElementById('toast');
    let toastTimeout = null;

    const showToast = (message) => {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('on');

      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('on');
      }, 2600);
    };

    const copyWithFallback = (email) => {
      const focusedElement = document.activeElement;
      const tempInput = document.createElement('textarea');
      tempInput.value = email;
      tempInput.className = 'clipboard-input';
      tempInput.readOnly = true;
      tempInput.tabIndex = -1;
      document.body.appendChild(tempInput);
      try {
        tempInput.select();
        return document.execCommand('copy');
      } finally {
        tempInput.remove();
        if (focusedElement && typeof focusedElement.focus === 'function') {
          focusedElement.focus({ preventScroll: true });
        }
      }
    };

    if (copyBtn && emailLink) {
      copyBtn.addEventListener('click', async () => {
        const email = decodeURIComponent(emailLink.getAttribute('href').slice('mailto:'.length).split('?')[0]);
        let copied = false;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(email);
            copied = true;
          }
        } catch {
          // A denied Clipboard API request can still use the legacy fallback.
        }
        if (!copied) {
          try {
            copied = copyWithFallback(email);
          } catch {
            copied = false;
          }
        }
        const prefix = copied ? copyBtn.dataset.success : copyBtn.dataset.fallback;
        showToast(`${prefix} ${email}`);
      });
      copyBtn.hidden = false;
    }
  };

  /* ==========================================================================
     11. DYNAMIC FOOTER YEAR
     ========================================================================== */
  const initFooterYear = () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      const currentYear = new Date().getFullYear();
      if (currentYear >= 2026) {
        yearSpan.textContent = currentYear.toString();
      }
    }
  };

  /* ==========================================================================
     INIT ON DOM READY
     ========================================================================== */
  const initApp = () => {
    initLoader();
    initCanvasNetwork();
    const updateScrollProgress = initScrollProgress();
    initNavigation();
    initStatCounters();
    initAiChat();
    initScrollReveal();
    initProjectFilters(updateScrollProgress);
    initCopyAndToast();
    initFooterYear();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
