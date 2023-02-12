/// <reference types="vite/client" />

/// <reference types="vite-plugin-pages/client" />


declare interface Window {
  webkitDevicePixelRatio: any
  mozDevicePixelRatio: any
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module "element-plus/dist/locale/zh-cn.mjs"