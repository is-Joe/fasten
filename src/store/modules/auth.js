// https://github.com/ErikCH/VuexModules/blob/master/src/state/modules/auth.js
// export default {
//   state: {
//     uid: '',
//     username: '',
//     userRole: 0,
//     token: localStorage.getItem('JWT_TOKEN') ? localStorage.getItem('JWT_TOKEN') : ''
//   },

//   getters: {
//     uid: state => state.uid,
//     username: state => state.username,
//     userRole: state => state.userRole,
//     token: state => state.token
//   },

//   actions: {
//   },

//   mutations: {
//     LOG_OUT(state) {
//       state.token = '';
//       state.uid = '';
//       state.username = '';
//       state.userRole = 0,
//       localStorage.removeItem('JWT_TOKEN');
//     },

//     LOG_IN(state, data) {
//       state.username = data.name;
//       state.uid = data.uid;
//       state.userRole = data.role;
//       state.token = data.token;
//       localStorage.setItem('JWT_TOKEN', data.token);
//     }
//   }
// }

import { login } from '@/api/service'

const state = {
  access_token: null
}
const getters = {
  getAccessToken: (state) => {
    return state.access_token
  }
}
const actions = {
  login({ commit }, payload) {
    return login(payload).then((data) => {
      console.log(data)
      commit('SET_ACCESS_TOKEN', data.token)
    })
  },
  logout({ commit }) {
    commit('SET_ACCESS_TOKEN', null)
  }
}
const mutations = {
  SET_ACCESS_TOKEN(state, token) {
    state.access_token = token
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
