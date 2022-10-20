const path = require('path');

//npx webpack --config webpack.config.js

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpackIndex.js',
  },
};