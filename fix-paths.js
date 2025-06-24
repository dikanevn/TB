const fs = require('fs');
const path = require('path');

// Читаем index.html
const indexPath = path.join(__dirname, 'dist', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Заменяем абсолютные пути на относительные для GitHub Pages
content = content.replace(/href="\//g, 'href="./');
content = content.replace(/src="\//g, 'src="./');

// Записываем обратно
fs.writeFileSync(indexPath, content);

console.log('✅ Пути исправлены для GitHub Pages'); 