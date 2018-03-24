import Vue from 'vue'
import VueRouter from 'vue-router'
import main from './pages/main'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: main
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
