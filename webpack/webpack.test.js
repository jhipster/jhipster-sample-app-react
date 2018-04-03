const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const utils = require('./utils.js');

const ENV = 'development';

module.exports = {
  mode: 'development',
  entry: ['./src/test/javascript/spec/entry'],
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'source-map-loader'
      },
      {
        test: /src[/|\\]main[/|\\]webapp[/|\\].+\.tsx?$/,
        enforce: 'post',
        exclude: /node_modules/,
        loader: 'sourcemap-istanbul-instrumenter-loader?force-sourcemap=true'
      },
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'ts-loader',
            options: {
              ignoreDiagnostics: [2307] // due to a weird false error from json files
            }
          }
        ],
        include: [path.resolve('./src/main/webapp/app'), path.resolve('./src/test/javascript')],
        exclude: ['node_modules']
      }
    ]
  },
  cache: true,
  resolve: {
    extensions: [
      '.js', '.jsx', '.ts', '.tsx', '.json'
    ],
    modules: ['node_modules'],
    alias: {
      app: utils.root('src/main/webapp/app/')
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)x?($|\?)/i // process .js and .ts files only
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${ENV}'`
      }
    })
  ],
  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
