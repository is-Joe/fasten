import Vue from 'vue'
import router from './router/'
import store from './store/'
import './registerServiceWorker'
import './plugins/vuetify'
import './theme/default.sass'

import App from './App.vue'
import vuetify from './plugins/vuetify'

import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css

import echarts from './plugins/echartsUI'

// import axios from 'axios'

Vue.prototype.axios = axios

Vue.use(ElementUI) //使用elementUI

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
})

app.$mount('#app')


//this is test welcome 7/14
// welcome



Vue.prototype.$echarts = echarts


