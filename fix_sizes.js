const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');
    css = css.replace('.navbar.scrolled .nav-logo img {\r\n  height: 60px;\r\n}', '.navbar.scrolled .nav-logo img { height: 42px; }');
    css = css.replace('.navbar.scrolled .nav-logo img {\n  height: 60px;\n}', '.navbar.scrolled .nav-logo img { height: 42px; }');
    fs.writeFileSync(cssFile, css);
}

const htmlFiles = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'testimonials.html', 'contact.html', '404.html', 'success.html'];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        html = html.replace(/<img src="assets\/images\/logo.png" alt="DesignWalts Logo" style="height:70px; filter: brightness\(0\) invert\(1\);">/g, '<img src="assets/images/logo.png" alt="DesignWalts Logo" style="height:48px; filter: brightness(0) invert(1);">');
        fs.writeFileSync(filePath, html);
    }
});

console.log('Fixed scrolled and footer logo heights.');
