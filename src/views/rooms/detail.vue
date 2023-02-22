<script setup lang='ts'>
import api from "@/api";
import url from "@/api/RequestInterface";
import router from "@/router";
import useUserStore from "@/store/modules/user"
import { ref, onMounted } from "vue";
const params = router.currentRoute.value.params;
const userStore = useUserStore()
const roomId = ref(params.roomId)
let num = ref(0);
interface Seat {
    [key: string | number]: { seatStatus: number, time: string }
}
let seats = ref({} as Seat)

const room = reactive({
    roomId: "",
    roomName: "",
    userAccount: "",
    roomPhone: "",
    roomDesc: "",
    roomAddress: "",
    createTime: "",
    updateTime: "",
    roomSeat: 0,
    isDelete: 0
});
const getCurrentMemberNum = () => {
    api.post(url.URLPrefix + url.MemberCount, {
        roomId: roomId.value,
        userAccount: userStore.userAccount
    }).then((res) => {
        num.value = res.data;
    })
}

const getRoomInformation = () => {
    api.post(url.URLPrefix + url.RoomInformation, {
        roomId: roomId.value,
        userAccount: userStore.userAccount
    }).then((res) => {
        for (const key in res.data) {
            (room as any)[key] = res.data[key];
        }
    })
}

const getSeatStatus = () => {
    api.post(url.URLPrefix + "/seat/list", {
        roomId: roomId.value
    }).then((res) => {

        res.data.forEach((item: any) => {
            seats.value[item.seatId] = {
                seatStatus: item.seatStatus,
                time: item.time
            };
        })
    })
}
onMounted(() => {
    getRoomInformation()
    getCurrentMemberNum()
    getSeatStatus();
});
</script>

<template>
    <el-descriptions :border="true" :column="2">
        <el-descriptions-item label="编号">{{ room.roomId }}</el-descriptions-item>
        <el-descriptions-item label="名称">{{ room.roomName }}</el-descriptions-item>
        <el-descriptions-item label="创建者账号">{{ room.userAccount }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ room.roomPhone }}</el-descriptions-item>
        <el-descriptions-item label="地址">{{ room.roomAddress }}</el-descriptions-item>
        <el-descriptions-item label="座位数">{{ room.roomSeat }}</el-descriptions-item>
        <el-descriptions-item label="状态">
            <el-tag :type="!!room.isDelete ? 'danger' : ''">{{ !!room.isDelete ? "关闭" : "开放" }}</el-tag>
            <el-divider direction="vertical" />
            <el-tag v-if="room.roomSeat - num > 25">座位充足</el-tag>
            <el-tag v-else-if="room.roomSeat - num > 0" type="warning">较拥挤</el-tag>
            <el-tag v-else type="danger">暂无空闲位置</el-tag>
        </el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <el-descriptions :border="true" :column="2">
        <el-descriptions-item label="总座位数">{{ room.roomSeat }}</el-descriptions-item>
        <el-descriptions-item label="空闲座位">{{ room.roomSeat - num }}</el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <el-descriptions :border="true" :column="2">
        <el-descriptions-item label="创建时间">

            <DateTime :data="room.createTime" :format="'YYYY-MM-DD HH:mm:ss'"></DateTime>
        </el-descriptions-item>
        <el-descriptions-item label="最后修改时间">
            <DateTime :data="room.updateTime" :format="'YYYY-MM-DD HH:mm:ss'"></DateTime>
        </el-descriptions-item>
        <el-descriptions-item label="介绍">{{ room.roomDesc }}</el-descriptions-item>
    </el-descriptions>
    <h2>座位状态</h2>
    <div class="seat">
        <div class="seat-item" v-for="seatId in room.roomSeat" :key="seatId">
            <template v-if="seats[seatId] != undefined">
                <!-- 已占位 -->
                <el-card shadow="hover" :class="'status-' + seats[seatId]?.seatStatus">
                    <svg-icon name="ic:baseline-chair" />
                    <span>{{ seatId }} {{ seats[seatId].seatStatus == 1 ? "已预约" : "有人在" }}</span>
                </el-card>
            </template>
            <template v-else>
                <!-- 未占位 -->
                <el-card shadow="hover" class="status-0">
                    <svg-icon name="ic:baseline-chair" /><span>{{ seatId }} {{ "空闲" }}</span>
                </el-card>

            </template>
        </div>
    </div>
</template>

<style lang='less' scoped>
.seat {
    display: flex;
    flex-wrap: wrap;

    &-item {
        width: 150px;
        height: 75px;
        margin: 10px;
        padding: 5px;
        border-radius: 5px;
        text-align: center;

        span {
            display: inline-block;
            width: 100px;
        }
    }

    .status {
        &-1 {
            // color: var(--el-color-primary);
            background-color: var(--el-color-success-light-5);
        }

        &-2 {
            background-color: var( --el-color-danger-light-5);
        }

        &-0 {
            background-color: var(--el-color-primary-light-5);
        }
    }
}
</style>