<template lang="pug">
div(:class="{'vueperslides__slide': true, 'vueperslides__slide--active': $parent.activeSlideUid === _uid }" :style="styles")
  div.vueperslides__slide-content(v-if="!$parent.slideContentOutside && (title || content)")
    p.slide-title(v-html="title")
    p.slide-content(v-html="content")
</template>

<script>
export default {
  props: {
    clone: {
      type: Number,
      default: null
    },
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
  created () {
    this.$parent.addSlide({
      _uid: this._uid,
      image: this.image,
      title: this.title,
      content: this.content,
      clone: this.clone
    })
  },
  // When removing a slide programmatically, remove it from the config so vueperslides
  // component is aware of the change.
  destroyed () {
    this.$parent.removeSlide(this._uid)
  },
  computed: {
    styles () {
      let styles = {}
      if (this.image) {
        styles.backgroundImage = `url(${this.image})`
      }
      if (this.$parent.slideRatio) {
        styles.paddingBottom = `${this.$parent.slideRatio * 100}%`
      }
      return styles
    }
  }
}
</script>
