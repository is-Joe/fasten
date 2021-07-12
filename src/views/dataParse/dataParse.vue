<template>
    <div>
        <datatop @timeFrame="timeFrame"/>
        <div class="parseMain">
            <el-card shadow="none">
                <el-row :gutter="22">
                    <el-col :span="10" :offset="2">
                        <!-- 父级向子级传值 -->
                        <dataone :pullTime="pullTime"/>
                    </el-col>
                    <el-col :span="10">
                        <datatwo :pullTime="pullTime"/>
                    </el-col>
                </el-row>
            </el-card>
        </div>
    </div>
</template>

<script>
import datatop from './chidren/datatop'
import dataone from './chidren/dataone'
import datatwo from './chidren/datatwo'
export default {
  data () {
    return {
      pullTime: []
    }
  },
  components: {
    datatop,
    dataone,
    datatwo
  },
  methods: {
    timeFrame (val) {
      console.log(val)
      this.pullTime = val
    }
  }
}
</script>

<style lang="less" scoped>
    .parseMain{
        padding: 0 18px 18px 18px;
    }
    .bk{
        background-color: gray;
        height: 20px;
    }

</style>
