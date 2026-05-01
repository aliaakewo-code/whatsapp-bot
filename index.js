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
    // هذا السطر يحول الكود لرابط يمكنك فتحه من الجوال بسهولة
    const qrLink = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`;
    console.log('--------------------------------------------------');
    console.log('🔗 اضغط على هذا الرابط لمسح الكود فوراً:');
    console.log(qrLink);
    console.log('--------------------------------------------------');
    
    // سيبقى الكود القديم موجوداً أيضاً للاحتياط
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('🚀 ركن الدائم متصل الآن!');
});

client.initialize();
