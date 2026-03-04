const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');
let css = fs.readFileSync(cssFile, 'utf8');

// 1. Root variables
css = css.replace('--clr-primary: #1A1A2E;', '--clr-primary: #0F143A;');
css = css.replace('--clr-light: #F5F5F5;', '--clr-light: #F4F7FB;');
css = css.replace('--clr-teal: #00D4AA;', '--clr-teal: #1864B2;\n  --clr-gradient: linear-gradient(135deg, #1864B2 0%, #3BD3E7 100%);');
css = css.replace('--clr-teal-dark: #00b894;', '--clr-teal-dark: #0F4E8F;');
css = css.replace('--clr-gold: #FFB347;', '--clr-gold: #3BD3E7;');
css = css.replace('--clr-text: #4A4A4A;', '--clr-text: #2C3E50;');
css = css.replace('--clr-text-light: #6B6B6B;', '--clr-text-light: #64748B;');
css = css.replace('--clr-border: #E8E8E8;', '--clr-border: #E2E8F0;');
css = css.replace('--clr-dark: #1A1A1A;', '--clr-dark: #0A0C27;');

// 2. Shadows and Opacities (Teal rgba -> Blue rgba)
css = css.replace(/rgba\(0,212,170/g, 'rgba(24,100,178');

// 3. Primary button background
css = css.replace(
    'background: var(--clr-teal); color: var(--clr-white);',
    'background: var(--clr-gradient); color: var(--clr-white); border: none;'
);
css = css.replace(
    'background: var(--clr-teal-dark); transform: translateY(-2px);',
    'background: linear-gradient(135deg, #0F4E8F 0%, #2FBAD6 100%); transform: translateY(-2px);'
);

// 4. Update the portfolio overlay and page-hero gradients
css = css.replace(/#2d2d4e/g, '#182052');
css = css.replace(/rgba\(26,26,46/g, 'rgba(15,20,58');

// 5. Hero hero-shape-2 (gold is now cyan)
// No need to change the CSS rule because the var(--clr-gold) is already redefined to cyan.

// 6. Fix any direct inline colors in HTML files
const htmlFiles = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'testimonials.html', 'contact.html'];
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        // Replace text color hardcodes
        html = html.replace(/color:#1A1A2E/g, 'color:#0F143A'); // if any

        // Also change the WhatsApp button color to teal(now blue) instead of default #25D366? 
        // Wait, whatsapp is recognizable by green. We'll leave it green as is standard.

        fs.writeFileSync(filePath, html);
    }
});

fs.writeFileSync(cssFile, css);
console.log('Colors successfully updated to Deep Navy and Smooth Blue Gradients.');
