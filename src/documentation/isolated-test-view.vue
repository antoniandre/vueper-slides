<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  vueper-slides.no-shadow(ref="vuperslides" :slide-ratio="1 / 2" autoplay)
    vueper-slide(
      v-if="slides.length"
      v-for="(slide, i) in slides"
      :key="i"
      :title="`Slide ${i + 1}`"
      :content="`Content ${i + 1}.`"
      :image="slide.image")
</template>

<script>
import { VueperSlides, VueperSlide } from '@/components/vueperslides/'
import '@/components/vueperslides/styles.scss'

export default {
  components: { VueperSlides, VueperSlide },
  data: () => ({
    slides: [
      {
        title: 'El Teide Volcano, Spain',
        content: 'Photo by Max Rive',
        image: require('@/assets/images/el-teide-volcano-spain.jpg'),
        link: 'https://www.maxrivephotography.com/index/C0000rU1RKCHdqwI/G0000X57AtIzuRX0/I0000Gvr9HqdtyXk'
      },
      {
        title: 'Chernobyl, Ukraine',
        content: 'Photo by Jesse Moran',
        image: require('@/assets/images/chernobyl-ukraine.jpg'),
        link: 'https://www.flickr.com/photos/jessemoran'
      },
      {
        title: 'Crater Lake, Oregon, USA',
        content: 'Photo by Jesse Moran',
        image: require('@/assets/images/crater-lake-oregon-usa.jpg'),
        link: 'https://flic.kr/p/2cxrCmp'
      }
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
    log (...param) {
      console.log(...param)
    }
  }
}
</script>

<style lang="scss">
.vueperslide--loading .vueperslide__content-wrapper {
  display: none !important;
}
</style>
