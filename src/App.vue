<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import hotkeys from 'hotkeys-js'
import eventBus from './utils/eventBus'
import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()


// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
  let actualWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width'))
  if (['head', 'single'].includes(settingsStore.settings.menu.menuMode)) {
    actualWidth = 0
  }
  return `${actualWidth}px`
})

// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
  let actualWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width'))

  if (settingsStore.settings.menu.subMenuCollapse) {
    actualWidth = 64
  }
  return `${actualWidth}px`
})

watch([
  () => settingsStore.title,
], () => {

  if (settingsStore.title) {
    const title = typeof settingsStore.title === 'function' ? settingsStore.title() : settingsStore.title
    document.title = `${title} - 付费自习室系统`
  } else {
    document.title = "付费自习室系统"
  }
})

onMounted(() => {
  settingsStore.setMode(document.documentElement.clientWidth)
  window.onresize = () => {
    settingsStore.setMode(document.documentElement.clientWidth)
  }
  hotkeys('alt+i', () => {
    eventBus.emit('global-system-info-toggle')
  })
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <RouterView :style="{
      '--g-main-sidebar-actual-width': mainSidebarActualWidth,
      '--g-sub-sidebar-actual-width': subSidebarActualWidth,
    }" />
  </el-config-provider>
</template>

<style lang="less">

</style>
