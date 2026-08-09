const fs = require('fs');
const path = require('path');
const dir = 'components/ideas';
const files = fs.readdirSync(dir);
for (const file of files) {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/dark:[^\s"'\`]+/g, '');
    fs.writeFileSync(fullPath, content);
  }
}
console.log('Done stripping dark classes from components/ideas');
