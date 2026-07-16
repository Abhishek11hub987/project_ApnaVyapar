const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if(file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = [...walk('app'), ...walk('components')];

let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('primary-')) {
        content = content.replace(/hover:bg-primary-500/g, 'hover:bg-teal-800');
        content = content.replace(/bg-primary-700/g, 'bg-teal-700');
        content = content.replace(/focus:border-primary-500/g, 'focus:border-teal-500');
        content = content.replace(/focus:ring-primary-500/g, 'focus:ring-teal-500');
        content = content.replace(/text-primary-700/g, 'text-teal-700');
        content = content.replace(/primary-300/g, 'teal-300');
        content = content.replace(/border-primary-700/g, 'border-teal-700');
        content = content.replace(/primary-700/g, 'teal-700');
        content = content.replace(/primary-500/g, 'teal-500');
        content = content.replace(/primary-/g, 'teal-');
        
        fs.writeFileSync(file, content);
        count++;
        console.log(`Updated ${file}`);
    }
});
console.log(`Updated ${count} files.`);
