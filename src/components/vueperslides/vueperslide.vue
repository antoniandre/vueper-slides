<template lang="pug">
.vueperslide(
  :is="link ? 'a' : 'div'"
  :href="link && !justDragged ? link : false"
  :class="{ 'vueperslide--active': $parent.slides.activeUid === _uid, 'vueperslide--previous-slide': isPreviousSlide, 'vueperslide--next-slide': isNextSlide, 'vueperslide--visible': isSlideVisible }"
  :face="slideFace3d"
  :style="wrapperStyles"
  :aria-hidden="$parent.slides.activeUid === _uid || isSlideVisible ? 'false' : 'true'"
  @mouseenter="$emit('mouseenter', { index, title, content, image, link }, $el)"
  @mouseleave="$emit('mouseleave')")
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
    },
    link: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    index: 0
  }),
  created () {
    // vueperslide component has this useful attributes:
    // _uid, image, title, titleSlot, content, contentSlot, clone.
    this.index = this.$parent.addSlide(this)
  },
  // When removing a slide programmatically, remove it from the config so vueperslides
  // component is aware of the change.
  destroyed () {
    if (this.clone === null) this.$parent.removeSlide(this._uid)
  },
  computed: {
    wrapperStyles () {
      return {
        ...(!this.$parent.conf.slideImageInside && this.image && { backgroundImage: `url("${this.image}")` }),
        ...(this.$parent.conf.visibleSlides > 1 && { width: 100 / this.$parent.conf.visibleSlides + '%' }),
        ...(this.$parent.conf.visibleSlides > 1 && this.$parent.conf.fade && { left: ((this.slideIndex % this.$parent.conf.visibleSlides) / this.$parent.conf.visibleSlides) * 100 + '%' })
      }
    },
    imageStyles () {
      return { ...(this.$parent.conf.slideImageInside && this.image && { backgroundImage: `url("${this.image}")` }) }
    },
    hasTitleSlotData () {
      const { slideTitle } = this.$slots
      return slideTitle !== undefined
    },
    hasContentSlotData () {
      const { slideContent } = this.$slots
      return slideContent !== undefined
    },
    slideFace3d () {
      if (!this.$parent.conf['3d']) return false
      const faces = ['front', 'right', 'back', 'left']
      const slidesCount = this.$parent.slides.list.length
      const prevSlideIndex = (this.$parent.slides.current - 1 + slidesCount) % slidesCount
      const nextSlideIndex = (this.$parent.slides.current + 1) % slidesCount

      // Index starts at 1 so this.index-1.
      if (this.index - 1 === prevSlideIndex) return faces[(4 + this.$parent.slides.current - 1) % 4]
      else if (this.index - 1 === nextSlideIndex) return faces[(this.$parent.slides.current + 1) % 4]

      return faces[(this.index - 1) % 4]
    },
    isPreviousSlide () {
      if (!this.$parent.conf['3d']) return false
      const slidesCount = this.$parent.slides.list.length
      const prevSlideIndex = (this.$parent.slides.current - 1 + slidesCount) % slidesCount
      return this._uid === this.$parent.slides.list[prevSlideIndex]._uid
    },
    isNextSlide () {
      if (!this.$parent.conf['3d']) return false
      const slidesCount = this.$parent.slides.list.length
      const nextSlideIndex = (this.$parent.slides.current + 1) % slidesCount
      return this._uid === this.$parent.slides.list[nextSlideIndex]._uid
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
    },
    justDragged () {
      return this.$parent.touch.justDragged
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

  &[href] {-webkit-user-drag: none;}

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

  .vueperslides--fade & {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: .8s ease-in-out opacity;
    transition-duration: inherit;

    &--active, &--visible {
      z-index: 1;
      opacity: 1;
    }
  }

  .vueperslides--3d & {
    position: absolute;
    // Trickier than rotateY(180deg) translateZ($slideshowWidth / 2);
    // But doesn't require to set a fixed width on the slideshow ;)
    // transform: rotateY(270deg) translateX(-50%) rotateY(-90deg);
    z-index: -1;

    &--previous-slide, &--active, &--next-slide {z-index: 0;}
    &--active {z-index: 1;}
    &[face=front] {
      // Trickier than rotateY(0deg) translateZ($slideshowWidth / 2),
      // But doesn't require to set a fixed width on the slideshow ;)
      transform: rotateY(90deg) translateX(-50%) rotateY(-90deg);
    }

    &[face=right] {
      transform: rotateY(90deg) translateX(50%);
      transform-origin: 100% 0;
    }

    &[face=back] {
      // Trickier than rotateY(180deg) translateZ($slideshowWidth / 2);
      // But doesn't require to set a fixed width on the slideshow ;)
      transform: rotateY(270deg) translateX(-50%) rotateY(-90deg);
    }

    &[face=left] {
      transform: rotateY(270deg) translateX(-50%);
      transform-origin: 0 0;
    }
  }
}
</style>
