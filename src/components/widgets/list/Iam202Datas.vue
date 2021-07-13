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
        :items="iam202Datas"
        hide-default-footer
        disable-pagination
      >
        <template v-slot:item.index="{ item }">
          {{ iam202Datas.indexOf(item) }}
        </template>
        <template v-slot:item.level="{ item }">
          <v-chip
            label
            small
            :color="getAlarmByValue(item.level).color"
            text-color="white"
          >
            {{ getAlarmByValue(item.level).text }}
          </v-chip>
        </template>
        <template v-slot:item.data="{ item }">
          {{ getDataFormat(item.data) }}
        </template>
        <template v-slot:item.wake_time="{ item }">
          {{ getWakeTimestamp(item.wake_time) }}
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ getTimeStamp(item.created_at) }}
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
        { text: '终端ID', sortable: true, value: 'addr' },
        { text: '终端状态', align: 'left', value: 'level' },
        { text: '压力值(KN)', align: 'left', value: 'data' },
        { text: '上报时间', align: 'left', value: 'created_at' },
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
      iam202Datas: (state) => state.iam202.iam202Datas,
    }),
    ...mapGetters([
      'getProjectName',
      'getNodeType',
      'getSensorType',
      'getAlarmById',
      'getAlarmByValue',
      'getNodeParamBById',
    ]),
  },

  methods: {
    ...mapActions(['fetchIam202Datas']),

    initialize() {
      this.fetchIam202Datas({ page: 1, per_page: 20000 }).then((data) => {
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

    getDataFormat(data) {
      var f = data / 100
      return f.toFixed(2)
    },
    
    getTimeStamp(str) {
      return DateTime.fromISO(str)
        .setZone('utc')
        .toFormat('dd/MM/yyyy HH:mm:ss')
    },

    getWakeTimestamp(str) {
      return DateTime.fromISO(str)
        .setZone('utc')
        .toFormat('HH:mm')
    }
  },
}
</script>
