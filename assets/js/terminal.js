/**
 * =====================================================================
 * INTERACTIVE CLI TERMINAL & AI ASSISTANT CHAT STREAM
 * Hardware-Style Diagnostic Shell & Typewriter Simulation
 * =====================================================================
 */

window.TerminalEngine = (() => {
  'use strict';

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let bootStarted = false;
  let bootTimeout = null;
  let terminalInitialized = false;
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
  const scheduleBoot = (callback, delay) => {
    bootTimeout = setTimeout(() => {
      bootTimeout = null;
      callback();
    }, delay);
  };

  /* =====================================================================
     1. HERO TERMINAL BOOT TYPING ANIMATION
     ===================================================================== */
  const startTerminalTyping = () => {
    if (bootStarted) return;
    const cmd1 = document.getElementById('cmd1');
    const out1 = document.getElementById('out1');
    const out1t = document.getElementById('out1t');
    const cmd2 = document.getElementById('cmd2');
    const out2 = document.getElementById('out2');
    const out2t = document.getElementById('out2t');

    if (!cmd1 || !out1 || !out1t || !cmd2 || !out2 || !out2t) return;
    bootStarted = true;

    const command1Str = 'idf.py build && esptool.py flash_id';
    const output1Str = 'ESP32-S3 (Xtensa LX7 dual-core, 240MHz) • Flash: 8MB QIO';
    const command2Str = 'freertos --status-all';
    const output2Str = '7 tasks active • TinyML: 0.84ms latency • Heap: 284KB free';

    const finishBoot = () => {
      clearTimeout(bootTimeout);
      bootTimeout = null;
      cmd1.textContent = command1Str;
      out1.classList.add('on');
      out1t.textContent = output1Str;
      cmd2.textContent = command2Str;
      out2.classList.add('on');
      out2t.textContent = output2Str;
    };

    if (motionQuery.matches) {
      finishBoot();
      return;
    }

    let i = 0;
    const typeCmd1 = () => {
      if (motionQuery.matches) {
        finishBoot();
        return;
      }
      if (i < command1Str.length) {
        cmd1.textContent += command1Str.charAt(i);
        i++;
        scheduleBoot(typeCmd1, 32);
      } else {
        scheduleBoot(() => {
          if (motionQuery.matches) {
            finishBoot();
            return;
          }
          out1.classList.add('on');
          out1t.textContent = output1Str;
          scheduleBoot(typeCmd2, 380);
        }, 120);
      }
    };

    let j = 0;
    const typeCmd2 = () => {
      if (motionQuery.matches) {
        finishBoot();
        return;
      }
      if (j < command2Str.length) {
        cmd2.textContent += command2Str.charAt(j);
        j++;
        scheduleBoot(typeCmd2, 38);
      } else {
        scheduleBoot(() => {
          out2.classList.add('on');
          out2t.textContent = output2Str;
        }, 120);
      }
    };

    scheduleBoot(typeCmd1, 300);
  };

  /* =====================================================================
     2. INTERACTIVE CLI CHIPS
     ===================================================================== */
  const initInteractiveTerminal = () => {
    const termBody = document.getElementById('termBody');
    const chips = document.querySelectorAll('#termChips .term-chip');
    if (!termBody || !chips.length || terminalInitialized) return;
    terminalInitialized = true;

    const commandOutputs = {
      help: 'Commands: [freertos -t] tasks  [tinyml --infer] inference  [fpga --fsm] vending FSM  [clear] reset',
      tasks: 'FreeRTOS: temp_humi_monitor, tiny_ml_task, task_pump, task_database, Task_Toogle_BOOT, led_blinky, neo_blinky • 7 simulated tasks',
      tinyml: '[TFLite Micro] Temp=28.7°C Hum=72% Soil=41% -> CLASS: NORMAL (Risk: 11%, Latency: 0.82ms)',
      fpga: 'Verilog FSM: [IDLE] -> [SELECT] -> [COIN_DETECT] -> [BALANCE_OK] -> [DISPENSE] -> [IDLE]'
    };

    // Build a terminal line with textContent only (no innerHTML injection)
    const makeLine = (symbolClass, symbol, text, extraClass, withCaret) => {
      const line = document.createElement('div');
      line.className = `term-line${extraClass ? ` ${extraClass}` : ''}`;
      const sym = document.createElement('span');
      sym.className = symbolClass;
      sym.textContent = symbol;
      line.append(sym, ' ');
      const body = document.createElement('span');
      if (symbolClass === 'prompt') body.className = 'cmd';
      body.textContent = text;
      line.append(body);
      if (withCaret) {
        const caret = document.createElement('span');
        caret.className = 'caret';
        line.append(caret);
      }
      return line;
    };

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const cmdKey = chip.dataset.cmd;

        if (cmdKey === 'clear') {
          // Clear can run before the preloader starts the boot animation.
          bootStarted = true;
          clearTimeout(bootTimeout);
          bootTimeout = null;
          termBody.replaceChildren(
            makeLine('prompt', '$', 'system --ready'),
            makeLine('arrow', '›', getLang() === 'vi' ? 'Đã xóa terminal. Chọn một lệnh bên dưới.' : 'Terminal cleared. Select a command chip below.', 'out on', true)
          );
          return;
        }

        const outText = commandOutputs[cmdKey] || (getLang() === 'vi' ? 'Không tìm thấy lệnh. Chọn "help".' : 'Command not found. Select "help".');
        const cmdText = chip.textContent.replace('$', '').trim();
        termBody.append(
          makeLine('prompt', '$', cmdText),
          makeLine('arrow', '›', outText, 'out on')
        );
        while (termBody.children.length > 120) {
          termBody.firstElementChild.remove();
        }
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
    startTerminalTyping,
    initInteractiveTerminal,
    startChatStream,
    resetStream
  };
})();
