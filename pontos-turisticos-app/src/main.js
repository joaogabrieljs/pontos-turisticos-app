// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store/store.js'
import * as VueGoogleMaps from "vue2-google-maps";
import StarRating from 'vue-star-rating'
import VeeValidate from 'vee-validate';


Vue.use(Vuetify)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBNMpr9i6jn1duoOZVYpjddr8xyUUDbB6Y",
    libraries: "places" // necessary for places input
  }
});

Vue.use(VeeValidate);
Vue.component('star-rating', StarRating);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App, StarRating },
  template: '<App/>'
})
