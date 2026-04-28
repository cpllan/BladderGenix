const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /class=["']([^"']*)extracted-style-(\d+)([^"']*)["']/g;
let match;
while ((match = regex.exec(html)) !== null) {
    let classes = (match[1] + ' ' + match[3]).split(' ').filter(c => c.trim());
    console.log(`extracted-style-${match[2]} goes to: ${classes.join(', ')}`);
}
