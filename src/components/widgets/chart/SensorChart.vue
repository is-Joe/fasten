<template>
  <v-card tile>
    <v-card-text>
      <div class="layout row ma-0 align-center justify-space-between">
        <div class="text-box">
          <div class="subheading pb-2">{{ title }}</div>
          <span class="grey--text"
            >{{ subTitle }}
            <v-icon small :color="iconColor">{{ icon }}</v-icon></span
          >
        </div>
        <div class="chart">
          <e-chart
            :path-option="computeChartOption"
            height="400px"
            width="100%"
          >
          </e-chart>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  import EChart from '@/components/chart/echart'
  export default {
    components: {
      EChart,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      subTitle: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '',
      },
      iconColor: {
        type: String,
        default: 'success',
      },
      type: {
        type: String,
        default: 'line',
      },
      chartColor: {
        type: String,
        default: '',
      },
      data: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        defaultOption: [
          ['dataset.source', this.data],
          ['xAxis.show', false],
          ['yAxis.show', false],
          ['color', [this.chartColor]],
        ],
      }
    },

    computed: {
            // 获取最近30天日历作为x坐标轴刻度标签
      xAxis: function() {
        var now = DateTime.now()

        var days = []
        for (let i = 0; i < 30; i++) {
          var e = now.minus({ days: 30 - i })
          days[i] = e.toFormat('dd/MM')
        }

        return days
      },

      visualMap2: function() {
        var pieces = this.alarmIncline.map((data) => {
          return {
            value: data.value,
            label: data.text,
            color: data.color,
          }
        })

        return {
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          top: '5%',
          contentColor: '#0066ff',
          type: 'piecewise',
          pieces: pieces,
        }
      },

    },

    watch: {
      type: {
        deep: true,
        handler: function(newVal) {
          switch (newVal) {
            case 'bar':
              this.defaultOption.push(['series[0].type', 'bar'])
              break
            case 'area':
              this.defaultOption.push(['series[0].type', 'line'])
              this.defaultOption.push(['series[0].areaStyle', {}])
              break
            default:
              break
          }
          return this.defaultOption
        },
      },
    },
    computed: {
      computeChartOption() {
        return this.defaultOption
      },
    },
  }
</script>

<style></style>
