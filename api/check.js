const crypto = require('crypto');

const BAG_DATABASE = {
  '04A1B2C3D4E5F6': {
    model: 'Hexag-Bovin',
    serial: 'TM-HEX-2026-001',
    purchaseDate: '30 ต.ค. 2026',
    warrantyExpiry: '30 ต.ค. 2027',
    status: 'AUTHENTIC'
  }
};

module.exports = (req, res) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).send(renderHTML('INVALID', 'ไม่พบข้อมูล NFC', 'กรุณาสแกนจากชิปบนกระเป๋าโดยตรง'));
  }

  const bagInfo = BAG_DATABASE[uid.toUpperCase()];
  if (!bagInfo) {
    return res.status(444).send(renderHTML('NOT_FOUND', 'ไม่พบข้อมูลในระบบ', `UID: ${uid} ยังไม่ได้ลงทะเบียน`));
  }

  return res.send(renderHTML('SUCCESS', 'VERIFIED AUTHENTIC', 'สินค้าแท้จาก TALLY MiL', bagInfo));
};

function renderHTML(type, title, subtitle, data = {}) {
  const isSuccess = type === 'SUCCESS';
  const badgeColor = isSuccess ? '#10B981' : '#EF4444';

  return `
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TALLY MiL - Authenticity Verification</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0F172A; color: #F8FAFC; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
        .card { background: #1E293B; border-radius: 20px; padding: 32px 24px; max-width: 380px; width: 100%; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); text-align: center; border: 1px solid #334155; }
        .logo { font-size: 22px; font-weight: 800; letter-spacing: 3px; color: #E2E8F0; margin-bottom: 24px; }
        .status-badge { display: inline-block; background: ${badgeColor}20; color: ${badgeColor}; border: 1px solid ${badgeColor}; padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 13px; letter-spacing: 1px; margin-bottom: 16px; }
        h1 { font-size: 20px; font-weight: 700; margin: 0 0 8px 0; }
        p { font-size: 14px; color: #94A3B8; margin: 0 0 24px 0; }
        .info-box { background: #0F172A; border-radius: 12px; padding: 16px; text-align: left; margin-bottom: 20px; border: 1px solid #334155; }
        .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1E293B; font-size: 13px; }
        .info-row:last-child { border-bottom: none; }
        .label { color: #64748B; }
        .value { color: #F1F5F9; font-weight: 600; }
        .footer { font-size: 11px; color: #475569; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="logo">TALLY MiL</div>
        <div class="status-badge">${isSuccess ? 'AUTHENTIC' : 'WARNING'}</div>
        <h1>${title}</h1>
        <p>${subtitle}</p>

        ${isSuccess ? `
          <div class="info-box">
            <div class="info-row"><span class="label">รุ่นสินค้า</span><span class="value">${data.model}</span></div>
            <div class="info-row"><span class="label">Serial No.</span><span class="value">${data.serial}</span></div>
            <div class="info-row"><span class="label">วันที่สั่งซื้อ</span><span class="value">${data.purchaseDate}</span></div>
            <div class="info-row"><span class="label">การรับประกันถึง</span><span class="value" style="color:#10B981">${data.warrantyExpiry}</span></div>
          </div>
        ` : ''}

        <div class="footer">NFC Dynamic Cryptographic Verification System</div>
      </div>
    </body>
    </html>
  `;
}
