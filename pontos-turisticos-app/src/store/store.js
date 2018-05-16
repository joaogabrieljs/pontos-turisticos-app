import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseUrl = 'https://cors-anywhere.herokuapp.com/https://pontosturisticosmarcio.herokuapp.com/';

const store = new Vuex.Store({
  state: {
    atracoes: [],
    enderecos: [],
    comentarios: [],
    avaliacoes: [],
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
    addAtracao: function({commit}, atracao) {
        axios.post(baseUrl + 'atracoes/', atracao).then((response) => {
            commit('ADD_NEW_ATRACAO', { atracao : response.data })
        }, (err) => {
            console.log(err.response)
        })
    },
    updateAtracao: function({commit}, atracao) {
        axios.put(baseUrl + 'atracoes/' + atracao.id + '/', atracao).then((response) => {
            commit('UPDATE_ATRACAO', { atracao : response.data })
        }, (err) => {
            console.log(err.response)
        })
    },
    deleteAtracao: function({commit}, atracao) {
        axios.delete(baseUrl + 'atracoes/' + atracao.id + '/').then((response) => {
            commit('DELETE_ATRACAO', { atracao : response.data })
        }, (err) => {
            console.log(err.response)
        })
    },
    addEndereco: function({commit}, endereco) {
        axios.post(baseUrl + 'enderecos/', endereco).then((response) => {
            commit('ADD_NEW_ENDERECO', { endereco : response.data })
        }, (err) => {
            console.log(err.response)
        })
    },
    deleteEndereco: function({commit}, id) {
        axios.delete(baseUrl + 'enderecos/' + id + '/').then((response) => {
            commit('DELETE_ENDERECO', { endereco : response.data })
        }, (err) => {
            console.log(err.response)
        })
    },
    addComentario: function({commit}, comentario) {
        axios.post(baseUrl + 'comentarios/', comentario).then((response) => {
            commit('ADD_NEW_COMENTARIO', { comentario : response.data })
        }, (err) => {
            console.log(err.response)
        })
    },
    deleteComentario: function({commit}, id) {
        axios.delete(baseUrl + 'comentarios/' + id + '/').then((response) => {
            commit('DELETE_COMENTARIO', { comentario : response.data })
        }, (err) => {
            console.log(err.response)
        })
    },
    addAvaliacao: function({commit}, avaliacao) {
        axios.post(baseUrl + 'avaliacoes/', avaliacao).then((response) => {
            commit('ADD_NEW_AVALIACAO', { avaliacao : response.data })
        }, (err) => {
            console.log(err.response)
        })
    },
    deleteAvaliacao: function({commit}, id) {
        axios.delete(baseUrl + 'avaliacoes/' + id + '/').then((response) => {
            commit('DELETE_AVALIACAO', { avaliacao : response.data })
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
    getComentarios: function ({ commit }) {
        axios.get(baseUrl + 'comentarios/').then((response) => {
          commit('SET_COMENTARIOS_LIST', { list: response.data })
        }, (err) => {
          console.log(err)
        })
    },
    updateComentario: function({commit}, comentario) {
        axios.put(baseUrl + 'comentarios/' + comentario.id, comentario).then((response) => {
            commit('UPDATE_COMENTARIO', { comentario : response.data })
        }, (err) => {
            console.log(err)
        })
    },
    getAvaliacoes: function ({ commit }) {
        axios.get(baseUrl + 'avaliacoes/').then((response) => {
          commit('SET_AVALIACOES_LIST', { list: response.data })
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
    UPDATE_ATRACAO: (state, { atracao }) => {
        let index = state.atracoes.map(atracao => atracao.id).indexOf(atracao.id)
        state.atracoes.splice(index, 1, atracao)
    },
    DELETE_ATRACAO: (state, { atracao }) => {
        let index = state.atracoes.indexOf(atracao)
        state.atracoes.splice(index, 1)
    },
    ADD_NEW_ENDERECO: (state, { endereco }) => {
        state.enderecos.push(endereco)
    },
    DELETE_ENDERECO: (state, { endereco }) => {
        let index = state.enderecos.indexOf(endereco)
        state.enderecos.splice(index, 1)
    },
    ADD_NEW_COMENTARIO: (state, { comentario }) => {
        state.comentarios.push(comentario)
    },
    DELETE_COMENTARIO: (state, { comentario }) => {
        let index = state.comentarios.indexOf(comentario)
        state.comentarios.splice(index, 1)
    },
    ADD_NEW_AVALIACAO: (state, { avaliacao }) => {
        state.avaliacoes.push(avaliacao)
    },
    DELETE_AVALIACAO: (state, { avaliacao }) => {
        let index = state.avaliacoes.indexOf(avaliacao)
        state.avaliacoes.splice(index, 1)
    },
    SET_ENDERECOS_LIST: (state, { list }) => {
        state.enderecos = list
    },
    UPDATE_COMENTARIO: (state, { comentario }) => {
        let idx = state.comentarios.map(c => c.id).indexOf(comentario.id)
        state.projects.splice(idx, 1, comentario)
    },
    SET_COMENTARIOS_LIST: (state, { list }) => {
        state.comentarios = list
    },
    SET_AVALIACOES_LIST: (state, { list }) => {
        state.avaliacoes = list
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