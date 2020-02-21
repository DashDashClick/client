import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomName: '',
    userName: '',
    winner: {},
    result: ''
  },
  mutations: {
    setUsername (state, data) {
      state.userName = data
    },
    CHECK_RESULT (state, data) {
      state.winner = data.payload
      state.result = data.hasil
    }
  },
  actions: {
  },
  modules: {
  }
})
