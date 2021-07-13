<template>
  <v-card>
    <v-toolbar text dense flat>
      <v-toolbar-title>
        传感器列表
      </v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn
               color="primary"
               dark
               class="mb-2"
               v-bind="attrs"
               v-on="on"
               >新增传感器
               </v-btn> -->
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}
            </span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="editedItem.node_id"
                        label="终端ID"
                    />
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
      <v-data-table :headers="headers" :items="sensors" hide-default-footer>
        <template v-slot:item.project="{ item }">
            {{getProjectName(item.project_id)}}
        </template>
        <template v-slot:item.type="{ item }">
            {{getNodeType(item.type)}}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
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

 export default {
   data() {
     return {
       dialog: false,

       headers: [
         { text: '终端ID',
           sortable: true,
           value: 'node_id'
         },
         {
           text: '终端类型',
           align: 'left',
           value: 'type'
         },
         { text: '项目名称',
           align: 'center',
           value: 'project'
         },
         { text: '操作',
           value: 'actions',
           align: 'right',
           sortable: false
         }
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
     formTitle () {
       return this.editedIndex === -1 ? '新增终端' : '编辑终端'
     },

       ...mapState({
           projects: state => state.project.projects,
           sensors: state => state.node.nodes,
           nodeTypes: state => state.node.nodeTypes,
     }),
       ...mapGetters([
           'getProjectName',
           'getNodeType',
     ]),
   },

   methods: {
       ...mapActions([
           'fetchNodes',
           'createNode',
           'updateNode',
           'deleteNode',
       ]),

     initialize() {
       this.fetchNodes().then((data) => {
         console.log(data)
       })
     },

     editItem (item) {
       this.editedIndex = this.sensors.indexOf(item)
       this.editedItem = Object.assign({}, item)
       this.dialog = true
     },

     deleteItem (item) {
       if (!confirm('删除后数据不可恢复,确定删除此终端吗?')) {
           return
       }

       this.deleteNode(item.id).then(() => {
           this.fetchNodes()
       })
     },

     save() {
       var _this = this;
       if (this.editedIndex > -1) {
          let item = this.editedItem
          item.type = parseInt(item.type)

          this.updateNode({id:item.id, data:item})
          console.log(this.sensors);
       } else {
         let item = this.editedItem
         item.id = Util.uuidv4();
         if (item.project_id === "") item.project_id =  null
         item.type = parseInt(item.type)

         this.createNode(item)
         console.log(this.sensors);
       }

       this.close()
     },

     close () {
       this.dialog = false
       this.$nextTick(() => {
         this.editedItem = Object.assign({}, this.defaultItem)
         this.editedIndex = -1
       })
     },
   },

   watch: {
     dialog (val) {
       val || this.close()
     },
   },

 }
</script>
