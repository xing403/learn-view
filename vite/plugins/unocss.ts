// 引入Unocss
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export default function createUnocss() {
  return Unocss({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()],
  })
}