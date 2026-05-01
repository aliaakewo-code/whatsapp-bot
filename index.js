const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('✅ ممتاز! كود الـ QR ظهر الآن، امسحه بسرعة:');
});

client.on('ready', () => {
    console.log('🚀 البوت شغال ومرتبط بلوحة الإدارة!');
});

client.on('message', async (msg) => {
    if (msg.body.includes('تسريع')) {
        msg.reply('مرحباً بك في ركن الدائم! 🚀 جاري متابعة طلبك في لوحة الإدارة: https://smmfollowerss.com/admin');
    }
});

client.initialize();
