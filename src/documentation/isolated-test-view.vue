<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  vueper-slides(:infinite="false")
    vueper-slide(
      v-for="(slide, i) in slides"
      :key="i"
      :title="slide.title"
      :content="slide.content"
      :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
      template(v-slot:slideTitle)
        v-icon.white--text check_circle
        p {{ slide.title }}
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
    ]
  }),

  methods: {
  }
}
</script>

<style lang="scss">
</style>
