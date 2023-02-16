<script setup lang='ts'>
import api from "@/api";
import url from "@/api/RequestInterface";
import { ref, toRef, onMounted, onUpdated } from "vue";
const props = defineProps<{
    room: {
        createTime: string
        isDelete: boolean
        roomAddress: string
        roomDesc: string
        roomId: number
        roomName: string
        roomPhone: string
        roomSeat: number
        updateTime: string
        userAccount: string
    }
}>()
// props 参数不具有响应式,使room具有响应式
const room = toRef(props, 'room');
let num = ref(0);
const getCurrentMemberNum = () => {
    api.post(url.URLPrefix + url.MemberCount, {
        roomId: room.value.roomId,
        userAccount: room.value.userAccount
    }).then((res) => {
        num.value = res.data;
    })
}
onMounted(() => {
    getCurrentMemberNum()
});
onUpdated(() => {
    getCurrentMemberNum()
});
</script>

<template>
    <el-descriptions :border="true" :column="2">
        <el-descriptions-item label="编号">{{ room.roomId }}</el-descriptions-item>
        <el-descriptions-item label="名称">{{ room.roomName }}</el-descriptions-item>
        <el-descriptions-item label="创建者">{{ room.userAccount }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ room.roomPhone }}</el-descriptions-item>
        <el-descriptions-item label="地址">{{ room.roomAddress }}</el-descriptions-item>
        <el-descriptions-item label="座位数">{{ room.roomSeat }}</el-descriptions-item>
        <el-descriptions-item label="状态">
            <el-tag :type="!room.isDelete ? '' : 'danger'">{{ !room.isDelete ? "开放" : "关闭"}}</el-tag>
            <el-divider direction="vertical" />
            <el-tag v-if="room.roomSeat - num > 25">座位充足</el-tag>
            <el-tag v-else-if="room.roomSeat - num > 0" type="warning">较拥挤</el-tag>
            <el-tag v-else type="danger">暂无空闲位置</el-tag>
        </el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <el-descriptions :border="true" :column="2">
        <el-descriptions-item label="总座位数">{{ room.roomSeat }}</el-descriptions-item>
        <el-descriptions-item label="空闲座位">{{ room.roomSeat - num }}</el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <el-descriptions :border="true" :column="2">
        <el-descriptions-item label="创建时间">

            <DateTime :data="room.createTime" :format="'YYYY-MM-DD HH:mm:ss'"></DateTime>
        </el-descriptions-item>
        <el-descriptions-item label="最后修改时间">
            <DateTime :data="room.updateTime" :format="'YYYY-MM-DD HH:mm:ss'"></DateTime>
        </el-descriptions-item>
        <el-descriptions-item label="介绍">{{ room.roomDesc }}</el-descriptions-item>
    </el-descriptions>
</template>

<style lang='less' scoped>

</style>