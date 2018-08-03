const path = require('path');
const fse = require('fs-extra');
const Table = require('cli-table');
const colors = require('colors');
const readlineSync = require('readline-sync');

const util = require('./src/utils');

// __dirname 是被执行的js 文件的地址
const _path = path.resolve(__dirname);
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
  error: 'red'
});

module.exports = (option) => {
  util.print('begin(◕ᴗ◕✿)'.info);
  util.print('Using vika from', c => c.magenta(_path));
  util.print('Current directory', c => c.magenta(RunPath));
  util.print('Start working...'.info);
  console.log(option);
  const projectPath = RunPath;
  const workingPath = projectPath;
  // let appSystem = 'front';
  // const arrRunPath = RunPath.split(path.sep);

  // if (!projectPath) {
  //   util.print(c => c.red('Can`t found working path. Please make sure that you are in the correct directory!'));
  //   return;
  // }
  // process.chdir(workingPath);
  try {
    process.chdir(workingPath);
    util.print('Change working path to', c => c.magenta(workingPath));
  } catch (err) {
    console.error(`chdir: ${err}`);
  }
};
