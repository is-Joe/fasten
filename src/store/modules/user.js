import Vue from 'vue';
import {
  fetchUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser
} from '@/api/service'

const state = {
  users: [
    {
      id: '',
      cid: '1',
      role: 1,
      name: '小陈',
      assignment: false,
      disposition: false,
      manageItem: false,
      update: false,
      manageUser: false,
      notes: '已经上线'
    }
  ],
  roles: [
    {text:'管理员', value:1},
    {text:'超级管理员', value:2},
    {text:'普通用户', value:3}
  ],
}
const getters = {
  getUserRole: (state) => (value) => {
    if (!value) return ''
    return state.roles.find(item => item.value == value).text;
  },

}
const actions = {
  fetchUsers({ commit }, query) {
    return fetchUsers(query).then((resp) => {
      commit('SET_USERS', resp)
      return resp
    })
  },
  getUserById({ commit }, id) {
    return getUserById(id).then((resp) => {
      commit('UPDATE_USER', resp)
      return resp
    })
  },
  createUser({ commit }, data) {
    return createUser(data).then((resp) => {
      commit('ADD_USER', resp)
      return resp
    })
  },
  updateUser({ commit }, { id, data }) {
    return updateUser(id, data).then((resp) => {
      commit('UPDATE_USER', resp)
      return resp
    })
  },

  deleteUser({ commit }, id) {
    return deleteUser(id).then((resp) => {
      commit('DELETE_USER', resp)
      return resp
    })
  }
}
const mutations = {
  SET_USERS(state, data) {
    state.users = data
  },
  DELETE_USER(state, data) {
    state.users = state.users.filter((item) => item.id !== data.id);
  },
  UPDATE_USER(state, data) {
    let index = state.users.findIndex(item => item.id == data.id);
    Vue.set(state.users, index, data);
  },
  ADD_USER(state, data) {
    state.users.push(data);
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
