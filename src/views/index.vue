<route lang="yaml">
    name: home
    meta:
      title: 主页
</route>
    
<script setup lang='ts'>
import api from '@/api';
import url from '@/api/RequestInterface';
import useUserStore from '@/store/modules/user';
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;

const userStore = useUserStore()
const permission = ref(userStore.permissions);
const roomMemberList = reactive([]) as any
const room_member_dom = ref<HTMLElement>()
function CreateRoomMemberChart() {
    let myChart = echarts.init(room_member_dom.value as HTMLElement);
    let option: EChartsOption = {
        title: {
            text: "每个自习室的会员数",
            textStyle: {
                rotate: 50
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '0',
            right: '6%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            name: "自习室名称",
            nameRotate: 45,
            nameTextStyle: {
                align: "center",
            },
            axisLine: {
                symbol: ['none', 'arrow']
            },
            axisLabel: { rotate: 50 },
            axisTick: {
                show: false,
                alignWithLabel: true
            }
        },
        yAxis: {},
        dataset: {

            dimensions: ["id", "name", "count"],
            source: roomMemberList
        },
        series: [
            {
                type: 'bar',

                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                },
                encode: {
                    x: "name",
                    y: "count",
                    itemId: 0
                }
            },
        ]
    };

    option && myChart.setOption(option);
}
const mockNum = ref(100)
let initdata = ref(1000)
const mockdata = reactive([]) as any
const mockdataFunc = ()=>{
    
    api.post("https://sql-father-backend-974538-1256524210.ap-shanghai.run.tcloudbase.com/api/sql/generate/schema",
    {
    "dbName": null,
    "tableName": "member",
    "tableComment": "会员表",
    "mockNum": mockNum.value,
    "fieldList": [
        {
            "fieldName": "userAccount",
            "fieldType": "VARCHAR(256)",
            "defaultValue": null,
            "notNull": false,
            "comment": "用户编号",
            "primaryKey": false,
            "autoIncrement": false,
            "mockType": "递增",
            "mockParams": initdata.value,
            "onUpdate": null
        },
        {
            "fieldName": "roomId",
            "fieldType": "BIGINT",
            "defaultValue": null,
            "notNull": false,
            "comment": "自习室编号",
            "primaryKey": false,
            "autoIncrement": false,
            "mockType": "词库",
            "mockParams": 79,
            "onUpdate": null
        },
        {
            "fieldName": "beginTime",
            "fieldType": "TIMESTAMP",
            "defaultValue": "CURRENT_TIMESTAMP",
            "notNull": false,
            "comment": "会员开始时间",
            "primaryKey": false,
            "autoIncrement": false,
            "mockType": "随机",
            "mockParams": "日期",
            "onUpdate": null
        },
        {
            "fieldName": "endTime",
            "fieldType": "TIMESTAMP",
            "defaultValue": "CURRENT_TIMESTAMP",
            "notNull": false,
            "comment": "会员结束时间",
            "primaryKey": false,
            "autoIncrement": false,
            "mockType": "随机",
            "mockParams": "日期",
            "onUpdate": null
        }
    ]
}
    ).then(res => {
        (res.data.insertSql as string).split(";").forEach(item => {
            if(item != "")
            mockdata.push(item + ";")
        })
        console.log(mockdata.lenght)
        if(initdata.value + mockNum.value < 10000){
            initdata.value += mockNum.value;
            mockdataFunc()
        }
    })
}
onMounted(() => {
    // mockdataFunc()

    if (permission.value == "merchant") {
        // 请求merchant 统计
        console.log("merchant");

        api.post(url.URLPrefix + url.StatisticSmerchant, { userAccount: userStore.userAccount }).then((resault) => {
            resault.data.room_numbers.forEach((element: any) => {
                roomMemberList.push(element)
            });

            CreateRoomMemberChart()
        })
    } else {
        console.log("other");
    }
})


</script>

<template>
    <div :class="permission">
        <template v-if="permission == 'merchant'">
            <div id="room-members" ref="room_member_dom" style="height: 300px;"></div>

        </template>
        <template v-else-if="permission == 'user'">用户</template>
        <template v-else>管理员</template>
    </div>
</template>

<style lang='less' scoped>

</style>