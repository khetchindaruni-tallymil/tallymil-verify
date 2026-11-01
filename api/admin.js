module.exports = async (req, res) => {
  if (req.method === 'POST' || req.query.code) {
    const code = req.query.code || '';
    const owner = req.query.owner || '';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    
    // ลิงก์จะวิ่งตรงเข้าหน้า index.html โดยตรงทันที ไม่ผ่าน Serverless ให้พัง
    const targetUrl = `${protocol}://${host}/?code=${encodeURIComponent(code)}&owner=${encodeURIComponent(owner)}`;
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="th">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>TALLY MiL - NFC Link Generator</title>
          <style>
              body { font-family: -apple-system, sans-serif; background: #0c0a09; color: #f5f5f4; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
              .box { background: #1c1917; padding: 30px; border-radius: 20px; border: 1px solid #d4af37; width: 100%; max-width: 400px; text-align: center; }
              input, button { width: 100%; padding: 12px; margin-top: 12px; border-radius: 10px; border: 1px solid #444; background: #292524; color: #fff; font-size: 14px; box-sizing: border-box; }
              button { background: #d4af37; color: #0c0a09; font-weight: bold; cursor: pointer; border: none; }
              textarea { width: 100%; height: 80px; margin-top: 12px; padding: 10px; background: #0c0a09; color: #d4af37; border-radius: 8px; font-family: monospace; font-size: 12px; }
          </style>
      </head>
      <body>
          <div class="box">
              <h2>TALLY MiL Admin</h2>
              <p style="font-size: 12px; color: #a8a29e; margin-top: 5px;">NFC Link Generator</p>
              <form method="GET">
                  <input type="text" name="code" placeholder="Product Code (e.g. BVXS5)" value="${code}" required>
                  <input type="text" name="owner" placeholder="Owner Name (e.g. Minta)" value="${owner}" required>
                  <button type="submit">Generate NFC Link</button>
              </form>
              ${code ? `
                  <textarea readonly id="linkBox">${targetUrl}</textarea>
                  <button onclick="navigator.clipboard.writeText(document.getElementById('linkBox').value); alert('Copied!');" style="background: #10b981; color: #fff;">Copy URL for NFC</button>
              ` : ''}
          </div>
      </body>
      </html>
    `);
  }
  
  res.writeHead(302, { Location: '/api/admin?code=BVXS5&owner=Minta' });
  res.end();
};
