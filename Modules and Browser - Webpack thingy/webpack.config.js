const path = require('path');

module.exports = {
  mode: 'development', // Set the mode option to 'development' or 'production'
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
