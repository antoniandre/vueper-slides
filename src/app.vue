<template lang="pug">
  v-app(:class="{ ready: ready }" v-scroll="onScroll")
    v-container.px-0(fluid)
      top-bar(:offset-top="offsetTop")
      router-view

    v-fab-transition
      v-btn(color="primary" fixed bottom right fab v-show="!goTopHidden" small v-scroll-to="'#top'")
        //- Width to prevent ugly first load animation when icon is not yet ready.
        v-icon(color="white" size="26" style="width: 24px") keyboard_arrow_up

    v-footer.px-0.py-2(color="white")
      v-layout.max-widthed(wrap justify-center)
        v-flex.xs12.sm6.text-center.text-sm-left.copyright.
          Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
        v-flex.xs12.sm6.text-center.text-sm-right.made-with
          .mb-1 This documentation is made with #[v-icon fab fa-vuejs], #[v-icon fab fa-html5], #[v-icon fab fa-css3], #[v-icon fab fa-sass] &amp; #[v-icon.heart favorite]
          | View this project on #[a(href="https://github.com/antoniandre/vueper-slides" target="_blank") #[v-icon fab fa-github] Github].
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

.v-card {box-shadow: none;}

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
    vertical-align: middle;
    transition: 1s ease-out;
    cursor: pointer;

    &.heart:hover {animation: pulse 1.8s ease-out infinite;}
  }
}
</style>
