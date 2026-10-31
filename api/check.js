const BAG_DATABASE = {
  'BAG-001': {
    model: 'Hexag Bovin (Brown / Size Mini)',
    serial: 'TM-HEXB-001',
    owner: 'คุณ พรราวุฒิ พุ่มดอกไม้',
    activatedDate: null,
    status: 'AUTHENTIC'
  }
};

module.exports = async (req, res) => {
  try {
    const rawId = req.query.id || req.query.uid || 'BAG-001';
    const id = rawId.trim();
    const bagInfo = BAG_DATABASE[id];

    if (!bagInfo) {
      return res.status(404).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
        <!DOCTYPE html>
        <html lang="th">
        <head><meta charset="UTF-8"><title>Not Found</title></head>
        <body style="background:#0c0a09;color:#f5f5f4;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;">
          <div style="background:#1c1917;padding:30px;border-radius:20px;text-align:center;border:1px solid #292524;">
            <h2 style="color:#ef4444;">⚠️ ไม่พบข้อมูล</h2>
            <p>ไม่พบรหัสสินค้านี้ในระบบ [${id}]</p>
          </div>
        </body>
        </html>
      `);
    }

    let purchaseDateStr = bagInfo.activatedDate;
    let warrantyExpiryStr = '';
    let scanTimestamp = '';

    if (!purchaseDateStr) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      purchaseDateStr = `${year}-${month}-${day}`;
      scanTimestamp = `${purchaseDateStr} ${hours}:${minutes}:${seconds} น.`;

      const expiryYear = year + 1;
      warrantyExpiryStr = `${expiryYear}-${month}-${day}`;
      
      bagInfo.activatedDate = purchaseDateStr;
      bagInfo.expiryDate = warrantyExpiryStr;
      bagInfo.scanTime = scanTimestamp;
    } else {
      warrantyExpiryStr = bagInfo.expiryDate;
      scanTimestamp = bagInfo.scanTime;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="th">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>TALLY MiL - Authenticity Verification</title>
          <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0c0a09; color: #f5f5f4; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 15px; box-sizing: border-box; }
              .card { background: linear-gradient(145deg, #1c1917, #121110); padding: 28px 20px; border-radius: 24px; width: 100%; max-width: 360px; text-align: center; border: 1px solid rgba(212, 175, 55, 0.4); box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
              
              .brand-header { margin-bottom: 20px; }
              .brand-title { color: #fef3c7; font-size: 26px; font-weight: 800; letter-spacing: 3px; margin: 0 0 4px 0; font-family: serif; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
              .brand-subtitle { font-size: 10px; color: #d4af37; text-transform: uppercase; letter-spacing: 2px; }
              
              .status { background: rgba(212, 175, 55, 0.15); color: #fde047; border: 1px solid rgba(212, 175, 55, 0.5); font-weight: 700; padding: 10px; border-radius: 12px; margin-bottom: 16px; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 6px; }
              
              .owner-box { background: rgba(30, 27, 24, 0.9); border: 1px dashed rgba(212, 175, 55, 0.6); border-radius: 12px; padding: 12px; margin-bottom: 16px; text-align: left; }
              .owner-label { font-size: 10px; color: #d4af37; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; font-weight: 600; }
              .owner-name { font-size: 15px; font-weight: bold; color: #ffffff; }
              
              .info { text-align: left; font-size: 13px; background: rgba(18, 16, 15, 0.8); padding: 16px; border-radius: 12px; line-height: 1.8; border: 1px solid #292524; margin-bottom: 16px; }
              .info p { margin: 4px 0; color: #a8a29e; display: flex; justify-content: space-between; }
              .info b { color: #f5f5f4; font-weight: 600; text-align: right; max-width: 190px; }
              
              /* ส่วนแสดงเวลารันสดด้านล่าง */
              .live-clock-box { background: rgba(212, 175, 55, 0.08); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 12px; margin-bottom: 16px; text-align: center; }
              .clock-label { font-size: 10px; color: #d4af37; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
              .clock-value { font-size: 15px; font-weight: bold; color: #fef08a; font-family: monospace; letter-spacing: 1px; }

              .footer-note { margin-top: 10px; font-size: 10px; color: #78716c; letter-spacing: 0.5px; }
          </style>
      </head>
      <body>
          <div class="card">
              <!-- ไม่มีโลโก้ โชว์ชื่อแบรนด์เด่นชัดและอ่านง่าย -->
              <div class="brand-header">
                  <div class="brand-title">TALLY MiL</div>
                  <div class="brand-subtitle">Authenticity & Ownership Verification</div>
              </div>

              <div class="status">
                  <span>✦</span> Verified Authentic Product
              </div>

              <div class="owner-box">
                  <div class="owner-label">Registered Owner</div>
                  <div class="owner-name">${bagInfo.owner}</div>
              </div>

              <div class="info">
                  <p>รุ่น (Model): <b>${bagInfo.model}</b></p>
                  <p>Serial No: <b>${bagInfo.serial}</b></p>
                  <p>เวลาสแกนจริง: <b>${scanTimestamp}</b></p>
                  <p>วันที่เริ่มประกัน: <b>${purchaseDateStr}</b></p>
                  <p>ประกันสิ้นสุด (1 ปี): <b style="color: #fde047;">${warrantyExpiryStr}</b></p>
              </div>

              <!-- นาฬิกาดิจิทัลวิ่งเวลาปัจจุบันแบบเรียลไทม์ -->
              <div class="live-clock-box">
                  <div class="clock-label">Current Live Time</div>
                  <div id="live-clock" class="clock-value">--:--:--</div>
              </div>

              <div class="footer-note">Official 1-Year Warranty Activated</div>
          </div>

          <script>
              function updateClock() {
                  const now = new Date();
                  const hours = String(now.getHours()).padStart(2, '0');
                  const minutes = String(now.getMinutes()).padStart(2, '0');
                  const seconds = String(now.getSeconds()).padStart(2, '0');
                  const timeString = hours + ':' + minutes + ':' + seconds + ' น.';
                  document.getElementById('live-clock').innerText = timeString;
              }
              setInterval(updateClock, 1000);
              updateClock();
          </script>
      </body>
      </html>
    `;

    return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(htmlContent);
  } catch (error) {
    return res.status(500).send(`Server Error: ${error.message}`);
  }
};
