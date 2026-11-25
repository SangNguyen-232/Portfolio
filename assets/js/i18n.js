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
      "hero.tagline": "Computer Engineering student at HCMUT. I work on ESP32-S3 firmware with FreeRTOS and TinyML, Verilog RTL for an FPGA vending prototype, and IoT backends that store sensor history.",
      'hero.cta1': 'View projects',
      'hero.cta2': 'Contact me',
      'stats.s1': 'Projects on GitHub',
      'stats.s2': 'Application tasks on ESP32-S3',
      'stats.s3': 'Simulated training episodes',
      'stats.s4': 'Forecast horizon',
      'about.title': 'Professional Summary',
      'about.sub': 'Who I am and what I work on',
      'about.userPrompt': "Tell me more about Sang",
      'about.regen': 'Regenerate',
      "about.streamText": "Nguyen Van Sang is a Computer Engineering student at Ho Chi Minh City University of Technology (HCMUT), focused on embedded systems and IoT. He has written FreeRTOS firmware for the ESP32-S3, integrated a TinyML forecast into its fan controller, developed Verilog RTL for an FPGA vending prototype with an LCD controller FSM, and built a backend that collects sensor data. In summer 2026 he interned on IoT sensor solutions at Viettel Dak Lak. He is looking for a Fresher Embedded Software Engineer role where he can learn from experienced engineers and ship firmware that runs on real hardware.",
      'do.d1.title': 'Firmware & RTOS',
      'do.d1.desc': 'I use FreeRTOS tasks, mutexes and notifications to share sensor readings and coordinate the fan relay, display and network uploads on an ESP32-S3.',
      'do.d2.title': 'Edge AI & TinyML',
      'do.d2.desc': 'I use TensorFlow Lite Micro to forecast temperature and humidity bands on the ESP32-S3. The fan controller checks each forecast against the latest readings before acting.',
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
      'proj.p1.title': 'Smart Environmental Monitoring System',
      'proj.p1.context': 'Jul – Nov 2026 · Individual project',
      'proj.p1.relay': 'Fan relay',
      'proj.p1.mode': 'Fan control',
      'proj.p1.metaModel': 'INT8 model · 5,536 bytes',
      'proj.p1.metaScore': '87.28% accuracy on 3,600 synthetic test episodes',
      'proj.p1.stage': 'Embedded system',
      'proj.p1.stack': 'Tech stack',
      'proj.p1.b1': 'Built ESP32-S3 firmware that samples air temperature and humidity every five seconds, displays the readings on an LCD and controls a ventilation fan. A separate probe measures soil moisture.',
      'proj.p1.b2': 'Integrated an INT8 model that uses seven readings and the sampled fan command to forecast the OFF, HOLD or ON band 30 seconds ahead. In AI mode, a rising trend can trigger ventilation before a threshold is crossed.',
      'proj.p1.b3': 'Built a live WebSocket dashboard on the board and an Express API that stores HTTP uploads in PostgreSQL for multi-device history.',
      "proj.p2.title": "FPGA Vending Machine Prototype",
      "proj.p2.b1": "Developed Verilog RTL for a 4-product vending prototype targeting Digilent Arty-Z7-20, with separate User and Admin modes.",
      "proj.p2.b2": "Implemented button-based credit (+5/+10), quantity selection, stock checks and balance deduction; Admin mode adjusts prices and restocks products.",
      "proj.p2.b3": "Added counter-based button debounce, an 8-bit 16×2 LCD interface with a 9-state controller FSM, and four 4-bit digit outputs for a 7-segment display interface.",
      "proj.p3.context": "Mar 2026 - May 2026",
      "proj.p3.title": "ParkWise — Campus Parking Prototype",
      "proj.p3.b1": "The account API totals the fees due after discounts on unpaid parking sessions. The dashboard compares that total with the account balance and flags a shortfall before checkout.",
      "proj.p3.b2": "A TypeScript payment controller settles multiple sessions through simulated BKPay. It debits the total once and records a shared payment reference on each paid session.",
      "proj.p3.b3": "Payment history filters paid sessions by check-in date and partial license plate. A Node.js route generates an itemized Vietnamese PDF for a single session or up to ten matching sessions.",
      "proj.p3.stack": "Tech Stack:",
      "proj.p3.sqlTag": "PostgreSQL schema & seed",
      "proj.p3.inspect": "Process flow",
      "proj.p3.stage": "Software prototype",
      'proj.inspect': 'System architecture',
      'proj.m1': 'FreeRTOS tasks',
      'proj.m2': 'Sampling interval',
      'proj.m3': 'Forecast horizon',
      "proj.inspectFSM": "RTL & LCD controller",
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
      "proj.p2.context": "Oct 2024 – Dec 2024",
      "proj.p2.hardware": "Target: Digilent Arty-Z7-20 · XDC clock constraint: 125 MHz",
      "proj.p2.design": "Verilog RTL · User/Admin logic · LCD controller FSM",
      "proj.p2.stage": "RTL prototype",
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
      "hero.tagline": "Sinh viên Kỹ thuật Máy tính tại ĐH Bách khoa TP.HCM. Tôi phát triển firmware ESP32-S3 với FreeRTOS và TinyML, RTL Verilog cho nguyên mẫu máy bán hàng trên FPGA và backend IoT lưu lịch sử số đo cảm biến.",
      'hero.cta1': 'Xem dự án',
      'hero.cta2': 'Liên hệ',
      'stats.s1': 'Dự án có mã nguồn trên GitHub',
      'stats.s2': 'Tác vụ ứng dụng trên ESP32-S3',
      'stats.s3': 'Kịch bản mô phỏng để huấn luyện',
      'stats.s4': 'Khoảng thời gian dự báo',
      'about.title': 'Tóm Tắt Chuyên Môn',
      'about.sub': 'Giới thiệu ngắn về tôi và hướng chuyên môn',
      'about.userPrompt': 'Hãy giới thiệu về Sang',
      'about.regen': 'Phát lại',
      "about.streamText": "Nguyễn Văn Sang là sinh viên Kỹ thuật Máy tính tại Trường Đại học Bách khoa – ĐHQG-HCM, tập trung vào hệ thống nhúng và IoT. Anh đã viết firmware FreeRTOS cho ESP32-S3, tích hợp mô hình dự báo TinyML vào bộ điều khiển quạt, phát triển RTL Verilog cho nguyên mẫu máy bán hàng trên FPGA với FSM điều khiển LCD và xây dựng backend thu thập dữ liệu cảm biến. Mùa hè năm 2026, anh thực tập về giải pháp cảm biến IoT tại Viettel Đắk Lắk. Anh đang tìm vị trí Fresher Embedded Software Engineer để học hỏi từ các kỹ sư giàu kinh nghiệm và làm ra firmware chạy trên phần cứng thật.",
      'do.d1.title': 'Firmware & RTOS',
      'do.d1.desc': 'Tôi dùng tác vụ FreeRTOS, mutex và thông báo giữa các tác vụ để chia sẻ số đo cảm biến, điều khiển rơ-le quạt, cập nhật màn hình và gửi dữ liệu trên ESP32-S3.',
      'do.d2.title': 'Edge AI & TinyML',
      'do.d2.desc': 'Tôi dùng TensorFlow Lite Micro trên ESP32-S3 để dự báo nhiệt độ và độ ẩm sẽ nằm trong vùng ngưỡng nào. Bộ điều khiển quạt đối chiếu dự báo với số đo mới nhất trước khi ra lệnh.',
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
      'proj.p1.title': 'Hệ thống giám sát môi trường thông minh',
      'proj.p1.context': '07 – 11/2026 · Dự án cá nhân',
      'proj.p1.relay': 'Rơ-le quạt',
      'proj.p1.mode': 'Điều khiển quạt',
      'proj.p1.metaModel': 'Mô hình INT8 · 5.536 byte',
      'proj.p1.metaScore': 'Dự báo đúng 87,28% trên 3.600 kịch bản kiểm thử mô phỏng',
      'proj.p1.stage': 'Hệ thống nhúng',
      'proj.p1.stack': 'Công nghệ',
      'proj.p1.b1': 'Thiết kế firmware ESP32-S3 để đọc nhiệt độ và độ ẩm không khí mỗi 5 giây, hiển thị số đo trên LCD và điều khiển quạt thông gió. Một đầu dò riêng đo độ ẩm đất.',
      'proj.p1.b2': 'Tích hợp mô hình INT8 dùng bảy lần đọc cảm biến và lệnh quạt tại thời điểm lấy mẫu để dự báo vùng OFF, HOLD hoặc ON sau 30 giây. Ở chế độ AI, bộ điều khiển có thể bật quạt sớm khi dự báo cho thấy sắp vượt ngưỡng.',
      'proj.p1.b3': 'Xây dựng bảng theo dõi trực tiếp trên bo mạch qua WebSocket và API Express nhận dữ liệu qua HTTP để lưu lịch sử của nhiều thiết bị vào PostgreSQL.',
      "proj.p2.title": "Nguyên mẫu máy bán hàng tự động trên FPGA",
      "proj.p2.b1": "Phát triển RTL Verilog cho nguyên mẫu máy bán hàng gồm 4 loại sản phẩm, hướng tới bo Digilent Arty-Z7-20, có hai chế độ User và Admin.",
      "proj.p2.b2": "Mô phỏng nạp số dư bằng nút nhấn (+5/+10), chọn số lượng, kiểm tra tồn kho và trừ tiền; Admin điều chỉnh giá và bổ sung hàng.",
      "proj.p2.b3": "Bổ sung chống dội bằng bộ đếm, giao tiếp LCD 16×2 bus 8-bit với FSM điều khiển 9 trạng thái và bốn đầu ra chữ số 4-bit cho giao tiếp hiển thị LED 7 đoạn.",
      "proj.p3.context": "Tháng 3/2026 – Tháng 5/2026",
      "proj.p3.title": "ParkWise — Nguyên mẫu quản lý bãi đỗ xe trong trường",
      "proj.p3.b1": "API tài khoản tính tổng phí sau ưu đãi của các lượt gửi xe chưa thanh toán. Trang tổng quan đối chiếu tổng phí với số dư và cảnh báo khi tài khoản thiếu tiền.",
      "proj.p3.b2": "Bộ điều khiển thanh toán viết bằng TypeScript xử lý nhiều lượt gửi xe trong một giao dịch BKPay mô phỏng. Hệ thống trừ tổng phí một lần và gắn cùng mã giao dịch cho từng lượt đã thanh toán.",
      "proj.p3.b3": "Trang lịch sử lọc các lượt đã thanh toán theo ngày vào bãi và một phần biển số. API chạy trên Node.js xuất biên lai PDF tiếng Việt cho một lượt hoặc gộp tối đa mười lượt khớp bộ lọc.",
      "proj.p3.stack": "Công nghệ nhóm sử dụng",
      "proj.p3.sqlTag": "PostgreSQL (schema và dữ liệu mẫu)",
      "proj.p3.inspect": "Kiến trúc thanh toán và biên lai",
      "proj.p3.stage": "Nguyên mẫu phần mềm",
      'proj.inspect': 'Kiến trúc hệ thống',
      'proj.m1': 'tác vụ FreeRTOS',
      'proj.m2': 'chu kỳ lấy mẫu',
      'proj.m3': 'tầm dự báo',
      "proj.inspectFSM": "RTL & bộ điều khiển LCD",
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
      "proj.p2.context": "Tháng 10/2024 – Tháng 12/2024",
      "proj.p2.hardware": "Bo đích: Digilent Arty-Z7-20 · Ràng buộc xung nhịp XDC: 125 MHz",
      "proj.p2.design": "RTL Verilog · Logic User/Admin · FSM điều khiển LCD",
      "proj.p2.stage": "Nguyên mẫu RTL",
    }
  };

  const modalContentData = {
    'modal-proj1': {
      title_en: 'Air monitoring and fan control',
      title_vi: 'Giám sát môi trường và điều khiển quạt',
      sub_en: 'Yolo Uno ESP32-S3 · FreeRTOS · TensorFlow Lite Micro',
      sub_vi: 'Yolo Uno ESP32-S3 · FreeRTOS · TensorFlow Lite Micro',
      body_en: `
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic"><use href="#i-layers"/></svg><span>From air sample to relay command</span></div>
          <div class="arch-pipeline air-monitor-flow">
            <div class="arch-step"><b>temp_humi_monitor</b><span>DHT20 reading every 5 s</span></div>
            <span class="arch-sep" aria-hidden="true">➔</span>
            <div class="arch-step"><b>tiny_ml_task</b><span>Seven samples → forecast at +30 s</span></div>
            <span class="arch-sep" aria-hidden="true">➔</span>
            <div class="arch-step"><b>task_fan</b><span>Apply the control policy to GPIO10</span></div>
          </div>
          <p class="small">The tasks exchange timestamped readings and forecasts through a mutex-protected <code>SharedContext</code>. AUTO uses the saved temperature and humidity thresholds. SHADOW records the forecast while AUTO rules drive the relay. AI can start the fan early between thresholds when the profile matches and the ON score reaches 0.80. Stale or invalid air readings force the relay off in automatic modes.</p>
        </div>
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic"><use href="#i-chip"/></svg><span>Board connections</span></div>
          <table class="pin-table">
            <thead><tr><th scope="col">Pin or interface</th><th scope="col">Component</th><th scope="col">Role</th></tr></thead>
            <tbody>
              <tr><td>GPIO11 / GPIO12</td><td>I2C SDA / SCL</td><td>Shared bus for the DHT20 and 16×2 LCD (0x27)</td></tr>
              <tr><td>GPIO2</td><td>Soil probe (ADC)</td><td>Independent moisture reading for display and history</td></tr>
              <tr><td>GPIO10</td><td>Fan relay</td><td>Active-high output to the fan driver</td></tr>
              <tr><td>GPIO48 / GPIO45</td><td>LED / NeoPixel</td><td>Indicate temperature and humidity bands, respectively</td></tr>
              <tr><td>GPIO0</td><td>BOOT button</td><td>Hold for more than 2 s to reset saved settings</td></tr>
              <tr><td>USB CDC</td><td>Serial monitor</td><td>Firmware log at 115200 baud</td></tr>
            </tbody>
          </table>
        </div>
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic"><use href="#i-sparkle"/></svg><span>What the model predicts</span></div>
          <p class="small">The eight inputs describe air temperature, relative humidity, their recent trends and the fan command at sampling. The INT8 model predicts the OFF, HOLD or ON band 30 seconds ahead, assuming that command persists. On 3,600 held-out synthetic episodes, the desktop reference scored 87.28%, compared with 82.94% for linear extrapolation. Field accuracy and board latency require measurements on the physical setup. <a href="https://github.com/SangNguyen-232/IoT-Env-Monitor/blob/project_linux/ml/models/fan_model_manifest.json" target="_blank" rel="noopener">Model evaluation results</a></p>
        </div>
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic"><use href="#i-server"/></svg><span>Local control and device history</span></div>
          <p class="small">If the configured Wi-Fi network is unavailable, the board opens a setup access point. LittleFS stores its network settings. On the LAN, the browser receives live readings from the board over WebSocket. Separately, the board sends HTTP POST requests to <code>/sensor</code> on the Express backend, which writes to PostgreSQL. The central dashboard polls the backend. Remote access can use an optional Cloudflare gateway.</p>
        </div>
      `,
      body_vi: `
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic"><use href="#i-layers"/></svg><span>Từ số đo không khí đến lệnh rơ-le</span></div>
          <div class="arch-pipeline air-monitor-flow">
            <div class="arch-step"><b>temp_humi_monitor</b><span>Đọc DHT20 mỗi 5 giây</span></div>
            <span class="arch-sep" aria-hidden="true">➔</span>
            <div class="arch-step"><b>tiny_ml_task</b><span>Dùng bảy mẫu để dự báo trước 30 giây</span></div>
            <span class="arch-sep" aria-hidden="true">➔</span>
            <div class="arch-step"><b>task_fan</b><span>Áp dụng quy tắc điều khiển lên GPIO10</span></div>
          </div>
          <p class="small">Các tác vụ trao đổi số đo có dấu thời gian và kết quả dự báo qua <code>SharedContext</code> được bảo vệ bằng mutex. AUTO dùng ngưỡng nhiệt độ và độ ẩm đã lưu. SHADOW ghi lại dự báo trong khi quy tắc AUTO điều khiển rơ-le. AI có thể bật quạt sớm khi số đo nằm giữa hai ngưỡng, cấu hình khớp với mô hình và điểm ON đạt ít nhất 0,80. Ở các chế độ tự động, bộ điều khiển tắt rơ-le khi số đo không khí quá cũ hoặc không hợp lệ.</p>
        </div>
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic"><use href="#i-chip"/></svg><span>Kết nối trên bo mạch</span></div>
          <table class="pin-table">
            <thead><tr><th scope="col">Chân hoặc giao tiếp</th><th scope="col">Thành phần</th><th scope="col">Chức năng</th></tr></thead>
            <tbody>
              <tr><td>GPIO11 / GPIO12</td><td>I2C SDA / SCL</td><td>Bus chung cho DHT20 và LCD 16×2 (0x27)</td></tr>
              <tr><td>GPIO2</td><td>Đầu dò độ ẩm đất (ADC)</td><td>Đo riêng để hiển thị và lưu lịch sử</td></tr>
              <tr><td>GPIO10</td><td>Rơ-le quạt</td><td>Mức cao kích hoạt mạch điều khiển quạt</td></tr>
              <tr><td>GPIO48 / GPIO45</td><td>LED / NeoPixel</td><td>Lần lượt báo vùng nhiệt độ và độ ẩm</td></tr>
              <tr><td>GPIO0</td><td>Nút BOOT</td><td>Giữ hơn 2 giây để xóa cấu hình đã lưu</td></tr>
              <tr><td>USB CDC</td><td>Cổng nối tiếp</td><td>Đọc nhật ký firmware ở 115200 baud</td></tr>
            </tbody>
          </table>
        </div>
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic"><use href="#i-sparkle"/></svg><span>Mô hình dự báo điều gì?</span></div>
          <p class="small">Tám đầu vào mô tả nhiệt độ, độ ẩm không khí, xu hướng gần đây và lệnh quạt lúc lấy mẫu. Mô hình INT8 dự báo vùng OFF, HOLD hoặc ON sau 30 giây với giả định lệnh quạt giữ nguyên. Trên 3.600 kịch bản mô phỏng dành riêng cho kiểm thử, mô hình tham chiếu chạy trên máy tính dự báo đúng 87,28%, so với 82,94% của phép ngoại suy tuyến tính. Độ chính xác thực địa và thời gian suy luận trên bo mạch cần được đo trên thiết bị thật. <a href="https://github.com/SangNguyen-232/IoT-Env-Monitor/blob/project_linux/ml/models/fan_model_manifest.json" target="_blank" rel="noopener">Kết quả đánh giá mô hình</a></p>
        </div>
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic"><use href="#i-server"/></svg><span>Điều khiển tại chỗ và lưu lịch sử thiết bị</span></div>
          <p class="small">Khi mạng Wi-Fi đã cấu hình không khả dụng, bo mạch mở điểm truy cập để thiết lập lại. Cấu hình mạng được lưu trong LittleFS. Trên mạng LAN, trình duyệt nhận số đo trực tiếp từ bo mạch qua WebSocket. Một luồng riêng gửi dữ liệu bằng HTTP POST đến <code>/sensor</code> của backend Express để lưu vào PostgreSQL. Trang quản lý định kỳ lấy dữ liệu từ backend. Có thể dùng cổng Cloudflare để truy cập từ xa.</p>
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
      title_en: "ParkWise — Parking Fee Settlement and Receipts",
      title_vi: "ParkWise — Thanh toán phí gửi xe và xuất biên lai",
      sub_en: "React account dashboard · Next.js Route Handlers · TypeScript payment model · PDF generation",
      sub_vi: "Trang tài khoản React · Route Handler của Next.js · Mô hình thanh toán TypeScript · Xuất PDF",
      body_en: `
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-layers"/></svg><span>Account balance and fee calculation</span></div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;"><code>GET /api/user/balance</code> returns the account balance and the sum of <code>finalFee</code> across sessions in <code>Pending_Payment</code>. The six sample sessions total 35,000 VND. The account holds 20,000 VND, leaving a 15,000 VND shortfall. The React dashboard compares the two amounts and shows a low-balance warning before checkout.</p>
          <p class="small" style="color:var(--text2);margin:0;">Changing the demo discount recalculates only eligible unpaid sessions. The server rounds the percentage to a whole number between 0 and 100, applies it to each original fee and rounds the discount to the nearest dong. Fees for settled sessions stay fixed, so a later promotion cannot change an earlier receipt.</p>
        </div>

        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-server"/></svg><span>Batch payment and session state</span></div>
          <div class="arch-pipeline">
            <div class="arch-step"><b>React checkout</b><span>Collect unpaid session IDs</span></div>
            <span class="arch-sep" aria-hidden="true">→</span>
            <div class="arch-step"><b>POST /api/payment</b><span>Validate the demo code</span></div>
            <span class="arch-sep" aria-hidden="true">→</span>
            <div class="arch-step"><b>PaymentController</b><span>Check funds and settle sessions</span></div>
          </div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;">The checkout submits session IDs and a fixed six-digit demo code. The controller selects the requested sessions that are still pending and calculates the total from their fees on the server. If none qualify or the balance is too low, it returns an error before debiting the account.</p>
          <p class="small" style="color:var(--text2);margin:0;">On success, the controller deducts the total once, marks each included session <code>Paid</code> and writes the same payment time and reference to each. The API returns the new balance, remaining debt and payment reference. BKPay is simulated, and the shared demo account, sessions and transaction log live in server memory.</p>
        </div>

        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-code"/></svg><span>Payment history and receipt selection</span></div>
          <p class="small" style="color:var(--text2);margin:0;"><code>GET /api/transactions?status=paid</code> supplies paid sessions with a payment time and reference. The history screen filters them by an inclusive check-in date range and a case-insensitive match on part of a license plate. Each row keeps its session ID, so a driver can retrieve one visit from a grouped payment.</p>
        </div>

        <div class="arch-card" style="margin-bottom:0;">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-layers"/></svg><span>Server-generated Vietnamese PDF receipts</span></div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;">From the history screen, a row sends one ID to <code>GET /api/receipt</code>. A combined export sends the first ten filtered IDs. The receipt model selects matching paid sessions, caps the document at ten rows and totals only the fees included. Each row lists the session number, entry and exit times, license plate and fee.</p>
          <p class="small" style="color:var(--text2);margin:0;">The Node.js route returns the document as an <code>application/pdf</code> attachment. It uses <code>pdf-lib</code> and <code>@pdf-lib/fontkit</code> to embed a subset of Roboto, preserving Vietnamese diacritics in the downloaded receipt.</p>
        </div>
      `,
      body_vi: `
        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-layers"/></svg><span>Số dư tài khoản và cách tính phí</span></div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;"><code>GET /api/user/balance</code> trả về số dư và tổng <code>finalFee</code> của các lượt ở trạng thái <code>Pending_Payment</code>. Trong dữ liệu mẫu, sáu lượt gửi xe có tổng phí 35.000 đồng. Tài khoản còn 20.000 đồng, tức là thiếu 15.000 đồng. Trang tổng quan React so sánh số dư với tổng phí và hiển thị cảnh báo trước khi thanh toán.</p>
          <p class="small" style="color:var(--text2);margin:0;">Khi thay đổi mức ưu đãi mô phỏng, máy chủ chỉ tính lại phí cho các lượt chưa thanh toán thuộc diện ưu đãi. Tỷ lệ giảm được làm tròn thành số nguyên từ 0 đến 100 rồi áp dụng lên phí gốc của từng lượt. Khoản giảm được làm tròn đến đơn vị đồng. Vì phí của lượt đã thanh toán được giữ nguyên, thay đổi ưu đãi sau này không làm đổi số tiền trên biên lai cũ.</p>
        </div>

        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-server"/></svg><span>Thanh toán gộp và cập nhật trạng thái từng lượt</span></div>
          <div class="arch-pipeline">
            <div class="arch-step"><b>Trang thanh toán React</b><span>Lấy ID các lượt chưa trả phí</span></div>
            <span class="arch-sep" aria-hidden="true">→</span>
            <div class="arch-step"><b>POST /api/payment</b><span>Kiểm tra mã xác nhận mô phỏng</span></div>
            <span class="arch-sep" aria-hidden="true">→</span>
            <div class="arch-step"><b>PaymentController</b><span>Kiểm tra số dư và ghi nhận thanh toán</span></div>
          </div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;">Trang thanh toán gửi danh sách ID cùng mã xác nhận cố định gồm sáu chữ số. Bộ điều khiển lọc những lượt trong yêu cầu vẫn đang chờ thanh toán và tính tổng từ phí lưu trên máy chủ. Nếu không còn lượt nào đủ điều kiện hoặc số dư không đủ, hệ thống trả lỗi trước khi trừ tiền.</p>
          <p class="small" style="color:var(--text2);margin:0;">Khi thanh toán thành công, bộ điều khiển trừ tổng phí một lần, chuyển từng lượt sang <code>Paid</code>, rồi ghi cùng thời điểm thanh toán và mã giao dịch cho các lượt đó. API trả về số dư mới, số tiền còn nợ và mã giao dịch. BKPay được mô phỏng. Tài khoản mẫu dùng chung, các lượt gửi xe và nhật ký giao dịch đều được lưu trong bộ nhớ máy chủ.</p>
        </div>

        <div class="arch-card">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-code"/></svg><span>Tra cứu lịch sử và chọn lượt để xuất biên lai</span></div>
          <p class="small" style="color:var(--text2);margin:0;"><code>GET /api/transactions?status=paid</code> trả về các lượt đã thanh toán có thời điểm thanh toán và mã giao dịch. Trang lịch sử lọc theo ngày vào bãi, tính cả ngày đầu và ngày cuối, đồng thời cho phép tìm một phần biển số mà không phân biệt chữ hoa, chữ thường. Mỗi dòng giữ ID riêng nên người dùng vẫn có thể tra cứu từng lượt sau khi trả gộp.</p>
        </div>

        <div class="arch-card" style="margin-bottom:0;">
          <div class="arch-card-title"><svg class="ic" style="width:16px;height:16px;color:var(--mint);"><use href="#i-layers"/></svg><span>Tạo biên lai PDF tiếng Việt trên máy chủ</span></div>
          <p class="small" style="color:var(--text2);margin:0 0 10px;">Khi xuất biên lai từng dòng, trang lịch sử gửi một ID đến <code>GET /api/receipt</code>. Khi xuất gộp, trang gửi tối đa mười ID đầu tiên khớp bộ lọc. Mô hình biên lai chọn các lượt đã thanh toán có ID tương ứng, giới hạn mười dòng và chỉ cộng phí của các dòng được in. Mỗi dòng ghi số thứ tự lượt gửi xe, giờ vào và ra, biển số cùng mức phí.</p>
          <p class="small" style="color:var(--text2);margin:0;">API chạy trên Node.js trả về tệp đính kèm có kiểu <code>application/pdf</code>. Bộ tạo PDF dùng <code>pdf-lib</code> và <code>@pdf-lib/fontkit</code> để nhúng các ký tự Roboto cần dùng, giúp biên lai tải xuống hiển thị đúng dấu tiếng Việt.</p>
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

    document.querySelectorAll('.count[data-to]').forEach((counter) => {
      counter.textContent = Number(counter.dataset.to).toLocaleString(lang);
    });

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
