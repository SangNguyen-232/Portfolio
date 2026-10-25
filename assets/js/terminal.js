/**
 * =====================================================================
 * INTERACTIVE CLI TERMINAL & AI ASSISTANT CHAT STREAM
 * Hardware-Style Diagnostic Shell & Typewriter Simulation
 * =====================================================================
 */

window.TerminalEngine = (() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let streamRunning = false;

  /* =====================================================================
     1. HERO TERMINAL BOOT TYPING ANIMATION
     ===================================================================== */
  const startTerminalTyping = () => {
    const cmd1 = document.getElementById('cmd1');
    const out1 = document.getElementById('out1');
    const out1t = document.getElementById('out1t');
    const cmd2 = document.getElementById('cmd2');
    const out2 = document.getElementById('out2');
    const out2t = document.getElementById('out2t');

    if (!cmd1 || !out1 || !cmd2 || !out2) return;

    const command1Str = 'idf.py build && esptool.py flash_id';
    const output1Str = 'ESP32-S3 (Xtensa LX7 dual-core, 240MHz) • Flash: 8MB QIO';
    const command2Str = 'freertos --status-all';
    const output2Str = '7 tasks active • TinyML: 0.84ms latency • Heap: 284KB free';

    if (prefersReducedMotion) {
      cmd1.textContent = command1Str;
      out1.classList.add('on');
      out1t.textContent = output1Str;
      cmd2.textContent = command2Str;
      out2.classList.add('on');
      out2t.textContent = output2Str;
      return;
    }

    let i = 0;
    const typeCmd1 = () => {
      if (i < command1Str.length) {
        cmd1.textContent += command1Str.charAt(i);
        i++;
        setTimeout(typeCmd1, 32);
      } else {
        setTimeout(() => {
          out1.classList.add('on');
          out1t.textContent = output1Str;
          setTimeout(typeCmd2, 380);
        }, 120);
      }
    };

    let j = 0;
    const typeCmd2 = () => {
      if (j < command2Str.length) {
        cmd2.textContent += command2Str.charAt(j);
        j++;
        setTimeout(typeCmd2, 38);
      } else {
        setTimeout(() => {
          out2.classList.add('on');
          out2t.textContent = output2Str;
        }, 120);
      }
    };

    setTimeout(typeCmd1, 300);
  };

  /* =====================================================================
     2. INTERACTIVE CLI CHIPS
     ===================================================================== */
  const initInteractiveTerminal = () => {
    const termBody = document.getElementById('termBody');
    const chips = document.querySelectorAll('#termChips .term-chip');
    if (!termBody || !chips.length) return;

    const commandOutputs = {
      help: 'Commands: [tasks] FreeRTOS tasks  [tinyml] Sensor inference  [fpga] Vending FSM  [clear] Reset',
      tasks: 'FreeRTOS: Task_Sensor(8.4%), Task_TinyML(12.1%), Task_Pump(2.3%), Task_WiFi(4.5%) • All Healthy',
      tinyml: '[TFLite Micro] Temp=28.7°C Hum=72% Soil=41% -> CLASS: NORMAL (Risk: 11%, Latency: 0.82ms)',
      fpga: 'Verilog FSM: [IDLE] -> [SELECT] -> [COIN_DETECT] -> [BALANCE_OK] -> [DISPENSE] -> [IDLE]',
      clear: '__CLEAR__'
    };

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const cmdKey = chip.dataset.cmd;

        if (cmdKey === 'clear') {
          termBody.innerHTML = `
            <div class="term-line"><span class="prompt">$</span> <span class="cmd">system --ready</span></div>
            <div class="term-line out on"><span class="arrow">›</span> <span>Terminal cleared. Select a command chip below.</span><span class="caret"></span></div>
          `;
          return;
        }

        const outText = commandOutputs[cmdKey] || 'Command not found. Type "help".';
        const lineBlock = document.createElement('div');
        lineBlock.className = 'term-line';
        lineBlock.innerHTML = `<span class="prompt">$</span> <span class="cmd">${chip.textContent.replace('$', '').trim()}</span>`;

        const outBlock = document.createElement('div');
        outBlock.className = 'term-line out on';
        outBlock.innerHTML = `<span class="arrow">›</span> <span>${outText}</span>`;

        termBody.appendChild(lineBlock);
        termBody.appendChild(outBlock);
        termBody.scrollTop = termBody.scrollHeight;
      });
    });
  };

  /* =====================================================================
     3. AI ASSISTANT CHAT STREAM
     ===================================================================== */
  const startChatStream = () => {
    const typing = document.getElementById('typing');
    const stream = document.getElementById('stream');
    const chatFoot = document.getElementById('chatFoot');
    if (!typing || !stream || streamRunning) return;

    streamRunning = true;
    stream.textContent = '';
    stream.classList.remove('on', 'live');
    typing.classList.add('on');

    const currentLang = localStorage.getItem('sang_portfolio_lang') || 'en';
    const dict = (window.PortfolioData && window.PortfolioData.i18n[currentLang]) || (window.PortfolioData && window.PortfolioData.i18n.en);
    const fullText = dict['about.streamText'];

    setTimeout(() => {
      typing.classList.remove('on');
      stream.classList.add('on', 'live');

      if (prefersReducedMotion) {
        stream.textContent = fullText;
        stream.classList.remove('live');
        if (chatFoot) chatFoot.classList.add('on');
        streamRunning = false;
        return;
      }

      let charIndex = 0;
      const interval = setInterval(() => {
        if (charIndex < fullText.length) {
          stream.textContent += fullText.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(interval);
          stream.classList.remove('live');
          if (chatFoot) chatFoot.classList.add('on');
          streamRunning = false;
        }
      }, 16);
    }, 650);
  };

  const resetStream = () => {
    streamRunning = false;
  };

  return {
    startTerminalTyping,
    initInteractiveTerminal,
    startChatStream,
    resetStream
  };
})();
