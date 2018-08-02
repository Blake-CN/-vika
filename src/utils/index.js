'use strict';

// const fs = require('fs');
const moment = require('moment');
const colors = require('colors');

module.exports = {
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
