// /**
//  * =====================================================================
//  * UNIFIED 3D COMPUTER-SCIENCE BACKGROUND — "One System, One Signal"
//  * Portfolio of Nguyen Van Sang — Embedded Software Engineer
//  *
//  * Ý tưởng liên kết: toàn trang là MỘT hệ thống máy tính đang chạy.
//  *   - Hai lề trái/phải là hai đường bus (ADDR / DATA) chạy suốt trang.
//  *   - Mỗi section gắn với 1-2 vật thể 3D wireframe (đều là "đồ thị":
//  *     node + cạnh) thuộc đúng lĩnh vực của section đó:
//  *       Hero      : CPU die (pipeline) + Register file
//  *       About     : Dual-core SoC + Clock/PLL
//  *       Project 1 : FreeRTOS scheduler + TinyML network
//  *       Project 2 : Verilog FSM + RTL logic cell
//  *       Project 3 : IoT mesh + DB buffer pages (RLS)
//  *       Skills    : Memory hierarchy + SPI/I2C waveform
//  *       Experience: ADC sampler + UART DMA ring
//  *       Education : AVL tree + Dijkstra graph
//  *       Contact   : NVIC vectors + Serial transceiver
//  *   - Các vật thể cùng một loại ngôn ngữ (node sáng lần lượt truyền
//  *     tín hiệu theo cạnh) và cùng một nhịp đồng hồ hệ thống (sysClock).
//  *   - Các vật thể cùng bên được NỐI TIẾP nhau bằng nhánh mạch, một gói
//  *     tin chạy từ module này sang module kế tiếp -> dữ liệu "đi theo"
//  *     người đọc khi cuộn. Vật thể gần tâm màn hình là module ACTIVE:
//  *     sáng nhất, truyền tín hiệu nhanh nhất, hiển thị trạng thái thực.
//  *   - Cuộn trang làm các vật thể xoay 3D; chuột nghiêng camera.
//  *   - Mọi thứ nằm ở hai lề trống, độ sáng bị chặn trần để KHÔNG lấn
//  *     nội dung; chỉ có các đường mạch mảnh nối bus vào mép thẻ khi thẻ
//  *     được rê chuột / ở giữa màn hình để làm nổi bật nội dung chính.
//  *
//  * NỀN: lớp mạng nơ-ron 2D y nguyên mã tham chiếu nằm dưới cùng (kết hợp
//  * với #aurora / #grid / #spot trong background.css); hệ 3D CS nằm ở hai lề.
//  *
//  * API công khai giữ nguyên: initNeuralNetwork, setHoveredCard,
//  * setHoverCoords, setActiveSection, pulseDMA, triggerModule.
//  * =====================================================================
//  */

// window.ScopeEngine = (() => {
//   'use strict';

//   const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
//   const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

//   let initialized = false;
//   let hoveredCardEl = null;
//   let dmaPulse = 0;
//   let triggeredType = null;
//   let triggeredTimer = 0;

//   // [0] mint = logic 1 / dữ liệu   [1] amber = clock / active / chip-select   [2] ice = gói tin
//   const C = [[95, 227, 200], [255, 181, 71], [191, 242, 230]];
//   const FONT = '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace';
//   const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
//   const lerp = (a, b, t) => a + (b - a) * t;
//   const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${clamp(a, 0, 1).toFixed(3)})`;

//   /* =================================================================
//      BỘ DỰNG ĐỒ THỊ 3D — mọi vật thể là {n: nodes[[x,y,z]], e: edges[[i,j]]}
//      ================================================================= */
//   const cube = (s = 0.62) => {
//     const n = [];
//     for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) n.push([x * s, y * s, z * s]);
//     n.push([0, 0, 0]);
//     const e = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
//     for (let i = 0; i < 8; i += 2) e.push([i, 8]);
//     return { n, e };
//   };

//   const stack = (k = 3) => {
//     const n = [], e = [];
//     for (let l = 0; l < k; l++) {
//       const y = (l - (k - 1) / 2) * 0.55, b = n.length;
//       n.push([-0.7, y, -0.5], [0.7, y, -0.5], [0.7, y, 0.5], [-0.7, y, 0.5]);
//       e.push([b, b + 1], [b + 1, b + 2], [b + 2, b + 3], [b + 3, b]);
//       if (l) for (let i = 0; i < 4; i++) e.push([b - 4 + i, b + i]);
//     }
//     return { n, e };
//   };

//   const ring = (m = 6) => {
//     const n = [], e = [];
//     for (let i = 0; i < m; i++) {
//       const a = (i / m) * Math.PI * 2;
//       n.push([Math.cos(a) * 0.8, Math.sin(a) * 0.8, i % 2 ? 0.35 : -0.35]);
//     }
//     n.push([0, 0, 0]);
//     for (let i = 0; i < m; i++) e.push([i, (i + 1) % m]);
//     e.push([0, m], [Math.floor(m / 2), m]);
//     return { n, e };
//   };

//   const tree = () => ({
//     n: [[0, -0.8, 0], [-0.55, -0.1, 0.2], [0.55, -0.1, 0.2], [-0.8, 0.6, 0.45], [-0.3, 0.6, 0.45], [0.3, 0.6, 0.45], [0.8, 0.6, 0.45]],
//     e: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]]
//   });

//   const net = (L = [3, 4, 2]) => {
//     const n = [], e = [], idx = [];
//     L.forEach((c, li) => {
//       const row = [];
//       for (let i = 0; i < c; i++) {
//         row.push(n.length);
//         n.push([(li - (L.length - 1) / 2) * 0.85, (i - (c - 1) / 2) * 0.55, i % 2 ? 0.25 : -0.25]);
//       }
//       idx.push(row);
//     });
//     for (let l = 0; l < idx.length - 1; l++) for (const a of idx[l]) for (const b of idx[l + 1]) e.push([a, b]);
//     return { n, e };
//   };

//   const wave = () => {
//     const n = [], e = [];
//     for (let i = 0; i < 14; i++) n.push([-0.9 + i * (1.8 / 13), Math.floor(i / 2) % 2 ? -0.35 : -0.05, -0.3]);
//     for (let i = 0; i < 13; i++) e.push([i, i + 1]);
//     const b = n.length;
//     for (let i = 0; i < 10; i++) n.push([-0.9 + i * (1.8 / 9), Math.floor(i / 3) % 2 ? 0.7 : 0.4, 0.35]);
//     for (let i = 0; i < 9; i++) e.push([b + i, b + i + 1]);
//     return { n, e };
//   };

//   const mesh = () => ({
//     n: [[0, -0.7, 0], [-0.7, 0.4, 0.3], [0.7, 0.4, 0.3], [0, 0.1, -0.5]],
//     e: [[0, 1], [0, 2], [1, 2], [3, 0], [3, 1], [3, 2]]
//   });

//   const pyramid = () => {
//     const n = [[0, -0.8, 0]];
//     for (const y of [-0.1, 0.6]) {
//       const s = 0.35 + (y + 0.8) * 0.5;
//       n.push([-s, y, -s], [s, y, -s], [s, y, s], [-s, y, s]);
//     }
//     const e = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 3], [3, 4], [4, 1], [1, 5], [2, 6], [3, 7], [4, 8], [5, 6], [6, 7], [7, 8], [8, 5]];
//     return { n, e };
//   };

//   /* =================================================================
//      LIÊN KẾT PHÂN HỆ ↔ SECTION (ops = trạng thái hiển thị theo nhịp)
//      ================================================================= */
//   const BIND = [
//     { sel: '#hero', side: 0, tag: 'CPU Pipeline LX7', type: 'cpu', build: cube, ops: ['IF', 'ID', 'EX', 'MEM', 'WB'] },
//     { sel: '#hero', side: 1, tag: 'Register File', type: 'regs', build: () => stack(3), ops: ['R0', 'R1', 'R2', 'R3', 'PC', 'SP'] },
//     { sel: '#about', side: 0, tag: 'Dual-Core SoC', type: 'soc', build: mesh, ops: ['Core0', 'Core1', 'AXI', 'Core0'] },
//     { sel: '#about', side: 1, tag: 'Clock / PLL', type: 'clk', build: wave, ops: ['XTAL 40MHz', 'PLL x6', 'SYS 240MHz'] },
//     { sel: '#projectGrid article:nth-child(1)', side: 0, tag: 'FreeRTOS Scheduler', type: 'rtos', build: () => ring(7), ops: ['READY', 'RUNNING', 'BLOCKED', 'Mutex take', 'Mutex give'] },
//     { sel: '#projectGrid article:nth-child(1)', side: 1, tag: 'TinyML Inference', type: 'tinyml', build: () => net([3, 4, 3]), ops: ['input', 'dense', 'softmax', '<1 ms'] },
//     { sel: '#projectGrid article:nth-child(2)', side: 0, tag: 'Verilog FSM', type: 'fpga', build: () => ring(5), ops: ['S_IDLE', 'S_COIN', 'S_SELECT', 'S_DISPENSE', 'S_CHANGE'] },
//     { sel: '#projectGrid article:nth-child(3)', side: 1, tag: 'Postgres RLS', type: 'db', build: () => stack(3), ops: ['page #0', 'page #1', 'page #2', 'RLS policy'] },
//     { sel: '#skills', side: 0, tag: 'Memory Hierarchy', type: 'mem', build: pyramid, ops: ['Regs', 'L1', 'SRAM', 'Flash'] },
//     { sel: '#skills', side: 1, tag: 'SPI / I2C Bus', type: 'osc', build: wave, ops: ['SCK', 'MOSI', '/CS'] },
//     { sel: '#experience', side: 0, tag: 'Sensor ADC', type: 'adc', build: cube, ops: ['sample', 'hold', 'convert'] },
//     { sel: '#experience', side: 1, tag: 'UART DMA Ring', type: 'dma', build: () => ring(8), ops: ['wr', 'rd', 'wr', 'rd'] },
//     { sel: '#education', side: 0, tag: 'AVL Tree', type: 'tree', build: tree, ops: ['insert', 'rotate', 'balance'] },
//     { sel: '#education', side: 1, tag: 'Dijkstra Graph', type: 'dijkstra', build: pyramid, ops: ['relax', 'relax', 'path'] },
//     { sel: '#contact', side: 0, tag: 'NVIC Vectors', type: 'nvic', build: () => stack(4), ops: ['Reset', 'SysTick', 'UART0', 'GPIO'] },
//     { sel: '#contact', side: 1, tag: 'Serial Transceiver', type: 'serial', build: wave, ops: ['TX', 'RX', '115200 8N1'] }
//   ];


//   /* =================================================================
//      ENGINE
//      ================================================================= */
//   const initNeuralNetwork = () => {
//     const canvas = document.getElementById('net');
//     if (!canvas || initialized) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;
//     initialized = true;

//     let W = 0, H = 0, CL = 0, CR = 0;
//     let sideL = { on: false, bx: 0, ix: 0, g: 0 };
//     let sideR = { on: false, bx: 0, ix: 0, g: 0 };
//     let time = 0, sysClock = 0, last = 0, rafId = null;
//     let lastLayout = -1e9, builtH = -1, builtW = -1;
//     let mods = [], cards = [], cardEls = null, minL = 0, maxR = 0;
//     const cam = { mx: 0, my: 0, tmx: 0, tmy: 0 };
//     const MIN_FRAME = isFinePointer ? 16 : 32;

//     /* =================================================================
//        HỆ THỐNG 3D: PERSPECTIVE CAMERA, 3D AURORA, 3D GRID, 3D SPOT, 3D NEURAL NET
//        Toàn bộ nền aurora, lưới, spot và mạng nơ-ron được chuyển thành 3D.
//        ================================================================= */
//     const BX = 940, BY = 620, BZ = 620;
//     const FLOOR_Y = BY * 0.92;
//     let CX = 0, CY = 0, F = 820, D = 1220;
//     let cyaw = 1, syaw = 0, cpit = 1, spit = 0;

//     const project = (x, y, z) => {
//       const x1 = x * cyaw + z * syaw;
//       const z1 = -x * syaw + z * cyaw;
//       const y1 = y * cpit - z1 * spit;
//       const z2 = y * spit + z1 * cpit;
//       const w = D + z2;
//       if (w < 80) return null;
//       const s = F / w;
//       return [CX + x1 * s, CY + y1 * s, s, z2];
//     };
//     const nearness = (z2) => clamp(1 - (z2 + BZ * 1.1) / (BZ * 2.2), 0, 1);

//     const cmask = (sx) => {
//       const out = Math.max(CL - sx, sx - CR);
//       const t = clamp((out + 30) / 130, 0, 1);
//       const s = t * t * (3 - 2 * t);
//       const mn = CL >= 50 ? 0.22 : 0.45;
//       return mn + (1 - mn) * s;
//     };

//     /* ---------- LƯỚI 3D: Mặt phẳng sàn bo mạch vi xử lý & lưới ma trận nền 3D (3D Matrix Grid) ---------- */
//     const floorRipples = [];

//     const draw3DGrid = () => {
//       const y = FLOOR_Y;
//       const numLong = isFinePointer ? 19 : 11;

//       // 1. Lưới nền ma trận 3D phía sau (3D Backdrop Schematic Grid theo ảnh tham chiếu)
//       const bgZ = BZ * 0.65;
//       const numBgV = 13;
//       for (let i = 0; i < numBgV; i++) {
//         const u = i / (numBgV - 1);
//         const x = (u * 2 - 1) * BX * 1.25;
//         const p1 = project(x, -BY * 0.95, bgZ);
//         const p2 = project(x, FLOOR_Y, bgZ);
//         if (!p1 || !p2) continue;
//         const mask = cmask((p1[0] + p2[0]) / 2);
//         ctx.strokeStyle = rgba(C[0], 0.045 * mask);
//         ctx.lineWidth = 0.8;
//         ctx.beginPath();
//         ctx.moveTo(p1[0], p1[1]);
//         ctx.lineTo(p2[0], p2[1]);
//         ctx.stroke();
//       }
//       const numBgH = 9;
//       for (let j = 0; j < numBgH; j++) {
//         const v = j / (numBgH - 1);
//         const yLine = lerp(-BY * 0.95, FLOOR_Y, v);
//         const p1 = project(-BX * 1.25, yLine, bgZ);
//         const p2 = project(BX * 1.25, yLine, bgZ);
//         if (!p1 || !p2) continue;
//         const mask = cmask((p1[0] + p2[0]) / 2);
//         ctx.strokeStyle = rgba(C[0], 0.045 * mask);
//         ctx.lineWidth = 0.8;
//         ctx.beginPath();
//         ctx.moveTo(p1[0], p1[1]);
//         ctx.lineTo(p2[0], p2[1]);
//         ctx.stroke();
//       }

//       // 2. Các đường kinh tuyến (Z-lines) hội tụ về vô cực trong không gian 3D
//       for (let i = 0; i < numLong; i++) {
//         const u = i / (numLong - 1);
//         const x = (u * 2 - 1) * BX * 1.3;
//         const p1 = project(x, y, -BZ * 0.75);
//         const p2 = project(x, y, BZ * 1.25);
//         if (!p1 || !p2) continue;

//         const mask = cmask((p1[0] + p2[0]) / 2);
//         const g = ctx.createLinearGradient(p1[0], p1[1], p2[0], p2[1]);
//         g.addColorStop(0, rgba(C[0], 0));
//         g.addColorStop(0.35, rgba(C[0], (0.16 + dmaPulse * 0.1) * mask));
//         g.addColorStop(1, rgba(C[0], 0));

//         ctx.strokeStyle = g;
//         ctx.lineWidth = 1.1;
//         ctx.beginPath();
//         ctx.moveTo(p1[0], p1[1]);
//         ctx.lineTo(p2[0], p2[1]);
//         ctx.stroke();
//       }

//       // 3. Các đường vĩ tuyến (X-lines) tịnh tiến về phía trước theo nhịp đồng hồ clock
//       const step = (BZ * 2) / 12;
//       const offset = (time * 42 + sysClock * 18) % step;
//       for (let k = -6; k <= 7; k++) {
//         const z = k * step + offset - step / 2;
//         if (z < -BZ * 0.8 || z > BZ * 1.3) continue;
//         const p1 = project(-BX * 1.3, y, z);
//         const p2 = project(BX * 1.3, y, z);
//         if (!p1 || !p2) continue;

//         const depthFade = clamp(1 - Math.abs(z) / (BZ * 1.3), 0, 1);
//         const mask = cmask((p1[0] + p2[0]) / 2);
//         const alpha = (0.13 + dmaPulse * 0.08) * depthFade * mask;
//         if (alpha < 0.01) continue;

//         ctx.strokeStyle = rgba(C[0], alpha);
//         ctx.lineWidth = 1;
//         ctx.beginPath();
//         ctx.moveTo(p1[0], p1[1]);
//         ctx.lineTo(p2[0], p2[1]);
//         ctx.stroke();

//         // Điểm nút hàn VIA phát sáng tại các giao lộ ngẫu nhiên
//         if (k % 2 === 0 && depthFade > 0.4) {
//           for (let s = 1; s < numLong - 1; s += 3) {
//             const u = s / (numLong - 1);
//             const x = (u * 2 - 1) * BX * 1.3;
//             const pj = project(x, y, z);
//             if (pj) {
//               const pulse = 0.5 + 0.5 * Math.sin(time * 3 + s + k);
//               ctx.fillStyle = rgba(C[1], 0.35 * pulse * mask * depthFade);
//               ctx.beginPath();
//               ctx.arc(pj[0], pj[1], Math.max(1, 1.8 * pj[2]), 0, Math.PI * 2);
//               ctx.fill();
//             }
//           }
//         }
//       }

//       // 4. Các vòng sóng lan tỏa tại điểm nối sàn bo mạch từ đường thả trút xuống
//       for (let i = floorRipples.length - 1; i >= 0; i--) {
//         const rip = floorRipples[i];
//         const pj = project(rip.x, y, rip.z);
//         if (pj) {
//           const mask = cmask(pj[0]);
//           ctx.strokeStyle = rgba(C[0], rip.a * mask);
//           ctx.lineWidth = Math.max(0.8, 1.2 * pj[2]);
//           ctx.beginPath();
//           ctx.ellipse(pj[0], pj[1], rip.r * pj[2], rip.r * 0.45 * pj[2], 0, 0, Math.PI * 2);
//           ctx.stroke();
//         }
//         rip.r += rip.vr;
//         rip.a -= rip.va;
//         if (rip.a <= 0) floorRipples.splice(i, 1);
//       }
//     };

//     /* ---------- MẠNG NƠ-RON 3D THEO MẪU THIẾT KẾ CONSTELLATION ĐẶC TRƯNG ---------- */
//     const mouseP = { x: -9999, y: -9999, on: false };
//     let cloud = [], cEdges = [], cPulses = [], dropPulses = [];
//     const MLINK3D = 380;

//     // Định nghĩa 32 nút của chòm sao đồ thị nơ-ron 3D chính xác theo toàn bộ chi tiết ảnh mẫu
//     const CONSTELLATION_SPECS = [
//       // 0..17: Cụm trái đa diện (Left dense polyhedral cluster & tail)
//       { id: 'tail1', u: -0.92, v: 0.12, z: 30, c: 0, r: 2.4, amp: [8, 6, 12] },
//       { id: 'tail2', u: -0.84, v: -0.06, z: -10, c: 2, halo: 18, r: 2.6, amp: [7, 6, 10] }, // Ice halo
//       { id: 'apex', u: -0.46, v: -0.68, z: -30, c: 0, halo: 26, r: 3.2, amp: [6, 5, 12] }, // Cyan halo đỉnh chóp
//       { id: 'amb_top', u: -0.32, v: -0.56, z: 40, c: 1, halo: 18, r: 2.9, amp: [6, 6, 11] }, // Amber đỉnh
//       { id: 'l_top', u: -0.66, v: -0.28, z: 20, c: 0, r: 2.6, amp: [7, 6, 13] },
//       { id: 'amb_ul', u: -0.54, v: -0.22, z: 50, c: 1, halo: 20, r: 3.0, amp: [6, 7, 14] }, // Amber trên trái
//       { id: 'l_mid1', u: -0.60, v: 0.02, z: -20, c: 0, r: 2.6, amp: [7, 6, 11] },
//       { id: 'amb_ml', u: -0.48, v: -0.06, z: 60, c: 1, halo: 22, r: 3.2, amp: [6, 5, 12] }, // Amber giữa trái
//       { id: 'l_core', u: -0.42, v: 0.06, z: -15, c: 0, halo: 24, r: 3.0, amp: [5, 6, 10] }, // Cyan halo tâm
//       { id: 'amb_center', u: -0.36, v: -0.04, z: 35, c: 1, halo: 20, r: 3.0, amp: [6, 7, 13] }, // Amber trung tâm
//       { id: 'l_bot_left', u: -0.68, v: 0.28, z: -40, c: 0, halo: 22, r: 2.8, amp: [8, 6, 12] }, // Cyan halo dưới trái
//       { id: 'l_bot_sub', u: -0.62, v: 0.32, z: -10, c: 0, r: 2.4, amp: [7, 5, 10] },
//       { id: 'l_low_mid', u: -0.48, v: 0.24, z: 10, c: 0, r: 2.6, amp: [6, 7, 13] },
//       { id: 'amb_low', u: -0.38, v: 0.20, z: 45, c: 1, halo: 20, r: 3.0, amp: [7, 6, 15] }, // Amber dưới
//       { id: 'bot_tip', u: -0.40, v: 0.54, z: -20, c: 2, r: 2.6, amp: [6, 8, 11] }, // Đáy chóp
//       { id: 'l_mid_rt', u: -0.28, v: -0.12, z: -30, c: 0, r: 2.6, amp: [6, 6, 12] },
//       { id: 'amb_mid_rt', u: -0.24, v: 0.12, z: 50, c: 1, halo: 18, r: 2.9, amp: [6, 5, 14] }, // Amber giữa phải
//       { id: 'amb_rt_low', u: -0.20, v: 0.28, z: 60, c: 1, halo: 20, r: 3.0, amp: [7, 7, 13] }, // Amber góc dưới phải

//       // 18..22: Nút cầu nối trung tâm & Vòng tròn mục tiêu lơ lửng (Center Bridge & Floating Reticle)
//       { id: 'br_in_top', u: -0.08, v: -0.02, z: -10, c: 0, r: 2.5, amp: [5, 5, 9] },
//       { id: 'br_in_bot', u: -0.10, v: 0.20, z: 20, c: 0, r: 2.5, amp: [5, 6, 10] },
//       { id: 'amb_hub', u: 0.10, v: 0.12, z: 15, c: 1, halo: 24, drop: true, r: 3.4, amp: [5, 4, 8] }, // Amber Hub + đường thả rơi xuống sàn
//       { id: 'hub_sub', u: 0.14, v: 0.08, z: -15, c: 0, r: 2.3, amp: [5, 5, 9] },
//       { id: 'ring_center', u: 0.24, v: 0.06, z: 5, c: 0, isRingCenter: true, ring: 28, r: 0, amp: [5, 4, 10] }, // Vòng tròn ngắm rỗng lơ lửng trên cầu

//       // 23..31: Nhánh chuỗi sóng uốn lượn và dòng chảy đổ dốc sang phải (Right Wave & Cascading Tail)
//       { id: 'r_bridge_out', u: 0.36, v: 0.04, z: -40, c: 2, halo: 22, r: 2.9, amp: [7, 6, 14] }, // Ice halo
//       { id: 'r_wave_top', u: 0.44, v: -0.16, z: 30, c: 0, r: 2.6, amp: [6, 6, 12] },
//       { id: 'r_mid1', u: 0.48, v: 0.08, z: 50, c: 0, r: 2.5, amp: [6, 7, 11] },
//       { id: 'r_wave_crest', u: 0.58, v: -0.14, z: -20, c: 0, halo: 24, r: 3.0, amp: [8, 6, 15] }, // Cyan halo đỉnh sóng phải
//       { id: 'r_cascade1', u: 0.65, v: 0.04, z: 20, c: 0, r: 2.6, amp: [7, 6, 13] },
//       { id: 'r_cascade2', u: 0.74, v: 0.16, z: -30, c: 0, r: 2.5, amp: [7, 6, 12] },
//       { id: 'r_amb_bot1', u: 0.78, v: 0.36, z: 40, c: 1, halo: 20, r: 3.0, amp: [8, 7, 14] }, // Amber dưới phải
//       { id: 'r_cascade3', u: 0.84, v: 0.48, z: -10, c: 0, r: 2.5, amp: [7, 7, 12] },
//       { id: 'r_amb_tip', u: 0.88, v: 0.68, z: 30, c: 1, halo: 22, r: 3.2, amp: [8, 8, 14] } // Amber chóp đuôi dốc
//     ];

//     // Danh sách 74 cạnh tam giác liên kết chuẩn xác theo kiến trúc đồ thị ảnh mẫu
//     const CONSTELLATION_EDGES = [
//       // Left Tail
//       [0, 1], [0, 6], [0, 10],
//       [1, 4], [1, 5], [1, 6],
//       // Left Cluster Top & Apex
//       [2, 3], [2, 4], [2, 5], [2, 7], [2, 15],
//       [3, 15], [3, 18],
//       [4, 5], [4, 6], [4, 10],
//       [5, 6], [5, 7], [5, 8],
//       [6, 7], [6, 10], [6, 11],
//       [7, 8], [7, 9], [7, 12],
//       [8, 9], [8, 12], [8, 13], [8, 15],
//       [9, 13], [9, 15], [9, 16],
//       [10, 11], [10, 12],
//       [11, 12], [11, 14],
//       [12, 13], [12, 14],
//       [13, 14], [13, 16], [13, 17],
//       [14, 17],
//       [15, 16], [15, 18],
//       [16, 17], [16, 18], [16, 19],
//       [17, 19],

//       // Bridge Convergence towards Center Hub (20) & Ring (22)
//       [18, 20], [18, 21], [19, 20], [19, 21],
//       [20, 21],
//       // Bridge line through the Floating Ring
//       [20, 22], [21, 22],
//       [22, 23], [20, 23], [21, 23],

//       // Right Cluster & Cascading Tail
//       [23, 24], [23, 25],
//       [24, 25], [24, 26], [24, 27],
//       [25, 26], [25, 27],
//       [26, 27], [26, 28],
//       [27, 28], [27, 29],
//       [28, 29], [28, 30],
//       [29, 30], [29, 31],
//       [30, 31]
//     ];

//     const init3DCloud = () => {
//       cloud = [];
//       // 1. Tạo các nút chòm sao đồ thị chính thức
//       for (let i = 0; i < CONSTELLATION_SPECS.length; i++) {
//         const spec = CONSTELLATION_SPECS[i];
//         cloud.push({
//           idx: i,
//           spec,
//           isAmbient: false,
//           isRingCenter: !!spec.isRingCenter,
//           c: C[spec.c],
//           r: spec.r,
//           halo: spec.halo || 0,
//           ring: spec.ring || 0,
//           drop: !!spec.drop,
//           ph: Math.random() * Math.PI * 2,
//           baseX: 0, baseY: 0, baseZ: 0,
//           oscX: 0, oscY: 0, oscZ: 0,
//           offsetX: 0, offsetY: 0, offsetZ: 0,
//           vx: 0, vy: 0, vz: 0,
//           x: 0, y: 0, z: 0,
//           proj: null
//         });
//       }

//       // 2. Tạo thêm các nút bụi lượng tử nền (ambient 3D particles) tăng độ sâu trường nhìn
//       const numAmbient = isFinePointer ? 22 : 12;
//       for (let i = 0; i < numAmbient; i++) {
//         const rColor = Math.random();
//         cloud.push({
//           idx: CONSTELLATION_SPECS.length + i,
//           spec: null,
//           isAmbient: true,
//           isRingCenter: false,
//           c: rColor < 0.65 ? C[0] : (rColor < 0.85 ? C[1] : C[2]),
//           r: 1.2 + Math.random() * 1.5,
//           halo: 0,
//           ring: 0,
//           drop: false,
//           ph: Math.random() * Math.PI * 2,
//           baseX: (Math.random() * 2 - 1) * BX * 1.1,
//           baseY: (Math.random() * 2 - 1) * BY * 0.85,
//           baseZ: (Math.random() * 2 - 1) * BZ * 0.8,
//           oscX: 0, oscY: 0, oscZ: 0,
//           offsetX: 0, offsetY: 0, offsetZ: 0,
//           vx: (Math.random() - 0.5) * 0.16,
//           vy: (Math.random() - 0.5) * 0.16,
//           vz: (Math.random() - 0.5) * 0.16,
//           x: 0, y: 0, z: 0,
//           proj: null
//         });
//       }

//       cPulses = [];
//       dropPulses = [];
//     };

//     const update3DCloud = (dt) => {
//       if (dt <= 0 || !cloud.length) return;
//       const k = dt * 60;
//       const damp = Math.pow(0.985, k);
//       const rScale = Math.min(1, Math.max(0.48, W / 1380));
//       const probeX = cam.mx * BX * 0.85;
//       const probeY = cam.my * BY * 0.75;
//       const probeZ = -BZ * 0.3;

//       for (const p of cloud) {
//         if (!p.isAmbient) {
//           // Tọa độ gốc ổn định theo tỷ lệ màn hình (Responsive Anchor)
//           p.baseX = p.spec.u * BX * 0.86 * rScale;
//           p.baseY = (p.spec.v * BY * 0.72 - BY * 0.03) * rScale;
//           p.baseZ = p.spec.z * rScale;

//           // Chuyển động thở và sóng uốn lượn 3D hài hòa (Harmonic 3D Spine Wave & Breathing)
//           // Tạo sự chuyển tiếp mềm mại giữa các trạng thái cấu hình như trong chuỗi ảnh tham chiếu
//           const spineWave = Math.sin(time * 0.55 + p.spec.u * 3.14);
//           const waveAmpY = (p.spec.u > 0.3 ? 28 : (p.spec.u > 0 ? 14 : 8)) * rScale;
//           const waveAmpZ = 18 * rScale;

//           p.oscX = Math.sin(time * 0.95 + p.ph) * p.spec.amp[0] * rScale;
//           p.oscY = (Math.cos(time * 0.85 + p.ph * 1.2) * p.spec.amp[1] + spineWave * waveAmpY) * rScale;
//           p.oscZ = (Math.sin(time * 1.15 + p.ph * 0.7) * p.spec.amp[2] + Math.cos(time * 0.45 + p.spec.u * 2.5) * waveAmpZ) * rScale;

//           // Tương tác chuột nam châm 3D
//           if (mouseP.on) {
//             const curX = p.baseX + p.oscX + p.offsetX;
//             const curY = p.baseY + p.oscY + p.offsetY;
//             const curZ = p.baseZ + p.oscZ + p.offsetZ;
//             const dx = probeX - curX, dy = probeY - curY, dz = probeZ - curZ;
//             const d = Math.hypot(dx, dy, dz);
//             if (d < MLINK3D && d > 10) {
//               const f = (1 - d / MLINK3D) * 0.022 * k;
//               p.vx += (dx / d) * f;
//               p.vy += (dy / d) * f;
//               p.vz += (dz / d) * f;
//             }
//           }

//           // Lực kéo đàn hồi giữ cấu trúc đồ thị ổn định
//           p.vx -= p.offsetX * 0.06 * k;
//           p.vy -= p.offsetY * 0.06 * k;
//           p.vz -= p.offsetZ * 0.06 * k;
//           p.vx *= damp; p.vy *= damp; p.vz *= damp;
//           p.offsetX += p.vx * k;
//           p.offsetY += p.vy * k;
//           p.offsetZ += p.vz * k;

//           p.x = p.baseX + p.oscX + p.offsetX;
//           p.y = p.baseY + p.oscY + p.offsetY;
//           p.z = p.baseZ + p.oscZ + p.offsetZ;
//         } else {
//           // Các hạt nền trôi tự do trong không gian 3D
//           p.baseX += p.vx * k;
//           p.baseY += p.vy * k;
//           p.baseZ += p.vz * k;
//           if (p.baseX < -BX * 1.1) p.baseX = BX * 1.1; else if (p.baseX > BX * 1.1) p.baseX = -BX * 1.1;
//           if (p.baseY < -BY * 0.85) p.baseY = BY * 0.85; else if (p.baseY > BY * 0.85) p.baseY = -BY * 0.85;
//           if (p.baseZ < -BZ * 0.8) p.baseZ = BZ * 0.8; else if (p.baseZ > BZ * 0.8) p.baseZ = -BZ * 0.8;
//           p.x = p.baseX; p.y = p.baseY; p.z = p.baseZ;
//         }
//       }

//       // Xung truyền dẫn nơ-ron (Action Potentials)
//       const pulseRate = (mouseP.on ? 0.15 : 0.08) + dmaPulse * 0.25;
//       if (CONSTELLATION_EDGES.length && Math.random() < pulseRate * k && cPulses.length < 18 + Math.round(dmaPulse * 8)) {
//         const edge = CONSTELLATION_EDGES[Math.floor(Math.random() * CONSTELLATION_EDGES.length)];
//         const a = cloud[edge[0]], b = cloud[edge[1]];
//         if (a && b) {
//           const rev = Math.random() < 0.35;
//           cPulses.push({
//             a: rev ? b : a,
//             b: rev ? a : b,
//             t: 0,
//             s: 0.014 + Math.random() * 0.02,
//             col: a.c === C[1] || b.c === C[1] ? (Math.random() < 0.6 ? C[1] : C[0]) : C[0]
//           });
//         }
//       }
//       for (let i = cPulses.length - 1; i >= 0; i--) {
//         cPulses[i].t += cPulses[i].s * k;
//         if (cPulses[i].t >= 1) cPulses.splice(i, 1);
//       }

//       // Xung dòng dữ liệu trút xuống sàn bo mạch từ nút Hub trung tâm
//       const hubNode = cloud.find(n => n.spec && n.spec.drop) || cloud[20];
//       if (hubNode && Math.random() < (0.02 + dmaPulse * 0.06) * k && dropPulses.length < 4) {
//         dropPulses.push({ t: 0, s: 0.012 + Math.random() * 0.016 });
//       }
//       for (let i = dropPulses.length - 1; i >= 0; i--) {
//         dropPulses[i].t += dropPulses[i].s * k;
//         if (dropPulses[i].t >= 1) {
//           if (hubNode) {
//             floorRipples.push({
//               x: hubNode.x,
//               z: hubNode.z,
//               r: 2,
//               vr: 1.2,
//               a: 0.75,
//               va: 0.025
//             });
//           }
//           dropPulses.splice(i, 1);
//         }
//       }
//     };

//     const draw3DCloud = () => {
//       if (!cloud.length) return;
//       for (const p of cloud) p.proj = project(p.x, p.y, p.z);

//       // 1. Vẽ các cạnh nền mờ kết nối giữa các hạt ambient bụi lượng tử
//       ctx.lineWidth = 0.6;
//       const ambLimit = 190 * 190;
//       for (let i = CONSTELLATION_SPECS.length; i < cloud.length; i++) {
//         const a = cloud[i];
//         if (!a.proj) continue;
//         for (let j = i + 1; j < cloud.length; j++) {
//           const b = cloud[j];
//           if (!b.proj) continue;
//           const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
//           const d2 = dx * dx + dy * dy + dz * dz;
//           if (d2 < ambLimit) {
//             const fog = (nearness(a.proj[3]) + nearness(b.proj[3])) * 0.5;
//             const mask = (cmask(a.proj[0]) + cmask(b.proj[0])) * 0.5;
//             ctx.strokeStyle = rgba(C[0], 0.06 * fog * mask);
//             ctx.beginPath();
//             ctx.moveTo(a.proj[0], a.proj[1]);
//             ctx.lineTo(b.proj[0], b.proj[1]);
//             ctx.stroke();
//           }
//         }
//       }

//       // 2. Vẽ 74 cạnh đồ thị chòm sao tam giác đặc trưng (Constellation Mesh Edges)
//       for (let i = 0; i < CONSTELLATION_EDGES.length; i++) {
//         const [ia, ib] = CONSTELLATION_EDGES[i];
//         const a = cloud[ia], b = cloud[ib];
//         if (!a || !b || !a.proj || !b.proj) continue;

//         const pA = a.proj, pB = b.proj;
//         const fog = (nearness(pA[3]) + nearness(pB[3])) * 0.5;
//         const mask = (cmask(pA[0]) + cmask(pB[0])) * 0.5;
//         const edgeScale = (pA[2] + pB[2]) * 0.5;

//         // Cạnh nối giữa các nút amber sẽ có màu hổ phách vàng ấm
//         const isAmberEdge = a.c === C[1] && b.c === C[1];
//         const col = isAmberEdge ? C[1] : (a.c === C[1] || b.c === C[1] ? (i % 2 === 0 ? C[0] : C[1]) : C[0]);
//         const alpha = (isAmberEdge ? 0.38 : 0.28) * (0.45 + 0.55 * fog) * mask;

//         ctx.strokeStyle = rgba(col, alpha);
//         ctx.lineWidth = Math.max(0.65, (0.75 + 0.8 * fog) * edgeScale);
//         ctx.beginPath();
//         ctx.moveTo(pA[0], pA[1]);
//         ctx.lineTo(pB[0], pB[1]);
//         ctx.stroke();
//       }

//       // 3. Đường mạch thả thẳng đứng (Vertical Drop Trace) từ nút Hub trung tâm xuống sàn 3D
//       const hubNode = cloud.find(n => n.spec && n.spec.drop) || cloud[20];
//       if (hubNode && hubNode.proj) {
//         const pTop = hubNode.proj;
//         const pBot = project(hubNode.x, FLOOR_Y, hubNode.z);
//         if (pBot) {
//           const mask = cmask(pTop[0]);
//           const grad = ctx.createLinearGradient(pTop[0], pTop[1], pBot[0], pBot[1]);
//           grad.addColorStop(0, rgba(C[0], 0.75 * mask));
//           grad.addColorStop(0.65, rgba(C[0], 0.38 * mask));
//           grad.addColorStop(1, rgba(C[0], 0.08 * mask));

//           ctx.strokeStyle = grad;
//           ctx.lineWidth = Math.max(1.1, 1.4 * pTop[2]);
//           ctx.beginPath();
//           ctx.moveTo(pTop[0], pTop[1]);
//           ctx.lineTo(pBot[0], pBot[1]);
//           ctx.stroke();

//           // Vòng đệm chân mạch (Via Solder Pad) trên mặt phẳng sàn
//           ctx.strokeStyle = rgba(C[0], 0.42 * mask);
//           ctx.lineWidth = 1;
//           ctx.beginPath();
//           ctx.ellipse(pBot[0], pBot[1], 8 * pBot[2], 3.6 * pBot[2], 0, 0, Math.PI * 2);
//           ctx.stroke();

//           // Xung chạy dọc đường thả thẳng đứng
//           for (const dp of dropPulses) {
//             const dropY = lerp(hubNode.y, FLOOR_Y, dp.t);
//             const pDrop = project(hubNode.x, dropY, hubNode.z);
//             if (pDrop) {
//               const fade = Math.sin(dp.t * Math.PI);
//               glow(pDrop[0], pDrop[1], 10 * pDrop[2] + 2, C[0], 0.85 * fade * mask);
//               ctx.fillStyle = `rgba(255,255,255,${(0.95 * fade * mask).toFixed(3)})`;
//               ctx.beginPath();
//               ctx.arc(pDrop[0], pDrop[1], Math.max(1.2, 2.2 * pDrop[2]), 0, Math.PI * 2);
//               ctx.fill();
//             }
//           }
//         }
//       }

//       // 4. Vẽ các nút nơ-ron theo thứ tự chiều sâu từ xa đến gần (Z-Sort Painter's Algorithm)
//       const visibleNodes = cloud.filter((n) => n.proj).sort((p, q) => q.proj[3] - p.proj[3]);
//       for (const p of visibleNodes) {
//         const proj = p.proj;
//         const fog = nearness(proj[3]);
//         const mask = cmask(proj[0]);
//         const scale = proj[2];
//         const tw = 0.86 + 0.14 * Math.sin(time * 2.4 + p.ph);

//         // a. Quầng đĩa phát quang mờ (Translucent Halo Disc) như trong ảnh tham chiếu
//         if (p.halo > 0) {
//           const haloR = p.halo * scale * (0.96 + 0.04 * Math.sin(time * 1.8 + p.ph));
//           // Đĩa màu mờ rõ nét (tương thích màu cyan, amber hoặc ice)
//           ctx.fillStyle = rgba(p.c, 0.18 * (0.55 + 0.45 * fog) * mask * tw);
//           ctx.beginPath();
//           ctx.arc(proj[0], proj[1], haloR, 0, Math.PI * 2);
//           ctx.fill();

//           // Viền mỏng bao quanh đĩa
//           ctx.strokeStyle = rgba(p.c, 0.42 * (0.55 + 0.45 * fog) * mask * tw);
//           ctx.lineWidth = Math.max(0.65, 0.9 * scale);
//           ctx.beginPath();
//           ctx.arc(proj[0], proj[1], haloR, 0, Math.PI * 2);
//           ctx.stroke();
//         }

//         // b. Vòng tròn ngắm mục tiêu lơ lửng (Floating Hollow Target Reticle Ring)
//         if (p.ring > 0) {
//           const ringR = p.ring * scale * (0.97 + 0.03 * Math.sin(time * 2.0));
//           // Vầng sáng mềm cyan bao quanh vòng tròn
//           glow(proj[0], proj[1], ringR * 1.3, C[0], 0.35 * (0.6 + 0.4 * fog) * mask);

//           // Vòng tròn nét rỗng chính xác như trong ảnh tham chiếu (ảnh 2 & ảnh 3)
//           ctx.strokeStyle = rgba(C[0], 0.88 * (0.6 + 0.4 * fog) * mask);
//           ctx.lineWidth = Math.max(1.1, 1.45 * scale);
//           ctx.beginPath();
//           ctx.arc(proj[0], proj[1], ringR, 0, Math.PI * 2);
//           ctx.stroke();

//           // Vòng viền mờ đồng tâm mảnh bên trong tạo hiệu ứng quang học tinh vi
//           ctx.strokeStyle = rgba(C[0], 0.28 * (0.5 + 0.5 * fog) * mask);
//           ctx.lineWidth = Math.max(0.6, 0.75 * scale);
//           ctx.beginPath();
//           ctx.arc(proj[0], proj[1], ringR * 0.84, 0, Math.PI * 2);
//           ctx.stroke();
//         }

//         // Nếu là nút đóng vai trò tâm vòng ngắm rỗng, không vẽ nhân đặc hay chấm specular ở giữa
//         if (p.isRingCenter) continue;

//         // c. Quầng sáng tỏa mềm (Soft Radial Glow)
//         const glowR = (p.r || 2.6) * scale * 3.6;
//         const g = ctx.createRadialGradient(proj[0], proj[1], 0, proj[0], proj[1], glowR);
//         g.addColorStop(0, rgba(p.c, 0.42 * (0.4 + 0.6 * fog) * mask * tw));
//         g.addColorStop(1, rgba(p.c, 0));
//         ctx.fillStyle = g;
//         ctx.beginPath();
//         ctx.arc(proj[0], proj[1], glowR, 0, Math.PI * 2);
//         ctx.fill();

//         // d. Điểm nhân nút tròn đặc (Solid Core Dot)
//         if (p.r > 0) {
//           const dotR = Math.max(1.6, (p.r || 2.6) * scale);
//           ctx.fillStyle = rgba(p.c, (0.86 + 0.14 * fog) * mask * tw);
//           ctx.beginPath();
//           ctx.arc(proj[0], proj[1], dotR, 0, Math.PI * 2);
//           ctx.fill();

//           // e. Điểm sáng gương trắng tinh xảo ở tâm nút (Specular Center Pinpoint)
//           if (!p.isAmbient) {
//             ctx.fillStyle = `rgba(255,255,255,${(0.95 * mask).toFixed(2)})`;
//             ctx.beginPath();
//             ctx.arc(proj[0], proj[1], Math.max(0.75, 1.15 * scale), 0, Math.PI * 2);
//             ctx.fill();
//           }
//         }
//       }

//       // 5. Vẽ các gói xung tín hiệu nơ-ron (Action Potential Pulses) chuyển động dọc các cạnh
//       for (const q of cPulses) {
//         const px = lerp(q.a.x, q.b.x, q.t);
//         const py = lerp(q.a.y, q.b.y, q.t);
//         const pz = lerp(q.a.z, q.b.z, q.t);
//         const p = project(px, py, pz);
//         if (!p) continue;

//         const fade = Math.sin(q.t * Math.PI);
//         const mask = cmask(p[0]);
//         const scale = p[2];
//         glow(p[0], p[1], 9 * scale + 2, q.col || C[1], 0.75 * fade * mask);
//         ctx.fillStyle = `rgba(255,255,255,${(0.96 * fade * mask).toFixed(3)})`;
//         ctx.beginPath();
//         ctx.arc(p[0], p[1], Math.max(1.1, 2.2 * scale), 0, Math.PI * 2);
//         ctx.fill();
//       }
//     };

//     let curSize = 0;
//     const setFont = (px) => {
//       if (px === curSize) return;
//       curSize = px;
//       ctx.font = `600 ${px}px ${FONT}`;
//     };

//     // Điểm tại tỉ lệ u (0..1) trên đường gấp khúc
//     const along = (pts, u) => {
//       const segs = [];
//       let total = 0;
//       for (let i = 0; i < pts.length - 1; i++) {
//         const d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
//         segs.push(d);
//         total += d;
//       }
//       let d = (((u % 1) + 1) % 1) * total;
//       for (let i = 0; i < segs.length; i++) {
//         if (d <= segs[i]) {
//           const k = segs[i] > 0 ? d / segs[i] : 0;
//           return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)];
//         }
//         d -= segs[i];
//       }
//       return pts[pts.length - 1];
//     };

//     const glow = (x, y, r, col, a) => {
//       const g = ctx.createRadialGradient(x, y, 0, x, y, r);
//       g.addColorStop(0, rgba(col, a));
//       g.addColorStop(1, rgba(col, 0));
//       ctx.fillStyle = g;
//       ctx.beginPath();
//       ctx.arc(x, y, r, 0, Math.PI * 2);
//       ctx.fill();
//     };

//     /* ---------- Layout: đo cột nội dung, hai lề, vị trí module ---------- */
//     const buildLane = (docH) => {
//       builtH = docH;
//       builtW = W;
//       const sy = window.scrollY || 0;
//       mods = BIND.map((b, i) => {
//         const el = document.querySelector(b.sel);
//         const r = el ? el.getBoundingClientRect() : null;
//         return { ...b, idx: i, g: b.build(), pageY: r ? r.top + sy + r.height * 0.42 : 200 + i * 440, active: false };
//       });
//     };

//     const refreshLayout = () => {
//       lastLayout = performance.now();
//       const container = document.querySelector('main .container');
//       if (container) {
//         const r = container.getBoundingClientRect();
//         const cs = getComputedStyle(container);
//         CL = r.left + (parseFloat(cs.paddingLeft) || 0);
//         CR = r.right - (parseFloat(cs.paddingRight) || 0);
//       } else {
//         CL = W / 2 - 560;
//         CR = W / 2 + 560;
//       }
//       CL = Math.max(0, CL);
//       CR = Math.min(W, CR);

//       sideL = { on: CL >= 56, bx: CL * 0.8, ix: CL * 0.4, g: CL };
//       const rLimit = W >= 1560 ? W - 250 : W; // chừa chỗ cho thanh TOC
//       const gR = rLimit - CR;
//       sideR = { on: gR >= 56, bx: CR + gR * 0.2, ix: CR + gR * 0.6, g: gR };

//       if (!cardEls) {
//         cardEls = [...document.querySelectorAll('.term, .eng-card, .chat, .do, .pcard, .skill, .tl-card, .education-shell, .contact-card')];
//       }
//       const sy = window.scrollY || 0;
//       cards = [];
//       minL = Infinity;
//       maxR = -Infinity;
//       for (const el of cardEls) {
//         const r = el.getBoundingClientRect();
//         if (r.width < 30 || r.height < 30) continue;
//         cards.push({
//           el, t: r.top, b: r.bottom, l: r.left, r: r.right, pageY: r.top + sy,
//           hidden: el.classList.contains('reveal') && !el.classList.contains('in')
//         });
//         minL = Math.min(minL, r.left);
//         maxR = Math.max(maxR, r.right);
//       }

//       const docH = document.documentElement.scrollHeight;
//       if (Math.abs(docH - builtH) > 40 || Math.abs(W - builtW) > 40) buildLane(docH);
//     };


//     /* ---------- Hai đường bus xuyên suốt ---------- */
//     const drawRails = (sy) => {
//       for (const [s, right] of [[sideL, false], [sideR, true]]) {
//         if (!s.on) continue;
//         ctx.strokeStyle = rgba(C[0], 0.15 + dmaPulse * 0.25);
//         ctx.lineWidth = 1.1;
//         ctx.beginPath();
//         ctx.moveTo(s.bx - 3, 0); ctx.lineTo(s.bx - 3, H);
//         ctx.moveTo(s.bx + 3, 0); ctx.lineTo(s.bx + 3, H);
//         ctx.stroke();

//         if (!motionQuery.matches) {
//           for (let k = 0; k < 3; k++) {
//             const py = ((time * 150 + k * (H / 2.6) + (right ? 170 : 0)) % (H + 60)) - 30;
//             const g = ctx.createLinearGradient(s.bx, py - 36, s.bx, py);
//             g.addColorStop(0, rgba(C[0], 0));
//             g.addColorStop(1, rgba(right ? C[0] : C[1], 0.6 + dmaPulse * 0.3));
//             ctx.strokeStyle = g;
//             ctx.lineWidth = 2.2;
//             ctx.beginPath();
//             ctx.moveTo(s.bx, py - 36); ctx.lineTo(s.bx, py);
//             ctx.stroke();
//             ctx.fillStyle = rgba(C[2], 0.85);
//             ctx.beginPath();
//             ctx.arc(s.bx, py, 2.2, 0, Math.PI * 2);
//             ctx.fill();
//           }
//         }


//       }
//     };

//     /* ---------- Chuỗi liên kết giữa các module cùng bên ---------- */
//     const drawChain = (sy) => {
//       for (const sideIdx of [0, 1]) {
//         const s = sideIdx ? sideR : sideL;
//         if (!s.on) continue;
//         const list = mods.filter((m) => m.side === sideIdx).sort((a, b) => a.pageY - b.pageY);
//         const off = sideIdx ? -14 : 14;
//         const col = sideIdx ? C[0] : C[1];

//         for (let i = 0; i < list.length - 1; i++) {
//           const y1 = list[i].pageY - sy, y2 = list[i + 1].pageY - sy;
//           if (y2 < -40 || y1 > H + 40) continue;
//           const mid = (y1 + y2) / 2;
//           const focus = 1 - clamp(Math.abs(mid - H * 0.5) / (H * 0.7), 0, 1);
//           const near = list[i].active || list[i + 1].active;
//           const a = 0.1 + 0.4 * focus + (near ? 0.2 : 0) + dmaPulse * 0.15;

//           const pts = [[s.bx, y1 + 6], [s.bx + off, y1 + 20], [s.bx + off, y2 - 20], [s.bx, y2 - 6]];
//           ctx.strokeStyle = rgba(col, a);
//           ctx.lineWidth = 1.1 + focus * 0.7;
//           ctx.beginPath();
//           ctx.moveTo(pts[0][0], pts[0][1]);
//           for (let p = 1; p < pts.length; p++) ctx.lineTo(pts[p][0], pts[p][1]);
//           ctx.stroke();

//           if (motionQuery.matches) continue;
//           const [px, py] = along(pts, sysClock * 0.28 + i * 0.21);
//           glow(px, py, 9, C[2], 0.85 * (0.4 + focus));
//         }
//       }
//     };

//     /* ---------- Vẽ một vật thể 3D ---------- */
//     const drawModule = (m, sy) => {
//       const s = m.side ? sideR : sideL;
//       if (!s.on) return;
//       const y0 = m.pageY - sy;
//       const size = clamp(s.g * 0.28, 16, 44);
//       if (y0 < -size * 3 || y0 > H + size * 3) return;

//       const focus = 1 - clamp(Math.abs(y0 - H * 0.5) / (H * 0.6), 0, 1);
//       const act = m.active || triggeredType === m.type;
//       const a = clamp(0.22 + 0.5 * focus + (act ? 0.2 : 0), 0, 0.8); // trần độ sáng: không lấn nội dung
//       const col = act ? C[1] : C[0];

//       // Xoay 3D: tự quay + theo cuộn trang + theo chuột
//       const ry = time * 0.35 * (m.side ? -1 : 1) + sy * 0.0016 + cam.mx * 0.5 + m.idx;
//       const rx = -0.35 + cam.my * 0.3 + Math.sin(time * 0.4 + m.idx) * 0.1;
//       const ca = Math.cos(ry), sa = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);

//       const P = m.g.n.map(([lx, ly, lz]) => {
//         const x = lx * ca + lz * sa;
//         let z = -lx * sa + lz * ca;
//         const y = ly * cx - z * sx;
//         z = ly * sx + z * cx;
//         const k = 3.6 / (3.6 + z);
//         return [s.ix + x * size * k, y0 + y * size * k, k, clamp(0.65 - z * 0.35, 0.3, 1)];
//       });

//       // Nhánh nối module → bus
//       const toward = m.side ? -1 : 1;
//       ctx.strokeStyle = rgba(C[0], a * 0.5);
//       ctx.lineWidth = 1;
//       ctx.beginPath();
//       ctx.moveTo(s.ix + toward * size * 1.15, y0);
//       ctx.lineTo(s.bx, y0);
//       ctx.stroke();
//       ctx.fillStyle = rgba(C[1], a * 0.9);
//       ctx.beginPath();
//       ctx.arc(s.bx, y0, 2.3, 0, Math.PI * 2);
//       ctx.fill();

//       glow(s.ix, y0, size * 1.7, col, 0.07 * (0.4 + focus));

//       // Tín hiệu lan theo cạnh: node "nóng" chuyển dần, cùng nhịp sysClock
//       const N = P.length;
//       const hot = Math.floor(sysClock * (act ? 2.6 : 1.3)) % N;
//       const prev = (hot + N - 1) % N;

//       ctx.lineWidth = 1;
//       ctx.strokeStyle = rgba(col, a * 0.5);
//       ctx.beginPath();
//       const hotEdges = [];
//       for (const [i, j] of m.g.e) {
//         if (i === hot || j === hot || i === prev || j === prev) { hotEdges.push([i, j]); continue; }
//         ctx.moveTo(P[i][0], P[i][1]);
//         ctx.lineTo(P[j][0], P[j][1]);
//       }
//       ctx.stroke();

//       ctx.lineWidth = 1.7;
//       ctx.strokeStyle = rgba(C[1], a * 1.25);
//       ctx.beginPath();
//       for (const [i, j] of hotEdges) {
//         if (P[i] && P[j]) {
//           ctx.moveTo(P[i][0], P[i][1]);
//           ctx.lineTo(P[j][0], P[j][1]);
//         }
//       }
//       ctx.stroke();

//       for (let i = 0; i < N; i++) {
//         if (!P[i]) continue;
//         const isHot = i === hot;
//         ctx.fillStyle = rgba(isHot ? C[2] : col, a * (isHot ? 1.5 : P[i][3]));
//         ctx.beginPath();
//         ctx.arc(P[i][0], P[i][1], Math.max(1, (isHot ? 3.4 : 2) * P[i][2]), 0, Math.PI * 2);
//         ctx.fill();
//       }
//       if (P[hot]) glow(P[hot][0], P[hot][1], 8, C[1], 0.5 * a);

//       // Nhãn + trạng thái thực (đồng bộ với node đang nóng)
//       if (size >= 18) {
//         const maxTextW = Math.max(36, s.g - 8);
//         const fontSize = clamp(Math.floor(s.g * 0.12), 8.5, 10);
//         ctx.save();
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         setFont(fontSize);
//         ctx.fillStyle = rgba(C[0], a * 0.95);
//         ctx.shadowColor = 'rgba(6, 20, 24, 0.9)';
//         ctx.shadowBlur = 4;
//         ctx.fillText(m.tag, s.ix, y0 + size * 1.55, maxTextW);
//         if (act || focus > 0.5) {
//           setFont(Math.max(8, fontSize - 1));
//           ctx.fillStyle = rgba(C[1], a);
//           ctx.fillText(`\u203A ${m.ops[hot % m.ops.length]}`, s.ix, y0 + size * 1.55 + 13, maxTextW);
//         }
//         ctx.restore();
//       }
//     };

//     /* ---------- Thẻ nội dung ↔ bus: làm nổi bật nội dung chính ---------- */
//     const drawCoupling = () => {
//       for (const c of cards) {
//         if (c.hidden || c.b < -40 || c.t > H + 40) continue;
//         const cy = (c.t + c.b) / 2;
//         const hov = c.el === hoveredCardEl;
//         const focus = 1 - clamp(Math.abs(cy - H * 0.5) / (H * 0.55), 0, 1);
//         if (focus < 0.12 && !hov) continue;
//         const al = hov ? 1 : 0.18 + 0.5 * focus;
//         const col = hov ? C[1] : C[0];

//         for (const dir of [-1, 1]) {
//           const edge = dir < 0 ? c.l : c.r;
//           if (dir < 0 ? edge > minL + 16 : edge < maxR - 16) continue;
//           const s = dir < 0 ? sideL : sideR;
//           if (!s.on) continue;
//           const dx = Math.abs(edge - s.bx);
//           if (dx < 14) continue;
//           const sg = edge > s.bx ? 1 : -1;
//           const pts = [[s.bx, cy - 14], [s.bx + sg * dx * 0.4, cy - 14], [s.bx + sg * dx * 0.66, cy], [edge, cy]];

//           ctx.strokeStyle = rgba(col, al);
//           ctx.lineWidth = hov ? 2 : 1.1;
//           ctx.beginPath();
//           ctx.moveTo(pts[0][0], pts[0][1]);
//           for (let p = 1; p < pts.length; p++) ctx.lineTo(pts[p][0], pts[p][1]);
//           ctx.stroke();

//           ctx.fillStyle = rgba(col, al);
//           ctx.beginPath();
//           ctx.arc(edge, cy, hov ? 4 : 2.4, 0, Math.PI * 2);
//           ctx.fill();

//           if (!motionQuery.matches && (hov || focus > 0.35)) {
//             const [px, py] = along(pts, time * (hov ? 1.8 : 0.65) + c.pageY * 0.002);
//             ctx.fillStyle = rgba(C[2], 0.95);
//             ctx.beginPath();
//             ctx.arc(px, py, hov ? 3 : 2, 0, Math.PI * 2);
//             ctx.fill();
//             if (hov) glow(edge, cy, 22, C[1], 0.55);
//           }
//         }
//       }
//     };

//     /* ---------- Render ---------- */
//     const render = () => {
//       if (performance.now() - lastLayout > 120) refreshLayout();
//       ctx.clearRect(0, 0, W, H);
//       ctx.globalAlpha = 1;
//       const sy = window.scrollY || 0;

//       // Module gần tâm màn hình nhất ở mỗi bên = ACTIVE
//       for (const side of [0, 1]) {
//         let best = null, bd = H * 0.45;
//         for (const m of mods) {
//           if (m.side !== side) continue;
//           const d = Math.abs(m.pageY - sy - H * 0.5);
//           m.active = false;
//           if (d < bd) { bd = d; best = m; }
//         }
//         if (best) best.active = true;
//       }

//       draw3DGrid();
//       draw3DCloud();
//       drawRails(sy);
//       drawChain(sy);
//       drawCoupling();
//       for (const m of mods) drawModule(m, sy);
//     };

//     /* ---------- Update ---------- */
//     const update = (dt) => {
//       cam.mx = lerp(cam.mx, cam.tmx, 0.06);
//       cam.my = lerp(cam.my, cam.tmy, 0.06);
//       sysClock += dt;
//       update3DCloud(dt);
//       dmaPulse = dmaPulse > 0.01 ? lerp(dmaPulse, 0, 0.08) : 0;
//       if (triggeredTimer > 0) {
//         triggeredTimer -= dt * 1000;
//         if (triggeredTimer <= 0) triggeredType = null;
//       }

//       cam.yaw = Math.sin(time * 0.08) * 0.16 + cam.mx * 0.28;
//       cam.pitch = -0.12 + cam.my * 0.14 + Math.sin(time * 0.06) * 0.03;
//       cyaw = Math.cos(cam.yaw); syaw = Math.sin(cam.yaw);
//       cpit = Math.cos(cam.pitch); spit = Math.sin(cam.pitch);
//       CX = W / 2 + cam.mx * -16;
//       CY = H * 0.5 + cam.my * -10;
//     };

//     /* ---------- Resize / input / loop ---------- */
//     let staticQueued = false;
//     const scheduleStatic = () => {
//       if (!motionQuery.matches || staticQueued) return;
//       staticQueued = true;
//       requestAnimationFrame(() => {
//         staticQueued = false;
//         lastLayout = -1e9;
//         render();
//       });
//     };

//     let resizeTimer = null;
//     const resize = () => {
//       const dpr = Math.min(window.devicePixelRatio || 1, isFinePointer ? 2 : 1.5);
//       W = window.innerWidth;
//       H = window.innerHeight;
//       canvas.width = Math.round(W * dpr);
//       canvas.height = Math.round(H * dpr);
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//       curSize = 0;
//       CX = W / 2;
//       CY = H * 0.5;
//       F = Math.max(W, H * 1.1) * 0.65;
//       D = 1220;
//       lastLayout = -1e9;
//       init3DCloud();
//       scheduleStatic();
//     };
//     window.addEventListener('resize', () => {
//       clearTimeout(resizeTimer);
//       resizeTimer = setTimeout(resize, 120);
//     });
//     window.addEventListener('pointermove', (e) => {
//       cam.tmx = (e.clientX / W) * 2 - 1;
//       cam.tmy = (e.clientY / H) * 2 - 1;
//       if (e.pointerType !== 'touch') { mouseP.x = e.clientX; mouseP.y = e.clientY; mouseP.on = true; }
//     }, { passive: true });
//     document.addEventListener('mouseleave', () => { cam.tmx = 0; cam.tmy = 0; mouseP.on = false; });
//     window.addEventListener('scroll', scheduleStatic, { passive: true });
//     if (document.fonts) document.fonts.ready.then(() => { lastLayout = -1e9; builtH = -1; scheduleStatic(); });
//     window.addEventListener('load', () => { lastLayout = -1e9; builtH = -1; scheduleStatic(); });

//     const frame = (now) => {
//       rafId = null;
//       if (document.hidden || motionQuery.matches) return;
//       rafId = requestAnimationFrame(frame);
//       if (now - last < MIN_FRAME) return;
//       const dt = Math.min((now - last) / 1000, 0.1);
//       last = now;
//       time = now / 1000;
//       update(dt);
//       render();
//     };

//     const sync = () => {
//       if (document.hidden || motionQuery.matches) {
//         if (rafId !== null) cancelAnimationFrame(rafId);
//         rafId = null;
//         if (motionQuery.matches) { time = 0; update(0); lastLayout = -1e9; render(); }
//         else ctx.clearRect(0, 0, W, H);
//       } else if (rafId === null) {
//         last = performance.now();
//         rafId = requestAnimationFrame(frame);
//       }
//     };

//     resize();
//     sync();
//     document.addEventListener('visibilitychange', sync);
//     motionQuery.addEventListener('change', sync);
//   };

//   /* =================================================================
//      PUBLIC API (không đổi)
//      ================================================================= */
//   return {
//     initNeuralNetwork,
//     setHoveredCard(cardEl, isHovered) { hoveredCardEl = isHovered ? cardEl : null; },
//     setHoverCoords() {},
//     setActiveSection() {},
//     pulseDMA(intensity = 1.0) { dmaPulse = Math.max(dmaPulse, intensity); },
//     triggerModule(modType) {
//       triggeredType = modType;
//       triggeredTimer = 2400;
//       dmaPulse = 1.6;
//     }
//   };
// })();

/**
 * =====================================================================
 * UNIFIED 3D COMPUTER-SCIENCE BACKGROUND — "One System, One Signal"
 * Portfolio of Nguyen Van Sang — Embedded Software Engineer
 *
 * Ý tưởng liên kết: toàn trang là MỘT hệ thống máy tính đang chạy.
 *   - Hai lề trái/phải là hai đường bus (ADDR / DATA) chạy suốt trang.
 *   - Mỗi section gắn với 1-2 vật thể 3D wireframe (đều là "đồ thị":
 *     node + cạnh) thuộc đúng lĩnh vực của section đó:
 *       Hero      : CPU die (pipeline) + Register file
 *       About     : Dual-core SoC + Clock/PLL
 *       Project 1 : FreeRTOS scheduler + TinyML network
 *       Project 2 : Verilog FSM + RTL logic cell
 *       Project 3 : IoT mesh + DB buffer pages (RLS)
 *       Skills    : Memory hierarchy + SPI/I2C waveform
 *       Experience: ADC sampler + UART DMA ring
 *       Education : AVL tree + Dijkstra graph
 *       Contact   : NVIC vectors + Serial transceiver
 *   - Các vật thể cùng một loại ngôn ngữ (node sáng lần lượt truyền
 *     tín hiệu theo cạnh) và cùng một nhịp đồng hồ hệ thống (sysClock).
 *   - Các vật thể cùng bên được NỐI TIẾP nhau bằng nhánh mạch, một gói
 *     tin chạy từ module này sang module kế tiếp -> dữ liệu "đi theo"
 *     người đọc khi cuộn. Vật thể gần tâm màn hình là module ACTIVE:
 *     sáng nhất, truyền tín hiệu nhanh nhất, hiển thị trạng thái thực.
 *   - Cuộn trang làm các vật thể xoay 3D; chuột nghiêng camera.
 *   - Mọi thứ nằm ở hai lề trống, độ sáng bị chặn trần để KHÔNG lấn
 *     nội dung; chỉ có các đường mạch mảnh nối bus vào mép thẻ khi thẻ
 *     được rê chuột / ở giữa màn hình để làm nổi bật nội dung chính.
 *
 * NỀN: lớp mạng nơ-ron 2D y nguyên mã tham chiếu nằm dưới cùng (kết hợp
 * với #aurora / #grid / #spot trong background.css); hệ 3D CS nằm ở hai lề.
 *
 * API công khai giữ nguyên: initNeuralNetwork, setHoveredCard,
 * setHoverCoords, setActiveSection, pulseDMA, triggerModule.
 * =====================================================================
 */

window.ScopeEngine = (() => {
  'use strict';

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  let initialized = false;
  let hoveredCardEl = null;
  let dmaPulse = 0;
  let triggeredType = null;
  let triggeredTimer = 0;

  // [0] mint = logic 1 / dữ liệu   [1] amber = clock / active / chip-select   [2] ice = gói tin
  const C = [[95, 227, 200], [255, 181, 71], [191, 242, 230]];
  const FONT = '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace';
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${clamp(a, 0, 1).toFixed(3)})`;

  /* =================================================================
     BỘ DỰNG ĐỒ THỊ 3D — mọi vật thể là {n: nodes[[x,y,z]], e: edges[[i,j]]}
     ================================================================= */
  const cube = (s = 0.62) => {
    const n = [];
    for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) n.push([x * s, y * s, z * s]);
    n.push([0, 0, 0]);
    const e = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
    for (let i = 0; i < 8; i += 2) e.push([i, 8]);
    return { n, e };
  };

  const stack = (k = 3) => {
    const n = [], e = [];
    for (let l = 0; l < k; l++) {
      const y = (l - (k - 1) / 2) * 0.55, b = n.length;
      n.push([-0.7, y, -0.5], [0.7, y, -0.5], [0.7, y, 0.5], [-0.7, y, 0.5]);
      e.push([b, b + 1], [b + 1, b + 2], [b + 2, b + 3], [b + 3, b]);
      if (l) for (let i = 0; i < 4; i++) e.push([b - 4 + i, b + i]);
    }
    return { n, e };
  };

  const ring = (m = 6) => {
    const n = [], e = [];
    for (let i = 0; i < m; i++) {
      const a = (i / m) * Math.PI * 2;
      n.push([Math.cos(a) * 0.8, Math.sin(a) * 0.8, i % 2 ? 0.35 : -0.35]);
    }
    n.push([0, 0, 0]);
    for (let i = 0; i < m; i++) e.push([i, (i + 1) % m]);
    e.push([0, m], [Math.floor(m / 2), m]);
    return { n, e };
  };

  const tree = () => ({
    n: [[0, -0.8, 0], [-0.55, -0.1, 0.2], [0.55, -0.1, 0.2], [-0.8, 0.6, 0.45], [-0.3, 0.6, 0.45], [0.3, 0.6, 0.45], [0.8, 0.6, 0.45]],
    e: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]]
  });

  const net = (L = [3, 4, 2]) => {
    const n = [], e = [], idx = [];
    L.forEach((c, li) => {
      const row = [];
      for (let i = 0; i < c; i++) {
        row.push(n.length);
        n.push([(li - (L.length - 1) / 2) * 0.85, (i - (c - 1) / 2) * 0.55, i % 2 ? 0.25 : -0.25]);
      }
      idx.push(row);
    });
    for (let l = 0; l < idx.length - 1; l++) for (const a of idx[l]) for (const b of idx[l + 1]) e.push([a, b]);
    return { n, e };
  };

  const wave = () => {
    const n = [], e = [];
    for (let i = 0; i < 14; i++) n.push([-0.9 + i * (1.8 / 13), Math.floor(i / 2) % 2 ? -0.35 : -0.05, -0.3]);
    for (let i = 0; i < 13; i++) e.push([i, i + 1]);
    const b = n.length;
    for (let i = 0; i < 10; i++) n.push([-0.9 + i * (1.8 / 9), Math.floor(i / 3) % 2 ? 0.7 : 0.4, 0.35]);
    for (let i = 0; i < 9; i++) e.push([b + i, b + i + 1]);
    return { n, e };
  };

  const mesh = () => ({
    n: [[0, -0.7, 0], [-0.7, 0.4, 0.3], [0.7, 0.4, 0.3], [0, 0.1, -0.5]],
    e: [[0, 1], [0, 2], [1, 2], [3, 0], [3, 1], [3, 2]]
  });

  const pyramid = () => {
    const n = [[0, -0.8, 0]];
    for (const y of [-0.1, 0.6]) {
      const s = 0.35 + (y + 0.8) * 0.5;
      n.push([-s, y, -s], [s, y, -s], [s, y, s], [-s, y, s]);
    }
    const e = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 3], [3, 4], [4, 1], [1, 5], [2, 6], [3, 7], [4, 8], [5, 6], [6, 7], [7, 8], [8, 5]];
    return { n, e };
  };

  /* =================================================================
     LIÊN KẾT PHÂN HỆ ↔ SECTION (ops = trạng thái hiển thị theo nhịp)
     ================================================================= */
  const BIND = [
    { sel: '#hero', side: 0, tag: 'CPU Pipeline LX7', type: 'cpu', build: cube, ops: ['IF', 'ID', 'EX', 'MEM', 'WB'] },
    { sel: '#hero', side: 1, tag: 'Register File', type: 'regs', build: () => stack(3), ops: ['R0', 'R1', 'R2', 'R3', 'PC', 'SP'] },
    { sel: '#about', side: 0, tag: 'Dual-Core SoC', type: 'soc', build: mesh, ops: ['Core0', 'Core1', 'AXI', 'Core0'] },
    { sel: '#about', side: 1, tag: 'Clock / PLL', type: 'clk', build: wave, ops: ['XTAL 40MHz', 'PLL x6', 'SYS 240MHz'] },
    { sel: '#projectGrid article:nth-child(1)', side: 0, tag: 'FreeRTOS Scheduler', type: 'rtos', build: () => ring(7), ops: ['READY', 'RUNNING', 'BLOCKED', 'Mutex take', 'Mutex give'] },
    { sel: '#projectGrid article:nth-child(1)', side: 1, tag: 'TinyML Inference', type: 'tinyml', build: () => net([3, 4, 3]), ops: ['input', 'dense', 'softmax', '<1 ms'] },
    { sel: '#projectGrid article:nth-child(2)', side: 0, tag: 'Verilog FSM', type: 'fpga', build: () => ring(5), ops: ['S_IDLE', 'S_COIN', 'S_SELECT', 'S_DISPENSE', 'S_CHANGE'] },
    { sel: '#projectGrid article:nth-child(2)', side: 1, tag: 'RTL Logic Cell', type: 'rtl', build: cube, ops: ['D', 'CLK ↑', 'Q'] },
    { sel: '#projectGrid article:nth-child(3)', side: 0, tag: 'IoT Mesh', type: 'mesh', build: mesh, ops: ['node', 'gateway', 'cloud API'] },
    { sel: '#projectGrid article:nth-child(3)', side: 1, tag: 'Postgres RLS Pages', type: 'db', build: () => stack(3), ops: ['page #0', 'page #1', 'page #2'] },
    { sel: '#skills', side: 0, tag: 'Memory Hierarchy', type: 'mem', build: pyramid, ops: ['Regs', 'L1', 'SRAM', 'Flash'] },
    { sel: '#skills', side: 1, tag: 'SPI / I2C Bus', type: 'osc', build: wave, ops: ['SCK', 'MOSI', '/CS'] },
    { sel: '#experience', side: 0, tag: 'Sensor ADC', type: 'adc', build: cube, ops: ['sample', 'hold', 'convert'] },
    { sel: '#experience', side: 1, tag: 'UART DMA Ring', type: 'dma', build: () => ring(8), ops: ['wr', 'rd', 'wr', 'rd'] },
    { sel: '#education', side: 0, tag: 'AVL Tree', type: 'tree', build: tree, ops: ['insert', 'rotate', 'balance'] },
    { sel: '#education', side: 1, tag: 'Dijkstra Graph', type: 'dijkstra', build: pyramid, ops: ['relax', 'relax', 'path'] },
    { sel: '#contact', side: 0, tag: 'NVIC Vectors', type: 'nvic', build: () => stack(4), ops: ['Reset', 'SysTick', 'UART0', 'GPIO'] },
    { sel: '#contact', side: 1, tag: 'Serial Transceiver', type: 'serial', build: wave, ops: ['TX', 'RX', '115200 8N1'] }
  ];

  const STREAM_WORDS = [
    '0x4889E5', '0x0F05', 'xTaskCreate()', 'xQueueSend()', 'vTaskDelay()', 'xSemaphoreTake()',
    'LDR R1,[R0]', 'ADD R2,R1,#4', 'STR R2,[R0]', 'always @(posedge clk)', 'assign y = a & b;',
    'MQTT /esp32/s', 'DMA_OK', 'NVIC_EnableIRQ()', 'tflite::Invoke()'
  ];

  /* =================================================================
     ENGINE
     ================================================================= */
  const initNeuralNetwork = () => {
    const canvas = document.getElementById('net');
    if (!canvas || initialized) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    initialized = true;

    let W = 0, H = 0, CL = 0, CR = 0;
    let sideL = { on: false, bx: 0, ix: 0, g: 0 };
    let sideR = { on: false, bx: 0, ix: 0, g: 0 };
    let time = 0, sysClock = 0, last = 0, rafId = null;
    let lastLayout = -1e9, builtH = -1, builtW = -1;
    let mods = [], cards = [], cardEls = null, minL = 0, maxR = 0, streams = [];
    const cam = { mx: 0, my: 0, tmx: 0, tmy: 0 };
    const MIN_FRAME = isFinePointer ? 16 : 32;

    /* =================================================================
       NỀN MẠNG NƠ-RON — y nguyên khung nền của mã tham chiếu
       Node trôi, nối nhau khi đủ gần, xung tín hiệu chạy dọc cạnh,
       chuột hút node. Vẽ TRƯỚC (nằm dưới) hệ 3D CS ở hai lề.
       ================================================================= */
    const mouseP = { x: -9999, y: -9999, on: false };
    let cloud = [], cEdges = [], cPulses = [];
    const LINK = 150, MLINK = 230;
    const NC = { cyan: C[0], violet: C[1], pink: C[2] }; // mint · amber · pale mint

    const mkNode = () => {
      const r = Math.random();
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: 1.2 + Math.random() * 1.8,
        c: r < 0.62 ? NC.cyan : r < 0.85 ? NC.violet : NC.pink,
        ph: Math.random() * Math.PI * 2
      };
    };

    const initCloud = () => {
      const target = clamp(Math.round((W * H) / (isFinePointer ? 13000 : 26000)), 28, 120);
      while (cloud.length < target) cloud.push(mkNode());
      cloud.length = target;
      cPulses = [];
    };

    const updateCloud = (dt) => {
      if (dt <= 0 || !cloud.length) return;
      const k = dt * 60; // chuẩn hóa theo 60fps như mã tham chiếu
      const damp = Math.pow(0.995, k);
      for (const p of cloud) {
        if (mouseP.on) {
          const dx = mouseP.x - p.x, dy = mouseP.y - p.y, d = Math.hypot(dx, dy);
          if (d < MLINK && d > 2) {
            const f = (1 - d / MLINK) * 0.022 * k;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.vx *= damp; p.vy *= damp;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 1.1) { p.vx *= 1.1 / sp; p.vy *= 1.1 / sp; }
        if (sp < 0.08) { p.vx += (Math.random() - 0.5) * 0.05; p.vy += (Math.random() - 0.5) * 0.05; }
        p.x += p.vx * k; p.y += p.vy * k;
        if (p.x < -30) p.x = W + 30; else if (p.x > W + 30) p.x = -30;
        if (p.y < -30) p.y = H + 30; else if (p.y > H + 30) p.y = -30;
      }

      // Xung tín hiệu (neuron bắn); gõ terminal / chat sẽ bắn dày hơn
      const rate = (mouseP.on ? 0.14 : 0.07) + dmaPulse * 0.2;
      if (cEdges.length && Math.random() < rate * k && cPulses.length < 14 + Math.round(dmaPulse * 6)) {
        const [a, b] = cEdges[Math.floor(Math.random() * cEdges.length)];
        cPulses.push({ a, b, t: 0, s: 0.012 + Math.random() * 0.02 });
      }
      for (let i = cPulses.length - 1; i >= 0; i--) {
        cPulses[i].t += cPulses[i].s * k;
        if (cPulses[i].t >= 1) cPulses.splice(i, 1);
      }
    };

    const drawCloud = () => {
      if (!cloud.length) return;
      cEdges.length = 0;
      ctx.lineWidth = 1;
      for (let i = 0; i < cloud.length; i++) {
        const a = cloud[i];
        for (let j = i + 1; j < cloud.length; j++) {
          const b = cloud[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          const al = (1 - d / LINK) * 0.32;
          ctx.strokeStyle = rgba(a.c === b.c ? a.c : NC.pink, al * 0.8);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          if (cEdges.length < 400) cEdges.push([a, b]);
        }
        if (mouseP.on) {
          const d = Math.hypot(a.x - mouseP.x, a.y - mouseP.y);
          if (d < MLINK) {
            ctx.strokeStyle = rgba(NC.cyan, (1 - d / MLINK) * 0.55);
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouseP.x, mouseP.y); ctx.stroke();
          }
        }
      }
      for (const p of cloud) {
        const tw = 0.55 + 0.45 * Math.sin((time * 1000) / 700 + p.ph);
        ctx.fillStyle = rgba(p.c, 0.25 * tw);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = rgba(p.c, 0.95 * tw);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      for (const q of cPulses) {
        const x = lerp(q.a.x, q.b.x, q.t), y = lerp(q.a.y, q.b.y, q.t), fade = Math.sin(q.t * Math.PI);
        ctx.fillStyle = rgba(NC.violet, 0.4 * fade);
        ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${(0.95 * fade).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
      }
      if (mouseP.on) {
        ctx.fillStyle = rgba(NC.cyan, 0.9);
        ctx.beginPath(); ctx.arc(mouseP.x, mouseP.y, 2.5, 0, Math.PI * 2); ctx.fill();
      }
    };

    let curSize = 0;
    const setFont = (px) => {
      if (px === curSize) return;
      curSize = px;
      ctx.font = `600 ${px}px ${FONT}`;
    };

    // Điểm tại tỉ lệ u (0..1) trên đường gấp khúc
    const along = (pts, u) => {
      const segs = [];
      let total = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
        segs.push(d);
        total += d;
      }
      let d = (((u % 1) + 1) % 1) * total;
      for (let i = 0; i < segs.length; i++) {
        if (d <= segs[i]) {
          const k = segs[i] > 0 ? d / segs[i] : 0;
          return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)];
        }
        d -= segs[i];
      }
      return pts[pts.length - 1];
    };

    const glow = (x, y, r, col, a) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, rgba(col, a));
      g.addColorStop(1, rgba(col, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    /* ---------- Layout: đo cột nội dung, hai lề, vị trí module ---------- */
    const buildLane = (docH) => {
      builtH = docH;
      builtW = W;
      const sy = window.scrollY || 0;
      mods = BIND.map((b, i) => {
        const el = document.querySelector(b.sel);
        const r = el ? el.getBoundingClientRect() : null;
        return { ...b, idx: i, g: b.build(), pageY: r ? r.top + sy + r.height * 0.42 : 200 + i * 440, active: false };
      });
    };

    const refreshLayout = () => {
      lastLayout = performance.now();
      const container = document.querySelector('main .container');
      if (container) {
        const r = container.getBoundingClientRect();
        const cs = getComputedStyle(container);
        CL = r.left + (parseFloat(cs.paddingLeft) || 0);
        CR = r.right - (parseFloat(cs.paddingRight) || 0);
      } else {
        CL = W / 2 - 560;
        CR = W / 2 + 560;
      }
      CL = Math.max(0, CL);
      CR = Math.min(W, CR);

      sideL = { on: CL >= 56, bx: CL * 0.8, ix: CL * 0.4, g: CL };
      const rLimit = W >= 1560 ? W - 250 : W; // chừa chỗ cho thanh TOC
      const gR = rLimit - CR;
      sideR = { on: gR >= 56, bx: CR + gR * 0.2, ix: CR + gR * 0.6, g: gR };

      if (!cardEls) {
        cardEls = [...document.querySelectorAll('.term, .eng-card, .chat, .do, .pcard, .skill, .tl-card, .education-shell, .contact-card')];
      }
      const sy = window.scrollY || 0;
      cards = [];
      minL = Infinity;
      maxR = -Infinity;
      for (const el of cardEls) {
        const r = el.getBoundingClientRect();
        if (r.width < 30 || r.height < 30) continue;
        cards.push({
          el, t: r.top, b: r.bottom, l: r.left, r: r.right, pageY: r.top + sy,
          hidden: el.classList.contains('reveal') && !el.classList.contains('in')
        });
        minL = Math.min(minL, r.left);
        maxR = Math.max(maxR, r.right);
      }

      const docH = document.documentElement.scrollHeight;
      if (Math.abs(docH - builtH) > 40 || Math.abs(W - builtW) > 40) buildLane(docH);
    };

    /* ---------- Dòng mã lệnh nền: CHỈ chạy trong hai lề ---------- */
    const makeStream = (init) => ({
      side: Math.random() < 0.5 ? 0 : 1,
      fx: 0.1 + Math.random() * 0.8,
      y: init ? Math.random() * H : -20,
      v: 18 + Math.random() * 30,
      w: STREAM_WORDS[Math.floor(Math.random() * STREAM_WORDS.length)]
    });
    const initStreams = () => {
      streams = Array.from({ length: isFinePointer ? 18 : 8 }, () => makeStream(true));
    };

    const drawStreams = () => {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      setFont(10);
      for (const s of streams) {
        const sd = s.side ? sideR : sideL;
        if (!sd.on) continue;
        const x = s.side ? sd.bx + sd.g * 0.2 + s.fx * sd.g * 0.7 : s.fx * sd.g * 0.7;
        ctx.fillStyle = rgba(C[0], 0.11);
        ctx.fillText(s.w, x, s.y);
      }
    };

    /* ---------- Hai đường bus xuyên suốt ---------- */
    const drawRails = (sy) => {
      for (const [s, right] of [[sideL, false], [sideR, true]]) {
        if (!s.on) continue;
        ctx.strokeStyle = rgba(C[0], 0.15 + dmaPulse * 0.25);
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(s.bx - 3, 0); ctx.lineTo(s.bx - 3, H);
        ctx.moveTo(s.bx + 3, 0); ctx.lineTo(s.bx + 3, H);
        ctx.stroke();

        if (!motionQuery.matches) {
          for (let k = 0; k < 3; k++) {
            const py = ((time * 150 + k * (H / 2.6) + (right ? 170 : 0)) % (H + 60)) - 30;
            const g = ctx.createLinearGradient(s.bx, py - 36, s.bx, py);
            g.addColorStop(0, rgba(C[0], 0));
            g.addColorStop(1, rgba(right ? C[0] : C[1], 0.6 + dmaPulse * 0.3));
            ctx.strokeStyle = g;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(s.bx, py - 36); ctx.lineTo(s.bx, py);
            ctx.stroke();
            ctx.fillStyle = rgba(C[2], 0.85);
            ctx.beginPath();
            ctx.arc(s.bx, py, 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (s.g >= 140) {
          setFont(9);
          ctx.textAlign = right ? 'left' : 'right';
          ctx.textBaseline = 'top';
          ctx.fillStyle = rgba(C[0], 0.4);
          ctx.fillText(right ? 'DATA_BUS [31:0]' : 'ADDR_BUS [31:0]', s.bx + (right ? 8 : -8), 24);
          ctx.fillText(right ? 'CLK 240MHz · SYNC' : `MEM 0x${((sy * 16 + 0x08000000) >>> 0).toString(16).toUpperCase()}`, s.bx + (right ? 8 : -8), 37);
        }
      }
    };

    /* ---------- Chuỗi liên kết giữa các module cùng bên ---------- */
    const drawChain = (sy) => {
      for (const sideIdx of [0, 1]) {
        const s = sideIdx ? sideR : sideL;
        if (!s.on) continue;
        const list = mods.filter((m) => m.side === sideIdx).sort((a, b) => a.pageY - b.pageY);
        const off = sideIdx ? -14 : 14;
        const col = sideIdx ? C[0] : C[1];

        for (let i = 0; i < list.length - 1; i++) {
          const y1 = list[i].pageY - sy, y2 = list[i + 1].pageY - sy;
          if (y2 < -40 || y1 > H + 40) continue;
          const mid = (y1 + y2) / 2;
          const focus = 1 - clamp(Math.abs(mid - H * 0.5) / (H * 0.7), 0, 1);
          const near = list[i].active || list[i + 1].active;
          const a = 0.1 + 0.4 * focus + (near ? 0.2 : 0) + dmaPulse * 0.15;

          const pts = [[s.bx, y1 + 6], [s.bx + off, y1 + 20], [s.bx + off, y2 - 20], [s.bx, y2 - 6]];
          ctx.strokeStyle = rgba(col, a);
          ctx.lineWidth = 1.1 + focus * 0.7;
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let p = 1; p < pts.length; p++) ctx.lineTo(pts[p][0], pts[p][1]);
          ctx.stroke();

          if (motionQuery.matches) continue;
          const [px, py] = along(pts, sysClock * 0.28 + i * 0.21);
          glow(px, py, 9, C[2], 0.85 * (0.4 + focus));
        }
      }
    };

    /* ---------- Vẽ một vật thể 3D ---------- */
    const drawModule = (m, sy) => {
      const s = m.side ? sideR : sideL;
      if (!s.on) return;
      const y0 = m.pageY - sy;
      const size = clamp(s.g * 0.28, 16, 44);
      if (y0 < -size * 3 || y0 > H + size * 3) return;

      const focus = 1 - clamp(Math.abs(y0 - H * 0.5) / (H * 0.6), 0, 1);
      const act = m.active || triggeredType === m.type;
      const a = clamp(0.22 + 0.5 * focus + (act ? 0.2 : 0), 0, 0.8); // trần độ sáng: không lấn nội dung
      const col = act ? C[1] : C[0];

      // Xoay 3D: tự quay + theo cuộn trang + theo chuột
      const ry = time * 0.35 * (m.side ? -1 : 1) + sy * 0.0016 + cam.mx * 0.5 + m.idx;
      const rx = -0.35 + cam.my * 0.3 + Math.sin(time * 0.4 + m.idx) * 0.1;
      const ca = Math.cos(ry), sa = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);

      const P = m.g.n.map(([lx, ly, lz]) => {
        const x = lx * ca + lz * sa;
        let z = -lx * sa + lz * ca;
        const y = ly * cx - z * sx;
        z = ly * sx + z * cx;
        const k = 3.6 / (3.6 + z);
        return [s.ix + x * size * k, y0 + y * size * k, k, clamp(0.65 - z * 0.35, 0.3, 1)];
      });

      // Nhánh nối module → bus
      const toward = m.side ? -1 : 1;
      ctx.strokeStyle = rgba(C[0], a * 0.5);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(s.ix + toward * size * 1.15, y0);
      ctx.lineTo(s.bx, y0);
      ctx.stroke();
      ctx.fillStyle = rgba(C[1], a * 0.9);
      ctx.beginPath();
      ctx.arc(s.bx, y0, 2.3, 0, Math.PI * 2);
      ctx.fill();

      glow(s.ix, y0, size * 1.7, col, 0.07 * (0.4 + focus));

      // Tín hiệu lan theo cạnh: node "nóng" chuyển dần, cùng nhịp sysClock
      const N = P.length;
      const hot = Math.floor(sysClock * (act ? 2.6 : 1.3)) % N;
      const prev = (hot + N - 1) % N;

      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(col, a * 0.5);
      ctx.beginPath();
      const hotEdges = [];
      for (const [i, j] of m.g.e) {
        if (i === hot || j === hot || i === prev || j === prev) { hotEdges.push([i, j]); continue; }
        ctx.moveTo(P[i][0], P[i][1]);
        ctx.lineTo(P[j][0], P[j][1]);
      }
      ctx.stroke();

      ctx.lineWidth = 1.7;
      ctx.strokeStyle = rgba(C[1], a * 1.25);
      ctx.beginPath();
      for (const [i, j] of hotEdges) {
        ctx.moveTo(P[i][0], P[i][1]);
        ctx.lineTo(P[j][0], P[j][1]);
      }
      ctx.stroke();

      for (let i = 0; i < N; i++) {
        const isHot = i === hot;
        ctx.fillStyle = rgba(isHot ? C[2] : col, a * (isHot ? 1.5 : P[i][3]));
        ctx.beginPath();
        ctx.arc(P[i][0], P[i][1], Math.max(1, (isHot ? 3.4 : 2) * P[i][2]), 0, Math.PI * 2);
        ctx.fill();
      }
      glow(P[hot][0], P[hot][1], 8, C[1], 0.5 * a);

      // Nhãn + trạng thái thực (đồng bộ với node đang nóng)
      if (size >= 20) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        setFont(10);
        ctx.fillStyle = rgba(C[0], a * 0.9);
        ctx.fillText(m.tag, s.ix, y0 + size * 1.55);
        if (act || focus > 0.55) {
          setFont(9);
          ctx.fillStyle = rgba(C[1], a);
          ctx.fillText(`› ${m.ops[hot % m.ops.length]}`, s.ix, y0 + size * 1.55 + 13);
        }
      }
    };

    /* ---------- Thẻ nội dung ↔ bus: làm nổi bật nội dung chính ---------- */
    const drawCoupling = () => {
      for (const c of cards) {
        if (c.hidden || c.b < -40 || c.t > H + 40) continue;
        const cy = (c.t + c.b) / 2;
        const hov = c.el === hoveredCardEl;
        const focus = 1 - clamp(Math.abs(cy - H * 0.5) / (H * 0.55), 0, 1);
        if (focus < 0.12 && !hov) continue;
        const al = hov ? 1 : 0.18 + 0.5 * focus;
        const col = hov ? C[1] : C[0];

        for (const dir of [-1, 1]) {
          const edge = dir < 0 ? c.l : c.r;
          if (dir < 0 ? edge > minL + 16 : edge < maxR - 16) continue;
          const s = dir < 0 ? sideL : sideR;
          if (!s.on) continue;
          const dx = Math.abs(edge - s.bx);
          if (dx < 14) continue;
          const sg = edge > s.bx ? 1 : -1;
          const pts = [[s.bx, cy - 14], [s.bx + sg * dx * 0.4, cy - 14], [s.bx + sg * dx * 0.66, cy], [edge, cy]];

          ctx.strokeStyle = rgba(col, al);
          ctx.lineWidth = hov ? 2 : 1.1;
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let p = 1; p < pts.length; p++) ctx.lineTo(pts[p][0], pts[p][1]);
          ctx.stroke();

          ctx.fillStyle = rgba(col, al);
          ctx.beginPath();
          ctx.arc(edge, cy, hov ? 4 : 2.4, 0, Math.PI * 2);
          ctx.fill();

          if (!motionQuery.matches && (hov || focus > 0.35)) {
            const [px, py] = along(pts, time * (hov ? 1.8 : 0.65) + c.pageY * 0.002);
            ctx.fillStyle = rgba(C[2], 0.95);
            ctx.beginPath();
            ctx.arc(px, py, hov ? 3 : 2, 0, Math.PI * 2);
            ctx.fill();
            if (hov) glow(edge, cy, 22, C[1], 0.55);
          }
        }
      }
    };

    /* ---------- Render ---------- */
    const render = () => {
      if (performance.now() - lastLayout > 120) refreshLayout();
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = 1;
      const sy = window.scrollY || 0;

      // Module gần tâm màn hình nhất ở mỗi bên = ACTIVE
      for (const side of [0, 1]) {
        let best = null, bd = H * 0.45;
        for (const m of mods) {
          if (m.side !== side) continue;
          const d = Math.abs(m.pageY - sy - H * 0.5);
          m.active = false;
          if (d < bd) { bd = d; best = m; }
        }
        if (best) best.active = true;
      }

      drawCloud(sy);
      drawStreams();
      drawRails(sy);
      drawChain(sy);
      drawCoupling();
      for (const m of mods) drawModule(m, sy);
    };

    /* ---------- Update ---------- */
    const update = (dt) => {
      cam.mx = lerp(cam.mx, cam.tmx, 0.06);
      cam.my = lerp(cam.my, cam.tmy, 0.06);
      sysClock += dt;
      updateCloud(dt);
      dmaPulse = dmaPulse > 0.01 ? lerp(dmaPulse, 0, 0.08) : 0;
      if (triggeredTimer > 0) {
        triggeredTimer -= dt * 1000;
        if (triggeredTimer <= 0) triggeredType = null;
      }
      for (let i = 0; i < streams.length; i++) {
        streams[i].y += streams[i].v * dt;
        if (streams[i].y > H + 20) streams[i] = makeStream(false);
      }
    };

    /* ---------- Resize / input / loop ---------- */
    let staticQueued = false;
    const scheduleStatic = () => {
      if (!motionQuery.matches || staticQueued) return;
      staticQueued = true;
      requestAnimationFrame(() => {
        staticQueued = false;
        lastLayout = -1e9;
        render();
      });
    };

    let resizeTimer = null;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isFinePointer ? 2 : 1.5);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      curSize = 0;
      lastLayout = -1e9;
      initStreams();
      initCloud();
      scheduleStatic();
    };
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    });
    window.addEventListener('pointermove', (e) => {
      cam.tmx = (e.clientX / W) * 2 - 1;
      cam.tmy = (e.clientY / H) * 2 - 1;
      if (e.pointerType !== 'touch') { mouseP.x = e.clientX; mouseP.y = e.clientY; mouseP.on = true; }
    }, { passive: true });
    document.addEventListener('mouseleave', () => { cam.tmx = 0; cam.tmy = 0; mouseP.on = false; });
    window.addEventListener('scroll', scheduleStatic, { passive: true });
    if (document.fonts) document.fonts.ready.then(() => { lastLayout = -1e9; builtH = -1; scheduleStatic(); });
    window.addEventListener('load', () => { lastLayout = -1e9; builtH = -1; scheduleStatic(); });

    const frame = (now) => {
      rafId = null;
      if (document.hidden || motionQuery.matches) return;
      rafId = requestAnimationFrame(frame);
      if (now - last < MIN_FRAME) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      time = now / 1000;
      update(dt);
      render();
    };

    const sync = () => {
      if (document.hidden || motionQuery.matches) {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
        if (motionQuery.matches) { time = 0; update(0); lastLayout = -1e9; render(); }
        else ctx.clearRect(0, 0, W, H);
      } else if (rafId === null) {
        last = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    };

    resize();
    sync();
    document.addEventListener('visibilitychange', sync);
    motionQuery.addEventListener('change', sync);
  };

  /* =================================================================
     PUBLIC API (không đổi)
     ================================================================= */
  return {
    initNeuralNetwork,
    setHoveredCard(cardEl, isHovered) { hoveredCardEl = isHovered ? cardEl : null; },
    setHoverCoords() {},
    setActiveSection() {},
    pulseDMA(intensity = 1.0) { dmaPulse = Math.max(dmaPulse, intensity); },
    triggerModule(modType) {
      triggeredType = modType;
      triggeredTimer = 2400;
      dmaPulse = 1.6;
    }
  };
})();