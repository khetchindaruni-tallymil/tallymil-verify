module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
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
                <p><b>รุ่น:</b> Hexagon Tote Bag</p>
                <p><b>Serial No:</b> TM-HEX-001</p>
                <p><b>วันที่ซื้อ:</b> 2026-03-31</p>
                <p><b>ประกันสิ้นสุด:</b> 2027-03-31</p>
            </div>
        </div>
    </body>
    </html>
  `);
};
