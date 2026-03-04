const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');

    // Update scrolled logo height
    css = css.replace(/\.navbar\.scrolled \.nav-logo img\s*\{\s*height:\s*\d+px;\s*\}/g, '.navbar.scrolled .nav-logo img { height: 75px; }');
    if (!css.includes('.navbar.scrolled .nav-logo img { height: 75px; }')) {
        // Fallback if not found
        css += '\n.navbar.scrolled .nav-logo img { height: 75px; }\n';
    }

    fs.writeFileSync(cssFile, css);
}

const htmlFiles = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'testimonials.html', 'contact.html', '404.html', 'success.html'];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');

        // Update footer logo
        html = html.replace(/<img src="assets\/images\/logo\.png" alt="DesignWalts Logo" style="height:\d+px;">/g, '<img src="assets/images/logo.png" alt="DesignWalts Logo" style="height:120px;">');

        fs.writeFileSync(filePath, html);
    }
});

console.log('Logo sizes maximized across site.');
