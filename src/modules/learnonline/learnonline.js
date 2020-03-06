/*
 * @Author: your name
 * @Date: 2020-01-06 17:32:26
 * @LastEditTime : 2020-01-15 10:47:15
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-webpack\vue-demo\webpack-learn\src\modules\learnonline\learnonline.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { i18n, loadLanguageAsync } from '../../locale/index'

Vue.config.productionTip = false
Vue.prototype.$loadLang = loadLanguageAsync
// console.log(Vue.prototype.$loadLang)
// console.log()
// Vue.prototype.$loadLang.$loadLang('en')
/* eslint-disable no-new */
// loadLanguageAsync('en').then(() => {
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
// })
