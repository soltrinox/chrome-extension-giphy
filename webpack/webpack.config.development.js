const path = require('path');
const ip = require('ip');
const chalk = require('chalk');
const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const {
  CONFIG,
  DIST_PATH,
  SRC_PATH,
  STATIC_PATH,
  DEV_PORT
} = require('./webpack.config.common.js');

module.exports = merge(CONFIG, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    contentBase: DIST_PATH,
    compress: true,
    port: 1234,
    hot: true,
    open: true,
    historyApiFallback: true,
    watchContentBase: true,
    clientLogLevel: 'none',
    publicPath: '/',
    overlay: true,
    stats: 'minimal',
    after: () => {
      console.clear();
      console.log(`${chalk.blue('ℹ ')}${chalk.gray('｢wds｣')}: Access on your network at http://${ip.address()}:${DEV_PORT}`);
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[folder]__[local]--[hash:base64:5]'
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [path.resolve(SRC_PATH)]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(STATIC_PATH, 'index.html'),
      chunksSortMode: 'none'
    })
  ]
});
