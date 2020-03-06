'use strict'
const path = require('path')
const glob = require('glob')
const entrys = require('../config/entrys')
/* 多应用基础目录路径 */
const appBaseEntryPath = './src/modules/'
let appEntryPaths = entrys.devEntrys
/* 获得批量入口配置 */
module.exports = {
  basePath: appBaseEntryPath,
  appEntryPaths: appEntryPaths,
  getEntry: function (extensions) {
    let ext = extensions || '.js'
    let globPaths = ''
    // globPath: './src/modules/{learnonline, play}/*.js'
    globPaths = appBaseEntryPath + '{' + appEntryPaths.join(',') + '}/*' + ext
    // 格式化
    let globResult
    let entries = {}
    let basename
    let tmp
    // 提取匹配的路径
    globResult = glob.sync(globPaths, {
      cwp: path.resolve(__dirname, '../')
    })
    console.log('--------------------------------------------')
    console.log(globPaths)
    console.log('--------------------------------------------')
    console.log(appEntryPaths)
    console.log('--------------------------------------------')
    console.log(globResult)
    globResult.forEach(function (entry) {
      // basename=learnonline.js
      basename = path.basename(entry, path.extname(entry))
      tmp = entry.split('/').splice(-3)
      /* 正确输出js和html的路径 */
      basename = tmp.splice(0, 1) + '/' + basename
      /* 判断路径上是否包含basename */
      if (path.dirname(entry).toLowerCase().includes(basename.toLowerCase())) {
        entries[basename] = entry
      }
    })
    console.log('--------------------------------------------')
    console.log(entries)
    // entries: {
    //   'learnonline': URL,
    //   'play': URL
    // }
    return entries
  },
  /**
   * 自动判断当前需要使用的入口
   * @param extensions {string} -可选，对应的扩展名,默认：.js
   * @returns {*}
   */
  findEntry: function (extensions) {
    let t = this
    let entrys
    let ext = extensions || '.js'
    entrys = t.getEntry(ext)
    return entrys
  }
}
