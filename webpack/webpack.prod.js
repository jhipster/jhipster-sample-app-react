const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const path = require('path');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'production';
const extractCSS = new ExtractTextPlugin(`content/[name].[hash].css`);

module.exports = webpackMerge(commonConfig({ env: ENV }), {
  // devtool: 'source-map', // Enable source maps. Please note that this will slow down the build
  mode: 'production',
  entry: {
    main: './src/main/webapp/app/index'
  },
  output: {
    path: utils.root('target/www'),
    filename: 'app/[name].[hash].bundle.js',
    chunkFilename: 'app/[id].[hash].chunk.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.s?css$/,
        loader: 'stripcomment-loader'
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
          publicPath: '../'
        })
      }
    ]
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        // sourceMap: true, // Enable source maps. Please note that this will slow down the build
        uglifyOptions: {
          beautify: false,
          comments: false,
          compress: {
            warnings: false
          },
          mangle: {
            keep_fnames: true
          }
        }
      })
    ]
  },
  plugins: [
    extractCSS,
    new MomentLocalesPlugin({
      localesToKeep: [
        'en'
        // jhipster-needle-i18n-language-moment-webpack - JHipster will add/remove languages in this array
      ]
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    })
  ]
});
