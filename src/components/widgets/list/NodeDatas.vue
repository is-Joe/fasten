<template>
  <v-card>
    <v-toolbar text dense flat>
      <v-toolbar-title>
        终端列表
      </v-toolbar-title>
      <v-spacer> </v-spacer>
    </v-toolbar>
    <v-divider> </v-divider>

    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :items="projectNodeDatas"
        hide-default-footer
        disable-pagination
      >
        <template v-slot:item.index="{ item }">
          {{ projectNodeDatas.indexOf(item) }}
        </template>
        <template v-slot:item.type="{ item }">
          {{ getNodeType(item.type) }}
        </template>
        <template v-slot:item.level="{ item }">
          <v-chip
            label
            small
            :color="getAlarmById(item.level).color"
            text-color="white"
          >
            {{ getAlarmById(item.level).text }}
          </v-chip>
        </template>
        <template v-slot:item.timestamp="{ item }">
          {{ getTimeStamp(item.timestamp) }}
        </template>
      </v-data-table>
      <v-divider />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Util from '@/util'
import { DateTime } from 'luxon'

export default {
  data() {
    return {
      dialog: false,

      headers: [
        { text: '序号', sortable: true, value: 'index' },
        { text: '终端ID', sortable: true, value: 'node_id' },
        { text: '终端类型', align: 'left', value: 'type' },
        { text: '终端状态', align: 'left', value: 'level' },
        { text: '终端数据', align: 'left', value: 'data' },
        { text: '上报时间', align: 'left', value: 'timestamp' },
      ],
    }
  },

  created() {
    this.initialize()
  },

  computed: {
    ...mapState({
      projects: (state) => state.project.projects,
      sensors: (state) => state.node.nodes,
      sensorTypes: (state) => state.node.sensorTypes,
      nodeDatas: (state) => state.nodedata.nodeDatas,
    }),
    ...mapGetters([
      'getProjectName',
      'getNodeType',
      'getSensorType',
      'getAlarmById',
      'getNodeParamBById',
    ]),

    projectNodeDatas: function() {
      let project_id = this.$route.params.id
      let nodes = this.getNodeByProjectID(project_id)
      let data = this.getNodeDatasByNodeID(nodes)

      return this.buildData(data)
    },
  },

  methods: {
    ...mapActions(['fetchNodeDatas']),

    initialize() {
      this.fetchNodeDatas({ page: 1, per_page: 20000 }).then((data) => {
        console.log(data)
      })
    },

    getNodeByProjectID(pid) {
      return this.sensors.filter((item) => item.project_id == pid)
    },

    getNodeDatasByNodeID(nodes) {
      var arr = new Array()
      for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < this.nodeDatas.length; j++) {
          if (nodes[i].node_id != this.nodeDatas[j].node_id) continue
          arr.push(this.nodeDatas[j])
        }
      }

      return arr
    },

    getTimeStamp(str) {
      return DateTime.fromISO(str)
        .setZone('utc')
        .toFormat('dd/MM/yyyy HH:mm:ss')
    },

    buildData(data) {
      let unsorted = data.map((item) => {
        // 计算传感器数据,减去标定值
        let node_data = this.getTerminalSensorData(item)
        let level = ''
        // 如果是倾斜终端类型为B
        if (item.type == 2) {
          if (
            Math.abs(node_data[0]) > 30 ||
            Math.abs(node_data[1]) > 30 ||
            Math.abs(node_data[2]) > 30
          ) {
            level = 'LEVEL_INCLINE_2'
          } else if (
            Math.abs(node_data[0]) > 20 ||
            Math.abs(node_data[1]) > 20 ||
            Math.abs(node_data[2]) > 20
          ) {
            level = 'LEVEL_INCLINE_1'
          } else {
            level = 'LEVEL_INCLINE_NORMAL'
          }
          // 终端类型A (压力)
        } else {
          level = item.data[0].level
        }

        return {
          node_id: item.node_id,
          type: item.type,
          level: level,
          data: node_data,
          timestamp: item.timestamp,
        }
      })

      // 按时间排序
      return unsorted.sort(
        (a, b) => DateTime.fromISO(b.timestamp) - DateTime.fromISO(a.timestamp),
      )
    },

    getTerminalSensorData(item) {
      if (
        item.data[0].type === 'TYPE_PRESSURE' &&
        item.data[0].data !== undefined
      ) {
        return item.data[0].data[0].value / 100
      }

      if (item.data[0].type === 'TYPE_INCLINE') {
        // 错误检查
        var data = item.data[0].data
        if (data === undefined) {
          return
        }

        var x = 0
        var y = 0
        var z = 0

        for (var i = 0; i < 3; i++) {
          if (data[i] === undefined) {
            return
          }

          if (data[i].para == 1) {
            x = data[i].value
          }
          if (data[i].para == 2) {
            y = data[i].value
          }
          if (data[i].para == 3) {
            z = data[i].value
          }
        }

        // 如果已经未初始化,则直接返回原始值
        var param = this.getNodeParamBById(item.node_id)
        if (param === undefined || param.init == 1)
          return [x / 100, y / 100, z / 100]

        // 若已经初始化,则返回相对值
        return [
          (x - param.axis_x) / 100,
          (y - param.axis_y) / 100,
          (z - param.axis_z) / 100,
        ]
      }
    },
  },
}
</script>
