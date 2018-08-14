'use strict';

const path = require('path');

const config = require('../index');

const entry = {};

config.pages.forEach((page) => {
  entry[page] = [path.resolve(
    config.workingPath,
    'src',
    page,
    page + '.js'
  )];
});

module.exports = entry;
