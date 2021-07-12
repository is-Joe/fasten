<template>
    <div class="dataParse">
        <el-card shadow="none" class="outer">
            <div class="headerOuter">
            <el-row>
                <el-col :span='5' style="padding: 19px;">
                    <el-card class="header" shadow="none">
                        <i class="el-icon-data-analysis"></i>
                        <span>用户数据分析</span>
                    </el-card>
                </el-col>
                <el-col :span="6" :offset="3" style="padding: 19px;">
                    <div class="block">
                        <el-date-picker
                        v-model="timeData"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp"
                        @change="dateChange">
                        </el-date-picker>
                    </div>
                </el-col>
            </el-row>

        </div>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      timeData: ''
    }
  },
  methods: {
    dateChange (val) {
      console.log(val)
      // 子组件向父组件传值
      this.$emit('timeFrame', val)
    }
  }
}
</script>

<style scoped lang="less">
    /deep/.el-card__body{
        padding: 5px;
    }
    .dataParse{
        padding: 0 20px 20px 20px;
        .header{
            color:#409EFF;
            font-size: 25px;
            border: none;
            padding: 0px;
            span{
                padding-left: 15px;
            }
        }
    }
</style>
