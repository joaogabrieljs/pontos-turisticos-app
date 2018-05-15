import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseUrl = 'https://cors-anywhere.herokuapp.com/https://pontosturisticosmarcio.herokuapp.com/';

const store = new Vuex.Store({
  state: {
    atracoes: [],
    enderecos: [],
    endereco: {},
    avaliacao: {},
    comentario: {},
    localizacao: {}
  },
  actions: {
    getAtracoes: function ({ commit }) {
      axios.get(baseUrl + 'atracoes/').then((response) => {
        commit('SET_ATRACOES_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    addAtracao: function ({commit}, atracao) {
        let avaliacao = {user: 1, nota: 0}
        let comentario = {usuario: 1, comentario: '.', aprovado: true}
        console.log(atracao)
        axios.all([
            axios.post(baseUrl + 'atracoes/', atracao),
            axios.post(baseUrl + 'avaliacoes/', avaliacao),
            axios.post(baseUrl + 'comentarios/', comentario)
        ])
        .then(axios.spread((atracaoResponse) => {
            console.log(atracaoResponse.data)
            commit('ADD_NEW_ATRACAO', { atracao: atracaoResponse.data })
        }))
        /*console.log(atracao)
        axios.post(baseUrl + 'atracoes/', atracao).then((response) => {
            commit('ADD_NEW_ATRACAO', { atracao : response.data })
        }).catch(error => {
            console.log(error.response)
        })*/
    },
    addEndereco: function({commit}, endereco) {
        axios.post(baseUrl + 'enderecos/', endereco).then((response) => {
            commit('ADD_NEW_ENDERECO', { endereco : response.data })
        }, (err) => {
            console.log(err.response)
        })
    },
    getEnderecos: function ({ commit }) {
        axios.get(baseUrl + 'enderecos/').then((response) => {
          commit('SET_ENDERECOS_LIST', { list: response.data })
        }, (err) => {
          console.log(err)
        })
      },
    setLocalizacao: function({commit}, localizacao) {
        commit('SET_Localizacao', localizacao)
    }
  },
  mutations: {
    SET_ATRACOES_LIST: (state, { list }) => {
      state.atracoes = list
    },
    ADD_NEW_ATRACAO: (state, { atracao }) => {
        state.atracoes.push(atracao)
    },
    ADD_NEW_ENDERECO: (state, { endereco }) => {
        state.endereco = endereco
    },
    SET_ENDERECOS_LIST: (state, { list }) => {
        state.enderecos = list
    },
    SET_Localizacao: (state, localizacao ) => {
        state.localizacao = localizacao
    }
  },
  getters: {
    getLocalizacao: state => {
        return state.localizacao
    }
  }
})

export default store