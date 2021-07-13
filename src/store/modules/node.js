import Vue from 'vue';
import {
  fetchNodes,
  getNodeById,
  deleteNode,
  createNode,
  updateNode
} from '@/api/service'

const state = {
  nodes: [],
  nodeTypes: [
    {text:'基本压力型', value:1},
    {text:'基本倾斜型', value:2},
    // {text:'增强压力型', value:3},
    // {text:'综合型', value:4},
  ],
  sensorTypes: [
    {text:'压力', value:1},
    {text:'倾斜', value:2},
  ],
}

const getters = {
  getNodeType: (state) => (value) => {
    return state.nodeTypes.find(item => item.value == value).text;
  },

  getSensorType: (state) => (value) => {
    return state.sensorTypes.find(item => item.value == value).text;
  },

  getNodeName: (state) => (id) => {
    if (!state.nodes) return '';
    return state.nodes.find(item => item.id == id).name;
  },
}

const actions = {
  fetchNodes({ commit }, query) {
    return fetchNodes(query).then((resp) => {
      commit('SET_NODES', resp)
      return resp
    })
  },
  getNodeById({ commit }, id) {
    return getNodeById(id).then((resp) => {
      commit('UPDATE_NODE', resp)
      return resp
    })
  },
  createNode({ commit }, data) {
    return createNode(data).then((resp) => {
      commit('ADD_NODE', resp)
      return resp
    })
  },
  updateNode({ commit }, { id, data }) {
    return updateNode(id, data).then((resp) => {
      commit('UPDATE_NODE', resp)
      return resp
    })
  },

  deleteNode({ commit }, id) {
    return deleteNode(id).then((resp) => {
      commit('DELETE_NODE', resp)
      return resp
    })
  }
}
const mutations = {
  SET_NODES(state, data) {
    state.nodes = data
  },
  DELETE_NODE(state, data) {
    state.nodes = state.nodes.filter((item) => item.id !== data.id)
  },
  UPDATE_NODE(state, data) {
    let index = state.nodes.findIndex(item => item.id == data.id);
    Vue.set(state.nodes, index, data);
  },
  ADD_NODE(state, item) {
    state.nodes.push(item);
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
