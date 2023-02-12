<script setup lang='ts'>
import { ref, reactive } from 'vue';
import MemberDetail from "@/components/MemberDetail/index.vue"
import useUserStore from '@/store/modules/user';
import api from '@/api';
const userStore = useUserStore()
const members = reactive([]) as any
const detailMember = ref() as any
let member_detail = ref(false);
onMounted(() => {
    api.post("/api/merchant/", { userAccount: userStore.userAccount }).then((resault) => {
        resault.data.forEach((item:any) => {
            members.push(item)
        });
    })
})


const viewDetails = (row: any) => {
    detailMember.value = row
    member_detail.value= true
}
</script>

<template>
    <div class="page-main">
        <h2 class="header title">会员列表</h2>
        <el-table :data="members" row-key="endTime">
            <el-table-column label="用户名" sortable prop="userName"></el-table-column>
            <el-table-column label="自习室名称" sortable prop="roomName"></el-table-column>
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
    </div>
</template>

<style lang='less' scoped>

</style>