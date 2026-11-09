/**
 * =====================================================================
 * INTERNATIONALIZATION (i18n) & MODAL ARCHITECTURE DATA
 * Nguyen Van Sang — Embedded Software Engineer Portfolio
 * =====================================================================
 */

window.PortfolioData = (() => {
  'use strict';

  const i18n = {
    en: {
      'skip.content': 'Skip to content',
      'terminal.simulation': 'Simulated diagnostics',
      'cert.scheduled': 'Scheduled',
      'modal.close': 'Close',
      'modal.exit': 'Press ESC to exit inspector',
      'shortcuts.title': 'Keyboard Shortcuts',
      'shortcuts.sub': 'Quick navigation',
      'shortcut.language': 'Toggle Language (EN / VI)',
      'shortcut.terminal': 'Jump & Focus Firmware Terminal',
      'shortcut.projects': 'Navigate to Featured Projects',
      'shortcut.close': 'Close any Open Modal',
      'shortcut.help': 'Show / Hide this Shortcuts Guide',
      'shortcuts.helper': 'Shortcuts',
      'a11y.language': 'Chuyển sang tiếng Việt',
      'a11y.menuOpen': 'Open menu',
      'a11y.menuClose': 'Close menu',
      'a11y.home': 'Home',
      'a11y.backTop': 'Back to top',
      'a11y.portrait': 'Portrait of Nguyen Van Sang',
      'a11y.terminal': 'Simulated firmware terminal',
      'nav.about': 'Professional Summary',
      'nav.experience': 'Experience',
      'nav.projects': 'Projects',
      'nav.skills': 'Skills',
      'nav.education': 'Education & Certification',
      'nav.contact': 'Contact',
      'nav.resume': 'View CV',
      'loader.text': 'Booting ESP32-S3 firmware',
      'hero.status': 'Looking for a Fresher Embedded Software Engineer role',
      'hero.greet': 'Hi, I am',
      'hero.name': 'Nguyen Van Sang',
      'hero.title': 'Embedded Software Engineer — Fresher',
      "hero.tagline": "Computer Engineering student at HCMUT. I work on ESP32-S3 firmware with FreeRTOS and TinyML, Verilog RTL for an FPGA vending prototype, and IoT backends that collect sensor data in the cloud.",
      'hero.cta1': 'View projects',
      'hero.cta2': 'Contact me',
      'stats.s1': 'Projects on GitHub',
      'stats.s2': 'FreeRTOS tasks in one firmware',
      'stats.s3': 'Synthetic training samples',
      'stats.s4': 'TinyML inference time',
      'about.title': 'Professional Summary',
      'about.sub': 'Who I am and what I work on',
      'about.userPrompt': "Tell me more about Sang",
      'about.regen': 'Regenerate',
      "about.streamText": "Nguyen Van Sang is a Computer Engineering student at Ho Chi Minh City University of Technology (HCMUT), focused on embedded systems and IoT. He has written FreeRTOS firmware for the ESP32-S3, run a TinyML model on a microcontroller, developed Verilog RTL for an FPGA vending prototype with an LCD controller FSM, and built a backend that collects sensor data. In summer 2026 he interned on IoT sensor solutions at Viettel Dak Lak. He is looking for a Fresher Embedded Software Engineer role where he can learn from experienced engineers and ship firmware that runs on real hardware.",
      'do.d1.title': 'Firmware & RTOS',
      'do.d1.desc': 'Concurrent firmware for ESP32 and ESP32-S3 on FreeRTOS: tasks, queues, mutexes and event groups, with drivers for I2C, GPIO and UART.',
      'do.d2.title': 'Edge AI & TinyML',
      'do.d2.desc': 'A small TensorFlow Lite Micro classifier running on the microcontroller, with a hardware interlock so the pump relay only switches on when conditions allow.',
      'do.d3.title': 'FPGA & Digital Design',
      "do.d3.desc": "Verilog RTL for a vending prototype targeting Digilent Arty-Z7-20: User/Admin logic, an LCD controller state machine, button debounce and board pin/clock constraints for Vivado.",
      'exp.title': 'Experience',
      'exp.sub': 'Internship experience',
      'exp.role': 'IoT Intern',
      'exp.company': 'Viettel Dak Lak — Viettel Group',
      'exp.type': 'On-site',
      'exp.b1': 'Studied IoT architecture, industrial sensor interfacing and low-level ESP32 programming.',
      'exp.b2': 'Explored an enterprise IoT device-management platform and backend development with Node.js and PostgreSQL.',
      'exp.b3': 'Built an IoT sensor solution that sends hardware readings to a cloud backend and logs them.',
      'proj.title': 'Projects',
      'proj.sub': 'Embedded, FPGA and full-stack work, each with source code on GitHub',
      'proj.p1.title': 'Smart Agriculture Monitoring System',
      'proj.p1.b1': 'Wrote FreeRTOS firmware for the ESP32-S3 with 7 tasks (sensor sampling, TinyML inference, pump relay, logging, reset button, status LED) that share state through a semaphore-protected context, across I2C, GPIO and the network.',
      'proj.p1.b2': 'Ran a float32 TensorFlow Lite Micro model that classifies temperature, humidity and soil moisture into 3 risk levels in under 1 ms per inference, with hardware interlocks on the pump.',
      'proj.p1.b3': 'Added a Wi-Fi access-point fallback with known networks saved in LittleFS, and streamed telemetry over HTTP/WebSocket to a Node.js and PostgreSQL dashboard running in Docker.',
      "proj.p2.title": "FPGA Vending Machine Prototype",
      "proj.p2.b1": "Developed Verilog RTL for a 4-product vending prototype targeting Digilent Arty-Z7-20, with separate User and Admin modes.",
      "proj.p2.b2": "Implemented button-based credit (+5/+10), quantity selection, stock checks and balance deduction; Admin mode adjusts prices and restocks products.",
      "proj.p2.b3": "Added counter-based button debounce, an 8-bit 16×2 LCD interface with a 9-state controller FSM, and four 4-bit digit outputs for a 7-segment display interface.",
      "proj.p3.title": "ParkWise — Campus Parking Prototype",
      "proj.p3.b1": "Built a Next.js 16 / React 19 prototype for 6 parking zones, with TypeScript, Tailwind CSS, Express mock APIs and Next.js API routes.",
      "proj.p3.b2": "Simulated entry/exit, BKPay-style fees and balance management, payment history, incident reports, gate exceptions, IoT health and reconciliation reports.",
      "proj.p3.b3": "Created an SVG/CSS parking map with slot selection and route simulation, plus UI access rules for 5 demo roles; browser state is stored in localStorage.",
      'proj.inspect': 'System architecture',
      'proj.m1': 'FreeRTOS tasks',
      'proj.m2': 'TinyML inference',
      'proj.m3': 'training samples',
      "proj.inspectFSM": "RTL & LCD controller",
      "proj.inspectCloud": "Prototype architecture",
      'skills.title': 'Technical Skills',
      'skills.sub': 'Tools and technologies I have used in the projects below',
      'skills.c1': 'Programming Languages',
      'skills.c2': 'Embedded Systems & RTOS',
      'skills.c3': 'Edge AI & TinyML',
      'skills.c4': 'FPGA & Digital Design',
      'skills.c5': 'Development Tools',
      'skills.c6': 'IoT Backend & Web',
      'edu.sectionTitle': 'Education & Certification',
      'edu.title': 'Education',
      'edu.sub': 'Where I study',
      'cert.secTitle': 'Languages & Certification',
      'cert.secSub': 'English level and upcoming TOEIC test',
      'edu.school': 'Ho Chi Minh City University of Technology — VNU-HCM',
      'edu.degree': 'Bachelor of Computer Engineering',
      'edu.period': 'Sep 2022 – Nov 2027 • Ho Chi Minh City, Vietnam',
      'edu.langsTitle': 'Language Proficiency',
      'edu.langEn': 'English',
      'edu.langVi': 'Vietnamese',
      'lang.levelEn': 'B1 Intermediate',
      'lang.levelVi': 'Native',
      'cert.title': 'Language Certification',
      'cert.sub': 'Listening and Reading',
      'cert.c1.name': 'TOEIC (Listening & Reading)',
      'cert.c1.date': 'Test scheduled for Dec 2026 • ETS',
      'contact.status': 'Open to fresher opportunities',
      'contact.title': "Let’s talk",
      'contact.desc': 'I’m looking for a Fresher Embedded Software Engineer role in Ho Chi Minh City or remote. You can reach me by email, phone or LinkedIn.',
      'contact.copy': 'Copy Email',
      'shortcut.led': 'Toggle LED borders',
      'footer.totop': 'Back to Top',
      'toast.copied': 'Email copied to clipboard!',
      "proj.p2.context": "CO3091 · Logic Design Project",
      "proj.p2.hardware": "Target: Digilent Arty-Z7-20 · XDC clock constraint: 125 MHz",
      "proj.p2.design": "Verilog RTL · User/Admin logic · LCD controller FSM",
      "proj.p2.stage": "RTL prototype",
      "proj.p3.b4": "Includes PostgreSQL schema/seed scripts. Live database, BKPay, IoT and backend authorization integrations remain future work.",
      "proj.p3.context": "Full-stack prototype",
      "proj.p3.backend": "Data: Express + Next.js mock APIs · localStorage · in-memory state",
      "proj.p3.frontend": "UI: Next.js 16 · React 19 · TypeScript · Tailwind CSS",
      "proj.p3.stage": "Mock-data demo",
    },
    vi: {
      'skip.content': 'Chuyển đến nội dung',
      'terminal.simulation': 'Chẩn đoán mô phỏng',
      'cert.scheduled': 'Đã lên lịch',
      'modal.close': 'Đóng',
      'modal.exit': 'Nhấn ESC để đóng cửa sổ chi tiết',
      'shortcuts.title': 'Phím tắt',
      'shortcuts.sub': 'Điều hướng nhanh',
      'shortcut.language': 'Đổi ngôn ngữ (EN / VI)',
      'shortcut.terminal': 'Chuyển đến và chọn terminal firmware',
      'shortcut.projects': 'Chuyển đến các dự án nổi bật',
      'shortcut.close': 'Đóng cửa sổ đang mở',
      'shortcut.help': 'Hiện / Ẩn hướng dẫn phím tắt',
      'shortcuts.helper': 'Phím tắt',
      'a11y.language': 'Switch to English',
      'a11y.menuOpen': 'Mở menu',
      'a11y.menuClose': 'Đóng menu',
      'a11y.home': 'Trang đầu',
      'a11y.backTop': 'Lên đầu trang',
      'a11y.portrait': 'Ảnh chân dung Nguyễn Văn Sang',
      'a11y.terminal': 'Terminal firmware mô phỏng',
      'nav.about': 'Tóm tắt chuyên môn',
      'nav.experience': 'Kinh nghiệm',
      'nav.projects': 'Dự án',
      'nav.skills': 'Kỹ năng',
      'nav.education': 'Học vấn & Chứng chỉ',
      'nav.contact': 'Liên hệ',
      'nav.resume': 'Xem CV',
      'loader.text': 'Đang khởi động firmware ESP32-S3',
      'hero.status': 'Đang tìm vị trí Fresher Embedded Software Engineer',
      'hero.greet': 'Xin chào, tôi là',
      'hero.name': 'Nguyễn Văn Sang',
      'hero.title': 'Kỹ sư Phần mềm Nhúng — Fresher',
      "hero.tagline": "Sinh viên Kỹ thuật Máy tính tại ĐH Bách khoa TP.HCM. Tôi phát triển firmware ESP32-S3 với FreeRTOS và TinyML, RTL Verilog cho nguyên mẫu máy bán hàng trên FPGA và backend IoT thu thập dữ liệu cảm biến lên cloud.",
      'hero.cta1': 'Xem dự án',
      'hero.cta2': 'Liên hệ',
      'stats.s1': 'Dự án có mã nguồn trên GitHub',
      'stats.s2': 'Tác vụ FreeRTOS trong một firmware',
      'stats.s3': 'Mẫu dữ liệu huấn luyện tổng hợp',
      'stats.s4': 'Thời gian suy luận TinyML',
      'about.title': 'Tóm Tắt Chuyên Môn',
      'about.sub': 'Giới thiệu ngắn về tôi và hướng chuyên môn',
      'about.userPrompt': 'Hãy giới thiệu về Sang',
      'about.regen': 'Phát lại',
      "about.streamText": "Nguyễn Văn Sang là sinh viên Kỹ thuật Máy tính tại Trường Đại học Bách khoa – ĐHQG-HCM, tập trung vào hệ thống nhúng và IoT. Anh đã viết firmware FreeRTOS cho ESP32-S3, chạy mô hình TinyML trên vi điều khiển, phát triển RTL Verilog cho nguyên mẫu máy bán hàng trên FPGA với FSM điều khiển LCD và xây dựng backend thu thập dữ liệu cảm biến. Mùa hè năm 2026, anh thực tập về giải pháp cảm biến IoT tại Viettel Đắk Lắk. Anh đang tìm vị trí Fresher Embedded Software Engineer để học hỏi từ các kỹ sư giàu kinh nghiệm và làm ra firmware chạy trên phần cứng thật.",
      'do.d1.title': 'Firmware & RTOS',
      'do.d1.desc': 'Firmware đa nhiệm cho ESP32 và ESP32-S3 trên FreeRTOS: task, queue, mutex, event group, kèm driver cho I2C, GPIO và UART.',
      'do.d2.title': 'Edge AI & TinyML',
      'do.d2.desc': 'Mô hình TensorFlow Lite Micro nhỏ chạy trực tiếp trên vi điều khiển, kèm khóa an toàn phần cứng để rơ-le bơm chỉ bật khi điều kiện cho phép.',
      'do.d3.title': 'FPGA & Thiết kế số',
      "do.d3.desc": "RTL Verilog cho nguyên mẫu máy bán hàng hướng tới bo Digilent Arty-Z7-20: logic User/Admin, FSM điều khiển LCD, chống dội nút nhấn và ràng buộc chân/xung nhịp cho Vivado.",
      'exp.title': 'Kinh Nghiệm',
      'exp.sub': 'Kinh nghiệm thực tập',
      'exp.role': 'Thực tập sinh IoT',
      'exp.company': 'Viettel Đắk Lắk — Tập đoàn Viettel',
      'exp.type': 'Trực tiếp',
      'exp.b1': 'Tìm hiểu kiến trúc IoT, giao tiếp cảm biến công nghiệp và lập trình cấp thấp cho ESP32.',
      'exp.b2': 'Tìm hiểu nền tảng quản lý thiết bị IoT doanh nghiệp và phát triển backend với Node.js, PostgreSQL.',
      'exp.b3': 'Xây dựng giải pháp cảm biến IoT gửi dữ liệu từ phần cứng lên backend cloud và lưu nhật ký.',
      'proj.title': 'Dự Án',
      'proj.sub': 'Dự án nhúng, FPGA và full-stack, đều có mã nguồn trên GitHub',
      'proj.p1.title': 'Hệ thống giám sát nông nghiệp thông minh',
      'proj.p1.b1': 'Viết firmware FreeRTOS cho ESP32-S3 gồm 7 task (đọc cảm biến, suy luận TinyML, rơ-le bơm, ghi log, nút reset, LED trạng thái) dùng chung trạng thái qua semaphore, giao tiếp I2C, GPIO và mạng.',
      'proj.p1.b2': 'Chạy mô hình float32 TensorFlow Lite Micro phân loại nhiệt độ, độ ẩm và độ ẩm đất thành 3 mức rủi ro, mỗi lần suy luận dưới 1 ms, kèm khóa an toàn phần cứng cho máy bơm.',
      'proj.p1.b3': 'Thêm chế độ Wi-Fi access point dự phòng, lưu các mạng đã biết trong LittleFS, và truyền telemetry qua HTTP/WebSocket tới dashboard Node.js + PostgreSQL chạy trong Docker.',
      "proj.p2.title": "Nguyên mẫu máy bán hàng tự động trên FPGA",
      "proj.p2.b1": "Phát triển RTL Verilog cho nguyên mẫu máy bán hàng gồm 4 loại sản phẩm, hướng tới bo Digilent Arty-Z7-20, có hai chế độ User và Admin.",
      "proj.p2.b2": "Mô phỏng nạp số dư bằng nút nhấn (+5/+10), chọn số lượng, kiểm tra tồn kho và trừ tiền; Admin điều chỉnh giá và bổ sung hàng.",
      "proj.p2.b3": "Bổ sung chống dội bằng bộ đếm, giao tiếp LCD 16×2 bus 8-bit với FSM điều khiển 9 trạng thái và bốn đầu ra chữ số 4-bit cho giao tiếp hiển thị LED 7 đoạn.",
      "proj.p3.title": "ParkWise — Nguyên mẫu quản lý bãi đỗ xe trong trường",
      "proj.p3.b1": "Xây dựng nguyên mẫu Next.js 16 / React 19 cho 6 khu đỗ, dùng TypeScript, Tailwind CSS, API Express mock và API route Next.js.",
      "proj.p3.b2": "Mô phỏng xe vào/ra, thanh toán phí và quản lý số dư theo luồng BKPay, lịch sử giao dịch, báo cáo sự cố, ngoại lệ tại cổng, trạng thái IoT và báo cáo đối soát.",
      "proj.p3.b3": "Tạo sơ đồ bãi xe SVG/CSS để chọn ô và mô phỏng chỉ đường, kèm kiểm tra quyền giao diện cho 5 nhóm tài khoản demo; lưu trạng thái trình duyệt bằng localStorage.",
      'proj.inspect': 'Kiến trúc hệ thống',
      'proj.m1': 'tác vụ FreeRTOS',
      'proj.m2': 'suy luận TinyML',
      'proj.m3': 'mẫu huấn luyện',
      "proj.inspectFSM": "RTL & bộ điều khiển LCD",
      "proj.inspectCloud": "Kiến trúc nguyên mẫu",
      'skills.title': 'Kỹ Năng Chuyên Môn',
      'skills.sub': 'Công cụ và công nghệ tôi đã dùng trong các dự án bên dưới',
      'skills.c1': 'Ngôn ngữ lập trình',
      'skills.c2': 'Hệ thống nhúng & RTOS',
      'skills.c3': 'Edge AI & TinyML',
      'skills.c4': 'FPGA & Thiết kế số',
      'skills.c5': 'Công cụ phát triển',
      'skills.c6': 'IoT Backend & Web',
      'edu.sectionTitle': 'Học Vấn & Chứng Chỉ',
      'edu.title': 'Học Vấn',
      'edu.sub': 'Nơi tôi đang theo học',
      'cert.secTitle': 'Ngoại Ngữ & Chứng Chỉ',
      'cert.secSub': 'Trình độ tiếng Anh và kỳ thi TOEIC sắp tới',
      'edu.school': 'Trường Đại học Bách khoa – ĐHQG-HCM',
      'edu.degree': 'Cử nhân Kỹ thuật Máy tính',
      'edu.period': 'Tháng 9/2022 – Tháng 11/2027 • TP. Hồ Chí Minh, Việt Nam',
      'edu.langsTitle': 'Ngoại ngữ',
      'edu.langEn': 'Tiếng Anh',
      'edu.langVi': 'Tiếng Việt',
      'lang.levelEn': 'Trung cấp (B1)',
      'lang.levelVi': 'Bản ngữ',
      'cert.title': 'Chứng chỉ ngoại ngữ',
      'cert.sub': 'Kỹ năng Nghe và Đọc',
      'cert.c1.name': 'TOEIC (Kỹ năng Nghe & Đọc)',
      'cert.c1.date': 'Dự kiến thi tháng 12/2026 • ETS',
      'contact.status': 'Đang tìm cơ hội Fresher',
      'contact.title': 'Cùng trao đổi',
      'contact.desc': 'Tôi đang tìm vị trí Fresher Embedded Software Engineer tại TP. Hồ Chí Minh hoặc làm việc từ xa. Bạn có thể liên hệ qua email, điện thoại hoặc LinkedIn.',
      'contact.copy': 'Sao chép Email',
      'shortcut.led': 'Bật/tắt viền LED',
      'footer.totop': 'Lên Đầu Trang',
      'toast.copied': 'Đã sao chép địa chỉ email vào bộ nhớ tạm!',
      "proj.p2.context": "CO3091 · Đồ án Thiết kế luận lý",
      "proj.p2.hardware": "Bo đích: Digilent Arty-Z7-20 · Ràng buộc xung nhịp XDC: 125 MHz",
      "proj.p2.design": "RTL Verilog · Logic User/Admin · FSM điều khiển LCD",
      "proj.p2.stage": "Nguyên mẫu RTL",
      "proj.p3.b4": "Có script schema/seed PostgreSQL. Kết nối cơ sở dữ liệu, BKPay, IoT thật và phân quyền backend vẫn là hướng phát triển.",
      "proj.p3.context": "Nguyên mẫu full-stack",
      "proj.p3.backend": "Dữ liệu: API Express + Next.js mô phỏng · localStorage · bộ nhớ",
      "proj.p3.frontend": "Giao diện: Next.js 16 · React 19 · TypeScript · Tailwind CSS",
      "proj.p3.stage": "Demo dữ liệu mô phỏng",
    }
  };

  const modalContentData = {
    'modal-proj1': {
      title_en: 'Smart Agriculture System — System Architecture',
      title_vi: 'Hệ thống Nông nghiệp Thông minh — Kiến trúc Hệ thống',
      sub_en: 'ESP32-S3 Dual-Core · 7-Task FreeRTOS Concurrency · TinyML Edge AI',
      sub_vi: 'ESP32-S3 Dual-Core · 7 Tác vụ FreeRTOS Đồng thời · TinyML Biên',
      body_en: `
        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-layers"/></svg>
            <span>FreeRTOS tasks and how they communicate</span>
          </div>
          <div class="arch-pipeline">
            <div class="arch-step"><b>temp_humi_monitor</b><span>DHT20 and soil moisture readings</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>SharedContext</b><span>Mutex-protected sensor state</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>tiny_ml_task</b><span>TFLite Micro inference</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>SharedContext</b><span>Sensor readings and risk level</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>task_pump</b><span>Safety interlocks and relay control</span></div>
          </div>
          <p class="muted small" style="margin:0;">Sensor, inference and pump tasks exchange state through a mutex-protected SharedContext. Binary semaphores notify LED and database tasks when updates are needed.</p>
        </div>

        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-chip"/></svg>
            <span>Pin and peripheral allocation</span>
          </div>
          <table class="pin-table">
            <thead>
              <tr><th>Pin</th><th>Peripheral</th><th>Device Interface</th><th>Operating Mode</th></tr>
            </thead>
            <tbody>
              <tr><td><b>GPIO 11</b></td><td>I2C SDA</td><td>DHT20 temperature / humidity sensor</td><td>Sensor data</td></tr>
              <tr><td><b>GPIO 12</b></td><td>I2C SCL</td><td>DHT20 sensor clock</td><td>I2C clock</td></tr>
              <tr><td><b>GPIO 2</b></td><td>ADC1_CH1</td><td>Soil moisture probe</td><td>Analog input</td></tr>
              <tr><td><b>GPIO 6</b></td><td>Digital Out</td><td>Pump relay control</td><td>Output with safety interlocks</td></tr>
              <tr><td><b>GPIO 0</b></td><td>Polled input</td><td>BOOT button / Wi-Fi setup</td><td>Hold for more than 2 seconds</td></tr>
              <tr><td><b>TXD0/RXD0</b></td><td>UART0</td><td>Firmware Diagnostics Shell</td><td>115200 Baud 8N1</td></tr>
            </tbody>
          </table>
        </div>

        <div class="arch-card" style="margin-bottom:0;">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--cyan);"><use href="#i-server"/></svg>
            <span>Wi-Fi fallback and cloud telemetry</span>
          </div>
          <p class="small" style="color:var(--text2);margin:0 0 8px;">If none of the saved Wi-Fi networks is available, the ESP32-S3 starts its own access point and serves a setup page. Known networks are stored in LittleFS. Once connected, it streams telemetry over HTTP/WebSocket to a Node.js and PostgreSQL dashboard running in Docker.</p>
        </div>
      `,
      body_vi: `
        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-layers"/></svg>
            <span>Các task FreeRTOS và cách chúng giao tiếp</span>
          </div>
          <div class="arch-pipeline">
            <div class="arch-step"><b>temp_humi_monitor</b><span>Đọc DHT20 và độ ẩm đất</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>SharedContext</b><span>Dữ liệu cảm biến được bảo vệ bằng mutex</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>tiny_ml_task</b><span>Suy luận TFLite Micro</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>SharedContext</b><span>Dữ liệu cảm biến và mức rủi ro</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>task_pump</b><span>Khóa an toàn và điều khiển rơ-le</span></div>
          </div>
          <p class="muted small" style="margin:0;">Các task cảm biến, suy luận và điều khiển bơm trao đổi trạng thái qua SharedContext được bảo vệ bằng mutex. Semaphore nhị phân thông báo cho các task LED và cơ sở dữ liệu khi cần cập nhật.</p>
        </div>

        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-chip"/></svg>
            <span>Phân bổ chân và ngoại vi</span>
          </div>
          <table class="pin-table">
            <thead>
              <tr><th>Chân</th><th>Ngoại vi</th><th>Giao tiếp Thiết bị</th><th>Chế độ hoạt động</th></tr>
            </thead>
            <tbody>
              <tr><td><b>GPIO 11</b></td><td>I2C SDA</td><td>Cảm biến nhiệt độ / độ ẩm DHT20</td><td>Dữ liệu cảm biến</td></tr>
              <tr><td><b>GPIO 12</b></td><td>I2C SCL</td><td>Xung nhịp cảm biến DHT20</td><td>Xung nhịp I2C</td></tr>
              <tr><td><b>GPIO 2</b></td><td>ADC1_CH1</td><td>Cảm biến độ ẩm đất</td><td>Đầu vào tương tự</td></tr>
              <tr><td><b>GPIO 6</b></td><td>Digital Out</td><td>Điều khiển rơ-le máy bơm</td><td>Đầu ra có khóa an toàn</td></tr>
              <tr><td><b>GPIO 0</b></td><td>Đọc nút theo chu kỳ</td><td>Nút BOOT / Cấu hình Wi-Fi</td><td>Giữ hơn 2 giây</td></tr>
              <tr><td><b>TXD0/RXD0</b></td><td>UART0</td><td>Console Nhật ký & Gỡ lỗi Firmware</td><td>115200 Baud 8N1</td></tr>
            </tbody>
          </table>
        </div>

        <div class="arch-card" style="margin-bottom:0;">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--cyan);"><use href="#i-server"/></svg>
            <span>Wi-Fi dự phòng và telemetry lên cloud</span>
          </div>
          <p class="small" style="color:var(--text2);margin:0 0 8px;">Nếu không có mạng Wi-Fi nào đã lưu khả dụng, ESP32-S3 tự phát access point riêng và mở trang cấu hình. Các mạng đã biết được lưu trong LittleFS. Khi đã kết nối, thiết bị truyền telemetry qua HTTP/WebSocket tới dashboard Node.js + PostgreSQL chạy trong Docker.</p>
        </div>
      `
    },
    'modal-proj2': {
      title_en: "FPGA Vending Prototype — RTL & LCD Controller",
      title_vi: "Nguyên mẫu máy bán hàng FPGA — RTL & bộ điều khiển LCD",
      sub_en: "Arty-Z7-20 target · Verilog HDL · 125 MHz XDC constraint · 8-bit LCD bus",
      sub_vi: "Bo đích Arty-Z7-20 · Verilog HDL · Ràng buộc XDC 125 MHz · LCD bus 8-bit",
      body_en: `
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-cpu"/></svg><span>Actual RTL hierarchy and interfaces</span></div>
          <table class="pin-table">
            <thead><tr><th>RTL component</th><th>Interface / behavior</th></tr></thead>
            <tbody>
              <tr><td><b>top_button_handler</b></td><td>Four product types, one-hot switch selection, User/Admin mode, quantity, stock, price and balance registers; purchase feedback through LCD and LEDs</td></tr>
              <tr><td><b>button_debounce ×4</b></td><td>Two synchronization registers and a 20-bit stability counter; generates a button flag in the input clock domain</td></tr>
              <tr><td><b>LCD_display</b></td><td>Two 128-bit text lines for a 16×2 LCD; 8-bit data bus plus rs/rw/en; 9-state controller</td></tr>
              <tr><td><b>seg_0_data … seg_3_data</b></td><td>Four 4-bit decimal-digit outputs derived from the balance register, for a 7-segment display interface; no segment decoder or multiplexed scan module is included</td></tr>
            </tbody>
          </table>
          <p class="muted small" style="margin:12px 0 0;">The Arty-Z7-20 XDC file constrains the input clock to 8 ns (125 MHz). This is a design constraint, not a measured operating frequency or evidence of timing closure.</p>
        </div>
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-layers"/></svg><span>LCD_display FSM — source state names</span></div>
          <div class="arch-pipeline">
            <div class="arch-step"><b>INIT</b><span>8-bit / two-line mode</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>DISPLAY_ON</b><span>Enable display</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>CLEAR_ON</b><span>Clear display</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>SET_CURSOR1</b><span>First-line address</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>WRITE_LINE1</b><span>16 characters</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>SET_CURSOR2</b><span>Second-line address</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>WRITE_LINE2</b><span>16 characters</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>IDLE</b><span>Lower en, request refresh</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>CHECK_UPDATE</b><span>Wait 12,500,000 cycles → CLEAR_ON</span></div>
          </div>
          <p class="muted small" style="margin:0;">This is the LCD controller FSM. Vending transactions are implemented with clocked case/if logic in top_button_handler; the source does not define a separate five-state vending FSM.</p>
        </div>
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-code"/></svg><span>User and Admin workflows</span></div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;">User mode: with no product switch selected, buttons 0/1 add 5/10 credit units and button 2 clears the balance. One active product switch selects one of four products; buttons 0/1 increase/decrease quantity and button 2 requests a purchase. Quantity increases are capped at 9 and the selected product's current stock. The purchase branch checks nonzero stock, positive quantity and sufficient balance, then deducts the stored total and stock. The LCD reports success or insufficient funds; the selected-product LED blinks on success. Multiple active product switches show ONLY_1_SWITCH_ON.</p>
          <p class="small" style="color:var(--text2);margin:0;">Admin mode: for a selected product, buttons 0/1 raise/lower the price, button 2 adds stock and button 3 resets price and stock. Price increases and restocking are capped at 9; a price is decreased only when above 1. All prices and stock counts start at zero. Remaining user credit stays in the balance register; no coin validator, physical dispenser or cash-change output is implemented.</p>
        </div>
        <div class="arch-card" style="margin-bottom:0;">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-layers"/></svg><span>Validation status and prototype limits</span></div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;">The repository contains RTL, board constraints and an LCD stimulus testbench. It contains no bitstream, synthesis/timing report, board demonstration or Xcelium run log. The supplied testbench stops before LCD initialization completes and has no self-checking assertions, so it does not establish functional correctness.</p>
          <p class="muted small" style="margin:0;">Static review identified an 8-bit balance that can wrap, a truncated debounce threshold literal, and stale quantity/total values when changing products. These edge cases require RTL fixes and verification before reliable hardware use.</p>
        </div>
      `,
      body_vi: `
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-cpu"/></svg><span>Cấu trúc RTL và các giao tiếp thực có</span></div>
          <table class="pin-table">
            <thead><tr><th>Thành phần RTL</th><th>Giao tiếp / chức năng</th></tr></thead>
            <tbody>
              <tr><td><b>top_button_handler</b></td><td>Bốn loại sản phẩm, chọn bằng switch one-hot, chế độ User/Admin, các thanh ghi số lượng, tồn kho, giá và số dư; phản hồi giao dịch qua LCD và LED</td></tr>
              <tr><td><b>button_debounce ×4</b></td><td>Hai thanh ghi đồng bộ và bộ đếm ổn định 20-bit; tạo cờ nút nhấn trong miền xung nhịp đầu vào</td></tr>
              <tr><td><b>LCD_display</b></td><td>Hai dòng văn bản 128-bit cho LCD 16×2; bus dữ liệu 8-bit cùng rs/rw/en; FSM điều khiển 9 trạng thái</td></tr>
              <tr><td><b>seg_0_data … seg_3_data</b></td><td>Bốn đầu ra chữ số thập phân 4-bit tính từ thanh ghi số dư, dùng cho giao tiếp hiển thị LED 7 đoạn; chưa có bộ giải mã segment hoặc module quét ghép kênh</td></tr>
            </tbody>
          </table>
          <p class="muted small" style="margin:12px 0 0;">Tệp XDC của Arty-Z7-20 đặt chu kỳ xung nhịp đầu vào 8 ns (125 MHz). Đây là ràng buộc thiết kế, chưa phải tần số đo thực tế hoặc bằng chứng đạt timing.</p>
        </div>
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-layers"/></svg><span>FSM của LCD_display — tên trạng thái trong mã nguồn</span></div>
          <div class="arch-pipeline">
            <div class="arch-step"><b>INIT</b><span>Chế độ 8-bit / hai dòng</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>DISPLAY_ON</b><span>Bật hiển thị</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>CLEAR_ON</b><span>Xóa màn hình</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>SET_CURSOR1</b><span>Địa chỉ dòng 1</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>WRITE_LINE1</b><span>Ghi 16 ký tự</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>SET_CURSOR2</b><span>Địa chỉ dòng 2</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>WRITE_LINE2</b><span>Ghi 16 ký tự</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>IDLE</b><span>Hạ en, chuyển sang cập nhật</span></div><span class="arch-sep">➔</span>
            <div class="arch-step"><b>CHECK_UPDATE</b><span>Chờ 12.500.000 chu kỳ → CLEAR_ON</span></div>
          </div>
          <p class="muted small" style="margin:0;">Đây là FSM điều khiển LCD. Giao dịch bán hàng dùng logic case/if theo xung nhịp trong top_button_handler; mã nguồn không định nghĩa FSM bán hàng năm trạng thái riêng.</p>
        </div>
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-code"/></svg><span>Quy trình User và Admin</span></div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;">Chế độ User: khi chưa chọn switch sản phẩm, nút 0/1 cộng 5/10 đơn vị số dư, nút 2 xóa số dư. Bật đúng một switch để chọn một trong bốn sản phẩm; nút 0/1 tăng/giảm số lượng, nút 2 yêu cầu mua. Khi tăng, số lượng được giới hạn ở 9 và tồn kho hiện tại của sản phẩm đã chọn. Nhánh mua kiểm tra còn hàng, số lượng chọn lớn hơn 0 và đủ số dư, sau đó trừ tổng tiền đang lưu và tồn kho. LCD báo thành công hoặc thiếu tiền; LED sản phẩm nhấp nháy khi thành công. Bật nhiều switch sẽ hiện ONLY_1_SWITCH_ON.</p>
          <p class="small" style="color:var(--text2);margin:0;">Chế độ Admin: với sản phẩm đã chọn, nút 0/1 tăng/giảm giá, nút 2 thêm tồn kho, nút 3 đưa giá và tồn kho về 0. Tăng giá và bổ sung tồn kho được giới hạn ở 9; chỉ giảm giá khi giá lớn hơn 1. Giá và tồn kho khởi tạo bằng 0. Tiền chưa dùng vẫn nằm trong thanh ghi số dư; chưa có bộ nhận dạng tiền xu, cơ cấu nhả hàng hoặc đầu ra trả tiền mặt.</p>
        </div>
        <div class="arch-card" style="margin-bottom:0;">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-layers"/></svg><span>Trạng thái kiểm chứng và giới hạn nguyên mẫu</span></div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;">Repository có RTL, ràng buộc bo và testbench kích thích LCD. Chưa có bitstream, báo cáo tổng hợp/timing, bản trình diễn trên bo hoặc log chạy Xcelium. Testbench hiện dừng trước khi LCD khởi tạo xong và không có assertion tự kiểm tra nên chưa chứng minh tính đúng chức năng.</p>
          <p class="muted small" style="margin:0;">Đối chiếu tĩnh phát hiện số dư 8-bit có thể tràn, hằng ngưỡng chống dội bị cắt bit và số lượng/tổng tiền cũ còn giữ khi đổi sản phẩm. Các tình huống biên này cần sửa RTL và kiểm chứng trước khi sử dụng phần cứng tin cậy.</p>
        </div>
      `
    },
    'modal-proj3': {
      title_en: "ParkWise — Parking Management Prototype",
      title_vi: "ParkWise — Nguyên mẫu quản lý bãi đỗ xe",
      sub_en: "Next.js 16 · React 19 · Express mock APIs · localStorage · SVG/CSS map",
      sub_vi: "Next.js 16 · React 19 · API Express mô phỏng · localStorage · Sơ đồ SVG/CSS",
      body_en: `
        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-server"/></svg>
            <span>Application scope and actual data flow</span>
          </div>
          <p class="small" style="color:var(--text2);margin:0 0 12px;">A campus parking prototype with entry/exit screens, six parking zones (A–F), fee payment and history, incident reports, gate exceptions, an IoT-health dashboard, settings and reconciliation reports. These workflows use demo data.</p>
          <table class="pin-table">
            <thead><tr><th>Component</th><th>Implemented behavior</th><th>State source</th></tr></thead>
            <tbody>
              <tr><td><b>Next.js frontend</b></td><td>React 19 / TypeScript pages and Tailwind CSS; role-based menus and UI checks</td><td>Demo user and selected operational state in browser localStorage</td></tr>
              <tr><td><b>Express mock server</b></td><td>13 HTTP route handlers: demo login, zones/slots, check-in/out, search and reports</td><td>Independent in-memory users, six zones with 100 slots each, and mock report records</td></tr>
              <tr><td><b>Next.js API routes</b></td><td>13 HTTP handlers in 12 route files for zones/slots, check-in/out, balance, payments, history, receipts, promotions and IoT health</td><td>In-memory data from lib/parking-data.ts; six initial zones with 12 slots each</td></tr>
            </tbody>
          </table>
          <p class="muted small" style="margin:12px 0 0;">These are separate demo state stores. The map reads its zones from localStorage or initial data. Entry/exit screen confirmation handlers currently log actions rather than call the mock check-in/out APIs. There is no implemented sensor-to-database-to-WebSocket pipeline.</p>
        </div>

        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-layers"/></svg>
            <span>2D navigation and payment simulation</span>
          </div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;">The map and navigation view are drawn with SVG and CSS. Users can inspect zone occupancy, select an empty slot and play a route simulation. Both the “GPS” start and entrance start use fixed schematic coordinates; real device geolocation and React Leaflet rendering are not implemented.</p>
          <p class="small" style="color:var(--text2);margin:0;">The BKPay-style workflow selects unpaid sessions, checks a demo balance, updates in-memory payment status and creates an HTML receipt that can be printed or saved as PDF. Payments, reconciliation and IoT alerts are simulated; no live BKPay gateway or parking sensors are connected.</p>
        </div>

        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-award"/></svg>
            <span>Five demo login roles and UI access rules</span>
          </div>
          <table class="pin-table">
            <thead><tr><th>Demo role</th><th>Main UI workflow</th></tr></thead>
            <tbody>
              <tr><td><b>Student</b></td><td>Account, demo payments/history, slot selection and route simulation, incident reporting</td></tr>
              <tr><td><b>Faculty / Staff</b></td><td>Account, demo payments/history, map, slot selection and route simulation, incident reporting; grouped with students as internal users in the UI</td></tr>
              <tr><td><b>Operations</b></td><td>Entry/exit, incident tickets, gate exceptions, IoT-health view and zone settings</td></tr>
              <tr><td><b>Management</b></td><td>Pricing settings, analytics/reconciliation reports and parking overview</td></tr>
              <tr><td><b>IT</b></td><td>Internal-user and role settings</td></tr>
            </tbody>
          </table>
          <p class="muted small" style="margin:12px 0 0;">Login checks a hard-coded account list and stores user information in localStorage. These frontend checks do not provide production backend authorization or database-enforced per-user isolation.</p>
        </div>

        <div class="arch-card" style="margin-bottom:0;">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-server"/></svg>
            <span>SQL assets and current implementation limits</span>
          </div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;">The repository includes PostgreSQL schema and seed scripts for zones, parking_slots, vehicles and parking_sessions, with foreign keys, status checks and indexes. The schema enables RLS, but its demo policies allow public CRUD operations with USING (true) / WITH CHECK (true). They do not implement the five UI roles, and the running mock application is not connected to this database.</p>
          <p class="muted small" style="margin:0;">A real database connection, HCMUT SSO, authenticated backend permissions, live BKPay, physical IoT integration and durable audit logs remain future work. Browser state can be cleared, and in-memory data is not durable.</p>
        </div>
      `,
      body_vi: `
        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-server"/></svg>
            <span>Phạm vi ứng dụng và luồng dữ liệu hiện có</span>
          </div>
          <p class="small" style="color:var(--text2);margin:0 0 12px;">Nguyên mẫu quản lý bãi xe trong trường gồm các màn hình xe vào/ra, sáu khu đỗ A–F, thanh toán và lịch sử phí, báo cáo sự cố, xử lý ngoại lệ tại cổng, giám sát trạng thái IoT, cấu hình và báo cáo đối soát. Các quy trình sử dụng dữ liệu demo.</p>
          <table class="pin-table">
            <thead><tr><th>Thành phần</th><th>Chức năng đã có</th><th>Nguồn trạng thái</th></tr></thead>
            <tbody>
              <tr><td><b>Frontend Next.js</b></td><td>Các trang React 19 / TypeScript và Tailwind CSS; menu và kiểm tra quyền trên giao diện</td><td>Thông tin người dùng demo và một số trạng thái vận hành trong localStorage</td></tr>
              <tr><td><b>Máy chủ Express mock</b></td><td>13 trình xử lý HTTP: đăng nhập demo, khu/ô đỗ, xe vào/ra, tìm kiếm và báo cáo</td><td>Mảng tài khoản, sáu khu có 100 ô mỗi khu và dữ liệu báo cáo mô phỏng, lưu riêng trong bộ nhớ</td></tr>
              <tr><td><b>API route Next.js</b></td><td>13 trình xử lý HTTP trong 12 tệp route cho khu/ô đỗ, xe vào/ra, số dư, thanh toán, lịch sử, biên lai, ưu đãi và trạng thái IoT</td><td>Dữ liệu trong bộ nhớ từ lib/parking-data.ts; khởi tạo sáu khu có 12 ô mỗi khu</td></tr>
            </tbody>
          </table>
          <p class="muted small" style="margin:12px 0 0;">Các nguồn trạng thái demo này tách biệt. Bản đồ đọc khu đỗ từ localStorage hoặc dữ liệu khởi tạo. Hàm xác nhận trên màn hình xe vào/ra hiện ghi log thao tác, chưa gọi API check-in/out mô phỏng. Chưa có chuỗi đồng bộ cảm biến → cơ sở dữ liệu → WebSocket.</p>
        </div>

        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-layers"/></svg>
            <span>Sơ đồ 2D, chỉ đường và thanh toán mô phỏng</span>
          </div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;">Bản đồ và màn hình chỉ đường được vẽ bằng SVG/CSS. Người dùng xem tình trạng khu đỗ, chọn ô trống và chạy mô phỏng tuyến đường. Điểm bắt đầu “GPS” và cổng vào đều dùng tọa độ cố định trên sơ đồ; chưa lấy vị trí thật của thiết bị và chưa render bằng React Leaflet.</p>
          <p class="small" style="color:var(--text2);margin:0;">Luồng giao diện BKPay cho phép chọn phiên chưa thanh toán, kiểm tra số dư demo, cập nhật trạng thái trong bộ nhớ và tạo biên lai HTML để in hoặc lưu PDF. Thanh toán, đối soát và cảnh báo IoT đều mô phỏng; chưa kết nối cổng BKPay hoặc cảm biến bãi xe thật.</p>
        </div>

        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-award"/></svg>
            <span>Năm nhóm tài khoản demo và quyền trên giao diện</span>
          </div>
          <table class="pin-table">
            <thead><tr><th>Nhóm tài khoản demo</th><th>Quy trình giao diện chính</th></tr></thead>
            <tbody>
              <tr><td><b>Sinh viên</b></td><td>Tài khoản, thanh toán/lịch sử demo, chọn ô và mô phỏng chỉ đường, báo cáo sự cố</td></tr>
              <tr><td><b>Giảng viên / Cán bộ</b></td><td>Tài khoản, thanh toán/lịch sử demo, bản đồ, chọn ô và mô phỏng chỉ đường, báo cáo sự cố; được gộp với Sinh viên thành người dùng nội bộ trên giao diện</td></tr>
              <tr><td><b>Vận hành</b></td><td>Xe vào/ra, ticket sự cố, ngoại lệ tại cổng, trạng thái IoT và cấu hình khu đỗ</td></tr>
              <tr><td><b>Ban quản lý</b></td><td>Chính sách giá, báo cáo phân tích/đối soát và tổng quan bãi đỗ</td></tr>
              <tr><td><b>IT</b></td><td>Cấu hình tài khoản và nhóm quyền nội bộ</td></tr>
            </tbody>
          </table>
          <p class="muted small" style="margin:12px 0 0;">Đăng nhập đối chiếu danh sách tài khoản viết sẵn và lưu thông tin người dùng vào localStorage. Kiểm tra quyền ở frontend chưa cung cấp phân quyền backend ở mức production hoặc cô lập dữ liệu từng người dùng tại cơ sở dữ liệu.</p>
        </div>

        <div class="arch-card" style="margin-bottom:0;">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-server"/></svg>
            <span>Tài liệu SQL và giới hạn triển khai hiện tại</span>
          </div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;">Repository có script schema và seed PostgreSQL cho zones, parking_slots, vehicles, parking_sessions, kèm khóa ngoại, ràng buộc trạng thái và index. Schema bật RLS nhưng các policy demo cho phép CRUD công khai với USING (true) / WITH CHECK (true). Chúng chưa áp dụng năm nhóm quyền trên giao diện; ứng dụng mock hiện chưa kết nối cơ sở dữ liệu này.</p>
          <p class="muted small" style="margin:0;">Kết nối cơ sở dữ liệu thật, HCMUT SSO, phân quyền backend có xác thực, BKPay thật, phần cứng IoT và audit log bền vững vẫn là hướng phát triển. Trạng thái trình duyệt có thể bị xóa; dữ liệu trong bộ nhớ không được lưu bền vững.</p>
        </div>
      `
    }
  };

  const applyTranslations = (lang) => {
    lang = lang === 'vi' ? 'vi' : 'en';
    try {
      (window.PortfolioStorage || window.localStorage).setItem('sang_portfolio_lang', lang);
    } catch (_) {
      // Translation still works when the browser disallows persistent storage.
    }
    document.documentElement.lang = lang;

    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
      langToggle.dataset.lang = lang;
    }

    const dict = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    ['aria-label', 'alt'].forEach((attribute) => {
      document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((el) => {
        const key = el.getAttribute(`data-i18n-${attribute}`);
        if (dict[key]) el.setAttribute(attribute, dict[key]);
      });
    });

  };

  return {
    i18n,
    modalContentData,
    applyTranslations
  };
})();
