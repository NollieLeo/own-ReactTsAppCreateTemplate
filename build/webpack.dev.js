/* eslint-disable import/no-extraneous-dependencies */

const { merge: mergeWebpackConfig } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const getStyleLoader = require('./utils/getStylesLoader');
const baseConfig = require('./webpack.base');

const rootDir = process.cwd();

module.exports = mergeWebpackConfig(baseConfig, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js', // 开发没必要用hash，直接name就OK，hash是为了缓存的，prod才有效果
  },
  module: {
    rules: [
      ...getStyleLoader('development'),
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({}), // 热模块替换
    new ReactRefreshWebpackPlugin(), // React的组件热更新
  ],
  cache: {
    type: 'memory', // dev环境开启memory类型缓存
  },
  // watch: true,
  watchOptions: {
    ignored: /node_modules/,
    // 节流操作
    aggregateTimeout: 300,
    // 默认每秒询问1000次
    poll: 1000,
  },
  devServer: {
    contentBase: path.join(rootDir, 'dist'),
    compress: true, // 开启Gzip压缩
    port: 9099,
    hot: true,
    open: true,
    stats: 'errors-only', // 终端仅仅打印error
    // noInfo: true,
    // overlay: false,
    overlay: {
      error: true,
    },
    // host: '0.0.0.0',
    // contentBase: path.join(rootDir, 'public'),
  },
  devtool: 'eval-cheap-module-source-map', // 本地开发用这个cheap
});
