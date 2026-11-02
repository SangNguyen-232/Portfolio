/**
 * =====================================================================
 * UNIFIED 3D COMPUTER-SCIENCE MOTHERBOARD & SYSTEM BUS ARCHITECTURE
 * Portfolio of Nguyen Van Sang — Embedded Software Engineer
 *
 * TẤT CẢ HIỆU ỨNG 3D LIÊN KẾT CHẶT CHẼ THEO HỆ THỐNG KIẾN TRÚC MÁY TÍNH:
 *   1. Motherboard System Bus (Bus Mẹ Hệ Thống):
 *      - Address Bus (ADDR[31:0]) bên lề trái với chỉ số bộ nhớ theo vùng
 *        (FLASH, SRAM, MMIO, STACK, UART).
 *      - Data & Telemetry Bus (DATA[31:0]) bên lề phải với gói tin nhị phân/hex.
 *      - Control Bus (CLK 240MHz, IRQ, /CS, R/W) chạy nhịp nhàng theo System Clock.
 *   2. IC Module Subsystems (Các Phân Hệ CS Gắn Liền Với Từng Section Cụ Thể):
 *      - #hero: CPU 5-Stage Execution Pipeline (IF->ID->EX->MEM->WB) & Register File (R0-R7, PC, SP).
 *      - #about: Dual-Core Xtensa LX7 SoC Architecture & System Bus Arbiter.
 *      - Project 1 (Smart Agriculture): FreeRTOS Kernel Tasks (Ready/Running/Blocked + Mutex)
 *        & TinyML INT8 Quantized Neural Tensor Layer (<1ms inference).
 *      - Project 2 (FPGA Vending Machine): Verilog Finite State Machine (FSM) & RTL D-Flip-Flop Logic.
 *      - Project 3 (Smart Parking Platform): IoT Distributed Telemetry Mesh & DB Buffer Pool.
 *      - #skills: Computer Memory Hierarchy Pyramid & SPI/I2C Serial Bus Logic Analyzer.
 *      - #experience: Industrial Sensor ADC Sampler & UART DMA Circular Ring Buffer.
 *      - #education: Balanced Binary Search Tree (AVL Rotation) & Dijkstra Shortest Path Graph.
 *      - #contact: NVIC Interrupt Vector Controller & Full-Duplex Serial Transceiver.
 *   3. Bidirectional Card-to-Bus Coupling (Liên kết 2 chiều Thẻ Nội Dung & Bus):
 *      - Mỗi thẻ nội dung đóng vai trò như một vi mạch IC trên bo mạch chủ.
 *      - Đường mạch PCB góc vát 45° nối từ bus vào chân pin và via hàn của từng thẻ.
 *      - Khi rê chuột vào thẻ hoặc thẻ ở tâm màn hình: Chip Select (/CS) kích hoạt,
 *        xung clock tăng tốc, dòng dữ liệu trực tiếp bơm vào thẻ theo góc phối cảnh 3D.
 *   4. System-Wide Dynamic Interconnect (Tương tác toàn hệ thống):
 *      - Phím [T] / Terminal gõ lệnh / Chatbot AI phát xung DMA lan tỏa khắp bus.
 *      - Chuột đóng vai trò như que đo logic (Logic Probe), điều khiển camera 3D.
 * =====================================================================
 */

window.ScopeEngine = (() => {
  'use strict';

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let initialized = false;

  // Global Engine State
  let hoveredCardEl = null;
  let hoveredCoords = { x: 0, y: 0 };
  let activeSectionId = 'hero';
  let dmaPulse = 0;
  let triggeredModuleType = null;
  let triggeredModuleTimer = 0;

  const initNeuralNetwork = () => {
    const canvas = document.getElementById('net');
    if (!canvas || initialized) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    initialized = true;

    // Palette chuẩn Khoa học Máy tính & Phần cứng Vi mạch
    // [0]: Mint (#5FE3C8) -> Logic 1, Bus dữ liệu, Tín hiệu hợp lệ
    // [1]: Amber (#FFB547) -> Xung Clock (CLK), Ngắt (IRQ), Chip Select (/CS)
    // [2]: Ice/Cyan (#BFF2E6) -> Địa chỉ bộ nhớ, Gói tin AXI/AHB
    // [3]: Slate/Silicon (#1E3B41) -> Đường mạch nền PCB
    const COLORS = [
      [95, 227, 200],
      [255, 181, 71],
      [191, 242, 230],
      [30, 59, 65]
    ];

    const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${clamp(a, 0, 1).toFixed(3)})`;
    function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
    const lerp = (a, b, t) => a + (b - a) * t;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const hash = (n) => {
      let x = (n * 2654435761) >>> 0;
      x ^= x >>> 15;
      x = Math.imul(x, 2246822519) >>> 0;
      return ((x ^ (x >>> 13)) >>> 0) / 4294967295;
    };
    const FONT = '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace';

    // 3D Space & Projection Setup
    const BX = 920, BY = 600, BZ = 600;
    const MIN_FRAME = isFinePointer ? 16 : 32;

    let W = 0, H = 0, CX = 0, CY = 0, F = 820, D = 1250;
    let rafId = null;
    let last = 0;
    let time = 0;
    let sysClock = 0; // Tần số clock hệ thống đồng bộ

    const cam = {
      yaw: 0, pitch: -0.14,
      mx: 0, my: 0, tmx: 0, tmy: 0,
      scroll: 0, tscroll: 0
    };
    let cyaw = 1, syaw = 0, cpit = 1, spit = 0;

    /* =================================================================
       LAYOUT ENGINE: Đo kích thước cột nội dung, hai lề & thẻ IC
       ================================================================= */
    let CL = 0, CR = 0;
    let sideL = { on: false, bx: 0, ix: 0, g: 0 };
    let sideR = { on: false, bx: 0, ix: 0, g: 0 };
    let docH = 0, builtDocH = -1, builtW = -1;
    let cardEls = null;
    let cards = [];
    let minL = 0, maxR = 0;
    let lastLayout = -1e9;
    let laneModules = [];

    // Mặt nạ tương phản: Giữ sáng rõ ở hai lề trống, dịu nhẹ dưới cột nội dung
    const cmask = (sx) => {
      const out = Math.max(CL - sx, sx - CR);
      const t = clamp((out + 30) / 130, 0, 1);
      const s = t * t * (3 - 2 * t);
      const mn = CL >= 60 ? 0.22 : 0.45;
      return mn + (1 - mn) * s;
    };

    const refreshLayout = () => {
      lastLayout = performance.now();
      const container = document.querySelector('main .container');
      if (container) {
        const r = container.getBoundingClientRect();
        const cs = window.getComputedStyle(container);
        CL = r.left + (parseFloat(cs.paddingLeft) || 0);
        CR = r.right - (parseFloat(cs.paddingRight) || 0);
      } else {
        CL = W / 2 - 560; CR = W / 2 + 560;
      }
      CL = Math.max(0, CL);
      CR = Math.min(W, CR);

      // Định vị bus PCB ở hai lề
      sideL = {
        on: CL >= 40,
        bx: CL >= 40 ? CL * 0.74 : CL * 0.6,
        ix: CL * 0.35,
        g: CL
      };
      const rLimit = W >= 1560 ? W - 250 : W; // chừa chỗ cho thanh TOC bên phải
      const gR = rLimit - CR;
      sideR = {
        on: gR >= 40,
        bx: gR > 0 ? CR + gR * 0.26 : CR + (W - CR) * 0.4,
        ix: CR + gR * 0.65,
        g: gR
      };

      if (!cardEls) {
        cardEls = [...document.querySelectorAll(
          '.term, .eng-card, .chat, .do, .pcard, .skill, .tl-card, .education-shell, .contact-card'
        )];
      }

      const sy = window.scrollY || 0;
      cards = [];
      minL = Infinity; maxR = -Infinity;
      for (const el of cardEls) {
        const r = el.getBoundingClientRect();
        if (r.width < 30 || r.height < 30) continue;
        const hidden = el.classList.contains('reveal') && !el.classList.contains('in');
        cards.push({
          el,
          t: r.top, b: r.bottom,
          l: r.left, r: r.right,
          w: r.width, h: r.height,
          pageY: r.top + sy,
          hidden,
          isHovered: el === hoveredCardEl
        });
        minL = Math.min(minL, r.left);
        maxR = Math.max(maxR, r.right);
      }

      docH = document.documentElement.scrollHeight;
      if (Math.abs(docH - builtDocH) > 40 || Math.abs(W - builtW) > 40) {
        buildCSLane();
      }
    };

    /* ---------- 3D Perspective Projection ---------- */
    const project = (x, y, z) => {
      const x1 = x * cyaw + z * syaw;
      const z1 = -x * syaw + z * cyaw;
      const y1 = y * cpit - z1 * spit;
      const z2 = y * spit + z1 * cpit;
      const w = D + z2;
      if (w < 120) return null;
      const s = F / w;
      return [CX + x1 * s, CY + y1 * s, s, z2];
    };
    const nearness = (z2) => clamp(1 - (z2 + BZ * 1.1) / (BZ * 2.2), 0, 1);

    let curSize = 0;
    const setFont = (size) => {
      if (size === curSize) return;
      curSize = size;
      ctx.font = `600 ${size}px ${FONT}`;
    };

    /* =================================================================
       GRAPHICS & 3D PRIMITIVES HELPERS
       ================================================================= */
    const line3 = (a, b, color, alpha, width) => {
      const pa = project(a[0], a[1], a[2]);
      const pb = project(b[0], b[1], b[2]);
      if (!pa || !pb) return;
      ctx.strokeStyle = rgba(color, alpha);
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(pa[0], pa[1]);
      ctx.lineTo(pb[0], pb[1]);
      ctx.stroke();
    };

    const fillPoly = (pts, color, alpha) => {
      ctx.fillStyle = rgba(color, alpha);
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fill();
    };

    const mkP = (it) => {
      const ca = Math.cos(it.ry), sa = Math.sin(it.ry);
      const cx = Math.cos(it.rx), sx = Math.sin(it.rx);
      return (lx, ly, lz) => {
        lz = lz || 0;
        const x = lx * ca + lz * sa;
        let z = -lx * sa + lz * ca;
        const y = ly * cx - z * sx;
        z = ly * sx + z * cx;
        const k = 3.6 / (3.6 + z);
        return [it.x + x * it.size * k, it.y + y * it.size * k, k, z];
      };
    };

    const lines = (P, pairs, col, al, w) => {
      ctx.strokeStyle = rgba(col, al);
      ctx.lineWidth = w;
      ctx.beginPath();
      for (const [a, b] of pairs) {
        const p = P(a[0], a[1], a[2]), q = P(b[0], b[1], b[2]);
        ctx.moveTo(p[0], p[1]);
        ctx.lineTo(q[0], q[1]);
      }
      ctx.stroke();
    };

    const boxPairs = (cx, cy, cz, hx, hy, hz) => {
      const v = [];
      for (const sx of [-1, 1]) {
        for (const sy of [-1, 1]) {
          for (const sz of [-1, 1]) {
            v.push([cx + sx * hx, cy + sy * hy, cz + sz * hz]);
          }
        }
      }
      return [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]].map(([a, b]) => [v[a], v[b]]);
    };

    const dotAt = (P, pt, r, col, al) => {
      const p = P(pt[0], pt[1], pt[2]);
      ctx.fillStyle = rgba(col, al);
      ctx.beginPath();
      ctx.arc(p[0], p[1], Math.max(1, r * p[2]), 0, Math.PI * 2);
      ctx.fill();
    };

    const txt = (P, pt, s, px, col, al) => {
      const p = P(pt[0], pt[1], pt[2]);
      const size = Math.round(px * p[2]);
      if (size < 7) return;
      setFont(size);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = rgba(col, al);
      ctx.fillText(s, p[0], p[1]);
    };

    /* =================================================================
       THƯ VIỆN CÁC PHÂN HỆ 3D KHOA HỌC MÁY TÍNH (CS SUBSYSTEMS)
       Mỗi phân hệ liên kết chính xác với một mục / dự án của Sang
       ================================================================= */

    // 1. CPU 5-Stage Execution Pipeline (IF -> ID -> EX -> MEM -> WB) [Hero]
    const OPCODES = ['LDR r0,[sp]', 'ADD r1,r0,#4', 'CMP r1,#0', 'BNE .loop', 'STR r1,[r2]', 'MOV r0,r3', 'XOR r2,r2'];
    const dCPUPipeline = (P, it, c, a, clk) => {
      const stageNames = ['IF', 'ID', 'EX', 'MEM', 'WB'];
      const cycle = Math.floor(clk * 1.8);
      for (let s = 0; s < 5; s++) {
        const y0 = -0.85 + s * 0.42;
        const cur = (cycle - s + 70) % 5 === 0;
        const col = cur ? COLORS[1] : c;
        lines(P, boxPairs(0, y0, 0, 0.75, 0.14, 0.45), col, cur ? a * 1.4 : a * 0.75, cur ? 1.6 : 1);
        txt(P, [-0.48, y0, 0], stageNames[s], it.size * 0.28, col, a * 1.3);
        const opIdx = (cycle + s) % OPCODES.length;
        txt(P, [0.18, y0, 0], OPCODES[opIdx], it.size * 0.22, COLORS[2], a * (cur ? 1.5 : 0.8));
      }
      // Đường bypass forwarding (Hazard Unit)
      lines(P, [[[0.78, 0.0, 0], [1.05, 0.0, 0]], [[1.05, 0.0, 0], [1.05, -0.42, 0]], [[1.05, -0.42, 0], [0.78, -0.42, 0]]], COLORS[1], a * 0.9, 1.2);
    };

    // 2. Register File 32-bit (R0 - R7, PC, SP) [Hero]
    const REG_NAMES = ['R0', 'R1', 'R2', 'R3', 'PC', 'SP'];
    const dRegFile = (P, it, c, a, clk) => {
      const activeReg = Math.floor(clk * 2.2) % 6;
      for (let i = 0; i < 6; i++) {
        const col = i === activeReg ? COLORS[1] : c;
        const y = -0.75 + i * 0.3;
        lines(P, boxPairs(0, y, 0, 0.7, 0.1, 0.35), col, i === activeReg ? a * 1.4 : a * 0.7, i === activeReg ? 1.5 : 1);
        txt(P, [-0.4, y, 0], REG_NAMES[i], it.size * 0.26, col, a * 1.2);
        const hex = ((hash(i * 17 + Math.floor(clk * 1.2)) * 0xffff) >>> 0).toString(16).toUpperCase().padStart(4, '0');
        txt(P, [0.22, y, 0], `0x${hex}`, it.size * 0.24, COLORS[2], a * 1.1);
      }
    };

    // 3. Dual-Core SoC System Bus Arbiter [About]
    const dSoCArbiter = (P, it, c, a, clk) => {
      // 2 nhân CPU Xtensa LX7
      lines(P, boxPairs(-0.5, -0.45, 0, 0.38, 0.3, 0.4), c, a * 0.9, 1.2);
      lines(P, boxPairs(0.5, -0.45, 0, 0.38, 0.3, 0.4), c, a * 0.9, 1.2);
      txt(P, [-0.5, -0.45, 0], 'Core 0', it.size * 0.24, COLORS[2], a * 1.1);
      txt(P, [0.5, -0.45, 0], 'Core 1', it.size * 0.24, COLORS[2], a * 1.1);
      // Khối Bus Matrix Arbiter trung tâm
      const token = Math.sin(clk * 3) > 0 ? 0 : 1;
      lines(P, boxPairs(0, 0.45, 0, 0.78, 0.22, 0.45), COLORS[1], a * 1.2, 1.4);
      txt(P, [0, 0.45, 0], 'AXI Crossbar Bus', it.size * 0.26, COLORS[1], a * 1.3);
      // Kết nối bus
      lines(P, [[[-0.5, -0.15, 0], [-0.5, 0.23, 0]], [[0.5, -0.15, 0], [0.5, 0.23, 0]]], token ? COLORS[1] : c, a * 1.1, 1.5);
    };

    // 4. System Clock & Crystal Oscillator (XTAL 40MHz / PLL 240MHz) [About]
    const dClockSync = (P, it, c, a, clk) => {
      lines(P, boxPairs(0, -0.2, 0, 0.65, 0.35, 0.35), c, a * 0.9, 1.2);
      txt(P, [0, -0.2, 0], '40MHz XTAL', it.size * 0.28, COLORS[1], a * 1.3);
      // Sóng clock hình vuông xuất ra
      const pts = [];
      const period = 0.35;
      for (let x = -0.8; x <= 0.8; x += 0.05) {
        const phase = (x + clk * 0.8) % period;
        const y = phase > period / 2 ? 0.45 : 0.75;
        pts.push([x, y, 0]);
      }
      for (let i = 0; i < pts.length - 1; i++) {
        lines(P, [[pts[i], pts[i + 1]]], COLORS[1], a * 1.2, 1.4);
      }
      txt(P, [0, 0.95, 0], 'PLL 240MHz', it.size * 0.22, c, a * 1.1);
    };

    // 5. FreeRTOS Multitasking Kernel & Mutex [Project 1: Smart Agriculture]
    const RTOS_TASKS = ['Task_Sensors', 'Task_TinyML', 'Task_Relay'];
    const dRTOS = (P, it, c, a, clk) => {
      // 3 trạng thái: READY, RUNNING, BLOCKED
      const states = [[-0.6, -0.4, 'READY'], [0.6, -0.4, 'RUNNING'], [0, 0.55, 'BLOCKED']];
      for (const [sx, sy, name] of states) {
        dotAt(P, [sx, sy, 0], 14, c, a * 0.35);
        txt(P, [sx, sy, 0], name, it.size * 0.24, COLORS[2], a * 1.2);
      }
      // Vòng tròn chuyển trạng thái
      lines(P, [[[-0.3, -0.4, 0], [0.3, -0.4, 0]], [[0.4, -0.15, 0], [0.15, 0.35, 0]], [[-0.15, 0.35, 0], [-0.4, -0.15, 0]]], COLORS[1], a * 0.85, 1.3);
      // Con trỏ task đang thực thi
      const curTask = Math.floor(clk * 1.4) % 3;
      txt(P, [0, -0.15, 0], RTOS_TASKS[curTask], it.size * 0.26, COLORS[1], a * 1.4);
      // Mutex Semaphore
      const locked = (Math.floor(clk * 1.4) & 1) === 1;
      txt(P, [0, 0.15, 0], locked ? '🔒 Mutex: LOCKED' : '🔓 Mutex: GIVEN', it.size * 0.22, locked ? COLORS[1] : c, a * 1.3);
    };

    // 6. TinyML On-Device Quantized Neural Tensor Layer [Project 1: Edge AI]
    const dTinyML = (P, it, c, a, clk) => {
      const inNodes = [[-0.75, -0.5], [-0.75, 0], [-0.75, 0.5]];
      const hidNodes = [[0, -0.65], [0, -0.22], [0, 0.22], [0, 0.65]];
      const outNodes = [[0.75, -0.3], [0.75, 0.3]];

      // Vẽ trọng số lượng tử hóa (INT8 Synaptic Weights)
      for (const [ix, iy] of inNodes) {
        for (const [hx, hy] of hidNodes) {
          lines(P, [[[ix, iy, 0], [hx, hy, 0]]], c, a * 0.25, 0.8);
        }
      }
      for (const [hx, hy] of hidNodes) {
        for (const [ox, oy] of outNodes) {
          lines(P, [[[hx, hy, 0], [ox, oy, 0]]], COLORS[1], a * 0.45, 1.0);
        }
      }

      // Xung kích hoạt inference chạy qua mạng
      const u = (clk * 1.6) % 1;
      const actX = lerp(-0.75, 0.75, u);
      dotAt(P, [actX, Math.sin(actX * 4) * 0.2, 0], 4, COLORS[1], a * 1.5);

      // Node đầu vào & đầu ra
      for (const pt of inNodes) dotAt(P, [pt[0], pt[1], 0], 5, c, a * 0.9);
      for (const pt of hidNodes) dotAt(P, [pt[0], pt[1], 0], 4.5, COLORS[2], a * 0.85);
      for (let i = 0; i < outNodes.length; i++) {
        const pt = outNodes[i];
        const active = (Math.floor(clk * 1.6) % 2) === i;
        dotAt(P, [pt[0], pt[1], 0], active ? 7 : 5, active ? COLORS[1] : c, active ? a * 1.5 : a * 0.8);
      }
      txt(P, [0, -0.85, 0], 'TFLite Micro <1ms', it.size * 0.24, COLORS[1], a * 1.3);
    };

    // 7. Verilog Finite State Machine (FSM) [Project 2: FPGA Vending Machine]
    const FSM_STATES = ['S_IDLE', 'S_SELECT', 'S_COIN', 'S_VEND'];
    const dVerilogFSM = (P, it, c, a, clk) => {
      const pts = [[0, -0.7], [0.7, 0], [0, 0.7], [-0.7, 0]];
      const cur = Math.floor(clk * 1.5) % 4;
      // Vòng chuyển trạng thái
      for (let i = 0; i < 4; i++) {
        const j = (i + 1) % 4;
        const activeArc = i === cur;
        lines(P, [[[pts[i][0], pts[i][1], 0], [pts[j][0], pts[j][1], 0]]], activeArc ? COLORS[1] : c, activeArc ? a * 1.5 : a * 0.45, activeArc ? 2.0 : 1.0);
      }
      for (let i = 0; i < 4; i++) {
        const isCur = i === cur;
        dotAt(P, [pts[i][0], pts[i][1], 0], isCur ? 7 : 5, isCur ? COLORS[1] : c, isCur ? a * 1.6 : a * 0.6);
        txt(P, [pts[i][0] * 1.35, pts[i][1] * 1.35, 0], FSM_STATES[i], it.size * 0.24, isCur ? COLORS[1] : COLORS[2], a * 1.2);
      }
      txt(P, [0, 0, 0], 'Verilog RTL', it.size * 0.28, c, a * 1.2);
    };

    // 8. RTL Logic Cell & D-Flip-Flop [Project 2: FPGA]
    const dLogicCell = (P, it, c, a, clk) => {
      lines(P, boxPairs(0, 0, 0, 0.65, 0.55, 0.35), c, a * 0.85, 1.2);
      // Chân D, CLK, Q
      lines(P, [[[-0.9, -0.2, 0], [-0.65, -0.2, 0]], [[-0.9, 0.2, 0], [-0.65, 0.2, 0]], [[0.65, 0, 0], [0.9, 0, 0]]], COLORS[1], a * 1.1, 1.3);
      txt(P, [-0.45, -0.2, 0], 'D', it.size * 0.26, COLORS[2], a * 1.2);
      txt(P, [-0.45, 0.2, 0], 'CLK', it.size * 0.22, COLORS[1], a * 1.2);
      txt(P, [0.45, 0, 0], 'Q', it.size * 0.26, COLORS[2], a * 1.2);
      const edge = (Math.floor(clk * 3) & 1);
      txt(P, [0, 0, 0], edge ? 'POSEDGE ↑' : 'LATCH', it.size * 0.26, edge ? COLORS[1] : c, a * 1.3);
    };

    // 9. IoT Telemetry Mesh & MQTT Stream [Project 3: Smart Campus Parking]
    const dCloudMesh = (P, it, c, a, clk) => {
      const nodes = [[-0.6, 0.4], [0.6, 0.4], [0, -0.55]];
      lines(P, [[[nodes[0][0], nodes[0][1], 0], [nodes[2][0], nodes[2][1], 0]], [[nodes[1][0], nodes[1][1], 0], [nodes[2][0], nodes[2][1], 0]], [[nodes[0][0], nodes[0][1], 0], [nodes[1][0], nodes[1][1], 0]]], c, a * 0.5, 1.1);
      dotAt(P, [nodes[0][0], nodes[0][1], 0], 6, c, a * 1.0);
      dotAt(P, [nodes[1][0], nodes[1][1], 0], 6, c, a * 1.0);
      dotAt(P, [nodes[2][0], nodes[2][1], 0], 8, COLORS[1], a * 1.3);
      txt(P, [-0.6, 0.65, 0], 'Node', it.size * 0.24, c, a * 1.1);
      txt(P, [0.6, 0.65, 0], 'Gateway', it.size * 0.24, c, a * 1.1);
      txt(P, [0, -0.85, 0], 'Cloud API', it.size * 0.26, COLORS[1], a * 1.3);
      // Gói tin MQTT bay lên
      const u = (clk * 1.3) % 1;
      const px = lerp(nodes[0][0], nodes[2][0], u), py = lerp(nodes[0][1], nodes[2][1], u);
      dotAt(P, [px, py, 0], 3.5, COLORS[1], a * 1.5);
    };

    // 10. Database Buffer Pool & RLS [Project 3: Cloud]
    const dDBBuffer = (P, it, c, a, clk) => {
      // 3 lớp đĩa database
      for (let i = 0; i < 3; i++) {
        const y = -0.45 + i * 0.45;
        lines(P, boxPairs(0, y, 0, 0.7, 0.12, 0.4), c, a * 0.8, 1.1);
        txt(P, [0, y, 0], `Buffer Page #${i}`, it.size * 0.24, (Math.floor(clk * 1.5) % 3 === i) ? COLORS[1] : COLORS[2], a * 1.2);
      }
      txt(P, [0, 0.8, 0], 'Postgres RLS', it.size * 0.24, COLORS[1], a * 1.2);
    };

    // 11. Computer Memory Hierarchy Pyramid [Technical Skills]
    const dMemPyramid = (P, it, c, a, clk) => {
      const levels = [
        { name: 'Regs (0.5ns)', w: 0.35, y: -0.65, col: COLORS[1] },
        { name: 'L1/L2 Cache', w: 0.52, y: -0.22, col: COLORS[2] },
        { name: 'SRAM (10ns)', w: 0.72, y: 0.22, col: c },
        { name: 'Flash (80ns)', w: 0.95, y: 0.65, col: c }
      ];
      for (const lvl of levels) {
        lines(P, boxPairs(0, lvl.y, 0, lvl.w, 0.12, 0.35), lvl.col, a * 0.85, 1.1);
        txt(P, [0, lvl.y, 0], lvl.name, it.size * 0.24, lvl.col, a * 1.2);
      }
      const hit = Math.sin(clk * 2) > 0;
      txt(P, [0, 0.92, 0], hit ? '⚡ Cache Hit: 94%' : 'Bus Read Miss', it.size * 0.22, hit ? COLORS[1] : c, a * 1.2);
    };

    // 12. SPI & I2C Logic Analyzer Waveforms [Technical Skills]
    const dOscilloscope = (P, it, c, a, clk) => {
      // Kênh 1: SCK (Clock 50% duty cycle)
      const sck = [];
      for (let x = -0.9; x <= 0.9; x += 0.05) {
        const hi = ((x + clk * 0.8) % 0.3) > 0.15;
        sck.push([x, hi ? -0.55 : -0.35, 0]);
      }
      for (let i = 0; i < sck.length - 1; i++) lines(P, [[sck[i], sck[i + 1]]], COLORS[1], a * 1.1, 1.3);
      txt(P, [-0.75, -0.7, 0], 'SCK', it.size * 0.22, COLORS[1], a * 1.2);

      // Kênh 2: MOSI (Data bits)
      const mosi = [];
      for (let x = -0.9; x <= 0.9; x += 0.05) {
        const bit = hash(Math.floor((x + clk * 0.8) / 0.3) + 7) > 0.5;
        mosi.push([x, bit ? 0.05 : 0.25, 0]);
      }
      for (let i = 0; i < mosi.length - 1; i++) lines(P, [[mosi[i], mosi[i + 1]]], c, a * 1.1, 1.3);
      txt(P, [-0.75, -0.1, 0], 'MOSI', it.size * 0.22, c, a * 1.2);

      // Kênh 3: /CS (Chip Select Active Low)
      const csY = (Math.sin(clk * 1.5) > 0) ? 0.55 : 0.75;
      lines(P, [[[-0.9, csY, 0], [0.9, csY, 0]]], COLORS[2], a * 1.0, 1.3);
      txt(P, [-0.75, 0.42, 0], '/CS', it.size * 0.22, COLORS[2], a * 1.2);
    };

    // 13. Sensor ADC Sampler [Experience]
    const dSensorADC = (P, it, c, a, clk) => {
      lines(P, boxPairs(0, 0, 0, 0.65, 0.5, 0.35), c, a * 0.9, 1.2);
      txt(P, [0, -0.25, 0], '12-bit SAR ADC', it.size * 0.26, COLORS[1], a * 1.3);
      const val = 1800 + Math.round(Math.sin(clk * 2) * 600);
      txt(P, [0, 0.1, 0], `${val} / 4095`, it.size * 0.3, COLORS[2], a * 1.4);
      txt(P, [0, 0.35, 0], `${(val * 3.3 / 4095).toFixed(2)} V`, it.size * 0.24, c, a * 1.2);
    };

    // 14. UART DMA Circular Ring Buffer [Experience / Terminal]
    const dDMABuffer = (P, it, c, a, clk) => {
      const N = 12;
      const wr = Math.floor(clk * 2.5) % N;
      const rd = (wr + 8) % N;
      for (let i = 0; i < N; i++) {
        const ang = (i / N) * Math.PI * 2;
        const x = Math.cos(ang) * 0.65, y = Math.sin(ang) * 0.65;
        const isWr = i === wr, isRd = i === rd;
        const col = isWr ? COLORS[1] : isRd ? COLORS[0] : COLORS[2];
        dotAt(P, [x, y, 0], isWr || isRd ? 6 : 3.5, col, isWr || isRd ? a * 1.5 : a * 0.45);
      }
      txt(P, [0, -0.1, 0], 'DMA Buffer', it.size * 0.26, COLORS[1], a * 1.3);
      txt(P, [0, 0.15, 0], `wr:${wr} rd:${rd}`, it.size * 0.22, c, a * 1.2);
    };

    // 15. Balanced Binary Search Tree (AVL Tree) [Education: HCMUT CSE]
    const dAVLTree = (P, it, c, a, clk) => {
      const nodes = [
        [0, -0.7], [-0.5, -0.15], [0.5, -0.15],
        [-0.75, 0.45], [-0.25, 0.45], [0.25, 0.45], [0.75, 0.45]
      ];
      // Cạnh nối cây
      const edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
      for (const [u, v] of edges) {
        lines(P, [[[nodes[u][0], nodes[u][1], 0], [nodes[v][0], nodes[v][1], 0]]], c, a * 0.5, 1.1);
      }
      const activeNode = Math.floor(clk * 1.8) % 7;
      for (let i = 0; i < 7; i++) {
        const cur = i === activeNode;
        dotAt(P, [nodes[i][0], nodes[i][1], 0], cur ? 7 : 4.5, cur ? COLORS[1] : c, cur ? a * 1.5 : a * 0.7);
      }
      txt(P, [0, 0.85, 0], 'AVL Balance O(log n)', it.size * 0.24, COLORS[1], a * 1.3);
    };

    // 16. Dijkstra Shortest Path Graph [Education: Algorithms]
    const dGraphDijkstra = (P, it, c, a, clk) => {
      const gv = [[-0.6, -0.4], [0.6, -0.4], [0, 0], [-0.6, 0.5], [0.6, 0.5]];
      const ge = [[0,1],[0,2],[1,2],[2,3],[2,4],[3,4]];
      for (const [u, v] of ge) {
        lines(P, [[[gv[u][0], gv[u][1], 0], [gv[v][0], gv[v][1], 0]]], c, a * 0.35, 1.0);
      }
      // Đường ngắn nhất phát sáng
      lines(P, [[[gv[0][0], gv[0][1], 0], [gv[2][0], gv[2][1], 0]], [[gv[2][0], gv[2][1], 0], [gv[4][0], gv[4][1], 0]]], COLORS[1], a * 1.4, 1.8);
      for (const pt of gv) dotAt(P, [pt[0], pt[1], 0], 5, COLORS[2], a * 0.9);
      txt(P, [0, -0.7, 0], 'Dijkstra Path A→C→E', it.size * 0.24, COLORS[1], a * 1.3);
    };

    // 17. NVIC Interrupt Vector Table [Contact / System]
    const dNVICVectors = (P, it, c, a, clk) => {
      const isr = ['Reset_Handler', 'SysTick_IRQ', 'UART0_ISR', 'GPIO_ExtIRQ'];
      const cur = Math.floor(clk * 2) % 4;
      for (let i = 0; i < 4; i++) {
        const y = -0.55 + i * 0.36;
        const col = i === cur ? COLORS[1] : c;
        lines(P, boxPairs(0, y, 0, 0.78, 0.11, 0.4), col, i === cur ? a * 1.4 : a * 0.7, i === cur ? 1.5 : 1);
        txt(P, [0, y, 0], isr[i], it.size * 0.24, col, a * 1.2);
      }
      txt(P, [0, 0.85, 0], 'NVIC Vector Table', it.size * 0.24, COLORS[1], a * 1.2);
    };

    // 18. Full-Duplex Serial Transceiver [Contact]
    const dSerialTransceiver = (P, it, c, a, clk) => {
      lines(P, boxPairs(-0.4, 0, 0, 0.3, 0.6, 0.35), c, a * 0.85, 1.1);
      lines(P, boxPairs(0.4, 0, 0, 0.3, 0.6, 0.35), COLORS[1], a * 0.9, 1.2);
      txt(P, [-0.4, 0, 0], 'RX FIFO', it.size * 0.24, c, a * 1.2);
      txt(P, [0.4, 0, 0], 'TX FIFO', it.size * 0.24, COLORS[1], a * 1.3);
      // Dòng byte truyền nối tiếp
      const u = (clk * 1.8) % 1;
      const y = lerp(-0.5, 0.5, u);
      dotAt(P, [0, y, 0], 4, COLORS[2], a * 1.4);
      txt(P, [0, -0.85, 0], 'UART 115200 8N1', it.size * 0.24, COLORS[2], a * 1.3);
    };

    /* =================================================================
       CẤU HÌNH LIÊN KẾT PHÂN HỆ VÀO TỪNG VÙNG TRANG
       ================================================================= */
    const CS_BINDINGS = [
      { sel: '#hero', side: 0, tag: 'CPU Pipeline LX7', draw: dCPUPipeline, type: 'cpu' },
      { sel: '#hero', side: 1, tag: 'Register File R0-R7', draw: dRegFile, type: 'regs' },
      { sel: '#about', side: 0, tag: 'Dual-Core SoC Arbiter', draw: dSoCArbiter, type: 'soc' },
      { sel: '#about', side: 1, tag: 'Clock Sync 240MHz', draw: dClockSync, type: 'clk' },
      { sel: '#projectGrid article:nth-child(1)', side: 0, tag: 'FreeRTOS Scheduler', draw: dRTOS, type: 'rtos' },
      { sel: '#projectGrid article:nth-child(1)', side: 1, tag: 'TinyML INT8 Tensor', draw: dTinyML, type: 'tinyml' },
      { sel: '#projectGrid article:nth-child(2)', side: 0, tag: 'Verilog FSM (Arty-Z7)', draw: dVerilogFSM, type: 'fpga' },
      { sel: '#projectGrid article:nth-child(2)', side: 1, tag: 'RTL Gate & D-FF', draw: dLogicCell, type: 'rtl' },
      { sel: '#projectGrid article:nth-child(3)', side: 0, tag: 'IoT Telemetry Mesh', draw: dCloudMesh, type: 'mesh' },
      { sel: '#projectGrid article:nth-child(3)', side: 1, tag: 'DB Buffer Pool RLS', draw: dDBBuffer, type: 'db' },
      { sel: '#skills', side: 0, tag: 'Memory Hierarchy', draw: dMemPyramid, type: 'mem' },
      { sel: '#skills', side: 1, tag: 'SPI / I2C Bus Analyzer', draw: dOscilloscope, type: 'osc' },
      { sel: '#experience', side: 0, tag: 'Sensor ADC Sampler', draw: dSensorADC, type: 'adc' },
      { sel: '#experience', side: 1, tag: 'UART DMA Ring Buffer', draw: dDMABuffer, type: 'dma' },
      { sel: '#education', side: 0, tag: 'AVL Tree Balancer', draw: dAVLTree, type: 'tree' },
      { sel: '#education', side: 1, tag: 'Dijkstra Shortest Path', draw: dGraphDijkstra, type: 'dijkstra' },
      { sel: '#contact', side: 0, tag: 'NVIC Interrupt Vector', draw: dNVICVectors, type: 'nvic' },
      { sel: '#contact', side: 1, tag: 'Serial Transceiver', draw: dSerialTransceiver, type: 'serial' },
    ];

    function buildCSLane() {
      builtDocH = docH;
      builtW = W;
      laneModules = [];
      const sy = window.scrollY || 0;

      for (let i = 0; i < CS_BINDINGS.length; i++) {
        const item = CS_BINDINGS[i];
        let targetY = 0;
        const el = document.querySelector(item.sel);
        if (el) {
          const rect = el.getBoundingClientRect();
          targetY = rect.top + sy + rect.height * 0.42;
        } else {
          targetY = 200 + i * 440;
        }

        laneModules.push({
          idx: i,
          side: item.side,
          type: item.type,
          tag: item.tag,
          draw: item.draw,
          pageY: targetY,
          size: 24,
          x: 0, y: 0,
          rx: item.side ? 0.2 : -0.2,
          ry: 0
        });
      }
    }

    /* =================================================================
       STRUCTURED CS INSTRUCTION STREAM (Dòng mã lệnh & Opcode thay vì ký tự vô nghĩa)
       ================================================================= */
    const CS_INSTRUCTIONS = [
      '0x4889E5', '0x89C0', '0x0F05', '0x31C0', '0xC3',
      'xTaskCreate()', 'xQueueSend()', 'vTaskDelay()', 'xSemaphoreTake()',
      'MOV R0, #0x20', 'LDR R1, [R0]', 'ADD R2, R1, #4', 'STR R2, [R0]',
      'always @(posedge clk)', 'assign out = a & b;', 'CRC16: 0xA4F2',
      'MQTT: /esp32/sensors', 'DMA_STREAM_OK', 'NVIC_EnableIRQ()'
    ];
    const streamCols = [];
    const makeStreamCol = (init) => {
      const n = 5 + Math.floor(Math.random() * 5);
      return {
        x: (Math.random() < 0.5 ? -1 : 1) * rnd(0.55, 1.15) * BX,
        z: rnd(-0.9, 0.9) * BZ,
        y: init ? rnd(-1.2, 1.2) * BY : -BY * 1.3,
        v: rnd(0.8, 2.2),
        n,
        words: Array.from({ length: n }, () => CS_INSTRUCTIONS[Math.floor(Math.random() * CS_INSTRUCTIONS.length)])
      };
    };

    const initStreams = () => {
      streamCols.length = 0;
      const count = isFinePointer ? 26 : 12;
      for (let i = 0; i < count; i++) streamCols.push(makeStreamCol(true));
    };

    const drawCSStream = () => {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const col of streamCols) {
        for (let t = 0; t < col.n; t++) {
          const y = col.y - t * 38;
          if (y < -BY * 1.3 || y > BY * 1.25) continue;
          const p = project(col.x, y, col.z);
          if (!p) continue;
          const f = nearness(p[3]);
          const a = (t === 0 ? 0.45 : 0.16 * (1 - t / col.n)) * (0.2 + 0.8 * f) * cmask(p[0]);
          if (a < 0.012) continue;
          setFont(Math.round(clamp(13 * p[2] * 1.3, 7, 18)));
          ctx.fillStyle = rgba(t === 0 ? COLORS[1] : COLORS[0], a);
          ctx.fillText(col.words[t], p[0], p[1]);
        }
      }
    };

    /* =================================================================
       MOTHERBOARD SYSTEM BUS (Bus Mẹ: Address, Data & Control lines)
       ================================================================= */
    const drawMotherboardBus = (sy) => {
      // 1. Bus Address (Lề Trái) & Data (Lề Phải)
      for (const [s, isRight] of [[sideL, false], [sideR, true]]) {
        if (!s.on) continue;
        const bx = s.bx;

        // Vạch bus kép trên bo mạch
        ctx.strokeStyle = rgba(COLORS[0], 0.18 + dmaPulse * 0.25);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(bx - 3, 0); ctx.lineTo(bx - 3, H);
        ctx.moveTo(bx + 3, 0); ctx.lineTo(bx + 3, H);
        ctx.stroke();

        // Xung nhịp đồng bộ System Clock di chuyển dọc theo bus
        const packetSpeed = 160;
        for (let k = 0; k < 3; k++) {
          const py = ((time * packetSpeed + k * (H / 2.6) + (isRight ? 180 : 0)) % (H + 60)) - 30;
          const g = ctx.createLinearGradient(bx, py - 40, bx, py);
          g.addColorStop(0, rgba(COLORS[0], 0));
          g.addColorStop(1, rgba(isRight ? COLORS[0] : COLORS[1], 0.75 + dmaPulse * 0.25));
          ctx.strokeStyle = g;
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(bx, py - 40); ctx.lineTo(bx, py);
          ctx.stroke();

          // Solder VIA pad tại đầu gói tin
          ctx.fillStyle = rgba(COLORS[2], 0.95);
          ctx.beginPath();
          ctx.arc(bx, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Nhãn lụa Bus Silkscreen trên mạch
        setFont(9);
        ctx.textAlign = isRight ? 'left' : 'right';
        ctx.textBaseline = 'top';
        ctx.fillStyle = rgba(COLORS[0], 0.45);
        ctx.fillText(isRight ? 'DATA_BUS [31:0] AXI' : 'ADDR_BUS [31:0] AHB', bx + (isRight ? 8 : -8), 24);
        ctx.fillText(isRight ? 'CLK: 240MHz // SYNCHRONIZED' : `MEM_MAP: 0x${((sy * 16 + 0x08000000) >>> 0).toString(16).toUpperCase()}`, bx + (isRight ? 8 : -8), 38);
      }
    };

    /* =================================================================
       CARD-TO-BUS DYNAMIC COUPLING (Liên kết đường mạch từ Bus vào Thẻ IC)
       ================================================================= */
    const drawCardCoupling = (sy) => {
      for (const c of cards) {
        if (c.hidden || c.b < -40 || c.t > H + 40) continue;
        const cy = (c.t + c.b) / 2;
        const isHovered = c.isHovered || (c.el === hoveredCardEl);

        // Độ tập trung: Sáng mạnh khi ở giữa màn hình hoặc khi hover
        const distFromCenter = Math.abs(cy - H * 0.5);
        const centerFocus = 1 - clamp(distFromCenter / (H * 0.55), 0, 1);
        if (centerFocus < 0.04 && !isHovered) continue;

        const alpha = isHovered ? 1.0 : (0.2 + 0.65 * centerFocus);
        const col = isHovered ? COLORS[1] : COLORS[0];

        // Tìm lề bus gần nhất
        for (const dir of [-1, 1]) {
          const edgeX = dir < 0 ? c.l : c.r;
          if (dir < 0 ? edgeX > minL + 16 : edgeX < maxR - 16) continue;
          const s = dir < 0 ? sideL : sideR;
          if (!s.on) continue;

          const bx = s.bx;
          const dx = (edgeX + dir * 2) - bx;
          if (dir < 0 ? dx < 14 : -dx < 14) continue;
          const sgn = dir < 0 ? 1 : -1;

          // Đường mạch in PCB vát góc 45° chuẩn phần cứng
          const midX1 = bx + sgn * Math.abs(dx) * 0.38;
          const midX2 = bx + sgn * Math.abs(dx) * 0.68;
          const pts = [
            [bx, cy - 18],
            [midX1, cy - 18],
            [midX2, cy],
            [edgeX, cy]
          ];

          // Vẽ trace mạch PCB
          ctx.strokeStyle = rgba(col, alpha);
          ctx.lineWidth = isHovered ? 2.0 : 1.2;
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let p = 1; p < pts.length; p++) ctx.lineTo(pts[p][0], pts[p][1]);
          ctx.stroke();

          // Lỗ chân hàn VIA pad tại điểm tiếp xúc thẻ
          ctx.fillStyle = rgba(col, alpha);
          ctx.beginPath();
          ctx.arc(edgeX, cy, isHovered ? 4.0 : 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Nếu thẻ đang được hover hoặc có lệnh ngắt DMA: Bơm dòng dữ liệu vào thẻ
          if (!motionQuery.matches && (isHovered || centerFocus > 0.3)) {
            const flowSpeed = isHovered ? 1.8 : 0.65;
            const u = (time * flowSpeed + c.t * 0.002) % 1;
            // Tính vị trí gói tin trên đường gấp khúc
            let totalD = 0;
            const segLens = [];
            for (let p = 0; p < pts.length - 1; p++) {
              const d = Math.hypot(pts[p+1][0] - pts[p][0], pts[p+1][1] - pts[p][1]);
              segLens.push(d);
              totalD += d;
            }
            let targetD = u * totalD;
            let packetX = pts[0][0], packetY = pts[0][1];
            for (let p = 0; p < segLens.length; p++) {
              if (targetD <= segLens[p]) {
                const k = segLens[p] > 0 ? targetD / segLens[p] : 0;
                packetX = lerp(pts[p][0], pts[p+1][0], k);
                packetY = lerp(pts[p][1], pts[p+1][1], k);
                break;
              }
              targetD -= segLens[p];
            }

            // Gói tin phát sáng
            ctx.fillStyle = rgba(COLORS[2], 0.95);
            ctx.beginPath();
            ctx.arc(packetX, packetY, isHovered ? 3.0 : 2.0, 0, Math.PI * 2);
            ctx.fill();

            // Quầng sáng Chip Select trên mép thẻ
            if (isHovered) {
              const g = ctx.createRadialGradient(edgeX, cy, 0, edgeX, cy, 22);
              g.addColorStop(0, rgba(COLORS[1], 0.6));
              g.addColorStop(1, rgba(COLORS[1], 0));
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(edgeX, cy, 22, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
    };

    /* =================================================================
       VẼ CÁC PHÂN HỆ 3D TẠI 2 LỀ (CS Lane Subsystems)
       ================================================================= */
    const drawCSLaneModules = (sy) => {
      for (const it of laneModules) {
        const s = it.side ? sideR : sideL;
        if (!s.on) continue;

        const y = it.pageY - sy;
        const size = clamp(s.g * 0.15, 18, 48);
        if (y < -size * 2.5 || y > H + size * 2.5) continue;

        // Tiêu điểm theo độ lệch tâm viewport
        const centerFocus = 1 - clamp(Math.abs(y - H * 0.5) / (H * 0.6), 0, 1);
        const a = clamp(0.28 + 0.65 * centerFocus + (triggeredModuleType === it.type ? 0.5 : 0), 0, 1);

        it.x = s.ix;
        it.y = y;
        it.size = size;
        it.ry = time * 0.45 * (it.side ? -1 : 1);

        const col = (triggeredModuleType === it.type || centerFocus > 0.65) ? COLORS[1] : COLORS[0];

        // Nhánh mạch đồng nối từ module vào bus chính
        ctx.strokeStyle = rgba(COLORS[0], a * 0.5);
        ctx.lineWidth = 1.0;
        const toward = it.side ? -1 : 1;
        ctx.beginPath();
        ctx.moveTo(it.x + toward * size * 1.3, y);
        ctx.lineTo(s.bx, y);
        ctx.stroke();

        // Điểm nối hàn VIA
        ctx.fillStyle = rgba(COLORS[1], a * 0.9);
        ctx.beginPath();
        ctx.arc(s.bx, y, 2.4, 0, Math.PI * 2);
        ctx.fill();

        // Quầng hào quang phía sau vật thể 3D
        const g = ctx.createRadialGradient(it.x, y, 0, it.x, y, size * 1.8);
        g.addColorStop(0, rgba(col, 0.08 * (0.3 + centerFocus)));
        g.addColorStop(1, rgba(col, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(it.x, y, size * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Gọi hàm vẽ 3D tương ứng của phân hệ CS
        const P = mkP(it);
        it.draw(P, it, col, a, sysClock);

        // Nhãn phân hệ CS
        if (size >= 22) {
          setFont(10);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = rgba(COLORS[0], a * 0.9);
          ctx.fillText(it.tag, it.x, y + size * 1.6);
        }
      }
    };

    /* ---------- Setup & Resize ---------- */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      curSize = 0;
      CX = W / 2;
      CY = H * 0.5;
      F = Math.max(W, H * 1.1) * 0.65;
      lastLayout = -1e9;
      initStreams();
      scheduleStatic();
    };

    let staticQueued = false;
    function scheduleStatic() {
      if (!motionQuery.matches || staticQueued) return;
      staticQueued = true;
      requestAnimationFrame(() => {
        staticQueued = false;
        lastLayout = -1e9;
        render();
      });
    }

    /* ---------- Input Handlers ---------- */
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', (e) => {
      cam.tmx = (e.clientX / W) * 2 - 1;
      cam.tmy = (e.clientY / H) * 2 - 1;
    }, { passive: true });
    document.addEventListener('mouseleave', () => {
      cam.tmx = 0; cam.tmy = 0;
    });

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      cam.tscroll = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
      scheduleStatic();
    };
    window.addEventListener('scroll', readScroll, { passive: true });
    readScroll();

    /* ---------- Update Loop ---------- */
    const update = (dt) => {
      cam.mx = lerp(cam.mx, cam.tmx, 0.06);
      cam.my = lerp(cam.my, cam.tmy, 0.06);
      cam.scroll = lerp(cam.scroll, cam.tscroll, 0.08);

      cam.yaw = Math.sin(time * 0.1) * 0.22 + cam.mx * 0.32 + cam.scroll * 0.9;
      cam.pitch = -0.14 + cam.my * 0.12 + Math.sin(time * 0.08) * 0.03;
      D = 1250 - cam.scroll * 240;

      cyaw = Math.cos(cam.yaw); syaw = Math.sin(cam.yaw);
      cpit = Math.cos(cam.pitch); spit = Math.sin(cam.pitch);
      CX = W / 2 + cam.mx * -16;

      sysClock += dt * 1.2;

      // Giảm xung DMA dần về 0
      if (dmaPulse > 0.01) {
        dmaPulse = lerp(dmaPulse, 0, 0.08);
      } else {
        dmaPulse = 0;
      }

      // Giảm timer kích hoạt module
      if (triggeredModuleTimer > 0) {
        triggeredModuleTimer -= dt * 16.67;
        if (triggeredModuleTimer <= 0) triggeredModuleType = null;
      }

      if (dt <= 0) return;

      // Cập nhật vị trí các cột instruction stream
      for (let i = 0; i < streamCols.length; i++) {
        const c = streamCols[i];
        c.y += c.v * dt;
        if (c.y - c.n * 38 > BY * 1.25) {
          streamCols[i] = makeStreamCol(false);
        }
      }
    };

    /* ---------- Render Pipeline ---------- */
    const render = () => {
      if (performance.now() - lastLayout > 100) refreshLayout();
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;

      const sy = window.scrollY || 0;

      // 1. Lớp luồng mã lệnh CS & Opcode nền
      drawCSStream();

      // 2. Bus mẹ bo mạch chủ (Address & Data buses)
      drawMotherboardBus(sy);

      // 3. Đường mạch PCB nối vào các thẻ IC trên trang
      drawCardCoupling(sy);

      // 4. Các phân hệ 3D Khoa học Máy tính ở 2 bên lề
      drawCSLaneModules(sy);

      ctx.globalAlpha = 1;
    };

    /* ---------- Animation Frame Loop ---------- */
    const frame = (now) => {
      rafId = null;
      if (document.hidden || motionQuery.matches) return;
      rafId = requestAnimationFrame(frame);
      if (now - last < MIN_FRAME) return;
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      time = now / 1000;
      update(dt);
      render();
    };

    const sync = () => {
      if (document.hidden || motionQuery.matches) {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
        if (motionQuery.matches) {
          time = 0; update(0); lastLayout = -1e9; render();
        } else {
          ctx.clearRect(0, 0, W, H);
        }
      } else if (rafId === null) {
        last = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    };

    initStreams();
    resize();
    sync();
    document.addEventListener('visibilitychange', sync);
    motionQuery.addEventListener('change', sync);
  };

  /* =================================================================
     PUBLIC API EXPORT
     ================================================================= */
  return {
    initNeuralNetwork,

    // Gán thẻ nội dung đang được rê chuột (Hovered IC)
    setHoveredCard(cardEl, isHovered) {
      hoveredCardEl = isHovered ? cardEl : null;
    },

    // Gán tọa độ di chuột trên thẻ để đồng bộ ánh sáng
    setHoverCoords(x, y) {
      hoveredCoords.x = x;
      hoveredCoords.y = y;
    },

    // Cập nhật section đang xem
    setActiveSection(secId) {
      activeSectionId = secId;
    },

    // Phát xung DMA kích hoạt bus khi gõ terminal hoặc chat AI
    pulseDMA(intensity = 1.0) {
      dmaPulse = Math.max(dmaPulse, intensity);
    },

    // Kích hoạt sáng rực và ưu tiên một phân hệ cụ thể (ví dụ 'rtos', 'tinyml', 'fpga')
    triggerModule(modType) {
      triggeredModuleType = modType;
      triggeredModuleTimer = 2400; // ms
      dmaPulse = 1.6;
    }
  };
})();
