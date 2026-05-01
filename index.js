const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
        // حذفنا سطر executablePath تماماً ليعمل التلقائي
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('✅ ظهر المربع! امسحه الآن بربط الأجهزة:');
});

client.on('ready', () => {
    console.log('🚀 البوت شغال الآن لخدمة ركن الدائم!');
});

client.on('message', async (msg) => {
    if (msg.body.includes('تسريع')) {
        msg.reply('أهلاً بك! جاري الدخول للوحة الإدارة لمتابعة طلبك: https://smmfollowerss.com/admin');
    }
});

client.initialize();
