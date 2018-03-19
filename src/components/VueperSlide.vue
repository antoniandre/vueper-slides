<template lang="pug">
div(:class="{'vueperslides__slide': true, 'vueperslides__slide--active': conf.activeSlideUid === _uid }" :style="styles")
  div.vueperslides__slide-content(v-if="!conf.slideContentOutside && (title || content)")
    p.slide-title(v-html="title")
    p.slide-content(v-html="content")
</template>

<script>
export default {
  name: 'vueper-slide',
  inject: ['config'],
  props: {
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    conf: () => this.config.defaults// Make configs reactive.
  }),
  methods: {
    getConfig () {
      if (!this.config[this.$parent._uid]) {
        this.config[this.$parent._uid] = JSON.parse(JSON.stringify(this.config.defaults))
      }

      return this.config[this.$parent._uid]
    }
  },
  created () {
    this.conf = this.getConfig()
    this.conf.slides.push({
      _uid: this._uid,
      image: this.image,
      title: this.title,
      content: this.content
    })
  },
  computed: {
    styles () {
      let styles = {}
      if (this.image) {
        styles.backgroundImage = `url(${this.image})`
      }
      if (this.conf.slideRatio) {
        styles.paddingBottom = `${this.conf.slideRatio * 100}%`
      }
      return styles
    }
  }
}
</script>
