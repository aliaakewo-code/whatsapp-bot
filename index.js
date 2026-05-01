const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ],
        executablePath: '/usr/bin/google-chrome-stable'
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('✅ الكود جاهز! امسحه الآن لربط واتساب الإدارة:');
});

client.on('ready', () => {
    console.log('✅ ممتاز! البوت متصل الآن بلوحة تحكم موقعك.');
});

client.on('message', async (msg) => {
    // الرابط الجديد الذي زودتني به
    const adminUrl = 'https://smmfollowerss.com/admin';

    if (msg.body.includes('تسريع')) {
        msg.reply('🚀 جاري الدخول للوحة الإدارة ومتابعة طلبك فوراً...');
        // هنا الكود سيتوجه للرابط الجديد https://smmfollowerss.com/admin
    }
});

client.initialize();
