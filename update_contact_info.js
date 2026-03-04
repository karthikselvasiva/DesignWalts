const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');

    // Update .btn-primary to ensure text color is white
    // Currently it's: .btn-primary { background: var(--clr-gradient); color: var(--clr-primary); }
    // Let's modify it to be white
    css = css.replace('.btn-primary {\n  background: var(--clr-gradient);\n  color: var(--clr-primary);', '.btn-primary {\n  background: var(--clr-gradient);\n  color: var(--clr-white);');
    // For PC differences \r\n
    css = css.replace('.btn-primary {\r\n  background: var(--clr-gradient);\r\n  color: var(--clr-primary);', '.btn-primary {\r\n  background: var(--clr-gradient);\r\n  color: var(--clr-white);');

    fs.writeFileSync(cssFile, css);
}

const htmlFiles = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'testimonials.html', 'contact.html', '404.html', 'success.html'];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');

        // Update footer contact info globally
        html = html.replace(/info@designwalts\.com/g, 'designwalts@gmail.com');
        html = html.replace(/\+91 XXXXX XXXXX/g, '+91 8124393132');
        html = html.replace(/\+91XXXXXXXXXX/g, '918124393132'); // For tel: and wa.me links
        html = html.replace(/Madurai, Tamil Nadu, India/g, 'Chennai, Tamil Nadu, India');

        fs.writeFileSync(filePath, html);
    }
});

console.log('Contact info and button styles updated.');
