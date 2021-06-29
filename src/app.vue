<template lang="pug">
w-app(:class="{ ready }" v-scroll="onScroll")
  top-bar(:offset-top="offsetTop")
  router-view

  w-transition-twist
    w-button(color="primary" fixed bottom right round v-show="!goTopHidden" v-scroll-to="'#top'")
      //- Width to prevent ugly first load animation when icon is not yet ready.
      w-icon(color="white" size="26" style="width: 24px") material-icons keyboard_arrow_up

  footer.py2(color="white")
    w-flex.max-widthed(wrap justify-center)
      .xs12.sm6.text-center.text-sm-left.copyright.
        Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
      .xs12.sm6.text-center.text-sm-right.made-with
        .mb1 This documentation is made with #[w-icon fab fa-vuejs], #[w-icon fab fa-html5], #[w-icon fab fa-css3], #[w-icon fab fa-sass] &amp; #[w-icon.heart material-icons favorite]
        | View this project on #[a(href="https://github.com/antoniandre/vueper-slides" target="_blank") #[w-icon fab fa-github] Github].
</template>

<script>
import Documentation from '@/documentation'
import TopBar from '@/documentation/top-bar'

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
  }
}
</script>

<style lang="scss">
$main-text: #888;

* {
  margin: 0;
  padding: 0;
}

.main-content {
  max-width: 800px;
  height: 650px;
}

.w-card {box-shadow: none;}

// FOOTER
//=================================================//
.v-application--wrap footer.v-footer {
  background: none;
  font-style: italic;
  color: $main-text;
  font-size: 0.9em;
  margin: 3em 0 5em;

  i {
    font-size: 1.2em;
    vertical-align: text-bottom;
    transition: 1s ease-out;
    cursor: pointer;

    &.heart:hover {animation: pulse 1.8s ease-out infinite;}
  }
}
</style>
