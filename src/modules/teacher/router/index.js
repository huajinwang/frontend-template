import Vue from 'vue'
import Router from 'vue-router'
import beforeEachHooks from './beforeEachHooks'
import RoutesMapConfig from './routes'
import commonRoutesMap from './commonRoutes'
// 注册路由
Vue.use(Router)

const routerInstance = new Router({
  routes: RoutesMapConfig.concat(commonRoutesMap)
})

Object.values(beforeEachHooks).forEach((hook) => {
  routerInstance.beforeEach(hook)
})

export default routerInstance
