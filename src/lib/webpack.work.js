'use strict';

const fs = require('fs');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./index.js');

const webpackConf = {
  mode: config.NODE_ENV,
  entry: {
    [config.page]: `./src/${config.page}/${config.page}.js`
  },
  output: {
    path: path.join(config.workingPath, config.development_dist),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: ['url-loader']
    }, {
      test: /\.shtml$/,
      use: ['html-loader']
    }]
  },
  plugins: []
};

webpackConf.plugins.unshift(
  new CleanWebpackPlugin([path.join(config.workingPath, config.development_dist)], {
    root: config.workingPath,
    verbose: true, // 是否在控制台输出信息
    dry: false // 启用删除文件
  })
);

// fs.readdirSync(config.workingPath, 'src').forEach((item) => {
//   webpackConf.plugins.push(new HtmlWebpackPlugin({
//     filename: path.resolve(config.workingPath, ``),
//     template: path.resolve(config.workingPath, `${item}/static/${item}.html`),
//     inject: false
//   }));
// });
module.exports = webpackConf;
