const path = require('path');
const fse = require('fs-extra');
const Table = require('cli-table');
const colors = require('colors');
const {
  spawn
} = require('child_process');
// const readlineSync = require('readline-sync');

const util = require('./src/utils');

// __dirname 是被执行的js 文件的地址
const Root = path.resolve(__dirname);
// 是当前执行node命令时候的文件夹地址
const RunPath = process.cwd();

const ISWINDOWS = /^win/.test(process.platform);

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
  util.print('Using vika from', c => c.magenta(Root));
  util.print('Current directory', c => c.magenta(RunPath));
  util.print('Start working...'.info);
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
    console.error(colors.error(`chdir: ${err}`));
    return;
  }
  process.env.NODE_ENV = option.action === 'deploy' ? 'production' : 'development';
  process.env.ROOT = Root;
  process.env.ACTION = option.action;
  process.env.CONFIG_FILE = option.config_file || '';
  process.env.PAGE = option.page;
  process.env.WORKING_PATH = workingPath;
  process.env.PROJECT_ROOT = projectPath;
  process.env.CMD_RUN_PATH = RunPath;
  // 读取lib，注意。该require不能提前。依赖上面定义的process.env;
  let lib;
  try {
    lib = require('./src/lib');
  } catch (err) {
    console.error(colors.error(`path: ${err}`));
    return;
  }
  console.log(lib);
  if (lib.vikarcPath) {
    util.print('Use Config', c => c.magenta(lib.vikarcPath));
  }
  util.print('Starting task', c => c.magenta(lib.action + ' ' + lib.page));
  // webpack可执行文件
  const webpackBin = path.join(__dirname, 'node_modules', '.bin/webpack');
  // 本地server模式
  const webpackDevBin = path.join(__dirname, 'node_modules', '.bin/webpack-dev-server');
  const webpackConfig = path.join(__dirname, 'src/lib', 'webpack.' + lib.action + '.js');
  let subprocess = null;
  if (lib.action === 'work') {
    // if (lib.page === 'all') {
    //   util.print('Please select a dir'.error);
    //   return;
    // }
    subprocess = spawn(webpackDevBin + (ISWINDOWS ? '.cmd' : ''), ['--config', webpackConfig], {
      stdio: 'inherit',
      env: process.env
    });
  }
  subprocess.on('error', (err) => {
    console.log('启动子进程失败。', err);
  });
};
