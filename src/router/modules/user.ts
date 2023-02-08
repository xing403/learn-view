import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import("@/layouts/index.vue")

const routes: RouteRecordRaw = {
  path: '/',
  component: Layout,
  // redirect: '/user',
  name: '首页',
  meta: {
    title: '首页',
    icon: 'sidebar-breadcrumb',
  },
  children: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue'),
      meta: {
        title: '列表1（平级模式）',
      },
    },
  ],
}

export default routes
