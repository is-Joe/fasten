<template>
  <v-card>
    <v-toolbar text dense flat>
      <v-toolbar-title>
        项目终端列表
      </v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">
              {{ formTitle }}
            </span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.node_id" label="终端ID" />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    label="终端类型"
                    v-model="editedItem.type"
                    :items="nodeTypes"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.info" label="位置绑定" />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="editedItem.sn"
                    label="终端编号"
                    :items="nodeIndex"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    label="项目名称"
                    v-model="editedItem.project_id"
                    item-text="name"
                    item-value="id"
                    :items="projects"
                    :rules="rules.select"
                    required
                  >
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer> </v-spacer>
            <v-btn color="blue darken-1" text @click="close">取消 </v-btn>
            <v-btn color="blue darken-1" text @click="save">保存 </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-divider> </v-divider>

    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :items="projectNode"
        show-expand
        hide-default-footer
      >
        <template v-slot:item.project="{ item }">
          {{getProjectName(item.project_id)}}
        </template>
        <template v-slot:item.type="{ item }">
          {{getNodeType(item.type)}}
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <!-- <e-chart
                 :path-option="[
                 ['series[0].data', getVirtulData(2016)],
                 ['series[0].type', 'heatmap'],
                 ['series[0].coordinateSystem', 'calendar'],
                 ['visualMap', visualMap],
                 ]"
                 height="250px"
                 width="90%"
                 >
                 </e-chart> -->
          </td>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip label small color="red" text-color="white">
            严重松动
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
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
  import EChart from '@/components/chart/echart'

  export default {
    components: {
      /* EChart*/
    },
    data() {
      return {
        dialog: false,

        headers: [
          { text: '终端编号', sortable: true, value: 'sn' },
          { text: '终端ID', align: 'center', sortable: true, value: 'node_id' },
          { text: '终端类型', align: 'center', value: 'type' },
          { text: '描述信息', align: 'center', value: 'info' },
          /* { text: '状态', align: 'center', value: 'status' },*/
          { text: '项目名称', align: 'center', value: 'project' },
          { text: '操作', value: 'actions', align: 'right', sortable: false }
        ],

        editedIndex: -1,

        editedItem: {
          id: '',
          project_id: '',
          type: 1,
          node_id: '',
          project: '',
          info: ''
        },
        defaultItem: {
          id: '',
          project_id: '',
          type: 1,
          node_id: '',
          project: '',
          info: ''
        },

        rules: {
          select: [(v) => !!v || 'Item is required']
        },

        colors: {
          processing: 'blue',
          sent: 'red',
          delivered: 'green'
        },

        calendar: {
          top: 120,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          range: '2016',
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: { show: false }
        }
      }
    },

    created() {
      this.initialize()
    },

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? '新增终端' : '编辑终端'
      },

      ...mapState({
        projects: (state) => state.project.projects,
        sensors: (state) => state.node.nodes,
        nodeTypes: (state) => state.node.nodeTypes,
        nodeDatas: (state) => state.nodedata.nodeDatas,
        alarm: (state) => state.nodedata.alarmPress,
      }),

      ...mapGetters(['getProjectName', 'getNodeType']),

      projectNode: function() {
        let project_id = this.$route.params.id
        console.log('======================--------------------')
        console.log(project_id)

        return this.getNodeByProjectID(project_id)
      },

      nodeIndex: function() {
        var arr = []
        for (var i = 0; i < 1000; i++) {
          arr[i] = i
        }

        return arr
      },

      nodeChart: function() {
        return this.nodeDatas.map((data) => {
          return {
            timestamp: DateTime.fromISO(data.timestamp)
              .setZone('utc')
              .toFormat('dd/MM'),
            id: data.node_id,
            value: data.alarm_level
          }
        })
      },

      visualMap: function() {
        var pieces = this.alarm.map((data) => {
          return {
            value: data.value,
            label: data.text,
            color: data.color
          }
        })

        return {
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          top: '5%',
          contentColor: '#0066ff',
          type: 'piecewise',
          pieces: pieces
        }
      },

      // 获取最近30天日历作为x坐标轴刻度标签
      xAxis: function() {
        var now = DateTime.now()

        var days = []
        for (let i = 0; i < 30; i++) {
          var e = now.minus({ days: 30 - i })
          days[i] = e.toFormat('dd/MM')
        }
        return days
      }
    },

    methods: {
      ...mapActions(['fetchNodes', 'createNode', 'updateNode', 'deleteNode']),

      initialize() {
        this.fetchNodes().then((data) => {
          console.log(data)
        })
      },

      getNodeByProjectID(pid) {
        return this.sensors.filter((item) => item.project_id == pid)
      },

      getColorByStatus(status) {
        return this.colors[status]
      },

      getVirtulData: function(year) {
        var date = DateTime.local(year, 1, 1)
        var end = DateTime.local(year + 1, 1, 1)
        var dayTime = 3600 * 24 * 1000
        var data = []
        for (var time = date; time < end; time = time.plus({ day: 1 })) {
          data.push([
            time.toFormat('yyyy-MM-dd'),
            Math.floor(Math.random() * 10000)
          ])
        }
        return data
      },

      editItem(item) {
        this.editedIndex = this.sensors.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        if (!confirm('删除后此终端历史数据不可恢复,确定删除此终端吗?')) {
          return
        }

        this.deleteNode(item.id).then(() => {
          this.fetchNodes()
        })
      },

      save() {
        var _this = this
        if (this.editedIndex > -1) {
          let item = this.editedItem
          item.type = parseInt(item.type)

          this.updateNode({ id: item.id, data: item })
          console.log(this.sensors)
        } else {
          let item = this.editedItem
          item.id = Util.uuidv4()
          if (item.project_id === '') item.project_id = null
          item.type = parseInt(item.type)

          this.createNode(item)
          console.log(this.sensors)
        }

        this.close()
      },

      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      }
    }
  }
</script>
