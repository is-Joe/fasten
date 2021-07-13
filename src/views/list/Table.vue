<template>
  <div class="list-table">
    <v-container>
      <v-row>
        <!-- mini statistic start -->
        <v-col :cols="12" :sm="6" :lg="3">
          <mini-statistic
            icon="项目数量"
            title="2"
            sub-title="总数"
            color="indigo"
          />
        </v-col>
        <v-col :cols="12" :sm="6" :lg="3">
          <mini-statistic
            icon="锚固监测仪"
            title="151"
            sub-title="Connections"
            color="red"
          />
        </v-col>
        <v-col :cols="12" :sm="6" :lg="3">
          <mini-statistic
            icon="IAM202"
            title="203"
            sub-title="Followers"
            color="light-blue"
          />
        </v-col>
        <v-col :cols="12" :sm="6" :lg="3">
          <mini-statistic
            icon="IAE702"
            title="502"
            sub-title="Shots"
            color="purple"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="12" lg="6" :sm="12">
          <v-card>
            <v-toolbar flat>
              <v-toolbar-title>锚固监测仪</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <e-chart
                :path-option="[
                  ['dataset.source', dataset.campaign],
                  [
                    'color',
                    [
                      color.amber.base,
                      color.indigo.base,
                      color.pink.base,
                      color.green.base,
                      color.teal.base,
                      color.purple.base,
                    ],
                  ],
                  ['legend.orient', 'horizontal'],
                  ['legend.y', 'bottom'],
                  ['xAxis.show', false],
                  ['yAxis.show', false],
                  ['series[0].type', 'pie'],
                  ['series[0].avoidLabelOverlap', true],
                  ['series[0].radius', ['50%', '70%']],
                ]"
                height="350px"
                width="100%"
              ></e-chart>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col :cols="12" lg="6" :sm="12">
          <v-card tile >
            <v-toolbar flat>
              <v-toolbar-title>倾角监测仪</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <e-chart
                :path-option="[
                  ['dataset.source', dataset.inclineData],
                  [
                    'color',
                    [
                      color.lightBlue.base,
                      color.indigo.base,
                      color.pink.base,
                      color.green.base,
                      color.cyan.base,
                      color.teal.base,
                    ],
                  ],
                  ['legend.orient', 'horizontal'],
                  ['legend.y', 'bottom'],
                  ['xAxis.show', false],
                  ['yAxis.show', false],
                  ['series[0].type', 'pie'],
                ]"
                height="350px"
                width="100%"
              ></e-chart>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EChart from '@/components/chart/echart'
import {
  StackData,
  SinData,
  monthVisitData,
  campaignData,
  locationData,
  inclineData,
} from '@/api/chart'

import Material from 'vuetify/es5/util/colors'
/* import MiniChart from '@/components/widgets/chart/MiniChart' */
/* import BoxChart from '@/components/widgets/chart/BoxChart' */
import CircleStatistic from '@/components/widgets/statistic/CircleStatistic'
import MiniStatistic from '@/components/widgets/statistic/MiniStatistic'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
/* import Util from '@/util' */

export default {
  components: {
    /* CircleStatistic, */
    MiniStatistic,
    EChart,
  },

  data() {
    return {
      selectedTab: 'tab-1',
      option: null,
      dataset: {
        sinData: SinData,
        monthVisit: monthVisitData,
        campaign: campaignData,
        location: locationData,
        stackData: StackData,
        inclineData: inclineData,
      },
      color: Material,

      dialog: false,
      search: '',
      trending: [
        {
          subheading: '项目',
          headline: '3',
          caption: '使用中',
          percent: 15,
          icon: {
            label: 'mdi-view-list',
            color: 'info',
          },
          linear: {
            value: 3,
            color: 'info',
          },
        },
      ],
    }
  },
  computed: {
    ...mapState({
      projects: (state) => state.project.projects,
      projectType: (state) => state.project.projectTypes,
      companies: (state) => state.company.companies,
    }),
    ...mapGetters(['getProjectType', 'getCompanyName']),
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.fetchProjects().then((data) => {
        console.log(data)
        this.fetchCompanies().then((data) => {
          console.log(data)
          this.fetchNodes().then((data) => {
            console.log(data)
            this.fetchNodeDatas({ page: 1, per_page: 20000 }).then((data) => {
              console.log(data)
            })
          })
        })
      })
    },
    ...mapActions([
      'fetchProjects',
      'fetchNodes',
      'fetchCompanies',
      'fetchNodeDatas',
    ]),
  },
}
</script>
