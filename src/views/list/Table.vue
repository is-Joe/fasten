<template>
  <div id="table">
    <el-row :gutter="20">
      <el-col :lg="7" class="col" >
        <!-- left -->
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
      <el-col :lg="10" >
        <div class="col">
          <dataVisualization :echartsData = "angleData"></dataVisualization>
          <dataVisualization :echartsData = "stressData"></dataVisualization>
        </div>
      </el-col>
      <el-col :lg="7" class="hidden-md-only">
        <div class="col">
          <!-- live data -->
          <el-card class="live-data" shadow="never">
            <liveDataCard :liveData="liveData"></liveDataCard>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import device from "../DeviceAndAlert.vue"
import deviceData from "@/api/device.js"
import alertData from "@/api/alert.js"
import liveDataCard from '@/views/liveDataCard'
import liveData from "@/api/liveData.js"
import dataVisualization from "@/views/dataVisualization"

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
        
      ],
      liveData,
      angleData:{
            title: {
                text: '北京地铁一号监测仪',
                
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['微倾斜', '严重倾斜', 'X轴倾斜角度','Y轴倾斜角度'],
                top: 25
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '1%',
                containLabel: true
            },
            toolbox: {
            
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['18°', '19', '20', '21', '22', '23', '24','25','26','27']
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    symbol:'circle',
                    name: '微倾斜',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: 'rgba(233,30,99,0.6)', //改变折线点的颜色
                            lineStyle: {
                                color: 'rgba(233,30,99,0.6)' //改变折线颜色
                            }
                        }
                    },
                    data: [2, 2, 2, 2, 2, 2, 2,2,2,2]
                },
                {
                    symbol:'circle',
                    name: '严重倾斜',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: 'red', //改变折线点的颜色
                            lineStyle: {
                                color: 'red' //改变折线颜色
                            }
                        }
                    },
                    data: [5, 5, 5, 5, 5, 5, 5,5,5,5]
                },
                {
                    name: 'X轴倾斜角度',
                    type: 'line',
                    data: [1.5, 2.3, 2.0, 4.5, 3.9, 2.3, 1.1,3.0,3.2,1.9],
                    smooth: true
                },
                {
                    name: 'Y轴倾斜角度',
                    type: 'line',
                    data: [ 3.3, 1.1,3.0,3.2,1.9,1.5, 2.3, 2.0, 1.5, 1.9],
                    smooth: true
                },
            ]
      },
      stressData:{
          title: {
              text: '信号塔三号监测仪',
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: ['过压', '微松动', '严重松动'],
              top: 25
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '1%',
              containLabel: true
          },
          toolbox: {
          
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['18', '19', '20', '21', '22', '23', '24','25','26','27']
          },
          yAxis: {
              type: "value",
          },
          series: [
              {
                  symbol:'circle',
                  name: '过压',
                  type: 'line',
                  itemStyle: {
                      normal: {
                          color: 'rgba(233,30,99,0.6)', //改变折线点的颜色
                          lineStyle: {
                              color: 'rgba(233,30,99,0.6)' //改变折线颜色
                          }
                      }
                  },
                  data: [40, 40, 40, 40, 40, 40, 40,40,40,40]
              },
              {
                  symbol:'circle',
                  name: '微松动',
                  type: 'line',
                  itemStyle: {
                      normal: {
                          color: 'red', //改变折线点的颜色
                          lineStyle: {
                              color: 'red' //改变折线颜色
                          }
                      }
                  },
                  data: [30, 30, 30, 30, 30, 30, 30,30,30,30]
              },
              {
                  name: '严重松动',
                  type: 'line',
                  data: [ 20, 20,20,20,20,20, 20, 20, 20, 20],
                  smooth: true
              },
              {
                  name: '力值',
                  type: 'line',
                  data: [ 20, 2,34,23,43,34,45 , 23, 23, 34],
                  smooth: true
              },
          ]
    },
    }
  },
  components:{
    device,
    liveDataCard,
    dataVisualization
  },
  created(){
    console.log(deviceData)
  },
  mounted(){
    
  },
  methods:{
    
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




  .item
    display: flex
    width: 100%
    height: 100%
    .item-message
      p
        font-size: 12px
        margin: 6px
        .dangerColor
          color: red
    .item-state
      display: flex
      align-items: center
      padding: 20px
      .button
        width: 80px
        height: 80px
      .dangerButton
        background-color:#F56C6C
        opacity: 0.8   
     
</style>