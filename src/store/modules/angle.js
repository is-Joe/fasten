// import Vue from 'vue'
import {
    fetchAngle
}from '@/api/service'

const state = {
    angleData:[],
}
const getters = {

}
const actions = {
    getAngle({commit},query) {
        return fetchAngle(query).then((resp)=>{
            commit('SET_ANGLE',resp)
            return resp
        })  
    }
}
const mutations = {
    SET_ANGLE(state, data) {
        state.angleData = data
      },
}
export default {
    state,
    getters,
    actions,
    mutations
  }
  