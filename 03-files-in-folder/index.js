const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');
fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  for (const file of files) {
    if (file.isDirectory()) {
    } else if (file.isFile()) {
      const { name } = path.parse(file.name);
      const extension = path.extname(file.name).slice(1);
      const filePath = path.join(dirPath, file.name);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`${name} - ${extension} - ${stats.size} байт`);
      })
    }
  }
});