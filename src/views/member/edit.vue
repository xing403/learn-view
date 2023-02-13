<script setup lang='ts'>
import useUserStore from "@/store/modules/user";
import { FormInstance, dayjs } from "element-plus";
import api from "@/api";
import url from "@/api/RequestInterface"
import router from "@/router";


const params = router.currentRoute.value.params;

const userStore = useUserStore()
const member = reactive({
    memberId:"",
    userAccount: params.userAccount as string,
    userName: "",
    beginTime: "",
    dateRange: [new Date(), new Date()],
    endTime: "",
    roomId: params.roomId as string,
    roomName: "",
})
const rooms: any = reactive([]);

const validUserAccount = (rule: any, value: string, callback: Function) => {
    if (member.userName == "" && member.userAccount != "") {
        api.post(url.URLPrefix + url.UserInformation, { "userAccount": value }).then((res) => {
            member.userName = res.data.userName;
        }).catch((err) => {
            member.userName = ""
            member.userAccount = ""
            return callback(new Error(member.userAccount + " " + err.message));
        })
        return callback();
    } else if (member.userAccount == "") {
        member.userName = ""
        return callback(new Error('请输入用户账号'));
    } else {
        return callback();
    }
}
const rules = reactive({
    userAccount: [{ required: true, validator: validUserAccount, trigger: 'blur' }],
    roomId: [{ required: true, message: "选择自习室", trigger: 'blur' }],
    dateRange: [{ required: true, message: "选择时间", trigger: 'blur' }]
})

const formRef = ref<FormInstance>();
let select_loading = ref(false);
let loading = ref(false)

function editMember() {
    loading.value = true
    formRef.value && formRef.value.validate((valid) => {
        if (valid) {
            member.beginTime = dayjs(member.dateRange[0]).format("YYYY-MM-DD HH:mm:ss")
            member.endTime = dayjs(member.dateRange[1]).format("YYYY-MM-DD HH:mm:ss")

            api.post(url.URLPrefix + url.MemberEdit, member).then(() => {
                member.userAccount = ""
                member.userName = ""
                member.beginTime = ""
                member.endTime = ""
                loading.value = false
            }).catch(() => loading.value = false)
        } else {
            loading.value = false
        }
    }).catch(() => loading.value = false)
}

onMounted(() => {
    // 获取当前会员的信息
    api.post(url.URLPrefix + url.MemberInformation, {
        userAccount: member.userAccount,// 会员账号
        roomId: member.roomId
    }).then((resault) => {
        member.memberId = resault.data.memberId
        member.beginTime = resault.data.beginTime
        member.endTime = resault.data.endTime
        member.dateRange = [new Date(member.beginTime),
                            new Date(member.endTime)
                            ]
    })
    // 获取自习室信息
    api.post(url.URLPrefix + url.RoomInformation, {
        roomId: member.roomId,
        userAccount: userStore.userAccount //自习室开设者 
    }).then(res => {
        member.roomName = res.data.roomName
    })
})
</script>

<template>
    <div class="page-main">
        <h2 class="header title">编辑会员</h2>
        <el-row :gutter="20">
            <el-col :span="16">
                <el-form ref="formRef" :model="member" :rules="rules">
                    <el-form-item prop="userAccount">
                        <el-input prefix-icon="user" v-model="member.userAccount" placeholder="请输入会员账号">
                            <template v-if="member.userName" #append>{{ "名称: " + member.userName }}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="roomId">
                        <el-select v-model="member.roomId" placeholder="选择自习室" :loading="select_loading" disabled>
                            <el-option :key="member.roomId" :label="member.roomName" :value="member.roomId" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="member.dateRange" type="daterange" start-placeholder="开始日期"
                            range-separator="到" end-placeholder="结束日期"
                            :default-value="[new Date(member.beginTime), new Date(member.endTime)]" />
                        <el-divider direction="vertical" border-style="none" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="large" @click="editMember" :loading="loading">保 存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<style lang='less' scoped>

</style>