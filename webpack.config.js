const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const configObj = {splitChunks: {chunks: 'all'}};

  if (isProd) {
    configObj.minimizer = [
      new optimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [
            ['gifsicle', {interlaced: true}],
            ['jpegtran', {progressive: true}],
            ['optipng', {optimizationLevel: 5}],
            ['svgo', {plugins: [{removeViewBox: false}]}],
          ],
        },
      }),
    ];
  }
  return configObj;
};

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {main: './app.js'},
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  resolve: {
    extensions: ['.html', '.css', '.less', '.js', '.json', '.png', '.jpg'],
    alias: {
      '@core': path.resolve(__dirname, 'src/core'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  devtool: isProd ? false : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'), minify: {
        collapseWhitespace: isProd, removeComments: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({filename: filename('css')}),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/assets'),
        to: path.resolve(__dirname, 'dist'),
      }],
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {test: /\.html$/, loader: 'html-loader'},
      {
        test: /\.(less|css)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: `./img/${filename('[ext]')}`,
          },
        }, {
          loader: ImageMinimizerPlugin.loader,
          options: {
            severityError: 'warning',
            minimizerOptions: {
              plugins: ['gifsicle'],
            },
          },
        }],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/, use: [{
          loader: 'file-loader',
          options: {
            name: `./fonts/${filename('[ext]')}`,
          },
        }],
      },
      {test: /\.xml$/, use: ['xml-loader']},
      {test: /\.csv$/, use: ['csv-loader']},
      {
        test: /\.js$/, exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};
