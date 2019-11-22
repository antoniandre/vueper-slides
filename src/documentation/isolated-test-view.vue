<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  vueper-slides(
    :breakpoints="breakpoints"
    arrows-outside
    bullets-outside
    :visible-slides="3")
    vueper-slide(
      v-for="(slide, i) in 10"
      :key="i"
      :content="`Content ${i}`"
      :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
      template(v-slot:content)
        v-icon.white--text check_circle
        h1 {{ `Title ${i}` }}
        p {{ `Content ${i}` }}
</template>

<script>
import { VueperSlides, VueperSlide } from '@/components/vueperslides/'
import '@/components/vueperslides/styles.scss'

export default {
  components: { VueperSlides, VueperSlide },
  data: () => ({
    slides: [
      {
        title: 'Mountain 1',
        content: 'Slide 1 content.',
        image: require('@/assets/images/rough-horn.jpg'),
        link: '#link-to-article-1'
      },
      {
        title: 'Mountain 2',
        content: 'Slide 2 content.',
        image: require('@/assets/images/snow-1.jpg'),
        link: '#link-to-article-2'
      },
      {
        title: 'Mountain 3',
        content: 'Slide 3 content.',
        image: require('@/assets/images/snow-2.jpg'),
        link: '#link-to-article-3'
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
        slideRatio: 1 / 2
      }
    }
  }),

  methods: {
  }
}
</script>

<style lang="scss">
</style>
