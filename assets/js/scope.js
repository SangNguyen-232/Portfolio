/**
 * =====================================================================
 * NEURAL CANVAS PARTICLES
 * Ambient Hardware Network
 * =====================================================================
 */

window.ScopeEngine = (() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* =====================================================================
     1. NEURAL PARTICLE NETWORK CANVAS (#net)
     ===================================================================== */
  const initNeuralNetwork = () => {
    const canvas = document.getElementById('net');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const C = [[95, 227, 200], [255, 181, 71], [191, 242, 230]];
    const col = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    let W, H;
    let nodes = [];
    let pulses = [];
    let lastTime = 0;
    let rafId = null;
    let mouse = { x: -10000, y: -10000, active: false };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = Math.min(Math.max(Math.round((W * H) / (isFinePointer ? 15000 : 30000)), 20), 80);
      while (nodes.length < targetCount) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          r: 1 + Math.random() * 1.5,
          c: C[Math.random() < 0.65 ? 0 : Math.random() < 0.5 ? 1 : 2]
        });
      }
      nodes.length = targetCount;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    const draw = (t) => {
      rafId = requestAnimationFrame(draw);
      if (t - lastTime < 32) return; // ~30fps lock for smooth battery saving
      lastTime = t;

      ctx.clearRect(0, 0, W, H);
      const edges = [];

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 200 && dist > 2) {
            const force = 0.02 * (1 - dist / 200);
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx *= 0.995;
        p.vy *= 0.995;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 1) {
          p.vx /= speed;
          p.vy /= speed;
        } else if (speed < 0.05) {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }

        p.x = (p.x + p.vx + W + 20) % (W + 20);
        p.y = (p.y + p.vy + H + 20) % (H + 20);
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 140) continue;
          ctx.strokeStyle = col(a.c, (1 - d / 140) * 0.25);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          if (edges.length < 250) edges.push([a, b]);
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        ctx.fillStyle = col(p.c, 0.8);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Traveling signal pulses along connected hardware traces
      if (edges.length && pulses.length < 8 && Math.random() < 0.08) {
        const [a, b] = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ a, b, t: 0, s: 0.015 + Math.random() * 0.02 });
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const q = pulses[i];
        q.t += q.s;
        if (q.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const x = aLerp(q.a.x, q.b.x, q.t);
        const y = aLerp(q.a.y, q.b.y, q.t);
        const f = Math.sin(q.t * Math.PI);
        ctx.fillStyle = `rgba(255, 181, 71, ${0.4 * f})`;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * f})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const aLerp = (a, b, t) => a + (b - a) * t;

    resize();
    rafId = requestAnimationFrame(draw);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(draw);
      }
    });
  };

  return {
    initNeuralNetwork
  };
})();
