<template>
  <v-card>
    <v-toolbar text dense flat>
      <v-toolbar-title>
        终端参数列表
      </v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">修改终端参数
            </span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" >
                  <v-text-field
                    v-model="editedItem.node_id"
                    disabled
                    label="终端ID"
                  />
                </v-col>
                <v-col cols="12" sm="6" >
                  <v-select
                    v-model="editedItem.type"
                    :items="nodeTypes"
                    label="类型"
                    disabled
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model.number="editedItem.song_dong_1"
                    type="number"
                    label="松动值1"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model.number="editedItem.song_dong_2"
                    type="number"
                    label="松动值2"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model.number="editedItem.op_pressure"
                    type="number"
                    label="过压值1"
                  />
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
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer>
            </v-spacer>
            <v-btn color="blue darken-1" text @click="close">取消
            </v-btn>
            <v-btn color="blue darken-1" text @click="save">保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-divider>
    </v-divider>

    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :items="projectNodeParams"
        @dblclick:row="dblEditItem" 
        hide-default-footer>
        <template v-slot:item.index="{ item }">
            {{projectNodeParams.indexOf(item)}}
        </template>
        <template v-slot:item.updated_at="{ item }">
            {{getUpTimeStamp(item.updated_at)}}
        </template>
        <template v-slot:item.type="{ item }">
            {{getNodeType(item.type)}}
        </template>
        <template v-slot:item.state="{ item }">
          <v-chip
            label
            small
            :color="getNodeParamState(item.state).color"
            text-color="white"
          >
            {{ getNodeParamState(item.state).text }}
          </v-chip>
        </template>
        <template v-slot:item.wake_time="{ item }">
          {{ getTimeStamp(item.wake_time)}}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
        </template>

      </v-data-table>
      <v-divider />
    </v-card-text>
  </v-card>
</template>

<script>
 import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
 import Util from '@/util'
 import { DateTime } from 'luxon'

 export default {
   data() {
     return {
       dialog: false,
       time: null,
       menu2: false,

       headers: [
         { text: '序号', sortable: true, value: 'index' },
         { text: '终端ID', align: 'center', value: 'node_id' },
         { text: '类型', align: 'center', value: 'type' },
         { text: '状态', align: 'center', value: 'state' },
         { text: '松动值1', align: 'center',value: 'song_dong_1' },
         { text: '松动值2', align: 'center',value: 'song_dong_2' },
         { text: '过压值1', align: 'center',value: 'op_pressure' },
         { text: '唤醒时间', align: 'center',value: 'wake_time' },
         { text: '时间戳', align: 'left',value: 'updated_at' },
         { text: '动作', value: 'actions', align: 'right', sortable: false}
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
         project_id:'',
         type: 1,
         node_id: '',
         project: '',
       },

       rules: {
           select: [v => !!v || 'Item is required'] 
       },

     }
   },

    created () {
      this.initialize()
    },

   computed: {
     ...mapState({
       sensors:    state => state.node.nodes,
       nodeTypes:  state => state.node.nodeTypes,
       nodeParams: state => state.nodeparam.nodeparamsa,
       nodeParamState: state => state.nodeparam.nodeParamState,
     }),

     ...mapGetters([
       'getProjectName',
       'getNodeType',
       'getNodeParamState',
     ]),

     projectNodeParams: function() {
       let project_id = this.$route.params.id
       console.log("======================--------------------")
       console.log(project_id)

       let nodes = this.getNodeByProjectID(project_id);
       console.log(nodes)
       return this.getNodeParamsByNodeID(nodes)
     },
   },

   methods: {
     ...mapActions([
       'fetchNodeParamsA',
       'createNodeParamA',
       'updateNodeParamA',
       'deleteNodeParamA',
     ]),

     initialize() {
       this.fetchNodeParamsA().then((data) => {
         console.log(data)
       })

       console.log(this.projectNodeParams)
     },

     getNodeByProjectID(pid) {
       return this.sensors.filter((item) => item.project_id == pid)
     },

     getNodeParamsByNodeID(nodes) {
       var arr = new Array()
       for (var i = 0; i < nodes.length; i++) {
         for (var j = 0; j < this.nodeParams.length; j++) {
           if (nodes[i].node_id != this.nodeParams[j].node_id) continue;
           arr.push(this.nodeParams[j])
         }
       }

       return arr
     },

     getTimeStamp(str) {
       // 由unix时间加上时区,获得js时间
       let dt = new Date(str * 1000)
       return dt.getHours() + ":" + dt.getMinutes()
     },

     editItem (item) {
       this.editedIndex = this.sensors.indexOf(item)
       this.editedItem = Object.assign({}, item)

       let dt = new Date(this.editedItem.wake_time * 1000)
       this.time = dt.getHours() + ":" + dt.getMinutes()

       this.dialog = true
     },

     // 双击处理事件
     dblEditItem (event, item) {
       this.editItem(item.item)
     },

     save() {
       // 更新唤醒时间
       let dt = new Date(this.editedItem.wake_time * 1000)
       let arr = this.time.split(":")
       let res = dt.setHours(parseInt(arr[0]), parseInt(arr[1]));
       let item = this.editedItem;
       item.wake_time = Math.round(dt.getTime() / 1000);
       item.type = parseInt(item.type)

       this.updateNodeParamA({id:item.id, data:item})
       console.log(this.sensors);
       this.close()
     },

     close () {
       this.dialog = false
       this.$nextTick(() => {
         this.editedItem = Object.assign({}, this.defaultItem)
         this.editedIndex = -1
       })
     },

     getUpTimeStamp(str) {
       return DateTime.fromISO(str).setZone('utc').toFormat('dd/MM/yyyy HH:mm:ss')
     },
   },

   watch: {
     dialog (val) {
       val || this.close()
     },
   },

 }
</script>
