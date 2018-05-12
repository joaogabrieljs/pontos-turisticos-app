<template>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-for="atracao in atracoes" :key="atracao.id">
        <v-card-media
          src='https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg'
          height="200px"
        >
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{atracao.nome}}</div>
            <span class="grey--text">{{atracao.descricao}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="purple">Comentar</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
</template>

<script>
    import { mapState } from 'vuex'
    
    export default {
      name: 'ListaAtracoes',
      computed: mapState([
          'atracoes'
      ]),
      mounted: function () {
          this.$store.dispatch('getAtracoes')
      },
      data: () => ({
          show: false,
          hidden: false
          })
    }
</script>

<style scoped>
</style>