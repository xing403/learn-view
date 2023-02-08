import MultilevelMenuExample from './modules/multilevel.menu.example'

import type { Menu } from '#/global'
// 显示的侧边栏
const menu: Menu.recordMainRaw[] = [
  {
    meta: {
      title: '演示',
      icon: 'sidebar-default',
    },
    children: [
      MultilevelMenuExample,
    ],
  },
]

export default menu
