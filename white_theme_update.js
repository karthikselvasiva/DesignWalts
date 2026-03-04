const fs = require('fs');
const path = require('path');

// Update CSS file
const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');

    // 1. Navbar changes
    css = css.replace('.navbar {\r\n  position: fixed;', '.navbar {\r\n  position: fixed;\r\n  background: var(--clr-white);\r\n  box-shadow: 0 2px 20px rgba(0,0,0,0.05);');
    css = css.replace('.navbar {\n  position: fixed;', '.navbar {\n  position: fixed;\n  background: var(--clr-white);\n  box-shadow: 0 2px 20px rgba(0,0,0,0.05);');

    // 2. Footer changes
    css = css.replace('.footer { background: var(--clr-dark); color: rgba(255,255,255,0.7); padding: 80px 0 0; }', '.footer { background: var(--clr-white); color: var(--clr-text-light); padding: 80px 0 0; border-top: 1px solid var(--clr-border); }');
    css = css.replace('.footer h4 { color: var(--clr-white); font-size: 1.1rem; margin-bottom: 24px; }', '.footer h4 { color: var(--clr-primary); font-size: 1.1rem; margin-bottom: 24px; }');
    css = css.replace('.footer-links a {\r\n  display: block; padding: 6px 0; font-size: 0.9rem;\r\n  color: rgba(255,255,255,0.6); transition: var(--transition);\r\n}', '.footer-links a {\r\n  display: block; padding: 6px 0; font-size: 0.9rem;\r\n  color: var(--clr-text-light); transition: var(--transition);\r\n}');
    css = css.replace('.footer-links a {\n  display: block; padding: 6px 0; font-size: 0.9rem;\n  color: rgba(255,255,255,0.6); transition: var(--transition);\n}', '.footer-links a {\n  display: block; padding: 6px 0; font-size: 0.9rem;\n  color: var(--clr-text-light); transition: var(--transition);\n}');

    // social icons
    css = css.replace('.social-icon {\r\n  width: 40px; height: 40px; border-radius: 50%;\r\n  border: 1px solid rgba(255,255,255,0.2);\r\n  display: flex; align-items: center; justify-content: center;\r\n  color: rgba(255,255,255,0.7); transition: var(--transition); font-size: 1rem;\r\n}', '.social-icon {\r\n  width: 40px; height: 40px; border-radius: 50%;\r\n  border: 1px solid var(--clr-border);\r\n  display: flex; align-items: center; justify-content: center;\r\n  color: var(--clr-text-light); transition: var(--transition); font-size: 1rem;\r\n}');
    css = css.replace('.social-icon {\n  width: 40px; height: 40px; border-radius: 50%;\n  border: 1px solid rgba(255,255,255,0.2);\n  display: flex; align-items: center; justify-content: center;\n  color: rgba(255,255,255,0.7); transition: var(--transition); font-size: 1rem;\n}', '.social-icon {\n  width: 40px; height: 40px; border-radius: 50%;\n  border: 1px solid var(--clr-border);\n  display: flex; align-items: center; justify-content: center;\n  color: var(--clr-text-light); transition: var(--transition); font-size: 1rem;\n}');

    // footer bottom
    css = css.replace('.footer-bottom {\r\n  border-top: 1px solid rgba(255,255,255,0.1);', '.footer-bottom {\r\n  border-top: 1px solid var(--clr-border);');
    css = css.replace('.footer-bottom {\n  border-top: 1px solid rgba(255,255,255,0.1);', '.footer-bottom {\n  border-top: 1px solid var(--clr-border);');
    css = css.replace('.footer-bottom a { color: rgba(255,255,255,0.5); }', '.footer-bottom a { color: var(--clr-text-light); }');

    // Clean up navbar-dark overrides logic if we injected them previously
    // The previous injected text:
    // .navbar-dark .nav-logo { color: var(--clr-white); }
    // .navbar-dark .nav-links a { color: rgba(255,255,255,0.9); }
    // .navbar-dark .nav-links a:hover, .navbar-dark .nav-links a.active { color: var(--clr-white); }
    // .navbar-dark .hamburger span { background: var(--clr-white); }
    // We can just leave them in CSS but not use the class in HTML. However, let's remove the white logo filter:
    css = css.replace('.navbar-dark:not(.scrolled) .nav-logo img { filter: brightness(0) invert(1); }', '/* removed */');

    fs.writeFileSync(cssFile, css);
}

// Update HTML files
const htmlFiles = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'testimonials.html', 'contact.html', '404.html', 'success.html'];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');

        // Remove navbar-dark class
        html = html.replace(/<nav class="navbar navbar-dark" id="navbar">/g, '<nav class="navbar" id="navbar">');
        html = html.replace(/<nav class="navbar navbar-dark scrolled" id="navbar">/g, '<nav class="navbar scrolled" id="navbar">');
        html = html.replace(/<nav class="navbar scanned"/g, '<nav class="navbar scrolled"'); // typo check just in case

        // Correct footer logo to remove inversion filter and remove inline color:#fff
        html = html.replace(/<img src="assets\/images\/logo\.png" alt="DesignWalts Logo" style="height:48px; filter: brightness\(0\) invert\(1\);">/g, '<img src="assets/images/logo.png" alt="DesignWalts Logo" style="height:48px;">');
        // also earlier version just in case
        html = html.replace(/<a href="index\.html" class="nav-logo" style="color:#fff;">/g, '<a href="index.html" class="nav-logo">');

        fs.writeFileSync(filePath, html);
    }
});

console.log('Header and Footer updated to white theme.');
