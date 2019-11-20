import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: ['md', 'fa']
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#ff5252',
        secondary: '#42b983',
        maintext: '#999',
        darktext: '#444',
        lightertext: '#ccc',
        lightgrey: '#eee'
      }
    }
  }
})
