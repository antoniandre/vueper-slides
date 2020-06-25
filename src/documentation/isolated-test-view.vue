<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  vueper-slides.no-shadow
    vueper-slide(
      v-if="slides.length"
      v-for="(slide, i) in slides"
      :key="i"
      :title="slide.title"
      :image="slide.image")
    vueper-slide(
      title="El Teide Volcano, Spain"
      :image="getImage('el-teide-volcano-spain.jpg')")
    vueper-slide(
      title="Chernobyl, Ukraine"
      :image="getImage('chernobyl-ukraine.jpg')")
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
    ]
  }),

  methods: {
    log (...param) {
      console.log(...param)
    },
    getImage: image => require(`@/assets/images/${image}`)
  }
}
</script>

<style lang="scss">
</style>
