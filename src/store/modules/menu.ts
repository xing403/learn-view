import { cloneDeep } from 'lodash-es'
import useSettingsStore from './settings'
import useUserStore from './user'
import useRouteStore from './route'
import type { Menu } from '#/global'

import { resolveRoutePath } from '@/utils'

const useMenuStore = defineStore(
    // 唯一ID
    'menu',
    () => {
        const settingsStore = useSettingsStore()
        const userStore = useUserStore()
        const routeStore = useRouteStore()

        const menus = ref<Menu.recordMainRaw[]>([{
            meta: {},
            children: [],
        }])
        const actived = ref(0)

        // 完整导航数据
        const allMenus = computed(() => {
            let returnMenus: Menu.recordMainRaw[] = [{
                meta: {},
                children: [],
            }]
            // 从路由中获取
            returnMenus = routeStore.routes as Menu.recordMainRaw[]
            return returnMenus
        })
        // 次导航数据
        const sidebarMenus = computed<Menu.recordMainRaw['children']>(() => {
            let res: Menu.recordRaw[] = []
            if(allMenus.value.length > 0){
                allMenus.value.forEach(item=>{
                    res = filterAsyncMenus(item.children,userStore.getPermissions())
                })
            }
            return res;
        })
        // 次导航第一层最深路径
        const sidebarMenusFirstDeepestPath = computed(() => {
            return allMenus.value.length > 0
                ? getDeepestPath(sidebarMenus.value[0])
                : '/'
        })
        function getDeepestPath(menu: Menu.recordRaw, rootPath = '') {
            let retnPath = ''
            if (menu.children) {
                const item = menu.children.find(item => item.meta?.sidebar !== false)
                if (item) {
                    retnPath = getDeepestPath(item, resolveRoutePath(rootPath, menu.path))
                }
                else {
                    retnPath = getDeepestPath(menu.children[0], resolveRoutePath(rootPath, menu.path))
                }
            }
            else {
                retnPath = resolveRoutePath(rootPath, menu.path)
            }
            return retnPath
        }
        // 默认展开的导航路径
        const defaultOpenedPaths = computed(() => {
            let defaultOpenedPaths: string[] = []
            if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
                defaultOpenedPaths = getDefaultOpenedPaths(sidebarMenus.value)
            }
            return defaultOpenedPaths
        })
        function getDefaultOpenedPaths(menus: Menu.recordRaw[], rootPath = '') {
            const defaultOpenedPaths: string[] = []
            menus.forEach((item) => {
                if (item.meta?.defaultOpened && item.children) {
                    defaultOpenedPaths.push(resolveRoutePath(rootPath, item.path))
                    const childrenDefaultOpenedPaths = getDefaultOpenedPaths(item.children, resolveRoutePath(rootPath, item.path))
                    if (childrenDefaultOpenedPaths.length > 0) {
                        defaultOpenedPaths.push(...childrenDefaultOpenedPaths)
                    }
                }
            })
            return defaultOpenedPaths
        }

        // 判断是否有权限
        function hasPermission(permissions: string, menu: Menu.recordMainRaw | Menu.recordRaw) {
            let isAuth = false
            if (menu.meta && menu.meta.auth) {
                isAuth = typeof menu.meta?.auth === 'string'
                    ? menu.meta.auth === permissions
                    : typeof menu.meta?.auth === 'object'
                        ? menu.meta.auth.includes(permissions)
                        : false
            }
            else {
                isAuth = true
            }
            return isAuth
        }
        // 根据权限过滤导航
        function filterAsyncMenus<T extends Menu.recordMainRaw[] | Menu.recordRaw[]>(menus: T, permissions: string): T {
            const res: any = []
            menus.forEach((menu) => {
                const tmpMenu = cloneDeep(menu)
                if (hasPermission(permissions, tmpMenu)) {
                    if (tmpMenu.children) {
                        tmpMenu.children = filterAsyncMenus(tmpMenu.children, permissions) as Menu.recordRaw[]
                        tmpMenu.children.length && res.push(tmpMenu)
                    }
                    else {
                        res.push(tmpMenu)
                    }
                }
            })
            return res
        }
        // 生成导航（前端生成）
        async function generateMenusAtFront() {
            const permissions = await userStore.getPermissions()
            const routeMenu = routeStore.routes as Menu.recordMainRaw[]

            let accessedMenus = filterAsyncMenus(routeMenu, permissions)
            menus.value = accessedMenus.filter(item => item.children.length !== 0)
        }
        // 切换主导航
        function setActived(data: number | string) {
            if (typeof data === 'number') {
                // 如果是 number 类型，则认为是主导航的索引
                actived.value = data
            }
            else {
                // 如果是 string 类型，则认为是路由，需要查找对应的主导航索引
                const findIndex = allMenus.value.findIndex(item => item.children.some(r => data.indexOf(`${r.path}/`) === 0 || data === r.path))
                if (findIndex >= 0) {
                    actived.value = findIndex
                }
            }
        }


        return {
            menus,
            actived,
            allMenus,
            sidebarMenus,
            sidebarMenusFirstDeepestPath,
            defaultOpenedPaths,
            generateMenusAtFront,
            setActived,
        }
    },
)

export default useMenuStore
