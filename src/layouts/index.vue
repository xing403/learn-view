<script lang="ts" setup name="Layout">
import LinkView from './components/views/link.vue'
import Header from './components/Header/index.vue'
import SubSidebar from './components/SubSidebar/index.vue'
import PageMain from "./components/PageMain/index.vue"
import Topbar from './components/Topbar/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useKeepAliveStore from '@/store/modules/keepAlive'

const routeInfo = useRoute()

const settingsStore = useSettingsStore()
const keepAliveStore = useKeepAliveStore()

const isLink = computed(() => !!routeInfo.meta.link)
let key = ref<string>("");
watch(() => routeInfo.path, () => {
  if (settingsStore.mode === 'mobile') {
    settingsStore.$patch((state) => {
      state.settings.menu.subMenuCollapse = true
    })
  }
  key.value = routeInfo.path + new Date().getTime()
})
</script>

<template>
  <div class="layout">
    <div id="app-main">
      <Header />
      <div class="wrapper">
        <div class="sidebar-container" style="width: 0%;"
          :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }">
          <SubSidebar />
        </div>
        <div class="sidebar-mask"
          :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }"
          @click="settingsStore.toggleSidebarCollapse()" />
        <div class="main-container" :style="{ 'padding-bottom': $route.meta.paddingBottom } as any">
          <Topbar
            v-if="!(settingsStore.settings.menu.menuMode === 'head' && !settingsStore.settings.menu.enableSubMenuCollapseButton && !settingsStore.settings.breadcrumb.enable)" />
          <div class="main">
            <router-view v-slot="{ Component, route }" :key="key">
              <transition name="main" mode="out-in" appear>
                <keep-alive :include="keepAliveStore.list">
                  <PageMain>

                    <component :is="Component" v-show="!isLink" :key="key" />
                  </PageMain>
                </keep-alive>
              </transition>
            </router-view>

            <LinkView v-if="isLink" />
          </div>
        </div>
      </div>
      <el-backtop :right="20" :bottom="20" title="回到顶部" />
    </div>

  </div>
</template>

<style lang="less" scoped>
[data-mode="mobile"] {
  .sidebar-container {
    transform: translateX(calc((var(--g-main-sidebar-width) + var(--g-sub-sidebar-width)) * -1));

    &.show {
      transform: translateX(0);
    }
  }

  .main-container {
    margin-left: 0 !important;
  }

  &[data-menu-mode="single"] {
    .sidebar-container {
      transform: translateX(calc(var(--g-sub-sidebar-width) * -1));

      &.show {
        transform: translateX(0);
      }
    }
  }
}

.layout {
  height: 100%;
}

#app-main {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transition: all 0.2s;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: -1px 0 0 0 rgb(0 0 0 / 12%);
  transition: padding-top 0.3s;

  .sidebar-container {
    position: fixed;
    z-index: 1010;
    top: 0;
    bottom: 0;
    display: flex;
    transition: transform 0.3s, top 0.3s;
    width: calc(var(--g-sub-sidebar-actual-width));
  }

  .sidebar-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(transparent 1px, rgb(0 0 0 / 30%) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    transition: all 0.2s;
    opacity: 0;
    visibility: hidden;

    &.show {
      opacity: 1;
      visibility: visible;
    }
  }

  .main-sidebar-container:not(.main-sidebar-leave-active)+.sub-sidebar-container {
    left: var(--g-main-sidebar-width);
  }

  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin-left: calc(var(--g-sub-sidebar-actual-width));
    background-color: var(--g-main-bg);
    transition: margin-left 0.3s, background-color 0.3s;

    .topbar-container {
      top: 0;
      z-index: 998;
    }

    .main {
      height: 100%;
      flex: auto;
      position: relative;
      overflow: hidden;
      transition: 0.3s;
    }

    .topbar-container+.main {
      margin: var(--g-topbar-height) 0 0;
    }
  }
}

header:not(.header-leave-active)+.wrapper {
  padding-top: var(--g-header-height);

  .sidebar-container {
    top: var(--g-header-height);

    :deep(.sidebar-logo) {
      display: none;
    }

    :deep(.el-menu) {
      padding-top: 0;
    }
  }

  .main-container {
    .topbar-container {
      top: var(--g-header-height);

      :deep(.tools) {
        display: none;
      }
    }
  }
}

// 主内容区动画
.main-enter-active {
  transition: 0.2s;
}

.main-leave-active {
  transition: 0.15s;
}

.main-enter-from {
  opacity: 0;
  margin-left: -20px;
}

.main-leave-to {
  opacity: 0;
  margin-left: 20px;
}
</style>
