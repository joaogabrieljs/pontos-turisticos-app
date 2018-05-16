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
      <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">Cadastrar atração</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs12>
                    <v-text-field id="nome" v-model="nome" label="Nome" required :rules="requiredRule"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field id="descricao" v-model="descricao" label="Descrição" required :rules="requiredRule" multi-line ></v-text-field>
                </v-flex>
                <v-flex xs11 sm3>
                    <v-menu
                        ref="menu1"
                        :close-on-content-click="false"
                        v-model="menu1"
                        :nudge-right="40"
                        :return-value.sync="horarioInicio"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                    >
                        <v-text-field
                        id="horarioInicio" 
                        v-model="horarioInicio"
                        slot="activator"
                        label="HH:MM"
                        prepend-icon="access_time"
                        readonly
                        required
                        :rules="requiredRule"
                        ></v-text-field>
                        <v-time-picker v-model="horarioInicio" @change="$refs.menu1.save(horarioInicio)"></v-time-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs1 sm1>
                    <v-text-field
                        name="time-range"
                        value="às"
                        disabled
                    ></v-text-field>
                </v-flex>
                <v-flex xs11 sm3>
                    <v-menu
                        ref="menu2"
                        :close-on-content-click="false"
                        v-model="menu2"
                        :nudge-right="40"
                        :return-value.sync="horarioFim"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                    >
                        <v-text-field
                        id="horarioFim" 
                        v-model="horarioFim"
                        slot="activator"
                        label="HH:MM"
                        prepend-icon="access_time"
                        readonly
                        required
                        :rules="requiredRule"
                        ></v-text-field>
                        <v-time-picker v-model="horarioFim" @change="$refs.menu2.save(horarioFim)"></v-time-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12 sm5>
                    <v-select
                    id="idadeMinima" 
                    v-model="idadeMinima"
                    :items="ages"
                    label="Idade mínima"
                    autocomplete
                    required
                    :rules="requiredRule"
                    ></v-select>
                </v-flex>
                <v-flex xs12 sm12>
                    <v-text-field 
                    textarea
                    label="Deixe seu comentário"
                    required
                    v-model="comentario">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 sm12>
                    <star-rating 
                    v-model="nota"
                    class="custom-text"
                    v-bind:star-size="25"
                    v-bind:increment="0.1"
                    >
                    </star-rating>
                </v-flex>
                <v-flex xs12 sm12>
                    <file-input
                        accept="image/*"
                        ref="fileInput"
                        @input="getUploadedFile"
                    ></file-input>
                </v-flex>
                <v-flex xs12 sm12>
                    <google-map>
                    </google-map>
                </v-flex>
                <v-flex xs12 sm12>
                    <v-alert v-model="alert" type="error">
                        Preencha todos os campos.
                    </v-alert>
                </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Fechar</v-btn>
          <v-btn 
            color="blue darken-1" 
            flat
            @click="addAtracao" 
            :disabled="!valid">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
    import FileInput from './FileInput.vue'
    import GoogleMap from './GoogleMap.vue'
    import { mapState } from 'vuex'
    
    export default {
        components: {
            FileInput,
            GoogleMap
        },
        computed: mapState([
            'endereco'
        ]),
        data: () => ({
            valid: false,
            alert: false,
            dialog: false,
            menu1: false,
            menu2: false,
            nome: null,
            descricao: null,
            idadeMinima: null,
            horarioInicio: null,
            horarioFim: null,
            foto: null,
            comentario: null,
            nota: null,
            ages: Array.from({length: 100}, (v, k) => k+1),
            requiredRule: [
                v => !!v || 'Campo é obrigatório'
            ]
        }),
        methods: {
            getUploadedFile(e) {
                this.foto = e
            },
            addAtracao() {
                 if (this.$store.getters.getLocalizacao.address_components == null || !this.foto) {
                     this.alert = true
                 }
                 else {
                    let atracao = this.getAtracao()
                    let enderecoAtracao = this.getEnderecoAtracao()
                    let comentario = {usuario: 1, comentario: this.comentario, aprovado: true}
                    let avaliacao = {user: 1, nota: this.nota}
                    this.$store.dispatch('addAtracao', atracao)
                    this.$store.dispatch('addEndereco', enderecoAtracao)
                    this.$store.dispatch('addComentario', comentario)
                    this.$store.dispatch('addAvaliacao', avaliacao)
                    this.dialog = false
                    this.limpaFormulario()
                 }
            },
            getAtracao() { 
                let atracao = new FormData()
                atracao.set('nome', this.nome)
                atracao.set('descricao', this.descricao)
                atracao.set('horario_func', this.horarioInicio + ' às ' + this.horarioFim)
                atracao.set('idade_minima', this.idadeMinima)
                atracao.set('foto', this.foto)
                return atracao
            },
            getEnderecoAtracao() {
                let googleLocation = this.$store.getters.getLocalizacao
                let enderecoAtracao = {
                    'linha1': googleLocation.address_components.find(component => 
                        component.types.includes("route")).long_name,
                    'linha2': googleLocation.address_components.find(component => 
                        component.types.includes("postal_code")).long_name,
                    'cidade': googleLocation.address_components.find(component => 
                        component.types.includes("administrative_area_level_2")).long_name,
                    'estado': googleLocation.address_components.find(component => 
                        component.types.includes("administrative_area_level_1")).long_name,
                    'pais': googleLocation.address_components.find(component => 
                        component.types.includes("country")).long_name
                }
                return enderecoAtracao
            },
            limpaFormulario() {
                this.nome = null
                this.descricao = null
                this.horarioInicio = null
                this.horarioFim = null
                this.comentario = null
                this.foto = null
                this.idadeMinima = null
                this.nota = 0
            }
       }
    }
</script>

<style scoped>
</style>