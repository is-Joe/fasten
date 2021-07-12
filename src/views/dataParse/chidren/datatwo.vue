<template>
  <div class="datatwo" ref='datatwo'>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import { pie } from '@/network/networks'
export default {
  props: {
    pullTime: Array
  },
  watch: {
    pullTime () {
      this.pie()
    }
  },
  data () {
    return {
      infoclass: [],
      list: []
    }
  },
  mounted () {
    this.pie()
  },
  methods: {
    consultclass () {
      var chartDom = this.$refs.datatwo
      var myChart = echarts.init(chartDom)
      var option
      option = {
        title: {
          text: '咨询专业分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 0,
          data: this.infoclass
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: this.list,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      option && myChart.setOption(option)
    },
    pie () {
      pie(this.pullTime).then((ret) => {
        // console.log(ret);
        this.infoclass = ret.data.infoclass
        this.list = ret.data.list
        this.consultclass()
      })
    }
  }
}

</script>

<style scoped lang="less">
    .datatwo{
        width: 100%;
        height: 500px;
    }
</style>
