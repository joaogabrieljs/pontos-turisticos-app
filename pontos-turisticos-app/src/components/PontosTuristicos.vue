<template>
  <v-container fluid>
  <v-layout row>
    <lista-atracoes></lista-atracoes>
    <formulario-atracoes></formulario-atracoes>
  </v-layout>
  </v-container>
</template>

<script>
  import Atracoes from './Atracoes.vue'
  import FormularioAtracoes from './FormularioAtracoes.vue'

  export default {

    components: {
      'lista-atracoes': Atracoes,
      'formulario-atracoes': FormularioAtracoes
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
