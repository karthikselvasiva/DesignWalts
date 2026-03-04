const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');

    // Add override for headers in dark sections
    if (!css.includes('.section-dark h2')) {
        css += '\n/* Override headers in dark sections to pure white */\n';
        css += '.section-dark h1, .section-dark h2, .section-dark h3, .section-dark h4, .section-dark h5, .section-dark h6 {\n  color: var(--clr-white) !important;\n}\n';
    }

    fs.writeFileSync(cssFile, css);
}

const htmlFiles = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'testimonials.html', 'contact.html', '404.html', 'success.html'];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');

        // Ensure all variations of the WhatsApp links are caught
        html = html.replace(/https:\/\/wa\.me\/91XXXXXXXXXX\?.*?["']/g, 'https://wa.me/qr/I24XGIDK676VC1"');
        html = html.replace(/https:\/\/wa\.me\/91XXXXXXXXXX/g, 'https://wa.me/qr/I24XGIDK676VC1');

        fs.writeFileSync(filePath, html);
    }
});

console.log('Final text color and WhatsApp link sweep completed.');
