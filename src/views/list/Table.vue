<template>
  <div id="table">
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="col">
          
            
            <device></device> 
            <device></device> 
          <el-card shadow="hover">
            鼠标悬浮时显示
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


export default {
  components:{
    device,
  }
}
</script>

<style scoped lang="sass">
  .col
    background-color: white

  

</style>