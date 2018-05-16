import Vue from 'vue'
import Router from 'vue-router'
import PontosTuristicos from '@/components/PontosTuristicos'
import FormularioAtracoes from '@/components/FormularioAtracoes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PontosTuristicos',
      component: PontosTuristicos
    },
    {
      path: 'formulario-atracoes/:nome',
      name: 'FormularioAtracoes',
      component: FormularioAtracoes
    }
  ]
})
