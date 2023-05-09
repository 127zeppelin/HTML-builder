const fs = require('fs');
const path = require('path');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const dirCssPath = path.join(__dirname, 'styles');

console.log(bundlePath);

fs.access(bundlePath, fs.constants.F_OK, (err) => {
    if (!err) {
        fs.truncate(bundlePath, 0, (err) => {
            if (err) throw err;
            fs.writeFile(bundlePath, '', (err) => {
                if (err) throw err;
                fs.readdir(dirCssPath, { withFileTypes: true }, (err, files) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    const srcCssFiles = files.filter(file => {
                        return file.isFile() && path.extname(file.name) === '.css';
                      });
                      srcCssFiles.forEach(file => {
                        const srcCssFile = path.join(dirCssPath, file.name);
                        fs.readFile(srcCssFile, 'utf8', (err, data) => {
                            if (err) throw err;
                            fs.appendFile(bundlePath, data + '\n', (err) => {
                                if (err) throw err;
                                console.log(`Успешно код из файла CSS:${srcCssFile}`);
                            });
                        });
                    });
                });
            });
          });
    } else {
        fs.writeFile(bundlePath, '', (err) => {
            if (err) throw err;
            fs.readdir(dirCssPath, { withFileTypes: true }, (err, files) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const srcCssFiles = files.filter(file => {
                    return file.isFile() && path.extname(file.name) === '.css';
                  });
                  srcCssFiles.forEach(file => {
                    const srcCssFile = path.join(dirCssPath, file.name);
                    fs.readFile(srcCssFile, 'utf8', (err, data) => {
                        if (err) throw err;
                        fs.appendFile(bundlePath, data + '\n', (err) => {
                            if (err) throw err;
                            console.log(`Успешно код из файла CSS:${srcCssFile}`);
                        });
                    });
                });
            });
        });
    }
});





