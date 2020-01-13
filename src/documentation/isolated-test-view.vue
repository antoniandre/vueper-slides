<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  vueper-slides.no-shadow(
    :visible-slides="1"
    slide-multiple
    :arrows-outside="false"
    lazy
    lazy-load-on-drag)
    vueper-slide(
      v-for="(slide, i) in [...slides, ...slides, ...slides]"
      :key="i"
      :image="slide.image"
      :content="`Content ${i}`"
      :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
      template(v-slot:content)
        .vueperslide__content-wrapper
          v-icon.white--text check_circle
          h1 {{ `Title ${i}` }}
          p {{ `Content ${i}` }}
      template(v-slot:loading)
        v-progress-circular(color="primary" indeterminate)
        span.primary--text.title Loading...
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
      },
      {
        title: 'Mountain 4',
        content: 'Slide 4 content.',
        image: 'https://farm4.staticflickr.com/3364/3409068082_bbecd0b7cc_o.jpg',
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
