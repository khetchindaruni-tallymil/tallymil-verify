
         <!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TALLY MiL - Admin Panel</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Prompt:wght@400;500;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Prompt', sans-serif;
            background-color: #050505;
            color: #d4af37;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .admin-card {
            width: 100%;
            max-width: 420px;
            background: #111111;
            border: 1px solid #2a2415;
            border-radius: 20px;
            padding: 25px 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.8);
        }
        .brand-title {
            font-family: 'Cinzel', serif;
            font-size: 22px;
            text-align: center;
            color: #f3e5ab;
            margin-bottom: 5px;
        }
        .sub-title {
            font-size: 12px;
            text-align: center;
            color: #b38b32;
            margin-bottom: 20px;
            letter-spacing: 1px;
        }
        .form-group { margin-bottom: 14px; text-align: left; }
        .form-group label { display: block; font-size: 12px; color: #c5a059; margin-bottom: 6px; }
        .form-control {
            width: 100%;
            background: #080808;
            border: 1px solid #44371e;
            color: #fff;
            padding: 12px;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
        }
        .form-control:focus { border-color: #d4af37; }
        .btn-submit {
            width: 100%;
            background: linear-gradient(135deg, #d4af37 0%, #aa7c11 100%);
            color: #000;
            border: none;
            padding: 14px;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 10px;
        }
        .status-msg {
            margin-top: 15px;
            font-size: 13px;
            text-align: center;
        }
    </style>
</head>
<body>

<div class="admin-card">
    <div class="brand-title">TALLY MiL</div>
    <div class="sub-title">ADMINISTRATOR SYSTEM - REGISTER WARRANTY</div>

    <div class="form-group">
        <label>รหัสชิป / CHIP ID (สแกนหรือระบุรหัส)</label>
        <input type="text" id="chip_id" class="form-control" placeholder="เช่น BVSS1 หรือ UID ชิป">
    </div>

    <div class="form-group">
        <label>รุ่นสินค้า / MODEL</label>
        <input type="text" id="model" class="form-control" value="Bovin" placeholder="เช่น Bovin">
    </div>

    <div class="form-group">
        <label>ไซส์ / SIZE</label>
        <input type="text" id="size" class="form-control" value="XS" placeholder="เช่น XS, S, M">
    </div>

    <div class="form-group">
        <label>สี / COLOR</label>
        <input type="text" id="color" class="form-control" value="Camel Suede" placeholder="เช่น Camel Suede">
    </div>

    <div class="form-group">
        <label>ชื่อ-นามสกุล ลูกค้า / CUSTOMER NAME</label>
        <input type="text" id="customer_name" class="form-control" placeholder="กรอกชื่อ-นามสกุลลูกค้า">
    </div>

    <div class="form-group">
        <label>เบอร์โทรศัพท์ / PHONE</label>
        <input type="tel" id="phone" class="form-control" placeholder="08X-XXX-XXXX">
    </div>

    <div class="form-group">
        <label>LINE ID (ถ้ามี)</label>
        <input type="text" id="line_id" class="form-control" placeholder="LINE ID ลูกค้า">
    </div>

    <button class="btn-submit" id="btn-save" onclick="saveWarrantyData()">บันทึกข้อมูลและเปิดประกันทันที</button>
    <div id="status-msg" class="status-msg"></div>
</div>

<script>
    const SUPABASE_URL = 'https://nzcsgskrqmzboysqwbob.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_pKnUa-Sk_hsyXkMM4VbH8w_I0Dy5yDb';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // ดึง Chip ID จาก URL อัตโนมัติเผื่อแอดมินใช้มือถือสแกนเปิดเข้ามา
    const urlParams = new URLSearchParams(window.location.search);
    const chipParam = urlParams.get('chip') || urlParams.get('id') || urlParams.get('code') || urlParams.get('uid');
    if (chipParam) {
        document.getElementById('chip_id').value = chipParam;
    }

    async function saveWarrantyData() {
        const chipId = document.getElementById('chip_id').value.trim();
        const model = document.getElementById('model').value.trim();
        const size = document.getElementById('size').value.trim();
        const color = document.getElementById('color').value.trim();
        const custName = document.getElementById('customer_name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const lineId = document.getElementById('line_id').value.trim();
        const msgEl = document.getElementById('status-msg');
        const btn = document.getElementById('btn-save');

        if (!chipId || !custName) {
            alert('กรุณากรอกรหัสชิปและชื่อลูกค้าให้เรียบร้อยครับ');
            return;
        }

        btn.innerText = 'กำลังบันทึกข้อมูล...';
        btn.disabled = true;

        const currentTime = Math.floor(Date.now() / 1000).toString();

        const { error } = await supabaseClient
            .from('warranties')
            .upsert({
                chip_id: chipId,
                model: model,
                size: size,
                color: color,
                customer_name: custName,
                phone: phone,
                line_id: lineId,
                activated_at: currentTime
            }, { onConflict: 'chip_id' });

        if (error) {
            msgEl.style.color = '#ef4444';
            msgEl.innerText = 'เกิดข้อผิดพลาด: ' + error.message;
            btn.innerText = 'บันทึกข้อมูลและเปิดประกันทันที';
            btn.disabled = false;
        } else {
            msgEl.style.color = '#10b981';
            msgEl.innerText = '✓ บันทึกข้อมูลสำเร็จ! การันตีพร้อมใช้งานแล้ว';
            btn.innerText = 'บันทึกสำเร็จ!';
            setTimeout(() => {
                btn.innerText = 'บันทึกข้อมูลและเปิดประกันทันที';
                btn.disabled = false;
            }, 3000);
        }
    }
</script>

</body>
