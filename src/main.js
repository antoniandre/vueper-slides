import { createApp } from 'vue'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

import App from '@/app.vue'
import router from '@/router/index'

import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/brands.css'

const app = createApp(App)

app.use(router)
app.use(WaveUI, {
  iconsLigature: 'material-icons',
  colors: {
    light: {
      primary: '#ff5252',
      secondary: '#42b983',
      maintext: '#999',
      darktext: '#444',
      lightertext: '#ccc',
      lightgrey: '#eee'
    }
  },
  theme: 'light'
})

app.mount('#app')
