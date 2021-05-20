const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),

  devtool: 'source-map',

  entry: {
    app: './index.js',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/bsuir-feb-may-labs/',
    sourceMapFilename: '[name].map',
  },

  resolve: {
    extensions: ['.js'], // extensions that are used
    modules: [path.join(__dirname, 'src'), 'node_modules'], // directories where to look for modules
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: __dirname }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/public/index.html`,
    }),
    new MiniCssExtractPlugin(),
  ],
};
