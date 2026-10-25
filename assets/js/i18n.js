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
      'nav.about': 'Summary',
      'nav.certification': 'Languages',
      'nav.experience': 'Experience',
      'nav.projects': 'Projects',
      'nav.skills': 'Skills',
      'nav.education': 'Education',
      'nav.contact': 'Contact',
      'nav.resume': 'View CV',
      'loader.text': 'Booting ESP32-S3 firmware',
      'hero.status': 'Open to Fresher Embedded Software roles',
      'hero.greet': 'Hi, I am',
      'hero.name': 'Nguyen Van Sang',
      'hero.title': 'Embedded Software Engineer — Fresher',
      'hero.tagline': 'I engineer production-ready firmware on real hardware: concurrent FreeRTOS tasks, on-device TinyML, FPGA state machines, and end-to-end IoT cloud pipelines.',
      'hero.cta1': 'Explore projects',
      'hero.cta2': 'Get in touch',
      'hero.scroll': 'Scroll',
      'stats.s1': 'Hardware & Cloud Projects',
      'stats.s2': 'Concurrent FreeRTOS Tasks',
      'stats.s3': 'Rows Synthetic Training Data',
      'stats.s4': 'On-Device Inference',
      'about.title': 'Professional Summary',
      'about.sub': 'Interactive neural assistant & engineering profile',
      'about.userPrompt': "Tell me more about Sang",
      'about.regen': 'Regenerate',
      'about.streamText': "Nguyen Van Sang is a final-year Computer Engineering student specializing in IoT and Embedded Systems. He has gained practical experience through academic projects and an on-site internship at Viettel Dak Lak (Viettel Group). He is seeking a Fresher Embedded Software Engineer position to further develop his technical skills, gain industry experience, and grow alongside experienced engineers in a professional environment.",
      'do.d1.title': 'Firmware & RTOS',
      'do.d1.desc': 'Architecting robust concurrent firmware on ESP32/ESP32-S3 using FreeRTOS: semaphores, queues, event groups, task synchronization, and low-level peripheral drivers (I2C, GPIO, UART).',
      'do.d2.title': 'Edge AI & TinyML',
      'do.d2.desc': 'Deploying optimized TensorFlow Lite for Microcontrollers models on constrained MCUs. Sub-1 ms on-device inference with hardware safety interlocks for real-time sensor classification.',
      'do.d3.title': 'FPGA & Digital Design',
      'do.d3.desc': 'Designing and synthesizing finite state machines (FSM) and digital logic with Verilog HDL on Xilinx Vivado, Cadence Xcelium, and Digilent Arty-Z7 FPGA hardware platforms.',
      'exp.title': 'Experience',
      'exp.sub': 'Practical industry engineering and internships',
      'exp.role': 'IoT Intern',
      'exp.company': 'Viettel Dak Lak — Viettel Group',
      'exp.type': 'On-site',
      'exp.b1': 'Learned fundamentals of IoT architectures, industrial sensor interfacing, and low-level ESP32 programming.',
      'exp.b2': 'Explored enterprise IoT fleet management platforms and robust backend development with Node.js and PostgreSQL.',
      'exp.b3': 'Built an end-to-end IoT sensor solution integrating hardware telemetry with secure cloud logging.',
      'proj.title': 'Projects',
      'proj.sub': 'Verified hardware and software implementations',
      'proj.p1.title': 'Smart Agriculture Environmental Monitoring System',
      'proj.p1.b1': 'Engineered concurrent FreeRTOS firmware on ESP32-S3 with semaphore-guarded context coordinating 7 tasks (sampling, TinyML inference, pump relay, logging, reset button, LED indicator) across I2C, GPIO, and network.',
      'proj.p1.b2': 'Deployed a float32 TensorFlow Lite Micro classifier (temperature, humidity, soil moisture to 3-class risk) with sub-1 ms inference and hardware safety interlocks.',
      'proj.p1.b3': 'Implemented WiFi AP fallback with LittleFS-persisted networks, streaming telemetry via HTTP/WebSocket to a Dockerized Node.js/PostgreSQL fleet dashboard.',
      'proj.p2.title': 'FPGA Vending Machine Simulator',
      'proj.p2.b1': 'Designed and synthesized a complete Verilog FSM-based vending machine on Digilent Arty-Z7 FPGA board.',
      'proj.p2.b2': 'Engineered finite state machine logic handling synchronous product selection, coin validation, balance computation, and change dispensing.',
      'proj.p2.b3': 'Implemented real-time hardware interfaces for 16x2 alphanumeric LCD display, 7-segment LED counters, and debounced tactical switches.',
      'proj.p3.title': 'Smart Campus Parking Management System',
      'proj.p3.b1': 'Engineered 6 RESTful APIs to synchronize real-time IoT sensor slot status across 6 parking zones with sub-second response times.',
      'proj.p3.b2': 'Integrated automated payment processing and balance management with BKPay payment gateway integration.',
      'proj.p3.b3': 'Developed an interactive 2D GPS map component using React Leaflet and enforced strict multi-role access via PostgreSQL Row-Level Security (RLS) for 5 user tiers.',
      'proj.inspect': 'System Architecture',
      'proj.m1': 'FreeRTOS tasks',
      'proj.m2': 'TinyML inference',
      'proj.m3': 'training rows',
      'proj.inspectFSM': 'FSM & Hardware RTL',
      'proj.inspectCloud': 'Cloud & RLS Pipeline',
      'skills.title': 'Technical Skills',
      'skills.sub': 'Technologies verified from hardware implementations and CV',
      'skills.c1': 'Programming Languages',
      'skills.c2': 'Embedded Systems & RTOS',
      'skills.c3': 'Edge AI & TinyML',
      'skills.c4': 'FPGA & Digital Design',
      'skills.c5': 'Development Tools',
      'skills.c6': 'IoT Backend & Web',
      'edu.title': 'Education',
      'edu.sub': 'Formal academic training',
      'cert.secTitle': 'Languages & Certification',
      'cert.secSub': 'English proficiency and standardized certification',
      'edu.school': 'Ho Chi Minh City University of Technology — VNU-HCM',
      'edu.degree': 'Bachelor of Computer Engineering',
      'edu.period': 'Sep 2022 – Nov 2027 • Ho Chi Minh City, Vietnam',
      'edu.langsTitle': 'Language Proficiency',
      'edu.langEn': 'English',
      'edu.langVi': 'Vietnamese',
      'lang.levelEn': 'B1 Intermediate',
      'lang.levelVi': 'Native',
      'cert.title': 'Language Certification',
      'cert.sub': 'Standardized English listening and reading assessment',
      'cert.c1.name': 'TOEIC (Listening & Reading)',
      'cert.c1.date': 'Dec 2026 • Educational Testing Service (ETS)',
      'contact.status': 'Open to Fresher Opportunities',
      'contact.title': "Let's Build Something Together",
      'contact.desc': 'I am actively seeking a Fresher Embedded Software Engineer role in Ho Chi Minh City or remote. Feel free to reach out via email, phone, or LinkedIn.',
      'contact.copy': 'Copy Email',
      'shortcut.led': 'Toggle LED borders',
      'footer.totop': 'Back to Top',
      'toast.copied': 'Email copied to clipboard!'
    },
    vi: {
      'nav.about': 'Tóm tắt',
      'nav.certification': 'Ngoại ngữ',
      'nav.experience': 'Kinh nghiệm',
      'nav.projects': 'Dự án',
      'nav.skills': 'Kỹ năng',
      'nav.education': 'Học vấn',
      'nav.contact': 'Liên hệ',
      'nav.resume': 'Xem CV',
      'loader.text': 'Đang khởi động firmware ESP32-S3',
      'hero.status': 'Sẵn sàng ứng tuyển Fresher Embedded Software',
      'hero.greet': 'Xin chào, tôi là',
      'hero.name': 'Nguyễn Văn Sang',
      'hero.title': 'Kỹ sư Phần mềm Nhúng — Fresher',
      'hero.tagline': 'Tôi phát triển firmware chạy trực tiếp trên phần cứng thực tế: đa nhiệm FreeRTOS đồng thời, suy luận TinyML tại biên, máy trạng thái FPGA, và nền tảng đám mây thu thập dữ liệu IoT.',
      'hero.cta1': 'Xem các dự án',
      'hero.cta2': 'Liên hệ ngay',
      'hero.scroll': 'Cuộn xuống',
      'stats.s1': 'Dự án phần cứng & cloud',
      'stats.s2': 'Tác vụ FreeRTOS đồng thời',
      'stats.s3': 'Dòng dữ liệu huấn luyện tổng hợp',
      'stats.s4': 'Độ trễ suy luận tại biên',
      'about.title': 'Tóm Tắt Chuyên Môn',
      'about.sub': 'Trợ lý AI tương tác & hồ sơ kỹ thuật',
      'about.userPrompt': 'Tóm tắt nhanh định hướng kỹ thuật của Nguyễn Văn Sang.',
      'about.regen': 'Phát lại',
      'about.streamText': "Nguyễn Văn Sang là sinh viên năm cuối ngành Kỹ thuật Máy tính, chuyên sâu về IoT và Hệ thống Nhúng. Anh đã tích lũy kinh nghiệm thực tế qua các dự án học thuật và kỳ thực tập trực tiếp tại Viettel Đắk Lắk (Tập đoàn Viettel). Anh đang tìm kiếm vị trí Fresher Embedded Software Engineer để tiếp tục phát triển kỹ năng kỹ thuật, tích lũy kinh nghiệm trong ngành và trưởng thành cùng các kỹ sư giàu kinh nghiệm trong môi trường chuyên nghiệp.",
      'do.d1.title': 'Firmware & RTOS',
      'do.d1.desc': 'Thiết kế kiến trúc firmware đa nhiệm mạnh mẽ trên ESP32/ESP32-S3 sử dụng FreeRTOS: semaphore, queue, event group, đồng bộ hóa tác vụ và lập trình ngoại vi cấp thấp (I2C, GPIO, UART).',
      'do.d2.title': 'Edge AI & TinyML',
      'do.d2.desc': 'Triển khai mô hình TensorFlow Lite for Microcontrollers tối ưu hóa trên vi điều khiển. Suy luận thời gian thực dưới 1 ms kèm cơ chế khóa an toàn phần cứng khi cảm biến quá ngưỡng.',
      'do.d3.title': 'FPGA & Thiết kế số',
      'do.d3.desc': 'Thiết kế và tổng hợp mạch logic số, máy trạng thái FSM bằng ngôn ngữ Verilog HDL trên phần mềm Xilinx Vivado, Cadence Xcelium và bo mạch Digilent Arty-Z7 FPGA.',
      'exp.title': 'Kinh Nghiệm',
      'exp.sub': 'Kinh nghiệm kỹ thuật thực tế và thực tập doanh nghiệp',
      'exp.role': 'Thực tập sinh IoT',
      'exp.company': 'Viettel Đắk Lắk — Tập đoàn Công nghiệp – Viễn thông Quân đội (Viettel)',
      'exp.type': 'Trực tiếp (On-site)',
      'exp.b1': 'Học hỏi và nắm vững nguyên lý cơ bản về IoT, giao tiếp cảm biến công nghiệp và lập trình vi điều khiển ESP32.',
      'exp.b2': 'Nghiên cứu kiến trúc nền tảng IoT và phát triển hệ thống backend xử lý dữ liệu với Node.js và PostgreSQL.',
      'exp.b3': 'Xây dựng giải pháp IoT hoàn chỉnh kết nối thiết bị cảm biến ESP32 và truyền dữ liệu an toàn lên máy chủ.',
      'proj.title': 'Dự Án',
      'proj.sub': 'Các dự án phần cứng và phần mềm đã được xác thực',
      'proj.p1.title': 'Hệ thống Giám sát Môi trường Nông nghiệp Thông minh',
      'proj.p1.b1': 'Phát triển firmware FreeRTOS đồng thời trên ESP32-S3 với context dùng chung bảo vệ bằng semaphore, điều phối 7 tác vụ (đọc cảm biến, suy luận TinyML, kích rơ-le máy bơm, ghi nhật ký, nút nhấn reset, đèn LED) qua I2C, GPIO và mạng.',
      'proj.p1.b2': 'Triển khai mô hình phân loại float32 TensorFlow Lite Micro (nhiệt độ, độ ẩm, độ ẩm đất thành 3 cấp rủi ro) với thời gian suy luận dưới 1 ms và chốt an toàn phần cứng.',
      'proj.p1.b3': 'Tích hợp cơ chế WiFi AP dự phòng lưu cấu hình LittleFS, truyền dữ liệu thời gian thực qua HTTP/WebSocket đến hệ thống quản lý hạm đội Node.js/PostgreSQL đóng gói Docker.',
      'proj.p2.title': 'Mô phỏng Máy bán hàng Tự động trên FPGA',
      'proj.p2.b1': 'Thiết kế và tổng hợp hoàn chỉnh máy bán hàng tự động dựa trên FSM bằng Verilog trên bo mạch Digilent Arty-Z7 FPGA.',
      'proj.p2.b2': 'Lập trình logic máy trạng thái xử lý đồng bộ việc chọn mặt hàng, nhận diện mệnh giá tiền xu, tính số dư và trả lại tiền thừa.',
      'proj.p2.b3': 'Hiện thực giao tiếp phần cứng thời gian thực cho màn hình LCD ký tự 16x2, LED 7 đoạn hiển thị số tiền và hệ thống nút gạt chống rung phím.',
      'proj.p3.title': 'Hệ thống Quản lý Bãi đỗ xe Khuôn viên Đại học Thông minh',
      'proj.p3.b1': 'Xây dựng 6 API RESTful đồng bộ hóa trạng thái vị trí đỗ xe từ cảm biến IoT theo thời gian thực qua 6 phân khu với độ trễ dưới một giây.',
      'proj.p3.b2': 'Tích hợp quy trình thanh toán trực tuyến tự động và quản lý số dư qua cổng thanh toán BKPay.',
      'proj.p3.b3': 'Phát triển giao diện bản đồ GPS 2D tương tác bằng React Leaflet và kiểm soát phân quyền đa người dùng qua chính sách bảo mật Row-Level Security (RLS) của PostgreSQL.',
      'proj.inspect': 'Kiến trúc hệ thống',
      'proj.m1': 'tác vụ FreeRTOS',
      'proj.m2': 'suy luận TinyML',
      'proj.m3': 'dòng dữ liệu huấn luyện',
      'proj.inspectFSM': 'FSM & Thiết kế RTL',
      'proj.inspectCloud': 'Hạ tầng Cloud & RLS',
      'skills.title': 'Kỹ Năng Chuyên Môn',
      'skills.sub': 'Các công nghệ được xác minh qua dự án phần cứng thực tế và CV',
      'skills.c1': 'Ngôn ngữ lập trình',
      'skills.c2': 'Hệ thống nhúng & RTOS',
      'skills.c3': 'Edge AI & TinyML',
      'skills.c4': 'FPGA & Thiết kế số',
      'skills.c5': 'Công cụ phát triển',
      'skills.c6': 'IoT Backend & Web',
      'edu.title': 'Học Vấn',
      'edu.sub': 'Đào tạo chính quy',
      'cert.secTitle': 'Ngoại Ngữ & Chứng Chỉ',
      'cert.secSub': 'Trình độ tiếng Anh và chứng chỉ chuẩn hóa',
      'edu.school': 'Trường Đại học Bách khoa – ĐHQG-HCM',
      'edu.degree': 'Cử nhân Kỹ thuật Máy tính',
      'edu.period': 'Tháng 9/2022 – Tháng 11/2027 • TP. Hồ Chí Minh, Việt Nam',
      'edu.langsTitle': 'Ngoại ngữ',
      'edu.langEn': 'Tiếng Anh',
      'edu.langVi': 'Tiếng Việt',
      'lang.levelEn': 'Trung cấp (B1)',
      'lang.levelVi': 'Bản ngữ',
      'cert.title': 'Chứng chỉ ngoại ngữ',
      'cert.sub': 'Đánh giá chuẩn hóa kỹ năng Nghe và Đọc tiếng Anh',
      'cert.c1.name': 'TOEIC (Kỹ năng Nghe & Đọc)',
      'cert.c1.date': 'Tháng 12/2026 • Viện Khảo thí Giáo dục Hoa Kỳ (ETS)',
      'contact.status': 'Sẵn sàng đón nhận cơ hội nghề nghiệp',
      'contact.title': 'Cùng Nhau Tạo Nên Giá Trị Thực',
      'contact.desc': 'Tôi đang tích cực tìm kiếm cơ hội Kỹ sư Phần mềm Nhúng Fresher tại TP. Hồ Chí Minh hoặc làm việc từ xa. Rất mong được kết nối qua email, điện thoại hoặc LinkedIn.',
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
            <span>FreeRTOS Task Concurrency & Semaphore IPC Pipeline</span>
          </div>
          <div class="arch-pipeline">
            <div class="arch-step"><b>Task_SensorSampling</b><span>Core 0 • Period: 50ms</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>xQueueSendToBack</b><span>Sensor Data Packet Queue</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>Task_TinyMLInference</b><span>Core 1 • &lt;1ms TFLite</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>xSemaphoreMutex</b><span>Zero Race Conditions</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>Task_PumpSafety</b><span>Core 0 • Relay Safe Interlock</span></div>
          </div>
          <p class="muted small" style="margin:0;">Inter-task communication is synchronized via FreeRTOS Queues and protected by mutex semaphores, ensuring zero data races between hardware sensors and network streaming.</p>
        </div>

        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-chip"/></svg>
            <span>Hardware GPIO & Peripheral Allocation Matrix</span>
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
            <span>Fail-Safe WiFi SoftAP Fallback & Cloud Fleet Telemetry</span>
          </div>
          <p class="small" style="color:var(--text2);margin:0 0 8px;">If the primary farm WiFi gateway drops out, ESP32-S3 automatically shifts into SoftAP mode via LittleFS credentials, serving an onboard emergency captive portal. When reconnected, queued telemetry syncs via WebSocket/HTTP to a Dockerized Node.js & PostgreSQL fleet dashboard.</p>
        </div>
      `,
      body_vi: `
        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-layers"/></svg>
            <span>Đa nhiệm Tác vụ FreeRTOS & Luồng IPC Semaphore</span>
          </div>
          <div class="arch-pipeline">
            <div class="arch-step"><b>Task_SensorSampling</b><span>Lõi 0 • Chu kỳ: 50ms</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>xQueueSendToBack</b><span>Hàng đợi Gói dữ liệu</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>Task_TinyMLInference</b><span>Lõi 1 • &lt;1ms TFLite</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>xSemaphoreMutex</b><span>Khóa Mutex loại bỏ xung đột</span></div>
            <span class="arch-sep">➔</span>
            <div class="arch-step"><b>Task_PumpSafety</b><span>Lõi 0 • Điều khiển Relay Bơm</span></div>
          </div>
          <p class="muted small" style="margin:0;">Giao tiếp giữa các tác vụ độc lập được đồng bộ hóa hoàn toàn qua hàng đợi FreeRTOS Queue và khóa Mutex Semaphore, đảm bảo không có hiện tượng Race Condition giữa cảm biến và luồng phát sóng mạng.</p>
        </div>

        <div class="arch-card">
          <div class="arch-card-title">
            <svg class="ic" style="width:16px;height:16px;color:var(--amber);"><use href="#i-chip"/></svg>
            <span>Ma trận Phân bổ Chân Phần cứng GPIO</span>
          </div>
          <table class="pin-table">
            <thead>
              <tr><th>Chân</th><th>Ngoại vi</th><th>Giao tiếp Thiết bị</th><th>Chế độ hoạt động</th></tr>
            </thead>
            <tbody>
              <tr><td><b>GPIO 21</b></td><td>I2C0 SDA</td><td>Cảm biến môi trường SHT31</td><td>Kéo lên 4.7kΩ, 400kHz</td></tr>
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
            <span>Cơ chế Dự phòng WiFi SoftAP & Đồng bộ Đám mây</span>
          </div>
          <p class="small" style="color:var(--text2);margin:0 0 8px;">Khi mất kết nối Router trang trại, ESP32-S3 tự động chuyển sang chế độ SoftAP phát wifi nội bộ đọc từ LittleFS, mở trang cấu hình cục bộ. Khi có mạng trở lại, hệ thống đẩy hàng đợi telemetry lên máy chủ Docker Node.js & PostgreSQL.</p>
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
          <p class="muted small" style="margin:0;">Synchronous Moore-Mealy hybrid state machine synthesized on Xilinx Zynq-7000 FPGA logic fabric, clocked at 100MHz with glitch-free state transitions.</p>
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
              <tr><td><b>clk_divider</b></td><td>100MHz ➔ 1kHz</td><td>Internal Phase Lock</td><td>Debounce sampling & display refresh timing</td></tr>
              <tr><td><b>button_debouncer</b></td><td>1kHz Sample</td><td>Tactical Push Switches</td><td>4-stage shift register eliminates bounce jitter</td></tr>
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
          <p class="muted small" style="margin:0;">Mô hình máy trạng thái đồng bộ lai Moore-Mealy được tổng hợp trên vi mạch FPGA Xilinx Zynq-7000 với tần số dao động 100MHz, chuyển trạng thái không nhiễu glitch.</p>
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
              <tr><td><b>button_debouncer</b></td><td>Lấy mẫu 1kHz</td><td>Phím bấm cơ học</td><td>Thanh ghi dịch 4 tầng triệt tiêu nhiễu rung phím</td></tr>
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
            <div class="arch-step"><b>Express REST APIs</b><span>6 Endpoints (&lt;200ms)</span></div>
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
            <span>5-Tier Security Matrix with PostgreSQL Row-Level Security</span>
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
            <div class="arch-step"><b>Express REST APIs</b><span>6 Endpoints phản hồi &lt;200ms</span></div>
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
            <span>Ma trận Bảo mật 5 Cấp với PostgreSQL Row-Level Security</span>
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