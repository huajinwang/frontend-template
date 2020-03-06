'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder') // 寻找端口8080~65535 找不到就抛错
const appEntry = require('./webpack.entrys') // 引入应用的入口

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

let htmlWebpackPlugins = []
let htmlWebpackPluginObject = appEntry.findEntry('.html')
for (let module in htmlWebpackPluginObject) {
  htmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      template: htmlWebpackPluginObject[module],
      filename: `${module}.html`,
      chunks: [module],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    })
  )
}
console.log('htmlWebpackPlugins--------------------------------------------')
console.log(htmlWebpackPlugins)
console.log('htmlWebpackPlugins--------------------------------------------')
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 处理样式css的规则
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    // definePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和生产模式的构建允许不同的行为非常有用。
    // 如果在开发构建中，而不在发布构建中执行日志记录，则可以使用全局常量来决定是否记录日志。这就是 DefinePlugin 的用处，
    // 设置它，就可以忘记开发环境和生产环境构建的规则。
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // copy custom static assets
    // 将单个文件或整个目录复制到构建目录。
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ].concat(htmlWebpackPlugins)
})

// let openPageUrl = 'vp/modules/learnonline.html'
// devWebpackConfig.devServer.openPage = openPageUrl
/* 默认打开第一被匹配到的应用入口 */
if (appEntry.appEntryPaths.length >= 1) {
  let templatePagesPath = Object.values(htmlWebpackPluginObject)[0]
  let openPageUrl = 'vp/modules/' + path.basename(templatePagesPath)
  devWebpackConfig.devServer.openPage = openPageUrl
}
console.log('devWebpackConfig.devServer.openPage--------------------------------------------')
console.log(devWebpackConfig.devServer.openPage)
console.log('devWebpackConfig.devServer.openPage--------------------------------------------')
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      let host = devWebpackConfig.devServer.host
      // add port to devServer config
      let successMessages = [`Your application is running here: http://${host}:${port}`]
      successMessages.push('The page entry you might want to visit:')
      Object.values(htmlWebpackPluginObject).forEach(function (pagesPath) {
        let pagesName = path.basename(pagesPath)
        let url = `http://${host}:${port}/vp/modules/${pagesName}`
        successMessages.push(url)
      })

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: successMessages
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
