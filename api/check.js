module.exports = async (req, res) => {
  const { code, owner } = req.query;

  // --- ฐานข้อมูลตัวย่อรุ่นกระเป๋า TALLY MiL ทั้งหมด ---
  const PRODUCT_DATABASE = {
    // === 1. Hexag Bovin Series ===
    'BVXS1': { model: 'Hexag Bovin', size: 'XS', color: 'Onyx Black' },
    'BVXS2': { model: 'Hexag Bovin', size: 'XS', color: 'Glacier Mist' },
    'BVXS3': { model: 'Hexag Bovin', size: 'XS', color: 'Cashmere Ivory' },
    'BVXS4': { model: 'Hexag Bovin', size: 'XS', color: 'Burgundy Rouge' },
    'BVXS5': { model: 'Hexag Bovin', size: 'XS', color: 'Camel Suede' },

    'BVSS1': { model: 'Hexag Bovin', size: 'S', color: 'Onyx Black' },
    'BVSS2': { model: 'Hexag Bovin', size: 'S', color: 'Glacier Mist' },
    'BVSS3': { model: 'Hexag Bovin', size: 'S', color: 'Cashmere Ivory' },
    'BVSS4': { model: 'Hexag Bovin', size: 'S', color: 'Burgundy Rouge' },
    'BVSS5': { model: 'Hexag Bovin', size: 'S', color: 'Camel Suede' },

    'BVSL1': { model: 'Hexag Bovin', size: 'Medium', color: 'Onyx Black' },
    'BVSL2': { model: 'Hexag Bovin', size: 'Medium', color: 'Glacier Mist' },
    'BVSL3': { model: 'Hexag Bovin', size: 'Medium', color: 'Cashmere Ivory' },
    'BVSL4': { model: 'Hexag Bovin', size: 'Medium', color: 'Burgundy Rouge' },
    'BVSL5': { model: 'Hexag Bovin', size: 'Medium', color: 'Camel Suede' },

    'BVL1': { model: 'Hexag Bovin', size: 'Large', color: 'Onyx Black' },
    'BVL2': { model: 'Hexag Bovin', size: 'Large', color: 'Glacier Mist' },
    'BVL3': { model: 'Hexag Bovin', size: 'Large', color: 'Cashmere Ivory' },
    'BVL4': { model: 'Hexag Bovin', size: 'Large', color: 'Burgundy Rouge' },
    'BVL5': { model: 'Hexag Bovin', size: 'Large', color: 'Camel Suede' },

    'BVTM1': { model: 'Hexag Bovin', size: 'Travel M', color: 'Onyx Black' },
    'BVTM5': { model: 'Hexag Bovin', size: 'Travel M', color: 'Camel Suede' },
    'BVTL1': { model: 'Hexag Bovin', size: 'Travel L', color: 'Onyx Black' },
    'BVTL5': { model: 'Hexag Bovin', size: 'Travel L', color: 'Camel Suede' },

    // === 2. Hexag Vegan Series ===
    'VGXS1': { model: 'Hexag Vegan', size: 'XS', color: 'Onyx Wave' },
    'VGXS2': { model: 'Hexag Vegan', size: 'XS', color: 'Navy Obsidian' },
    'VGXS3': { model: 'Hexag Vegan', size: 'XS', color: 'Emerald Forest' },
    'VGXS4': { model: 'Hexag Vegan', size: 'XS', color: 'Terracotta Spice' },
    'VGXS5': { model: 'Hexag Vegan', size: 'XS', color: 'Pigeon Grey' },

    'VGSS1': { model: 'Hexag Vegan', size: 'S', color: 'Onyx Wave' },
    'VGSS2': { model: 'Hexag Vegan', size: 'S', color: 'Navy Obsidian' },
    'VGSS3': { model: 'Hexag Vegan', size: 'S', color: 'Emerald Forest' },
    'VGSS4': { model: 'Hexag Vegan', size: 'S', color: 'Terracotta Spice' },
    'VGSS5': { model: 'Hexag Vegan', size: 'S', color: 'Pigeon Grey' },

    'VGSL1': { model: 'Hexag Vegan', size: 'Medium', color: 'Onyx Wave' },
    'VGSL2': { model: 'Hexag Vegan', size: 'Medium', color: 'Navy Obsidian' },
    'VGSL3': { model: 'Hexag Vegan', size: 'Medium', color: 'Emerald Forest' },
    'VGSL4': { model: 'Hexag Vegan', size: 'Medium', color: 'Terracotta Spice' },
    'VGSL5': { model: 'Hexag Vegan', size: 'Medium', color: 'Pigeon Grey' },

    'VGL1': { model: 'Hexag Vegan', size: 'Large', color: 'Onyx Wave' },
    'VGL2': { model: 'Hexag Vegan', size: 'Large', color: 'Navy Obsidian' },
    'VGL3': { model: 'Hexag Vegan', size: 'Large', color: 'Emerald Forest' },
    'VGL4': { model: 'Hexag Vegan', size: 'Large', color: 'Terracotta Spice' },
    'VGL5': { model: 'Hexag Vegan', size: 'Large', color: 'Pigeon Grey' }
  };

  if (!code || !PRODUCT_DATABASE[code.toUpperCase()]) {
    res.writeHead(302, { Location: '/api/admin' });
    res.end();
    return;
  }

  const itemCode = code.toUpperCase();
  const item = PRODUCT_DATABASE[itemCode];
  const customerName = owner ? decodeURIComponent(owner) : 'Valued Customer / ลูกค้าท่านทรงเกียรติ';

  return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TALLY MiL - Digital Authenticity & Warranty</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0c0a09; color: #f5f5f4; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; overflow: hidden; }

            #splash-screen {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: linear-gradient(135deg, #fdfbf7 0%, #f3efe6 100%);
                color: #262522; display: flex; flex-direction: column;
                justify-content: center; align-items: center; z-index: 999;
                text-align: center; padding: 30px; transition: opacity 1s ease, visibility 1s;
            }
            .luxury-logo-wrapper {
                width: 90px; height: 90px; border: 2px solid #b89758; border-radius: 50%;
                display: flex; justify-content: center; align-items: center; margin-bottom: 20px;
                animation: spinLogo 3s cubic-bezier(0.25, 1, 0.5, 1) infinite alternate;
                box-shadow: 0 10px 25px rgba(184, 151, 88, 0.25);
            }
            .luxury-logo-text { font-family: serif; font-size: 24px; font-weight: 700; letter-spacing: 3px; color: #8c6d31; }
            @keyframes spinLogo { 0% { transform: rotate(0deg) scale(0.95); } 100% { transform: rotate(360deg) scale(1.05); } }

            .welcome-title { font-family: serif; font-size: 24px; color: #1a1918; letter-spacing: 2px; margin-bottom: 6px; }
            .welcome-sub { font-size: 12px; color: #8c6d31; text-transform: uppercase; letter-spacing: 2px; }

            .card {
                background: #1c1917; padding: 32px 24px; border-radius: 24px;
                width: 100%; max-width: 380px; border: 1px solid rgba(212, 175, 55, 0.4);
                box-shadow: 0 20px 50px rgba(0,0,0,0.9); text-align: center;
                opacity: 0; transform: scale(0.95); transition: opacity 1s ease, transform 1s ease;
            }
            .card.show { opacity: 1; transform: scale(1); }

            .brand-header {
                font-family: serif, -apple-system;
                font-size: 32px; font-weight: 800; color: #fef3c7;
                letter-spacing: 4px; margin-bottom: 2px; text-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
            }
            .brand-sub { font-size: 10px; color: #d4af37; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }

            .badge-authentic {
                background: linear-gradient(135deg, rgba(6, 78, 59, 0.9), rgba(16, 185, 129, 0.2));
                color: #34d399; border: 1.5px solid #10b981; padding: 10px 18px;
                border-radius: 30px; font-size: 12px; display: inline-block;
                margin-bottom: 22px; font-weight: 700; letter-spacing: 1.5px;
                box-shadow: 0 0 15px rgba(16, 185, 129, 0.35); text-transform: uppercase;
            }

            .info-box { background: #0c0a09; border: 1px solid #383531; border-radius: 16px; padding: 18px; text-align: left; margin-bottom: 20px; }
            .info-row { margin-bottom: 12px; }
            .info-row:last-child { margin-bottom: 0; }
            .label { color: #a8a29e; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 2px; }
            .value { color: #fff; font-weight: 600; font-size: 14px; }
            .highlight-value { color: #fef3c7; font-weight: 700; font-size: 15px; }

            .countdown-box { background: rgba(212, 175, 55, 0.06); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; padding: 16px; margin-bottom: 15px; }
            .countdown-title { font-size: 10px; color: #d4af37; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px; font-weight: 600; }
            .timer { font-size: 18px; font-weight: 700; color: #fef3c7; font-family: monospace; letter-spacing: 1.5px; }

            .footer { font-size: 10px; color: #78716c; margin-top: 15px; line-height: 1.4; }
        </style>
    </head>
    <body>

        <div id="splash-screen">
            <div class="luxury-logo-wrapper">
                <div class="luxury-logo-text">TM</div>
            </div>
            <div class="welcome-title">Welcome to the Family</div>
            <div class="welcome-sub">ยินดีต้อนรับสู่ครอบครัว TALLY MiL</div>
        </div>

        <div class="card" id="main-card">
            <div class="brand-header">TALLY MiL</div>
            <div class="brand-sub">Certificate of Authenticity & Warranty</div>

            <div class="badge-authentic">✓ AUTHENTIC & GUARANTEED PRODUCT</div>

            <div class="info-box">
                <div class="info-row">
                    <span class="label">รุ่นสินค้า / Model:</span>
                    <span class="value highlight-value">${item.model}</span>
                </div>
                <div class="info-row">
                    <span class="label">ไซส์ / Size:</span>
                    <span class="value">${item.size}</span>
                </div>
                <div class="info-row">
                    <span class="label">สี / Color:</span>
                    <span class="value">${item.color}</span>
                </div>
                <div class="info-row">
                    <span class="label">รหัสสินค้า / Product Code:</span>
                    <span class="value" style="font-family: monospace;">${itemCode}</span>
                </div>
                <div class="info-row">
                    <span class="label">ชื่อผู้ถือครอง / Registered Owner:</span>
                    <span class="value" style="color: #d4af37;">${customerName}</span>
                </div>
                <div class="info-row">
