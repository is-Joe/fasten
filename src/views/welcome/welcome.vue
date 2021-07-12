<template>
  <div class="welcome">
    <el-card class="box-card" shadow="never">
        <el-row>
            <el-col :span="24" class="welWord">
                <div class="grid-content bg-purple-dark">
                   <i class="el-icon-message-solid"></i>
                   <span>欢迎使用青年帮后台管理系统</span>
                </div>
            </el-col>
        </el-row>

    </el-card>
    <el-card class="box-card" shadow="never">
        <el-row :gutter='25'>
                <el-col :span="12">
                     <el-card  shadow="never" class="calendar">
                        <el-calendar>
                        </el-calendar>
                     </el-card>
                </el-col>

                <el-col :span="12">
                    <el-card class="weather" shadow="never">
                        <div slot="header" class="weatherHeader">
                            <i class="el-icon-sunny"></i>
                            <span>最近三天的天气</span>
                        </div>
                        <div class="weatherCard">
                            <el-card v-for = '(item,index) in weatherList' :key="index" shadow="hover" style="margin-top:10px;">
                                <div class="weatherItem">
                                    <div class="weatherLeft">
                                        <img :src=getIcon(item.conditionIdDay) alt="">
                                            <span class="num">
                                                <strong>{{item.tempDay}}~{{item.tempNight}}</strong>
                                                <span class="icon"></span>
                                            </span>
                                        <span class="tex">{{item.conditionDay}}/{{item.windDirDay}}</span>
                                    </div>
                                    <div class="weatherRight">
                                        <strong>
                                            {{getdayTex(index)}}
                                        </strong>
                                        <p>{{item.predictDate}}</p>
                                    </div>
                                </div>

                            </el-card>
                        </div>
                    </el-card>

                </el-col>
        </el-row>
    </el-card>

  </div>
</template>

<script>
import { weather } from '@/network/networks.js'
export default {
  data () {
    return {
      weatherList: []
    }
  },
  methods: {
    getIcon (Icon) {
      return require('@/assets/weather/W' + Icon + '.png')
    },
    getdayTex (index) {
      if (index == 0) {
        return '今天'
      } else if (index == 1) {
        return '明天'
      } else {
        return '后天'
      }
    },
    getData () {
      weather().then((ret) => {
        this.weatherList = ret.data.data.forecast
        const weatherData = this.weatherList
        const timeData = Date.now()
        const mydata = { weatherData: weatherData, timeData: timeData }
        var cacheList = JSON.stringify(mydata)
        window.sessionStorage.setItem('mydata', cacheList)
        // console.log(this.weatherList);
      })
    }
  },
  mounted () {
    var mydataString = window.sessionStorage.getItem('mydata')
    const mydata = JSON.parse(mydataString)
    if (mydata) {
      var newTime = Date.now()
      var oldTime = JSON.parse(window.sessionStorage.getItem('mydata'))
      if (newTime - oldTime > 1000 * 60 * 60) {
        this.getData()
      } else {
        this.weatherList = mydata.weatherData
        console.log('请一个小时之后再刷新')
      }
    } else {
      this.getData()
      console.log('没有缓存')
    }
  }
}
</script>

<style lang="less" scoped>

    .welWord{
        color:#409EFF;
        font-size: 28px;
        span{
            padding-left: 16px;
        }
    }
    .weather{

        .weatherHeader{
            color: #67C23A;
            font-size: 20px;
            span{
                padding-left: 10px;
            }
        }
        .weatherCard{

            .weatherItem{
                display: flex;
                justify-content: space-between;
                align-items: center;
               margin-top: 10px;
                 .weatherLeft{
                     display: flex;
                     align-items: center;
                    .num{
                        font-size: 38px;
                        padding-left: 10px;
                        .icon{
                            position: absolute;
                            width: 8px;
                            height: 8px;
                            border: 2px black solid;
                            border-radius: 50%;
                        }
                    }
                    .tex{
                        padding-left: 18px;
                        color:#409EFF;
                    }
                    }
                .weatherRight{
                    strong{
                        color:#67C23A;
                        font-size: 30px;
                    }
                    p{
                        color: gray;
                        padding-top: 8px;
                    }
                }
            }

        }
    }

</style>
