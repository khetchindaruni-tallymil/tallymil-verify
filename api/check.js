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
        <body style="background:#fdfbf7;color:#1c1917;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;">
          <div style="background:#fff;padding:30px;border-radius:20px;text-align:center;border:1px solid #e7e5e4;">
            <h2 style="color:#dc2626;">⚠️ ไม่พบข้อมูล</h2>
            <p>ไม่พบรหัสสินค้านี้ในระบบ [${id}]</p>
          </div>
        </body>
        </html>
      `);
    }

    let purchaseDateStr = bagInfo.activatedDate;
    let warrantyExpiryStr = '';

    if (!purchaseDateStr) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      purchaseDateStr = `${year}-${month}-${day}`;
      
      const expiryYear = year + 1;
      warrantyExpiryStr = `${expiryYear}-${month}-${day}`;
      
      bagInfo.activatedDate = purchaseDateStr;
      bagInfo.expiryDate = warrantyExpiryStr;
    } else {
      warrantyExpiryStr = bagInfo.expiryDate;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="th">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>TALLY MiL - Authenticity Verification</title>
          <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fdfbf7; color: #292524; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
              .card { background: linear-gradient(145deg, #ffffff, #f7f4ed); padding: 30px 24px; border-radius: 24px; width: 100%; max-width: 350px; text-align: center; border: 1px solid rgba(180, 140, 60, 0.25); box-shadow: 0 20px 40px rgba(180, 140, 60, 0.08); }
              .logo-container { margin-bottom: 15px; display: flex; flex-direction: column; align-items: center; }
              .logo-svg { width: 75px; height: 75px; filter: drop-shadow(0px 4px 10px rgba(180, 140, 60, 0.15)); }
              .brand-title { color: #9a7b2c; font-size: 24px; font-weight: 800; letter-spacing: 2px; margin: 10px 0 2px 0; font-family: serif; }
              .brand-subtitle { font-size: 10px; color: #8c857b; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
              .status { background: rgba(180, 140, 60, 0.1); color: #8a6f24; border: 1px solid rgba(180, 140, 60, 0.3); font-weight: 700; padding: 10px; border-radius: 12px; margin: 15px 0; font-size: 14px; display: flex; align-items: center; justify-content: center; gap: 6px; }
              .owner-box { background: rgba(255, 255, 255, 0.9); border: 1px dashed rgba(180, 140, 60, 0.4); border-radius: 12px; padding: 12px; margin-bottom: 15px; text-align: left; }
              .owner-label { font-size: 10px; color: #9a7b2c; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; font-weight: 600; }
              .owner-name { font-size: 15px; font-weight: bold; color: #1c1917; }
              .info { text-align: left; font-size: 13px; background: rgba(247, 244, 237, 0.7); padding: 16px; border-radius: 12px; line-height: 1.8; border: 1px solid #e7e5e4; }
              .info p { margin: 4px 0; color: #78716c; display: flex; justify-content: space-between; }
              .info b { color: #1c1917; font-weight: 600; text-align: right; max-width: 180px; }
              .footer-note { margin-top: 15px; font-size: 10px; color: #a8a29e; letter-spacing: 0.5px; }
          </style>
      </head>
      <body>
          <div class="card">
              <div class="logo-container">
                  <svg class="logo-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="100" r="92" fill="none" stroke="#9a7b2c" stroke-width="6"/>
                      <circle cx="100" cy="100" r="83" fill="none" stroke="#9a7b2c" stroke-width="2"/>
                      <g fill="#9a7b2c">
                          <path d="M 55,60 h 20 v 30 l 25,-25 l 25,25 v -30 h 20 v 80 h -20 v -30 l -25,25 l -25,-25 v 30 h -20 z" />
                          <rect x="92" y="95" width="16" height="10" rx="2" fill="#fdfbf7"/>
                          <rect x="95" y="92" width="10" height="16" rx="2" fill="#fdfbf7"/>
                      </g>
                  </svg>
                  <div class="brand-title">TALLY MiL</div>
                  <div class="brand-subtitle">Authenticity & Ownership Verification</div>
              </div>
              <div class="status"><span>✦</span> Verified Authentic Product</div>
              <div class="owner-box">
                  <div class="owner-label">Registered Owner</div>
                  <div class="owner-name">${bagInfo.owner}</div>
              </div>
              <div class="info">
                  <p>รุ่น: <b>${bagInfo.model}</b></p>
                  <p>Serial No: <b>${bagInfo.serial}</b></p>
                  <p>วันที่เริ่มประกัน: <b style="color: #9a7b2c;">${purchaseDateStr}</b></p>
                  <p>ประกันสิ้นสุด: <b>${warrantyExpiryStr}</b></p>
              </div>
              <div class="footer-note">Official 1-Year Warranty Activated</div>
          </div>
      </body>
      </html>
    `;

    return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(htmlContent);
  } catch (error) {
    return res.status(500).send(`Server Error: ${error.message}`);
  }
};
