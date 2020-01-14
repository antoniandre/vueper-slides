<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  vueper-slides.no-shadow(
    :slide-ratio="1 / 2"
    lazy
    lazy-load-on-drag
    @image-loaded="log"
    @image-failed="log")
    vueper-slide(
      v-for="(slide, i) in slides"
      :key="i"
      :title="`Slide ${i + 1}`"
      :content="`Content ${i + 1}.`"
      :image="slide.image")
      template(v-slot:loader)
        v-progress-circular(color="primary" indeterminate)
        span.mt-3.primary--text.title Loading...
</template>

<script>
import { VueperSlides, VueperSlide } from '@/components/vueperslides/'
import '@/components/vueperslides/styles.scss'

export default {
  components: { VueperSlides, VueperSlide },
  data: () => ({
    slides: [
      { image: 'https://farm4.staticflickr.com/3364/3409068082_bbecd0b7cc_o.jpg' },
      { image: 'https://combo.staticflickr.com/ap/build/images/sohp/2019-top-25/Ramon_Covelo_Sakrisoy%20Dreams.jpg' },
      { image: 'https://combo.staticflickr.com/ap/build/images/sohp/2019-top-25/Alex_Noriega_Pure_Magic.jpg' },
      { image: 'https://combo.staticflickr.com/ap/build/images/sohp/2019-top-25/Jesse_Moran_Resurrect.jpg' },
      { image: 'https://combo.staticflickr.com/ap/build/images/sohp/2019-top-25/Perez_Alonso%20Photography_Chocolate_Mountains.jpg' },
      { image: require('@/assets/images/easton-wa-usa.jpg') }
    ],
    breakpoints: {
      700: {
        slideMultiple: 2,
        visibleSlides: 2,
        slideRatio: 1 / 3,
        infinite: false
      },
      600: {
        visibleSlides: 1,
        slideRatio: 1 / 2
      }
    }
  }),

  methods: {
    log (param) {
      console.log(param)
    }
  }
}
</script>

<style lang="scss">
.vueperslide--loading .vueperslide__content-wrapper {
  display: none !important;
}
</style>
