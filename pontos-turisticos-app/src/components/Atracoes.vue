<template>
    <v-flex xs12 sm6 offset-sm3>
      <v-spacer class="hidden-xs-only"></v-spacer>
        <v-spacer></v-spacer>
      <v-card v-for="atracao in atracoes" :key="atracao.id">
        <v-card-media
          src='https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg'
          height="200px"
        >
        </v-card-media>
        <v-card-title primary-title>
          <span class="headline">
            {{atracao.nome}}
          </span>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-tooltip bottom>
              <v-btn slot="activator" icon @click="showUpdateDialog(atracao)">
              <v-icon>edit</v-icon>
              </v-btn>
              <span>Editar atração</span>
            </v-tooltip>
            <v-tooltip bottom>
              <v-btn slot="activator" icon @click="showDeleteDialog(atracao)">
                <v-icon>delete</v-icon>
              </v-btn>
              <span>Excluir atração</span>
            </v-tooltip>
          </v-card-actions>
          <v-flex xs12 sm12>
            <star-rating 
              v-if="avaliacoes[atracoes.indexOf(atracao)]"
              :rating="new Number(avaliacoes.find(avaliacao => avaliacao.id === atracao.id).nota)"
              class="custom-text"
              v-bind:star-size="15"
              v-bind:increment="0.1"
              :read-only="true"
              >
            </star-rating>
          </v-flex>
          <v-flex xs12 sm12>
            <span class="grey--text">{{atracao.descricao}}</span>
          </v-flex>
          <v-flex xs12 sm12>
            <span v-if="comentarios[atracoes.indexOf(atracao)]">
              Seu comentário: "<em>{{comentarios.find(comentario => comentario.id === atracao.id).comentario}}</em>"
            </span>
            <v-divider></v-divider>
          </v-flex>       
          <v-flex xs12 sm12>
            <span v-if="enderecos[atracoes.indexOf(atracao)]">Endereço: 
            {{enderecos.find(endereco => endereco.id === atracao.id).linha1}},
            {{enderecos.find(endereco => endereco.id === atracao.id).cidade}} -
            {{enderecos.find(endereco => endereco.id === atracao.id).estado}} -
            {{enderecos.find(endereco => endereco.id === atracao.id).pais}}, 
            {{enderecos.find(endereco => endereco.id === atracao.id).linha2}}</span>
          </v-flex>
          <v-flex xs12 sm12>
            <span>Horário de funcionamento: {{atracao.horario_func}}</span>
          </v-flex>
          <v-flex xs12 sm12>
            <span>Idade mínima: {{atracao.idade_minima}} anos</span>
          </v-flex>
        </v-card-title>
      </v-card>
      <v-dialog v-model="deleteDialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Confirmar exclusão da atração "{{atracao.nome}}"?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="light-blue darken-4" flat="flat" @click.native="deleteDialog = false">Cancelar</v-btn>
              <v-btn color="red" flat="flat" @click.native="deleteAtracao()">Excluir</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
      <v-dialog v-model="updateDialog" max-width="580">
          <v-card>
            <v-card-title class="headline">Atualizar atração</v-card-title>
            <v-card-text>
              <v-flex xs12 sm12>
                  <v-text-field id="nome" v-model="atracao.nome" label="Nome" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-text-field id="descricao" v-model="atracao.descricao" label="Descrição" required multi-line ></v-text-field>
              </v-flex>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="light-blue darken-4" flat="flat" @click.native="updateDialog = false">Cancelar</v-btn>
              <v-btn color="light-blue darken-4" flat="flat" @click.native="updateAtracao()">Atualizar</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
    </v-flex>
</template>

<script>
    import { mapState } from 'vuex'
    
    export default {
      name: 'ListaAtracoes',
      computed: mapState([
          'atracoes',
          'enderecos',
          'comentarios',
          'avaliacoes'
      ]),
      mounted: function () {
          this.$store.dispatch('getAtracoes')
          this.$store.dispatch('getEnderecos')
          this.$store.dispatch('getComentarios')
          this.$store.dispatch('getAvaliacoes')
      },
      data: () => ({
          show: false,
          hidden: false,
          alert: false,
          nota: null,
          endereco: null,
          deleteDialog: false,
          updateDialog: false,
          atracao: {
            id: null,
            nome: null,
            descricao: null,
            horario_func: null,
            idade_minima: null
          },
          searchText: ''
      }),
      methods: {
        showDeleteDialog(atracao) {
          this.atracao = atracao
          this.deleteDialog = true
        },
        showUpdateDialog(atracao) {
          this.atracao = atracao
          this.updateDialog = true
        },
        deleteAtracao() {
          this.$store.dispatch('deleteAtracao', this.atracao)
          this.$store.dispatch('deleteEndereco', this.atracao.id)
          this.$store.dispatch('deleteComentario', this.atracao.id)
          this.$store.dispatch('deleteAvaliacao', this.atracao.id)
          this.deleteDialog = false
        },
        updateAtracao() {
          this.$store.dispatch('updateAtracao', this.atracao)
          this.updateDialog = false
        }
      }
    }
</script>

<style scoped>
  .custom-text {
    font-weight: bold;
    color: #999;
  }
</style>