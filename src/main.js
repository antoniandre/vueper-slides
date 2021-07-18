// Polyfill.
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { createApp } from 'vue'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

import App from './app'
import router from './router/'

import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/brands.css'

const app = createApp(App).use(router)

// eslint-disable-next-line no-new
new WaveUI(app, {
  iconsLigature: 'material-icons',
  colors: {
    primary: '#ff5252',
    secondary: '#42b983',
    maintext: '#999',
    darktext: '#444',
    lightertext: '#ccc',
    lightgrey: '#eee'
  }
})

app.mount('#app')
