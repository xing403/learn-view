import { defaultsDeep } from 'lodash-es'
import type { RouteMeta } from 'vue-router'
import type { RecursiveRequired, Settings } from '#/global'

const useSettingsStore = defineStore(
  // 唯一ID
  'settings',
  () => {
    const mergeSettings: RecursiveRequired<Settings.all> = defaultsDeep({
      app: {
        enablePermission: true,
        enableDynamicTitle: true,
        colorScheme: 'light',
        elementSize: 'default',
        iconifyOfflineUse: false,
        enableProgress: true,
        routeBaseOn: 'frontend',
      },
      layout: {
        enableMobileAdaptation: true,
      },
      menu: {
        enableSubMenuCollapseButton: true,
        enableHotkeys: true,
        baseOn: 'frontend',
        menuMode: 'side',
        switchMainMenuAndPageJump: true,
        subMenuUniqueOpened: true,
        subMenuCollapse: false,
      },
      topbar: {
        mode: 'fixed',
      },
      toolbar: {
        enableFullscreen: true,
        enablePageReload: true,
        enableColorScheme: true,
        enableAppSetting: true,
      },
      home: {
        enable: true,
        title: '主页',
      },
      breadcrumb: {
        enable: true,
      },
      navSearch: {
        enable: true,
        enableHotkeys: true,
      },
      copyright: {
        enable: false,
        dates: '2020-2023',
        company: 'Fantastic-admin',
        website: '',
        beian: '',
      },
    })
    const settings = ref(mergeSettings)
    watch(() => settings.value.app.colorScheme, (val) => {
      if (val === '') {
        val = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      switch (val) {
        case 'dark':
          document.documentElement.classList.add('dark')
          break
        case 'light':
          document.documentElement.classList.remove('dark')
          break
      }
    }, {
      immediate: true,
    })
    watch(() => settings.value.menu.menuMode, (val) => {
      document.body.setAttribute('data-menu-mode', val)
    }, {
      immediate: true,
    })

    // 页面标题
    const title = ref<RouteMeta['title']>()
    // 设置网页标题
    function setTitle(_title: RouteMeta['title']) {
      title.value = _title
    }

    // 显示模式
    const mode = ref<'pc' | 'mobile'>('pc')
    // 设置访问模式
    function setMode(width: number) {
      if (settings.value.layout.enableMobileAdaptation) {
        // 先判断 UA 是否为移动端设备（手机&平板）
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          mode.value = 'mobile'
        }
        else {
          // 如果为桌面设备，再根据页面宽度判断是否需要切换为移动端展示
          mode.value = width < 992 ? 'mobile' : 'pc'
        }
      }
      else {
        mode.value = 'pc'
      }
    }

    // 侧边栏是否收起（用于记录 pc 模式下最后的状态）
    const subMenuCollapseLastStatus = ref(mergeSettings.menu.subMenuCollapse)
    // 切换侧边栏导航展开/收起
    function toggleSidebarCollapse() {
      settings.value.menu.subMenuCollapse = !settings.value.menu.subMenuCollapse
      if (mode.value === 'pc') {
        subMenuCollapseLastStatus.value = !subMenuCollapseLastStatus.value
      }
    }

    watch(mode, (val) => {
      switch (val) {
        case 'pc':
          settings.value.menu.subMenuCollapse = subMenuCollapseLastStatus.value
          break
        case 'mobile':
          settings.value.menu.subMenuCollapse = true
          break
      }
      document.body.setAttribute('data-mode', val)
    }, {
      immediate: true,
    })

    // 设置主题颜色模式
    function setColorScheme(color: Required<Settings.app>['colorScheme']) {
      settings.value.app.colorScheme = color
    }

    return {
      settings,
      title,
      setTitle,
      mode,
      setMode,
      subMenuCollapseLastStatus,
      toggleSidebarCollapse,
      setColorScheme,
    }
  },
)

export default useSettingsStore
