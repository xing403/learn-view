<script setup lang='ts'>
import { ref, reactive } from 'vue';
import useUserStore from '@/store/modules/user';
import api from '@/api';
import url from '@/api/RequestInterface';
import router from '@/router';
const userStore = useUserStore()
const rooms = reactive([]) as any
let loading = ref(false)
onMounted(() => {
    loading.value = true
    api.post(url.URLPrefix + url.RoomList, { userAccount: userStore.userAccount }).then((resault) => {
        resault.data.forEach((item: any) => {
            rooms.push(item)
        });
        loading.value = false
    })
})

const viewDetails = (row: any) => {
    router.push({
        path:"/rooms/detail/" + row.roomId
    })
}
const removeRoom = (row: any) => {
    console.log(row);
    api.post("/api/room/remove", { roomId: row.roomId }).then((res) => {
        console.log(res);
    })
}
const editRoom = (row: any) => {
    router.push({
        path: "/rooms/edit/" + row.roomId,
    })
}
</script>

<template>
    <div class="page-main">
        <h2 class="header title">自习室列表</h2>
        <el-table :data="rooms" :loading="loading">
            <el-table-column prop="roomName" label="自习室名称" width="180" />
            <el-table-column prop="roomPhone" label="自习室联系电话" width="180" />
            <el-table-column prop="roomAddress" label="自习室地址" width="180" />
            <el-table-column prop="roomDesc" label="自习室介绍" />
            <el-table-column label="查看详情" width="150">
                <template #default="scope">
                    <el-button link type="primary" @click="viewDetails(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
            <el-table-column label="编辑" width="100">
                <template #default="scope">
                    <el-button link type="warning" @click="editRoom(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
            <el-table-column label="删除" width="100">
                <template #default="scope">
                    <el-popconfirm title="确定要删除吗?" :confirm-button-text="'确定'" :cancel-button-text="'取消'"
                        @confirm="removeRoom(scope.row)">
                        <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style lang='less' scoped></style>