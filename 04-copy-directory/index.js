const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'text.txt');


if (fs.existsSync(dirPath)) {
  console.log('Файл уже существует');
} else {
  console.log('Файл не существует, создаем новый файл text.txt');
  fs.writeFileSync(filePath, '');
}