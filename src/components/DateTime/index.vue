<script setup lang='ts'>
import dayjs from "dayjs"
import { toRef } from "vue";
const props = defineProps<{
    data: string
    format: string
}>()
const data = toRef(props, "data")
const format = toRef(props, "format")
</script>

<template>

    <div class="date-time">
        {{ dayjs(data).format(format) }}
    </div>
</template>

<style lang='less' scoped>

</style>