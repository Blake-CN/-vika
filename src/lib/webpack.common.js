'use strict';

// const fs = require('fs');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./index.js');

const webpackConf = {
  mode: config.NODE_ENV,
  entry: {},
  target: 'web',
  output: {
    path: path.join(config.workingPath, config.NODE_ENV === 'production' ? config.production_dist : config.development_dist),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  resolve: {
    modules: [path.join(config.root, 'node_modules'), path.join(config.workingPath, 'node_modules'), 'node_modules'],
    // alias: {
    //   vue$: config.NODE_ENV === 'production' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
    // },
    // extensions: ['.wasm', '.mjs', '.js', '.json', '.vue'],
    symlinks: false
  },
  resolveLoader: {
    modules: [path.join(config.root, 'node_modules'), path.join(config.workingPath, 'node_modules'), 'node_modules']
  },
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      use: [
        config.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          fallback: 'file-loader',
          limit: 8192,
          name: 'img/[name]_[hash:8].[ext]'
        }
      }]
    }, {
      test: /\.(shtml|html)$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  plugins: [
    // css导出成独立文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
  ],
  stats: {
    children: false // 是否显示子任务log
  }
};

// 入口文件
config.pages.forEach((page) => {
  webpackConf.entry[page] = [path.resolve(
    config.workingPath,
    'src',
    page,
    page + '.js'
  )];
});

// 清空输出文件夹
webpackConf.plugins.unshift(
  new CleanWebpackPlugin([path.join(config.workingPath, config.NODE_ENV === 'production' ? config.production_dist : config.development_dist)], {
    root: config.workingPath,
    verbose: true, // 是否在控制台输出信息
    dry: false // 启用删除文件
  })
);
// 复制html
config.pages.forEach((page) => {
  webpackConf.plugins.push(new HtmlWebpackPlugin({
    template: path.join(config.workingPath, 'src', page, page + '.html'),
    filename: `${page}.html`,
    chunks: [page],
    inject: true // js链接插入位置
  }));
});

module.exports = webpackConf;
