const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    historyApiFallback: {
      index: '/index.html',
    },
  },
  output: {
    filename: '[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
});
