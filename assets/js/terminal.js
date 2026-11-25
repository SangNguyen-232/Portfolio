/** Streams the local, translated professional summary in the About section. */
window.TerminalEngine = (() => {
  'use strict';

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let streamRunning = false;
  let streamTimeout = null;
  let streamInterval = null;

  const clearStreamTimers = () => {
    clearTimeout(streamTimeout);
    clearInterval(streamInterval);
    streamTimeout = null;
    streamInterval = null;
  };

  const getLang = () => (document.documentElement.lang === 'vi' ? 'vi' : 'en');

  const startChatStream = () => {
    const typing = document.getElementById('typing');
    const stream = document.getElementById('stream');
    const chatFoot = document.getElementById('chatFoot');
    if (!typing || !stream || streamRunning) return;

    const dict = (window.PortfolioData && (window.PortfolioData.i18n[getLang()] || window.PortfolioData.i18n.en)) || null;
    const fullText = dict && dict['about.streamText'];
    if (!fullText) return;

    clearStreamTimers();
    streamRunning = true;
    stream.textContent = '';
    stream.classList.remove('on', 'live');
    typing.classList.add('on');

    if (motionQuery.matches) {
      typing.classList.remove('on');
      stream.classList.add('on');
      stream.textContent = fullText;
      if (chatFoot) chatFoot.classList.add('on');
      streamRunning = false;
      return;
    }

    streamTimeout = setTimeout(() => {
      typing.classList.remove('on');
      stream.classList.add('on', 'live');

      let charIndex = 0;
      streamInterval = setInterval(() => {
        if (motionQuery.matches) {
          stream.textContent = fullText;
          charIndex = fullText.length;
        }
        if (charIndex < fullText.length) {
          stream.textContent += fullText.charAt(charIndex);
          if (window.ScopeEngine && Math.random() < 0.22) window.ScopeEngine.pulseDMA(0.18);
          charIndex++;
        } else {
          clearStreamTimers();
          stream.classList.remove('live');
          if (chatFoot) chatFoot.classList.add('on');
          streamRunning = false;
        }
      }, 16);
    }, 650);
  };

  // Stops any running stream completely (timers included) so a new one starts clean
  const resetStream = () => {
    clearStreamTimers();
    streamRunning = false;
    const typing = document.getElementById('typing');
    const stream = document.getElementById('stream');
    if (typing) typing.classList.remove('on');
    if (stream) stream.classList.remove('live');
  };

  return {
    startChatStream,
    resetStream
  };
})();
