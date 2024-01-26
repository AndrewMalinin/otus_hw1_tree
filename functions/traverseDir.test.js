const fs = require('fs');
const {OBJECT_ICON} = require('../constants/objectsIcon');
const {traverseDir} = require('./traverseDir');
const path = require('path');
let a = console.log;

const hooksSetup = (() => {
   const consoleLogCopy = console.log;
   return {
      before: () => {
         console.log = jest.fn();
      },
      after: () => {
         console.log = consoleLogCopy;
      },
   };
})();

beforeEach(hooksSetup.before);
afterEach(hooksSetup.after);

test('Тест на вывод ошибки, если директория отсутствует', () => {
   traverseDir('./nonExistentDir', 1);
   expect(console.log).toHaveBeenLastCalledWith(`${OBJECT_ICON.ERROR} Запрашиваемая директория не найдена`);
});

test('Тест на построение структуры каталога', () => {
   const params = (() => {
      const testDirName = 'testDir';
      const nestedDirName = 'nestedDir';
      const testFileName = 'file.txt';
      const testDirPath = path.join(__dirname, testDirName);
      const nestedDirPath = path.join(testDirPath, nestedDirName);
      return {
         testDirName,
         nestedDirName,
         testFileName,
         testDirPath,
         nestedDirPath,
         createTestDir: () => {
            fs.mkdirSync(nestedDirPath, {recursive: true});
            fs.writeFileSync(path.join(nestedDirPath, testFileName), '');
         },
         removeTestDir: () => {
            fs.rmdirSync(testDirPath, {recursive: true});
         },
      };
   })();

   params.createTestDir();

   traverseDir(params.testDirPath, 2);

   expect(console.log).toHaveBeenNthCalledWith(1, `${OBJECT_ICON.FOLDER} ${params.testDirPath}`);
   expect(console.log).toHaveBeenNthCalledWith(2, `   └──${OBJECT_ICON.FOLDER} ${params.nestedDirName}`);
   expect(console.log).toHaveBeenNthCalledWith(3, `      └──${OBJECT_ICON.FILE} ${params.testFileName}`);
   
   params.removeTestDir();
});
