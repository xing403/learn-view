<script setup lang='ts'>
import dayjs from "dayjs"
import MemberDetail from "@/components/MemberDetail/index.vue"
import useUserStore from '@/store/modules/user';
import api from '@/api';
import router from '@/router';
import url from '@/api/RequestInterface';
const userStore = useUserStore()
const members = reactive([]) as any
const detailMember = ref() as any
let member_detail = ref(false);
onMounted(() => {
    api.post(url.URLPrefix + url.MemberList, { userAccount: userStore.userAccount }).then((resault) => {
        resault.data.forEach((item: any) => {
            members.push(item)
        });
    })
})
const viewDetails = (row: any) => {
    detailMember.value = row
    member_detail.value = true
}
const editMember = (row: any) => {
    router.push({
        path: "/member/edit/" + row.roomId + "/" + row.userAccount
    })
}
</script>

<template>
    <div class="page-main">
        <h2 class="header title">会员列表</h2>
        <el-table :data="members" row-key="endTime">
            <el-table-column label="会员名" sortable prop="userName"></el-table-column>
            <el-table-column label="自习室名称" sortable prop="roomName"></el-table-column>
            <el-table-column label="性别" prop="gender"></el-table-column>
            <el-table-column label="联系电话" prop="userPhone"></el-table-column>
            <el-table-column column-key="endTime" sortable label="到期时间" prop="endTime">
                <template #default="scope">
                    <DateTime :data="scope.row.endTime" :format="'YYYY-MM-DD'"></DateTime>
                </template>
            </el-table-column>
            <el-table-column label="查看详情" width="150px">
                <template #default="scope">
                    <el-button link type="primary" @click="viewDetails(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
            <el-table-column label="编辑" width="100px">
                <template #default="scope">
                    <el-button link type="warning" @click="editMember(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="member_detail" title="会员详细信息">
            <MemberDetail :data="detailMember"></MemberDetail>
        </el-dialog>
    </div>
</template>

<style lang='less' scoped>

</style>