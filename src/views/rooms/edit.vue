<script setup lang='ts'>
import { checkPhone } from "@/utils/composables/check";
import useUserStore from "@/store/modules/user";
import { FormInstance } from "element-plus";
import api from "@/api";
import router from "@/router";
import url from "@/api/RequestInterface";
const params = router.currentRoute.value.params;

const userStore = useUserStore()
const room = ref({
    roomId: params.roomId as string,
    roomName: "",
    roomAddress: "",
    roomPhone: "",
    roomSeat: 1,
    roomDesc: "",
    userAccount: userStore.userAccount
})
let min = ref(1);

const rules = reactive({
    roomName: [{ required: true, message: '请输入自习室名称', trigger: 'blur' }],
    roomPhone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
    roomAddress: [{ required: true, message: "请输入自习室地址", trigger: 'blur' }]
})
const formRef = ref<FormInstance>();
let isloading = ref(false)

const editRoom = () => {
    if (isloading.value) return;
    isloading.value = true
    formRef.value && formRef.value.validate((valid) => {
        if (valid) {
            
            api.post(url.URLPrefix + url.RoomEdit, room.value)
        }
        isloading.value = false
    }).catch(() => {
        isloading.value = false
    })
}
const getRoomInformation = (roomId: string, userAccount: string) => {
    api.post(url.URLPrefix + url.RoomInformation, { roomId: roomId, userAccount: userAccount }).then((res) => {
        room.value = res.data
    })
}
const getMemberCount = (roomId: string, userAccount: string) => {
    api.post(url.URLPrefix + url.MemberCount, { roomId: roomId, userAccount: userAccount }).then((res) => {
        min.value = res.data;
    })

}

onMounted(() => {
    getRoomInformation(room.value.roomId, room.value.userAccount)
    getMemberCount(room.value.roomId, room.value.userAccount)
})

</script>

<template>
    <div>
        <h2 class="header title">编辑自习室</h2>
        <el-form ref="formRef" :model="room" :rules="rules" label-width="120px">
            <el-form-item prop="roomName" label="自习室名称">
                <el-input v-model="room.roomName"></el-input>
            </el-form-item>
            <el-form-item prop="roomPhone" label="联系电话">
                <el-input v-model="room.roomPhone"></el-input>
            </el-form-item>
            <el-form-item prop="roomSeat" label="自习室座位量">
                <el-input-number v-model="room.roomSeat" :min="min"></el-input-number>
            </el-form-item>
            <el-form-item prop="roomAddress" label="自习室地址">
                <el-input v-model="room.roomAddress"></el-input>
            </el-form-item>
            <el-form-item prop="roomDesc" label="自习室介绍">
                <el-input v-model="room.roomDesc" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="large" @click="editRoom" :loading="isloading">保存修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang='less' scoped>

</style>