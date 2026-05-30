const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('Course_Ecom')) {
    content = content.replace(/Course_Ecom/g, 'Ulearnsystems');
    fs.writeFileSync(filePath, content);
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === '.next') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else {
      if (['.ts', '.tsx', '.md', '.prisma', '.json'].includes(path.extname(fullPath))) {
        replaceInFile(fullPath);
      }
    }
  }
}

walk('.');
