/*
 * @Author: your name
 * @Date: 2020-01-06 17:32:26
 * @LastEditTime: 2020-01-15 11:30:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-webpack\vue-demo\webpack-learn\src\modules\learnonline\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/modules/learnonline/components/HelloWorld'
import Good from '@/modules/learnonline/components/Good'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'Good',
      component: Good
    }
  ]
})
