import Vue from 'vue'
import router from './router'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'
import './style.scss'

Vue.use(Vuetify, {
  theme: {
    primary: '#ff5252',
    secondary: '#42b983',
    maintext: '#999',
    lightgrey: '#f4f4f4'
    // Default Vuetify colors.
    // secondary: '#424242',
    // accent: '#82B1FF',
    // error: '#FF5252',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FFC107'
  }
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  template: require('./template.pug'),
  data: () => ({
    offsetTop: 0
  }),
  methods: {
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    }
  }
})
