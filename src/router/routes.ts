import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import type { RouteRecordRaw } from 'vue-router'
import userRoutes from './modules/user'
import merchantRoutes from './modules/merchant'
import type { Route } from '#/global'

// 固定路由（默认路由）
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register.vue"),
    meta: {
      title: '注册',
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
]
// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name:"首页",
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: "付费自习室系统",
      breadcrumb: false,
      icon:"sidebar-menu"
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/index.vue'),
        meta: {
          title: "付费自习室系统",
          breadcrumb: false,
        },
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: '重新加载',
          breadcrumb: false,
        },
      },
    ],
  },
]

// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  {
    meta: {
      title: '演示',
      icon: 'sidebar-default',
    },
    children: [
      // userRoutes,
      systemRoutes
      // merchantRoutes,
    ],
  },
]

const constantRoutesByFilesystem = generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant === true
})

const asyncRoutesByFilesystem = setupLayouts(generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
}))

export {
  constantRoutes,
  systemRoutes,
  asyncRoutes,
  constantRoutesByFilesystem,
  asyncRoutesByFilesystem,
}
