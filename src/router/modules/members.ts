import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

const routes: RouteRecordRaw = {
  path: "/member",
  name: 'member',
  component: () => import('@/views/member/index.vue'),
  meta: {
    title: '会员管理',
    breadcrumb: true,
    sidebar: true,
    icon: "sidebar-menu",
    auth: ["merchant", "admin"]
  },
  children: [
    {
      path: "/member",
      name: 'member',
      component: () => import('@/views/member/index.vue'),
      meta: {
        title: '会员',
        breadcrumb: true,
        sidebar: true,
      },
    },
    {
      path: "/member/addition",
      name: 'member-addition',
      component: () => import('@/views/member/addition.vue'),
      meta: {
        title: '增加会员',
        breadcrumb: true,
        sidebar: true,
      },
    },
  ]
}

export default routes
