<route lang="yaml">
    name: home
    meta:
      title: 主页
</route>
    
<script setup lang='ts'>
import useUserStore from '@/store/modules/user';

const userStore = useUserStore()
const permission = ref(userStore.permissions);

</script>

<template>
    <div>
        <!-- 无法显示 -->
        <div :class="permission.value" v-if="permission.value == 'merchant'">
            商家
        </div>
        <div>
            用户
        </div>
    </div>
</template>

<style lang='less' scoped>

</style>