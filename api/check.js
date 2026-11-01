module.exports = async (req, res) => {
  const { code } = req.query;

  // --- ฐานข้อมูลรหัสย่อ สำหรับดึงข้อมูลภาษาไทย/อังกฤษเต็มรูปแบบ ---
  const SHORT_CODES = {
    'TM001': {
      model: 'Hexag Bovin / Brown / Micro',
      id: 'TM-HEXB-001',
      owner: 'คุณเชอรี่ (Khun Cherry)',
      start: '2026-10-31'
    },
    'TM002': {
      model: 'Hexag Bovin / Brown / Micro',
      id: 'TM-HEXB-002',
      owner: 'คุณมินตา (Khun Minta)',
      start: '2026-10-31'
    },
    'TM003': {
      model: 'Hexag Vegan / Red / Mini',
      id: 'TM-HEXV-003',
      owner: 'คุณสมชาย (Khun Somchai)',
      start: '2026-11-01'
    }
  };

  // ถ้าไม่มีรหัสส่งมา หรือไม่มีรหัสนี้ในระบบ ให้ดีดกลับไปหน้าแอดมิน
  if (!code || !SHORT_CODES[code]) {
    res.writeHead(302, { Location: '/api/admin' });
    res.end();
    return;
  }

  const item = SHORT_CODES[code];

  return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TALLY MiL - Certificate of Warranty</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0c0a09; color: #f5f5f4; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; overflow: hidden; }

            /* --- 1. หน้า Welcome Splash Screen (สีครีมอุ่นๆ หรูหรา) --- */
            #splash-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #fdfbf7 0%, #f3efe6 100%);
                color: #262522;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 999;
                text-align: center;
                padding: 30px;
                transition: opacity 1s ease-in-out, visibility 1s;
            }

            .luxury-logo-wrapper {
                width: 80px;
                height: 80px;
                border: 2px solid #b89758;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 24px;
                animation: spinLogo 3s cubic-bezier(0.25, 1, 0.5, 1) infinite alternate;
                box-shadow: 0 10px 25px rgba(184, 151, 88, 0.25);
            }

            .luxury-logo-text { font-family: serif; font-size: 22px; font-weight: 700; letter-spacing: 3px; color: #8c6d31; }

            @keyframes spinLogo {
                0% { transform: rotate(0deg) scale(0.9); }
                100% { transform: rotate(360deg) scale(1.05); }
            }

            .welcome-title { font-family: serif; font-size: 22px; color: #1a1918; letter-spacing: 1.5px; margin-bottom: 8px; opacity: 0; animation: fadeInText 1.5s ease 0.5s forwards; }
            .welcome-sub { font-size: 12px; color: #8c6d31; text-transform: uppercase; letter-spacing: 2px; opacity: 0; animation: fadeInText 1.5s ease 0.8s forwards; }

            @keyframes fadeInText {
                to { opacity: 1; transform: translateY(0); }
                from { opacity: 0; transform: translateY(10px); }
            }

            /* --- 2. หน้า Certificate (ธีมดำ-ทอง หรูหรา) --- */
            .card { 
                background: #1c1917; 
                padding: 28px 20px; 
                border-radius: 24px; 
                width: 100%; 
                max-width: 360px; 
                border: 1px solid rgba(212, 175, 55, 0.4); 
                box-shadow: 0 20px 40px rgba(0,0,0,0.9); 
                text-align: center;
                opacity: 0;
                transform: scale(0.95);
                transition: opacity 1s ease, transform 1s ease;
            }

            .card.show { opacity: 1; transform: scale(1); }
            h2 { color: #fef3c7; font-size: 24px; margin-top: 0; margin-bottom: 4px; font-family: serif; letter-spacing: 2px; }
            .subtitle { font-size: 11px; color: #d4af37; text-transform: uppercase; margin-bottom: 18px; letter-spacing: 1.5px; }
            
            .badge-luxury { 
                background: linear-gradient(135deg, rgba(6, 78, 59, 0.8), rgba(16, 185, 129, 0.25)); 
                color: #6ee7b7; 
                border: 1px solid #10b981; 
                padding: 8px 16px; 
                border-radius: 30px; 
                font-size: 11px; 
                display: inline-block; 
                margin-bottom: 18px; 
                font-weight: 700; 
                letter-spacing: 1px;
                box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
            }

            .info-box { background: #0c0a09; border: 1px solid #383531; border-radius: 16px; padding: 16px; text-align: left; margin-bottom: 16px; }
            .info-row { margin-bottom: 12px; font-size: 13px; }
            .info-row:last-child { margin-bottom: 0; }
            .label { color: #a8a29e; font-size: 11px; display: block; margin-bottom: 2px; }
            .value { color: #fff; font-weight: 500; font-size: 14px; }
            
            .countdown-box { background: rgba(212, 175, 55, 0.05); border: 1px solid rgba(212, 175, 55, 0.25); border-radius: 16px; padding: 14px; margin-bottom: 15px; }
            .countdown-title { font-size: 10px; color: #d4af37; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
            .timer { font-size: 16px; font-weight: 700; color: #fef3c7; font-family: monospace; letter-spacing: 1px; }

            .footer { font-size: 10px; color: #78716c; margin-top: 15px; }
        </style>
    </head>
    <body>

        <!-- หน้าต้อนรับสีครีม (Welcome Splash) -->
        <div id="splash-screen">
            <div class="luxury-logo-wrapper">
                <div class="luxury-logo-text">TM</div>
            </div>
            <div class="welcome-title">Welcome to the family</div>
            <div class="welcome-sub">ยินดีต้อนรับสู่ครอบครัว TALLY MiL</div>
        </div>

        <!-- หน้าใบรับประกัน (Certificate) -->
        <div class="card" id="main-card">
            <h2>TALLY MiL</h2>
            <div class="subtitle">Certificate of Warranty / ใบรับประกันสินค้า</div>
            
            <div class="badge-luxury">✓ AUTHENTIC & GUARANTEED (ของแท้และรับประกัน)</div>

            <div class="info-box">
                <div class="info-row">
                    <span class="label">รุ่นสินค้า / สี / ขนาด (Model / Color / Size):</span>
                    <span class="value">${item.model}</span>
                </div>
                <div class="info-row">
                    <span class="label">รหัส Serial No. (Serial Number):</span>
                    <span class="value">${item.id}</span>
                </div>
                <div class="info-row">
                    <span class="label">ผู้รับสิทธิ์ / ลูกค้า (Registered Owner):</span>
                    <span class="value">${item.owner}</span>
                </div>
                <div class="info-row">
                    <span class="label">วันเริ่มรับประกัน (Start Date):</span>
                    <span class="value">${item.start}</span>
                </div>
            </div>

            <div class="countdown-box">
                <div class="countdown-title">WARRANTY REMAINING / ระยะเวลารับประกันคงเหลือ (1 ปี)</div>
                <div id="countdown" class="timer">กำลังคำนวณ...</div>
            </div>

            <div class="footer">Thank you for choosing TALLY MiL<br>ขอบคุณที่เลือกใช้ผลิตภัณฑ์ TALLY MiL</div>
        </div>

        <script>
            // สลับจากหน้าครีมต้อนรับ ไปหน้าใบรับประกันอัตโนมัติภายใน 2.8 วินาที
            window.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    const splash = document.getElementById('splash-screen');
                    const card = document.getElementById('main-card');
                    
                    splash.style.opacity = '0';
                    splash.style.visibility = 'hidden';
                    card.classList.add('show');
                }, 2800);
            });

            // ฟังก์ชันนับถอยหลัง 1 ปีเต็มจากวันที่เริ่มรับประกัน
            function startCountdown() {
                const startDateStr = "${item.start}";
                const start = new Date(startDateStr);
                
                const expireDate = new Date(start);
                expireDate.setFullYear(expireDate.getFullYear() + 1);

                function updateTimer() {
                    const now = new Date();
                    const diff = expireDate - now;

                    if (diff <= 0) {
                        document.getElementById('countdown'].innerText = "EXPIRED / หมดระยะเวลารับประกัน";
                        document.getElementById('countdown').style.color = "#ef4444";
                        return;
                    }

                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                    document.getElementById('countdown').innerText = 
                        days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
                }

                updateTimer();
                setInterval(updateTimer, 1000);
            }

            startCountdown();
        </script>
    </body>
    </html>
  `);
};
