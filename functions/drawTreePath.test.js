const {OBJECT_ICON} = require('../constants/objectsIcon');
const {drawTreePath} = require('./drawTreePath');

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

beforeAll(hooksSetup.before);
afterAll(hooksSetup.after);

test('Тест корректной отрисовки элементов дерева (последний элемент, в последней директории)', () => {
   const params = {
      treePath: [{path: '', isLast: true}],
      objName: 'index.html',
      isLastObj: true,
      objIcon: OBJECT_ICON.FILE,
   };

   drawTreePath(...Object.values(params));
   expect(console.log).toHaveBeenCalledWith(`   └──${params.objIcon} ${params.objName}`);
});

test('Тест корректной отрисовки элементов дерева (последний элемент, в непоследней директории)', () => {
   const params = {
      treePath: [
         {path: '', isLast: false},
      ],
      objName: 'index.html',
      isLastObj: true,
      objIcon: OBJECT_ICON.FILE,
   };

   drawTreePath(...Object.values(params));
   expect(console.log).toHaveBeenCalledWith(`|  └──${params.objIcon} ${params.objName}`);
});

test('Тест корректной отрисовки элементов дерева (непоследний элемент, в последней директории)', () => {
   const params = {
      treePath: [
         {path: '', isLast: true},
      ],
      objName: 'index.html',
      isLastObj: false,
      objIcon: OBJECT_ICON.FILE,
   };

   drawTreePath(...Object.values(params));
   expect(console.log).toHaveBeenLastCalledWith(`   ├──${params.objIcon} ${params.objName}`);
});

test('Тест корректной отрисовки элементов дерева (непоследний элемент, в непоследней директории)', () => {
   const params = {
      treePath: [
         {path: '', isLast: false},
      ],
      objName: 'index.html',
      isLastObj: false,
      objIcon: OBJECT_ICON.FILE,
   };

   drawTreePath(...Object.values(params));
   expect(console.log).toHaveBeenLastCalledWith(`|  ├──${params.objIcon} ${params.objName}`);
});

test('Тест корректной отрисовки элементов дерева (последний элемент, в непоследней директории) глубина 2', () => {
   const params = {
      treePath: [
         {path: '', isLast: false},
         {path: '', isLast: true},
      ],
      objName: 'index.html',
      isLastObj: true,
      objIcon: OBJECT_ICON.FILE,
   };

   drawTreePath(...Object.values(params));
   expect(console.log).toHaveBeenLastCalledWith(`|     └──${params.objIcon} ${params.objName}`);
});

test('Тест корректной отрисовки элементов дерева (последний элемент, в последней директории) глубина 2', () => {
   const params = {
      treePath: [
         {path: '', isLast: true},
         {path: '', isLast: true},
      ],
      objName: 'index.html',
      isLastObj: true,
      objIcon: OBJECT_ICON.FILE,
   };

   drawTreePath(...Object.values(params));
   expect(console.log).toHaveBeenLastCalledWith(`      └──${params.objIcon} ${params.objName}`);
});