/**
 * =====================================================================
 * HERO ENGINEER CARD & HARDWARE IC PINOUT EXPLORER
 * Interactive Avatar & ESP32-S3 Muxing Tool
 * =====================================================================
 */

window.TelemetryEngine = (() => {
  'use strict';

  const initHeroEngineerCard = () => {
    const btnAvatar = document.getElementById('btnViewAvatar');
    const btnPinout = document.getElementById('btnViewPinout');
    const viewAvatar = document.getElementById('engAvatarView');
    const viewPinout = document.getElementById('engPinoutView');
    const pinInfoText = document.getElementById('pinInfoText');
    const pins = document.querySelectorAll('.ic-pin');

    if (btnAvatar && btnPinout && viewAvatar && viewPinout) {
      btnAvatar.addEventListener('click', () => {
        if (window.AudioEngine) window.AudioEngine.playCyberSound(900, 0.04);
        btnAvatar.classList.add('active');
        btnPinout.classList.remove('active');
        viewAvatar.classList.add('active');
        viewPinout.classList.remove('active');
      });

      btnPinout.addEventListener('click', () => {
        if (window.AudioEngine) window.AudioEngine.playCyberSound(1100, 0.04);
        btnPinout.classList.add('active');
        btnAvatar.classList.remove('active');
        viewPinout.classList.add('active');
        viewAvatar.classList.remove('active');
      });
    }

    if (pins.length > 0 && pinInfoText) {
      pins.forEach((pin) => {
        const updatePin = () => {
          pins.forEach((p) => p.classList.remove('active'));
          pin.classList.add('active');
          const desc = pin.getAttribute('data-desc') || '';
          pinInfoText.textContent = desc;
          if (window.AudioEngine) window.AudioEngine.playCyberSound(1200, 0.03);
        };
        pin.addEventListener('mouseenter', updatePin);
        pin.addEventListener('click', updatePin);
      });
    }
  };

  return {
    initHeroEngineerCard
  };
})();
