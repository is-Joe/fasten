<template>
    <div class="card" >
        <div class="left">
            <p v-text="amountText"></p>
            <el-button type="primary" v-text="amountNumber">108</el-button>
            <p v-text="tadayText">今日上报总数</p>
            <el-button type="primary" v-text="tadayNumber">108</el-button>
            <p v-text="faultText">故障检测仪总数</p>
            <el-button type="primary" v-text="faultNumber">0</el-button>
        </div>  
        <div class="right">
            <p v-text="dataRate">数据上报率</p>  
            <el-button type="primary" circle class="button" v-text="rateNumber">100%</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            amountText:'检测仪总数'
        }
    }
}
</script>

<style scoped lang="sass">
.card
      display: flex
      padding: 10px 20px 20px 40px  
      border: 1px solid #EBEEF5
      border-radius: 4px
      .left
        p
          font-size: 12px
          margin: 6px 0 6px 0
      .right
        text-align: center
        padding: 30px 0 0 40px
        .button
          width: 100px
          height: 100px
          font-size: 20px
</style>