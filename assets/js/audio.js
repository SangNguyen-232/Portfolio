/**
 * =====================================================================
 * SYNTHESIZED CYBER AUDIO ENGINE (Web Audio API)
 * Zero External Audio Assets — Pure Hardware-Style Synthesizer
 * =====================================================================
 */

window.AudioEngine = (() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let sfxEnabled = localStorage.getItem('sang_portfolio_sfx') === 'true';
  let audioCtx = null;

  const playCyberSound = (frequency = 800, duration = 0.05, type = 'sine') => {
    if (!sfxEnabled || prefersReducedMotion) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  const initSoundToggle = () => {
    const sfxBtn = document.getElementById('sfxToggle');
    if (!sfxBtn) return;

    const updateSfxIcon = () => {
      sfxBtn.setAttribute('aria-pressed', String(sfxEnabled));
      if (sfxEnabled) {
        sfxBtn.classList.remove('muted');
      } else {
        sfxBtn.classList.add('muted');
      }
    };

    updateSfxIcon();

    sfxBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      localStorage.setItem('sang_portfolio_sfx', String(sfxEnabled));
      updateSfxIcon();
      if (sfxEnabled) {
        playCyberSound(900, 0.08);
      }
    });
  };

  return {
    playCyberSound,
    initSoundToggle,
    isEnabled: () => sfxEnabled
  };
})();
