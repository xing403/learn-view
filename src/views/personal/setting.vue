<script lang="ts" setup>
import { checkPassword, checkPhone } from '@/utils/composables/check';
import useUserStore from '@/store/modules/user';
import api from '@/api';
import { FormInstance } from 'element-plus';
const userStore = useUserStore()

const baseInfo = reactive({
    createTime: "",
    gender: "",
    id: 0,
    isDelete: 0,
    updateTime: "",
    userAccount: "",
    userAvatar: "",
    userName: "",
    userPassword: "",
    userPhone: "",
    userRole: "",
});
const password = reactive({
    userAccount: userStore.userAccount,
    oldPassword: "",
    newPassword: "",
    checkPassword: ""
})

const checkPasswordRules = (rule: any, value: string, callback: Function) => {
    if (value !== password.newPassword) {
        callback(new Error('与新密码输入密码不一致!'))
    } else {
        callback()
    }
}
const baseInfoRules = reactive({
    userName: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 2, message: '账号长度不少于4位', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '选择性别', trigger: 'blur' },
    ],
    userPhone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },

        { required: true, validator: checkPhone, trigger: 'blur' }
    ],
})
const baseInfoRef = ref<FormInstance>();
const PasswordRef = ref<FormInstance>();
const pwdRules = {

    oldPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 20, message: '密码长度在8~20位', trigger: 'blur' },
        { required: true, validator: checkPassword, trigger: 'blur' },
    ],
    newPassword: [
        { min: 8, max: 20, message: '密码长度在8~20位', trigger: 'blur' },
        { required: true, validator: checkPassword, trigger: 'blur' },
    ],
    checkPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { required: true, validator: checkPasswordRules, trigger: 'blur' }
    ],
}
onMounted(() => {
    api.post("/api/user/information", { userAccount: userStore.userAccount }).then((res) => {
        for (const key in res.data) {
            (baseInfo as any)[key] = res.data[key];
        }
    }).catch(err => {
        console.log(err)
    })
})
const saveBaseInfo = () => {
    baseInfoRef.value && baseInfoRef.value.validate((validate) => {
        if (validate) {
            api.post("/api/user/updateBase", baseInfo).then((res) => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    })
}
const savePwd = () => {
    PasswordRef.value && PasswordRef.value.validate((validate) => {
        if (validate) {
            api.post("/api/user/password", password).then((res) => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    })
}

</script>

<template>
    <div class="page-main">
        <el-tabs tab-position="left">
            <el-tab-pane label="基本设置">
                <h2>基本设置</h2>
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="100px"
                            status-icon>
                            <el-form-item label="用户名" prop="userName">
                                <el-input v-model="baseInfo.userName"></el-input>
                            </el-form-item>


                            <el-form-item label="手机号" prop="userPhone">
                                <el-col :span="8">
                                    <el-input v-model="baseInfo.userPhone"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="性 别" prop="gender">
                                <el-select v-model="baseInfo.gender" placeholder="选择性别">
                                    <el-option label="男" value="男" />
                                    <el-option label="女" value="女" />
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="saveBaseInfo">
                                    保存
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="安全设置">
                <h2>安全设置</h2>
                <el-form ref="PasswordRef" :model="password" :rules="pwdRules" label-width="100px" status-icon>
                    <el-form-item prop="oldPassword" label="旧密码">
                        <el-col :span="8">
                            <el-input v-model="password.oldPassword" type="password" clearable show-password></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="newPassword" label="新密码">
                        <el-col :span="8">
                            <el-input v-model="password.newPassword" type="password" clearable show-password></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="checkPassword" label="确认密码">
                        <el-col :span="8">
                            <el-input v-model="password.checkPassword" type="password" clearable
                                show-password></el-input>
                        </el-col>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="savePwd">保 存</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<style scoped lang="less">
</style>