const path = require('path');
const fse = require('fs-extra');
const Table = require('cli-table');
const colors = require('colors');
const readlineSync = require('readline-sync');

// __dirname 是被执行的js 文件的地址
const RootPath = path.resolve(__dirname);
// 是当前执行node命令时候的文件夹地址
const RunPath = process.cwd();

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
});
