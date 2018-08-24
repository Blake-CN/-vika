'use strict';

const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.common');
const config = require('./index.js');

module.exports = merge(common, {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(config.workingPath, config.development_dist),
    compress: true,
    port: 9000,
    historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
    inline: true,
    host: '0.0.0.0' // 服务器外部可访问
    // open: true
  }
});
