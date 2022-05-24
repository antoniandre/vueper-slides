<template lang="pug">
w-app(:class="{ ready }" v-scroll="onScroll")
  top-bar(:offset-top="offsetTop")
  router-view

  w-transition-twist
    w-button.go-top(
      v-show="!goTopHidden"
      icon="material-icons keyboard_arrow_up"
      fixed
      bottom
      right
      round
      :v-scroll-to="'#top'")

  footer.py2
    w-flex.max-widthed(wrap justify-center)
      .xs12.sm6.text-center.smu-text-left.copyright.
        Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
      .xs12.sm6.text-center.smu-text-right.made-with
        .mb1 This documentation is made with #[w-icon fab fa-vuejs], #[w-icon fab fa-html5], #[w-icon fab fa-css3], #[w-icon fab fa-sass] &amp; #[w-icon.heart material-icons favorite]
        | View this project on #[a(href="https://github.com/antoniandre/vueper-slides" target="_blank") #[w-icon fab fa-github] Github].
</template>

<script>
import Documentation from '@/documentation'
import TopBar from '@/documentation/top-bar'
import '@/scss/index.scss'

export default {
  name: 'app',
  components: { Documentation, TopBar },
  data: () => ({
    ready: false,
    offsetTop: 0,
    goTopHidden: true
  }),
  created () {
    setTimeout(() => (this.ready = true), 500)
  },
  methods: {
    onScroll () {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.goTopHidden = this.offsetTop < 200
    }
  },
  directives: {
    scroll: {
      mounted: (el, binding) => {
        const f = evt => {
          if (binding.value(evt, el)) window.removeEventListener('scroll', f)
        }
        window.addEventListener('scroll', f)
      }
    }
  }
}
</script>
