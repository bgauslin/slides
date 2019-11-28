const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    slides: './src/js/slides.js',
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
      { from: 'src/json' },
    ]),
    new DotenvWebpack(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/index.pug',
    }),
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
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
          'postcss-loader',
          'stylus-loader',
        ],
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