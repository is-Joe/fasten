import Vue from 'vue'
import { fetchNodeDatas, fetchLastDatas } from '@/api/service'

const state = {
  nodeDatas: [],
  nodeLastDatas: [],
  alarmPress: [
    { text: '压力正常', value: 1, level: 'LEVEL_NORMAL', color: 'green' },
    { text: '轻微松动', value: 2, level: 'LEVEL_LOOSE_1', color: 'yellow' },
    { text: '严重松动', value: 3, level: 'LEVEL_LOOSE_2', color: 'red' },
    { text: '轻微过压', value: 4, level: 'LEVEL_GUOYA_1', color: 'yellow' },
    { text: '严重过压', value: 5, level: 'LEVEL_GUOYA_2', color: 'red' },
  ],

  alarmIncline: [
    { text: '倾斜正常', value: 1, level: 'LEVEL_INCLINE_NORMAL', color: 'green' },
    { text: '轻微倾斜', value: 2, level: 'LEVEL_INCLINE_1', color: 'yellow' },
    { text: '严重倾斜', value: 3, level: 'LEVEL_INCLINE_2', color: 'red' },
  ],
}

const getters = {
  getAlarmById: (state) => (value) => {
    var ret = state.alarmPress.find((item) => item.level == value)
    if (ret != undefined) {
      return ret
    }

    console.log(ret)
    return state.alarmIncline.find((item) => item.level == value)
  },

}

const actions = {
  fetchNodeDatas({ commit }, query) {
    return fetchNodeDatas(query).then((resp) => {
      var res = resp.map((item) => {
        let data = JSON.parse(item.data)
        item.data = data.sensor
        return item
      })
      commit('SET_NODEDATAS', res)
      return res
    })
  },

  fetchLastDatas({ commit }, query) {
    return fetchLastDatas(query).then((resp) => {
      commit('SET_NODE_LAST_DATAS', resp)
      return resp
    })
  },
}
const mutations = {
  SET_NODEDATAS(state, data) {
    state.nodeDatas = data
  },
  SET_NODE_LAST_DATAS(state, data) {
    state.nodeLastDatas = data
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
