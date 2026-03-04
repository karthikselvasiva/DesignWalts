const fs = require('fs');
const path = require('path');

const cssPath = path.join('c:', 'Users', 'Open Skools', 'Downloads', 'Static Site', 'assets', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Center logo on mobile
css = css.replace(
    /@media \(max-width: 768px\) \{([\s\S]*?)\.section \{/,
    (match, p1) => `@media (max-width: 768px) {${p1}.navbar .container {\n    justify-content: center;\n    position: relative;\n  }\n\n  .section {`
);

// Position hamburger absolutely
css = css.replace(
    /\.hamburger \{([\s\S]*?)display: flex;([\s\S]*?)\}/,
    (match, p1, p2) => `.hamburger {${p1}display: flex;\n    position: absolute;\n    right: 20px;${p2}}`
);

fs.writeFileSync(cssPath, css);
console.log('Mobile header styles updated.');
