import Vue from 'vue';
import {
  fetchNodeParamsA,
  deleteNodeParamA,
  createNodeParamA,
  updateNodeParamA,

  fetchNodeParamsB,
  deleteNodeParamB,
  createNodeParamB,
  updateNodeParamB,
} from '@/api/service'

const state = {
  nodeparamsa: [],
  nodeparamsb: [],
  nodeParamState: [
    {text:'终端上报', value:1, color:"green"},
    {text:'用户修改', value:2, color:"orange"},
  ],
  nodeInit: [
    {text:'未初始化', value:1, color:"red"},
    {text:'已初始化', value:2, color:"green"},
  ],
}

const getters = {
  getNodeParamState: (state) => (value) => {
    return state.nodeParamState.find(item => item.value == value);
  },

  getNodeInitState: (state) => (value) => {
    return state.nodeInit.find(item => item.value == value);
  },

  getNodeParamBById: (state) => (node_id) => {
    return state.nodeparamsb.find(item => item.node_id == node_id);
  },
}

const actions = {
  fetchNodeParamsA({ commit }, query) {
    return fetchNodeParamsA(query).then((resp) => {
      commit('SET_NODEPARAMS_A', resp)
      return resp
    })
  },

  createNodeParamA({ commit }, data) {
    return createNodeParamA(data).then((resp) => {
      commit('ADD_NODEPARAM_A', resp)
      return resp
    })
  },

  updateNodeParamA({ commit }, { id, data }) {
    return updateNodeParamA(id, data).then((resp) => {
      commit('UPDATE_NODEPARAM_A', resp)
      return resp
    })
  },

  deleteNodeParamA({ commit }, id) {
    return deleteNodeParamA(id).then((resp) => {
      commit('DELETE_NODEPARAM_A', resp)
      return resp
    })
  },

  fetchNodeParamsB({ commit }, query) {
    return fetchNodeParamsB(query).then((resp) => {
      commit('SET_NODEPARAMS_B', resp)
      return resp
    })
  },

  createNodeParamB({ commit }, data) {
    return createNodeParamB(data).then((resp) => {
      commit('ADD_NODEPARAM_B', resp)
      return resp
    })
  },

  updateNodeParamB({ commit }, { id, data }) {
    return updateNodeParamB(id, data).then((resp) => {
      commit('UPDATE_NODEPARAM_B', resp)
      return resp
    })
  },

  deleteNodeParamB({ commit }, id) {
    return deleteNodeParamB(id).then((resp) => {
      commit('DELETE_NODEPARAM_B', resp)
      return resp
    })
  },
}

const mutations = {
  SET_NODEPARAMS_A(state, data) {
    state.nodeparamsa = data
  },
  DELETE_NODEPARAM_A(state, data) {
    state.nodeparamsa = state.nodeparamsa.filter((item) => item.id !== data.id)
  },
  UPDATE_NODEPARAM_A(state, data) {
    let index = state.nodeparamsa.findIndex(item => item.id == data.id);
    Vue.set(state.nodeparamsa, index, data);
  },
  ADD_NODEPARAM_A(state, item) {
    state.nodeparamsa.push(item);
  },

  SET_NODEPARAMS_B(state, data) {
    state.nodeparamsb = data
  },
  DELETE_NODEPARAM_B(state, data) {
    state.nodeparamsb = state.nodeparamsb.filter((item) => item.id !== data.id)
  },
  UPDATE_NODEPARAM_B(state, data) {
    let index = state.nodeparamsb.findIndex(item => item.id == data.id);
    Vue.set(state.nodeparamsb, index, data);
  },
  ADD_NODEPARAM_B(state, item) {
    state.nodeparamsb.push(item);
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
