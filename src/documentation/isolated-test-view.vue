<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  p autoplaying: {{internalAutoPlaying}}
  vueper-slides.no-shadow(
    autoplay
    :pause-on-hover="true"
    @autoplay-pause="internalAutoPlaying = false"
    @autoplay-resume="internalAutoPlaying = true")
    vueper-slide(
      v-for="(slide, i) in slides"
      :key="i"
      :image="slide.image"
      :title="slide.title"
      :content="slide.content")
</template>

<script>
import { VueperSlides, VueperSlide } from '@/components/vueperslides/'
import '@/components/vueperslides/styles.scss'

export default {
  components: { VueperSlides, VueperSlide },
  data: () => ({
    internalAutoPlaying: true,
    slides: [
      {
        title: 'El Teide Volcano, Spain',
        content: 'Photo by Max Rive',
        image: `${process.env.BASE_URL}images/el-teide-volcano-spain.jpg`,
        link: 'https://www.maxrivephotography.com/index/C0000rU1RKCHdqwI/G0000X57AtIzuRX0/I0000Gvr9HqdtyXk'
      },
      {
        title: 'Chernobyl, Ukraine',
        content: 'Photo by Jesse Moran',
        image: `${process.env.BASE_URL}images/chernobyl-ukraine.jpg`,
        link: 'https://www.flickr.com/photos/jessemoran'
      },
      {
        title: 'Crater Lake, Oregon, USA',
        content: 'Photo by Jesse Moran',
        image: `${process.env.BASE_URL}images/crater-lake-oregon-usa.jpg`,
        link: 'https://flic.kr/p/2cxrCmp'
      }
    ],
    breakpoints: {
      1200: {
        slideRatio: 1 / 5,
        touchable: true
      },
      1100: {
        slideRatio: 1 / 4,
        touchable: true
      },
      900: {
        slideRatio: 1 / 3,
        touchable: false
      },
      600: {
        slideRatio: 1 / 2,
        arrows: false,
        bulletsOutside: true,
        touchable: false
      }
    }
  }),

  methods: {
    log (...param) {
      console.log(...param)
    },
    getImage: image => `${process.env.BASE_URL}/images/${image}`
  }
}
</script>

<style lang="scss">
</style>
