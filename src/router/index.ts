import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { asyncRoutes, constantRoutes } from './routes'                            // 获取 静态路由 和 动态路由
import useSettingsStore from '@/store/modules/settings'
import useUserStore from "@/store/modules/user";
import useRouteStore from "@/store/modules/route";


//  创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
});

// 路由跳转之前
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const routeStore = useRouteStore()
  const settingsStore = useSettingsStore()

  if (userStore.login_status()) {
    
    if (routeStore.isGenerate) {
      if (to.name === 'login') {
        next({
          name: 'home',
          replace: true,
        })
      } else {
        next()
      }
    } else {
      // 生成动态路由
      await routeStore.generateRoutesAtFront(asyncRoutes)
      // 注册路由
      const removeRoutes: Function[] = []
      routeStore.flatRoutes.forEach((route) => {
        if (!/^(https?:|mailto:|tel:)/.test(route.path)) {
          removeRoutes.push(router.addRoute(route as RouteRecordRaw))
        }
      })
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        routeStore.flatSystemRoutes.forEach((route) => {
          removeRoutes.push(router.addRoute(route as RouteRecordRaw))
        })
      }
      routeStore.setCurrentRemoveRoutes(removeRoutes)
      // 动态路由生成并注册后，重新进入当前路由
      next({
        path: to.path,
        replace: true,
      })
    }
  } else {
    if (to.name !== 'login') {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath !== '/' ? to.fullPath : undefined,
        },
      })
    }
    else {
      next()
    }
  }
})



// 导出路由
export default router;