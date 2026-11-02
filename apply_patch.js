const fs = require('fs');

// 1. Update main.js
let mainCode = fs.readFileSync('assets/js/main.js', 'utf8');

const oldTiltTarget = 'const tiltTargets = document.querySelectorAll(\'.pcard, .skill, .do, .edu, .tl-card\');';
const newTiltTarget = 'const tiltTargets = document.querySelectorAll(\'.pcard, .skill, .do, .edu, .tl-card, .term, .eng-card, .chat, .contact-card\');';

if (mainCode.includes(oldTiltTarget)) {
  mainCode = mainCode.replace(oldTiltTarget, newTiltTarget);
} else {
  console.log('oldTiltTarget not found');
}

const oldEnter = `      el.addEventListener('pointerenter', () => {
        rect = el.getBoundingClientRect();
        el.classList.add('tilting');
      });`;
// Replace using regex for line endings flexibility
mainCode = mainCode.replace(
  /el\.classList\.add\('tilting'\);(\r?\n\s*\}\);)/,
  "el.classList.add('tilting', 'chip-active');\r\n        if (window.ScopeEngine) window.ScopeEngine.setHoveredCard(el, true);$1"
);

mainCode = mainCode.replace(
  /(const y = \(e\.clientY - rect\.top\) \/ rect\.height - 0\.5;\r?\n\s*el\.classList\.add\('tilting'\);)/,
  "$1\r\n        if (window.ScopeEngine) window.ScopeEngine.setHoverCoords(x, y);"
);

mainCode = mainCode.replace(
  /(el\.classList\.remove\('tilting'\);\r?\n\s*el\.style\.transform = '';)/,
  "el.classList.remove('tilting', 'chip-active');\r\n        el.style.transform = '';\r\n        if (window.ScopeEngine) window.ScopeEngine.setHoveredCard(null, false);"
);

// Update active section spy
mainCode = mainCode.replace(
  /(if \(activeSectionId !== activeId\) \{\r?\n\s*activeSectionId = activeId;\r?\n\s*updateTocBeam\(activeId\);)/,
  "$1\r\n        if (window.ScopeEngine) window.ScopeEngine.setActiveSection(activeId);"
);

fs.writeFileSync('assets/js/main.js', mainCode, 'utf8');
console.log('main.js patch applied successfully');

// 2. Update terminal.js
let termCode = fs.readFileSync('assets/js/terminal.js', 'utf8');

// Hook typeCmd1 and typeCmd2
termCode = termCode.replace(
  /(cmd1\.textContent \+= command1Str\.charAt\(i\);)/,
  "$1\r\n        if (window.ScopeEngine) window.ScopeEngine.pulseDMA(0.25);"
);

termCode = termCode.replace(
  /(cmd2\.textContent \+= command2Str\.charAt\(j\);)/,
  "$1\r\n        if (window.ScopeEngine) window.ScopeEngine.pulseDMA(0.25);"
);

// Hook chip click
termCode = termCode.replace(
  /(const cmdKey = chip\.dataset\.cmd;)/,
  `$1\r\n        if (window.ScopeEngine) {\r\n          window.ScopeEngine.pulseDMA(1.4);\r\n          if (cmdKey === 'tasks') window.ScopeEngine.triggerModule('rtos');\r\n          else if (cmdKey === 'tinyml') window.ScopeEngine.triggerModule('tinyml');\r\n          else if (cmdKey === 'fpga') window.ScopeEngine.triggerModule('fpga');\r\n        }`
);

// Hook startChatStream
termCode = termCode.replace(
  /(stream\.textContent \+= fullText\.charAt\(charIndex\);)/,
  "$1\r\n        if (window.ScopeEngine && Math.random() < 0.22) window.ScopeEngine.pulseDMA(0.18);"
);

fs.writeFileSync('assets/js/terminal.js', termCode, 'utf8');
console.log('terminal.js patch applied successfully');

