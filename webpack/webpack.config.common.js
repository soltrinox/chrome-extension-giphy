const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const SRC_PATH = path.resolve(__dirname, '../src');
const DIST_PATH = path.resolve(__dirname, '../dist');
const STATIC_PATH = path.resolve(SRC_PATH, 'static');
const DEV_PORT = 1234;

const CONFIG = {
  entry: [path.resolve(SRC_PATH, 'index.tsx')],
  output: {
    path: DIST_PATH,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendor'
        },
        default: {
          minSize: 500,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        styles: {
          name: 'styles',
          test: /\.scss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader', 'eslint-loader']
      },
      {
        test: /\.(ttf|png|jpg)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: ['svg-react-loader']
      }
    ]
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules', SRC_PATH]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new Dotenv()
  ]
};

module.exports = {
  CONFIG,
  SRC_PATH,
  DIST_PATH,
  STATIC_PATH,
  DEV_PORT
};
