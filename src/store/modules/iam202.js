import Vue from 'vue'
import { fetchIam202Datas, fetchLastDatas } from '@/api/service'

const state = {
  iam202Datas: [],
  iam202LastDatas: [],
  iam202DataProcessed:[],
}

const getters = {
}

const actions = {
  fetchIam202Datas({ commit }, query) {
    return fetchIam202Datas(query).then((resp) => {
      commit('SET_IAM202DATAS', resp)
      return resp
    })
  },

  fetchLastDatas({ commit }, query) {
    return fetchLastDatas(query).then((resp) => {
      commit('SET_IAM202_LAST_DATAS', resp)
      return resp
    })
  },
}

const mutations = {
  SET_IAM202DATAS(state, data) {
    state.iam202Datas = data
  },
  SET_IAM202_LAST_DATAS(state, data) {
    state.iam202LastDatas = data
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
