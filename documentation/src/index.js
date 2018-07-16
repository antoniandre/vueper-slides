import Vue from 'vue'
import router from './router'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'
import './styles/index.scss'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
fontawesome.library.add(brands)

Vue.use(Vuetify, {
  theme: {
    primary: '#ff5252',
    secondary: '#42b983',
    maintext: '#999'
  }
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  components: { FontAwesomeIcon },
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
