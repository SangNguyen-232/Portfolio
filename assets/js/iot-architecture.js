window.IoTArchitecture = (() => {
  'use strict';

  const sourceRoot = 'https://github.com/SangNguyen-232/IoT-Env-Monitor/blob/project_linux/';
  const overview = {
    en: {
      intro: 'The ESP32-S3 measures the air and controls ventilation on the board. A browser on the LAN can change its settings, and a separate service stores measurement history.',
      loop: 'Local control loop',
      stages: [['DHT20', 'Air temperature and humidity'], ['ESP32-S3', 'FreeRTOS and TinyML'], ['GPIO10', 'Fan relay command']],
      sources: 'Implementation'
    },
    vi: {
      intro: 'ESP32-S3 đo nhiệt độ, độ ẩm không khí và điều khiển thông gió ngay trên bo. Người dùng có thể đổi cấu hình từ trình duyệt trong mạng LAN. Một dịch vụ riêng lưu lịch sử đo.',
      loop: 'Vòng điều khiển trên bo',
      stages: [['DHT20', 'Nhiệt độ và độ ẩm không khí'], ['ESP32-S3', 'FreeRTOS và TinyML'], ['GPIO10', 'Lệnh điều khiển rơ-le quạt']],
      sources: 'Mã nguồn'
    }
  };

  const decisions = [
    {
      en: [
        'One FreeRTOS task owns the relay',
        'Every five seconds the sensor task reads the DHT20 over I2C and records the fan command at acquisition. Sampling, inference and actuation run in separate FreeRTOS tasks. Of the seven application tasks, only task_fan writes GPIO10. A separate ADC input monitors soil moisture.',
        'The inference task copies the sample under a mutex, then releases the lock before running the model. It publishes the result only if the sequence number and acquisition time still match. A late prediction is discarded as soon as a newer sample has arrived.'
      ],
      vi: [
        'Một tác vụ FreeRTOS nắm quyền điều khiển rơ-le',
        'Cứ 5 giây, tác vụ cảm biến đọc DHT20 qua I2C và ghi lại lệnh quạt tại thời điểm đo. Việc lấy mẫu, suy luận và điều khiển chạy ở các tác vụ FreeRTOS riêng. Trong bảy tác vụ, chỉ task_fan được ghi GPIO10. Đầu dò độ ẩm đất dùng một ngõ ADC riêng để giám sát.',
        'Tác vụ suy luận chỉ giữ mutex trong lúc sao chép mẫu, rồi nhả khóa trước khi chạy mô hình. Khi có kết quả, tác vụ đối chiếu cả số thứ tự lẫn thời điểm lấy mẫu. Nếu đã có mẫu mới, kết quả cũ bị loại.'
      ],
      paths: ['firmware/src/main.cpp', 'firmware/src/environment_monitor.cpp', 'firmware/src/tinyml.cpp']
    },
    {
      en: [
        'Hysteresis and a fallback protect the relay',
        'AUTO uses separate ON and OFF thresholds and a 10-second minimum in each state to avoid rapid switching. SHADOW records the forecast while the same rules drive the fan. In automatic modes, an invalid air reading or one over 15 seconds old forces the relay off immediately.',
        'AI can request an early start between thresholds only with a fresh forecast for the same sample, a matching threshold profile and an ON score of at least 0.80. If the model is unavailable, the saved thresholds still govern the fan. A manual ON command expires after five minutes.'
      ],
      vi: [
        'Hai ngưỡng đóng ngắt và quy tắc dự phòng bảo vệ rơ-le',
        'AUTO dùng ngưỡng bật và tắt riêng, giữ mỗi trạng thái ít nhất 10 giây để tránh đóng ngắt liên tục. Ở SHADOW, firmware ghi nhận dự báo còn quạt vẫn chạy theo ngưỡng. Trong các chế độ tự động, mẫu không khí lỗi hoặc cũ quá 15 giây buộc rơ-le tắt ngay.',
        'Trong vùng giữa hai ngưỡng, AI chỉ được yêu cầu bật sớm khi dự báo còn mới, khớp mẫu đo, cấu hình ngưỡng khớp với mô hình và điểm ON đạt ít nhất 0,80. Nếu mô hình không sẵn sàng, quạt vẫn chạy theo ngưỡng đã lưu. Lệnh bật thủ công hết hiệu lực sau 5 phút.'
      ],
      paths: ['firmware/include/fan_policy.h', 'firmware/src/fan.cpp']
    },
    {
      en: [
        'A 30-second forecast in a 4 KiB tensor arena',
        'Seven consecutive air readings and the sampled fan command yield eight features for a 5,536-byte INT8 model. Assuming the command stays the same, it forecasts the OFF, HOLD or ON band 30 seconds ahead. TensorFlow Lite Micro uses a fixed 4 KiB tensor arena on the ESP32-S3.',
        'Three test traces end at 28.5 °C and 71% relative humidity with the fan off. The rising trace predicts ON, the falling trace OFF, and the steady trace HOLD. On 3,600 held-out synthetic episodes, the desktop INT8 model scored 87.28% against 82.94% for linear extrapolation.'
      ],
      vi: [
        'Dự báo trước 30 giây với 4 KiB bộ nhớ tensor',
        'Từ bảy mẫu không khí liên tiếp và lệnh quạt lúc lấy mẫu, firmware tính tám đặc trưng cho mô hình INT8 dung lượng 5.536 byte. Với giả định lệnh quạt được giữ nguyên, mô hình dự báo vùng OFF, HOLD hoặc ON sau 30 giây. TensorFlow Lite Micro dùng vùng nhớ tensor cố định 4 KiB trên ESP32-S3.',
        'Ba chuỗi kiểm thử cùng kết thúc ở 28,5 °C và độ ẩm 71% khi quạt tắt. Mô hình dự báo ON với chuỗi tăng, OFF với chuỗi giảm và HOLD với chuỗi ổn định. Trên 3.600 kịch bản mô phỏng dành riêng cho kiểm thử, mô hình INT8 chạy trên máy tính đạt 87,28%, còn ngoại suy tuyến tính đạt 82,94%.'
      ],
      paths: ['firmware/include/temporal_window.h', 'firmware/include/fan_inference.h', 'ml/models/fan_model_manifest.json']
    },
    {
      en: [
        'Local control continues through a backend outage',
        'The board serves its own LAN dashboard. HTTP accepts control requests and WebSocket reports readings and applied relay commands. A separate task posts events to Express, which stores per-device history in PostgreSQL. An optional Cloudflare tunnel provides remote access to the backend.',
        'A six-message RAM queue buffers uploads. When it fills, the oldest message is dropped so sampling and control can continue. The boot ID, sample sequence and relay decision time let an operator trace a command back to its reading even if the upload arrived late.'
      ],
      vi: [
        'Bo vẫn điều khiển quạt khi mất kết nối với máy chủ',
        'Bo phục vụ dashboard trong mạng LAN. HTTP nhận yêu cầu điều khiển, còn WebSocket trả về số đo và lệnh rơ-le đã thực thi. Một tác vụ riêng gửi sự kiện đến Express để lưu lịch sử từng thiết bị vào PostgreSQL. Có thể truy cập backend từ xa qua đường hầm Cloudflare.',
        'Hàng đợi trong RAM giữ tối đa sáu bản tin. Khi đầy, bản tin cũ nhất bị loại để việc đo và điều khiển vẫn tiếp tục. Dù bản tin đến muộn, người vận hành vẫn có thể đối chiếu lệnh quạt với số đo nhờ mã lần khởi động, số thứ tự mẫu và thời điểm ra quyết định.'
      ],
      paths: ['firmware/src/web_server.cpp', 'firmware/src/telemetry_client.cpp', 'services/backend/src/index.js']
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
      const sources = element('div', '', 'iot-sources');
      sources.append(element('strong', labels.sources));
      for (const path of decision.paths) {
        const link = element('a', path.split('/').pop());
        link.href = sourceRoot + path;
        link.target = '_blank';
        link.rel = 'noopener';
        sources.append(link);
      }
      section.append(sources);
      return section;
    });
    body.replaceChildren(element('p', labels.intro, 'iot-intro'), flow, ...topics);
  }

  return {render};
})();
