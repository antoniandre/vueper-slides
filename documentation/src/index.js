import Vue from 'vue'
import router from './router'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles/index.scss'

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: '#ff5252',
    secondary: '#42b983',
    maintext: '#999',
    lightgrey: '#eee'
  }
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  template: require('./template.pug'),
  data: () => ({
    offsetTop: 0,
    goTopHidden: true
  }),
  methods: {
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop

      this.goTopHidden = this.offsetTop < 200
    }
  }
})
