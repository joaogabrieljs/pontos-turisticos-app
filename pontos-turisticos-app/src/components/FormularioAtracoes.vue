<template>
  <v-layout row justify-center>
    <v-btn
        color="yellow"
        bottom
        right
        fab
        fixed
        @click.native.stop="dialog = !dialog"
        >
        <v-icon color="light-blue darken-4">add</v-icon>
    </v-btn>  
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Cadastrar atrações</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Fechar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
    export default {
        data: () => ({
            dialog: false
        })
    }
</script>

<style scoped>
</style>