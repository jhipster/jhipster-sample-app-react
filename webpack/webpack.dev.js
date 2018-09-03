const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';

module.exports = (options) => webpackMerge(commonConfig({ env: ENV }), {
  devtool: 'cheap-module-source-map', // https://reactjs.org/docs/cross-origin-errors.html
  mode: ENV,
  entry: [
    'react-hot-loader/patch',
    './src/main/webapp/app/index'
  ],
  output: {
    path: utils.root('target/www'),
    filename: 'app/[name].bundle.js',
    chunkFilename: 'app/[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    stats: options.stats,
    hot: true,
    contentBase: './target/www',
    proxy: [{
      context: [
        /* jhipster-needle-add-entity-to-webpack - JHipster will add entity api paths here */
        '/api',
        '/management',
        '/swagger-resources',
        '/v2/api-docs',
        '/h2-console',
        '/auth'
      ],
      target: 'http://127.0.0.1:8080',
      secure: false,
      headers: { host: 'localhost:9000' }
    }],
    watchOptions: {
      ignored: /node_modules/
    }
  },
  plugins: [
    new SimpleProgressWebpackPlugin({
      format: options.stats === 'minimal' ? 'compact' : 'expanded'
    }),
    new FriendlyErrorsWebpackPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 9000,
      proxy: {
        target: 'http://localhost:9060'
      }
    }, {
      reload: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new writeFilePlugin(),
    new webpack.WatchIgnorePlugin([
      utils.root('src/test'),
    ]),
    new WebpackNotifierPlugin({
      title: 'JHipster',
      contentImage: path.join(__dirname, 'logo-jhipster.png')
    })
  ]
});
