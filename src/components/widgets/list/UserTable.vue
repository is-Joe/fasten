<template>
  <v-card>
    <v-toolbar text dense flat>
      <v-toolbar-title>
        用户列表
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
                    v-model="editedItem.cid"
                    item-text="name"
                    item-value="id"
                    :items="companies"
                    :rules="rules.select"
                    required
                  >
                  </v-select>
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

    <v-card-text class="pa-0">
      <v-data-table :headers="headers" :items="users" hide-default-footer>
          <template v-slot:item.index="{ item }">
              {{users.indexOf(item)}}
          </template>
          <template v-slot:item.role="{ item }">
              {{getUserRole(item.role)}}
          </template>
          <template v-slot:item.cid="{ item }">
              {{getCompanyName(item.cid)}}
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
         { text: '序号',
           sortable: true,
           width: 80,
           value: 'index'
         },
         { text: '用户名',
           sortable: true,
           value: 'name'
         },
         {
           text: '用户类型',
           align: 'left',
           value: 'role'
         },
         { text: '用户单位', align: 'center', value: 'cid' },
         { text: '操作', value: 'actions', align: 'right', sortable: false}
       ],

       editedIndex: -1,

       editedItem: {
         id: '',
         cid: '',
         role: 1,
         name: '',
       },
       defaultItem: {
         id: '',
         cid: '',
         role: 1,
         name: '',
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
     ]),
     initialize() {
       this.fetchUsers().then((data) => {
         console.log(data)
       })
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

          this.updateUser({id:item.id, data:item})
          console.log(this.users);
        } else {
          let item = this.editedItem
          item.id = Util.uuidv4();
          if (item.cid === "") item.cid =  null
          item.role = parseInt(item.role)

          this.createUser(item)
          console.log(this.users);
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
