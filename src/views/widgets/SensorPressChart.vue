<template>
  <v-card tile>
    <v-card-text>
      <div class="chart">
        <e-chart
          :path-option="[
            ['dataset.source', this.nodeChart],
            ['series[0].type', 'heatmap'],
            ['series[0].encode', { x: 0, y: 1 }],
            ['xAxis.data', this.xAxis],
            ['xAxis.axisLabel', { interval: 0, rotate: 30 }],
            ['visualMap', this.visualMap],
          ]"
          :height="this.height"
          :width="this.width"
        >
        </e-chart>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Util from '@/util'
import { DateTime } from 'luxon'

import EChart from '@/components/chart/echart'
export default {
  components: {
    EChart,
    /* ProjectSensor,*/
    /* NodeDatas,*/
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
    chartColor: {
      type: String,
      default: '',
    },
    projectId: {
      type: String,
      required: true,
    },
    pathOption: {
      type: Array,
    },
    height: {
      type: String,
    },
    width: {
      type: String,
    },
  },

  data() {
    return {
      chartData: [],
      defaultOption: [
        ['color', [this.chartColor]],
        ['series[0].type', 'heatmap'],
        ['series[0].encode', { x: 0, y: 1 }],
        ['series[0].emphasis', {itemStyle: { shadowBlur:10, shadowColor: 'rgba(0, 0, 0, 0.5)'}}],
        ['xAxis.data', this.xAxis],
        ['xAxis.axisLabel', { interval: 0, rotate: 30 }],
        ['visualMap', this.visualMap],
      ],
    }
  },

  created() {
    /* this.chartData = this.nodeChart()*/
  },

  computed: {
    ...mapState({
      sensors: (state) => state.node.nodes,
      projects: (state) => state.project.projects,
      nodeDatas: (state) => state.nodedata.nodeDatas,
      alarm: (state) => state.nodedata.alarmPress,
    }),

    /* ...mapGetters(['getAlarmByLevel', 'getAlarmById']),*/

    nodeChart: function() {
      var project_data = this.getNodeDataByProjectAndType(this.projectId, 1)

      return project_data.map((data) => {
        var alarm = this.getAlarmByLevel(data.data[0].level)
        return {
          timestamp: DateTime.fromISO(data.timestamp)
            .setZone('utc')
            .toFormat('dd/MM'),
          id: data.node_id,
          value: alarm.value,
        }
      })
    },

    // 获取最近30天日历作为x坐标轴刻度标签
    xAxis: function() {
      var now = DateTime.now()

      var days = []
      for (let i = 0; i <= 30; i++) {
        var e = now.minus({ days: 30 - i })
        days[i] = e.toFormat('dd/MM')
      }

      return days
    },

    visualMap: function() {
      var pieces = this.alarm.map((data) => {
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

  methods: {
    getNodeDataByProjectAndType(pid, type) {
      var nodes = this.getNodeByProjectID(pid)

      console.log('2222222222222222222222222222')
      console.log(pid)
      console.log(nodes)
      // 根据传感器类型进行分类过滤
      nodes = nodes.filter((item) => item.type == type)
      return this.nodeDatas.filter((item) =>
        nodes.find((e) => e.node_id == item.node_id),
      )
    },

    getAlarmByLevel(level) {
      return this.alarm.find((item) => item.level == level)
    },

    getNodeByProjectID(pid) {
      return this.sensors.filter((item) => item.project_id == pid)
    },
  },
}
</script>

<style></style>
