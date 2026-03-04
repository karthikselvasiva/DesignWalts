const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');

    // Append at the very end to override blue labels in dark sections
    css += '\n/* Override small label texts in dark sections to pure white */\n';
    css += '.page-hero .label, .section-dark .label {\n  color: var(--clr-white) !important;\n}\n';

    fs.writeFileSync(cssFile, css);
}

console.log('Appended label overrides for dark sections to style.css');
