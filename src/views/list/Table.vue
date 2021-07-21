<template>
  <div id="table">
    <el-row :gutter="20">
      <el-col :span="7" class="col">
        <div class="col">
          <device :deviceData="deviceData"></device> 
          <device :deviceData="alertData"></device> 
          <el-card shadow="hover">

            <el-input placeholder="请输入项目名称" class="input"></el-input>
            <el-button icon="el-icon-search" class="search">搜索</el-button>

            <!-- dropdown list  -->
            <el-collapse accordion v-for="(project,id) in projects" :key="id">
                <el-collapse-item :title="project.name" name="1">
                  <ul class="devices">
                    <li v-for="(item,id) in project.devices" :key="id" class="device">
                      <span class="device-name" v-text="item.name"></span>
                      <span v-if="item.statusCode == 1" class="status-normal" v-text="item.status"></span>
                      <span v-else  class="status-Unnormal" v-text="item.status"></span>
                    </li>
                  </ul>
                </el-collapse-item>
            </el-collapse>

          </el-card>
        </div>
      </el-col>
      <el-col :span="10"><div class="col"></div></el-col>
      <el-col :span="7"><div class="col"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import device from "../DeviceAndAlert.vue"
import deviceData from "@/api/device.js"
import alertData from "@/api/alert.js"

export default {
  data(){
    return{
     deviceData,
     alertData,
     projects:[
       {
         id: "1",
         name: '北京地铁项目',
         devices:[
           {
            name: '一号锚固监测仪',
            status: '正常',
            statusCode: 1
           },
           {
             name: '一号锚固监测仪',
             status: '松动',
           },
           {
             name: '一号锚固监测仪',
             status: '微松动',
           },
           {
             name: '一号锚固监测仪',
             status: '微松动',
           }
         ]
       },
       {
         id: "1",
         name: '北京地铁项目',
         devices:[
           {
             name: '一号锚固监测仪',
             status: '微松动',

           },
           {
             name: '一号锚固监测仪',
             status: '正常',
           },
           {
             name: '一号锚固监测仪',
             status: '正常',
           },
           {
             name: '一号锚固监测仪',
             status: '正常',
           }
         ]
       },
      
     ]
    }  
  },
  components:{
    device,
  },
  created(){
    console.log(deviceData)
  }
}
</script>

<style scoped lang="sass">
  ul
    padding-left: 0px
    list-style: none
  .col
    background-color: white
  .input
    width: 70%
  .search
    width: 30%

  .itemCol
    font-size: 14px

  .demo-table-expand
    font-size: 14px

  .status-Unnormal
    padding: 0 0 0 70px 
    color: red
  .status-normal
    padding: 0 0 0 70px 

  .device
    line-height: 30px
    padding-left: 20px
    &:hover
      background-color: #eee
    border-radius: 5px
  .devices
    max-height: 95px
    overflow: auto
</style>