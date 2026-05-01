const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    // هذا الكود سيظهر في لوحة تحكم السيرفر لتمسحه بجوالك
    qrcode.generate(qr, {small: true});
    console.log('QR_CODE_GENERATED: ' + qr);
});

client.on('ready', () => {
    console.log('✅ البوت متصل ويعمل الآن على السيرفر!');
});

client.on('message', async (msg) => {
    // لمعرفة معرف المجموعة، اكتب !id داخلها
    if (msg.body === '!id') {
        msg.reply('ID هذه المجموعة هو: ' + msg.from);
    }

    // إذا أرسل العميل طلب "تسريع" مع رقم الطلب
    if (msg.body.toLowerCase().includes('تسريع')) {
        const orderIdMatch = msg.body.match(/\d+/);
        if(!orderIdMatch) return;
        const orderId = orderIdMatch[0];
        
        msg.reply('⏳ جاري جلب رقم المزود من ركن الدائم...');
        
        const browser = await puppeteer.launch({ 
            headless: true, 
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        const page = await browser.newPage();
        
        try {
            // يذهب البوت لموقعك ويبحث عن الطلب
            await page.goto(`https://smmfollowerss.com/admin/orders?search=${orderId}`);
            await new Promise(r => setTimeout(r, 4000)); 

            const providerId = await page.evaluate(() => {
                const row = document.querySelector('table tbody tr');
                const cells = row ? row.querySelectorAll('td') : [];
                // نفترض أن رقم المزود في العمود الخامس (index 4)
                return cells.length > 4 ? cells[4].innerText.trim() : null;
            });

            if (providerId) {
                // سنضع هنا ID مجموعة المزود (tothem20 AI Support) لاحقاً
                const providerGroup = 'XXXXXXXX@g.us'; 
                await client.sendMessage(providerGroup, providerId + ' speedup');
                msg.reply('🚀 تم إرسال رقم المزود (' + providerId + ') للمزود بنجاح.');
            } else {
                msg.reply('❌ لم أجد رقم المزود، تأكد من حالة الطلب.');
            }
        } catch (e) {
            msg.reply('⚠️ حدث خطأ أثناء الاتصال بالموقع.');
        } finally {
            await browser.close();
        }
    }
});

client.initialize();
