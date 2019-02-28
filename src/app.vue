<template lang="pug">
  v-app.white(:class="{ ready: ready }" v-scroll="onScroll")
    v-container
      top-bar(:offset-top="offsetTop")
      documentation

    v-fab-transition
      v-btn(color="primary" fixed bottom right fab v-show="!goTopHidden" small href="#top")
        v-icon(color="white" size="26") keyboard_arrow_up

    v-footer.mt-5.pa-2.pb-4(color="white")
      v-layout.max-widthed(row wrap align-center justify-center)
        v-flex.xs12.sm6.text-xs-center.text-sm-left.copyright.
          Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
        v-flex.xs12.sm6.text-xs-center.text-sm-right.made-with
          div.mb-1 This documentation is made with #[v-icon fab fa-vuejs], #[v-icon fab fa-html5], #[v-icon fab fa-css3], #[v-icon fab fa-sass] &amp; #[v-icon.heart favorite]
          | View project on #[a(href="https://github.com/antoniandre/vueper-slides" target="_blank") #[v-icon fab fa-github] Github].
</template>

<script>
import Documentation from '@/documentation'
import TopBar from '@/components/top-bar'

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

a {
  text-decoration: none;

  &[name] {
    position: relative;
    top: -4em;
    display: block;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 8em;
}

.application--wrap {
  padding-top: 12em;
  overflow-x: hidden;
}

.main-content {
  max-width: 800px;
  height: 650px;
}

.code {
  font-family: monospace, sans-serif;
}

.v-card {box-shadow: none;}

// FOOTER
//=================================================//
.application--wrap footer.v-footer {
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

    &.fa-vuejs:hover,
    &.fa-html5:hover,
    &.fa-css3:hover,
    &.fa-sass:hover {
      transform: rotate(360deg);
    }

    &.heart:hover {
      animation: pulse 1.8s ease-out infinite;
    }
  }
}
</style>
