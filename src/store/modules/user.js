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
    {name: 'please open google console'}
  ],
  roles: [
    {text:'超级管理员', value:3},
    {text:'管理员', value:2},
    {text:'普通用户', value:1}
  ],
  powers: [
    {
      role: 3,
      assignment: '是',
      disposition:'是',
      manageItem: '是',
      update: '是',
      manageUser: '是',
    },
    {
      role: 2,
      assignment: '是',
      disposition:'是',
      manageItem: '是',
      update: '否',
      manageUser: '否',
    },
    {
      role: 1,
      assignment: '否',
      disposition:'否',
      manageItem: '否',
      update: '否',
      manageUser: '否',
    }
  ]
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
      console.log(resp)
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
    console.log(data);
    data.forEach(item => Object.assign(item,state.powers.find(ite => item.role == ite.role)))
    state.users = data
  },
  DELETE_USER(state, data) {
    console.log(data);
    state.users = state.users.filter((item) => item.id !== data.id);
  },
  UPDATE_USER(state, data) {
    let index = state.users.findIndex(item => item.id == data.id);
    Object.assign(data,state.powers.find(item => item.role == data.role))
    Vue.set(state.users, index, data);
  },
  ADD_USER(state, data) {
    Object.assign(data,state.powers.find(item => item.role == data.role))
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
