module.exports = async (req, res) => {
  return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TALLY MiL - Admin NFC Link Generator</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0c0a09; color: #f5f5f4; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .card { background: #1c1917; padding: 30px; border-radius: 20px; width: 100%; max-width: 420px; border: 1px solid rgba(212, 175, 55, 0.3); box-shadow: 0 15px 35px rgba(0,0,0,0.8); }
            h2 { color: #fef3c7; font-size: 20px; margin-top: 0; text-align: center; font-family: serif; letter-spacing: 1.5px; }
            .form-group { margin-bottom: 15px; }
            label { display: block; font-size: 12px; color: #d4af37; margin-bottom: 5px; }
            input { width: 100%; padding: 10px; background: #0c0a09; border: 1px solid #44403c; border-radius: 8px; color: #fff; font-size: 14px; box-sizing: border-box; }
            button { width: 100%; padding: 12px; background: #d4af37; border: none; border-radius: 8px; color: #0c0a09; font-weight: bold; font-size: 15px; cursor: pointer; margin-top: 10px; }
            .result-box { margin-top: 20px; background: #0c0a09; padding: 15px; border-radius: 10px; border: 1px solid #383531; display: none; }
            .result-title { font-size: 11px; color: #a8a29e; margin-bottom: 5px; font-weight: bold; }
            .url-text { font-family: monospace; font-size: 11px; color: #10b981; word-break: break-all; background: #18181b; padding: 8px; border-radius: 6px; margin-bottom: 10px; }
            .byte-info { font-size: 10px; color: #f59e0b; margin-top: 2px; }
            .btn-copy { background: #27272a; color: #fef3c7; border: 1px solid #d4af37; padding: 8px; border-radius: 6px; font-size: 12px; width: 100%; cursor: pointer; }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>TALLY MiL ADMIN</h2>
            
            <div class="form-group">
                <label>รหัสสินค้าบนชิป (Short Code):</label>
                <input type="text" id="shortCode" value="TM001" placeholder="เช่น TM001, TM002">
            </div>

            <button onclick="generateUrl()">สร้างลิงก์สำหรับ NFC (Short URL)</button>

            <div id="result" class="result-box">
                <div class="result-title">ลิงก์สำหรับเขียนลงชิป NFC (สั้นพิเศษ):</div>
                <div id="finalUrl" class="url-text"></div>
                <div id="byteCount" class="byte-info"></div>
                <button class="btn-copy" onclick="copyUrl()">คัดลอกลิงก์ / Copy URL</button>
            </div>
        </div>

        <script>
            function generateUrl() {
                const baseUrl = window.location.origin + '/api/check';
                const code = document.getElementById('shortCode').value.trim() || 'TM001';
                const finalUrl = baseUrl + '?code=' + code;

                document.getElementById('finalUrl').innerText = finalUrl;
                document.getElementById('byteCount').innerText = 'ขนาดลิงก์: ประมาณ ' + finalUrl.length + ' Bytes (เขียนลงชิป NTAG213 ได้แน่นอน)';
                document.getElementById('result').style.display = 'block';
            }

            function copyUrl() {
                const text = document.getElementById('finalUrl').innerText;
                navigator.clipboard.writeText(text);
                alert('คัดลอกลิงก์เรียบร้อยแล้ว!');
            }
        </script>
    </body>
    </html>
  `);
};
