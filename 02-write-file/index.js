const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');


fs.access(filePath, fs.constants.F_OK, (err) => {
  if (!err) {
    console.log('Файл уже существует');
  } else {
    console.log('Файл не существует, создаем новый файл text.txt');
    fs.writeFileSync(filePath, '');
  }
});

process.on('SIGINT', () => {
  stdout.write('Удачи в изучении Node.js!');
  process.exit();
});

const { stdin, stdout } = process;
stdin.on('data', data => {
  const text = data.toString().trim(); 

  if (text === 'exit') {
    stdout.write('Удачи в изучении Node.js!');
    process.exit();
  } else {
    fs.appendFile(filePath, text + '\n', (err) => {
      if (err) throw err;
      console.log(`Успешно добавлен текст:${text}`);
    });
  }
});


