<template>
  <v-card>
    <v-toolbar text dense flat>
      <v-toolbar-title>
        用户列表
      </v-toolbar-title>
      <!-- search tool -->
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="请输入用户名"
          single-line
          hide-details
          class="self-mx">
      </v-text-field>
      <!-- dialog card -->
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >新增用户</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="editedItem.name"
                        label="用户名"
                    />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    label="用户类型"
                    v-model="editedItem.role"
                    :items="roles"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    label="单位名称"
                    v-model="editedItem.company_id"
                    item-text="name"
                    item-value="id"
                    :items="companies"
                    :rules="rules.select"
                    required
                  >
                  </v-select>
                </v-col>
                <v-col cols="4"> 
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
            <v-btn color="blue darken-1" text @click="close">取消</v-btn>
            <v-btn color="blue darken-1" text @click="save">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-divider></v-divider>

    <!-- table list -->
    <v-card-text class="pa-0">
      <v-data-table 
        :headers="headers" 
        :items="users"
        :search ="search"

       >
          <template v-slot:[`item.index`]="{ item }">
              {{users.indexOf(item)}} 
          </template>
          <template v-slot:[`item.role`]="{ item }">
              {{getUserRole(item.role)}}
          </template>
          <template v-slot:[`item.company_id`]="{ item }">
              {{getCompanyName(item.company_id)}}
              <!-- {{item.cid}} -->
          </template>
          <template v-slot:[`item.actions`]="{ item }">
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

       test:'hahah',
       search: '',
       dialog: false,
       headers: [
        { text: '序号', sortable: true, width: 80,value: 'index' },
        { text: '用户名', sortable: true, value: 'name' },
        { text: '用户类型',  align: 'left',  value: 'role'},
        { text: '用户单位', align: 'center', value: 'company_id' },
        { text: '分配监测仪',value: 'assignment',sortable: false,},
        { text: '配置监测仪', value: 'disposition', sortable: false, },
        { text: '管理项目', value: 'manageItem', sortable: false,  },
        { text: '升级监测仪', value: 'update', sortable: false, },
        { text: '用户管理', value: 'manageUser', sortable: false,},
        { text: '备注',value: 'desc' },
        { text: '操作', value: 'actions', align: 'right', sortable: false}
       ],
       editedIndex: -1,

       editedItem: {
        id: '',
        company_id: '',
        role: 1,
        name: '',
        desc:''
       },
       defaultItem: {
         id: '',
         company_id: '',
         role: 1,
         name: '',
         desc:''
       },

       rules: {
           select: [v => !!v || 'Item is required'] 
       }
     }
   },

    created () {
      this.initialize()

    },

   computed: {
     formTitle () {
       return this.editedIndex === -1 ? '新增用户' : '编辑用户'
     },
       ...mapState({
           companies: state => state.company.companies,
           users: state => state.user.users,
           roles: state => state.user.roles,
           powers: state => state.user.powers,
     }),
       ...mapGetters([
           'getUserRole',
           'getCompanyName',
     ]),
   },

   methods: {
     ...mapActions([
         'fetchUsers',
         'createUser',
         'updateUser',
         'deleteUser',
         'fetchCompanies',
     ]),
     initialize() {
        this.fetchUsers().then((data) => {
            console.log(data);

       })
        this.fetchCompanies().then(() => {
            // console.log(data)
        })
       
        // console.log(this.users);
     },

     editItem (item) {
       this.editedIndex = this.users.indexOf(item)
       this.editedItem = Object.assign({}, item)
       this.dialog = true
     },

     deleteItem (item) {
       if (!confirm('删除后数据不可恢复,确定删除此用户吗?')) {
           return
       }

       this.deleteUser(item.id).then(() => {
           this.fetchUsers()
       })
     },

     save() {
        // 修改用户项
        if (this.editedIndex > -1) {
          let item = this.editedItem
          item.role = parseInt(item.role)
          console.log('save',item);
          this.updateUser({id:item.id, data:item})
        } else {
          let item = this.editedItem
          item.id = Util.uuidv4();
          // console.log(item)
          if (item.cid === "") item.cid =  'aa'
          item.role = parseInt(item.role)
          console.log(item)
          this.createUser(item) 
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
    //  users (){
    //     // 根据role将user与power进行匹配
    //     this.users.forEach(item => Object.assign(item,state.powers.find(ite => item.role == ite.role)))
    //  }
   },

 }
</script>
<style scoped lang="sass">
  .self-mx
    margin: 0 200px
</style>