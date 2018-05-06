<template lang="pug">
div(:class="{ 'vueperslides__slide': true, 'vueperslides__slide--active': $parent.slides.activeUid === _uid }" :style="styles")
  div.vueperslides__slide-content(v-if="!$parent.conf.slideContentOutside && (title || content)")
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
    if (this.clone === null) this.$parent.removeSlide(this._uid)
  },
  computed: {
    styles () {
      return { ...(this.image && { backgroundImage: `url(${this.image})` }) }
    }
  }
}
</script>
