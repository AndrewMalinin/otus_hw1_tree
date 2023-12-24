#!/usr/bin/env node

const yargs = require('yargs');
const {traverseDir} = require('./functions/traverseDir');

const DEFAULT_DEPTH = 1;

const options = yargs
   .usage('\ntree <путь к директории> ')
   .option('depth', {alias: 'd', describe: 'Уровень вложенности для отображения', type: 'number'})
   .help(true).argv;

const depth = options.depth;

if (!options || options._.length === 0) {
   console.log('Ошибка! Не указан путь до директории');
} else if (depth === undefined) {
   console.log(`Не указан уровень вложенности, используется значение по умолчанию: ${DEFAULT_DEPTH}\n`);
   traverseDir(options._[0], DEFAULT_DEPTH);
} else {
   traverseDir(options._[0], depth);
}
