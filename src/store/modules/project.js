import Vue from 'vue';
import {
  fetchProjects,
  getProjectById,
  deleteProject,
  createProject,
  updateProject
} from '@/api/service'

const state = {
  projects: [],
    projectTypes: [
    {text:'演示项目', value:1},
    {text:'试用项目', value:2},
    {text:'合同项目', value:3}
  ],
}

const getters = {
    getProjectType: (state) => (value) => {
    return state.projectTypes.find(item => item.value == value).text;
  },

  getProjectName: (state) => (id) => {
    if (id === null) return '';
    if (state.projects.length == 0) return '';
    return state.projects.find(item => item.id == id).name;
  },
}

const actions = {
  fetchProjects({ commit }, query) {
    return fetchProjects(query).then((resp) => {
      commit('SET_PROJECTS', resp)
      return resp
    })
  },
  getProjectById({ commit }, id) {
    return getProjectById(id).then((resp) => {
      commit('UPDATE_PROJECT', resp)
      return resp
    })
  },
  createProject({ commit }, data) {
    return createProject(data).then((resp) => {
      commit('ADD_PROJECT', resp)
      return resp
    })
  },
  updateProject({ commit }, { id, data }) {
    return updateProject(id, data).then((resp) => {
      commit('UPDATE_PROJECT', resp)
      return resp
    })
  },

  deleteProject({ commit }, id) {
    return deleteProject(id).then((resp) => {
      commit('DELETE_PROJECT', resp)
      return resp
    })
  }
}
const mutations = {
  SET_PROJECTS(state, data) {
    state.projects = data
  },
  DELETE_PROJECT(state, data) {
    state.projects = state.projects.filter((item) => item.id !== data.id)
  },
  UPDATE_PROJECT(state, data) {
    let index = state.projects.findIndex(item => item.id == data.id);
    Vue.set(state.projects, index, data);
  },
  ADD_PROJECT(state, item) {
    state.projects.push(item);
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
