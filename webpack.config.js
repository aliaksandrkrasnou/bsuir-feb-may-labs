var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/controller.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
};