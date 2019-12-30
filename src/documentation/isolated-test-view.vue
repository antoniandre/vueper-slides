<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  vueper-slides.no-shadow(
    :visible-slides="3"
    slide-multiple
    :arrows-outside="false"
    :gap="4")
    vueper-slide(
      v-for="(slide, i) in 10"
      :key="i"
      :content="`Content ${i}`"
      :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
      template(v-slot:content)
        .vueperslide__content-wrapper
          v-icon.white--text check_circle
          h1 {{ `Title ${i}` }}
          p {{ `Content ${i}` }}
    //- template(v-slot:bullet="{ active, slideIndex, index }")
      v-icon(color="primary") {{ active ? 'check_circle' : 'radio_button_unchecked' }}
      | {{ index }}
    template(v-slot:bullets="{ bulletIndexes, goToSlide, previous, next, currentSlide }")
      button.px-1.py-3(
        v-for="(slideIndex, i) in bulletIndexes"
        :key="i"
        :class="{ 'active': currentSlide === slideIndex }"
        role="tab"
        :aria-label="`Slide ${i + 1}`"
        @click="goToSlide(slideIndex)"
        @keyup.left="previous()"
        @keyup.right="next()")
        v-icon(color="secondary") {{ currentSlide === slideIndex ? 'check_circle' : 'radio_button_unchecked' }}
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
