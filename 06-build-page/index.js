const fs = require('fs').promises;
const path = require('path');

const assetsPath = path.join(__dirname, 'assets');
const projectDir = path.join(__dirname, 'project-dist');
const projectAssetsPath = path.join(__dirname, 'project-dist', 'assets');
const styleCssPath = path.join(__dirname, 'project-dist', 'style.css');
const dirCssPath = path.join(__dirname, 'styles');
const indexHtmlPath = path.join(__dirname, 'project-dist', 'index.html');
const templateHtmlPath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');


const copyFolderRecursive = async (src, dest) => {
  try {
    await fs.mkdir(dest, { recursive: true });

    const files = await fs.readdir(src, { withFileTypes: true });
    for (const file of files) {
      const srcPath = path.join(src, file.name);
      const destPath = path.join(dest, file.name);

      if (file.isDirectory()) {
        await copyFolderRecursive(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
    //console.log(`Folder ${src} copied to ${dest} successfully.`);

    await buildCss();
  } catch (error) {
    console.error(`Error copying folder ${src} to ${dest}:`, error);
  }
};

const buildCss = async () => {
  try {
    await fs.writeFile(styleCssPath, '');

    const files = await fs.readdir(dirCssPath, { withFileTypes: true });
    const srcCssFiles = files.filter(file => file.isFile() && path.extname(file.name) === '.css');

    for (const file of srcCssFiles) {
      const srcCssFile = path.join(dirCssPath, file.name);
      const data = await fs.readFile(srcCssFile, 'utf8');
      await fs.appendFile(styleCssPath, data + '\n');
      //console.log(`Успешно код из файла CSS: ${srcCssFile}`);
    }

    await buildHtml();
  } catch (error) {
    console.error(`Error building CSS:`, error);
  }
};

const buildHtml = async () => {
  try {
    await fs.writeFile(indexHtmlPath, '');

    const data = await fs.readFile(templateHtmlPath, 'utf8');
    await fs.appendFile(indexHtmlPath, data);
    readComponents();
  } catch (error) {
    console.error(`Error building HTML:`, error);
  }
};
copyFolderRecursive(assetsPath, projectAssetsPath);


const readComponents = async () => {
  try {
    const files = await fs.readdir(componentsPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        //console.log(`Directory: ${file.name}`);
      } else if (file.isFile()) {
        const filePath = path.join(componentsPath, file.name);
        const fileName = path.basename(filePath, path.extname(filePath));
        const srcComponentFile = path.join(componentsPath, file.name);
        const replaceString = await fs.readFile(srcComponentFile, 'utf8');
        let searchString = `{{${fileName}}}`;
        const content = await fs.readFile(indexHtmlPath, 'utf8');
        const updatedContent = content.replace(searchString, replaceString);
        await fs.writeFile(indexHtmlPath, updatedContent, 'utf8');
      }
    }
    //console.log('Ну и заданице')
  } catch (error) {
    console.error(error);
  }
}
