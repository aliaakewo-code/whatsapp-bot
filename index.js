const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('البوت يعمل الآن بنجاح!'));
app.listen(3000, () => console.log('خادم الاستيقاظ جاهز على المنفذ 3000'));

// ... (هنا يكمل باقي كود الواتساب والتلجرام الذي أعطيتك إياه سابقاً)
const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');

// بياناتك الشخصية المحدثة
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

// عند تشغيل البوت سيظهر لك رمز QR في الـ Console امسحه بالواتساب
client.on('qr', (qr) => {
    console.log('امسح رمز QR التالي لتشغيل واتساب:');
    const qrcode = require('qrcode-terminal');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('✅ البوت جاهز ويعمل الآن!');
});

client.on('message', async (msg) => {
    const orderId = msg.body.trim();

    // التحقق إذا كانت الرسالة عبارة عن رقم طلب فقط
    if (/^\d+$/.test(orderId)) {
        try {
            // جلب تفاصيل الطلب من الـ Admin API لاستخراج رقم المزود (external_id)
            const response = await axios.get(`${ADMIN_API_URL}/orders/${orderId}`, {
                headers: { 'X-Api-Key': ADMIN_API_KEY }
            });

            if (response.data) {
                const providerOrderId = response.data.external_id || "غير متوفر";
                const status = response.data.status || "غير معروف";

                // الرسالة التي ستصلك على التلجرام
                const report = `📢 *طلب دعم من الواتساب*\n\n` +
                               `📦 رقم طلبي: \`${orderId}\`\n` +
                               `🔗 رقم المزود: \`${providerOrderId}\`\n` +
                               `📊 الحالة: ${status}\n` +
                               `👤 من جوال: ${msg.from.replace('@c.us', '')}`;

                await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                    chat_id: MY_CHAT_ID,
                    text: report,
                    parse_mode: 'Markdown'
                });

                await msg.reply('✅ استلمت رقم الطلب، سيتم مراجعته وتسريعه فوراً.');
            }
        } catch (e) {
            console.log("الطلب غير موجود أو هناك مشكلة في الـ API");
        }
    }
});

client.initialize();
