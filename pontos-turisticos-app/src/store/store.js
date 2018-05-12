import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    atracoes: []
  },
  actions: {
    getAtracoes: function ({ commit }) {
      axios.get('https://cors-anywhere.herokuapp.com/https://pontosturisticosmarcio.herokuapp.com/atracoes/')
      .then((response) => {
        commit('SET_ATRACOES_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    SET_ATRACOES_LIST: (state, { list }) => {
      state.atracoes = list
    }
  },
  getters: {
    openAtracoes: state => {
      return state.atracoes
    }
  }
})
export default store