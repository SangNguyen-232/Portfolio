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
      'nav.about': 'Professional Summary',
      'nav.certification': 'Languages',
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
      'hero.tagline': 'Computer Engineering student at HCMUT. I build firmware for the ESP32-S3: FreeRTOS multitasking, TinyML running on the microcontroller, FPGA state machines in Verilog, and IoT backends that collect sensor data in the cloud.',
      'hero.cta1': 'View projects',
      'hero.cta2': 'Contact me',
      'hero.scroll': 'Scroll',
      'stats.s1': 'Projects on GitHub',
      'stats.s2': 'FreeRTOS tasks in one firmware',
      'stats.s3': 'Synthetic training samples',
      'stats.s4': 'TinyML inference time',
      'about.title': 'Professional Summary',
      'about.sub': 'Who I am and what I work on',
      'about.userPrompt': "Tell me more about Sang",
      'about.regen': 'Regenerate',
      'about.streamText': "Nguyen Van Sang is a Computer Engineering student at Ho Chi Minh City University of Technology (HCMUT), focused on embedded systems and IoT. He has written FreeRTOS firmware for the ESP32-S3, run a TinyML model on a microcontroller, designed a vending machine as a Verilog state machine on an FPGA, and built a backend that collects sensor data. In summer 2026 he interned on IoT sensor solutions at Viettel Dak Lak. He is looking for a Fresher Embedded Software Engineer role where he can learn from experienced engineers and ship firmware that runs on real hardware.",
      'do.d1.title': 'Firmware & RTOS',
      'do.d1.desc': 'Concurrent firmware for ESP32 and ESP32-S3 on FreeRTOS: tasks, queues, mutexes and event groups, with drivers for I2C, GPIO and UART.',
      'do.d2.title': 'Edge AI & TinyML',
      'do.d2.desc': 'A small TensorFlow Lite Micro classifier running on the microcontroller, with a hardware interlock so the pump relay only switches on when conditions allow.',
      'do.d3.title': 'FPGA & Digital Design',
      'do.d3.desc': 'Finite state machines and digital logic in Verilog, built with Vivado and Cadence Xcelium and running on a Digilent Arty-Z7 board.',
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
      'proj.p2.title': 'FPGA Vending Machine Simulator',
      'proj.p2.b1': 'Designed a vending machine as a Verilog finite state machine and implemented it on a Digilent Arty-Z7 board.',
      'proj.p2.b2': 'The state machine handles product selection, coin validation, balance calculation and change return.',
      'proj.p2.b3': 'Wrote the hardware interfaces for a 16x2 LCD, 7-segment displays and debounced push buttons.',
      'proj.p3.title': 'Smart Campus Parking Management System',
      'proj.p3.b1': 'Built 6 REST APIs that keep parking-slot status from IoT sensors in sync across 6 zones.',
      'proj.p3.b2': 'Integrated the BKPay payment gateway for online payments and balance management.',
      'proj.p3.b3': 'Built a 2D GPS map with React Leaflet and restricted access for 5 user roles with PostgreSQL Row-Level Security.',
      'proj.inspect': 'System architecture',
      'proj.m1': 'FreeRTOS tasks',
      'proj.m2': 'TinyML inference',
      'proj.m3': 'training samples',
      'proj.inspectFSM': 'FSM & RTL design',
      'proj.inspectCloud': 'Cloud & RLS design',
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
      'toast.copied': 'Email copied to clipboard!'
    },
    vi: {
      'nav.about': 'Tóm tắt chuyên môn',
      'nav.certification': 'Ngoại ngữ',
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
      'hero.tagline': 'Sinh viên Kỹ thuật Máy tính tại ĐH Bách khoa TP.HCM. Tôi viết firmware cho ESP32-S3: đa nhiệm FreeRTOS, TinyML chạy trực tiếp trên vi điều khiển, máy trạng thái FPGA bằng Verilog và backend IoT thu thập dữ liệu cảm biến lên cloud.',
      'hero.cta1': 'Xem dự án',
      'hero.cta2': 'Liên hệ',
      'hero.scroll': 'Cuộn xuống',
      'stats.s1': 'Dự án có mã nguồn trên GitHub',
      'stats.s2': 'Tác vụ FreeRTOS trong một firmware',
      'stats.s3': 'Mẫu dữ liệu huấn luyện tổng hợp',
      'stats.s4': 'Thời gian suy luận TinyML',
      'about.title': 'Tóm Tắt Chuyên Môn',
      'about.sub': 'Giới thiệu ngắn về tôi và hướng chuyên môn',
      'about.userPrompt': 'Hãy giới thiệu về Sang',
      'about.regen': 'Phát lại',
      'about.streamText': "Nguyễn Văn Sang là sinh viên Kỹ thuật Máy tính tại Trường Đại học Bách khoa – ĐHQG-HCM, tập trung vào hệ thống nhúng và IoT. Anh đã viết firmware FreeRTOS cho ESP32-S3, chạy mô hình TinyML trên vi điều khiển, thiết kế máy bán hàng tự động bằng FSM Verilog trên FPGA và xây dựng backend thu thập dữ liệu cảm biến. Mùa hè năm 2026, anh thực tập về giải pháp cảm biến IoT tại Viettel Đắk Lắk. Anh đang tìm vị trí Fresher Embedded Software Engineer để học hỏi từ các kỹ sư giàu kinh nghiệm và làm ra firmware chạy trên phần cứng thật.",
      'do.d1.title': 'Firmware & RTOS',
      'do.d1.desc': 'Firmware đa nhiệm cho ESP32 và ESP32-S3 trên FreeRTOS: task, queue, mutex, event group, kèm driver cho I2C, GPIO và UART.',
      'do.d2.title': 'Edge AI & TinyML',
      'do.d2.desc': 'Mô hình TensorFlow Lite Micro nhỏ chạy trực tiếp trên vi điều khiển, kèm khóa an toàn phần cứng để rơ-le bơm chỉ bật khi điều kiện cho phép.',
      'do.d3.title': 'FPGA & Thiết kế số',
      'do.d3.desc': 'Máy trạng thái hữu hạn và logic số viết bằng Verilog, dùng Vivado và Cadence Xcelium, chạy trên bo Digilent Arty-Z7.',
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
      'proj.p2.title': 'Mô phỏng máy bán hàng tự động trên FPGA',
      'proj.p2.b1': 'Thiết kế máy bán hàng tự động bằng FSM Verilog và triển khai trên bo Digilent Arty-Z7.',
      'proj.p2.b2': 'FSM xử lý chọn sản phẩm, nhận diện tiền xu, tính số dư và trả tiền thừa.',
      'proj.p2.b3': 'Viết giao tiếp phần cứng cho LCD 16x2, LED 7 đoạn và nút nhấn có chống dội.',
      'proj.p3.title': 'Hệ thống quản lý bãi đỗ xe thông minh trong khuôn viên trường',
      'proj.p3.b1': 'Xây dựng 6 REST API đồng bộ trạng thái chỗ đỗ từ cảm biến IoT trên 6 khu vực.',
      'proj.p3.b2': 'Tích hợp cổng thanh toán BKPay để thanh toán trực tuyến và quản lý số dư.',
      'proj.p3.b3': 'Làm bản đồ GPS 2D bằng React Leaflet và phân quyền cho 5 nhóm người dùng bằng PostgreSQL Row-Level Security.',
      'proj.inspect': 'Kiến trúc hệ thống',
      'proj.m1': 'tác vụ FreeRTOS',
      'proj.m2': 'suy luận TinyML',
      'proj.m3': 'mẫu huấn luyện',
      'proj.inspectFSM': 'Thiết kế FSM & RTL',
      'proj.inspectCloud': 'Thiết kế Cloud & RLS',
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
      'toast.copied': 'Đã sao chép địa chỉ email vào bộ nhớ tạm!'
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
            <div class="arch-step"><b>Task_SensorSampling</b><span>Core 0 • Period: 50ms</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>xQueueSendToBack</b><span>Sensor Data Packet Queue</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>Task_TinyMLInference</b><span>Core 1 • &lt;1ms TFLite</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>xSemaphoreMutex</b><span>Guards shared state</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>Task_PumpSafety</b><span>Core 0 • Relay Safe Interlock</span></div>
          </div>
          <p class="muted small" style="margin:0;">Tasks pass data through FreeRTOS queues, and shared state is guarded by a mutex so sensor sampling and network streaming do not overwrite each other.</p>
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
              <tr><td><b>GPIO 21</b></td><td>I2C0 SDA</td><td>SHT31 / BME280 Sensor Bus</td><td>4.7kΩ Pull-Up, 400kHz</td></tr>
              <tr><td><b>GPIO 22</b></td><td>I2C0 SCL</td><td>Hardware Clock Line</td><td>Master Clock Output</td></tr>
              <tr><td><b>GPIO 4</b></td><td>ADC1_CH3</td><td>Capacitive Soil Moisture Probe</td><td>12-bit Resolution (0–3.3V)</td></tr>
              <tr><td><b>GPIO 18</b></td><td>Digital Out</td><td>5V Submersible Pump Relay</td><td>Active-HIGH Optocoupler</td></tr>
              <tr><td><b>GPIO 0</b></td><td>Ext Interrupt</td><td>Factory Reset / SoftAP Toggle</td><td>FALLING Edge ISR Trigger</td></tr>
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
            <div class="arch-step"><b>Task_SensorSampling</b><span>Lõi 0 • Chu kỳ: 50ms</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>xQueueSendToBack</b><span>Hàng đợi Gói dữ liệu</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>Task_TinyMLInference</b><span>Lõi 1 • &lt;1ms TFLite</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>xSemaphoreMutex</b><span>Bảo vệ dữ liệu dùng chung</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>Task_PumpSafety</b><span>Lõi 0 • Điều khiển Relay Bơm</span></div>
          </div>
          <p class="muted small" style="margin:0;">Các task trao đổi dữ liệu qua queue của FreeRTOS, còn trạng thái dùng chung được bảo vệ bằng mutex để việc đọc cảm biến và truyền dữ liệu qua mạng không ghi đè lên nhau.</p>
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
              <tr><td><b>GPIO 21</b></td><td>I2C0 SDA</td><td>Cảm biến môi trường SHT31 / BME280</td><td>Kéo lên 4.7kΩ, 400kHz</td></tr>
              <tr><td><b>GPIO 22</b></td><td>I2C0 SCL</td><td>Đường xung nhịp phần cứng</td><td>Xung nhịp Master Clock</td></tr>
              <tr><td><b>GPIO 4</b></td><td>ADC1_CH3</td><td>Cảm biến đo độ ẩm đất điện dung</td><td>Độ phân giải 12-bit (0–3.3V)</td></tr>
              <tr><td><b>GPIO 18</b></td><td>Digital Out</td><td>Module Relay Kích Bơm Nước 5V</td><td>Cách ly Quang Optocoupler</td></tr>
              <tr><td><b>GPIO 0</b></td><td>Ngắt ngoài ISR</td><td>Nút bấm Reset / Chuyển SoftAP</td><td>Kích hoạt sườn âm (FALLING)</td></tr>
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
      title_en: 'FPGA Vending Machine — RTL & FSM Architecture',
      title_vi: 'Mô phỏng Máy bán hàng FPGA — Kiến trúc RTL & FSM',
      sub_en: 'Digilent Arty-Z7 (Xilinx Zynq-7000) · Verilog HDL · Vivado Synthesis',
      sub_vi: 'Digilent Arty-Z7 (Xilinx Zynq-7000) · Ngôn ngữ Verilog HDL · Tổng hợp Vivado',
      body_en: `
        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-cpu"/></svg>
            <span>Finite State Machine (FSM) State Diagram</span>
          </div>
          <div class="arch-pipeline">
            <div class="arch-step"><b>S_IDLE</b><span>Display Ready (0 VND)</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>S_COIN_VAL</b><span>Validate 5k / 10k / 20k</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>S_SEL_ITEM</b><span>Evaluate Product Price</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>S_DISPENSE</b><span>Dispense Pulse Actuation</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>S_RETURN_CHG</b><span>Calculate & Return Change</span></div>
          </div>
          <p class="muted small" style="margin:0;">A synchronous state machine implemented on the Xilinx Zynq-7000 logic fabric and clocked at 100 MHz.</p>
        </div>

        <div class="arch-card" style="margin-bottom:0;">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-layers"/></svg>
            <span>Verilog RTL Hardware Submodules</span>
          </div>
          <table class="pin-table">
            <thead>
              <tr><th>Submodule</th><th>Clock Domain</th><th>Hardware Interface</th><th>Function</th></tr>
            </thead>
            <tbody>
              <tr><td><b>clk_divider</b></td><td>100MHz ➔ 1kHz</td><td>Internal clock</td><td>Debounce sampling & display refresh timing</td></tr>
              <tr><td><b>button_debouncer</b></td><td>1kHz Sample</td><td>Tactical Push Switches</td><td>4-stage shift register filters switch bounce</td></tr>
              <tr><td><b>lcd1602_ctrl</b></td><td>Synchronous</td><td>4-bit Parallel Bus</td><td>Initializes LCD, renders balance & product names</td></tr>
              <tr><td><b>seg7_multiplexer</b></td><td>500Hz Scan</td><td>4-Digit Common Anode</td><td>High-frequency time-multiplexed balance readout</td></tr>
            </tbody>
          </table>
        </div>
      `,
      body_vi: `
        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-cpu"/></svg>
            <span>Biểu đồ Máy Trạng thái Hữu hạn (FSM)</span>
          </div>
          <div class="arch-pipeline">
            <div class="arch-step"><b>S_IDLE</b><span>Sẵn sàng (Số dư: 0đ)</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>S_COIN_VAL</b><span>Nhận tiền 5k / 10k / 20k</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>S_SEL_ITEM</b><span>Chọn món & So khớp giá</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>S_DISPENSE</b><span>Phát xung trả hàng</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>S_RETURN_CHG</b><span>Tính toán & Trả tiền thừa</span></div>
          </div>
          <p class="muted small" style="margin:0;">Máy trạng thái đồng bộ được triển khai trên phần logic của Xilinx Zynq-7000, xung nhịp 100 MHz.</p>
        </div>

        <div class="arch-card" style="margin-bottom:0;">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-layers"/></svg>
            <span>Các Khối Phần cứng Verilog RTL Phân rã</span>
          </div>
          <table class="pin-table">
            <thead>
              <tr><th>Khối RTL</th><th>Miền Xung nhịp</th><th>Giao tiếp Phần cứng</th><th>Chức năng</th></tr>
            </thead>
            <tbody>
              <tr><td><b>clk_divider</b></td><td>100MHz ➔ 1kHz</td><td>Bộ chia tần nội</td><td>Tạo xung nhịp chống dội và quét màn hình</td></tr>
              <tr><td><b>button_debouncer</b></td><td>Lấy mẫu 1kHz</td><td>Phím bấm cơ học</td><td>Thanh ghi dịch 4 tầng lọc nhiễu rung phím</td></tr>
              <tr><td><b>lcd1602_ctrl</b></td><td>Đồng bộ</td><td>Bus song song 4-bit</td><td>Khởi tạo LCD 16x2, hiển thị số dư và tên món</td></tr>
              <tr><td><b>seg7_multiplexer</b></td><td>Quét 500Hz</td><td>4 LED 7 đoạn Anode chung</td><td>Quét ghép kênh thời gian hiển thị số tiền tức thì</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    'modal-proj3': {
      title_en: 'Smart Campus Parking — Cloud & Security Architecture',
      title_vi: 'Quản lý Bãi đỗ xe Thông minh — Kiến trúc Đám mây & Bảo mật',
      sub_en: 'Next.js 16 · Express REST APIs · PostgreSQL Row-Level Security · Leaflet',
      sub_vi: 'Next.js 16 · Express REST APIs · PostgreSQL Row-Level Security · Leaflet',
      body_en: `
        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-server"/></svg>
            <span>Telemetry Pipeline: Edge IoT to Next.js 16 Dashboard</span>
          </div>
          <div class="arch-pipeline">
            <div class="arch-step"><b>Barrier / Slot Sensors</b><span>IoT Trigger Nodes</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>Express REST APIs</b><span>6 REST endpoints</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>PostgreSQL RLS</b><span>Database Security Layer</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>WebSocket Events</b><span>Live Slot State Push</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>React Leaflet Map</b><span>Interactive 2D Campus View</span></div>
          </div>
        </div>

        <div class="arch-card" style="margin-bottom:0;">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-award"/></svg>
            <span>Access control for 5 roles with PostgreSQL Row-Level Security</span>
          </div>
          <table class="pin-table">
            <thead>
              <tr><th>Role Tier</th><th>Access Scope</th><th>RLS Security Policy</th></tr>
            </thead>
            <tbody>
              <tr><td><b>Student / Visitor</b></td><td>Public Available Lots & Personal Vehicles</td><td><code>SELECT WHERE user_id = auth.uid()</code></td></tr>
              <tr><td><b>Faculty Member</b></td><td>Reserved Priority Zones & Faculty Lots</td><td><code>SELECT/UPDATE WHERE zone_type = 'faculty'</code></td></tr>
              <tr><td><b>Parking Attendant</b></td><td>Live Gate Control & Manual License Override</td><td><code>UPDATE lot_status, INSERT gate_log</code></td></tr>
              <tr><td><b>Finance Officer</b></td><td>BKPay Transaction Reconciliations</td><td><code>SELECT/AUDIT payment_transactions</code></td></tr>
              <tr><td><b>Super Administrator</b></td><td>Full Campus Configuration & IoT Node Health</td><td><code>ALL PRIVILEGES WITH SYSTEM AUDIT</code></td></tr>
            </tbody>
          </table>
        </div>
      `,
      body_vi: `
        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-server"/></svg>
            <span>Đường ống Dữ liệu: Từ Cảm biến IoT đến Dashboard Next.js 16</span>
          </div>
          <div class="arch-pipeline">
            <div class="arch-step"><b>Cảm biến Barrier / Ô đỗ</b><span>Nút kích hoạt IoT</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>Express REST APIs</b><span>6 REST endpoint</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>PostgreSQL RLS</b><span>Bảo mật hàng tại tầng Database</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>WebSocket Stream</b><span>Bắn sự kiện trạng thái chỗ trống</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>Bản đồ React Leaflet</b><span>Giao diện 2D thời gian thực</span></div>
          </div>
        </div>

        <div class="arch-card" style="margin-bottom:0;">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-award"/></svg>
            <span>Phân quyền 5 nhóm người dùng bằng PostgreSQL Row-Level Security</span>
          </div>
          <table class="pin-table">
            <thead>
              <tr><th>Cấp Phân quyền</th><th>Phạm vi Truy cập</th><th>Chính sách Bảo mật RLS</th></tr>
            </thead>
            <tbody>
              <tr><td><b>Sinh viên / Khách vãng lai</b></td><td>Xem chỗ trống và thông tin xe cá nhân</td><td><code>SELECT WHERE user_id = auth.uid()</code></td></tr>
              <tr><td><b>Cán bộ Giảng viên</b></td><td>Khu vực đỗ xe ưu tiên và lối vào giảng viên</td><td><code>SELECT/UPDATE WHERE zone_type = 'faculty'</code></td></tr>
              <tr><td><b>Nhân viên Trực bãi xe</b></td><td>Điều khiển Barrier & Ghi đè biển số thủ công</td><td><code>UPDATE lot_status, INSERT gate_log</code></td></tr>
              <tr><td><b>Kế toán Tài chính</b></td><td>Đối soát giao dịch nạp/trừ tiền cổng BKPay</td><td><code>SELECT/AUDIT payment_transactions</code></td></tr>
              <tr><td><b>Quản trị viên Hệ thống</b></td><td>Toàn quyền cấu hình bãi đỗ & theo dõi Node IoT</td><td><code>ALL PRIVILEGES WITH SYSTEM AUDIT</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    }
  };

  const applyTranslations = (lang) => {
    localStorage.setItem('sang_portfolio_lang', lang);
    document.documentElement.lang = lang;

    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
      langToggle.dataset.lang = lang;
    }

    const dict = i18n[lang] || i18n.en;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    const heroName = document.querySelector('.hero-name');
    if (heroName && dict['hero.name']) {
      heroName.setAttribute('data-text', dict['hero.name']);
    }
  };

  return {
    i18n,
    modalContentData,
    applyTranslations
  };
})();