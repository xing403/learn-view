import { defineConfig } from 'vite'
import { resolve } from "path";
import createVitePlugins from './vite/plugins'  // 使用插件
// https://vitejs.dev/config/
export default defineConfig({
  plugins: createVitePlugins(),

  server: {
    open: true,       // 运行是否打开浏览器
    port: 3000,       // 运行端口
    proxy: {          // 代理配置
      '^/api': {       // 遇到请求接口为 /api 开头
        target: 'http://127.0.0.1:8888',  // 更换头
        changeOrigin: true,           // 是否跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 替换路径
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('src'),      // 将 @ 作为 src目录
    },
  },
  css: {
    
  },
})
