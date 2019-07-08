const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'slides.js',
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/json' },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/index.dev.pug',
    }),
  ]
});
