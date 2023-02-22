import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import("@/layouts/index.vue")

const routes: RouteRecordRaw = {
  path: "/rooms",
  name: 'rooms',
  component: () => import('@/views/rooms/index.vue'),
  meta: {
    title: '自习室管理',
    breadcrumb: true,
    sidebar: true,
    icon: 'ic:baseline-chair',
    auth: ["merchant", "admin"]
  },
  children: [
    {
      path: "/rooms",
      name: 'rooms',
      component: () => import('@/views/rooms/index.vue'),
      meta: {
        title: '自习室',
        breadcrumb: true,
        sidebar: true,
      },
    },
    {
      path: "/rooms/addition",
      name: 'rooms-addition',
      component: () => import('@/views/rooms/addition.vue'),
      meta: {
        title: '添加自习室',
        breadcrumb: true,
        sidebar: true,
      },
    },
    {
      path: "/rooms/edit/:roomId",
      name: 'rooms-edit',
      component: () => import('@/views/rooms/edit.vue'),
      meta: {
        title: '编辑自习室',
        breadcrumb: true,
        sidebar: false,
      },
    },{
      path: "/rooms/detail/:roomId",
      name: 'rooms-detail',
      component: () => import('@/views/rooms/detail.vue'),
      meta: {
        title: '自习室详细信息',
        breadcrumb: true,
        sidebar: false,
      },
    },
  ]
}
export default routes
