import type { RouteRecordRaw } from 'vue-router'

import additionVue from '@/views/member/addition.vue'
import indexVue from '@/views/member/index.vue'

const routes: RouteRecordRaw = {
  path: "/member",
  name: 'member',
  component: () => import('@/views/member/index.vue'),
  meta: {
    title: '会员管理',
    breadcrumb: true,
    sidebar: true,
    icon: "ep:user",
    auth: ["merchant", "admin"]
  },
  children: [
    {
      path: "/member",
      name: 'member',
      component: indexVue,
      meta: {
        title: '会员',
        breadcrumb: true,
        sidebar: true,
      },
    },
    {
      path: "/member/addition",
      name: 'member-addition',
      component: additionVue,
      meta: {
        title: '增加会员',
        breadcrumb: true,
        sidebar: true,
      },
    },
  ]
}

export default routes
