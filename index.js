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
    console.log('--------------------------------------------');
    console.log('✅ كود الـ QR جاهز! امسحه الآن لربط البوت:');
    console.log('--------------------------------------------');
});

client.on('ready', () => {
    console.log('🚀 البوت متصل الآن بنجاح بلوحة إدارة الموقع!');
});

client.on('message', async (msg) => {
    if (msg.body === 'تسريع') {
        msg.reply('مرحباً بك! 🚀 جاري توجيه طلبك للوحة الإدارة في smmf
