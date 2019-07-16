import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(Vuetify);

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

store.dispatch('recipes/updateRecipies')