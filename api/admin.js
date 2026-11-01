export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TALLY MiL - NFC Admin Generator</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0c0a09; color: #f5f5f4; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
        .admin-card { background: #1c1917; padding: 32px 24px; border-radius: 24px; width: 100%; max-width: 420px; border: 1px solid rgba(212, 175, 55, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.9); }
        .brand-header { font-family: serif; font-size: 28px; font-weight: 800; color: #fef3c7; letter-spacing: 3px; text-align: center; margin-bottom: 4px; }
        .brand-sub { font-size: 10px; color: #d4af37; text-transform: uppercase; letter-spacing: 2px; text-align: center; margin-bottom: 24px; }
        .form-group { margin-bottom: 16px; }
        label { color: #a8a29e; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px; }
        input { width: 100%; padding: 12px 16px; background: #0c0a09; border: 1px solid #383531; border-radius: 12px; color: #fff; font-size: 14px; outline: none; text-transform: uppercase; }
        input:focus { border-color: #d4af37; }
        .btn { width: 100%; background: linear-gradient(135deg, #d4af37, #996515); color: #0c0a09; font-weight: 700; padding: 14px; border: none; border-radius: 12px; font-size: 14px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; margin-top: 10px; }
        .result-box { margin-top: 24px; background: #0c0a09; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 14px; padding: 16px; display: none; }
        .result-title { font-size: 10px; color: #d4af37; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .result-link { font-family: monospace; font-size: 12px; color: #34d399; word-break: break-all; margin-bottom: 12px; display: block; background: rgba(0,0,0,0.5); padding: 8px; border-radius: 8px; }
        .btn-copy { background: #10b981; color: #fff; padding: 8px 12px; border: none; border-radius: 8px; font-size: 12px; cursor: pointer; font-weight: 600; width: 100%; }
    </style>
</head>
<body>
    <div class="admin-card">
        <div class="brand-header">TALLY MiL</div>
        <div class="brand-sub">NFC Tag Generation Admin</div>

        <div class="form-group">
            <label>รหัสสินค้า / Product Code (เช่น BVXS5, BVSS1):</label>
            <input type="text" id="productCode" value="BVXS5" placeholder="พิมพ์รหัสสินค้าที่นี่">
        </div>

        <div class="form-group">
            <label>ชื่อผู้ถือครอง / Registered Owner:</label>
            <input type="text" id="ownerName" value="Minta Pumdokmai" style="text-transform: none;" placeholder="ระบุชื่อ-นามสกุลลูกค้า">
        </div>

        <button class="btn" onclick="generateLink()">สร้างลิงก์สำหรับเขียน NFC</button>

        <div class="result-box" id="resultBox">
            <div class="result-title">Generated NFC Link:</div>
            <span class="result-link" id="outputLink"></span>
            <button class="btn-copy" onclick="copyLink()">คัดลอกลิงก์ (Copy Link)</button>
        </div>
    </div>

    <script>
        function generateLink() {
            const code = document.getElementById('productCode').value.trim().toUpperCase();
            const owner = document.getElementById('ownerName').value.trim() || 'Valued Customer';
            const baseUrl = window.location.origin;
            const finalLink = \`\${baseUrl}/?code=\${code}&owner=\${encodeURIComponent(owner)}\`;

            document.getElementById('outputLink').innerText = finalLink;
            document.getElementById('resultBox').style.display = 'block';
        }

        function copyLink() {
            const linkText = document.getElementById('outputLink').innerText;
            navigator.clipboard.writeText(linkText).then(() => {
                alert('คัดลอกลิงก์สำเร็จ! นำไปวางในแอป NFC Tools ได้เลย');
            });
        }
    </script>
</body>
</html>
  `);
}
