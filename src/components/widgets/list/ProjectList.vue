<template>
  <v-card 
  :elevation = 0
  outlined>
    <v-toolbar text dense flat>
      <v-toolbar-title>
        项目列表
      </v-toolbar-title>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="请输入项目名称"
          single-line
          hide-details
          class="self-mx"
        ></v-text-field>
      <!-- dialog -->
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >新建项目</v-btn>
        </template>
        <!-- editedCard -->
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text class="py-0">
            <v-container>
              <v-row>
                <v-col cols="12" class="col-input">
                  <v-text-field
                    v-model="editedItem.name"
                    label="项目名称"
                    class="test py-0"
                  />
                </v-col>
                <v-col cols="12" class="col-input">
                  <v-select
                    label="用户类型"
                    v-model="editedItem.type"
                    :items="projectType"
                    required  
                  
                  ></v-select>
                </v-col>
                <v-col cols="12" class="col-input">
                  <v-select
                    label="单位名称"
                    v-model="editedItem.company_id"
                    item-text="name"
                    item-value="id"
                    :items="companies"
                    required
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" class="col-input">
                     <v-select
                        label="工程进度"
                        v-model="editedItem.progress"
                        item-text="text"
                        item-value="value"
                        :items="projectProgress"
                        required
                      >
                      </v-select>
                </v-col>
                <v-col cols="12" class="col-input">
                   <v-text-field
                      v-model="editedItem.desc"
                      label="备注"
                    />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">放弃修改</v-btn>
            <v-btn color="blue darken-1" text @click="save">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-divider></v-divider>

    <!-- showCard -->
    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :items="projects"
        @dblclick:row="projectDetail"
        :search = "search" >
        <template
          v-slot:[`item.index`]="{ item }">
            {{projects.indexOf(item)}}
        </template>
      
        <template
          v-slot:[`item.type`]="{ item }">
            {{getProjectType(item.type)}}
        </template>

        <template
          v-slot:[`item.company`]="{ item }">
            {{getCompanyName(item.company_id)}}
        </template>
        <template
          v-slot:[`item.progress`]="{ item }">
            {{getProjectProgress(item.progress)}}
        </template>
        <template
          v-slot:[`item.actions`]="{ item }">
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
<!-- test contribute -->

</template>
<script>
 import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
 import Util from '@/util'

 export default {
  data() {
    return {
      search:'',
      dialog: false,
      headers: [
        { text: '序号',sortable: true,width: 80,value: 'index' },
        { text: '工程名称',align: 'left',value: 'name',sortable: true, },
        { text: '用户类型',align: 'left',value: 'type',sortable: true,},
        { text: '单位名称', align: 'center',value: 'company',sortable: true,},
        { text: '工程进度',value: 'progress', align: 'right', sortable: false },
        { text: '备注', value: 'desc',  align: 'right',  sortable: false},
        { text: '操作',value: 'actions', align: 'right', sortable: false}
      ],

      editedIndex: -1,

      editedItem: {
        id: '',
        name: '',
        type: 1,
        company_id: '',
        progress: '',
        desc: ''
      },
      defaultItem: {
        id: '',
        name: '',
        type: 1,
        company_id: '',
        progress: '',
        desc: ''
      },
    }
  },

  created () {
    this.initialize()

  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新建项目' : '编辑项目'
    },
      ...mapState({
          projects: state => state.project.projects,
          projectType: state => state.project.projectTypes,
          companies: state => state.company.companies,
          projectProgress: state => state.project.projectProgress,
    }),
      ...mapGetters([
          'getProjectType',
          'getCompanyName',
          'getProjectProgress'
    ]),
  },

  methods: {
    projectDetail(mouseEvent, entry) {
      this.$router.push({
        path: '/widgets/chart/' + entry.item.id
       
      })
      
    },

    ...mapActions([
        'fetchProjects',
        'createProject',
        'updateProject',
        'deleteProject',
        'fetchCompanies'
    ]),
    // 初始化
    initialize() {
    //之所以两个请求相互嵌套是因为里面请求的数据依赖外面的数据
        this.fetchProjects().then((data) => {
          console.log(data)
          this.fetchCompanies().then((data) => {
            console.log(data)
          })
        })
       
    },

    editItem (item) {
      // 获取item的index,判断是编辑还是新增
      this.editedIndex = this.projects.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      if (!confirm('删除后数据不可恢复,确定删除此项目吗?')) {
          return
      }

      this.deleteProject(item.id).then(() => {
          this.fetchProjects()
      })
    },
  //  submit
    save() {
      // 如果是编辑
      if (this.editedIndex > -1) {
        let item = this.editedItem
        item.type = parseInt(item.type)
          console.log(item);
        this.updateProject({id:item.id, data:item})
      
      } else {
        // 如果是新增
        let item = this.editedItem
        item.id = Util.uuidv4();
        if (item.company_id === "") item.company_id = null
        item.type = parseInt(item.type)

        this.createProject(item)
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
<style scoped lang="sass">
  .col-input
    padding: 1px
  
  .self-mx
    margin: 0 200px
   
</style>
