const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');

    // Fix button text color specifically for navbar
    if (!css.includes('.nav-links a.btn-primary')) {
        css += '\n/* Override navigation links color for primary buttons */\n';
        css += '.nav-links a.btn-primary {\n  color: var(--clr-white) !important;\n}\n';
    }

    // Fix page-hero subtitle text color
    css = css.replace(/\.page-hero p \{(?:.|\n|\r)*?\}/, '.page-hero p {\n  color: var(--clr-white);\n  font-size: 1.15rem;\n  max-width: 600px;\n  margin: 0 auto;\n}');

    fs.writeFileSync(cssFile, css);
}

console.log('Fixed button text color and page-hero subtitle color.');
