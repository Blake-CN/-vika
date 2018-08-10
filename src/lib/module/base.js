'use strict';

const path = require('path');
const config = require('../index.js');

module.exports = {
  mode: config.NODE_ENV,
  devTool: config.NODE_ENV !== 'production' ? 'eval-source-map' : 'none',
  target: 'web',
  context: config.root,
  externals: config.externals,
  resolve: {
    modules: [path.resolve(config.root, 'node_modules'), path.resolve(config.working_path, 'node_modules'), 'node_modules'],
    alias: {
      vue$: config.NODE_ENV === 'production' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
    },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.vue'],
  },
  stats: {
    children: false,
  }
};
