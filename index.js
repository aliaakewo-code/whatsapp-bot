const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');

// الإعدادات الخاصة بك (جاهزة 100%)
const ADMIN_API_KEY = '6ceea97d5c21fbefb250d7eb46723d6b'; 
const TELEGRAM_TOKEN = '7640973771:AAESlHErgX9-JCqP_s1xnlOJAqRJyZsD0yc';
const MY_CHAT_ID = '8060219101';
const WEBSITE_API = 'https://smmfollowerss.com/admin-api/v2'; // رابط الإدارة لجلب رقم المزود

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true, 
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    }
});

// لإظهار الـ QR في الـ Logs بوضوح
client.on('qr', (qr) => {
    const qrcode = require('qrcode-terminal');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('✅ البوت شغال الآن وجاهز!');
});

client.on('message', async (msg) => {
    const orderId = msg.body.trim();

    // إذا أرسل العميل رقم الطلب
    if (/^\d+$/.test(orderId)) {
        try {
            // جلب البيانات باستخدام مفتاح الإدارة
            const response = await axios.get(`${WEBSITE_API}/orders/${orderId}`, {
                headers: { 'X-Api-Key': ADMIN_API_KEY }
            });

            // استخراج رقم المزود (الرقم الطويل) والحالة
            const provider = response.data.external_id || "غير متاح";
            const status = response.data.status || "غير معروف";

            const report = `📢 *تحديث طلب دعم*\n\n` +
                           `📦 رقم طلب موقعي: \`${orderId}\`\n` +
                           `🔌 رقم المزود: *${provider}*\n` +
                           `📊 الحالة: ${status}\n` +
                           `👤 من جوال: ${msg.from.split('@')[0]}`;

            // إرسال التقرير لتلجرام
            await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                chat_id: MY_CHAT_ID,
                text: report,
                parse_mode: 'Markdown'
            });

            await msg.reply('✅ تم استلام طلبك، ورقم المزود وصل للإدارة للمراجعة.');
        } catch (e) {
            console.log("خطأ: الطلب غير موجود أو المفتاح غلط");
        }
    }
});

client.initialize();
