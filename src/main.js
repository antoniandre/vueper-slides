import 'babel-polyfill'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './app'
import router from './router/'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
