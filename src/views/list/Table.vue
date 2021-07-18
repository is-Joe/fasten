<template>
  <div id="table">
    <v-container class="container">
        <v-row class="row">
          <v-col cols="8" class="col" >
            <v-card :elevation="0">
              <v-row>
                <v-col cols="5" class="ml-2" >
                  
                      <v-card tile :elevation="0" class="caption pl-4" outlined>
                        <v-card-title class="pb-0">设备概况</v-card-title>
                        <div class="device">
                          <div class="device-text">
                            <p>监测仪总数</p>
                            <span>108</span>
                            <p>监测仪总数</p>
                            <span>108</span>
                            <p>监测仪总数</p>
                            <span>108</span>
                          </div>
                          <div class="device-rate">100%</div>
                        </div>

                      </v-card>
                      <v-card tile :elevation="0" >
                        3
                      </v-card>
                 
                 
                </v-col>
                <!-- //right -->
                <v-col cols="6">2</v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card>5</v-card>
          </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="sass">
  
  #table
    height: 100%

  .col
    height: 100%

  .device
    display: flex

  
    
</style>