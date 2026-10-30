const BAG_DATABASE = {
  'BAG-001': {
    model: 'Hexagon Tote Bag',
    serial: 'TM-HEX-001',
    purchaseDate: '2026-03-31',
    warrantyExpiry: '2027-03-31',
    status: 'AUTHENTIC'
  }
};

module.exports = async (req, res) => {
  // ดึงค่ารหัสและตัดช่องว่างทิ้งทั้งหมด เพื่อป้องกันปัญหาพิมพ์ผิดหรือเว้นวรรค
  const rawId = req.query.id || req.query.uid || '';
  const id = rawId.trim();
  
  const bagInfo = BAG_DATABASE[id];

  if (!bagInfo) {
    return res.status(404).setHeader('Content-Type', 'text/html').send(`
      <!DOCTYPE html>
      <html lang="th">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>TALLY MIL - Not Found</title>
          <style>
              body { font-family: sans-serif; background: #0b0f19; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
              .card { background: #131b2e; padding: 30px; border-radius: 16px; width: 320px; text-align: center; border: 1px solid #1e293b; }
              h2 { color: #ef4444; margin-bottom: 5px; }
          </style>
      </head>
      <body>
          <div class="card">
              <h2>⚠️ ไม่พบข้อมูล</h2>
              <p style="font-size: 14px; color: #94a3b8;">ไม่พบรหัสสินค้านี้ในระบบ (รหัสที่ส่งมา: [${id}])</p>
          </div>
      </body>
      </html>
    `);
  }

  return res.status(200).setHeader('Content-Type', 'text/html').send(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TALLY MIL - Authenticity Verification</title>
        <style>
            body { font-family: sans-serif; background: #0b0f19; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .card { background: #131b2e; padding: 30px; border-radius: 16px; width: 320px; text-align: center; border: 1px solid #1e293b; }
            h2 { color: #38bdf8; margin-bottom: 5px; }
            .status { background: #10b981; color: #000; font-weight: bold; padding: 10px; border-radius: 8px; margin: 15px 0; font-size: 16px; }
            .info { text-align: left; font-size: 14px; margin-top: 15px; background: #0f172a; padding: 15px; border-radius: 8px; line-height: 1.6; }
            .info p { margin: 4px 0; color: #cbd5e1; }
            .info b { color: #fff; }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>TALLY MiL</h2>
            <p style="font-size: 12px; color: #94a3b8;">Authenticity Verification System</p>
            <div class="status">✔ สินค้าของแท้ (AUTHENTIC)</div>
            <div class="info">
                <p><b>รุ่น:</b> ${bagInfo.model}</p>
                <p><b>Serial No:</b> ${bagInfo.serial}</p>
                <p><b>วันที่ซื้อ:</b> ${bagInfo.purchaseDate}</p>
                <p><b>ประกันสิ้นสุด:</b> ${bagInfo.warrantyExpiry}</p>
            </div>
        </div>
    </body>
    </html>
  `);
};const BAG_DATABASE = {
  'BAG-001': {
    model: 'Hexagon Tote Bag',
    serial: 'TM-HEX-001',
    purchaseDate: '2026-03-31',
    warrantyExpiry: '2027-03-31',
    status: 'AUTHENTIC'
  }
};

module.exports = async (req, res) => {
  // รองรับทั้งการส่งค่าแบบ ?id= หรือ ?uid= เพื่อไม่ให้พลาดอีก
  const id = req.query.id || req.query.uid;
  const bagInfo = BAG_DATABASE[id];

  if (!bagInfo) {
    return res.status(404).setHeader('Content-Type', 'text/html').send(`
      <!DOCTYPE html>
      <html lang="th">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>TALLY MIL - Not Found</title>
          <style>
              body { font-family: sans-serif; background: #0b0f19; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
              .card { background: #131b2e; padding: 30px; border-radius: 16px; width: 320px; text-align: center; border: 1px solid #1e293b; }
              h2 { color: #ef4444; margin-bottom: 5px; }
          </style>
      </head>
      <body>
          <div class="card">
              <h2>⚠️ ไม่พบข้อมูล</h2>
              <p style="font-size: 14px; color: #94a3b8;">ไม่พบรหัสสินค้านี้ในระบบ (รหัสที่ส่งมา: ${id})</p>
          </div>
      </body>
      </html>
    `);
  }

  return res.status(200).setHeader('Content-Type', 'text/html').send(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TALLY MIL - Authenticity Verification</title>
        <style>
            body { font-family: sans-serif; background: #0b0f19; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .card { background: #131b2e; padding: 30px; border-radius: 16px; width: 320px; text-align: center; border: 1px solid #1e293b; }
            h2 { color: #38bdf8; margin-bottom: 5px; }
            .status { background: #10b981; color: #000; font-weight: bold; padding: 10px; border-radius: 8px; margin: 15px 0; font-size: 16px; }
            .info { text-align: left; font-size: 14px; margin-top: 15px; background: #0f172a; padding: 15px; border-radius: 8px; line-height: 1.6; }
            .info p { margin: 4px 0; color: #cbd5e1; }
            .info b { color: #fff; }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>TALLY MiL</h2>
            <p style="font-size: 12px; color: #94a3b8;">Authenticity Verification System</p>
            <div class="status">✔ สินค้าของแท้ (AUTHENTIC)</div>
            <div class="info">
                <p><b>รุ่น:</b> ${bagInfo.model}</p>
                <p><b>Serial No:</b> ${bagInfo.serial}</p>
                <p><b>วันที่ซื้อ:</b> ${bagInfo.purchaseDate}</p>
                <p><b>ประกันสิ้นสุด:</b> ${bagInfo.warrantyExpiry}</p>
            </div>
        </div>
    </body>
    </html>
  `);
};
