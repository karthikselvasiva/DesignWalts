const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');

    // Make sure hamburger is dark on white navbar
    css = css.replace('.hamburger span {\r\n  width: 28px; height: 2.5px; background: var(--clr-primary);',
        '.hamburger span {\r\n  width: 28px; height: 2.5px; background: var(--clr-primary);');

    // Remove navbar-dark references entirely to avoid confusion since the navbar is always white now
    css = css.replace(/\/\* --- Navigation Dark Theme.*?\.navbar-dark\.scrolled \.hamburger span \{ background: var\(--clr-primary\); \}/s, '');

    fs.writeFileSync(cssFile, css);
}

const htmlFiles = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'testimonials.html', 'contact.html', '404.html', 'success.html'];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        // Clean up any remaining navbar-dark
        html = html.replace(/navbar-dark/g, '');
        // Clean up excess spaces
        html = html.replace(/class="navbar\s+"/g, 'class="navbar"');
        html = html.replace(/class="navbar\s+scrolled"/g, 'class="navbar scrolled"');

        fs.writeFileSync(filePath, html);
    }
});

console.log('Nav text and classes cleaned up.');
