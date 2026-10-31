module.exports = async (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TALLY MiL - Staff Admin</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0c0a09; color: #f5f5f4; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .card { background: #1c1917; padding: 28px 20px; border-radius: 20px; width: 100%; max-width: 360px; border: 1px solid rgba(212, 175, 55, 0.4); box-shadow: 0 15px 30px rgba(0,0,0,0.8); }
            h2 { color: #fef3c7; font-size: 24px; margin-top: 0; margin-bottom: 4px; text-align: center; font-family: serif; letter-spacing: 2px; }
            .subtitle { font-size: 11px; color: #d4af37; text-align: center; text-transform: uppercase; margin-bottom: 20px; letter-spacing: 1px; }
            label { font-size: 12px; color: #a8a29e; display: block; margin-top: 12px; margin-bottom: 4px; }
            input, select { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #383531; background: #0c0a09; color: #fff; font-size: 14px; box-sizing: border-box; }
            input:focus, select:focus { outline: none; border-color: #d4af37; }
            button { width: 100%; margin-top: 20px; padding: 12px; border-radius: 10px; border: none; background: linear-gradient(135deg, #d4af37, #9a7b2c); color: #0c0a09; font-weight: bold; font-size: 14px; cursor: pointer; }
            .result-box { display: none; margin-top: 20px; padding: 14px; background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 12px; text-align: center; }
            .link-display { font-size: 11px; color: #fef3c7; word-break: break-all; background: #0c0a09; padding: 10px; border-radius: 8px; border: 1px solid #383531; margin: 10px 0; text-align: left; max-height: 80px; overflow-y: auto; }
            .copy-btn { background: #d4af37; color: #0c0a09; font-size: 13px; font-weight: bold; padding: 10px; border-radius: 8px; border: none; width: 100%; cursor: pointer; margin-top: 5px; }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>TALLY MiL</h2>
            <div class="subtitle">ระบบลงทะเบียนกระเป๋าหน้าร้าน</div>
            
            <form id="registerForm">
                <label>รุ่นสินค้า / สี / ขนาด (Model):</label>
                <input type="text" id="model" placeholder="เช่น Hexag Bovin (Black / Size Mini)" value="Hexag Bovin (Black / Size Mini)" required>

                <label>รหัส Serial No.:</label>
                <input type="text" id="serial" value="TM-HEXB-001" required>

                <label>ชื่อผู้รับสิทธิ์ / ลูกค้า:</label>
                <input type="text" id="owner" placeholder="เช่น คุณ พรรวุฒิ พุ่มดอกไม้" required>

                <label>วันเริ่มรับประกัน (วันที่ขาย):</label>
                <input type="date" id="startDate" value="${today}" required>

                <button type="button" onclick="generateLink()">สร้างลิงก์เขียน NFC</button>
            </form>

            <div id="resultBox" class="result-box">
                <div style="font-size: 12px; color: #d4af37; font-weight: bold;">✓ สร้างลิงก์สำเร็จ</div>
                <div id="linkOutput" class="link-display"></div>
                <button type="button" class="copy-btn" onclick="copyLink()">คัดลอกลิงก์ไปเขียน NFC</button>
            </div>
        </div>

        <script>
            let generatedUrl = "";

            function generateLink() {
                const serial = document.getElementById('serial').value.trim();
                const owner = document.getElementById('owner').value.trim();
                const model = document.getElementById('model').value.trim();
                const startDate = document.getElementById('startDate').value;

                if (!serial || !owner || !model || !startDate) {
                    alert('กรุณากรอกข้อมูลให้ครบถ้วน');
                    return;
                }

                const baseUrl = window.location.origin;
                generatedUrl = baseUrl + '/api/check?id=' + encodeURIComponent(serial) + '&owner=' + encodeURIComponent(owner) + '&model=' + encodeURIComponent(model) + '&start=' + encodeURIComponent(startDate);
                
                document.getElementById('linkOutput').innerText = generatedUrl;
                document.getElementById('resultBox').style.display = 'block';
            }

            function copyLink() {
                navigator.clipboard.writeText(generatedUrl).then(() => {
                    alert('คัดลอกลิงก์เรียบร้อยแล้ว!');
                }).catch(err => {
                    console.error('Copy failed', err);
                });
            }
        </script>
    </body>
    </html>
  `);
};
