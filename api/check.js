const BAG_DATABASE = {
  'BAG-001': {
    model: 'Hexagon Tote Bag',
    serial: 'TM-HEX-001',
    owner: 'คุณ เขตชินดา (Khetchinda)',
    purchaseDate: '2026-03-31',
    warrantyExpiry: '2027-03-31',
    status: 'AUTHENTIC'
  },
  'BAG-002': {
    model: 'Hexagon Tote Bag',
    serial: 'TM-HEX-002',
    owner: 'คุณ สมชาย (Somchai)',
    purchaseDate: '2026-04-01',
    warrantyExpiry: '2027-04-01',
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
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0b0f19; color: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
              .card { background: #131b2e; padding: 30px; border-radius: 20px; width: 320px; text-align: center; border: 1px solid #1e293b; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
              h2 { color: #ef4444; margin-bottom: 5px; }
          </style>
      </head>
      <body>
          <div class="card">
              <h2>⚠️ ไม่พบข้อมูล</h2>
              <p style="font-size: 14px; color: #94a3b8;">ไม่พบรหัสสินค้านี้ในระบบ [${id}]</p>
          </div>
      </body>
      </html>
    `);
  }

  return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TALLY MIL - Authenticity Verification</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0b0f19; color: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .card { background: #131b2e; padding: 28px 24px; border-radius: 20px; width: 100%; max-width: 340px; text-align: center; border: 1px solid #1e293b; box-shadow: 0 15px 30px rgba(0,0,0,0.6); }
            
            /* Official Logo Styling */
            .logo-container { margin-bottom: 12px; display: flex; flex-direction: column; align-items: center; }
            .logo-svg { width: 70px; height: 70px; fill: #38bdf8; filter: drop-shadow(0px 4px 8px rgba(56, 189, 248, 0.3)); }
            .brand-title { color: #38bdf8; font-size: 22px; font-weight: 800; letter-spacing: 1.5px; margin: 10px 0 2px 0; }
            .brand-subtitle { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
            
            /* Status Badge */
            .status { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid #10b981; font-weight: 700; padding: 10px; border-radius: 12px; margin: 15px 0; font-size: 15px; display: flex; align-items: center; justify-content: center; gap: 6px; }
            
            /* Owner Box */
            .owner-box { background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px dashed #38bdf8; border-radius: 12px; padding: 12px; margin-bottom: 15px; text-align: left; }
            .owner-label { font-size: 11px; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
            .owner-name { font-size: 15px; font-weight: bold; color: #fff; }
            
            /* Product Details */
            .info { text-align: left; font-size: 13px; background: #0f172a; padding: 16px; border-radius: 12px; line-height: 1.7; border: 1px solid #1e293b; }
            .info p { margin: 4px 0; color: #94a3b8; display: flex; justify-content: space-between; }
            .info b { color: #f8fafc; font-weight: 600; }
        </style>
    </head>
    <body>
        <div class="card">
            <!-- Official TALLY MiL Logo -->
            <div class="logo-container">
                <svg class="logo-svg" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#38bdf8" stroke-width="4"/>
                    <circle cx="50" cy="50" r="41" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
                    <!-- Monogram M Icon -->
                    <path d="M 28,30 L 38,30 L 38,46 L 50,30 L 62,46 L 62,30 L 72,30 L 72,70 L 62,70 L 62,54 L 50,70 L 38,54 L 38,70 L 28,70 Z" fill="#38bdf8"/>
                </svg>
                <div class="brand-title">TALLY MiL</div>
                <div class="brand-subtitle">Authenticity Verification</div>
            </div>

            <!-- Verification Status -->
            <div class="status">
                <span>✔</span> สินค้าของแท้ (AUTHENTIC)
            </div>

            <!-- Owner Info -->
            <div class="owner-box">
                <div class="owner-label">👑 เจ้าของกรรมสิทธิ์ (Owner)</div>
                <div class="owner-name">${bagInfo.owner}</div>
            </div>

            <!-- Bag Details -->
            <div class="info">
                <p>รุ่น: <b>${bagInfo.model}</b></p>
                <p>Serial No: <b>${bagInfo.serial}</b></p>
                <p>วันที่ซื้อ: <b>${bagInfo.purchaseDate}</b></p>
                <p>ประกันสิ้นสุด: <b>${bagInfo.warrantyExpiry}</b></p>
            </div>
        </div>
    </body>
    </html>
  `);
};
