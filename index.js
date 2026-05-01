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
    console.log('✅ ظهر الكود! امسحه الآن:');
});

client.on('ready', () => {
    console.log('✅ البوت شغال ومرتبط بموقعك!');
});

client.on('message', async (msg) => {
    if (msg.body.includes('تسريع')) {
        msg.reply('🚀 جاري متابعة طلبك في لوحة إدارة ركن الدائم...');
    }
});

client.initialize();
