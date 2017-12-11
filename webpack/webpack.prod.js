const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'production';
const extractCSS = new ExtractTextPlugin(`[name].[hash].css`);
const extractSASS = new ExtractTextPlugin(`[name]-sass.[hash].css`);

module.exports = webpackMerge(commonConfig({ env: ENV }), {
  // devtool: 'source-map', // Enable source maps. Please note that this will slow down the build
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
        test: /\.tsx?$/,
        use: [{
          loader: 'awesome-typescript-loader',
          options: {
            useCache: false
          }
        }],
        include: [utils.root('./src/main/webapp/app')],
        exclude: ['node_modules']
      },
      {
        test: /\.scss$/,
        use: extractSASS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    // this conflicts with -p option
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      // sourceMap: true, // Enable source maps. Please note that this will slow down the build
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        keep_fnames: true,
        screw_i8: true
      }
    }),
    extractCSS,
    extractSASS,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new WorkboxPlugin({
      // to cache all under target/www
      globDirectory: utils.root('target/www'),
      // find these files and cache them
      globPatterns: ['**/*.{html,bundle.js,css,png,svg,jpg,gif,json}'],
      // create service worker at the target/www
      swDest: path.resolve(utils.root('target/www'), 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
    })
  ]
});
