'use strict';

const path = require('path');
const fs = require('fs');

const util = require('../utils');

let options = {
  babel: false, // 是否开启babel编译
  vue: false, // 是否支持vue
  react: false, // 是否支持react
  watch: false, // 默认项目不能使用watch命令，需要手动开启
  domain: '', // watch模式用到的
  development_dist: '/dev', // 开发模式输出目录
  production_dist: '/dist', // online模式输出目录
  exclude: ['common', 'vue-common'], // 忽略的目录，该目录不会作为入口
  externals: {}, // 官方externals
  ignoreJs: [], // 忽略打包的js
  ignoreCss: [], // 忽略打包的css
  cache: true, // 是否开启缓存
  htmlMinify: false,
};
const vikarcPath = path.isAbsolute(process.env.CONFIG_FILE || ' ') ? process.env.CONFIG_FILE : path.resolve(process.env.WORKING_PATH, '.vikarc');
if (fs.existsSync(vikarcPath)) {
  options.vikarcPath = vikarcPath;
  options = Object.assign(
    options,
    JSON.parse(fs.readFileSync(vikarcPath, 'utf8')),
  );
}
options.ignoreFile = options.ignoreJs.concat(options.ignoreCss);
options.ignoreFileRegExp = new RegExp(options.ignoreFile.map(item => '(' + item.replace('.', '\\.') + ')').join('|') + '$', 'i');
// 将环境变量统一写入配置中
options = Object.assign(options, {
  NODE_ENV: process.env.NODE_ENV,
  page: process.env.PAGE,
  pages: process.env.PAGE === 'all' ? util.readDir(path.resolve(process.env.WORKING_PATH, 'src'), options.exclude) : [process.env.PAGE],
  action: process.env.ACTION,
  root: process.env.Root,
  workingPath: process.env.WORKING_PATH,
  projectPath: process.env.PROJECT_ROOT,
  user: process.env.USER,
  cachePath: path.resolve(process.env.WORKING_PATH, '.vika-cache/')
});
module.exports = options;
