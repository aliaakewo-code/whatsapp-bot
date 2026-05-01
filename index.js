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
    console.log('✅ الكود ظهر أخيراً! امسحه الآن:');
});

client.on('ready', () => {
    console.log('🚀 ممتاز! البوت شغال الآن.');
});

client.on('message', async (msg) => {
    if (msg.body.includes('تسريع')) {
        msg.reply('مرحباً بك في ركن الدائم! جاري المتابعة: https://smmfollowerss.com/admin');
    }
});

client.initialize();
