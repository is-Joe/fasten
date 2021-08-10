import Vue from 'vue';
import {
  fetchCompanies,
  getCompanyById,
  deleteCompany,
  createCompany,
  updateCompany
} from '@/api/service'

const state = {
  companies: [],
}

const getters = {
  getCompanyName: (state) => (id) => {
    if (!id) return ''
    if (state.companies.length == 0) return '';
    return name = state.companies.find(item => item.id == id).name;
    
  },
}

const actions = {
  fetchCompanies({ commit }, query) {
    return fetchCompanies(query).then((resp) => {
      commit('SET_COMPANIES', resp)
      return resp
    })
  },
  getCompanyById({ commit }, id) {
    return getCompanyById(id).then((resp) => {
      commit('UPDATE_COMPANY', resp)
      return resp
    })
  },
  createCompany({ commit }, data) {
    return createCompany(data).then((resp) => {
      commit('ADD_COMPANY', resp)
      return resp
    })
  },
  updateCompany({ commit }, { id, data }) {
    return updateCompany(id, data).then((resp) => {
      commit('UPDATE_COMPANY', resp)
      return resp
    })
  },

  deleteCompany({ commit }, id) {
    return deleteCompany(id).then((resp) => {
      commit('DELETE_COMPANY', resp)
      return resp
    })
  }
}
const mutations = {
  SET_COMPANIES(state, data) {
    state.companies = data
  },
  DELETE_COMPANY(state, data) {
    state.companies = state.companies.filter((item) => item.id !== data.id)
  },
  UPDATE_COMPANY(state, data) {
    Vue.set(state.companies, data.index, data.data);
  },
  ADD_COMPANY(state, data) {
    // state.companies = state.companies.filter((item) => item.id !== data.id)
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
