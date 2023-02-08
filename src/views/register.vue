<script setup lang='ts'>
import { checkPassword } from '@/utils/composables/check';
import { FormInstance } from 'element-plus';
import useUserStore from '@/store/modules/user'
const user = ref({
    userName: "",
    userAccount: "",
    userPassword: "",
    checkPassword: "",
    userRole: "user"
})

const checkPasswordRules = (rule: any, value: string, callback: Function) => {
    if (value !== user.value.userPassword) {
        callback(new Error('两次输入密码不一致!'))
    } else {
        callback()
    }
}
const rules = reactive({
    userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    userAccount: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 4, message: '账号长度不少于4位', trigger: 'blur' },
    ],
    userPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 20, message: '密码长度在8~20位', trigger: 'blur' },
        { required: true, validator: checkPassword, trigger: 'blur' }
    ],
    checkPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { required: true, validator: checkPasswordRules, trigger: 'blur' }
    ]

})
const router = useRouter()
const formRef = ref<FormInstance>();
const userStore = useUserStore()
let loading = ref(false)


const handleRegister = () => {
    loading.value = true
    formRef.value && formRef.value.validate((valid) => {
        if (valid) {//通过校验
            loading.value = true
            userStore.register(user.value).then(() => {
                loading.value = false
            })
        }
    }).catch(() => {
        loading.value = false
    })
}
</script>

<template>
    <div class="registor">
        <h2 class="header">注册新账号</h2>
        <el-form ref="formRef" :model="user" :rules="rules" label-width="20px" status-icon>
            <el-form-item prop="userName">
                <el-input v-model="user.userName" prefix-icon="avatar" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="userAccount">
                <el-input v-model="user.userAccount" prefix-icon="user" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="userPassword">
                <el-input type="password" prefix-icon="lock" v-model="user.userPassword" placeholder="密码"
                    show-password></el-input>
            </el-form-item>
            <el-form-item prop="checkPassword">
                <el-input type="password" prefix-icon="lock" v-model="user.checkPassword" placeholder="确认密码"
                    show-password></el-input>
            </el-form-item>

            <el-form-item prop="userRole" label="注册身份">
                <el-radio-group v-model="user.userRole">
                    <el-radio label="user">普通用户</el-radio>
                    <el-radio label="merchant">商家</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-button type="primary" @click="handleRegister" style="width: 100%;" :loading="loading"> 注 册 </el-button>

            <div class="footer">
                <span class="text-coolgray text-size-base">已经有帐号?</span>
                <el-link href="/login" style="color: #409eff;">去登录</el-link>
            </div>
        </el-form>
    </div>

</template>

<style lang='less' scoped>
.registor {
    padding-top: 25vh;

    .header,
    .footer {
        text-align: center;
        margin: 5px;
        margin-bottom: 15px;
        padding: 5px;
    }

    .el-form {
        width: 400px;
        margin: 0 auto;
    }
}
</style>