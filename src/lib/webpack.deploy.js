'use strict';

// const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const common = require('./webpack.common');
// const config = require('./index.js');

module.exports = merge(common, {
  optimization: {
    minimizer: [new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      parallel: true
    }), new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/i
    })]
  }
});
