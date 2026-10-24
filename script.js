/**
 * =====================================================================
 * PORTFOLIO CLIENT ENGINE
 * Nguyen Van Sang — Embedded Software Engineer
 * Vanilla JavaScript (ES6+) with full i18n, Canvas Particles,
 * Logic Analyzer Oscilloscope, FreeRTOS Live Telemetry,
 * Web Audio Synthesizer, Interactive Terminal, 3D Tilt & AI Stream
 * =====================================================================
 */

(() => {
  'use strict';

  // State & Preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentLang = localStorage.getItem('sang_portfolio_lang') || 'en';
  let sfxEnabled = localStorage.getItem('sang_portfolio_sfx') === 'true';

  /* =====================================================================
     1. INTERNATIONALIZATION (i18n) DICTIONARY
     ===================================================================== */
  const i18n = {
    en: {
      'nav.about': 'About',
      'nav.telemetry': 'Telemetry',
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
      'stats.s1': 'Projects Shipped',
      'stats.s2': 'Concurrent FreeRTOS Tasks',
      'stats.s3': 'Rows TinyML Dataset',
      'stats.s4': 'On-Device Inference',
      'about.title': 'About Me',
      'about.sub': 'Interactive neural assistant & engineering profile',
      'about.userPrompt': "Give me a quick overview of Sang's engineering focus.",
      'about.meta': 'Verified against CV.pdf & GitHub evidence',
      'about.regen': 'Regenerate',
      'about.streamText': "Nguyen Van Sang is a Computer Engineering student at Ho Chi Minh City University of Technology (HCMUT — VNU-HCM), graduating in 2027. He specializes in concurrent embedded firmware on the ESP32-S3 using FreeRTOS, sub-1 ms on-device TinyML inference with TensorFlow Lite Micro, FPGA digital logic in Verilog HDL, and end-to-end IoT cloud pipelines with Node.js and PostgreSQL. He completed an on-site IoT internship at Viettel Group and is actively seeking a Fresher Embedded Software Engineer role.",
      'do.d1.title': 'Firmware & RTOS',
      'do.d1.desc': 'Architecting robust concurrent firmware on ESP32/ESP32-S3 using FreeRTOS: semaphores, queues, event groups, task synchronization, and low-level peripheral drivers (I2C, GPIO, UART).',
      'do.d2.title': 'Edge AI & TinyML',
      'do.d2.desc': 'Deploying optimized TensorFlow Lite for Microcontrollers models on constrained MCUs. Sub-1 ms on-device inference with hardware safety interlocks for real-time sensor classification.',
      'do.d3.title': 'FPGA & Digital Design',
      'do.d3.desc': 'Designing and synthesizing finite state machines (FSM) and digital logic with Verilog HDL on Xilinx Vivado, Cadence Xcelium, and Digilent Arty-Z7 FPGA hardware platforms.',
      'telemetry.title': 'Embedded Telemetry & Hardware Studio',
      'telemetry.sub': 'Real-time FreeRTOS task telemetry, semaphore IPC & digital logic analyzer',
      'telemetry.rtosTitle': 'FreeRTOS v10.5.1 Dual-Core Scheduler',
      'telemetry.scopeTitle': 'Logic Analyzer & Bus Scope',
      'task.name': 'Task Name',
      'task.core': 'Core',
      'task.prio': 'Prio',
      'task.period': 'Period',
      'task.state': 'State',
      'task.stack': 'Stack Free',
      'task.load': 'CPU Load',
      'bus.title': 'Hardware Protocols & Embedded Bus Matrix',
      'exp.title': 'Experience',
      'exp.sub': 'Practical industry engineering and internships',
      'exp.role': 'IoT Intern',
      'exp.company': 'Viettel Dak Lak — Viettel Group',
      'exp.type': 'On-site',
      'exp.b1': 'Learned fundamentals of IoT architectures, industrial sensor interfacing, and low-level ESP32 programming.',
      'exp.b2': 'Explored enterprise IoT fleet management platforms and robust backend development with Node.js and PostgreSQL.',
      'exp.b3': 'Built an end-to-end IoT sensor solution integrating hardware telemetry with secure cloud logging.',
      'filter.all': 'All Projects',
      'filter.embedded': 'Embedded & IoT',
      'filter.fpga': 'FPGA & Digital',
      'filter.web': 'Web & Cloud',
      'proj.title': 'Featured Projects',
      'proj.sub': 'Verified hardware and software implementations',
      'proj.p1.title': 'Smart Agriculture Environmental Monitoring System',
      'proj.p1.sub': 'ESP32-S3 · FreeRTOS · TinyML · Cloud Platform',
      'proj.p1.b1': 'Engineered concurrent FreeRTOS firmware on ESP32-S3 with semaphore-guarded context coordinating 7 tasks (sampling, TinyML inference, pump relay, logging, reset button, LED indicator) across I2C, GPIO, and network.',
      'proj.p1.b2': 'Deployed a float32 TensorFlow Lite Micro classifier (temperature, humidity, soil moisture to 3-class risk) with sub-1 ms inference and hardware safety interlocks.',
      'proj.p1.b3': 'Implemented WiFi AP fallback with LittleFS-persisted networks, streaming telemetry via HTTP/WebSocket to a Dockerized Node.js/PostgreSQL fleet dashboard.',
      'proj.p2.title': 'FPGA Vending Machine Simulator',
      'proj.p2.sub': 'Verilog HDL · Xilinx Vivado · Arty-Z7 FPGA',
      'proj.p2.b1': 'Designed and synthesized a complete Verilog FSM-based vending machine on Digilent Arty-Z7 FPGA board.',
      'proj.p2.b2': 'Engineered finite state machine logic handling synchronous product selection, coin validation, balance computation, and change dispensing.',
      'proj.p2.b3': 'Implemented real-time hardware interfaces for 16x2 alphanumeric LCD display, 7-segment LED counters, and debounced tactical switches.',
      'proj.p3.title': 'Smart Campus Parking Management System',
      'proj.p3.sub': 'Next.js 16 · Express.js · PostgreSQL RLS · React Leaflet',
      'proj.p3.b1': 'Engineered 6 RESTful APIs to synchronize real-time IoT sensor slot status across 6 parking zones with sub-second response times.',
      'proj.p3.b2': 'Integrated automated payment processing and balance management with BKPay payment gateway integration.',
      'proj.p3.b3': 'Developed an interactive 2D GPS map component using React Leaflet and enforced strict multi-role access via PostgreSQL Row-Level Security (RLS) for 5 user tiers.',
      'skills.title': 'Technical Skills',
      'skills.sub': 'Technologies verified from hardware implementations and CV',
      'skills.c1': 'Programming Languages',
      'skills.c2': 'Embedded Systems & RTOS',
      'skills.c3': 'Edge AI & TinyML',
      'skills.c4': 'FPGA & Digital Design',
      'skills.c5': 'Development Tools',
      'skills.c6': 'IoT Backend & Web',
      'edu.title': 'Education & Credentials',
      'edu.sub': 'Formal academic training and international certifications',
      'edu.school': 'Ho Chi Minh City University of Technology — VNU-HCM',
      'edu.degree': 'Bachelor of Computer Engineering',
      'edu.period': 'Sep 2022 – Nov 2027 • Ho Chi Minh City, Vietnam',
      'edu.langsTitle': 'Language Proficiency',
      'edu.langEn': 'English (Technical & TOEIC Reading/Listening)',
      'edu.langVi': 'Vietnamese',
      'cert.title': 'Certifications & Training',
      'cert.sub': 'Standardized certifications and industry internships',
      'cert.c1.name': 'TOEIC (Listening and Reading)',
      'cert.c1.date': 'Dec 2026 • Educational Testing Service (ETS)',
      'cert.c2.name': 'Viettel Group IoT Engineering Internship',
      'cert.c2.date': 'Jun – Aug 2026 • Viettel Dak Lak',
      'cert.c3.name': 'Specialization: IoT & Embedded Systems',
      'cert.c3.date': 'HCMUT Faculty of Computer Science & Engineering',
      'contact.status': 'Open to Fresher Opportunities',
      'contact.title': "Let's Build Something Together",
      'contact.desc': 'I am actively seeking a Fresher Embedded Software Engineer role in Ho Chi Minh City or remote. Feel free to reach out via email, phone, or LinkedIn.',
      'contact.copy': 'Copy Email',
      'footer.totop': 'Back to Top',
      'toast.copied': 'Email copied to clipboard!'
    },
    vi: {
      'nav.about': 'Giới thiệu',
      'nav.telemetry': 'Telemetry',
      'nav.experience': 'Kinh nghiệm',
      'nav.projects': 'Dự án',
      'nav.skills': 'Kỹ năng',
      'nav.education': 'Học vấn',
      'nav.contact': 'Liên hệ',
      'nav.resume': 'Tải CV',
      'loader.text': 'Đang khởi động firmware ESP32-S3',
      'hero.status': 'Sẵn sàng ứng tuyển Fresher Embedded Software',
      'hero.greet': 'Xin chào, tôi là',
      'hero.name': 'Nguyễn Văn Sang',
      'hero.title': 'Kỹ sư Phần mềm Nhúng — Fresher',
      'hero.tagline': 'Tôi phát triển firmware chạy trực tiếp trên phần cứng thực tế: đa nhiệm FreeRTOS đồng thời, suy luận TinyML tại biên, máy trạng thái FPGA, và nền tảng đám mây thu thập dữ liệu IoT.',
      'hero.cta1': 'Xem các dự án',
      'hero.cta2': 'Liên hệ ngay',
      'hero.scroll': 'Cuộn xuống',
      'stats.s1': 'Dự án đã triển khai',
      'stats.s2': 'Tác vụ FreeRTOS đồng thời',
      'stats.s3': 'Dữ liệu huấn luyện TinyML',
      'stats.s4': 'Độ trễ suy luận tại biên',
      'about.title': 'Về Tôi',
      'about.sub': 'Trợ lý AI tương tác & hồ sơ kỹ thuật',
      'about.userPrompt': 'Tóm tắt nhanh định hướng kỹ thuật của Nguyễn Văn Sang.',
      'about.meta': 'Xác thực chuẩn xác theo CV.pdf & minh chứng GitHub',
      'about.regen': 'Phát lại',
      'about.streamText': "Nguyễn Văn Sang là sinh viên năm cuối ngành Kỹ thuật Máy tính tại Trường Đại học Bách khoa – ĐHQG-HCM, tốt nghiệp năm 2027. Chuyên sâu về lập trình firmware đa nhiệm trên ESP32-S3 với FreeRTOS, suy luận mô hình AI tại biên (TinyML dưới 1 ms) với TensorFlow Lite Micro, thiết kế mạch số FPGA bằng Verilog HDL, và xây dựng hệ thống IoT hoàn chỉnh với Node.js và PostgreSQL. Đã hoàn thành kỳ thực tập On-site tại Tập đoàn Viettel và đang tìm kiếm vị trí Fresher Embedded Software Engineer.",
      'do.d1.title': 'Firmware & RTOS',
      'do.d1.desc': 'Thiết kế kiến trúc firmware đa nhiệm mạnh mẽ trên ESP32/ESP32-S3 sử dụng FreeRTOS: semaphore, queue, event group, đồng bộ hóa tác vụ và lập trình ngoại vi cấp thấp (I2C, GPIO, UART).',
      'do.d2.title': 'Edge AI & TinyML',
      'do.d2.desc': 'Triển khai mô hình TensorFlow Lite for Microcontrollers tối ưu hóa trên vi điều khiển. Suy luận thời gian thực dưới 1 ms kèm cơ chế khóa an toàn phần cứng khi cảm biến quá ngưỡng.',
      'do.d3.title': 'FPGA & Thiết kế số',
      'do.d3.desc': 'Thiết kế và tổng hợp mạch logic số, máy trạng thái FSM bằng ngôn ngữ Verilog HDL trên phần mềm Xilinx Vivado, Cadence Xcelium và bo mạch Digilent Arty-Z7 FPGA.',
      'telemetry.title': 'Studio Đo lường Từ xa & Phần cứng',
      'telemetry.sub': 'Đo lường tác vụ FreeRTOS thời gian thực, IPC semaphore & máy phân tích logic',
      'telemetry.rtosTitle': 'Bộ lập lịch FreeRTOS v10.5.1 Lõi kép',
      'telemetry.scopeTitle': 'Máy Phân tích Logic & Dao động ký Bus',
      'task.name': 'Tên tác vụ',
      'task.core': 'Lõi',
      'task.prio': 'Ưu tiên',
      'task.period': 'Chu kỳ',
      'task.state': 'Trạng thái',
      'task.stack': 'Bộ nhớ Stack rảnh',
      'task.load': 'Tải CPU',
      'bus.title': 'Giao thức Phần cứng & Ma trận Bus Nhúng',
      'exp.title': 'Kinh Nghiệm',
      'exp.sub': 'Kinh nghiệm kỹ thuật thực tế và thực tập doanh nghiệp',
      'exp.role': 'Thực tập sinh IoT',
      'exp.company': 'Viettel Đắk Lắk — Tập đoàn Công nghiệp – Viễn thông Quân đội (Viettel)',
      'exp.type': 'Trực tiếp (On-site)',
      'exp.b1': 'Học hỏi và nắm vững nguyên lý cơ bản về IoT, giao tiếp cảm biến công nghiệp và lập trình vi điều khiển ESP32.',
      'exp.b2': 'Nghiên cứu kiến trúc nền tảng IoT và phát triển hệ thống backend xử lý dữ liệu với Node.js và PostgreSQL.',
      'exp.b3': 'Xây dựng giải pháp IoT hoàn chỉnh kết nối thiết bị cảm biến ESP32 và truyền dữ liệu an toàn lên máy chủ.',
      'filter.all': 'Tất cả dự án',
      'filter.embedded': 'Hệ thống nhúng & IoT',
      'filter.fpga': 'FPGA & Mạch số',
      'filter.web': 'Web & Đám mây',
      'proj.title': 'Dự Án Tiêu Biểu',
      'proj.sub': 'Các dự án phần cứng và phần mềm đã được xác thực',
      'proj.p1.title': 'Hệ thống Giám sát Môi trường Nông nghiệp Thông minh',
      'proj.p1.sub': 'ESP32-S3 · FreeRTOS · TinyML · Nền tảng Đám mây',
      'proj.p1.b1': 'Phát triển firmware FreeRTOS đồng thời trên ESP32-S3 với context dùng chung bảo vệ bằng semaphore, điều phối 7 tác vụ (đọc cảm biến, suy luận TinyML, kích rơ-le máy bơm, ghi nhật ký, nút nhấn reset, đèn LED) qua I2C, GPIO và mạng.',
      'proj.p1.b2': 'Triển khai mô hình phân loại float32 TensorFlow Lite Micro (nhiệt độ, độ ẩm, độ ẩm đất thành 3 cấp rủi ro) với thời gian suy luận dưới 1 ms và chốt an toàn phần cứng.',
      'proj.p1.b3': 'Tích hợp cơ chế WiFi AP dự phòng lưu cấu hình LittleFS, truyền dữ liệu thời gian thực qua HTTP/WebSocket đến hệ thống quản lý hạm đội Node.js/PostgreSQL đóng gói Docker.',
      'proj.p2.title': 'Mô phỏng Máy bán hàng Tự động trên FPGA',
      'proj.p2.sub': 'Verilog HDL · Xilinx Vivado · Bo mạch Arty-Z7 FPGA',
      'proj.p2.b1': 'Thiết kế và tổng hợp hoàn chỉnh máy bán hàng tự động dựa trên FSM bằng Verilog trên bo mạch Digilent Arty-Z7 FPGA.',
      'proj.p2.b2': 'Lập trình logic máy trạng thái xử lý đồng bộ việc chọn mặt hàng, nhận diện mệnh giá tiền xu, tính số dư và trả lại tiền thừa.',
      'proj.p2.b3': 'Hiện thực giao tiếp phần cứng thời gian thực cho màn hình LCD ký tự 16x2, LED 7 đoạn hiển thị số tiền và hệ thống nút gạt chống rung phím.',
      'proj.p3.title': 'Hệ thống Quản lý Bãi đỗ xe Khuôn viên Đại học Thông minh',
      'proj.p3.sub': 'Next.js 16 · Express.js · PostgreSQL RLS · Bản đồ React Leaflet',
      'proj.p3.b1': 'Xây dựng 6 API RESTful đồng bộ hóa trạng thái vị trí đỗ xe từ cảm biến IoT theo thời gian thực qua 6 phân khu với độ trễ dưới một giây.',
      'proj.p3.b2': 'Tích hợp quy trình thanh toán trực tuyến tự động và quản lý số dư qua cổng thanh toán BKPay.',
      'proj.p3.b3': 'Phát triển giao diện bản đồ GPS 2D tương tác bằng React Leaflet và kiểm soát phân quyền đa người dùng qua chính sách bảo mật Row-Level Security (RLS) của PostgreSQL.',
      'skills.title': 'Kỹ Năng Chuyên Môn',
      'skills.sub': 'Các công nghệ được xác minh qua dự án phần cứng thực tế và CV',
      'skills.c1': 'Ngôn ngữ lập trình',
      'skills.c2': 'Hệ thống nhúng & RTOS',
      'skills.c3': 'Edge AI & TinyML',
      'skills.c4': 'FPGA & Thiết kế số',
      'skills.c5': 'Công cụ phát triển',
      'skills.c6': 'IoT Backend & Web',
      'edu.title': 'Học Vấn & Chứng Chỉ',
      'edu.sub': 'Đào tạo chính quy và các chứng chỉ tiêu chuẩn quốc tế',
      'edu.school': 'Trường Đại học Bách khoa – ĐHQG-HCM',
      'edu.degree': 'Cử nhân Kỹ thuật Máy tính',
      'edu.period': 'Tháng 9/2022 – Tháng 11/2027 • TP. Hồ Chí Minh, Việt Nam',
      'edu.langsTitle': 'Ngoại ngữ',
      'edu.langEn': 'Tiếng Anh (Chuyên ngành & TOEIC Đọc/Nghe)',
      'edu.langVi': 'Tiếng Việt',
      'cert.title': 'Chứng chỉ & Quá trình đào tạo',
      'cert.sub': 'Chứng chỉ chuẩn hóa quốc tế và thực tập doanh nghiệp',
      'cert.c1.name': 'TOEIC (Kỹ năng Nghe & Đọc)',
      'cert.c1.date': 'Tháng 12/2026 • Viện Khảo thí Giáo dục Hoa Kỳ (ETS)',
      'cert.c2.name': 'Chứng nhận Thực tập Kỹ thuật IoT tại Viettel',
      'cert.c2.date': 'Tháng 6 – 8/2026 • Viettel Đắk Lắk',
      'cert.c3.name': 'Chuyên ngành: Hệ thống Nhúng & IoT',
      'cert.c3.date': 'Khoa Khoa học & Kỹ thuật Máy tính, ĐH Bách khoa',
      'contact.status': 'Sẵn sàng đón nhận cơ hội nghề nghiệp',
      'contact.title': 'Cùng Nhau Tạo Nên Giá Trị Thực',
      'contact.desc': 'Tôi đang tích cực tìm kiếm cơ hội Kỹ sư Phần mềm Nhúng Fresher tại TP. Hồ Chí Minh hoặc hình thức linh hoạt. Rất mong được kết nối qua email, điện thoại hoặc LinkedIn.',
      'contact.copy': 'Sao chép Email',
      'footer.totop': 'Lên Đầu Trang',
      'toast.copied': 'Đã sao chép địa chỉ email vào bộ nhớ tạm!'
    }
  };

  /**
   * Apply translations across all DOM elements with data-i18n attributes
   */
  const applyTranslations = (lang) => {
    currentLang = lang;
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

  /* =====================================================================
     2. SYNTHESIZED CYBER AUDIO ENGINE (Web Audio API)
     ===================================================================== */
  let audioCtx = null;
  const playCyberSound = (frequency = 800, duration = 0.05, type = 'sine') => {
    if (!sfxEnabled || prefersReducedMotion) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  const initSoundToggle = () => {
    const sfxBtn = document.getElementById('sfxToggle');
    if (!sfxBtn) return;

    const updateSfxIcon = () => {
      if (sfxEnabled) {
        sfxBtn.classList.remove('muted');
        sfxBtn.innerHTML = '<svg class="ic"><use href="#i-volume"/></svg>';
      } else {
        sfxBtn.classList.add('muted');
        sfxBtn.innerHTML = '<svg class="ic"><use href="#i-volume-x"/></svg>';
      }
    };

    updateSfxIcon();

    sfxBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      localStorage.setItem('sang_portfolio_sfx', String(sfxEnabled));
      updateSfxIcon();
      if (sfxEnabled) {
        playCyberSound(900, 0.08);
      }
    });
  };

  /* =====================================================================
     3. PRELOADER & INITIALIZATION
     ===================================================================== */
  const initPreloader = () => {
    const loader = document.getElementById('loader');
    if (!loader) {
      startTerminalTyping();
      return;
    }

    if (prefersReducedMotion) {
      loader.classList.add('done');
      startTerminalTyping();
      return;
    }

    const progressBar = loader.querySelector('.loader-bar span');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      if (progressBar) progressBar.style.width = progress + '%';
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add('done');
          startTerminalTyping();
        }, 300);
      }
    }, 140);
  };

  /* =====================================================================
     4. INTERACTIVE CANVAS PARTICLE NETWORK
     ===================================================================== */
  const initCanvasNetwork = () => {
    const canvas = document.getElementById('net');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    });

    let particles = [];
    const createParticles = () => {
      const count = Math.floor(Math.min(width, 1400) / 16);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.55,
          r: Math.random() * 1.5 + 1
        });
      }
    };
    createParticles();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(95, 227, 200, 0.4)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(95, 227, 200, ${0.14 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 140) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 181, 71, ${0.28 * (1 - mdist / 140)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      requestAnimationFrame(draw);
    };

    draw();
  };

  /* =====================================================================
     5. CUSTOM INTERACTIVE CURSOR
     ===================================================================== */
  const initCustomCursor = () => {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring || window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    document.body.classList.add('cursor-on');
    document.body.classList.add('fine-pointer');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      const spot = document.getElementById('spot');
      if (spot) {
        spot.style.setProperty('--x', `${mouseX}px`);
        spot.style.setProperty('--y', `${mouseY}px`);
      }
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    const interactables = 'a, button, .tag, .filter, .pcard, .skill, .edu, .do, .term-chip, [data-cursor]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactables)) {
        document.body.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactables)) {
        document.body.classList.remove('cursor-hover');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-down');
      playCyberSound(1100, 0.04);
    });
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-down'));
  };

  /* =====================================================================
     6. HERO TERMINAL & INTERACTIVE COMMAND ENGINE
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
        playCyberSound(950, 0.05);

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

        // Auto scroll to bottom of terminal
        termBody.scrollTop = termBody.scrollHeight;
      });
    });
  };

  /* =====================================================================
     7. LOGIC ANALYZER & OSCILLOSCOPE WAVEFORM ENGINE
     ===================================================================== */
  const initLogicAnalyzer = () => {
    const canvas = document.getElementById('analyzerCanvas');
    const toggleBtn = document.getElementById('analyzerToggleBtn');
    const btnCh1 = document.getElementById('btnCh1');
    const btnCh2 = document.getElementById('btnCh2');
    const btnCh3 = document.getElementById('btnCh3');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;
    let ch1Active = true;
    let ch2Active = true;
    let ch3Active = true;

    let width = (canvas.width = canvas.parentElement.clientWidth || 360);
    let height = (canvas.height = 180);

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.parentElement.clientWidth || 360;
      height = canvas.height = 180;
    });

    let phase = 0;
    const renderWaveforms = () => {
      if (!isRunning) return;

      ctx.fillStyle = '#040E10';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle oscilloscope grid
      ctx.strokeStyle = 'rgba(30, 59, 65, 0.35)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      phase += 0.08;

      // CH1: I2C SCL (Square wave 400kHz simulated)
      if (ch1Active) {
        ctx.strokeStyle = '#5FE3C8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const yBase1 = 45;
        const amp1 = 20;
        for (let x = 0; x < width; x += 2) {
          const square = Math.sin((x * 0.1) + phase) > 0 ? 1 : -1;
          const y = yBase1 + (square * amp1);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // CH2: I2C SDA (Data bursts)
      if (ch2Active) {
        ctx.strokeStyle = '#FFB547';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const yBase2 = 100;
        const amp2 = 18;
        for (let x = 0; x < width; x += 2) {
          const pseudoData = (Math.sin((x * 0.05) + (phase * 0.7)) + Math.cos((x * 0.12) - phase)) > 0.2 ? 1 : -1;
          const y = yBase2 + (pseudoData * amp2);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // CH3: PWM Motor driver
      if (ch3Active) {
        ctx.strokeStyle = '#BFF2E6';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        const yBase3 = 150;
        const amp3 = 15;
        const duty = 0.4;
        for (let x = 0; x < width; x += 2) {
          const pwm = ((x * 0.08 + phase * 0.5) % 1) < duty ? 1 : -1;
          const y = yBase3 + (pwm * amp3);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      requestAnimationFrame(renderWaveforms);
    };

    renderWaveforms();

    // Toggle Run/Pause
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isRunning = !isRunning;
        playCyberSound(750, 0.05);
        const textSpan = document.getElementById('scopeStateText');
        if (textSpan) {
          textSpan.textContent = isRunning ? 'Pause Scope' : 'Resume Scope';
        }
        if (isRunning) renderWaveforms();
      });
    }

    // Channel toggles
    const setupChBtn = (btn, getActive, setActive) => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        const next = !getActive();
        setActive(next);
        btn.style.opacity = next ? '1' : '0.4';
        playCyberSound(900, 0.04);
      });
    };

    setupChBtn(btnCh1, () => ch1Active, (v) => { ch1Active = v; });
    setupChBtn(btnCh2, () => ch2Active, (v) => { ch2Active = v; });
    setupChBtn(btnCh3, () => ch3Active, (v) => { ch3Active = v; });
  };

  /* =====================================================================
     8. FREERTOS LIVE TASK TELEMETRY SIMULATION
     ===================================================================== */
  const initFreeRTOSTelemetry = () => {
    const taskRows = document.querySelectorAll('#taskTable tbody tr');
    if (!taskRows.length || prefersReducedMotion) return;

    setInterval(() => {
      // Pick random task to update CPU load slightly
      const randomIdx = Math.floor(Math.random() * taskRows.length);
      const row = taskRows[randomIdx];
      const loadBar = row.querySelector('.load-bar span');
      const loadCell = row.cells[6];
      if (loadBar && loadCell) {
        const currentVal = parseFloat(loadCell.textContent) || 8.0;
        const delta = (Math.random() - 0.5) * 1.8;
        const newVal = Math.max(0.4, Math.min(18.5, currentVal + delta)).toFixed(1);
        loadCell.innerHTML = `<div class="load-bar"><span style="width: ${Math.min(100, newVal * 4)}%;"></span></div> ${newVal}%`;
      }
    }, 2400);
  };

  /* =====================================================================
     9. AI ASSISTANT CHAT STREAM SIMULATION
     ===================================================================== */
  let streamRunning = false;
  const startChatStream = () => {
    const typing = document.getElementById('typing');
    const stream = document.getElementById('stream');
    const chatFoot = document.getElementById('chatFoot');
    if (!typing || !stream || streamRunning) return;

    streamRunning = true;
    stream.textContent = '';
    stream.classList.remove('on', 'live');
    typing.classList.add('on');

    const dict = i18n[currentLang] || i18n.en;
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

  /* =====================================================================
     10. 3D CARD TILT & SPOTLIGHT BORDER
     ===================================================================== */
  const initTiltAndSpotlight = () => {
    if (prefersReducedMotion) return;

    document.querySelectorAll('.spot').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
      });
    });

    document.querySelectorAll('.tilt').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        el.classList.add('tilting');
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -6;
        const ry = ((x - cx) / cx) * 6;
        el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      });

      el.addEventListener('mouseleave', () => {
        el.classList.remove('tilting');
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    });

    const hero = document.getElementById('hero');
    const holo = document.getElementById('holo');
    if (hero && holo) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        holo.style.setProperty('--rx', `${(-y * 14).toFixed(2)}deg`);
        holo.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`);
      });
      hero.addEventListener('mouseleave', () => {
        holo.style.setProperty('--rx', '0deg');
        holo.style.setProperty('--ry', '0deg');
      });
    }
  };

  /* =====================================================================
     11. STAT COUNTERS ANIMATION
     ===================================================================== */
  const initStatCounters = () => {
    const stats = document.querySelectorAll('.stat b.count');
    if (!stats.length) return;

    let animated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          animated = true;
          stats.forEach((counter) => {
            const target = parseInt(counter.dataset.to, 10);
            if (isNaN(target)) return;

            if (prefersReducedMotion) {
              counter.textContent = target.toLocaleString();
              return;
            }

            let start = 0;
            const duration = 1600;
            const stepTime = 25;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
              start += increment;
              if (start >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(start).toLocaleString();
              }
            }, stepTime);
          });
        }
      },
      { threshold: 0.3 }
    );

    const statsContainer = document.getElementById('stats');
    if (statsContainer) observer.observe(statsContainer);
  };

  /* =====================================================================
     12. PROJECT FILTERING
     ===================================================================== */
  const initProjectFilters = () => {
    const filters = document.querySelectorAll('#projectFilters .filter');
    const cards = document.querySelectorAll('#projectGrid .pcard');
    if (!filters.length || !cards.length) return;

    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        playCyberSound(900, 0.04);
        filters.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.filter;
        cards.forEach((card) => {
          if (cat === 'all' || card.dataset.cat === cat) {
            card.classList.remove('out');
          } else {
            card.classList.add('out');
          }
        });
      });
    });
  };

  /* =====================================================================
     13. SCROLL REVEALS & ACTIVE NAVIGATION SPY
     ===================================================================== */
  const initScrollHandling = () => {
    const nav = document.getElementById('nav');
    const progressBar = document.getElementById('progress');
    const chatSection = document.getElementById('chat');

    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((r) => revealObserver.observe(r));

    if (chatSection) {
      const chatObserver = new IntersectionObserver(
        (entries, obs) => {
          if (entries[0].isIntersecting) {
            startChatStream();
            obs.unobserve(chatSection);
          }
        },
        { threshold: 0.3 }
      );
      chatObserver.observe(chatSection);
    }

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      if (nav) {
        if (scrollTop > 40) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }

      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-links a');
      let currentSectionId = '';

      sections.forEach((sec) => {
        const top = sec.offsetTop - 130;
        if (scrollTop >= top) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    });
  };

  /* =====================================================================
     14. CLIPBOARD COPY & TOAST NOTIFICATION
     ===================================================================== */
  const initClipboard = () => {
    const copyBtn = document.getElementById('copyEmailBtn');
    const toast = document.getElementById('toast');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
      const email = 'sangnguyen230204@gmail.com';
      playCyberSound(1200, 0.08);
      try {
        await navigator.clipboard.writeText(email);
        if (toast) {
          toast.classList.add('on');
          setTimeout(() => {
            toast.classList.remove('on');
          }, 3200);
        }
      } catch (err) {
        window.prompt('Copy email address:', email);
      }
    });
  };

  /* =====================================================================
     15. MOBILE MENU & INTERACTIVE EVENTS
     ===================================================================== */
  const initMobileMenu = () => {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!burger || !mobileMenu) return;

    const toggleMenu = () => {
      playCyberSound(800, 0.05);
      const isOpen = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    };

    burger.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  };

  /* =====================================================================
     16. INITIALIZE CLIENT ENGINE ON DOM READY
     ===================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
      langToggle.addEventListener('click', () => {
        playCyberSound(1000, 0.05);
        const nextLang = currentLang === 'en' ? 'vi' : 'en';
        applyTranslations(nextLang);
        startChatStream();
      });
    }
    applyTranslations(currentLang);

    // 2. Chat Regenerate Button
    const regenBtn = document.getElementById('regenBtn');
    if (regenBtn) {
      regenBtn.addEventListener('click', () => {
        playCyberSound(900, 0.05);
        streamRunning = false;
        startChatStream();
      });
    }

    // 3. Components & Systems
    initSoundToggle();
    initPreloader();
    initCanvasNetwork();
    initCustomCursor();
    initInteractiveTerminal();
    initLogicAnalyzer();
    initFreeRTOSTelemetry();
    initTiltAndSpotlight();
    initStatCounters();
    initProjectFilters();
    initScrollHandling();
    initClipboard();
    initMobileMenu();
  });
})();
