<template>
    <div>
        <div class="dataone" ref="parseOne" style="width: 100%; height: 500px;">

        </div>
    </div>
</template>

<script>
import { echarts1 } from '@/network/networks'
var echarts = require('echarts')
export default {
  props: {
    pullTime: Array
    // 属性
  },
  watch: {
    pullTime () {
      this.echartsone()
    }
  },
  data () {
    return {
      axisX: '',
      axisY: [],
      customers: []
    }
  },
  mounted () {
    this.echartsone()
  },
  methods: {
    echartsone () {
      echarts1(this.pullTime).then((ret) => {
        this.axisY = ret.data.zong
        this.axisX = ret.data.dateM
        this.customers = ret.data.kefu
        this.initecharts()
      })
    },
    initecharts () {
      var myChart = echarts.init(this.$refs.parseOne)
      var option = {
        title: {
          text: '最近排名趋势',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.customers,
          bottom: '0px'
        },
        grid: {
          left: '1%',
          right: '3%',
          bottom: '10%',
          containLabel: true
        },
        toolbox: {

        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.axisX
        },
        yAxis: {
          type: 'value'
        },
        series: this.axisY
      }
      myChart.setOption(option)
    }
  }

}
</script>

<style>

</style>
