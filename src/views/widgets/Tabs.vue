<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="selectedTab" @change="handleTabChange">
            <v-tab ripple href="#tab-1">终端列表</v-tab>
            <v-tab ripple href='#tab-2'>倾角数据</v-tab>
            <v-tab ripple href="#tab-5">倾斜传感器配置</v-tab>

            <v-tab ripple>锚固数据</v-tab>
            <v-tab ripple href="#tab-10">统计信息</v-tab>
            <v-tab ripple href="#tab-7">IAE202数据</v-tab>
            <v-tab ripple href="#tab-4">终端数据</v-tab>
            <v-tab ripple href="#tab-3">压力传感器配置</v-tab> 
            <v-tab ripple href="#tab-6">项目参数配置</v-tab>
            <v-tabs-items v-model="selectedTab">
              <v-tab-item value="tab-1">
                <project-sensor />
              </v-tab-item>
              <v-tab-item value="tab-2">
                <AngleDatas />
              </v-tab-item>
             
              <v-tab-item value="tab-4">
                <node-datas />
              </v-tab-item>
              <v-tab-item value="tab-7">
                <iam202-datas />
              </v-tab-item>
              <v-tab-item value="tab-3">
                <node-params />
              </v-tab-item>
              <v-tab-item value="tab-5">
                <node-incline-params />
              </v-tab-item>
              
              <v-tab-item value="tab-10">
                <sensor-press-chart
                  :project-id="this.$route.params.id"
                  height="350px"
                  width="100%"
                />
                <sensor-incline-chart
                  :project-id="this.$route.params.id"
                  height="350px"
                  width="100%"
                />
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import Util from '@/util'
// import { DateTime } from 'luxon'


import AngleDatas from '@/components/widgets/list/AngleDatas'
import NodeParams from '@/components/widgets/list/NodeParams'
import NodeInclineParams from '@/components/widgets/list/NodeInclineParams'
import NodeDatas from '@/components/widgets/list/NodeDatas'
import Iam202Datas from '@/components/widgets/list/Iam202Datas'
import ProjectSensor from '@/components/widgets/list/ProjectSensor'

import Material from 'vuetify/es5/util/colors'
// import MiniChart from '@/components/widgets/chart/MiniChart'
// import BoxChart from '@/components/widgets/chart/BoxChart'
// import VWidget from '@/components/VWidget'

import SensorPressChart from '@/views/widgets/SensorPressChart'
import SensorInclineChart from '@/views/widgets/SensorInclineChart'
export default {
  components: {
    NodeParams,
    NodeInclineParams,
    NodeDatas,
    Iam202Datas,
    ProjectSensor,
    SensorPressChart,
    SensorInclineChart,
    AngleDatas,
  },
  data() {
    return {
      selectedTab: 'tab-1',
      option: null,
      color: Material,
      testData: null,
    }
  },

  computed: {
    ...mapState({
      sensors: (state) => state.node.nodes,
      projects: (state) => state.project.projects,
      nodeDatas: (state) => state.nodedata.nodeDatas,
      alarm: (state) => state.nodedata.alarmPress,
      alarmIncline: (state) => state.nodedata.alarmIncline,
      iam202Datas: (state) => state.iam202.iam202Datas,
    }),
  },

  created() {
    this.initialize()
  },
  methods: {
    ...mapActions(['fetchProjects', 'fetchNodeDatas', 'fetchIam202Datas']),

    initialize() {

    },
    /* eslint-disable-line no-unused-vars */
    handleTabChange(id) {
      // 切换到iam202时更新数据
      if (id == 'tab-7') {
        this.fetchIam202Datas({ page: 1, per_page: 20000 }).then((data) => {
          console.log(data)
        })
      }
      // make sure the chart resized while parent from hidden to show
      window.dispatchEvent(new Event('resize'))
    },
  },
}
</script>
