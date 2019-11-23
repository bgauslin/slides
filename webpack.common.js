const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    app: './src/js/slides.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'src/root' },
    ]),
    new DotenvWebpack(),
    new VueLoaderPlugin(),
  ],
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file) && !/\.vue\.js/.test(file)
        ),
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              'babel-plugin-transform-es2015-modules-commonjs',
            ],
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // TODO: Debug empty <style> element being written into <head>.
      {
        test: /\.styl$/,
        exclude: /node_modules/, 
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader',
        ]
      },
      {
        test: /\.pug$/,
        oneOf: [
          { // Vue components with <template lang="pug"> tags.
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          { // Standard Pug templates.
            use: [
              'raw-loader',
              'pug-plain-loader',
            ]
          }
        ]
      }
    ]
  }
}