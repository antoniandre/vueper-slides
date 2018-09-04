<template lang="pug">
div.vueperslide(:class="{ 'vueperslide--active': $parent.slides.activeUid === _uid, 'vueperslide--previous-slide': isPreviousSlide, 'vueperslide--next-slide': isNextSlide }" :index="index" :face="slideFace3d" :style="wrapperStyles" :aria-hidden="$parent.slides.activeUid === _uid ? 'false' : 'true'")
  div.vueperslide__image(v-if="image && $parent.conf.slideImageInside" :style="imageStyles")
  div.vueperslide__content-wrapper(v-show="!$parent.conf.slideContentOutside && (title || hasTitleSlotData || content || hasContentSlotData)")
    div.vueperslide__title(v-show="title || hasTitleSlotData")
      div(v-show="!$parent.conf.slideContentOutside && !title")
        slot(name="slideTitle")
      div(v-if="title" v-html="title")
    div.vueperslide__content(v-if="content || hasContentSlotData")
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
        ...(!this.$parent.conf.slideImageInside && this.image && { backgroundImage: `url(${this.image})` }),
        ...(this.$parent.conf.visibleSlides && { width: 100 / this.$parent.conf.visibleSlides + '%' })
      }
    },
    imageStyles () {
      return { ...(this.$parent.conf.slideImageInside && this.image && { backgroundImage: `url(${this.image})` }) }
    },
  	hasTitleSlotData () {
      let { slideTitle } = this.$slots
      return slideTitle !== undefined
    },
  	hasContentSlotData () {
      let { slideContent } = this.$slots
      return slideContent !== undefined
    },
    isPreviousSlide () {
      let prevSlideIndex = this.$parent.getSlideInRange(this.$parent.slides.current - this.$parent.conf.slideMultiple)
      return this._uid === this.$parent.slides.list[prevSlideIndex.nextSlide]._uid
    },
    isNextSlide () {
      let nextSlideIndex = this.$parent.getSlideInRange(this.$parent.slides.current + this.$parent.conf.slideMultiple)
      return this._uid === this.$parent.slides.list[nextSlideIndex.nextSlide]._uid
    },
    slideFace3d () {
    //   facesStyles = [
    //     // Trickier than rotateY(0deg) translateZ($slideshowWidth / 2),
    //     // But doesn't require to set a fixed width on the slideshow ;)
    //     'transform: rotateY(90deg) translateX(-50%) rotateY(-90deg);',
    //     'transform: rotateY(90deg) translateX(50%);transform-origin: 100% 0;',
    //     // Trickier than rotateY(180deg) translateZ($slideshowWidth / 2);
    //     // But doesn't require to set a fixed width on the slideshow ;)
    //     'transform: rotateY(270deg) translateX(-50%) rotateY(-90deg);',
    //     'transform: rotateY(270deg) translateX(-50%);transform-origin: 0 0;'
    //   ]
    //   return facesStyles[]
    // console.log(['front', 'right', 'back', 'left'][(this.index - 1) % 4], this.index)
      return ['front', 'right', 'back', 'left'][(this.index - 1) % 4]
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

  .vueperslides--fade & {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: .8s ease-in-out opacity;

    &--active {
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

    // &--active {
    //   // Trickier than rotateY(0deg) translateZ($slideshowWidth / 2),
    //   // But doesn't require to set a fixed width on the slideshow ;)
    //   transform: rotateY(90deg) translateX(-50%) rotateY(-90deg);
    // }

    // &--next-slide {
    //   transform: rotateY(90deg) translateX(50%);
    //   transform-origin: 100% 0;
    // }

    // &--previous-slide {
    //   transform: rotateY(270deg) translateX(-50%);
    //   transform-origin: 0 0;
    // }

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
