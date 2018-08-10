'use strict';

const path = require('path');

const config = require('../index');

const entry = {};
config.pages.forEach((page) => {
  entry[page] = [path.resolve(
    config.working_path,
    'src',
    page,
    'static',
    page + '.js',
  )];
});
console.log(entry);
module.exports = entry;
