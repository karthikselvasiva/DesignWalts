const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'testimonials.html', 'contact.html', '404.html', 'success.html'];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');

        // Replace header logo
        html = html.replace(/<a href="index\.html" class="nav-logo">Design<span>Walts<\/span><\/a>/g, '<a href="index.html" class="nav-logo"><img src="assets/images/logo.png" alt="DesignWalts Logo"></a>');

        // Replace footer logo (it has inline style="color:#fff;")
        // In the dark footer we want the logo to stand out, maybe we can use it as is or invert it
        // Depending on the logo, normal might be dark, so invert it
        html = html.replace(/<a href="index\.html" class="nav-logo" style="color:#fff;">Design<span>Walts<\/span><\/a>/g, '<a href="index.html" class="nav-logo"><img src="assets/images/logo.png" alt="DesignWalts Logo" style="height:48px;"></a>');

        // Some pages might have a different snippet
        fs.writeFileSync(filePath, html);
    }
});

const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');
    if (!css.includes('.nav-logo img')) {
        css = css.replace('.nav-logo span { color: var(--clr-teal); }', '.nav-logo span { color: var(--clr-teal); }\n.nav-logo img { height: 44px; width: auto; display: block; transition: var(--transition); }');

        // For navbar-dark (inner pages), we might want a white version of the logo or invert filter if the original logo is dark
        // The original logo has blue gradients. So maybe we can add a brightness filter when it's on dark background?
        // Let's add it to the script
        const darkLogoCSS = `
.navbar-dark:not(.scrolled) .nav-logo img { filter: brightness(0) invert(1); }
`;
        if (!css.includes('filter: brightness(0) invert(1);')) {
            css = css.replace('/* --- Navigation Dark Theme (for inner pages) --- */', '/* --- Navigation Dark Theme (for inner pages) --- */' + darkLogoCSS);
        }

        fs.writeFileSync(cssFile, css);
    }
}
console.log('Logo tags replaced and CSS updated.');
