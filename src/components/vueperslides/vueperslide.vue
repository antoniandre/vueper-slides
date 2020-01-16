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
  .vueperslide__image(v-if="imageSrc && conf.slideImageInside" :style="imageStyles")
  div(v-if="conf.slideContentOutside" v-show="!conf.slideContentOutside")
    slot(name="content")
      .vueperslide__content-wrapper
        .vueperslide__title(v-if="title" v-html="title")
        .vueperslide__content(v-if="content" v-html="content")
  slot(name="content" v-else)
    .vueperslide__content-wrapper
      .vueperslide__title(v-if="title" v-html="title")
      .vueperslide__content(v-if="content" v-html="content")
  .vueperslide__loader(v-if="conf.lazy && !loaded")
    slot(name="loader")
</template>

<script>
export default {
  props: {
    clone: { type: Boolean, default: false },
    image: { type: String, default: '' },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    link: { type: String, default: '' },
    duration: { type: Number, default: 0 },
    lazyloaded: { type: Boolean, default: false }
  },

  data: () => ({
    // For lazy loading.
    imageSrc: '',
    loading: false,
    loaded: false
  }),

  methods: {
    updateSlide (props) {
      this.$parent.updateSlide(this._uid, props)
    },

    // Only for lazy loading, this method is called from the Vueperslides component.
    loadImage () {
      // Don't try to reload image if already loaded.
      if (this.loading || this.loaded) return

      this.loading = true

      return new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.onload = () => {
          this.imageSrc = this.image
          this.loading = false
          this.loaded = true
          this.$nextTick(() => {
            resolve({ image: this.imageSrc, style: ((this.$el.attributes || {}).style || {}).value })
          })
        }
        img.onerror = (this.loading = false) || reject // Always call reject.
        img.src = this.image
      })
    }
  },

  created () {
    this.imageSrc = this.conf.lazy ? '' : this.image

    if (this.clone) return

    this.$parent.addSlide({
      id: this._uid,
      image: this.imageSrc,
      title: this.title,
      content: this.content,
      contentSlot: this.$slots.content,
      loaderSlot: this.$slots.loader, // For lazy loading.
      link: this.link,
      style: '',
      // For lazy loading: pass the function to Vueperslides, it will call it before slide
      // and on slide drag for each visible slide.
      loadImage: this.loadImage,
      duration: this.duration // Allow overriding the global autoplay slide duration.
    })
  },

  mounted () {
    if (this.clone) return

    this.updateSlide({
      contentSlot: this.$slots.content,
      loaderSlot: this.$slots.loader, // For lazy loading.
      style: ((this.$el.attributes || {}).style || {}).value
    })
  },

  beforeUpdate () {
    if (this.shouldSkipUpdate || !Object.values(this.$slots).length) return

    this.updateSlide({
      contentSlot: this.$slots.content,
      loaderSlot: this.$slots.loader, // For lazy loading.
      style: ((this.$el.attributes || {}).style || {}).value
    })
  },

  watch: {
    image () {
      // If the image of the slide is changed on the fly, update the clones.
      // If lazy loading, unset the image until this slide is requested.
      this.imageSrc = this.conf.lazy && !this.isSlideVisible ? '' : this.image
      if (!this.clone) this.updateSlide({ image: this.imageSrc })
    },
    title () {
      if (!this.clone) this.updateSlide({ title: this.title })
    },
    content () {
      if (!this.clone) this.updateSlide({ content: this.content })
    },
    link () {
      if (!this.clone) this.updateSlide({ link: this.link })
    },
    lazyloaded () {
      if (this.clone) this.loaded = this.lazyloaded
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
        'vueperslide--visible': this.isSlideVisible,
        'vueperslide--loading': this.conf.lazy && !this.loaded
      }
    },
    slideStyles () {
      const { visibleSlides, fade, slideImageInside, gap, gapPx } = this.conf

      return {
        ...(!slideImageInside && this.imageSrc && { backgroundImage: `url("${this.imageSrc}")` }),
        ...(visibleSlides > 1 && { width: (100 - (gap ? gap * (visibleSlides - 1) : 0)) / visibleSlides + '%' }),
        ...(visibleSlides > 1 && fade && { left: ((this.slideIndex % visibleSlides) / visibleSlides) * 100 + '%' }),
        ...(gap && { marginRight: gap + (gapPx ? 'px' : '%') })
      }
    },
    imageStyles () {
      return { ...(this.conf.slideImageInside && this.imageSrc && { backgroundImage: `url("${this.imageSrc}")` }) }
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

      return this.slideIndex >= activeSlideIndex && this.slideIndex < activeSlideIndex + this.conf.visibleSlides
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
  flex-shrink: 0;
  display: block;
  width: 100%;
  position: relative;

  &[href] {-webkit-user-drag: none;}

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
  }

  &__loader {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__content-wrapper:not(&__content-wrapper--outside-top):not(&__content-wrapper--outside-bottom) {
    height: 100%;
    margin: auto;
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

  .vueperslides--slide-image-inside & {overflow: hidden;}

  .vueperslides--3d & {
    position: absolute;
    z-index: -1;
    height: 100%;

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
