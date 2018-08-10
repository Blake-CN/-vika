'use strict';

const fs = require('fs');
const moment = require('moment');
const colors = require('colors');

module.exports = {
  // 读取目录下的所有文件夹，忽略隐藏文件夹，以及自定义忽略
  readDir(dirname, exclude = []) {
    const dirs = fs.readdirSync(dirname);
    return dirs.filter((item) => {
      if (item.indexOf('.') === 0) {
        return false;
      }
      if (exclude.indexOf(item) >= 0) {
        return false;
      }
      return true;
    });
  },
  print(...args) {
    args.unshift(`[${colors.gray(moment().format('HH:mm:ss'))}]`);
    args.forEach((item, index) => {
      if (typeof item === 'function') {
        args[index] = item(colors);
      }
    });
    console.log(...args);
  },
};
