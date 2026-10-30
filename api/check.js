
const BAG_DATABASE = {
  'BAG-001': {
    model: 'Hexag Bovin (Brown / Size Mini)',
    serial: 'TM-HEXB-001',
    owner: 'คุณ พรราวุฒิ พุ่มดอกไม้',
    // ถ้ายังไม่เคยสแกน ค่า activatedDate จะเป็น null เพื่อรันเวลาปัจจุบันเมื่อสแกนครั้งแรก
    activatedDate: null, 
    status: 'AUTHENTIC'
  }
};

module.exports = async (req, res) => {
  const rawId = req.query.id || req.query.uid || 'BAG-001';
  const id = rawId.trim();
  const bagInfo = BAG_DATABASE[id];

  if (!bagInfo) {
    return res.status(404).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
      <!DOCTYPE html>
      <html lang="th">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>TALLY MIL - Not Found</title>
          <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0c0a09; color: #f5f5f4; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
              .card { background: #1c1917; padding: 30px; border-radius: 20px; width: 320px; text-align: center; border: 1px solid #292524; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
              h2 { color: #ef4444; margin-bottom: 5px; }
          </style>
      </head>
      <body>
          <div class="card">
              <h2>⚠️ ไม่พบข้อมูล</h2>
              <p style="font-size: 14px; color: #a8a29e;">ไม่พบรหัสสินค้านี้ในระบบ [${id}]</p>
          </div>
      </body>
      </html>
    `);
  }

  // ระบบจำลองการเปิดใช้งานครั้งแรก (First-Scan Activation)
  let purchaseDateStr = bagInfo.activatedDate;
  let warrantyExpiryStr = '';

  if (!purchaseDateStr) {
    // หากสแกนครั้งแรก ให้ใช้วันที่และเวลาปัจจุบัน ณ ตอนที่สแกน
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    purchaseDateStr = `${year}-${month}-${day}`;

    // คำนวณประกัน 1 ปีถัดไป
    const expiryYear = year + 1;
    warrantyExpiryStr = `${expiryYear}-${month}-${day}`;
    
    // บันทึกค่าจำลองไว้ (สำหรับ Prototype นี้จะแสดงผลทันที)
    bagInfo.activatedDate = purchaseDateStr;
    bagInfo.expiryDate = warrantyExpiryStr;
  } else {
    warrantyExpiryStr = bagInfo.expiryDate;
  }

  return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TALLY MiL - Authenticity Verification</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0c0a09; color: #f5f5f4; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .card { background: linear-gradient(145deg, #1c1917, #11100f); padding: 30px 24px; border-radius: 24px; width: 100%; max-width: 350px; text-align: center; border: 1px solid rgba(212, 175, 55, 0.3); box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
            
            /* Logo & Brand Styling (Warm Gold Theme) */
            .logo-container { margin-bottom: 15px; display: flex; flex-direction: column; align-items: center; }
            .logo-svg { width: 75px; height: 75px; filter: drop-shadow(0px 4px 12px rgba(212, 175, 55, 0.25)); }
            .brand-title { color: #d4af37; font-size: 24px; font-weight: 800; letter-spacing: 2px; margin: 10px 0 2px 0; font-family: serif; }
            .brand-subtitle { font-size: 10px; color: #a8a29e; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
            
            /* Status Badge */
            .status { background: rgba(212, 175, 55, 0.1); color: #d4af37; border: 1px solid rgba(212, 175, 55, 0.4); font-weight: 700; padding: 10px; border-radius: 12px; margin: 15px 0; font-size: 14px; display: flex; align-items: center; justify-content: center; gap: 6px; letter-spacing: 0.5px; }
            
            /* Owner Box */
            .owner-box { background: rgba(28, 25, 23, 0.8); border: 1px dashed rgba(212, 175, 55, 0.5); border-radius: 12px; padding: 12px; margin-bottom: 15px; text-align: left; }
            .owner-label { font-size: 10px; color: #d4af37; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; font-weight: 600; }
            .owner-name { font-size: 15px; font-weight: bold; color: #fef3c7; }
            
            /* Product Details */
            .info { text-align: left; font-size: 13px; background: rgba(12, 10, 9, 0.6); padding: 16px; border-radius: 12px; line-height: 1.8; border: 1px solid #292524; }
            .info p { margin: 4px 0; color: #a8a29e; display: flex; justify-content: space-between; }
            .info b { color: #f5f5f4; font-weight: 600; text-align: right; max-width: 180px; }
            
            .footer-note { margin-top: 15px; font-size: 10px; color: #78716c; letter-spacing: 0.5px; }
        </style>
    </head>
    <body>
        <div class="card">
            <!-- Brand Logo & Name -->
            <div class="logo-container">
                <svg class="logo-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="92" fill="none" stroke="#d4af37" stroke-width="6"/>
                    <circle cx="100" cy="100" r="83" fill="none" stroke="#d4af37" stroke-width="2"/>
                    <g fill="#d4af37">
                        <path d="M 55,60 h 20 v 30 l 25,-25 l 25,25 v -30 h 20 v 80 h -20 v -30 l -25,25 l -25,-25 v 30 h -20 z" />
                        <rect x="92" y="95" width="16" height="10" rx="2" fill="#0c0a09"/>
                        <rect x="95" y="92" width="10" height="16" rx="2" fill="#0c0a09"/>
                    </g>
                </svg>
                <div class="brand-title">TALLY MiL</div>
                <div class="brand-subtitle">Authenticity & Ownership Verification</div>
            </div>

            <!-- Verification Status -->
            <div class="status">
                <span>✦</span> Verified Authentic Product
            </div>

            <!-- Owner Info -->
            <div class="owner-box">
                <div class="owner-label">Registered Owner</div>
                <div class="owner-name">${bagInfo.owner}</div>
            </div>

            <!-- Bag Details -->
            <div class="info">
                <p>รุ่น: <b>${bagInfo.model}</b></p>
                <p>Serial No: <b>${bagInfo.serial}</b></p>
                <p>วันที่เริ่มประกัน: <b style="color: #d4af37;">${purchaseDateStr}</b></p>
                <p>ประกันสิ้นสุด: <b>${warrantyExpiryStr}</b></p>
            </div>

            <div class="footer-note">Official 1-Year Warranty Activated</div>
        </div>
    </body>
    </html>
  `);
};
