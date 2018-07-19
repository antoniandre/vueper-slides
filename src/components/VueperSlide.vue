<template lang="pug">
div(:class="{ 'vueperslides__slide': true, 'vueperslides__slide--active': $parent.slides.activeUid === _uid }" :style="styles" :aria-hidden="$parent.slides.activeUid === _uid ? 'false' : 'true'")
  div.vueperslides__slide-content(v-show="!$parent.conf.slideContentOutside && (title || hasTitleSlotData || content || hasContentSlotData)")
    div.slide-title(v-show="title || hasTitleSlotData")
      div(v-show="!$parent.conf.slideContentOutside && !title")
        slot(name="slideTitle")
      div(v-if="title" v-html="title")
    div.slide-content(v-if="content || hasContentSlotData")
      div(v-show="!$parent.conf.slideContentOutside && !content")
        slot(name="slideContent")
      div(v-if="content" v-html="content")
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
    // vueperslide component has this useful attributes:
    // _uid, image, title, titleSlot, content, contentSlot, clone.
    this.$parent.addSlide(this)
  },
  // When removing a slide programmatically, remove it from the config so vueperslides
  // component is aware of the change.
  destroyed () {
    if (this.clone === null) this.$parent.removeSlide(this._uid)
  },
  computed: {
    styles () {
      return { ...(this.image && { backgroundImage: `url(${this.image})` }) }
    },
  	hasTitleSlotData () {
      let { slideTitle } = this.$slots
      return slideTitle !== undefined
    },
  	hasContentSlotData () {
      let { slideContent } = this.$slots
      return slideContent !== undefined
    }
  }
}
</script>
