<template lang="pug">
div(:class="{ 'vueperslides__slide': true, 'vueperslides__slide--active': $parent.slides.activeUid === _uid }" :style="styles" :aria-hidden="$parent.slides.activeUid === _uid ? 'false' : 'true'")
  div.vueperslides__slide-content(v-show="!$parent.conf.slideContentOutside && (title || hasTitleSlotData || content || hasContentSlotData)")
    div.slide-title(v-if="title || hasTitleSlotData")
      slot(name="slideTitle")
      div(v-if="title" v-html="title")
    div.slide-content(v-if="content || hasContentSlotData")
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
  mounted () {
    if (this.hasTitleSlotData) this.$parent.updateSlideContent(this._uid, 'titleSlot', this.titleSlot)
    if (this.hasContentSlotData) this.$parent.updateSlideContent(this._uid, 'contentSlot', this.contentSlot)
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
    },
  	hasTitleSlotData () {
      return this.$slots.slideTitle
    },
  	hasContentSlotData () {
      return this.$slots.slideContent
    },
  	titleSlot () {
      return this.hasTitleSlotData ? this.$slots.slideTitle[0].elm.innerHTML : ''
    },
  	contentSlot () {
      return this.hasContentSlotData ? this.$slots.slideContent[0].elm.innerHTML : ''
    }
  }
}
</script>
