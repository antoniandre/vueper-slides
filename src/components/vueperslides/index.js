import VueperSlides from '@/components/vueperslides/vueperslides'
import VueperSlide from '@/components/vueperslides/vueperslide'

// Expose component to global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('vueper-slides', VueperSlides)
  window.Vue.component('vueper-slide', VueperSlide)
}

export { VueperSlides, VueperSlide }
