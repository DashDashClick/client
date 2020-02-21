import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomName: '',
    userName: ''
  },
  mutations: {
    setUsername (state, data) {
      state.userName = data
    }
  },
  actions: {
  },
  modules: {
  }
})
