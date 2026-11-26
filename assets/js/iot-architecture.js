window.IoTArchitecture = (() => {
  'use strict';

  const overview = {
    en: {
      intro: 'Developed, flashed and tested from an Ubuntu Linux VM, the Yolo Uno ESP32-S3 runs sensing, TinyML inference, relay actuation and its WebSocket dashboard locally on the board and Wi-Fi LAN. On the VM, PostgreSQL 18 stays private inside Docker while only the Express 5 API and central admin UI are published remotely through a Cloudflare Worker, Workers VPC and an outbound Cloudflare Tunnel.',
      loop: 'Local control loop',
      stages: [['DHT20', 'I2C air temperature & humidity'], ['ESP32-S3', '7 FreeRTOS tasks & INT8 TinyML'], ['GPIO10', 'Active-high fan relay command']]
    },
    vi: {
      intro: 'Được phát triển, nạp firmware và kiểm thử trên máy ảo Ubuntu Linux, bo Yolo Uno ESP32-S3 thực hiện đọc cảm biến, suy luận TinyML, đóng ngắt rơ-le và phục vụ dashboard WebSocket trực tiếp trên bo trong mạng Wi-Fi LAN. Trên máy ảo, PostgreSQL 18 giữ riêng tư trong Docker, chỉ API Express 5 và trang quản trị trung tâm được mở truy cập từ xa qua Cloudflare Worker, Workers VPC và Cloudflare Tunnel chiều đi ra.',
      loop: 'Vòng điều khiển trên bo',
      stages: [['DHT20', 'Nhiệt độ & độ ẩm không khí (I2C)'], ['ESP32-S3', '7 tác vụ FreeRTOS & TinyML INT8'], ['GPIO10', 'Lệnh rơ-le quạt mức cao']]
    }
  };

  const decisions = [
    {
      en: [
        'One FreeRTOS task owns the relay',
        'Every five seconds temp_humi_monitor reads the DHT20 over I2C (GPIO11/12), records the active fan command, updates the 16×2 I2C LCD and signals GPIO48 and WS2812B (GPIO45) risk LEDs. A separate GPIO2 ADC channel monitors soil moisture without affecting air-risk or fan logic. Of the seven priority-2 FreeRTOS tasks, only task_fan writes GPIO10.',
        'tiny_ml_task copies each sample snapshot under mutexContext and releases the lock before running TensorFlow Lite Micro. It publishes the forecast and notifies task_fan only if the sample sequence and acquisition timestamp still match, discarding stale predictions immediately.'
      ],
      vi: [
        'Một tác vụ FreeRTOS duy nhất nắm quyền ghi rơ-le',
        'Cứ mỗi 5 giây, temp_humi_monitor đọc DHT20 qua I2C (GPIO11/12), ghi nhận lệnh quạt tại thời điểm lấy mẫu, cập nhật LCD 16×2 I2C và báo mức rủi ro qua LED GPIO48 cùng WS2812B (GPIO45). Kênh ADC GPIO2 đo độ ẩm đất độc lập, tách biệt khỏi logic đánh giá không khí và điều khiển quạt. Trong bảy tác vụ FreeRTOS mức ưu tiên 2, chỉ task_fan được phép ghi GPIO10.',
        'tiny_ml_task sao chép bản chụp mẫu dưới khóa mutexContext rồi nhả khóa trước khi chạy TensorFlow Lite Micro. Tác vụ chỉ công bố dự báo và đánh thức task_fan khi số thứ tự mẫu cùng thời điểm lấy mẫu còn khớp, loại bỏ ngay kết quả trễ khi đã có mẫu mới.'
      ]
    },
    {
      en: [
        'Hysteresis, profile checks and a fallback protect the relay',
        'At first boot without saved thresholds, AUTO keeps GPIO10 off and rejects SHADOW or AI with HTTP 409. Once configured with OR or AND thresholds, AUTO enforces separate ON/OFF limits and a 10-second minimum dwell per state, while SHADOW logs forecasts alongside rule-driven actuation. Invalid or stale air readings (> 15 s) force immediate shutoff.',
        'AI mode requires the matching OR reference profile (30/28 °C and 75/70% RH), in-domain air readings (5–50 °C, 20–100% RH), a fresh forecast for the current sample and a peak score of at least 0.80 to start ventilation early inside the hysteresis band. Otherwise it falls back to the saved AUTO rules. Manual ON runs time out after five minutes.'
      ],
      vi: [
        'Trễ đóng ngắt, kiểm tra cấu hình và cơ chế dự phòng bảo vệ rơ-le',
        'Khi mới khởi động mà chưa lưu ngưỡng, AUTO giữ GPIO10 tắt và từ chối chuyển sang SHADOW hoặc AI với mã HTTP 409. Sau khi cấu hình ngưỡng theo logic OR hoặc AND, AUTO áp dụng ngưỡng bật/tắt riêng kèm thời gian giữ trạng thái tối thiểu 10 giây, còn SHADOW ghi nhận dự báo song song với luật ngưỡng. Mẫu đọc lỗi hoặc cũ quá 15 giây buộc rơ-le ngắt tức thì.',
        'Chế độ AI chỉ bật quạt sớm trong vùng trễ khi cấu hình khớp bộ ngưỡng chuẩn OR (30/28 °C và 75/70% RH), số đo nằm trong miền hợp lệ (5–50 °C, 20–100% RH), dự báo khớp mẫu hiện tại và điểm cực đại đạt ít nhất 0,80; nếu không sẽ tự động quay về luật AUTO đã lưu. Lệnh bật MANUAL tự ngắt sau 5 phút.'
      ]
    },
    {
      en: [
        'A 30-second INT8 forecast in a 4 KiB tensor arena',
        'Trained and quantized offline in Python 3.12 on the Ubuntu Linux VM, the 5,536-byte INT8 network ([8, 64, 32, 3]) compiles directly into firmware and runs inside a static 4 KiB tensor arena. Seven consecutive valid samples (restarting on gaps > 8 s) plus the sampled fan state produce eight trend features to forecast the OFF, HOLD or ON band 30 seconds ahead.',
        'Three verification traces ending at 28.5 °C and 71% RH with the fan off separate cleanly into ON (rising), OFF (falling) and HOLD (steady). Across 3,600 held-out synthetic test episodes, the desktop INT8 model reached 87.28% accuracy versus 82.94% for 30-second linear extrapolation and 71.03% for the static current-band rule.'
      ],
      vi: [
        'Dự báo INT8 trước 30 giây trong vùng nhớ tensor tĩnh 4 KiB',
        'Được huấn luyện và lượng tử hóa ngoại tuyến bằng Python 3.12 trên máy ảo Ubuntu Linux, mạng INT8 dung lượng 5.536 byte ([8, 64, 32, 3]) được biên dịch thẳng vào firmware và chạy trên vùng nhớ tensor tĩnh 4 KiB. Bảy mẫu hợp lệ liên tiếp (khởi tạo lại nếu giãn cách > 8 giây) cùng trạng thái quạt lúc lấy mẫu tạo thành tám đặc trưng xu hướng để dự báo vùng OFF, HOLD hoặc ON sau 30 giây.',
        'Ba chuỗi kiểm chứng cùng kết thúc tại 28,5 °C và 71% RH khi quạt tắt phân tách rõ thành ON (xu hướng tăng), OFF (xu hướng giảm) và HOLD (ổn định). Trên 3.600 kịch bản kiểm thử mô phỏng độc lập, mô hình INT8 trên máy tính đạt độ chính xác 87,28%, vượt mức 82,94% của ngoại suy tuyến tính 30 giây và 71,03% của quy tắc ngưỡng tĩnh tức thời.'
      ]
    },
    {
      en: [
        'LAN-only device web server and resilient telemetry buffering',
        'Port 80 on the ESP32-S3 serves the LittleFS dashboard, one-time-token WebSocket stream (/ws) and ElegantOTA (/update) strictly on the local Wi-Fi LAN or setup AP (192.168.4.1)—never through Cloudflare. Opening a board from /admin/ issues a five-minute HMAC-SHA256 ticket bound to its MAC and LAN IP for direct LAN sign-in.',
        'After SNTP sync, task_database posts HTTPS /sensor events with 200 ms per-source debounce and fan-event priority. A six-payload RAM queue drops the oldest entry when full so local sensing and control never stall during network outages, while boot_id, sample_seq and decision timestamps keep readings and relay commits traceable.'
      ],
      vi: [
        'Web server nội bộ mạng LAN trên bo và đệm gửi dữ liệu chịu lỗi mạng',
        'Cổng 80 trên ESP32-S3 phục vụ dashboard LittleFS, luồng WebSocket xác thực bằng token dùng một lần (/ws) và ElegantOTA (/update) hoàn toàn trong mạng Wi-Fi LAN hoặc AP cài đặt (192.168.4.1)—không đi qua Cloudflare. Khi mở thiết bị từ /admin/, hệ thống cấp vé HMAC-SHA256 hiệu lực 5 phút gắn với địa chỉ MAC và IP LAN để trình duyệt kết nối thẳng trong mạng nội bộ.',
        'Sau khi đồng bộ giờ SNTP, task_database gửi bản tin HTTPS /sensor với chống dội 200 ms theo từng nguồn và ưu tiên sự kiện quạt. Hàng đợi RAM 6 bản tin tự bỏ bản cũ nhất khi đầy để việc đo và điều khiển tại chỗ không bị nghẽn khi đứt mạng; boot_id, sample_seq và mốc thời gian quyết định giúp truy vết chính xác từng lệnh đóng ngắt.'
      ]
    },
    {
      en: [
        'Ubuntu Linux VM stack and selective Cloudflare Workers VPC exposure',
        'Docker Compose on the Ubuntu Linux VM runs iot_postgres (PostgreSQL 18), iot_backend (Express 5) and iot_cloudflared on an internal bridge network. PostgreSQL binds only to Docker and VM loopback (127.0.0.1:5433) and is never exposed to Cloudflare, while Express exposes port 3000 solely inside Docker with no open inbound host or router ports.',
        'iot_cloudflared maintains an outbound Cloudflare Tunnel with a single Workers VPC route (no public tunnel hostname) to http://backend:3000. Public Cloudflare Workers (*.workers.dev, deployed via Wrangler) accept HTTPS requests from remote operators (/login, /admin/*, RBAC and JSONL export) and ESP32-S3 telemetry (X-Device-Key), forwarding them over the IOT_BACKEND VPC binding and returning HTTP 502 if the origin is offline.'
      ],
      vi: [
        'Hạ tầng Docker trên máy ảo Ubuntu Linux và phạm vi triển khai chọn lọc qua Cloudflare Workers VPC',
        'Docker Compose trên máy ảo Ubuntu Linux vận hành iot_postgres (PostgreSQL 18), iot_backend (Express 5) và iot_cloudflared trên mạng bridge nội bộ. PostgreSQL chỉ gắn vào mạng Docker và loopback của máy ảo (127.0.0.1:5433), tuyệt đối không đưa lên Cloudflare; container Express chỉ mở cổng 3000 trong nội bộ Docker, không mở bất kỳ cổng inbound nào trên máy chủ hay router.',
        'iot_cloudflared duy trì Cloudflare Tunnel chiều đi ra với duy nhất một tuyến Workers VPC (không mở tên miền tunnel công khai) nối tới http://backend:3000. Cổng Cloudflare Workers ở biên mạng (*.workers.dev, triển khai qua Wrangler) nhận yêu cầu HTTPS từ người vận hành từ xa (/login, /admin/*, phân quyền RBAC, xuất JSONL) và dữ liệu ESP32-S3 (X-Device-Key), chuyển tiếp qua liên kết VPC IOT_BACKEND và trả mã HTTP 502 nếu backend ngoại tuyến.'
      ]
    }
  ];

  function element(tag, text, className) {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    return el;
  }

  function render(body, lang) {
    const labels = overview[lang];
    const flow = element('ol', '', 'iot-flow');
    flow.setAttribute('aria-label', labels.loop);
    for (const [part, role] of labels.stages) {
      const stage = element('li');
      stage.append(element('b', part), element('span', role));
      flow.append(stage);
    }

    const topics = decisions.map((decision) => {
      const [title, ...paragraphs] = decision[lang];
      const section = element('section', '', 'iot-decision');
      section.append(element('h4', title, 'iot-decision-title'));
      for (const paragraph of paragraphs) section.append(element('p', paragraph));
      return section;
    });
    body.replaceChildren(element('p', labels.intro, 'iot-intro'), flow, ...topics);
  }

  return {render};
})();
