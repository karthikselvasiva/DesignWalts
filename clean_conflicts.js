const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname);
const htmlFiles = files.filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const originalLength = content.length;

    // Regex to find git conflict markers
    // <<<<<<< HEAD ... ======= ... >>>>>>> [hash]
    const conflictRegex = /<<<<<<< HEAD[\s\S]*?=======[\s\S]*?>>>>>>> .*/g;

    content = content.replace(conflictRegex, '');

    // Also remove empty <br> tags at the start of hero-content if left over
    content = content.replace(/<div class="hero-content">\s*<br>/g, '<div class="hero-content">');

    if (content.length !== originalLength) {
        fs.writeFileSync(filePath, content);
        console.log(`Cleaned conflict markers in ${file}`);
    }
});
