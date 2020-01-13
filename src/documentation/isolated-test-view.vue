<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  vueper-slides.no-shadow(autoplay)
    vueper-slide(
      v-for="(slide, i) in [...slides, ...slides]"
      :key="i"
      :title="slide.title"
      :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]"
      :duration="slide.duration")
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
        link: '#link-to-article-1',
        duration: 5000
      },
      {
        title: 'Mountain 2',
        content: 'Slide 2 content.',
        image: require('@/assets/images/snow-1.jpg'),
        link: '#link-to-article-2',
        duration: 1000
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
        visibleSlides: 1,
        slideRatio: 1 / 2
      }
    }
  }),

  methods: {
  }
}
</script>

<style lang="scss">
button:focus .v-icon {
  border-radius: 100%;
  box-shadow: 0 0 0 4px rgba(#42b983, 0.4);
}
</style>
