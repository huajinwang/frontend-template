/*
 * @Author: your name
 * @Date: 2019-12-30 11:49:13
 * @LastEditTime: 2020-01-15 11:29:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-webpack\vue-demo\webpack-learn\build\webpack.base.conf.js
 */
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const appEntry = require('./webpack.entrys') // 引入应用的入口
const vueLoaderConfig = require('./vue-loader.conf')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin') 

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: appEntry.findEntry('.js'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@teacher': resolve('src/modules/teacher'),
      '@assets': resolve('src/modules/teacher/assets'),
      '@constants': resolve('src/modules/teacher/constants'),
      '@partials': resolve('src/modules/teacher/partials'),
      '@views': resolve('src/modules/teacher/views'),
      '@pages': resolve('src/modules/teacher/views/pages'),
      '@components': resolve('src/modules/teacher/components'),
      '@router': resolve('src/modules/teacher/router'),
      '@store': resolve('src/modules/teacher/store'),
      '@helper': resolve('src/modules/teacher/helper'),
      '@services': resolve('src/modules/teacher/services'),
      '@mixins': resolve('src/modules/teacher/mixins')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.css$/,
        include: [path.resolve('src')],
        use: [
         // MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      // {
      //   test: /\.svg$/,
      //   enforce: 'pre',
      //   loader: 'svgo-loader?' + JSON.stringify(svgoConfig),
      //   include: /assets\/icons/
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
