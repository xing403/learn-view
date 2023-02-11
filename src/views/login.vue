<script setup lang='ts'>
import useUserStore from '@/store/modules/user'
import { FormInstance } from 'element-plus';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const redirect = ref(route.query.redirect?.toString() ?? '/')   // 登录后返回的页面，若没有返回首页



// 登录后返回的页面
const user = ref({
    userAccount: localStorage.userAccount ?? "",
    userPassword: "",
    remember: !!localStorage.userAccount,// 转化为 bool
})
// 表单校验信息
const loginRole = reactive({
    userAccount: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    userPassword: [{ required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 20, message: '密码长度在8~20位', trigger: 'blur' },]
})
let loading = ref(false)

const formRef = ref<FormInstance>()

const handleLogin = () => {
    loading.value = true
    formRef.value && formRef.value.validate((valid) => {
        if (valid) {
            userStore.login(user.value).then(() => {
                if (user.value.remember) {
                    localStorage.setItem('login_account', user.value.userAccount)
                } else {
                    localStorage.removeItem('login_account')
                }
                loading.value = false
                router.push({
                    path: redirect.value,
                    replace: true
                })
            }).catch(() => {
                loading.value = false
            })
        } else {
            loading.value = false
        }
    }).catch(() => {
        loading.value = false
    })
}

</script>

<template>
    <div class="login">
        <h2 class="header">自习室管理系统</h2>
        <el-form ref="formRef" :model="user" :rules="loginRole" label-width="20px" status-icon>
            <el-form-item prop="userAccount">
                <el-input prefix-icon="user" v-model="user.userAccount" placeholder="账号" tabindex="1"
                    autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item prop="userPassword">
                <el-input prefix-icon="lock" type="password" v-model="user.userPassword" placeholder="密码"
                    show-password></el-input>
            </el-form-item>
            <el-form-item>
                <div class="flex justify-between w100">
                    <el-checkbox v-model="user.remember">记住我</el-checkbox>
                    <el-link style="color: #409eff;">忘记密码</el-link>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%;" @click="handleLogin" :loading="loading"
                    :disabled="loading"> 登 录
                </el-button>
            </el-form-item>
            <div class="footer">
                <span class="text-coolgray text-size-base">还没有账号? </span>
                <el-link href="/register" style="color: #409eff;"> 注册新账号</el-link>
            </div>
        </el-form>
    </div>

</template>

<style lang='less' scoped>
.login {
    width: 100%;
    padding-top: 30vh;

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