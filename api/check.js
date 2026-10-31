<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TALLY MiL - Authenticity & Ownership Verification</title>
  <!-- Google Fonts: Prompt & Cinzel -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Prompt:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Prompt', sans-serif;
    }

    body {
      background: radial-gradient(circle at center, #1a1c23 0%, #0d0e12 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      color: #e5e5e5;
    }

    /* Glamour Dark Card Container */
    .card-container {
      width: 100%;
      max-width: 420px;
      background: linear-gradient(145deg, rgba(28, 30, 38, 0.9), rgba(15, 16, 21, 0.95));
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 24px;
      padding: 32px 24px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8),
                  inset 0 1px 1px rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }

    /* Top Gold Accent Line */
    .card-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, transparent, #d4af37, #f3e5ab, #d4af37, transparent);
    }

    /* Logo Area */
    .logo-box {
      text-align: center;
      margin-bottom: 24px;
    }

    .logo-box svg {
      width: 85px;
      height: 85px;
      filter: drop-shadow(0 4px 12px rgba(212, 175, 55, 0.3));
    }

    .brand-title {
      font-family: 'Cinzel', serif;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 3px;
      background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-top: 10px;
      text-transform: uppercase;
    }

    .brand-subtitle {
      font-size: 10px;
      letter-spacing: 2px;
      color: #a39274;
      text-transform: uppercase;
      margin-top: 4px;
    }

    /* Premium Emerald Verified Badge */
    .verified-badge {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.25));
      border: 1px solid rgba(52, 211, 153, 0.5);
      color: #34d399;
      padding: 12px;
      border-radius: 14px;
      text-align: center;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 1px;
      margin-bottom: 24px;
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .verified-badge svg {
      width: 18px;
      height: 18px;
      fill: #34d399;
    }

    /* Details Section */
    .section-box {
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(212, 175, 55, 0.12);
      border-radius: 16px;
      padding: 18px;
      margin-bottom: 16px;
    }

    .label-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #b38728;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .owner-name {
      font-size: 18px;
      color: #ffffff;
      font-weight: 500;
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px 8px;
      font-size: 13px;
    }

    .info-label {
      color: #9ca3af;
      font-weight: 300;
    }

    .info-value {
      color: #e5e5e5;
      text-align: right;
      font-weight: 500;
    }

    .highlight-gold {
      color: #f3e5ab;
      font-weight: 600;
    }

    /* Footer */
    .card-footer {
      text-align: center;
      font-size: 11px;
      color: #6b7280;
      margin-top: 20px;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>

  <div class="card-container">
    
    <!-- Logo & Brand Header -->
    <div class="logo-box">
      <!-- โลโก้ SVG คมชัด 100% ปรับโทนสีทอง -->
      <svg viewBox="0 0 239 238" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#bf953f" />
            <stop offset="50%" stop-color="#fcf6ba" />
            <stop offset="100%" stop-color="#b38728" />
          </linearGradient>
        </defs>
        <path d="M 120.00 0.00 L 126.55 0.09 L 133.10 0.36 L 139.63 0.81 L 146.14 1.45 L 152.61 2.26 L 159.04 3.26 L 165.40 4.43 L 171.71 5.79 L 177.93 7.32 L 184.07 9.03 L 190.11 10.91 L 196.04 12.96 L 201.85 15.17 L 207.54 17.55 L 213.08 20.09 L 218.47 22.78 L 223.70 25.62 L 228.76 28.61 L 233.64 31.75 M 120.00 0.00 L 113.45 0.09 L 106.90 0.36 L 100.37 0.81 L 93.86 1.45 L 87.39 2.26 L 80.96 3.26 L 74.60 4.43 L 68.29 5.79 L 62.07 7.32 L 55.93 9.03 L 49.89 10.91 L 43.96 12.96 L 38.15 15.17 L 32.46 17.55 L 26.92 20.09 L 21.53 22.78 L 16.30 25.62 L 11.24 28.61 L 6.36 31.75 M 233.64 31.75 Z" fill="url(#goldGrad)" fill-rule="evenodd" />
        <!-- สัญลักษณ์มอนอแกรม TALLY MiL -->
        <circle cx="119.5" cy="119" r="115" stroke="url(#goldGrad)" stroke-width="7" fill="none"/>
        <circle cx="119.5" cy="119" r="105" stroke="url(#goldGrad)" stroke-width="2" fill="none"/>
        <path d="M 60 45 H 112 V 193 H 60 Z M 127 45 H 179 V 193 H 127 Z" fill="url(#goldGrad)" />
        <path d="M 60 70 L 112 110 L 60 150 Z M 179 70 L 127 110 L 179 150 Z" fill="#15171e" />
        <rect x="110" y="115" width="19" height="8" fill="url(#goldGrad)" />
      </svg>
      
      <div class="brand-title">TALLY MiL</div>
      <div class="brand-subtitle">Authenticity & Ownership Verification</div>
    </div>

    /* แถบการันตีสีเขียวมรกตพรีเมี่ยม */
    <div class="verified-badge">
      <svg viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      Verified Authentic Product
    </div>

    <!-- ข้อมูลผู้ถือครอง -->
    <div class="section-box">
      <div class="label-title">Registered Owner</div>
      <div class="owner-name">คุณ พรราวุฒิ พุ่มดอกไม้</div>
    </div>

    <!-- ข้อมูลสินค้าและการรับประกัน -->
    <div class="section-box">
      <div class="info-grid">
        <span class="info-label">รุ่นสินค้า:</span>
        <span class="info-value highlight-gold">Hexag Bovin<br><small style="color:#9ca3af;">(Brown / Size Mini)</small></span>

        <span class="info-label">Serial No:</span>
        <span class="info-value">TM-HEXB-001</span>

        <span class="info-label">วันที่เริ่มประกัน:</span>
        <span class="info-value highlight-gold" id="startDate">กำลังคำนวณ...</span>

        <span class="info-label">ประกันสิ้นสุด:</span>
        <span class="info-value highlight-gold" id="endDate">กำลังคำนวณ...</span>
      </div>
    </div>

    <div class="card-footer">
      Official 1-Year Warranty Activated
    </div>

  </div>

  <script>
    // สคริปต์ดึงเวลาจริงที่ลูกค้าสแกน
    function setDynamicWarranty() {
      const now = new Date();
      
      // วันที่เริ่มประกัน (วันที่สแกน)
      const startYear = now.getFullYear();
      const startMonth = String(now.getMonth() + 1).padStart(2, '0');
      const startDateStr = String(now.getDate()).padStart(2, '0');
      
      // วันที่หมดประกัน (1 ปีถัดไป)
      const endYear = startYear + 1;
      
      document.getElementById('startDate').innerText = `${startYear}-${startMonth}-${startDateStr}`;
      document.getElementById('endDate').innerText = `${endYear}-${startMonth}-${startDateStr}`;
    }

    // ทำงานทันทีเมื่อโหลดหน้าเว็บ
    setDynamicWarranty();
  </script>
</body>
</html>
