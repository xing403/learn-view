declare interface Window {
    webkitDevicePixelRatio: any
    mozDevicePixelRatio: any
  }
  
declare module '*.vue' {
    import { type DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  