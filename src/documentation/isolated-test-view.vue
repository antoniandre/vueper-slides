<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  vueper-slides.no-shadow(:breakpoints="breakpoints" bullets-outside :dragging-distance="50")
    vueper-slide.black(
      v-for="(slide, i) in slides"
      :key="i"
      :title="slide.title"
      :content="slide.content"
      :image="slide.image"
      :video="slide.video")
</template>

<script>
import { VueperSlides, VueperSlide } from '@/components/vueperslides/'
import '@/components/vueperslides/styles.scss'

export default {
  components: { VueperSlides, VueperSlide },
  data: () => ({
    slides: [
      {
        title: 'Aurora Borealis',
        image: 'https://i.ytimg.com/vi_webp/ehJg_OlcjpE/maxresdefault.webp',
        video: {
          url: 'https://www.youtube.com/embed/ehJg_OlcjpE?autoplay=1&mute=1&rel=0&showinfo=0&controls=0&fs=0&modestbranding=1&color=white&iv_load_policy=3&autohide=1&enablejsapi=1',
          props: {
            allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          }
        }
      },
      {
        title: 'Fjords',
        image: 'https://i.ytimg.com/vi/2sr9MGkkeks/maxresdefault.jpg',
        video: {
          url: 'https://www.youtube.com/embed/2sr9MGkkeks?controls=0&fs=0&modestbranding=1&color=white&iv_load_policy=3&autohide=1&enablejsapi=1',
          props: {
            allow: 'autoplay'
          },
          pointerEvents: false
        }
      }
      // {
      //   title: 'Blossoming flower',
      //   content: 'This video is autoplayed, played in loop, has no controls and is not reacting to user interactions.<br>(The video has no sound)',
      //   image: `${process.env.BASE_URL}images/flower.jpg`,
      //   video: {
      //     webm: `${process.env.BASE_URL}images/flower.webm`,
      //     mp4: `${process.env.BASE_URL}images/flower.mp4`,
      //     props: { autoplay: true, loop: true, controls: false, muted: true }
      //   }
      // },
      // {
      //   title: 'Blossoming flower',
      //   content: 'This video is played once, has controls and is reacting to user interactions.<br>(The video has no sound)',
      //   image: `${process.env.BASE_URL}images/flower.jpg`,
      //   video: {
      //     webm: `${process.env.BASE_URL}images/flower.webm`,
      //     mp4: `${process.env.BASE_URL}images/flower.mp4`
      //   }
      // }
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
