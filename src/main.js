import 'babel-polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './app.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
