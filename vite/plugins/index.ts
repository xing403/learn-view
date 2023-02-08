import type { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'                // 引入vue
import createAutoImport from './auto-import'        // 引入自动导入插件
import createUnocss from './unocss'                 // unocss 原子化css插件
import createLayouts from './layouts'               // 导入layout
import createPages from './pages'                   // 自动加载page，生成路由
import createSvgIcon from './svg-icon'              // 导入icon
import createComponents from './components'       // 导入加载组件

export default function createVitePlugins() {
    const vitePlugins: (PluginOption | PluginOption[])[] = [
        vue({
            reactivityTransform: true,
        }),
    ]
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createUnocss())
    vitePlugins.push(createLayouts())
    vitePlugins.push(createPages())
    vitePlugins.push(createSvgIcon())
    vitePlugins.push(createComponents())

    return vitePlugins
}
