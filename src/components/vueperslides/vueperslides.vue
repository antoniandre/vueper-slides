<template lang="pug">
.vueperslides(
  ref="vueperslides"
  :class="vueperslidesClasses"
  aria-label="Slideshow"
  :style="vueperslidesStyles")
  .vueperslide__content-wrapper.vueperslide__content-wrapper--outside-top(
    v-if="slidesCount && conf.slideContentOutside === 'top'"
    :class="conf.slideContentOutsideClass")
    .vueperslide__title
      vnodes(v-if="currentSlide.titleSlot" slot="slideTitle" :vnodes="currentSlide.titleSlot")
      div(v-else v-html="currentSlide.title")
    .vueperslide__content
      vnodes(v-if="currentSlide.contentSlot" slot="slideContent" :vnodes="currentSlide.contentSlot")
      div(v-else v-html="currentSlide.content")

  .vueperslides__inner
    .vueperslides__parallax-wrapper(:style="`padding-bottom: ${conf.slideRatio * 100}%`" aria-live="polite")
      .vueperslides__track(
        ref="track"
        :class="{ 'vueperslides__track--dragging': touch.dragging, 'vueperslides__track--mousedown': mouseDown }"
        :style="trackStyles")
        .vueperslides__track-inner(:style="trackInnerStyles")
          vueper-slide.vueperslide--clone(
            v-if="isReady && conf.infinite && slidesCount > 1 && lastSlide"
            clone
            :title="lastSlide.title"
            :content="lastSlide.content"
            :image="lastSlide.image"
            :link="lastSlide.link"
            :style="conf.refreshClonesOnDrag ? getLastSlideStyle() : lastSlide.style"
            aria-hidden="true")
            template(v-slot:slideTitle)
              vnodes(v-if="lastSlide.titleSlot" :vnodes="lastSlide.titleSlot")
            template(v-slot:slideContent)
              vnodes(v-if="lastSlide.contentSlot" :vnodes="lastSlide.contentSlot")
          slot(:currentSlide="slides.current")
          vueper-slide.vueperslide--clone(
            v-if="isReady && conf.infinite && slidesCount > 1 && firstSlide"
            clone
            :title="firstSlide.title"
            :content="firstSlide.content"
            :image="firstSlide.image"
            :link="firstSlide.link"
            :style="conf.refreshClonesOnDrag ? getFirstSlideStyle() : firstSlide.style"
            aria-hidden="true")
            vnodes(v-if="lastSlide.titleSlot" slot="slideTitle" :vnodes="firstSlide.titleSlot")
            vnodes(v-if="lastSlide.contentSlot" slot="slideContent" :vnodes="firstSlide.contentSlot")

    .vueperslides__paused(v-if="conf.pauseOnHover && $slots.pausedIcon")
      slot(name="pausedIcon")
    .vueperslides__arrows(
      :class="{ 'vueperslides__arrows--outside': conf.arrowsOutside }"
      v-if="conf.arrows && slidesCount > 1 && !disable")
      button.vueperslides__arrow.vueperslides__arrow--prev(
        @click="previous()"
        v-show="!arrowPrevDisabled"
        aria-label="Previous"
        @keyup.left="previous()"
        @keyup.right="next()")
        slot(name="arrowLeft")
          svg(viewBox="0 0 24 24")
            path(d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z")
      button.vueperslides__arrow.vueperslides__arrow--next(
        @click="next()"
        v-show="!arrowNextDisabled"
        aria-label="Next"
        @keyup.left="previous()"
        @keyup.right="next()")
        slot(name="arrowRight")
          svg(viewBox="0 0 24 24")
            path(d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z")
    .vueperslides__bullets(
      v-if="conf.bullets && slidesCount > 1 && !disable && !conf.bulletsOutside"
      role="tablist"
      aria-label="Slideshow navigation")
      button.vueperslides__bullet(
        ref="bullet"
        v-for="(item, i) in Math.ceil(slidesCount / conf.slideMultiple)"
        :key="i"
        :class="{ 'vueperslides__bullet--active': slides.current === i * conf.slideMultiple }"
        role="tab"
        :aria-label="`Slide ${i + 1}`"
        @click="goToSlide(i * conf.slideMultiple)"
        @keyup.left="previous()"
        @keyup.right="next()")
        span {{ i + 1 }}

  .vueperslides__bullets.vueperslides__bullets--outside(
    v-if="conf.bullets && slidesCount > 1 && !disable && conf.bulletsOutside"
    role="tablist"
    aria-label="Slideshow navigation")
    button.vueperslides__bullet(
      ref="bullet"
      v-for="(item, i) in Math.ceil(slidesCount / conf.slideMultiple)"
      :key="i"
      :class="{ 'vueperslides__bullet--active': slides.current === i * conf.slideMultiple }"
      role="tab"
      :aria-label="`Slide ${i + 1}`"
      @click="goToSlide(i * conf.slideMultiple)"
      @keyup.left="previous()"
      @keyup.right="next()")
      span {{ i + 1 }}

  .vueperslide__content-wrapper.vueperslide__content-wrapper--outside-bottom(
    v-if="slidesCount && conf.slideContentOutside === 'bottom'"
    :class="conf.slideContentOutsideClass")
    .vueperslide__title
      vnodes(v-if="currentSlide.titleSlot" slot="slideTitle" :vnodes="currentSlide.titleSlot")
      div(v-else v-html="currentSlide.title")
    .vueperslide__content
      vnodes(v-if="currentSlide.contentSlot" slot="slideContent" :vnodes="currentSlide.contentSlot")
      div(v-else v-html="currentSlide.content")
</template>

<script>
import VueperSlide from './vueperslide'
import './styles.scss'

export default {
  name: 'vueper-slides',
  components: {
    VueperSlide,
    vnodes: { functional: true, render: (h, ctx) => ctx.props.vnodes }
  },
  props: {
    initSlide: { type: Number, default: 1 },
    slideRatio: { type: Number, default: 1 / 3 },
    arrows: { type: Boolean, default: true },
    arrowsOutside: { type: Boolean, default: null },
    // Ability to disable arrows on slideshow edges. Only if not infinite mode.
    disableArrowsOnEdges: { type: [Boolean, String], default: false },
    bullets: { type: Boolean, default: true },
    bulletsOutside: { type: Boolean, default: null },
    fade: { type: Boolean, default: false },
    slideContentOutside: { type: [Boolean, String], default: false },
    slideContentOutsideClass: { type: String, default: '' },
    autoplay: { type: Boolean, default: false },
    speed: { type: [Number, String], default: 4000 },
    transitionSpeed: { type: [Number, String], default: 600 },
    pauseOnHover: { type: Boolean, default: true },
    infinite: { type: Boolean, default: true },
    refreshClonesOnDrag: { type: Boolean, default: false },
    parallax: { type: [Boolean, Number], default: false },
    touchable: { type: Boolean, default: true },
    preventYScroll: { type: Boolean, default: false },
    // By default when touch is enabled you have to drag from a slide side and pass 50% of
    // slideshow width to change slide. This setting changes this behavior to a horizontal
    // pixel amount from anywhere on slideshow.
    draggingDistance: { type: Number, default: null },
    disable: { type: Boolean, default: false },
    breakpoints: { type: Object, default: () => ({}) },
    fixedHeight: { type: [Boolean, String], default: false },
    slideImageInside: { type: Boolean, default: false },
    slideMultiple: { type: [Boolean, Number], default: false },
    visibleSlides: { type: Number, default: 1 },
    '3d': { type: Boolean, default: false }
  },

  data: () => ({
    isReady: false,
    container: null,
    slides: {
      list: [],
      activeId: null,
      current: 0,
      focus: 0, // Don't loose the focused slide when changing breakpoint & slideMultiple > 1.
      clones: []
    },
    clones: [],
    mouseDown: false,
    mouseOver: false,
    touch: { enabled: true, dragging: false, justDragged: false, dragStartX: 0, dragNowX: 0, dragAmount: 0 },
    transition: { currentTranslation: 0, speed: 0, animated: false },
    autoplayTimer: null,
    arrowPrevDisabled: false,
    arrowNextDisabled: false,
    breakpointsData: { list: [], current: null },
    parallaxData: { translation: 0, slideshowOffsetTop: null, isVisible: false }
  }),

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.container = this.$refs.vueperslides
      this.touchEnabled = this.conf.touchable
      // Store speed in extra variable because transition.speed can be set to 0,
      // then after slide change we need to reapply original speed.
      this.transition.speed = this.conf.transitionSpeed

      if (Object.keys(this.breakpoints).length) {
        this.setBreakpointsList()
        this.setBreakpointConfig(this.getCurrentBreakpoint())
      }

      this.goToSlide(this.conf.initSlide - 1, { animation: false })
      this.bindEvents()

      // Give it a tick to be mounted in the DOM.
      this.$nextTick(() => {
        this.isReady = true
        this.emit('ready')
      })
    },

    // Emit a named event outside the component with 2 possible parameters:
    // current slide info & next slide info.
    emit (name, includeCurrentSlide = true, includeNextSlide = false) {
      // Emit param 0 = event name string.
      let args = [name]

      if (includeCurrentSlide || typeof includeNextSlide === 'number') {
        // the `emit` 2nd parameter is an object like { currentSlide: ...[, nextSlide: ...] }.
        args[1] = {}

        if (includeCurrentSlide && this.slides.activeId && this.slidesCount) {
          args[1].currentSlide = this.getSlideData(this.slides.current)
        }

        if (typeof includeNextSlide === 'number' && this.slidesCount) {
          const { nextSlide: nextSlideIndex } = this.getSlideInRange(includeNextSlide)
          args[1].nextSlide = this.getSlideData(nextSlideIndex)
        }
      }

      this.$emit(name, ...args)
    },

    getFirstSlideStyle () {
      const domElement = (this.$slots.default[0] || {}).elm
      if (!domElement) return ''

      const { attributes: { style: { value = '' } = {} } = {} } = domElement
      return value
    },

    getLastSlideStyle () {
      const domElement = (this.$slots.default[this.$slots.default.length - 1] || {}).elm
      if (!domElement) return ''

      const { attributes: { style: { value = '' } = {} } = {} } = domElement
      return value
    },

    getSlideData (index) {
      const slide = this.slides.list[index]
      let data = {}

      if (slide) {
        data = {
          title: slide.title,
          titleSlot: slide.titleSlot,
          content: slide.content,
          contentSlot: slide.contentSlot,
          image: slide.image,
          link: slide.link
        }
      }

      return data
    },

    setBreakpointsList () {
      this.breakpointsData.list = [99999, ...Object.keys(this.breakpoints)].map(bp => parseInt(bp)).sort((a, b) => parseInt(b) - parseInt(a))
    },

    getCurrentBreakpoint () {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      const breakpoints = [windowWidth, ...this.breakpointsData.list].sort((a, b) => parseInt(b) - parseInt(a))
      return this.breakpointsData.list[breakpoints.indexOf(windowWidth) - 1]
    },

    hasBreakpointChanged (breakpoint) {
      return this.breakpointsData.current !== parseInt(breakpoint)
    },

    setBreakpointConfig (breakpoint) {
      const bp = (this.breakpoints && this.breakpoints[breakpoint]) || {}
      const slideMultipleChanged = bp.slideMultiple !== this.conf.slideMultiple

      // this.conf gets updated by itself when this.breakpointsData.current changes.
      this.breakpointsData.current = breakpoint

      if (slideMultipleChanged) {
        this.slides.current = this.slides.focus
        this.goToSlide(this.slides.current)
      }
    },

    bindEvents () {
      const hasTouch = 'ontouchstart' in window

      // Allow mouse or touch dragging slides.
      if (this.touchEnabled) this.toggleTouchableOption(true)

      // Pause autoplay on mouseover.
      if (this.conf.pauseOnHover && !hasTouch && this.conf.autoplay) {
        this.container.addEventListener('mouseover', this.onMouseIn)
        this.container.addEventListener('mouseout', this.onMouseOut)
      }

      // Breakpoints or parallax need a resize event.
      if (this.breakpointsData.list.length || this.conf.parallax) {
        window.addEventListener('resize', this.onResize)
      }

      // Parallax slideshow.
      if (this.conf.parallax) {
        // First render the onload translation.
        this.refreshParallax()

        // then add event listener.
        document.addEventListener('scroll', this.onScroll)
      }
    },

    // Recursively sum all the offsetTop values from current element up the tree until body.
    // By doing so a padding or margin on a parent won't cause a wrong calculation.
    getSlideshowOffsetTop (force = false) {
      if (this.parallaxData.slideshowOffsetTop === null || force) {
        let el = this.container
        let top = el.offsetTop

        while ((el = el.offsetParent)) {
          top += el.offsetTop
        }

        this.parallaxData.slideshowOffsetTop = top
      }

      return this.parallaxData.slideshowOffsetTop
    },

    onScroll () {
      const doc = document.documentElement
      const scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      const windowHeight = window.innerHeight || doc.clientHeight || document.body.clientHeight
      const slideshowHeight = this.container.clientHeight
      const slideshowTopOffset = this.getSlideshowOffsetTop()

      // The distance between the bottom line of the current vueperslides slideshow and top of window.
      // Negative value means the slideshow is totally above the current window box.
      const vsBottom2WinTop = slideshowTopOffset + slideshowHeight - scrollTop
      // The distance between the top line of the current vueperslides slideshow and bottom of window.
      // Negative value means the slideshow is totally bellow the current window box.
      const vsTop2winBottom = windowHeight + scrollTop - slideshowTopOffset

      this.parallaxData.isVisible = vsBottom2WinTop > 0 && vsTop2winBottom > 0

      // Only apply translation when slideshow is visible.
      if (this.parallaxData.isVisible) {
        const heightToCoverWithTranslation = windowHeight + slideshowHeight
        const percentage = vsBottom2WinTop * 100 / heightToCoverWithTranslation
        const translatePercentage = this.conf.parallax === -1 ? 100 - percentage : percentage
        this.parallaxData.translation = -translatePercentage / 2
      }
    },

    onResize () {
      if (this.breakpointsData.list.length) {
        const breakpoint = this.getCurrentBreakpoint()
        if (this.hasBreakpointChanged(breakpoint)) {
          this.setBreakpointConfig(breakpoint)
        }
      }

      if (this.conf.parallax) {
        // Only refresh parallaxData.slideshowOffsetTop value on resize for better performance.
        this.getSlideshowOffsetTop(true)
      }
    },

    onMouseIn () {
      this.mouseOver = true
      if (this.conf.pauseOnHover && this.conf.autoplay) this.pauseAutoplay()
    },

    onMouseOut () {
      this.mouseOver = false
      if (this.conf.pauseOnHover && this.conf.autoplay) this.resumeAutoplay()
    },

    onMouseDown (e) {
      if (!this.touchEnabled || this.disable) return
      if (!e.touches && this.preventYScroll) e.preventDefault()

      this.mouseDown = true

      // Store drag start in var for distance calculation in onMouseUp().
      this.touch.dragStartX = this.getCurrentMouseX(e)

      if (!this.conf.draggingDistance) {
        this.updateCurrentTranslation(null, this.touch.dragStartX)
      }
    },

    onMouseMove (e) {
      if (this.mouseDown || this.touch.dragging) {
        if (this.preventYScroll) e.preventDefault()
        this.mouseDown = false
        this.touch.dragging = true

        // Store current drag position in var for distance calculation in onMouseUp().
        this.touch.dragNowX = this.getCurrentMouseX(e)

        if (this.conf.draggingDistance) {
          this.touch.dragAmount = this.touch.dragNowX - this.touch.dragStartX
          const dragAmountPercentage = this.touch.dragAmount / this.container.clientWidth

          this.updateCurrentTranslation()
          this.transition.currentTranslation += 100 * dragAmountPercentage
        }
        else {
          this.updateCurrentTranslation(null, this.touch.dragNowX)
        }
      }
    },

    onMouseUp (e) {
      this.mouseDown = false

      // If no mouse move there is nothing to do so don't go further.
      if (!this.touch.dragging) return this.cancelSlideChange()

      this.touch.dragging = false
      const dragAmount = this.conf.draggingDistance ? -this.touch.dragAmount : 0
      const dragPercentageStart = (this.touch.dragStartX - this.container.offsetLeft) / this.container.clientWidth
      const dragPercentageNow = (this.touch.dragNowX - this.container.offsetLeft) / this.container.clientWidth
      const dragPercentage = ((dragPercentageStart < 0.5 ? 0 : 1) - dragPercentageNow) * 100
      const forwards = (dragAmount || dragPercentage) > 0

      const reasonsToCancelSliding = [
        // Dragging distance conf is set & drag amount is lesser than dragging distance conf.
        Math.abs(dragAmount) < this.conf.draggingDistance,

        // Dragging distance conf is not set & dragging is lesser than 50%.
        !this.conf.draggingDistance && Math.abs(dragPercentage) < 50,

        // arrowNext is disabled and dragging beyond last slide.
        this.arrowPrevDisabled && !this.slides.current && !forwards,

        // arrowPrev is disabled and dragging beyond first slide.
        this.arrowNextDisabled && this.slides.current === this.slidesCount - 1 && forwards
      ]

      // If no reason to cancel sliding.
      if (reasonsToCancelSliding.indexOf(true) === -1) {
        const targetSlide = this.slides.current + this.conf.slideMultiple * (forwards ? 1 : -1)
        this.goToSlide(targetSlide)
      }

      else this.cancelSlideChange()

      this.touch.dragStartX = null
      this.touch.dragNowX = null
      this.touch.dragAmount = null

      // Can be called from a click event.
      // As click event triggers after mouseup, we need a persistent variable until
      // click event triggers.
      this.touch.justDragged = true
      setTimeout(() => (this.touch.justDragged = false), 50)
    },

    // Check if dragging just happened.
    justDragged () {
      return this.touch.justDragged
    },

    // Dragging did not pass conditions to change slide, snap back to current slide.
    cancelSlideChange () {
      if (!this.conf.fade) {
        this.updateCurrentTranslation()
      }
    },

    getCurrentMouseX (e) {
      return 'ontouchstart' in window ? e.touches[0].clientX : e.clientX
    },

    /**
     * The translation of most cases, in other cases this can still be used as a base calc.
     */
    getBasicTranslation () {
      let translation = this.slides.current / this.conf.visibleSlides

      if (this.conf.infinite) translation += 1 / this.conf.visibleSlides// A clone is prepended to the slides track.

      return translation
    },

    /**
     * Update the current translation of the slides track - for sliding slideshows.
     * The resulting translation will be set in percentage and negative value.
     *
     * @param {null | 0 | 1} nextSlideIsClone: wheter the slide to access is a clone, and
     *                                         if so, if it's the first or last one.
     * @param {null | float} currentDragX: whether the slide track is being dragged and if so
     *                                     the value of the current drag.
     */
    updateCurrentTranslation (nextSlideIsClone = null, currentMouseX = null) {
      // let dragging = currentMouseX
      let translation = this.getBasicTranslation()

      if (this.conf.infinite && nextSlideIsClone !== null) {
        translation = (nextSlideIsClone ? this.slidesCount + 1 : 0) / this.conf.visibleSlides
      }

      // If dragging.
      else if (this.touch.dragStartX && currentMouseX) {
        let dragPercentage = 0
        const dragPercentageStart = (this.touch.dragStartX - this.container.offsetLeft) / this.container.clientWidth
        let dragPercentageNow = (currentMouseX - this.container.offsetLeft) / this.container.clientWidth

        if (this.conf['3d']) {
          // Prevent dragging more than 1 face away from front face,
          // So that we don't need to update faces on drag.
          let range = Math.round(dragPercentageStart) ? [0, 2] : [-1, 1]
          dragPercentageNow = Math.min(Math.max(dragPercentageNow, range[0]), range[1])
        }

        dragPercentage = (dragPercentageStart < 0.5 ? 0 : 1) - dragPercentageNow

        translation += dragPercentage
      }

      // Special behavior if multiple visible slides and sliding 1 by 1:
      // The translation is modified as user slides just to look nicer.
      if (this.conf.visibleSlides > 1 && this.conf.slideMultiple === 1) {
        // If not infinite sliding.
        if (!this.conf.infinite) {
          const preferredPosition = Math.ceil(this.conf.visibleSlides / 2)
          const remainingSlides = this.slidesCount - (this.slides.current + 1)
          const positionsAfterPreferred = this.conf.visibleSlides - preferredPosition
          const preferredPositionIsPassed = remainingSlides < positionsAfterPreferred

          const slidesWOTranslation = preferredPosition - 1
          let substractFromTranslation = Math.min(slidesWOTranslation, this.slides.current)

          // From next position after the preferred position.
          if (preferredPositionIsPassed) {
            substractFromTranslation += positionsAfterPreferred - remainingSlides
          }

          translation -= substractFromTranslation / this.conf.visibleSlides
        }
      }

      this.transition.currentTranslation = -translation * 100
    },

    pauseAutoplay () {
      clearTimeout(this.autoplayTimer)
      this.autoplayTimer = 0
      this.emit('autoplay-pause')
    },

    resumeAutoplay () {
      this.autoplayTimer = setTimeout(() => {
        this.goToSlide(this.slides.current + this.conf.slideMultiple, { autoPlaying: true })
      }, this.conf.speed)
      this.emit('autoplay-resume')
    },

    previous () {
      this.goToSlide(this.slides.current - this.conf.slideMultiple)
    },

    next () {
      this.goToSlide(this.slides.current + this.conf.slideMultiple)
    },

    refreshParallax () {
      setTimeout(() => {
        this.onResize()
        this.onScroll()
      }, 100)
    },

    /**
     * When visibleSlides > 1 and slideMultiple > 1, get the first visible slide from given index.
     *
     * @param {number} index the slide index where to get the next visible one from.
     * @return {number} the first visible slide index.
     */
    getFirstVisibleSlide (index) {
      return Math.floor(index / this.conf.slideMultiple) * this.conf.slideMultiple
    },

    getSlideInRange (index, autoPlaying) {
      let clone = null

      // If infinite enabled, going out of range takes the first slide from the other end.
      if (this.conf.infinite && index === -1) clone = 0
      else if (this.conf.infinite && index === this.slidesCount) clone = 1

      // Generic case:
      // If going beyond slides count, take the modulo as next slide index.
      // E.g. If we want to access slide 9 and there are only 6 slides, go to slide 3.
      // (index + this.slidesCount) to also handle negative index.
      let newIndex = (index + this.slidesCount) % this.slidesCount

      if (this.conf.slideMultiple > 1) {
        const lastSlideItems = this.slidesCount % this.conf.slideMultiple || this.conf.slideMultiple
        const missingItems = this.conf.slideMultiple - lastSlideItems

        newIndex += index < 0 ? missingItems : 0
        newIndex = this.getFirstVisibleSlide(newIndex)

        // When using slideMultiple & breakpoints, on breakpoint change if slideMultiple has
        // changed, the slideshow will snap to the current slide. but current slide is always the
        // first of visible slides so by playing around breakpoints we lose the original slide on
        // focus. this.slides.focus is here to never lose it.
        // E.g.
        // slideMultiple = 3, currentSlide = 9 (10th slide), means this is the only visible slide,
        // now change breakpoint and slideMultiple = 2, so go to slide index 8 (shows slide 9 & 10)
        // now current slide is 8. If we change back to previous breakpoint (slideMultiple = 3),
        // current slide index becomes 6! and so on.
        if (this.getFirstVisibleSlide(this.slides.focus) !== newIndex) {
          this.slides.focus = newIndex
        }
      }

      // Disable sliding if already on edge with disableArrowsOnEdges.
      if (this.conf.disableArrowsOnEdges && (index < 0 || index > this.slidesCount - 1) && !autoPlaying) {
        newIndex = this.slides.current
      }

      return { nextSlide: newIndex, clone }
    },

    // animation = slide transition will be animated.
    // autoPlaying = go to the next slide by autoplay - no user intervention.
    // jumping = after reaching a clone, the callback jumps back to original slide with no animation.
    goToSlide (index, { animation = true, autoPlaying = false, jumping = false } = {}) {
      if (!this.slidesCount || this.disable) return

      if (this.conf.autoplay) this.pauseAutoplay()

      this.transition.animated = animation
      setTimeout(() => (this.transition.animated = false), this.transitionSpeed)

      // Get the next slide index and whether it's a clone.
      const { nextSlide, clone: nextSlideIsClone } = this.getSlideInRange(index, autoPlaying)

      // If the slide is not found don't go further.
      if (!this.slides.list[nextSlide]) return

      // Emit event. First use of `goToSlide` is while init, so should not propagate an event.
      if (this.isReady && !jumping) this.emit('before-slide', true, nextSlide)

      // Disable arrows if `disableArrowsOnEdges` is on and there is no slide to go to on that end.
      if (this.conf.arrows && this.conf.disableArrowsOnEdges) {
        this.arrowPrevDisabled = nextSlide === 0 || (nextSlide - this.conf.slideMultiple) < 0
        this.arrowNextDisabled = nextSlide === this.slidesCount - 1 || (nextSlide + this.conf.slideMultiple) > this.slidesCount - 1
      }

      // Infinite sliding with cloned slides:
      // When reaching last slide and going next the cloned slide of the first slide
      // shows up, when the animation ends the real change to the first slide is done
      // immediately with no animation.
      // Same principle when going beyond first slide.
      if (nextSlideIsClone !== null) { // Gives clone id (0 or 1 or null).
        setTimeout(() => {
          // inside the callback, also check if it is not too late to apply next slide
          // (user may have slid fast multiple times) if so cancel callback.
          const passedCloneBackward = index === -1 && this.slides.current !== this.slidesCount - 1
          const passedCloneForward = index === this.slidesCount && this.slides.current !== 0
          const tooLateToSetTimeout = passedCloneBackward || passedCloneForward

          if (!tooLateToSetTimeout) {
            this.transition.speed = 0
            this.goToSlide(nextSlideIsClone ? 0 : this.slidesCount - 1, { animation: false, jumping: true })
            setTimeout(() => (this.transition.speed = this.conf.transitionSpeed), 50)
          }
        }, this.transition.speed - 50)
      }

      this.slides.current = nextSlide

      // Only apply sliding transition when the slideshow animation type is `slide`.
      if (!this.conf.fade) this.updateCurrentTranslation(nextSlideIsClone)

      this.slides.activeId = this.slides.list[this.slides.current].id

      if (this.conf.autoplay && !(this.conf.pauseOnHover && this.mouseOver)) this.resumeAutoplay()

      if (this.slidesCount) {
        if (this.$slots.default[this.slides.current]) {
          // First use of goToSlide is while init, so should not propagate an event.
          if (this.isReady && !jumping) this.emit('slide')
        }

        if (this.isReady && this.conf.bullets && !autoPlaying && !jumping && this.$refs.bullet && this.$refs.bullet[this.slides.current]) {
          this.$refs.bullet[this.slides.current].focus()
        }
      }
    },

    addSlide (newSlide) {
      this.slides.list.push(newSlide)
      return this.slidesCount
    },

    updateSlide (slideId, newProps) {
      let slide = this.slides.list.find(slide => slide.id === slideId)
      if (slide) slide = Object.assign(slide, newProps)
    },

    removeSlide (slideId) {
      const index = this.slides.list.findIndex(slide => slide.id === slideId)

      if (index > -1) {
        // If the slide to remove is the current slide, slide to the previous slide,
        // unless it was the only one.
        // DO NOT USE this.slidesCount here, while hot reloading, this.slidesCount is not reliable
        // as not updated fast enough.
        if (this.slides.list.length > 1 && slideId === this.slides.activeId) {
          this.goToSlide(index - 1, { autoPlaying: true })
        }

        this.slides.list.splice(index, 1) // Remove the slide.
      }
    },

    toggleTouchableOption (isTouchable) {
      const { track } = this.$refs
      if (!track) return

      this.touchEnabled = isTouchable
      const hasTouch = 'ontouchstart' in window

      // Touch enabled slideshow.
      if (isTouchable) {
        this.$refs.track.addEventListener(hasTouch ? 'touchstart' : 'mousedown', this.onMouseDown, { passive: !this.preventYScroll })
        document.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove, { passive: !this.preventYScroll })
        document.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp, { passive: true })
      }
      else this.removeEventListeners()
    },

    removeEventListeners () {
      const hasTouch = 'ontouchstart' in window
      this.$refs.track.removeEventListener(hasTouch ? 'touchstart' : 'mousedown', this.onMouseDown, { passive: !this.preventYScroll })
      document.removeEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove, { passive: !this.preventYScroll })
      document.removeEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp, { passive: true })
    }
  },

  beforeDestroy () {
    this.removeEventListeners()
  },

  computed: {
    // this.conf needs to be reactive so user can change a Vueper Slides option and everything gets updated.
    conf () {
      // Read config from the props then check if breakpoints are defined.
      // If so override the config with the breakpoint ones.
      let conf = {
        ...this.$props,
        ...((this.$props.breakpoints && this.$props.breakpoints[this.breakpointsData.current]) || {})
      }

      // Overrides: once config from breakpoints is imported, we can use the conf object
      // and be sure all the options are up to date.
      // ------------------------------- //
      conf.slideMultiple = conf.slideMultiple ? conf.visibleSlides : 1

      if (conf.fade || conf.disableArrowsOnEdges || conf.visibleSlides > 1 || conf['3d']) {
        conf.infinite = false
      }

      conf.arrowsOutside = conf.arrowsOutside || (conf.visibleSlides > 1 && conf.arrowsOutside === null)
      conf.bulletsOutside = conf.bulletsOutside || (conf.visibleSlides > 1 && conf.bulletsOutside === null)

      if (this.touchEnabled !== conf.touchable) this.toggleTouchableOption(conf.touchable)
      // ------------------------------- //

      return conf
    },
    slidesCount () {
      return this.slides.list.length
    },
    touchEnabled: {
      get () {
        return this.slidesCount > 1 && this.touchable
      },
      set () {}
    },
    firstSlide () {
      return this.slidesCount ? this.slides.list[0] : {}
    },
    lastSlide () {
      return this.slidesCount ? this.slides.list[this.slidesCount - 1] : {}
    },
    currentSlide () {
      return this.slidesCount ? this.slides.list[this.slides.current] : {}
    },
    vueperslidesClasses () {
      return {
        'vueperslides--ready': this.isReady,
        'vueperslides--fade': this.conf.fade,
        'vueperslides--parallax': this.conf.parallax,
        'vueperslides--touchable': this.touchEnabled && !this.disable,
        'vueperslides--fixed-height': this.conf.fixedHeight,
        'vueperslides--3d': this.conf['3d'],
        'vueperslides--animated': this.transition.animated
      }
    },
    vueperslidesStyles () {
      return /^-?\d/.test(this.conf.fixedHeight) ? `height: ${this.conf.fixedHeight}` : null
    },
    trackStyles () {
      let styles = {}

      if (this.conf.parallax) {
        styles.transform = `translate3d(0, ${this.parallaxData.translation}%, 0)`

        // Increase browser optimizations by allocating more machine resource.
        // ! \\ To be used wisely so deactivate when not needed.
        styles.willChange = this.parallaxData.isVisible ? 'transform' : 'auto'
      }

      return styles
    },
    trackInnerStyles () {
      let styles = {}

      // Prevent animation if VueperSlides is not yet ready (so that the first clone is not shown before ready).
      styles.transitionDuration = (this.isReady ? this.transition.speed : 0) + 'ms'

      if (this.conf['3d']) {
        let rotation = this.transition.currentTranslation * 90 / 100
        // Following calculation is equivalent to:
        // 'translateZ(slideshowWidth / 2) rotateY(' + rotation + 'deg)'
        // but does not require a fixed width.
        styles.transform = `rotateY(-90deg) translateX(-50%) rotateY(90deg) rotateY(${rotation}deg)`
      }

      else if (!this.conf.fade) {
        styles.transform = `translate3d(${this.transition.currentTranslation}%, 0, 0)`

        // Increase browser optimizations by allocating more machine resource.
        // ! \\ To be used wisely so deactivate when not needed.
        styles.willChange = this.touch.dragging || this.transition.animated ? 'transform' : 'auto'
      }

      return styles
    }
  }
}
</script>

<style lang="scss">
// Vueperslides REQUIRED styles.
// The nice-to-have not-required styles are placed in an external
// css file so the end user can easily override it.
.vueperslides {
  position: relative;

  &--fixed-height {
    .vueperslides__inner,
    .vueperslides__parallax-wrapper,
    .vueperslide {height: inherit;}

    .vueperslides__parallax-wrapper {padding-bottom: 0 !important;}
  }

  &__inner {
    position: relative;
    user-select: none;
  }

  &__parallax-wrapper {
    position: relative;
    overflow: hidden;

    .vueperslides--3d & {overflow: visible;}
  }

  &__track {
    position: absolute;
    top: 0;
    height: 100%;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: 1;

    .vueperslides--parallax & {
      height: 200%;
      transform: translateY(0);
    }

    .vueperslides--touchable & {
      cursor: ew-resize;
      cursor: -webkit-grab;
      cursor: grab;

      &--mousedown, &--dragging {
        cursor: -webkit-grabbing;
        cursor: grabbing;
      }
    }

    .vueperslides--3d & {
      overflow: visible;
      perspective: 100em;
    }
  }

  &__track-inner {
    white-space: nowrap;
    transition: 0.5s ease-in-out transform;
    height: 100%;

    .vueperslides--fade & {
      white-space: normal;
      transition: none;
    }

    .vueperslides--3d & {transform-style: preserve-3d;}
    .vueperslides__track--mousedown & {transition: 0.2s ease-in-out transform !important;}
    .vueperslides__track--dragging & {transition: none;}
    .vueperslides__track--no-animation & {transition-duration: 0s;}
  }

  &__arrow {
    position: absolute;
    fill: currentColor;
    width: 1em;
    text-align: center;
    transform: translateY(-50%);
    transition: 0.3s ease-in-out;
    cursor: pointer;
    user-select: none;
    outline: none;
    z-index: 2;
  }

  &__paused {
    position: absolute;
    transition: 0.3s ease-in-out;
  }

  &__bullets {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    &--outside {position: relative;}
  }

  &__bullet {
    cursor: pointer;
    user-select: none;
    outline: none;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    &::-moz-focus-inner {border: 0;}
  }
}
</style>
