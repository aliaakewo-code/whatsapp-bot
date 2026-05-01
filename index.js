const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        // إعدادات صارمة لتقليل استهلاك الرام لأقل من 400MB
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', 
            '--disable-gpu',
            '--disable-extensions'
        ]
    }
});

client.on('ready', () => {
    console.log('✅ ركن الدائم متصل ومستقر الآن!');
});

client.on('message', async (msg) => {
    if (msg.body === 'فحص') {
        await msg.reply('البوت شغال وبكامل قوته! 🚀');
    }
});

client.initialize();
