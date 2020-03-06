/*
 * @Author: your name
 * @Date: 2020-01-06 17:44:19
 * @LastEditTime: 2020-01-15 11:31:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-webpack\vue-demo\webpack-learn\src\modules\play\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/modules/play/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ball',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
