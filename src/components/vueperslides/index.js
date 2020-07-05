import VueperSlides from './vueperslides'
import VueperSlide from './vueperslide'

// Expose component to global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('vueper-slides', VueperSlides)
  window.Vue.component('vueper-slide', VueperSlide)
}

export { VueperSlides, VueperSlide }
