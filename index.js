const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');
const express = require('express');
const QRCode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

// متغير لتخزين رابط الصورة
let qrImageUrl = "";

app.get('/', (req, res) => {
    if (qrImageUrl) {
        res.send(`<h1>بوت ركن الدعم</h1><p>امسح الكود من هنا:</p><img src="${qrImageUrl}">`);
    } else {
        res.send('<h1>البوت يعمل</h1><p>انتظر توليد الكود أو أن البوت متصل بالفعل.</p>');
    }
});

app.listen(port, () => console.log(`السيرفر يعمل على منفذ ${port}`));

const ADMIN_API_KEY = '6ceea97d5c21fbefb250d7eb46723d6b'; 
const TELEGRAM_TOKEN = '7640973771:AAESlHErgX9-JCqP_s1xnlOJAqRJyZsD0yc';
const MY_CHAT_ID = '8060219101';
const ADMIN_API_URL = 'https://smmfollowerss.com/admin-api/v2';

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true, 
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    }
});

client.on('qr', async (qr) => {
    try {
        // تحويل الـ QR إلى رابط صورة (Data URI)
        qrImageUrl = await QRCode.toDataURL(qr);
        console.log('-------------------------------------------');
        console.log('✅ تم توليد رابط الصورة بنجاح!');
        console.log('اضغط على رابط المشروع في Render لمشاهدة الـ QR');
        console.log('-------------------------------------------');
    } catch (err) {
        console.error('خطأ في توليد الصورة:', err);
    }
});

client.on('ready', () => {
    qrImageUrl = ""; // حذف الرابط بعد الاتصال للأمان
    console.log('✅ متصل الآن وجاهز!');
});

// ... (باقي كود معالجة الرسائل كما هو)
client.on('message', async (msg) => {
    const orderId = msg.body.trim();
    if (/^\d+$/.test(orderId)) {
        try {
            const response = await axios.get(`${ADMIN_API_URL}/orders/${orderId}`, {
                headers: { 'X-Api-Key': ADMIN_API_KEY }
            });
            if (response.data) {
                const provider = response.data.external_id || "غير متوفر";
                const status = response.data.status || "غير معروف";
                const report = `📢 *تحديث طلب*\n\n📦 رقم طلبي: \`${orderId}\`\n🔗 رقم المزود: \`${provider}\`\n📊 الحالة: ${status}`;
                await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                    chat_id: MY_CHAT_ID, text: report, parse_mode: 'Markdown'
                });
                await msg.reply('✅ تم استلام طلبك وجاري المراجعة.');
            }
        } catch (e) { console.log("خطأ في الطلب"); }
    }
});

client.initialize();
