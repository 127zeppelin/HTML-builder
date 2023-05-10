const fs = require('fs');
const path = require('path');
const oldDirPath = path.join(__dirname, 'files');
const dirPath = path.join(__dirname, 'files-copy');

fs.access(dirPath, fs.constants.F_OK, (err) => {
  if (!err) {
    fs.rm(dirPath, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      } else {
      }
      fs.mkdir(dirPath, null, (err) => {
        if (err) throw err;
        fs.readdir(oldDirPath, { withFileTypes: true }, (err, files) => {
          if (err) {
            console.error(err);
            return;
          }
          files.forEach(file => {
            const src = path.join(oldDirPath, file.name);
            const dest = path.join(dirPath, file.name);
        
            fs.copyFile(src, dest, err => {
              if (err) {
                console.error(`Error copying file ${src} to ${dest}:`, err);
              }
            });
          });
        });
      });
    });
  } else {
    fs.mkdir(dirPath, null, (err) => {
      if (err) throw err;
      fs.readdir(oldDirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files.forEach(file => {
          const src = path.join(oldDirPath, file.name);
          const dest = path.join(dirPath, file.name);
      
          fs.copyFile(src, dest, err => {
            if (err) {
              console.error(`Error copying file ${src} to ${dest}:`, err);
            }
          });
        });
      });
    });
  }
});

