import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import type { RouteRecordRaw } from 'vue-router'
import type { Route } from '#/global'

import MembersRoute from "./modules/members"
import RoomsRoute from "./modules/rooms"

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
    path: '/reload',
    name: 'reload',
    component: () => import('@/views/reload.vue'),
    meta: {
      title: '重新加载',
      breadcrumb: false,
      sidebar: false
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
// 动态路由（异步路由、导航栏路由）,需要过滤
const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: "index",
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: "付费自习室系统",
      breadcrumb: false,
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/index.vue'),
        meta: {
          title: "首页",
          breadcrumb: false,
          icon: "sidebar-menu",
          sidebar: true
        },
        children: [
          {
            path: '/setting',
            name: 'setting',
            component: () => import('@/views/personal/setting.vue'),
            meta: {
              title: '个人设置',
              breadcrumb: true,
              sidebar: false
            },
          },
        ]
      },
    ],
  },
]
if (asyncRoutes[0].children) {

  asyncRoutes[0].children.push(MembersRoute)
  asyncRoutes[0].children.push(RoomsRoute)
}



const constantRoutesByFilesystem = generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant === true
})

const asyncRoutesByFilesystem = setupLayouts(generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
}))

export {
  constantRoutes,
  asyncRoutes,
  constantRoutesByFilesystem,
  asyncRoutesByFilesystem,
}
