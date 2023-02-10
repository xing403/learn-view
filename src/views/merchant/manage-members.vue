<script setup lang='ts'>
import { ref, reactive } from 'vue';

import MemberDetail from "@/components/MemberDetail/index.vue"
const members = reactive([])
const detailMember = ref({})
let member_detail = ref(false);
const viewDetails = (row: any) => {
    detailMember.value = row
}
</script>

<template>
    <h2 class="header title">会员列表</h2>
    <el-table :data="members" row-key="endTime">
        <el-table-column label="用户名" sortable prop="userName"></el-table-column>
        <el-table-column label="自习室" sortable prop="roomName"></el-table-column>
        <el-table-column label="性别" prop="gender"></el-table-column>
        <el-table-column label="联系电话" prop="userPhone"></el-table-column>
        <el-table-column column-key="endTime" sortable label="到期时间" prop="endTime"></el-table-column>
        <el-table-column label="查看详情">
            <template #default="scope">
                <el-button link type="primary" @click="viewDetails(scope.row)">查看详情</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="member_detail" title="会员详细信息">
        <MemberDetail :data="detailMember"></MemberDetail>
    </el-dialog>
</template>

<style lang='less' scoped>

</style>