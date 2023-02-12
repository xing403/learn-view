<route lang="yaml">
    name: home
    meta:
      title: 主页
</route>
    
<script setup lang='ts'>
import api from '@/api';
import useUserStore from '@/store/modules/user';
const userStore = useUserStore()
const permission = ref(userStore.permissions);

if (permission == "merchant") {
    api.post("/api/statistics/detail", { uuserAccount: userStore.userAccount }).then((resault) => {
        console.log(resault.data)
    })
}




</script>

<template>
    <div :class="permission" class="page-main">
        <template v-if="permission == 'merchant'">
            商家
        </template>
        <template v-else-if="permission == 'user'">用户</template>
        <template v-else>管理员</template>
    </div>
</template>

<style lang='less' scoped>

</style>