const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');

const { CONFIG, SRC_PATH, STATIC_PATH } = require('./webpack.config.common.js');

module.exports = merge(CONFIG, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
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
                localIdentName: '[emoji]--[hash:base64:5]'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
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
    new CleanWebpackPlugin(),
    new CopyPlugin([
      path.resolve(STATIC_PATH, 'manifest.json'),
      path.resolve(STATIC_PATH, 'icons')
    ]),
    new HtmlWebPackPlugin({
      template: path.resolve(STATIC_PATH, 'index.html'),
      chunksSortMode: 'none',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      },
      prefetch: false
    }),
    new ResourceHintWebpackPlugin()
  ]
});
