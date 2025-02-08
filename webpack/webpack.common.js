const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { hashElement } = require('folder-hash');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const utils = require('./utils.js');
const environment = require('./environment');

const getTsLoaderRule = () => {
  return [
    {
      loader: 'thread-loader',
      options: {
        // There should be 1 cpu for the fork-ts-checker-webpack-plugin.
        // The value may need to be adjusted (e.g. to 1) in some CI environments,
        // as cpus() may report more cores than what are available to the build.
        workers: require('os').cpus().length - 1,
      },
    },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        happyPackMode: true,
      },
    },
  ];
};

module.exports = async options => {
  const development = options.env === 'development';
  const languagesHash = await hashElement(path.resolve(__dirname, '../src/main/webapp/i18n'), {
    algo: 'md5',
    encoding: 'hex',
    files: { include: ['*.json'] },
  });

  return merge(
    {
      cache: {
        // 1. Set cache type to filesystem
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '../target/webpack'),
        buildDependencies: {
          // 2. Add your config as buildDependency to get cache invalidation on config change
          config: [
            __filename,
            path.resolve(__dirname, `webpack.${development ? 'dev' : 'prod'}.js`),
            path.resolve(__dirname, 'environment.js'),
            path.resolve(__dirname, 'utils.js'),
            path.resolve(__dirname, '../postcss.config.js'),
            path.resolve(__dirname, '../tsconfig.json'),
          ],
        },
      },
      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        modules: ['node_modules'],
        alias: utils.mapTypescriptAliasToWebpackAlias(),
        fallback: {
          path: require.resolve('path-browserify'),
        },
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: getTsLoaderRule(options.env),
            include: [utils.root('./src/main/webapp/app')],
            exclude: [utils.root('node_modules')],
          },
          /*
       ,
       Disabled due to https://github.com/jhipster/generator-jhipster/issues/16116
       Can be enabled with @reduxjs/toolkit@>1.6.1
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'source-map-loader'
      }
      */
        ],
      },
      stats: {
        children: false,
      },
      plugins: [
        new webpack.EnvironmentPlugin({
          // react-jhipster requires LOG_LEVEL config.
          LOG_LEVEL: development ? 'info' : 'error',
        }),
        new webpack.DefinePlugin({
          I18N_HASH: JSON.stringify(languagesHash.hash),
          DEVELOPMENT: JSON.stringify(development),
          VERSION: JSON.stringify(environment.VERSION),
          SERVER_API_URL: JSON.stringify(environment.SERVER_API_URL),
        }),
        new ESLintPlugin({
          configType: 'flat',
          extensions: ['ts', 'tsx'],
        }),
        new ForkTsCheckerWebpackPlugin(),
        new CopyWebpackPlugin({
          patterns: [
            {
              // https://github.com/swagger-api/swagger-ui/blob/v4.6.1/swagger-ui-dist-package/README.md
              context: require('swagger-ui-dist').getAbsoluteFSPath(),
              from: '*.{js,css,html,png}',
              to: 'swagger-ui/',
              globOptions: { ignore: ['**/index.html'] },
            },
            {
              from: path.join(path.dirname(require.resolve('axios/package.json')), 'dist/axios.min.js'),
              to: 'swagger-ui/',
            },
            { from: './src/main/webapp/swagger-ui/', to: 'swagger-ui/' },
            { from: './src/main/webapp/content/', to: 'content/' },
            { from: './src/main/webapp/favicon.ico', to: 'favicon.ico' },
            { from: './src/main/webapp/manifest.webapp', to: 'manifest.webapp' },
            // jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
            { from: './src/main/webapp/robots.txt', to: 'robots.txt' },
          ],
        }),
        new HtmlWebpackPlugin({
          template: './src/main/webapp/index.html',
          chunksSortMode: 'auto',
          inject: 'body',
          base: '/',
        }),
        new MergeJsonWebpackPlugin({
          output: {
            groupBy: [
              { pattern: './src/main/webapp/i18n/en/*.json', fileName: './i18n/en.json' },
              // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
            ],
          },
        }),
      ],
    },
    // jhipster-needle-add-webpack-config - JHipster will add custom config
  );
};
