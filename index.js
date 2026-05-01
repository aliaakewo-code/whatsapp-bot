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
    console.log('✅ ممتاز! امسح الكود الآن لربط واتساب الإدارة:');
});

client.on('ready', () => {
    console.log('🚀 البوت متصل الآن وجاهز لخدمة عملائك!');
});

client.on('message', async (msg) => {
    if (msg.body.includes('تسريع')) {
        msg.reply('استلمت طلبك، جاري الدخول للوحة الإدارة https://smmfollowerss.com/admin لمتابعته.');
    }
});

client.initialize();
