import VueperSlides from './components/VueperSlides.vue'
import VueperSlide from './components/VueperSlide.vue'

// Expose component to global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('vueper-slides', VueperSlides)
  window.Vue.component('vueper-slide', VueperSlide)
}

export { VueperSlides, VueperSlide }
