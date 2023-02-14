<route lang="yaml">
name: reload
</route>

<script lang="ts" setup>
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;

const reload = ref<HTMLElement>()
const router = useRouter()
function createReloadAnimation() {
    var myChart = echarts.init(reload.value as HTMLElement);
    var option: EChartsOption = {
        graphic: {
            elements: [
                {
                    type: 'group',
                    left: 'center',
                    top: 'center',
                    children: new Array(7).fill(0).map((val, i) => ({
                        type: 'rect',
                        x: i * 20,
                        shape: {
                            x: 0,
                            y: -40,
                            width: 10,
                            height: 80
                        },
                        style: {
                            fill: '#5470c6'
                        },
                        keyframeAnimation: {
                            duration: 1000,
                            delay: i * 200,
                            loop: true,
                            keyframes: [
                                {
                                    percent: 0.5,
                                    scaleY: 0.3,
                                    easing: 'cubicIn'
                                },
                                {
                                    percent: 1,
                                    scaleY: 1,
                                    easing: 'cubicOut'
                                }
                            ]
                        }
                    }))
                }
            ]
        }
    };

    option && myChart.setOption(option);
}
const goback = ()=>{

    setTimeout(() => {
        router.go(-1)
    }, 1500)
} 
onMounted(() => {
    createReloadAnimation();
    goback()
})
</script>

<template>
    <div id="reload" ref="reload" style="width: 300px;height: 300px;"></div>
</template>
<style lang="less" scoped>
#reload{
    position: absolute;
    left: calc(50% - 150px);
    top: calc(50% - 150px);
    
}
</style>