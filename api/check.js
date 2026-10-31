module.exports = async (req, res) => {
  const { id, owner, model, start } = req.query;

  // ถ้าไม่มีการแนบพารามิเตอร์มา ให้เด้งกลับไปหน้าแอดมิน
  if (!id && !owner && !model) {
    res.writeHead(302, { Location: '/api/admin' });
    res.end();
    return;
  }

  const serialNo = id || 'TM-UNKNOWN';
  const customerName = owner ? decodeURIComponent(owner) : 'ไม่ระบุชื่อ';
  const productModel = model ? decodeURIComponent(model) : 'Hexag Bovin';
  const startDate = start || '2026-01-01';

  return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TALLY MiL - ใบรับประกันสินค้า</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0c0a09; color: #f5f5f4; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .card { background: #1c1917; padding: 28px 20px; border-radius: 20px; width: 100%; max-width: 360px; border: 1px solid rgba(212, 175, 55, 0.4); box-shadow: 0 15px 30px rgba(0,0,0,0.8); text-align: center; }
            h2 { color: #fef3c7; font-size: 24px; margin-top: 0; margin-bottom: 4px; font-family: serif; letter-spacing: 2px; }
            .subtitle { font-size: 11px; color: #d4af37; text-transform: uppercase; margin-bottom: 20px; letter-spacing: 1px; }
            .badge { background: rgba(212, 175, 55, 0.15); color: #d4af37; border: 1px solid rgba(212, 175, 55, 0.4); padding: 6px 12px; border-radius: 20px; font-size: 12px; display: inline-block; margin-bottom: 15px; font-weight: bold; }
            .info-box { background: #0c0a09; border: 1px solid #383531; border-radius: 12px; padding: 15px; text-align: left; margin-bottom: 20px; }
            .info-row { margin-bottom: 10px; font-size: 13px; }
            .info-row:last-child { margin-bottom: 0; }
            .label { color: #a8a29e; font-size: 11px; display: block; margin-bottom: 2px; }
            .value { color: #fff; font-weight: 500; font-size: 14px; }
            .footer { font-size: 10px; color: #78716c; margin-top: 15px; }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>TALLY MiL</h2>
            <div class="subtitle">Certificate of Warranty</div>
            
            <div class="badge">✓ สินค้าแท้และรับประกันสมบูรณ์</div>

            <div class="info-box">
                <div class="info-row">
                    <span class="label">รุ่นสินค้า / สี / ขนาด:</span>
                    <span class="value">${productModel}</span>
                </div>
                <div class="info-row" style="margin-top: 10px;">
                    <span class="label">รหัส Serial No.:</span>
                    <span class="value">${serialNo}</span>
                </div>
                <div class="info-row" style="margin-top: 10px;">
                    <span class="label">ผู้รับสิทธิ์ / ลูกค้า:</span>
                    <span class="value">${customerName}</span>
                </div>
                <div class="info-row" style="margin-top: 10px;">
                    <span class="label">วันเริ่มรับประกัน:</span>
                    <span class="value">${startDate}</span>
                </div>
            </div>

            <div class="footer">ขอบคุณที่เลือกใช้ผลิตภัณฑ์ TALLY MiL</div>
        </div>
    </body>
    </html>
  `);
};
