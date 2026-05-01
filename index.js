const { Client, LocalAuth } = require('whatsapp-web.js');
const http = require('http'); // خادم صغير لإرضاء Render

// 1. إنشاء خادم وهمي لمنع الانهيار (Port Binding)
http.createServer((req, res) => {
    res.write('ركن الدائم شغال!');
    res.end();
}).listen(process.env.PORT || 3000);

// 2. إعداد البوت بالنسخة الخفيفة جداً
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process',
            '--no-zygote'
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
