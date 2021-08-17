<template>
  <v-card>
    <v-toolbar text dense flat>
      <v-toolbar-title>
        终端参数列表
      </v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-dialog v-model="dialog1" max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
            :disabled="isSelectedEmpty"
            >初始化</v-btn
          >
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">确认初始化以下终端吗? </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-list flat>
                <v-list-item-group color="primary">
                  <v-list-item v-for="(item, i) in selected" :key="i">
                    <v-list-item-content>
                      <v-list-item-title>
                        <!-- v-text="item.node_id" -->
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer> </v-spacer>
            <v-btn color="blue darken-1" text @click="close_init">取消 </v-btn>
            <v-btn color="blue darken-1" text @click="save_init">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">修改终端参数 </span>
          </v-card-title>

          <v-card-text>
            <!-- <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.node_id"
                    disabled
                    label="终端ID"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedItem.type"
                    :items="nodeTypes"
                    label="类型"
                    disabled
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="menu"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="time"
                        label="唤醒时间"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu2"
                      v-model="time"
                      full-width
                      @click:minute="$refs.menu.save(time)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container> -->      
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
        v-model="selected"
        :headers="headers"
        :items="paramAngle"
        @dblclick:row="dblEditItem"
        show-select
        hide-default-footer
      >
        <template v-slot:[`item.index`]="{ item }">
          {{projectNodeParams.indexOf(item)}}
        </template>
        <!-- <template v-slot:[`item.updated_at`]="{ item }">
          {{getUpTimeStamp(item.updated_at)}}
        </template> -->
        <!-- <template v-slot:[`item.init`]="{ item }">
          <v-chip
            label
            small
            :color="getNodeInitState(item.init).color"
            
          >
            {{ getNodeInitState(item.init).text }}
          </v-chip>
        </template> -->
        <!-- <template v-slot:[`item.type`]="{ item }">
          {{getNodeType(item.type)}}
        </template> -->
        <!-- <template v-slot:[`item.state`]="{ item }">
          <v-chip
            label
            small
            :color="getNodeParamState(item.state).color"
        
          >
            {{ getNodeParamState(item.state).text }}
          </v-chip>
        </template> -->
        <!-- <template v-slot:[`item.axis_x`]="{ item }">
          {{ item.axis_x / 100}}
        </template> -->
         <template v-slot:[`item.incline`]="{ item }">
          {{ item.qingxie + '' + item.weiqingxie}}
        </template>
        <!-- <template v-slot:[`item.axis_y`]="{ item }">
          {{ item.axis_y / 100}}
        </template>
        <template v-slot:[`item.axis_z`]="{ item }">
          {{ item.axis_z / 100}}
        </template>
        <template v-slot:[`item.wake_time`]="{ item }">
          {{ getTimeStamp(item.wake_time)}}
        </template> -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
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

  export default {
    data() {
      return {
        items: [
          { text: 'Real-Time', icon: 'mdi-clock' },
          { text: 'Audience', icon: 'mdi-account' },
          { text: 'Audience', icon: 'mdi-account' },
          { text: 'Audience', icon: 'mdi-account' },
          { text: 'Conversions', icon: 'mdi-flag' },
        ],
        dialog: false,
        dialog1: false,
        time: null,
        menu2: false,

        selected: [],
        headers: [
          { text: '序号', sortable: true, value: 'index', width:75 },
          { text: '位置描述', align: 'center', value: 'addr',sortable: false },
          { text: '初始值', align: 'center', value: 'type',sortable: false },
          { text: '阈值',align: 'center',value: 'incline',sortable: false },
          { text: '唤醒时间', align: 'center', value: 'wake_time',sortable: false },
          { text: 'ip地址', align: 'center', value: 'server_addr_1',sortable: false },
          { text: '初始化状态', align: 'center', value: 'state',sortable: false },
          { text: '同步状态', align: 'center', value: 'state',sortable: false },
          { text: '备注', align: 'center', value: 'desc',sortable: false },
          { text: '动作', value: 'actions', align: 'right', sortable: false },
        ],

        editedIndex: -1,

        editedItem: {
          id: '',
          project_id: '',
          type: 1,
          node_id: '',
          project: '',
        },
        defaultItem: {
          id: '',
          project_id: '',
          type: 1,
          node_id: '',
          project: '',
        },

        rules: {
          select: [(v) => !!v || 'Item is required'],
        },
      }
    },

    created() {
      this.initialize()
    },

    computed: {
      ...mapState({
        sensors: (state) => state.node.nodes,
        nodeTypes: (state) => state.node.nodeTypes,
        nodeParamsB: (state) => state.nodeparam.nodeparamsb,
        nodeParamState: (state) => state.nodeparam.nodeParamState,
        paramAngle: (state) => state.nodeparam.paramAngle
      }),

      ...mapGetters(['getProjectName', 'getNodeType', 'getNodeParamState', 'getNodeInitState']),

      isSelectedEmpty: function() {
        return (this.selected && this.selected.length > 0) ? false : true
      },

      projectNodeParams: function() {
        let project_id = this.$route.params.id
        console.log('======================--------------------')
        console.log(project_id)

        let nodes = this.getNodeByProjectID(project_id)
        console.log(nodes)
        return this.getNodeParamsByNodeID(nodes)
      },
    },

    methods: {
      ...mapActions([
        'fetchNodeParamsB',
        'createNodeParamB',
        'updateNodeParamB',
        'deleteNodeParamB',
        'fetchAngleParam'
      ]),

      initialize() {
        this.fetchAngleParam().then((data) => {
          console.log(data)
        })
        console.log(this.projectNodeParamsB)
      },

      getNodeByProjectID(pid) {
        return this.sensors.filter((item) => item.project_id == pid)
      },

      getNodeParamsByNodeID(nodes) {
        var arr = new Array()
        for (var i = 0; i < nodes.length; i++) {
          for (var j = 0; j < this.nodeParamsB.length; j++) {
            if (nodes[i].node_id != this.nodeParamsB[j].node_id) continue
            arr.push(this.nodeParamsB[j])
          }
        }
        return arr
      },

      getTimeStamp(str) {
        // 由unix时间加上时区,获得js时间
        let dt = new Date(str * 1000)
        return dt.getHours() + ':' + dt.getMinutes()
      },

      editItem(item) {
        this.editedIndex = this.sensors.indexOf(item)
        this.editedItem = Object.assign({}, item)

        let dt = new Date(this.editedItem.wake_time * 1000)
        this.time = dt.getHours() + ':' + dt.getMinutes()

        this.dialog = true
      },

      // 双击处理事件
      dblEditItem(event, item) {
        this.editItem(item.item)
      },

      save_init() {
        this.updateParamInit(this.selected)
        this.close_init()
      },

      close_init() {
        this.dialog1 = false
        this.$nextTick(() => {
          this.selected = []
        })
      },

      save() {
        // 更新唤醒时间
        let dt = new Date(this.editedItem.wake_time * 1000)
        let arr = this.time.split(':')
        let res = dt.setHours(parseInt(arr[0]), parseInt(arr[1]))

        let item = this.editedItem
        item.wake_time = Math.round(dt.getTime() / 1000)
        item.type = parseInt(item.type)
        item.state = 2

        this.updateNodeParamB({ id: item.id, data: item })
        console.log(this.sensors)
        this.close()
      },

      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      updateParamInit(items) {
        var updated = items.map((item) => {
          // 2 已经初始化
          item.init = 2
          return item
        })

        updated.forEach(item => this.updateNodeParamB({ id: item.id, data: item}))
      },

      getUpTimeStamp(str) {
        return DateTime.fromISO(str)
          .setZone('utc')
          .toFormat('dd/MM/yyyy HH:mm:ss')
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },
  }
</script>
