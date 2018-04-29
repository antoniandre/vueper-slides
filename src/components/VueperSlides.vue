<template lang="pug">
div.vueperslides-wrapper(:class="{'ready': isReady}")
  div.vueperslides__slide-content.vueperslides__slide-content--outside(:class="slideContentOutsideClass" v-if="slideContentOutside")
    p.slide-title(v-if="slidesCount && slides[currentSlide].title" v-html="slides[currentSlide].title")
    p.slide-content(v-if="slidesCount && slides[currentSlide].content" v-html="slides[currentSlide].content")

  div.vueperslides(:class="{'vueperslides--fade': fade, 'vueperslides--touchable': touchEnabled && !disable}" ref="vueperslides")
    div.vueperslides__slides-wrapper
      div.vueperslides__track(:class="{'vueperslides__track--dragging': dragging, 'vueperslides__track--mousedown': mouseDown}" ref="track" :style="!fade ? 'transform: translate3d(' + currentTranslation + '%, 0, 0)' : ('padding-bottom: ' + (this.slideRatio * 100) + '%')")
        vueper-slide.vueperslides__slide--clone(v-if="slidesCount && clones[0]" :clone="0" :title="clones[0].title" :content="clones[0].content" :image="clones[0].image" :style="clones[0].style")
        slot(:currentSlide="currentSlide")
        vueper-slide.vueperslides__slide--clone(v-if="slidesCount && clones[1]" :clone="1" :title="clones[1].title" :content="clones[1].content" :image="clones[1].image" :style="clones[1].style")

    div.vueperslides__paused(v-if="$slots.pausedIcon")
      slot(name="pausedIcon")
    div.vueperslides__arrows(v-if="arrows && slidesCount > 1 && !disable")
      button.vueperslides__arrow.vueperslides__arrow--prev(@click="onArrowClick(false)" v-show="!arrowPrevDisabled")
        slot(name="arrowLeft")
          svg(viewBox="0 0 24 24")
            path(d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z")
      button.vueperslides__arrow.vueperslides__arrow--next(@click="onArrowClick()" v-show="!arrowNextDisabled")
        slot(name="arrowRight")
          svg(viewBox="0 0 24 24")
            path(d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z")
    div.vueperslides__bullets(:class="{'vueperslides__bullets--outside': bulletsOutside}" v-if="bullets && slidesCount > 1 && !disable")
      button.vueperslides__bullet(:class="{'vueperslides__bullet--active': currentSlide === i}" v-for="(item, i) in slides" :key="i" @click="goToSlide(i)" @keyup.left="onArrowClick(false)" @keyup.right="onArrowClick()" ref="bullet")
        span {{ i + 1 }}
</template>

<script>
import VueperSlide from './VueperSlide.vue'

export default {
  name: 'vueper-slides',
  components: {
    VueperSlide
  },
  props: {
    initSlide: {
      type: Number,
      default: 1
    },
    slideRatio: {
      type: Number,
      default: 1/3
    },
    arrows: {
      type: Boolean,
      default: true
    },
    // Ability to disable arrows on slideshow edges. Only if not infinite mode.
    disableArrowsOnEdges: {
      type: [Boolean, String],
      default: false
    },
    bullets: {
      type: Boolean,
      default: true
    },
    bulletsOutside: {
      type: Boolean,
      default: false
    },
    fade: {
      type: Boolean,
      default: false
    },
    slideContentOutside: {
      type: Boolean,
      default: false
    },
    slideContentOutsideClass: {
      type: String,
      default: ''
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    speed: {
      type: [Number, String],
      default: 4000
    },
    pauseOnHover: {
      type: Boolean,
      default: true
    },
    infinite: {
      type: Boolean,
      default: true
    },
    touchable: {
      type: Boolean,
      default: true
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isReady: false,
    slides: [],
    slidesCount: 0,
    activeSlideUid: null,
    mouseDown: false,
    mouseOver: false,
    dragging: false,
    currentSlide: 0,
    currentTranslation: 0,
    dragStartX: 0,
    dragStartY: 0,
    goNext: true,
    timer: null,
    arrowPrevDisabled: false,
    arrowNextDisabled: false,
    touchEnabled: true,
    clones: []
  }),
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.emit('before-init', false)
      this.slidesCount = this.slides.length
      this.touchEnabled = this.touchable

      if (this.infinite && !this.fade) {
        this.cloneSlides()
      }

      this.goToSlide(this.initSlide - 1)
      this.bindEvents()

      this.isReady = true
      this.emit('ready')
    },

    // Emit a named event outside the component with 2 possible parameters:
    // current slide info & next slide info.
    emit(name, includeCurrentSlide = true, includeNextSlide = false) {
      let args = [name]

      if (includeCurrentSlide || typeof includeNextSlide === 'number') {
        args[1] = {}
        if (includeCurrentSlide && this.activeSlideUid) {
          args[1].currentSlide = {
            index: this.currentSlide,
            title: this.slides[this.currentSlide].title,
            content: this.slides[this.currentSlide].content
          }
        }
        if (typeof includeNextSlide === 'number') {
          let { nextSlide } = this.getSlideInRange(includeNextSlide)
          args[1].nextSlide = {
            index: nextSlide,
            title: this.slides[nextSlide].title,
            content: this.slides[nextSlide].content
          }
        }
      }

      this.$emit(name, ...args)
    },

    cloneSlides () {
      let firstNodeIsVnode = this.$slots.default[0].tag
      let firstSlide = this.$slots.default[firstNodeIsVnode ? 0 : 1].elm
      let lastSlide = this.$slots.default[this.$slots.default.length - 1].elm

      this.clones[0] = {
        title: this.slides[this.slidesCount - 1].title,
        content: this.slides[this.slidesCount - 1].content,
        image: this.slides[this.slidesCount - 1].image,
        style: lastSlide && lastSlide.attributes.style ? lastSlide.attributes.style.value : null
      }
      this.clones[1] = {
        title: this.slides[0].title,
        content: this.slides[0].content,
        image: this.slides[0].image,
        style: firstSlide && lastSlide.attributes.style ? firstSlide.attributes.style.value : null
      }
    },

    bindEvents () {
      const hasTouch = 'ontouchstart' in window

      if (this.touchEnabled) {
        this.$refs.track.addEventListener(hasTouch ? 'touchstart' : 'mousedown', this.onMouseDown)
        document.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove)
        document.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp)
      }

      // Pause autoplay on mouseover.
      if (this.pauseOnHover && !hasTouch && this.autoplay) {
        this.$refs.vueperslides.addEventListener('mouseover', this.onMouseIn)
        this.$refs.vueperslides.addEventListener('mouseout', this.onMouseOut)
      }

      // window.addEventListener('resize', this.getSlideshowWidth)
    },

    getDragPercentage(e) {
      this.dragStartX = 'ontouchstart' in window ? e.touches[0].clientX : e.clientX

      // For full window width slideshow only.
      // let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      // return this.dragStartX / windowWidth

      const vueperslidesWrapper = this.$refs.vueperslides.offsetParent
      return (this.dragStartX - vueperslidesWrapper.offsetLeft) / vueperslidesWrapper.clientWidth
    },

    onMouseIn () {
      this.mouseOver = true

      if (this.pauseOnHover && this.autoplay) {
        this.clearTimer()
      }
    },

    onMouseOut () {
      this.mouseOver = false

      if (this.pauseOnHover && this.autoplay) {
        this.setTimer()
      }
    },

    onMouseDown (e) {
      if (!this.touchEnabled || this.disable) return

      if (!e.touches) {
        e.preventDefault()
      }

      this.mouseDown = true

      let dragPercentage = this.getDragPercentage(e)

      // Set a flag for use while dragging in `onMouseMove` to know if drag was toward left or right.
      this.goNext = dragPercentage >= 0.5

      this.currentTranslation = - 100 * (this.currentSlide + (this.goNext ? 1 : 0) + (this.clones.length ? 1 : 0) - dragPercentage)
    },

    onMouseMove (e) {
      if (this.mouseDown || this.dragging) {
        this.mouseDown = false
        this.dragging = true

        let dragPercentage = this.getDragPercentage(e)
        this.currentTranslation = - 100 * (this.currentSlide + (this.goNext ? 1 : 0) + (this.clones.length ? 1 : 0) - dragPercentage)
      }
    },

    onMouseUp () {
      if (this.mouseDown || this.dragging) {
        this.mouseDown = false
        this.dragging = false

        // this.currentTranslation = Math.min(Math.max(0, Math.round(this.currentTranslation / 100) * 100), (this.slidesCount - 1) * 100)
        // this.currentSlide = this.currentTranslation / 100

        // When the drag is realeased, calculate if the drag ends before or after the 50%-slideshow-width threshold.
        // Then finish the sliding toward that slide.
        let slideOnDragEnd = - (Math.round(this.currentTranslation / 100) + (this.clones.length ? 1 : 0))
        let { nextSlide } = this.getSlideInRange(slideOnDragEnd)

        // If drag is not allowed (`arrowNextDisabled` = true) and dragging beyond last slide,
        // cancel sliding and snap back to last slide.
        if (this.arrowNextDisabled && this.autoplay && nextSlide === 0) {
          nextSlide = this.slidesCount - 1
        }

        // Only call `goToSlide` if the drag ends on a slide that is different than the currentSlide.
        if (nextSlide !== this.currentSlide) {
          this.goToSlide(slideOnDragEnd)
        } else {
          // Apply transition to snap back to current slide.
          this.currentTranslation = - (this.currentSlide + (this.clones.length ? 1 : 0)) * 100
        }

        this.enableScroll()
      }
    },

    disableScroll () {
      document.ontouchmove = function(e) {
        e.preventDefault()
      }
    },

    enableScroll () {
      document.ontouchmove = function() {
        return true
      }
    },

    clearTimer () {
      clearTimeout(this.timer)
      this.timer = 0
    },

    setTimer () {
      this.timer = setTimeout(() => {
        this.goToSlide(this.currentSlide + 1, true, true)
      }, this.speed)
    },

    onArrowClick (next = true) {
      this.goToSlide(this.currentSlide + (next ? 1 : -1))
    },

    getSlideInRange (i) {
      let clone = null

      // If infinite enabled, going out of range takes the first slide from the other end.
      if (this.clones.length) {
        if (i < 0) {
          i = this.slidesCount - 1
          clone = 0
        }
        else if (i > this.slidesCount - 1) {
          i = 0
          clone = 1
        }
      }

      // If not infinite, can't go lower than 0 or beyond `slidesCount` with `disableArrowsOnEdges`.
      // If `disableArrowsOnEdges` is enabled going out of range will take first slide from the other end
      // of the slideshow.
      else {
        if (i < 0) i = this.disableArrowsOnEdges ? 0 : this.slidesCount - 1
        else if (i > this.slidesCount - 1) {
          // If autoplay is on but disableArrowsOnEdges is enabled, going beyond the last one will also bring
          // the first one in.
          i = this.disableArrowsOnEdges ? (this.autoplay ? 0 : this.slidesCount - 1) : 0
        }
      }

      return { nextSlide: i, clone: clone }
    },

    goToSlide (i, animation = true, autoSliding = false) {
      if (!this.slidesCount || this.disable) return

      if (this.autoplay) this.clearTimer()

      let { nextSlide, clone: nextSlideIsClone } = this.getSlideInRange(i)

      // First use of `goToSlide` is while init, so should not propagate an event.
      if (this.isReady) this.emit('before-slide', true, nextSlide)

      // Disable arrows if `disableArrowsOnEdges` is on and there is no slide to go to on that end.
      if (this.arrows && this.disableArrowsOnEdges) {
        this.arrowPrevDisabled = nextSlide === 0
        this.arrowNextDisabled = nextSlide === this.slidesCount - 1
      }

      this.$refs.track.classList[animation ? 'remove' : 'add']('vueperslides__track--no-animation')

      // Infinite sliding with cloned slides:
      // When reaching last slide and going next the cloned slide of the first slide
      // shows up, when the animation ends the real change to the first slide is done
      // immediately with no animation.
      // Same principle when going beyond first slide.
      if (nextSlideIsClone !== null) {
        setTimeout(() => {
          this.goToSlide(nextSlideIsClone ? 0 : this.slidesCount - 1, false, autoSliding)
        }, 400)
      }

      this.currentSlide = nextSlide

      // Only apply sliding transition when the slideshow animation type is `slide`.
      if (!this.fade) {
        if (nextSlideIsClone !== null) {
          this.currentTranslation = - 100 * (nextSlideIsClone ? this.slidesCount + 1 : 0)
        }
        else this.currentTranslation = - 100 * (this.currentSlide + (this.clones.length ? 1 : 0))
      }

      this.activeSlideUid = this.slides[this.currentSlide]._uid

      if (this.autoplay && !this.mouseOver) {
        this.setTimer()
      }

      if (this.slidesCount) {
        if (this.$slots.default[this.currentSlide]) {
          // First use of goToSlide is while init, so should not propagate an event.
          if (this.isReady) this.emit('slide')
        }

        if (this.isReady && !autoSliding && this.$refs.bullet[this.currentSlide]) {
          this.$refs.bullet[this.currentSlide].focus()
        }
      }
    },

    addSlide(newSlide) {
      const needReclone = this.infinite && !this.fade && this.isReady && !newSlide.clone

      if (newSlide.clone !== null) {
        this.clones[newSlide.clone] = newSlide
      }

      else {
        // Add the slide in the slides array & update slidesCount.
        this.slides.push(newSlide)
        this.slidesCount = this.slides.length
      }

      if (this.slidesCount > 1) {
        this.touchEnabled = true
      }

      if (needReclone) {
        this.$nextTick(() => this.cloneSlides())
      }
    },

    removeSlide(uid) {
      // let needReclone = this.infinite && !this.fade && this.isReady
      let needReclone = false

      this.slides.some((slide, i) => {
        if (slide._uid === uid) {
          // Remove the slide.
          this.slides.splice(i, 1)
          this.slidesCount = this.slides.length

          // If the slide to remove is the current slide, slide to the previous slide.
          if (uid === this.activeSlideUid) {
            this.activeSlideUid = null
            this.goToSlide(i - 1, true, true)
          }

          if (this.slidesCount <= 1) {
            this.touchEnabled = false
          }

          if (this.clones.length && this.isReady && !slide.clone) needReclone = true

          return true // Break the `Array.some` loop.
        }
      })

      if (this.slidesCount && needReclone) {
        this.cloneSlides()
      }
    }
  }
}
</script>

<style lang="scss">
.vueperslides {
  position: relative;

  &-wrapper {
    position: relative;
  }

  &__slides-wrapper {
    position: relative;
    overflow: hidden;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    z-index: 1;

    &::before,
    &::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: -1em;
      right: -1em;
      height: 2em;
      box-shadow: 0 0 20px rgba(#000, 0.25);
      z-index: 2;
    }
    &::after {
      top: 100%;
      bottom: auto;
    }
  }

  &--fade &__track {
    white-space: normal;
    transition: none;
  }

  &--touchable &__track {
    cursor: ew-resize;
    cursor: -webkit-grab;

    &--mousedown, &--dragging {
      cursor: -webkit-grabbing;
    }
  }

  &__track {
    white-space: nowrap;
    transition: 0.5s ease-in-out transform;

    &--mousedown {
      transition: 0.2s ease-in-out transform;
    }

    &--dragging {
      transition: none;
    }

    &--no-animation {
      transition-duration: 0s;
    }
  }

  &__slide {
    white-space: normal;
    padding-bottom: 34%;
    background-position: top;
    background-size: cover;
    display: inline-block;
    width: 100%;
    height: 0;
    // Remove whitespace due to text nodes in combination with display
    // inline block and whitespace nowrap.
    margin-bottom: -8px;
  }

  &__slide-content {
    user-select: none;

    &--outside {
      user-select: initial;
    }
  }

  &--fade &__slide {
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

  &__arrow {
    position: absolute;
    top: 50%;
    color: #fff;
    fill: currentColor;
    font-size: 3em;
    width: 1em;
    text-align: center;
    transform: translateY(-50%);
    opacity: 0.7;
    z-index: 10;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    user-select: none;
    outline: none;
    z-index: 2;

    &--prev {
      left: 10px;
    }
    &--next {
      right: 10px;
    }

    &:hover {
      opacity: 1;
    }
  }

  &__paused {
    position: absolute;
    top: 3%;
    right: 3%;
    opacity: 0;
    transition: 0.3s ease-in-out;
    text-shadow: 0 0 3px rgba(#000, .4);
    z-index: 1;
  }

  &:hover &__paused {
    opacity: 1;
  }

  &__bullets {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    &--outside {
      position: relative;
    }
  }

  &__bullet {
    width: 12px;
    height: 12px;
    border-radius: 12px;
    border: 1px solid #fff;
    box-shadow: 0 0 1px rgba(#000, 0.5), 0 0 3px rgba(#000, 0.3);
    margin: 1.5em 0.6em;
    display: inline-block;
    cursor: pointer;
    user-select: none;
    outline: none;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    &--active {
      background-color: #fff;
    }
    span {display: none;}
  }
}

@media screen and (max-width: 1000px) {
  .vueperslides__slide {
    padding-bottom: 45%;
  }
  .vueperslides--fade .vueperslides__track {
    padding-bottom: 45%;
  }
}

@media screen and (max-width: 700px) {
  .vueperslides__slide {
    padding-bottom: 54%;
  }
  .vueperslides--fade .vueperslides__track {
    padding-bottom: 54%;
  }
}

@media screen and (max-width: 400px) {
  .vueperslides__slide {
    padding-bottom: 60%;
  }
  .vueperslides--fade .vueperslides__track {
    padding-bottom: 60%;
  }
}
</style>
