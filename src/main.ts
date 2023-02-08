import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 全局样式
import "element-plus/dist/index.css";// 白天主题
import 'element-plus/theme-chalk/dark/css-vars.css'// element-plus 夜间主题
import 'uno.css'    // unocss
import '@/style.less'
import 'virtual:svg-icons-register'// 加载 svg 图标
const app = createApp(App);
import SvgIcon from '@/components/SvgIcon/index.vue'// svg组件
import SidebarItem from "@/layouts/components/SidebarItem/index.vue"
 
// register globally
app.component('svg-icon', SvgIcon)
app.component('SidebarItem', SidebarItem)
 

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}


const store = createPinia()
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
