const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'testimonials.html', 'contact.html', '404.html', 'success.html'];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');

        // Update WhatsApp Links
        html = html.replace(/https:\/\/wa\.me\/918124393132/g, 'https://wa.me/qr/I24XGIDK676VC1');

        fs.writeFileSync(filePath, html);
    }
});

console.log('WhatsApp links updated.');
