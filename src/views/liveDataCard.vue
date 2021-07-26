<template>
  <div>
      <div v-for="(item,id) in liveData" :key="id">
            <div class="item">
            <div class="item-message">
                <p>项目名称: <span v-text="item.projectName"></span></p>
                <p>位置描述: <span v-text="item.sensorName"></span></p>
                <p>报警类型: <span v-text="item.alertType" :class="{dangerColor: !item.statusCode,}">轻微倾斜</span></p>
                <p>上报数据: <span v-text="item.reportData">X轴 + 0.2 Y轴 -0.3 </span></p>
                <p>上报事件: <span v-text="item.reportTime">2021/06/02</span></p>
            </div>
            <div class="item-state" >
                <el-button :class="{dangerButton: !item.statusCode,}" type="primary" class="button" circle v-text="item.status">待处理</el-button>
            </div>
            </div>
            <el-divider></el-divider>
        </div>
  </div>
</template>

<script>
export default {
    props:{
        liveData:{
            type: Array,
        }
    },
    data(){
        return {
        }
    }
}
</script>

<style scoped lang="sass">
    .item
        display: flex
        width: 100%
        height: 100%
        .item-message
            p
                font-size: 12px
                margin: 6px
                .dangerColor
                    color: red
        .item-state
            display: flex
            align-items: center
            padding: 20px
            .button
                width: 80px
                height: 80px
            .dangerButton
                background-color:#F56C6C
                opacity: 0.8   
</style>