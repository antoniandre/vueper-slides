import { createRouter, createWebHistory } from 'vue-router'
import Documentation from '@/documentation/index.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Documentation
    },
    {
      path: '/test',
      component: () => import(/* webpackChunkName: "isolated-test-view" */ '@/documentation/isolated-test-view.vue')
    }
  ]
})
