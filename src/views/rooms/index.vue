<script setup lang='ts'>
import { ref, reactive } from 'vue';
import RoomDetail from "@/components/RoomDetail/index.vue"
import useUserStore from '@/store/modules/user';
import api from '@/api';
const userStore = useUserStore()
const rooms = reactive([]) as any
const detailRoom = ref() as any
let room_detail_view = ref(false);
let loading = ref(false)

onMounted(() => {
    loading.value = true
    api.post("/api/room/", { userAccount: userStore.userAccount }).then((resault) => {
        resault.data.forEach((item:any) => {
            rooms.push(item)
        });
        loading.value = false
    })
})

const viewDetails = (row: any) => {
    room_detail_view.value = true;
    detailRoom.value = row;
}
const removeRoom = (row: any) => {
    console.log(row);
    api.post("/api/room/remove",{roomId:row.roomId}).then((res) => {
        console.log(res);
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
    <el-dialog v-model="room_detail_view" title="自习室详细信息">
        <RoomDetail :room="detailRoom"></RoomDetail>
    </el-dialog>
    </div>
</template>

<style lang='less' scoped>

</style>