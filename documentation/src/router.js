import Vue from 'vue'
import VueRouter from 'vue-router'
import main from './pages/main'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/vueper-slides/documentation/',
      component: main
    },
    {
      path: '*',
      redirect: '/vueper-slides/documentation/'
    }
  ]
})
