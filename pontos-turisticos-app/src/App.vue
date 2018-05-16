<template>
  <v-app>
    <v-toolbar color="secondary">
      <v-toolbar-title class="toolbar-title" v-text="title"></v-toolbar-title>
      <v-spacer class="hidden-xs-only"></v-spacer>
      <v-text-field
         prepend-icon="search"
         placeholder="Buscar atração...">
      </v-text-field>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'

  export default {  
    data () {
      return {
        title: 'Pontos turísticos'
      }
    },
    name: 'App'
  }
</script>

<style scoped>
  .toolbar-title{
    color: #1c3d90
  }
</style>
