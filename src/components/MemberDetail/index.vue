<script setup lang='ts' name="memeberDetail">

const props = defineProps<{
    data: {
        roomId: number,
        roomName: string
        userName: string
        userAccount: string,
        userAvatar: string,
        userPhone: string
        gender: string
        beginTime: string
        endTime: string
    }
}>();
const data = toRef(props, "data")
console.log(data)
</script>

<template>
    <el-descriptions :border="true" :column="2">
        <el-descriptions-item label="用户名">{{ data.userName }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ data.gender }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ data.userPhone }}</el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <el-descriptions :border="true" :column="2">
        <el-descriptions-item label="自习室名称" :span="2">{{ data.roomName }}</el-descriptions-item>
        <el-descriptions-item label="开始时间">
            <el-date-picker v-model="data.beginTime" disabled></el-date-picker>
        </el-descriptions-item>
        <el-descriptions-item label="结束时间">
            <el-date-picker v-model="data.endTime" disabled></el-date-picker>
        </el-descriptions-item>
    </el-descriptions>
</template>

<style lang='less' scoped>

</style>
