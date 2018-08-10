'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./index.js');
const webpackConf = require('./module/base.js');

module.exports = webpackConf;
