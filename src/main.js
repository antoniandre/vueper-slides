// Polyfill.
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import vuetify from './plugins/vuetify'

import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/brands.css'

import App from './app'
import router from './router/'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
