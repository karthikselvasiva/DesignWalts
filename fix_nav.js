const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');
let css = fs.readFileSync(cssFile, 'utf8');

// Add navbar-dark class for inner pages
const newCSS = `
/* --- Navigation Dark Theme (for inner pages) --- */
.navbar-dark .nav-logo { color: var(--clr-white); }
.navbar-dark .nav-links a { color: rgba(255,255,255,0.9); }
.navbar-dark .nav-links a:hover, .navbar-dark .nav-links a.active { color: var(--clr-white); }
.navbar-dark .hamburger span { background: var(--clr-white); }

.navbar-dark.scrolled .nav-logo { color: var(--clr-primary); }
.navbar-dark.scrolled .nav-links a { color: var(--clr-primary); }
.navbar-dark.scrolled .hamburger span { background: var(--clr-primary); }
`;

if (!css.includes('.navbar-dark')) {
    css = css.replace('/* --- Hero --- */', newCSS + '\n/* --- Hero --- */');
    fs.writeFileSync(cssFile, css);
}

// Add navbar-dark class to inner pages
const innerPages = ['about.html', 'services.html', 'portfolio.html', 'testimonials.html', 'contact.html', '404.html'];

innerPages.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        html = html.replace('<nav class="navbar" id="navbar">', '<nav class="navbar navbar-dark" id="navbar">');
        // also handle 404 and success which use scrolled
        html = html.replace('<nav class="navbar scrolled">', '<nav class="navbar navbar-dark scrolled" id="navbar">');
        fs.writeFileSync(filePath, html);
    }
});

console.log('Navigation contrast fixed for inner pages.');
