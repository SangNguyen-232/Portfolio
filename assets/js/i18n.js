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
      'cert.scheduled': 'Scheduled (Aim 600+)',
      'modal.close': 'Close',
      'modal.exit': 'Press ESC to exit inspector',
      'shortcuts.title': 'Keyboard Shortcuts',
      'shortcuts.enable': 'Enable single-character shortcuts',
      'shortcuts.sub': 'Quick navigation',
      'shortcut.language': 'Toggle Language (EN/VI)',
      'shortcut.terminal': 'Jump to the introduction',
      'shortcut.projects': 'Navigate to Featured Projects',
      'shortcut.close': 'Close any Open Modal',
      'shortcut.help': 'Show/Hide this Shortcuts Guide',
      'shortcuts.helper': 'Shortcuts',
      'a11y.language': 'EN VI — Switch to Vietnamese',
      'a11y.primaryNav': 'Primary navigation',
      'a11y.mobileNav': 'Mobile navigation',
      'a11y.socialNav': 'Contact and profile links',
      'a11y.toc': 'Table of contents',
      'a11y.contacts': 'Candidate contact details and profiles',
      'a11y.menuOpen': 'Open menu',
      'a11y.menuClose': 'Close menu',
      'a11y.home': 'sang.dev — Home',
      'a11y.backTop': 'Back to top',
      'a11y.portrait': 'Portrait of Nguyen Van Sang',
      'a11y.terminal': 'Introduction',
      'a11y.focusAreas': 'Core focus areas',
      'nav.about': 'Professional Summary',
      'nav.experience': 'Experience',
      'nav.projects': 'Projects',
      'nav.skills': 'Skills',
      'nav.education': 'Education & Certification',
      'nav.contact': 'Contact',
      'nav.resume': 'View CV',
      'loader.text': 'Ready to explore',
      'hero.consoleTag': 'Embedded Software',
      'hero.greet': 'Hello, I am',
      'hero.name': 'Nguyen Van Sang',
      'hero.tagline': 'I build FreeRTOS firmware for the ESP32-S3, run TinyML models on the device, and design FPGA controllers in Verilog.',
      'hero.p1.sub': 'Concurrent firmware',
      'hero.p2.sub': 'On-device AI',
      'hero.p3.sub': 'RTL & LCD FSM',
      'hero.p4.sub': 'WebSocket & API',
      'hero.status': "I'm looking for a Fresher Embedded Software Engineer role",
      'hero.cta1': 'View projects',
      'hero.cta2': 'Contact me',
      'about.title': 'Professional Summary',
      'about.sub': 'Who I am and what I work on',
      'about.userPrompt': "Tell me more about Sang",
      'about.regen': 'Regenerate',
      'about.chatTitle': 'about me',
      "about.streamText": "Nguyen Van Sang is a Computer Engineering student at Ho Chi Minh City University of Technology (HCMUT), focused on embedded systems and IoT. He has written FreeRTOS firmware for the ESP32-S3, integrated a TinyML forecast into its fan controller, developed Verilog RTL for an FPGA vending prototype with an LCD controller FSM, and built a backend that collects sensor data. In summer 2026 he interned on IoT sensor solutions at Viettel Dak Lak. He is looking for a Fresher Embedded Software Engineer role where he can learn from experienced engineers and ship firmware that runs on real hardware.",
      'do.d1.title': 'Firmware & RTOS',
      'do.d1.desc': 'I use FreeRTOS tasks, mutexes and notifications to share sensor readings and coordinate the fan relay, display and network uploads on an ESP32-S3.',
      'do.d2.title': 'Edge AI & TinyML',
      'do.d2.desc': 'I use TensorFlow Lite Micro to forecast temperature and humidity bands on the ESP32-S3. The fan controller checks each forecast against the latest readings before acting.',
      'do.d3.title': 'FPGA & Digital Design',
      "do.d3.desc": "Verilog RTL for a vending prototype targeting Digilent Arty Z7-20: User/Admin logic, an LCD controller state machine, button debounce and board pin/clock constraints for Vivado.",
      'exp.title': 'Experience',
      'exp.sub': 'Internship experience',
      'exp.role': 'IoT Intern',
      'exp.company': 'Viettel Dak Lak — Viettel Group',
      'exp.type': 'On-site',
      'exp.period': 'Jun 2026 – Aug 2026',
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
      'proj.p1.b3': 'Built an on-device WebSocket dashboard and deployed a Dockerized Express/PostgreSQL telemetry API remotely through an outbound Cloudflare Tunnel and Workers VPC with no exposed inbound ports.',
      "proj.p2.title": "FPGA Vending Machine Prototype",
      "proj.p2.b1": "Developed Verilog RTL for a 4-product vending prototype targeting Digilent Arty Z7-20, with separate User and Admin modes.",
      "proj.p2.b2": "Implemented button-based credit (+5/+10), quantity selection, stock checks and balance deduction; Admin mode adjusts prices and restocks products.",
      "proj.p2.b3": "Added counter-based button debounce, an 8-bit 16×2 LCD interface with a 9-state controller FSM, and four 4-bit digit outputs for a 7-segment display interface.",
      "proj.p3.context": "Mar – May 2026 · Team of 5",
      "proj.p3.title": "ParkWise — Campus Parking Prototype",
      "proj.p3.b1": "I built the account balance and payment workflow. The account API totals unpaid parking fees after discounts, and the dashboard warns drivers when their balance is too low.",
      "proj.p3.b2": "A TypeScript payment controller settles multiple sessions through simulated BKPay. It debits the total once and records a shared payment reference on each paid session.",
      "proj.p3.b3": "Payment history filters paid sessions by check-in date and partial license plate. A Node.js route generates an itemized Vietnamese PDF for a single session or up to ten matching sessions.",
      "proj.p3.stack": "Tech Stack:",
      "proj.p3.sqlTag": "PostgreSQL schema & seed",
      "proj.p3.inspect": "Process flow",
      "proj.p3.stage": "Software prototype",
      'proj.inspect': 'System architecture',
      'proj.repo': 'GitHub Repo',
      'proj.m1': 'FreeRTOS tasks',
      'proj.m2': 'Sampling interval',
      "proj.inspectFSM": "RTL & LCD controller",
      'skills.title': 'Technical Skills',
      'skills.sub': 'Tools and technologies I have used in the projects above',
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
      'edu.period': 'Sep 2022 – expected Nov 2027 • Ho Chi Minh City, Vietnam',
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
      'contact.desc': 'I am looking for an entry-level Embedded Software Engineer position in Ho Chi Minh City, surrounding areas, or a remote role. You can reach me by email, phone, or LinkedIn.',
      'shortcut.led': 'Toggle LED borders',
      'footer.totop': 'Back to Top',
      'contact.location': 'Ho Chi Minh City, Vietnam',
      'contact.phone': 'Phone',
      'contact.copyPhone': 'Copy phone number',
      'contact.copyEmail': 'Copy email',
      "proj.p2.context": "Oct – Dec 2024 · Team of 5",
      "proj.p2.hardware": "Target: Digilent Arty Z7-20 · XDC clock constraint: 125 MHz",
      "proj.p2.design": "Verilog RTL · User/Admin logic · LCD controller FSM",
      "proj.p2.stage": "RTL prototype",
    },
    vi: {
      'skip.content': 'Chuyển đến nội dung',
      'cert.scheduled': 'Đã lên lịch (mục tiêu 600+)',
      'modal.close': 'Đóng',
      'modal.exit': 'Nhấn ESC để đóng cửa sổ chi tiết',
      'shortcuts.title': 'Phím tắt',
      'shortcuts.enable': 'Bật phím tắt một ký tự',
      'shortcuts.sub': 'Điều hướng nhanh',
      'shortcut.language': 'Đổi ngôn ngữ (EN/VI)',
      'shortcut.terminal': 'Chuyển đến phần giới thiệu',
      'shortcut.projects': 'Chuyển đến các dự án nổi bật',
      'shortcut.close': 'Đóng cửa sổ đang mở',
      'shortcut.help': 'Hiện/Ẩn hướng dẫn phím tắt',
      'shortcuts.helper': 'Phím tắt',
      'a11y.language': 'EN VI — Chuyển sang tiếng Anh',
      'a11y.primaryNav': 'Điều hướng chính',
      'a11y.mobileNav': 'Điều hướng trên thiết bị di động',
      'a11y.socialNav': 'Liên kết liên hệ và hồ sơ cá nhân',
      'a11y.toc': 'Mục lục',
      'a11y.contacts': 'Thông tin liên hệ và hồ sơ ứng viên',
      'a11y.menuOpen': 'Mở menu',
      'a11y.menuClose': 'Đóng menu',
      'a11y.home': 'sang.dev — Trang đầu',
      'a11y.backTop': 'Lên đầu trang',
      'a11y.portrait': 'Ảnh chân dung Nguyễn Văn Sang',
      'a11y.terminal': 'Giới thiệu',
      'a11y.focusAreas': 'Lĩnh vực chuyên môn chính',
      'nav.about': 'Tóm tắt chuyên môn',
      'nav.experience': 'Kinh nghiệm',
      'nav.projects': 'Dự án',
      'nav.skills': 'Kỹ năng',
      'nav.education': 'Học vấn & Chứng chỉ',
      'nav.contact': 'Liên hệ',
      'nav.resume': 'Xem CV',
      'loader.text': 'Sẵn sàng khám phá',
      'hero.consoleTag': 'Embedded Software',
      'hero.greet': 'Xin chào, tôi là',
      'hero.name': 'Nguyễn Văn Sang',
      'hero.tagline': 'Tôi phát triển firmware FreeRTOS cho ESP32-S3, chạy mô hình TinyML ngay trên vi điều khiển và thiết kế bộ điều khiển FPGA bằng Verilog.',
      'hero.p1.sub': 'Firmware đa nhiệm',
      'hero.p2.sub': 'AI trên thiết bị',
      'hero.p3.sub': 'RTL & FSM LCD',
      'hero.p4.sub': 'WebSocket & API',
      'hero.status': 'Tôi đang tìm vị trí Fresher Embedded Software Engineer',
      'hero.cta1': 'Xem dự án',
      'hero.cta2': 'Liên hệ',
      'about.title': 'Tóm Tắt Chuyên Môn',
      'about.sub': 'Giới thiệu ngắn về tôi và hướng chuyên môn',
      'about.userPrompt': 'Hãy giới thiệu về Sang',
      'about.regen': 'Phát lại',
      'about.chatTitle': 'về tôi',
      "about.streamText": "Nguyễn Văn Sang là sinh viên Kỹ thuật Máy tính tại Trường Đại học Bách khoa – ĐHQG-HCM, tập trung vào hệ thống nhúng và IoT. Anh đã viết firmware FreeRTOS cho ESP32-S3, tích hợp mô hình dự báo TinyML vào bộ điều khiển quạt, phát triển RTL Verilog cho nguyên mẫu máy bán hàng trên FPGA với FSM điều khiển LCD và xây dựng backend thu thập dữ liệu cảm biến. Mùa hè năm 2026, anh thực tập về giải pháp cảm biến IoT tại Viettel Đắk Lắk. Anh đang tìm vị trí Fresher Embedded Software Engineer để học hỏi từ các kỹ sư giàu kinh nghiệm và làm ra firmware chạy trên phần cứng thật.",
      'do.d1.title': 'Firmware & RTOS',
      'do.d1.desc': 'Tôi dùng tác vụ FreeRTOS, mutex và thông báo giữa các tác vụ để chia sẻ số đo cảm biến, điều khiển rơ-le quạt, cập nhật màn hình và gửi dữ liệu trên ESP32-S3.',
      'do.d2.title': 'Edge AI & TinyML',
      'do.d2.desc': 'Tôi dùng TensorFlow Lite Micro trên ESP32-S3 để dự báo nhiệt độ và độ ẩm sẽ nằm trong vùng ngưỡng nào. Bộ điều khiển quạt đối chiếu dự báo với số đo mới nhất trước khi ra lệnh.',
      'do.d3.title': 'FPGA & Thiết kế số',
      "do.d3.desc": "RTL Verilog cho nguyên mẫu máy bán hàng hướng tới bo Digilent Arty Z7-20: logic User/Admin, FSM điều khiển LCD, chống dội nút nhấn và ràng buộc chân/xung nhịp cho Vivado.",
      'exp.title': 'Kinh Nghiệm',
      'exp.sub': 'Kinh nghiệm thực tập',
      'exp.role': 'Thực tập sinh IoT',
      'exp.company': 'Viettel Đắk Lắk — Tập đoàn Viettel',
      'exp.type': 'Trực tiếp',
      'exp.period': 'Tháng 6/2026 – Tháng 8/2026',
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
      'proj.p1.b3': 'Xây dựng bảng theo dõi WebSocket trực tiếp trên bo mạch và triển khai API thu thập dữ liệu Express/PostgreSQL đóng gói bằng Docker, truy cập từ xa qua Cloudflare Tunnel và Workers VPC mà không cần mở cổng inbound.',
      "proj.p2.title": "Nguyên mẫu máy bán hàng tự động trên FPGA",
      "proj.p2.b1": "Phát triển RTL Verilog cho nguyên mẫu máy bán hàng gồm 4 loại sản phẩm, hướng tới bo Digilent Arty Z7-20, có hai chế độ User và Admin.",
      "proj.p2.b2": "Mô phỏng nạp số dư bằng nút nhấn (+5/+10), chọn số lượng, kiểm tra tồn kho và trừ tiền; Admin điều chỉnh giá và bổ sung hàng.",
      "proj.p2.b3": "Bổ sung chống dội bằng bộ đếm, giao tiếp LCD 16×2 bus 8-bit với FSM điều khiển 9 trạng thái và bốn đầu ra chữ số 4-bit cho giao tiếp hiển thị LED 7 đoạn.",
      "proj.p3.context": "03 – 05/2026 · Nhóm 5 người",
      "proj.p3.title": "ParkWise — Nguyên mẫu quản lý bãi đỗ xe trong trường",
      "proj.p3.b1": "Tôi phụ trách phần số dư tài khoản và thanh toán. API tính tổng phí gửi xe còn nợ sau ưu đãi, còn trang tổng quan cảnh báo khi số dư không đủ.",
      "proj.p3.b2": "Bộ điều khiển thanh toán viết bằng TypeScript xử lý nhiều lượt gửi xe trong một giao dịch BKPay mô phỏng. Hệ thống trừ tổng phí một lần và gắn cùng mã giao dịch cho từng lượt đã thanh toán.",
      "proj.p3.b3": "Trang lịch sử lọc các lượt đã thanh toán theo ngày vào bãi và một phần biển số. API chạy trên Node.js xuất biên lai PDF tiếng Việt cho một lượt hoặc gộp tối đa mười lượt khớp bộ lọc.",
      "proj.p3.stack": "Công nghệ nhóm sử dụng",
      "proj.p3.sqlTag": "PostgreSQL (schema và dữ liệu mẫu)",
      "proj.p3.inspect": "Kiến trúc thanh toán và biên lai",
      "proj.p3.stage": "Nguyên mẫu phần mềm",
      'proj.inspect': 'Kiến trúc hệ thống',
      'proj.repo': 'Mã nguồn trên GitHub',
      'proj.m1': 'tác vụ FreeRTOS',
      'proj.m2': 'chu kỳ lấy mẫu',
      "proj.inspectFSM": "RTL & bộ điều khiển LCD",
      'skills.title': 'Kỹ Năng Chuyên Môn',
      'skills.sub': 'Công cụ và công nghệ tôi đã dùng trong các dự án ở trên',
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
      'edu.period': 'Từ 09/2022, dự kiến tốt nghiệp 11/2027 • TP. Hồ Chí Minh, Việt Nam',
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
      'contact.desc': 'Tôi đang tìm vị trí Embedded Software Engineer (Fresher/Entry-level) tại TP. Hồ Chí Minh, các khu vực lân cận hoặc làm việc từ xa. Bạn có thể liên hệ qua email, điện thoại hoặc LinkedIn.',
      'shortcut.led': 'Bật/tắt viền LED',
      'footer.totop': 'Lên Đầu Trang',
      'contact.location': 'TP. Hồ Chí Minh, Việt Nam',
      'contact.phone': 'Điện thoại',
      'contact.copyPhone': 'Sao chép số điện thoại',
      'contact.copyEmail': 'Sao chép email',
      "proj.p2.context": "10 – 12/2024 · Nhóm 5 người",
      "proj.p2.hardware": "Bo đích: Digilent Arty Z7-20 · Ràng buộc xung nhịp XDC: 125 MHz",
      "proj.p2.design": "RTL Verilog · Logic User/Admin · FSM điều khiển LCD",
      "proj.p2.stage": "Nguyên mẫu RTL",
    }
  };

  const fpgaSource = 'https://github.com/SangNguyen-232/FPGA-Vending-System/blob/main/sources_1/new/';
  const lcdStates = [
    'INIT', 'DISPLAY_ON', 'CLEAR_ON', 'SET_CURSOR1', 'WRITE_LINE1',
    'SET_CURSOR2', 'WRITE_LINE2', 'IDLE', 'CHECK_UPDATE'
  ];

  function fpgaPurchase(lang) {
    const story = lang === 'vi' ? {
      title: 'Mua hai đơn vị sản phẩm số 1',
      setup: 'Ở chế độ Admin, đặt đơn giá là 2 và tồn kho là 3. Sang chế độ User, tắt các công tắc chọn sản phẩm rồi nhấn BTN1 để nạp 10 đơn vị. Chọn lại sản phẩm số 1 để bắt đầu mua.',
      steps: [
        ['Từ nút nhấn đến sự kiện trong RTL', 'Mỗi nút đi qua hai tầng thanh ghi đồng bộ. Với ngưỡng thực tế của bộ đếm 20 bit, tín hiệu cần ổn định khoảng 1,61 ms ở xung thiết kế 125 MHz. Nhấn BTN0 hai lần để chọn hai đơn vị sản phẩm số 1, rồi nhấn BTN2 để xác nhận.'],
        ['Từ yêu cầu mua đến giá trị thanh ghi', 'Khi tăng số lượng, bộ điều khiển giới hạn mức chọn theo tồn kho. Khi xác nhận, tổng tiền là 2 × 2 = 4. Giao dịch trừ số dư từ 10 xuống 6 và giảm tồn kho từ 3 xuống 1. Với cùng lựa chọn nhưng số dư dưới 4, nhánh thiếu tiền giữ nguyên số dư và tồn kho.'],
        ['Từ kết quả đến ký tự trên LCD', 'Mạch giao dịch chuẩn bị hai dòng văn bản 128 bit. Bộ điều khiển LCD 16×2 gửi từng ký tự qua bus 8 bit, dùng RS để chọn lệnh hoặc dữ liệu và EN để tạo xung ghi. Dòng đầu hiển thị <code>SUCCESS!</code> hoặc <code>NOT ENOUGH MONEY</code> theo kết quả.']
      ],
      disclosure: '9 trạng thái và thời gian làm mới LCD',
      order: 'Thứ tự các trạng thái của LCD',
      refresh: 'Sau khi ghi 16 ký tự mỗi dòng, FSM vào <code>IDLE</code>, chuyển sang <code>CHECK_UPDATE</code> rồi chờ bộ đếm đạt 12.500.000 trước khi quay về <code>CLEAR_ON</code> để ghi lại hai dòng. Với ràng buộc xung 125 MHz trong XDC, riêng khoảng chờ này tương ứng khoảng 100 ms.',
      test: 'Trong mô phỏng RTL riêng bằng Icarus Verilog ở 125 MHz, cả hai nhánh mua hàng cho số dư, tồn kho và thông báo đúng như ví dụ. FSM đi qua đủ 9 trạng thái. Trên bus LCD, mỗi dòng của khung hình đầu có 16 lượt ghi ký tự. Testbench đi kèm dự án dùng xung 100 MHz và dừng ở 1,01 µs, khi FSM còn ở INIT.',
      bench: 'Testbench LCD'
    } : {
      title: 'Buying two units of product 1',
      setup: 'In Admin mode, set the unit price to 2 and stock to 3. Switch to User mode, deselect all products and press BTN1 to add 10 credits. Select product 1 again to start the purchase.',
      steps: [
        ['From a button press to an RTL event', 'Each button passes through two synchronizer stages. At the target 125 MHz clock, the effective 20-bit counter threshold requires about 1.61 ms of stable input. With product 1 selected, press BTN0 twice to request two units, then BTN2 to confirm.'],
        ['From a purchase request to register updates', 'Stock limits the quantity while the user increases it. At confirmation, the total is 2 × 2 = 4. The purchase reduces credit from 10 to 6 and stock from 3 to 1. With the same selection and fewer than 4 credits, the insufficient-funds branch preserves both values.'],
        ['From the result to characters on the LCD', 'The transaction logic prepares two 128-bit text lines. The 16×2 LCD controller writes one character at a time over an 8-bit bus, using RS to select commands or data and EN to strobe each write. The first line shows <code>SUCCESS!</code> or <code>NOT ENOUGH MONEY</code> according to the outcome.']
      ],
      disclosure: 'Nine LCD states and refresh timing',
      order: 'LCD state sequence',
      refresh: 'After writing 16 characters per line, the FSM enters <code>IDLE</code> and then <code>CHECK_UPDATE</code>. When the counter reaches 12,500,000 it returns to <code>CLEAR_ON</code> to redraw both lines. At the 125 MHz clock specified in the XDC, this wait alone is about 100 ms.',
      test: 'In a separate 125 MHz Icarus Verilog simulation, both purchase cases produced the expected balance, stock and message. The simulation visited all nine LCD states and recorded 16 character writes per line on the bus during the first frame. The repository’s 100 MHz LCD testbench stops at 1.01 µs, still in INIT.',
      bench: 'LCD testbench'
    };

    const sources = ['button_debounce.v', 'top_button_handler.v', 'LCD_display.v'];
    return `
      <article class="fpga-story">
        <h4>${story.title}</h4>
        <p>${story.setup}</p>
        <ol class="fpga-flow">
          ${story.steps.map(([heading, description], i) => `
            <li>
              <h5>${heading}</h5>
              <p>${description}</p>
              <a href="${fpgaSource}${sources[i]}" target="_blank" rel="noopener">${sources[i]}</a>
            </li>`).join('')}
        </ol>
        <section class="fpga-fsm">
          <h5 class="fpga-fsm-title">${story.disclosure}</h5>
          <ol aria-label="${story.order}">
            ${lcdStates.map(state => `<li><code>${state}</code></li>`).join('')}
          </ol>
          <p>${story.refresh}</p>
          <p>${story.test} <a href="${fpgaSource}test_lcd_display.v" target="_blank" rel="noopener">${story.bench}</a></p>
        </section>
      </article>`;
  }

  const modalContentData = {
    'modal-proj1': {
      title_en: 'System architecture',
      title_vi: 'Kiến trúc hệ thống',
      sub_en: 'IoT-Env-Monitor · Yolo Uno ESP32-S3',
      sub_vi: 'IoT-Env-Monitor · Yolo Uno ESP32-S3',
      renderBody: window.IoTArchitecture.render
    },
    'modal-proj2': {
      title_en: 'RTL & LCD controller',
      title_vi: 'RTL & bộ điều khiển LCD',
      sub_en: 'FPGA Vending · Arty Z7-20 · Verilog',
      sub_vi: 'FPGA Vending · Arty Z7-20 · Verilog',
      body_en: fpgaPurchase('en'),
      body_vi: fpgaPurchase('vi')
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
          <a href="https://github.com/qb-isme/btl_CNPM/blob/3beb2876ec67fcfdbf74aa8555a5e47278a0e37e/app/api/receipt/route.ts" target="_blank" rel="noopener">View the PDF receipt implementation</a>
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
          <a href="https://github.com/qb-isme/btl_CNPM/blob/3beb2876ec67fcfdbf74aa8555a5e47278a0e37e/app/api/receipt/route.ts" target="_blank" rel="noopener">Xem mã nguồn xuất biên lai PDF</a>
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

    ['aria-label', 'alt', 'title'].forEach((attribute) => {
      document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((el) => {
        const key = el.getAttribute(`data-i18n-${attribute}`);
        if (dict[key]) el.setAttribute(attribute, dict[key]);
      });
    });

    document.querySelectorAll('[data-copy]').forEach(el => {
      const action = dict[el.dataset.copyType === 'phone' ? 'contact.copyPhone' : 'contact.copyEmail'];
      const visible = el.textContent.trim();
      const value = visible.replace(/\s/g, '') === el.dataset.copy ? visible : el.dataset.copy;
      const label = `${action}: ${value}`;
      el.title = label;
      el.setAttribute('aria-label', label);
    });

  };

  return {
    i18n,
    modalContentData,
    applyTranslations
  };
})();
