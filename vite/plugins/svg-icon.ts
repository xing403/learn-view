import path from 'node:path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 解析目录中自己的 icon svg
export default function createSvgIcon() {
  return createSvgIconsPlugin({
    iconDirs: [
      path.resolve(process.cwd(), 'src/assets/icons/'),
      
    ],
    symbolId: 'icon-[dir]-[name]',
  })
}
