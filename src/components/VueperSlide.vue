<template lang="pug">
div(:class="{'vueperslides__slide': true, 'vueperslides__slide--active': $parent.activeSlideUid === _uid }" :style="styles")
  div.vueperslides__slide-content(v-if="!$parent.slideContentOutside && (title || content)")
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
  created () {
    this.$parent.slides.push({
      _uid: this._uid,
      image: this.image,
      title: this.title,
      content: this.content
    })
  },
  // When removing a slide programmatically, remove it from the config so vueperslides
  // component is aware of the change.
  destroyed () {
    this.$parent.slides.some((slide, i) => {
      if (slide._uid === this._uid) {
        // If the slide to remove is the current slide, slide to the previous slide.
        if (this._uid === this.$parent.activeSlideUid) {
          if (this.$parent.slides) this.$parent.goToSlide(i - 1, false, true)
        }

        // Then remove the slide.
        this.$parent.slides.splice(i, 1)
        return true // Break the `Array.some` loop.
      }
    })
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
