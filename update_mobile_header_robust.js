const fs = require('fs');
const path = require('path');

const cssPath = path.join('c:', 'Users', 'Open Skools', 'Downloads', 'Static Site', 'assets', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Find the mobile media query and update the hamburger inside it
const mobileMediaQueryStart = css.indexOf('@media (max-width: 768px)');
if (mobileMediaQueryStart !== -1) {
    const blockEnd = css.indexOf('}', mobileMediaQueryStart + 25); // find the end of the media query
    // This is a bit simplified, but let's look for .hamburger inside that block
    const afterMediaQuery = css.substring(mobileMediaQueryStart);
    const hamburgerIndex = afterMediaQuery.indexOf('.hamburger {');
    if (hamburgerIndex !== -1) {
        const absoluteIndex = mobileMediaQueryStart + hamburgerIndex;
        const closingBraceIndex = css.indexOf('}', absoluteIndex);
        if (closingBraceIndex !== -1) {
            const hamburgerBlock = css.substring(absoluteIndex, closingBraceIndex + 1);
            const newHamburgerBlock = hamburgerBlock.replace('display: flex;', 'display: flex;\n    position: absolute;\n    right: 20px;');
            css = css.substring(0, absoluteIndex) + newHamburgerBlock + css.substring(closingBraceIndex + 1);
        }
    }
}

fs.writeFileSync(cssPath, css);
console.log('Mobile header hamburger position updated.');
