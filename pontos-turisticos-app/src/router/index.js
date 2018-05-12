import Vue from 'vue'
import Router from 'vue-router'
import PontosTuristicos from '@/components/PontosTuristicos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PontosTuristicos',
      component: PontosTuristicos
    }
  ]
})
