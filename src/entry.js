// import { app } from './app'

import VueperSlides from './components/VueperSlides.vue'
import VueperSlide from './components/VueperSlide.vue'
// app.$mount('app')

// expose component to global scope
if (typeof window !== 'undefined' && window.Vue) {
  Vue.component('vueper-slides', VueperSlides)
  Vue.component('vueper-slide', VueperSlide)
}

export { VueperSlides, VueperSlide }
