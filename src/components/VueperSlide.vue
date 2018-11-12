<template lang="pug">
div(:class="{ 'vueperslide': true, 'vueperslide--active': $parent.slides.activeUid === _uid, 'vueperslide--visible': isSlideVisible }" :style="wrapperStyles" :aria-hidden="$parent.slides.activeUid === _uid ? 'false' : 'true'")
  .vueperslide__image(v-if="image && $parent.conf.slideImageInside" :style="imageStyles")
  .vueperslide__content-wrapper(v-show="!$parent.conf.slideContentOutside && (title || hasTitleSlotData || content || hasContentSlotData)")
    .vueperslide__title(v-show="title || hasTitleSlotData")
      div(v-show="!$parent.conf.slideContentOutside && !title")
        slot(name="slideTitle")
      div(v-if="title" v-html="title")
    .vueperslide__content(v-if="content || hasContentSlotData")
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
    wrapperStyles () {
      return {
        ...(!this.$parent.conf.slideImageInside && this.image && { backgroundImage: `url(${this.image})` }),
        ...(this.$parent.conf.visibleSlides && { width: 100 / this.$parent.conf.visibleSlides + '%' }),
        ...(this.$parent.conf.visibleSlides > 1 && this.$parent.conf.fade && { left: ((this.slideIndex % this.$parent.conf.visibleSlides) / this.$parent.conf.visibleSlides) * 100 + '%' })
      }
    },
    imageStyles () {
      return { ...(this.$parent.conf.slideImageInside && this.image && { backgroundImage: `url(${this.image})` }) }
    },
    hasTitleSlotData () {
      const { slideTitle } = this.$slots
      return slideTitle !== undefined
    },
    hasContentSlotData () {
      const { slideContent } = this.$slots
      return slideContent !== undefined
    },
    isSlideVisible () {
      const activeSlideUid = this.$parent.slides.activeUid
      const activeSlideIndex = this.slidesList.indexOf(activeSlideUid)
      const visibleSlidesCount = this.$parent.conf.visibleSlides

      return this.slideIndex >= activeSlideIndex && this.slideIndex < activeSlideIndex + visibleSlidesCount
    },
    slidesList () {
      return this.$parent.slides.list.map(slide => slide._uid)
    },
    slideIndex () {
      return this.slidesList.indexOf(this._uid)
    }
  }
}
</script>

<style lang="scss">
.vueperslide {
  white-space: normal;
  background-size: cover;
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
  }

  &__content-wrapper:not(&__content-wrapper--outside-top):not(&__content-wrapper--outside-bottom) {
    position: absolute;
  }
}

.vueperslides--fade .vueperslide {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: .8s ease-in-out opacity;

  &--active, &--visible {
    z-index: 1;
    opacity: 1;
  }
}
</style>
