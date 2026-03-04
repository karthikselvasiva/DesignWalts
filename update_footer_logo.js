const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'testimonials.html', 'contact.html', '404.html', 'success.html'];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');

        // replace footer logo inline styling
        html = html.replace(/<img src="assets\/images\/logo.png" alt="DesignWalts Logo" style="height:48px;">/g, '<img src="assets/images/logo.png" alt="DesignWalts Logo" style="height:70px; filter: brightness(0) invert(1);">');

        fs.writeFileSync(filePath, html);
    }
});

console.log('Footer logo size updated.');
