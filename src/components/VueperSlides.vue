<template lang="pug">
div.vueperslides-wrapper(:class="{'ready': isReady}")
  div.vueperslides__slide-content.vueperslides__slide-content--outside(:class="conf.slideContentOutsideClass" v-if="conf.slideContentOutside")
    p.slide-title(v-if="slides.count && slides.list[slides.current].title" v-html="slides.list[slides.current].title")
    p.slide-content(v-if="slides.count && slides.list[slides.current].content" v-html="slides.list[slides.current].content")

  div.vueperslides(:class="{'vueperslides--fade': conf.fade, 'vueperslides--touchable': touch.enabled && !disable}" ref="vueperslides")
    div.vueperslides__slides-wrapper
      div.vueperslides__track(:class="{'vueperslides__track--dragging': touch.dragging, 'vueperslides__track--mousedown': mouseDown}" ref="track" :style="!conf.fade ? 'transform: translate3d(' + currentTranslation + '%, 0, 0)' : ('padding-bottom: ' + (conf.slideRatio * 100) + '%')")
        vueper-slide.vueperslides__slide--clone(v-if="slides.count && clones[0]" :clone="0" :title="clones[0].title" :content="clones[0].content" :image="clones[0].image" :style="clones[0].style")
        slot(:currentSlide="slides.current")
        vueper-slide.vueperslides__slide--clone(v-if="slides.count && clones[1]" :clone="1" :title="clones[1].title" :content="clones[1].content" :image="clones[1].image" :style="clones[1].style")

    div.vueperslides__paused(v-if="$slots.pausedIcon")
      slot(name="pausedIcon")
    div.vueperslides__arrows(v-if="conf.arrows && slides.count > 1 && !disable")
      button.vueperslides__arrow.vueperslides__arrow--prev(@click="onArrowClick(false)" v-show="!arrowPrevDisabled")
        slot(name="arrowLeft")
          svg(viewBox="0 0 24 24")
            path(d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z")
      button.vueperslides__arrow.vueperslides__arrow--next(@click="onArrowClick()" v-show="!arrowNextDisabled")
        slot(name="arrowRight")
          svg(viewBox="0 0 24 24")
            path(d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z")
    div.vueperslides__bullets(:class="{'vueperslides__bullets--outside': conf.bulletsOutside}" v-if="conf.bullets && slides.count > 1 && !disable")
      button.vueperslides__bullet(:class="{'vueperslides__bullet--active': slides.current === i}" v-for="(item, i) in slides.list" :key="i" @click="goToSlide(i)" @keyup.left="onArrowClick(false)" @keyup.right="onArrowClick()" ref="bullet")
        span {{ i + 1 }}
</template>

<script>
import VueperSlide from './VueperSlide.vue'

export default {
  name: 'vueper-slides',
  components: { VueperSlide },
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
    // By default when touch is enabled you have to drag from a slide side and pass 50% of slideshow width to change
    // slide. This setting changes this behavior to a horizontal pixel amount from anywhere on slideshow.
    draggingDistance: {
      type: [Number],
      default: null
    },
    disable: {
      type: Boolean,
      default: false
    },
    breakpoints: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    isReady: false,
    slides: { list: [], count: 0, activeUid: null, current: 0, clones: [] },
    clones: [],
    mouseDown: false,
    mouseOver: false,
    touch: { enabled: true, dragging: false, dragStartX: 0, dragAmount: 0, goNext: true },
    currentTranslation: 0,
    timer: null,
    arrowPrevDisabled: false,
    arrowNextDisabled: false,
    breakpointsData: { list: [], current: null },
    conf: null
  }),
  created () {
    this.conf = { ...this.$props }
    delete this.conf.breakpoints // Prevent cyclic redundancy.
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.emit('before-init', false)
      this.slides.count = this.slides.list.length

      if (Object.keys(this.breakpoints).length) {
        this.setBreakpointsList()
        this.setBreakpointConfig(this.getCurrentBreakpoint())
      }

      this.touch.enabled = this.conf.touchable

      if (this.conf.infinite && !this.conf.fade) {
        this.cloneSlides()
      }

      this.goToSlide(this.conf.initSlide - 1)
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
        if (includeCurrentSlide && this.slides.activeUid) {
          args[1].currentSlide = {
            index: this.slides.current,
            title: this.slides.list[this.slides.current].title,
            content: this.slides.list[this.slides.current].content
          }
        }
        if (typeof includeNextSlide === 'number') {
          let { nextSlide } = this.getSlideInRange(includeNextSlide)
          args[1].nextSlide = {
            index: nextSlide,
            title: this.slides.list[nextSlide].title,
            content: this.slides.list[nextSlide].content
          }
        }
      }

      this.$emit(name, ...args)
    },

    setBreakpointsList () {
      this.breakpointsData.list = [99999, ...Object.keys(this.breakpoints)].sort((a, b) => parseInt(a) < parseInt(b))
    },

    getCurrentBreakpoint () {
      let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      let breakpoints = [windowWidth, ...this.breakpointsData.list].sort((a, b) => parseInt(a) < parseInt(b))

      return this.breakpointsData.list[breakpoints.indexOf(windowWidth) - 1]
    },

    hasBreakpointChanged (breakpoint) {
      return this.breakpointsData.current !== breakpoint
    },

    setBreakpointConfig (breakpoint) {
      this.breakpointsData.current = breakpoint
      this.conf = { ...this.$props, ...(this.$props.breakpoints[breakpoint] || {}) }

      // Re-apply slide ratio on clones.
      if (this.clones.length && this.conf.slideRatio) {
        this.clones[0].style['padding-bottom'] = `${this.conf.slideRatio * 100}%`
        this.clones[1].style['padding-bottom'] = `${this.conf.slideRatio * 100}%`
      }
    },

    cloneSlides () {
      let firstNodeIsVnode = this.$slots.default[0].tag
      let firstSlide = this.$slots.default[firstNodeIsVnode ? 0 : 1].elm
      let lastSlide = this.$slots.default[this.$slots.default.length - 1].elm

      this.clones[0] = {
        title: this.slides.list[this.slides.count - 1].title,
        content: this.slides.list[this.slides.count - 1].content,
        image: this.slides.list[this.slides.count - 1].image,
        // Need to define CSS style in an object format for possible later override of paddingBottom in setBreakpointConfig().
        style: { cssText: lastSlide && lastSlide.attributes.style ? lastSlide.attributes.style.value : null }
      }
      this.clones[1] = {
        title: this.slides.list[0].title,
        content: this.slides.list[0].content,
        image: this.slides.list[0].image,
        style: { cssText: firstSlide && lastSlide.attributes.style ? firstSlide.attributes.style.value : null }
      }
    },

    bindEvents () {
      const hasTouch = 'ontouchstart' in window

      if (this.touch.enabled) {
        this.$refs.track.addEventListener(hasTouch ? 'touchstart' : 'mousedown', this.onMouseDown)
        document.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove)
        document.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp)
      }

      // Pause autoplay on mouseover.
      if (this.conf.pauseOnHover && !hasTouch && this.conf.autoplay) {
        this.$refs.vueperslides.addEventListener('mouseover', this.onMouseIn)
        this.$refs.vueperslides.addEventListener('mouseout', this.onMouseOut)
      }

      if (this.breakpointsData.list.length) {
        window.addEventListener('resize', this.onResize)
      }
    },

    onResize () {
      let breakpoint = this.getCurrentBreakpoint()
      if (this.hasBreakpointChanged(breakpoint)) {
        this.setBreakpointConfig(breakpoint)
      }
    },

    onMouseIn () {
      this.mouseOver = true

      if (this.conf.pauseOnHover && this.conf.autoplay) {
        this.clearTimer()
      }
    },

    onMouseOut () {
      this.mouseOver = false

      if (this.conf.pauseOnHover && this.conf.autoplay) {
        this.setTimer()
      }
    },

    onMouseDown (e) {
      if (!this.touch.enabled || this.disable) return
      if (!e.touches) e.preventDefault()

      // this.disableScroll()

      this.mouseDown = true

      if (this.draggingDistance) {
        // Store drag start in var for distance calculation in onMouseUp().
        this.touch.dragStartX = 'ontouchstart' in window ? e.touches[0].clientX : e.clientX
      } else {
        let dragPercentage = this.getDragPercentage(e)

        // Set a flag for use while dragging in `onMouseMove` to know if drag was toward left or right.
        this.touch.goNext = dragPercentage >= 0.5

        this.currentTranslation = - 100 * (this.slides.current + (this.touch.goNext ? 1 : 0) + (this.clones.length ? 1 : 0) - dragPercentage)
      }
    },

    onMouseMove (e) {
      if (this.mouseDown || this.touch.dragging) {
        this.mouseDown = false
        this.touch.dragging = true

        if (this.draggingDistance) {
          this.touch.dragAmount = this.getDragAmount(e)
          let dragAmountPercentage = this.touch.dragAmount / this.$refs.vueperslides.offsetParent.clientWidth

          this.currentTranslation = - 100 * (this.slides.current + (this.clones.length ? 1 : 0) - dragAmountPercentage)
        } else {
          let dragPercentage = this.getDragPercentage(e)
          this.currentTranslation = - 100 * (this.slides.current + (this.touch.goNext ? 1 : 0) + (this.clones.length ? 1 : 0) - dragPercentage)
        }
      }
    },

    onMouseUp (e) {
      if (this.mouseDown || this.touch.dragging) {
        this.mouseDown = false
        this.touch.dragging = false

        let slideOnDragEnd
        if (this.draggingDistance) {
          let dragAmount = this.touch.dragAmount
          let dragAmountPercentage = dragAmount / this.$refs.vueperslides.offsetParent.clientWidth

          slideOnDragEnd = this.slides.current
          if (Math.abs(dragAmount) >= this.draggingDistance) {
            slideOnDragEnd += dragAmount > 0 ? -1 : 1
          }
        } else {
          // When the drag is realeased, calculate if the drag ends before or after the 50%-slideshow-width threshold.
          // Then finish the sliding toward that slide.
          slideOnDragEnd = - (Math.round(this.currentTranslation / 100) + (this.clones.length ? 1 : 0))
        }

        let { nextSlide } = this.getSlideInRange(slideOnDragEnd)

        // If drag is not allowed (`arrowNextDisabled` = true) and dragging beyond last slide,
        // cancel sliding and snap back to last slide.
        if (this.arrowNextDisabled && this.conf.autoplay && nextSlide === 0) {
          nextSlide = this.slides.count - 1
        }

        // Only call `goToSlide` if the drag ends on a slide that is different than the currentSlide.
        if (nextSlide !== this.slides.current) {
          this.goToSlide(slideOnDragEnd)
        } else {
          // Apply transition to snap back to current slide.
          this.currentTranslation = - (this.slides.current + (this.clones.length ? 1 : 0)) * 100
        }

        this.touch.dragStartX = null
        this.touch.dragAmount = null
        this.enableScroll()
      }
    },

    getDragPercentage(e) {
      let dragStartX = 'ontouchstart' in window ? e.touches[0].clientX : e.clientX

      // For full window width slideshow only.
      // let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      // return dragStartX / windowWidth

      const vueperslidesWrapper = this.$refs.vueperslides.offsetParent
      return (dragStartX - vueperslidesWrapper.offsetLeft) / vueperslidesWrapper.clientWidth
    },

    /**
     * Return the x distance in pixel between drag start and current drag position.
     */
    getDragAmount(e) {
      return ('ontouchstart' in window ? e.touches[0].clientX : e.clientX) - this.touch.dragStartX
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
        this.goToSlide(this.slides.current + 1, true, true)
      }, this.conf.speed)
    },

    onArrowClick (next = true) {
      this.goToSlide(this.slides.current + (next ? 1 : -1))
    },

    getSlideInRange (i) {
      let clone = null

      // If infinite enabled, going out of range takes the first slide from the other end.
      if (this.clones.length) {
        if (i < 0) {
          i = this.slides.count - 1
          clone = 0
        }
        else if (i > this.slides.count - 1) {
          i = 0
          clone = 1
        }
      }

      // If not infinite, can't go lower than 0 or beyond `slides.count` with `disableArrowsOnEdges`.
      // If `disableArrowsOnEdges` is enabled going out of range will take first slide from the other end
      // of the slideshow.
      else {
        if (i < 0) i = this.conf.disableArrowsOnEdges ? 0 : this.slides.count - 1
        else if (i > this.slides.count - 1) {
          // If autoplay is on but disableArrowsOnEdges is enabled, going beyond the last one will also bring
          // the first one in.
          i = this.conf.disableArrowsOnEdges ? (this.conf.autoplay ? 0 : this.slides.count - 1) : 0
        }
      }

      return { nextSlide: i, clone: clone }
    },

    goToSlide (i, animation = true, autoSliding = false) {
      if (!this.slides.count || this.disable) return

      if (this.conf.autoplay) this.clearTimer()

      let { nextSlide, clone: nextSlideIsClone } = this.getSlideInRange(i)

      // First use of `goToSlide` is while init, so should not propagate an event.
      if (this.isReady) this.emit('before-slide', true, nextSlide)

      // Disable arrows if `disableArrowsOnEdges` is on and there is no slide to go to on that end.
      if (this.conf.arrows && this.conf.disableArrowsOnEdges) {
        this.arrowPrevDisabled = nextSlide === 0
        this.arrowNextDisabled = nextSlide === this.slides.count - 1
      }

      this.$refs.track.classList[animation ? 'remove' : 'add']('vueperslides__track--no-animation')

      // Infinite sliding with cloned slides:
      // When reaching last slide and going next the cloned slide of the first slide
      // shows up, when the animation ends the real change to the first slide is done
      // immediately with no animation.
      // Same principle when going beyond first slide.
      if (nextSlideIsClone !== null) {
        setTimeout(() => {
          this.goToSlide(nextSlideIsClone ? 0 : this.slides.count - 1, false, autoSliding)
        }, 400)
      }

      this.slides.current = nextSlide

      // Only apply sliding transition when the slideshow animation type is `slide`.
      if (!this.conf.fade) {
        if (nextSlideIsClone !== null) {
          this.currentTranslation = - 100 * (nextSlideIsClone ? this.slides.count + 1 : 0)
        }
        else this.currentTranslation = - 100 * (this.slides.current + (this.clones.length ? 1 : 0))
      }

      this.slides.activeUid = this.slides.list[this.slides.current]._uid

      if (this.conf.autoplay && !this.mouseOver) {
        this.setTimer()
      }

      if (this.slides.count) {
        if (this.$slots.default[this.slides.current]) {
          // First use of goToSlide is while init, so should not propagate an event.
          if (this.isReady) this.emit('slide')
        }

        if (this.isReady && !autoSliding && this.$refs.bullet[this.slides.current]) {
          this.$refs.bullet[this.slides.current].focus()
        }
      }
    },

    addSlide(newSlide) {
      const needReclone = this.conf.infinite && !this.conf.fade && this.isReady && !newSlide.clone

      if (newSlide.clone !== null) {
        this.clones[newSlide.clone] = newSlide
      }

      else {
        // Add the slide in the slides array & update slides.count.
        this.slides.list.push(newSlide)
        this.slides.count = this.slides.list.length
      }

      if (this.slides.count > 1) {
        this.touch.enabled = true
      }

      if (needReclone) {
        this.$nextTick(() => this.cloneSlides())
      }
    },

    removeSlide(uid) {
      // let needReclone = this.infinite && !this.fade && this.isReady
      let needReclone = false

      this.slides.list.some((slide, i) => {
        if (slide._uid === uid) {
          // Remove the slide.
          this.slides.list.splice(i, 1)
          this.slides.count = this.slides.list.length

          // If the slide to remove is the current slide, slide to the previous slide.
          if (uid === this.slides.activeUid) {
            this.slides.activeUid = null
            this.goToSlide(i - 1, true, true)
          }

          if (this.slides.count <= 1) {
            this.touch.enabled = false
          }

          if (this.clones.length && this.isReady && !slide.clone) needReclone = true

          return true // Break the `Array.some` loop.
        }
      })

      if (this.slides.count && needReclone) {
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
    background-color: transparent;
    border: none;
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
    background-color: transparent;
    box-shadow: 0 0 1px rgba(#000, 0.5), 0 0 3px rgba(#000, 0.3);
    margin: 1.5em 0.6em;
    padding: 0;
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
