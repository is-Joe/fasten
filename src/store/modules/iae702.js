import Vue from 'vue';
import {
  fetchIae702s,
  getIae702ById,
  deleteIae702,
  createIae702,
  updateIae702
} from '@/api/service'

const state = {
  iae702Types: [
    {text:'基本压力型', value:1},
    {text:'基本倾斜型', value:2},
    // {text:'增强压力型', value:3},
    // {text:'综合型', value:4},
    {text:'无线网关型', value:3},
  ],
  iae702s: [],
}

const getters = {
  getIae702Type: (state) => (value) => {
    return state.iae702Types.find(item => item.value == value).text;
  },

  getIae702Name: (state) => (id) => {
    if (!state.iae702s) return '';
    return state.iae702s.find(item => item.id == id).name;
  },
}

const actions = {
  fetchIae702s({ commit }, query) {
    return fetchIae702s(query).then((resp) => {
      commit('SET_IAE702S', resp)
      return resp
    })
  },
  getIae702ById({ commit }, id) {
    return getIae702ById(id).then((resp) => {
      commit('UPDATE_IAE702', resp)
      return resp
    })
  },
  createIae702({ commit }, data) {
    return createIae702(data).then((resp) => {
      commit('ADD_IAE702', resp)
      return resp
    })
  },
  updateIae702({ commit }, { id, data }) {
    return updateIae702(id, data).then((resp) => {
      commit('UPDATE_IAE702', resp)
      return resp
    })
  },

  deleteIae702({ commit }, id) {
    return deleteIae702(id).then((resp) => {
      commit('DELETE_IAE702', resp)
      return resp
    })
  }
}
const mutations = {
  SET_IAE702S(state, data) {
    state.iae702s = data
  },
  DELETE_IAE702(state, data) {
    state.iae702s = state.iae702s.filter((item) => item.id !== data.id)
  },
  UPDATE_IAE702(state, data) {
    let index = state.iae702s.findIndex(item => item.id == data.id);
    Vue.set(state.iae702s, index, data);
  },
  ADD_IAE702(state, item) {
    state.iae702s.push(item);
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
