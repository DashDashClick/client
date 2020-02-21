import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomName: '',
    userName: '',
    winner: {}
  },
  mutations: {
    setUsername (state, data) {
      state.userName = data
    },
    SET_WINNER (state, data) {
      state.winner = data
    }
  },
  actions: {
  },
  modules: {
  }
})
