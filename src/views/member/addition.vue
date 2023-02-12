<script setup lang='ts'>
import useUserStore from "@/store/modules/user";
import { FormInstance, dayjs } from "element-plus";
import api from "@/api";
import url from "@/api/RequestInterface"

const userStore = useUserStore()
const member = reactive({
    userAccount: "",
    userName: "",
    beginTime: "",
    dateRange: "",
    endTime: "",
    roomId: "",
})
const rooms: any = reactive([]);

const validUserAccount = (rule: any, value: string, callback: Function) => {
    if (member.userName == "" && member.userAccount != "") {
        api.post("/api/user/information", { "userAccount": value }).then((res) => {
            member.userName = res.data.userName;
        }).catch((err) => {
            member.userName = ""
            member.userAccount = ""
            return callback(new Error(member.userAccount + " " + err.message));
        })
        return callback();
    } else if (member.userAccount == "") {
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

function additionMember() {
    loading.value = true
    formRef.value && formRef.value.validate((valid) => {
        if (valid) {
            member.beginTime = dayjs(member.dateRange[0]).format("YYYY-MM-DD HH:mm:ss")
            member.endTime = dayjs(member.dateRange[1]).format("YYYY-MM-DD HH:mm:ss")
            console.log(member);

            api.post(url.URLPrefix + url.MemberAddition, member).then(() => {
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
    loading.value = false
}

onMounted(() => {
    select_loading.value = true
    api.post(url.URLPrefix + url.RoomList, { userAccount: userStore.userAccount }).then((resault) => {
        resault.data.forEach((item: any) => {
            rooms.push(item)
        });
        select_loading.value = false
    }).catch(() => {
        select_loading.value = false
    })
})
</script>

<template>
    <div class="page-main">
        <h2 class="header title">添加会员</h2>
        <el-row :gutter="20">
            <el-col :span="16">
                <el-form ref="formRef" :model="member" :rules="rules">
                    <el-form-item prop="userAccount">
                        <el-input prefix-icon="user" v-model="member.userAccount" placeholder="请输入会员账号">
                            <template v-if="member.userName" #append>{{ "名称: " + member.userName }}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="roomId">

                        <el-select v-model="member.roomId" placeholder="选择自习室" :loading="select_loading">
                            <el-option v-for="item in rooms" :key="item.roomId" :label="item.roomName"
                                :value="item.roomId" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="member.dateRange" type="daterange" start-placeholder="开始日期"
                            range-separator="到" end-placeholder="结束日期" />
                        <el-divider direction="vertical" border-style="none" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="large" @click="additionMember" :loading="loading">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<style lang='less' scoped>

</style>