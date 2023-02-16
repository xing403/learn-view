import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import ElementPlus from "element-plus";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 全局样式
import "element-plus/dist/index.css";// 白天主题
import 'element-plus/theme-chalk/dark/css-vars.css'// element-plus 夜间主题
import 'uno.css'    // unocss 支持原子化css样式
import '@/assets/styles/global.less'        // 全局样式
import 'virtual:svg-icons-register'// 加载 svg 图标
const app = createApp(App);
import { CreateIcons } from '@/iconify'
CreateIcons()


// register components

import SidebarItem from "@/layouts/components/SidebarItem/index.vue";

import DateTime from "@/components/DateTime/index.vue"

app.component('DateTime', DateTime)
app.component('SidebarItem', SidebarItem)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
const store = createPinia()
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
app.use(store)
app.mount('#app')
