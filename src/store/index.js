import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomName: '',
    userName: ''
  },
  mutations: {
    SET_USER_NAME (state, data) {
      state.userName = data
    }
  },
  actions: {
  },
  modules: {
  }
})
