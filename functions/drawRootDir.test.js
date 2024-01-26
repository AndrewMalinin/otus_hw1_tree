const {drawRootDir} = require('./drawRootDir');

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

test('Тест корректной отрисовки корневого каталога', () => {
   drawRootDir('rootDirName');
   expect(console.log).toHaveBeenCalledWith('📁 rootDirName');
});
