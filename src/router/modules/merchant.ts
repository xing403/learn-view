import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

const routes: RouteRecordRaw = {
  path: '/merchant',
  component: Layout,
  redirect: '/',
  name: '首页',
  meta: {
    title: '首页',
    icon: 'sidebar-breadcrumb',
  },
  children: [
  ],
}

export default routes
