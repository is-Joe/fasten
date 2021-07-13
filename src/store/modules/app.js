import Vue from 'vue';
import colors from 'vuetify/es5/util/colors';

const state = {
  mode: 'light',
  themeColor: 'pink',

  // app应用数据变量
  nodeData: [],
}

// getters
const getters = {
  getThemeColor: (state) => {
    return colors[state.themeColor].base;
  },
}

// actions
const actions = {
};

// mutations
const mutations = {
  setThemeColor(state, payload) {
    state.themeColor = payload;
  },

  // 终端ID表
  USER_LIST(state, payload) {
    state.users = payload;
  },

  USER_CREATE(state, payload) {
    state.users.push(payload);
  },

  USER_UPDATE(state, item) {
    Vue.set(state.users, item.index, item.data);
  },

  USER_DELETE(state, index) {
    state.users.splice(index, 1);
  },

}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
