const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');

    // Append at the very end
    css += '\n/* Override dark section texts to pure white */\n';
    css += '.page-hero p, .section-dark p {\n  color: var(--clr-white) !important;\n}\n';

    fs.writeFileSync(cssFile, css);
}

console.log('Appended dark section overrides to style.css');
