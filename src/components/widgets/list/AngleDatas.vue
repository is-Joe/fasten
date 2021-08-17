<template>
  <v-card>
      <v-toolbar text dense flat> 
        <v-toolbar-title>
            终端参数列表
        </v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
          <v-data-table
          :headers = headers
          :items = angleData
          >

          </v-data-table>
      </v-card-text>
  </v-card>
</template>

<script>
 import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    data(){
        return {
             headers: [
                { text: '序号',sortable: true,width: 80,value: 'index' },
                { text: '描述位置',align: 'left',value: 'addr',sortable: true, },
                { text: '状态',align: 'left',value: 'state',sortable: true,},
                { text: '实时角度值', align: 'center',value: 'x_abso_tilt',sortable: true,},
                { text: '正常范围值',value: '', align: 'right', sortable: false },
                { text: '上报时间', value: 'updated_at',  align: 'right',  sortable: false},
                { text: '操作',value: 'actions', align: 'right', sortable: false}
            ],
                
         }
    },
    computed:{
        ...mapState({
        
            angleData: state => state.angle.angleData
        })
    },
    created(){
        this.initialize();
    },
    methods:{
        ...mapActions([
            'getAngle'
        ]),
        initialize(){
            let angle_id = this.$route.params.id
            console.log(angle_id)
            this.getAngle().then((data)=>{
                data.forEach(item => console.log(item.addr));
                console.log(data)
            })
        }
    }
}
</script>

<style>
    
</style>