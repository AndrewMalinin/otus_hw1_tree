const fs = require('fs');
const path = require('path');

const {drawRootDir} = require('./drawRootDir');
const {drawTreePath} = require('./drawTreePath');
const {OBJECT_ICON} = require('../constants/objectsIcon');

function traverseDir(dirPath, maxDepth = 1) {
   if (!fs.existsSync(dirPath)) {
      console.log(OBJECT_ICON.ERROR + ' ' + 'Запрашиваемая директория не найдена');
      return;
   }

   const treePath = [];
   let currentDepth = 0;

   const recursiveTraverse = (_path, isLast = true) => {
      if (++currentDepth > maxDepth) return;

      treePath.push({
         path: _path,
         isLast,
      });

      const currentPath = path.join(...treePath.map(pathObj => pathObj.path));
      let dirEntries = [];
      try {
         dirEntries = fs.readdirSync(currentPath, {withFileTypes: true});
      } catch (err) {
         drawTreePath(treePath, 'Нет прав на чтение содержимого директории', true, OBJECT_ICON.ERROR);
         return treePath.pop();
      }
      const lastEntityIndex = dirEntries.length - 1;

      dirEntries.forEach((dirEntry, i) => {
         const isLastEntity = lastEntityIndex === i;
         const entityName = dirEntry.name;
         drawTreePath(
            treePath,
            entityName,
            isLastEntity,
            dirEntry.isDirectory() ? OBJECT_ICON.FOLDER : OBJECT_ICON.FILE
         );
         if (dirEntry.isDirectory()) {
            recursiveTraverse(entityName, isLastEntity);
            currentDepth--;
         }
      });
      treePath.pop();
   };

   drawRootDir(dirPath);
   recursiveTraverse(dirPath);
}

module.exports = {
   traverseDir,
};
