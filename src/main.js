// Polyfill.
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { createApp, h } from 'vue'
// import vuetify from './plugins/vuetify'

import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/brands.css'

import App from './app'
import router from './router/'

createApp({
  // vuetify,
  render: () => h(App)
}).use(router).mount('#app')
