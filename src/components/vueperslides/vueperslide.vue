<template lang="pug">
.vueperslide(
  :is="link ? 'a' : 'div'"
  :href="link && !justDragged ? link : false"
  :class="slideClasses"
  :face="slideFace3d"
  :style="slideStyles"
  :aria-hidden="$parent.slides.activeId === _uid || isSlideVisible ? 'false' : 'true'"
  @mouseenter="$emit('mouse-enter', { slideIndex, title, content, image, link }, $el)"
  @mouseleave="$emit('mouse-leave')")
  .vueperslide__image(v-if="image && conf.slideImageInside" :style="imageStyles")
  .vueperslide__content-wrapper(v-show="!conf.slideContentOutside")
    .vueperslide__title
      slot(name="slide-title")
        div(v-if="title" v-html="title")
    .vueperslide__content
      slot(name="slide-content")
        div(v-if="content" v-html="content")
</template>

<script>
export default {
  props: {
    clone: { type: Boolean, default: false },
    image: { type: String, default: '' },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    link: { type: String, default: '' }
  },

  methods: {
    updateSlide (props) {
      this.$parent.updateSlide(this._uid, props)
    }
  },

  created () {
    if (this.clone) return

    this.$parent.addSlide({
      id: this._uid,
      image: this.image,
      title: this.title,
      titleSlot: this.$slots['slide-title'],
      content: this.content,
      contentSlot: this.$slots['slide-content'],
      link: this.link,
      style: ''
    })
  },

  mounted () {
    if (this.clone) return

    this.updateSlide({
      titleSlot: this.$slots['slide-title'],
      contentSlot: this.$slots['slide-content'],
      style: ((this.$el.attributes || {}).style || {}).value
    })
  },

  beforeUpdate () {
    if (this.shouldSkipUpdate || !Object.values(this.$slots).length) return

    this.updateSlide({
      titleSlot: this.$slots['slide-title'],
      contentSlot: this.$slots['slide-content'],
      style: ((this.$el.attributes || {}).style || {}).value
    })
  },

  watch: {
    image () {
      if (!this.clone) this.updateSlide({ image: this.image })
    },
    title () {
      if (!this.clone) this.updateSlide({ title: this.title })
    },
    content () {
      if (!this.clone) this.updateSlide({ content: this.content })
    },
    link () {
      if (!this.clone) this.updateSlide({ link: this.link })
    }
  },

  destroyed () {
    // When removing a slide programmatically, remove it from the list of slides.
    if (!this.clone) this.$parent.removeSlide(this._uid)
  },

  computed: {
    conf () {
      return this.$parent.conf
    },
    slideClasses () {
      return {
        'vueperslide--active': this.$parent.slides.activeId === this._uid,
        'vueperslide--previous-slide': this.isPreviousSlide,
        'vueperslide--next-slide': this.isNextSlide,
        'vueperslide--visible': this.isSlideVisible
      }
    },
    slideStyles () {
      return {
        ...(!this.conf.slideImageInside && this.image && { backgroundImage: `url("${this.image}")` }),
        ...(this.conf.visibleSlides > 1 && { width: 100 / this.conf.visibleSlides + '%' }),
        ...(this.conf.visibleSlides > 1 && this.conf.fade && { left: ((this.slideIndex % this.conf.visibleSlides) / this.conf.visibleSlides) * 100 + '%' })
      }
    },
    imageStyles () {
      return { ...(this.conf.slideImageInside && this.image && { backgroundImage: `url("${this.image}")` }) }
    },
    slideFace3d () {
      if (!this.conf['3d']) return false
      const faces = ['front', 'right', 'back', 'left']
      const prevSlideIndex = (this.$parent.slides.current - 1 + this.slidesCount) % this.slidesCount
      const nextSlideIndex = (this.$parent.slides.current + 1) % this.slidesCount

      if (this.slideIndex === prevSlideIndex) return faces[(4 + this.$parent.slides.current - 1) % 4]
      else if (this.slideIndex === nextSlideIndex) return faces[(this.$parent.slides.current + 1) % 4]

      return faces[this.slideIndex % 4]
    },
    isPreviousSlide () {
      if (!this.conf['3d']) return false
      const prevSlideIndex = (this.$parent.slides.current - 1 + this.slidesCount) % this.slidesCount
      return this._uid === this.$parent.slides.list[prevSlideIndex].id
    },
    isNextSlide () {
      if (!this.conf['3d']) return false
      const nextSlideIndex = (this.$parent.slides.current + 1) % this.slidesCount
      return this._uid === this.$parent.slides.list[nextSlideIndex].id
    },
    isSlideVisible () {
      const activeSlideUid = this.$parent.slides.activeId
      const activeSlideIndex = this.slidesList.indexOf(activeSlideUid)
      const visibleSlidesCount = this.conf.visibleSlides

      return this.slideIndex >= activeSlideIndex && this.slideIndex < activeSlideIndex + visibleSlidesCount
    },
    slidesList () {
      return this.$parent.slides.list.map(slide => slide.id)
    },
    slidesCount () {
      return this.slidesList.length
    },
    slideIndex () {
      return this.slidesList.indexOf(this._uid)
    },
    justDragged () {
      return this.$parent.touch.justDragged
    },
    shouldSkipUpdate () {
      return (
        this.clone || !this.conf.infinite ||
        (!this.conf.slideContentOutside && !this.conf.alwaysRefreshClones)
      )
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
