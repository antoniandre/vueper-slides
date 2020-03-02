<template lang="pug">
.vueperslides(
  ref="vueperslides"
  :class="vueperslidesClasses"
  aria-label="Slideshow"
  :style="vueperslidesStyles")
  .vueperslide__content-wrapper.vueperslide__content-wrapper--outside-top(
    v-if="slidesCount && conf.slideContentOutside === 'top'"
    :class="conf.slideContentOutsideClass")
    vnodes(v-if="currentSlide.contentSlot" :vnodes="currentSlide.contentSlot")
    template(v-else)
      .vueperslide__title(v-if="currentSlide.title" v-html="currentSlide.title")
      .vueperslide__content(v-if="currentSlide.content" v-html="currentSlide.content")

  .vueperslides__inner
    .vueperslides__parallax-wrapper(:style="`padding-bottom: ${conf.slideRatio * 100}%`" aria-live="polite")
      .vueperslides__track(
        ref="track"
        :class="{ 'vueperslides__track--dragging': touch.dragging, 'vueperslides__track--mousedown': mouseDown }"
        :style="trackStyles")
        .vueperslides__track-inner(:style="trackInnerStyles")
          vueper-slide.vueperslide--clone(
            v-if="isReady && conf.infinite && canSlide && lastSlide"
            clone
            :title="lastSlide.title"
            :content="lastSlide.content"
            :image="lastSlide.image"
            :link="lastSlide.link"
            :style="lastSlide.style"
            :lazyloaded="lastSlide.loaded"
            aria-hidden="true")
            template(v-if="lastSlide.contentSlot" slot="content")
              vnodes(:vnodes="lastSlide.contentSlot")
            template(v-if="conf.lazy && !lastSlide.loaded" slot="loader")
              vnodes(:vnodes="lastSlide.loaderSlot")
          slot(:currentSlide="slides.current")
          vueper-slide.vueperslide--clone(
            v-if="isReady && conf.infinite && canSlide && firstSlide"
            clone
            :title="firstSlide.title"
            :content="firstSlide.content"
            :image="firstSlide.image"
            :link="firstSlide.link"
            :style="firstSlide.style"
            :lazyloaded="firstSlide.loaded"
            aria-hidden="true")
            template(v-if="firstSlide.contentSlot" slot="content")
              vnodes(:vnodes="firstSlide.contentSlot")
            template(v-if="conf.lazy && !firstSlide.loaded" slot="loader")
              vnodes(:vnodes="firstSlide.loaderSlot")

    .vueperslides__paused(v-if="conf.pauseOnHover && $slots.pause")
      slot(name="pause")
    .vueperslides__progress(v-if="conf.progress")
      slot(name="progress" :current="slides.current + 1" :total="slidesCount")
        div(:style="`width: ${(slides.current + 1) * 100 / slidesCount}%`")
    .vueperslides__fractions(v-if="conf.fractions")
      slot(name="fraction" :current="slides.current + 1" :total="slidesCount")
        | {{ `${slides.current + 1} / ${slidesCount}` }}
    .vueperslides__arrows(
      v-if="conf.arrows && canSlide && !disable"
      :class="{ 'vueperslides__arrows--outside': conf.arrowsOutside }")
      button.vueperslides__arrow.vueperslides__arrow--prev(
        @click="previous()"
        v-show="!arrowPrevDisabled"
        aria-label="Previous"
        @keyup.left="previous()"
        @keyup.right="next()")
        slot(name="arrow-left")
          svg(viewBox="0 0 9 18")
            path(stroke-linecap="round" d="m8 1 l-7 8 7 8")
      button.vueperslides__arrow.vueperslides__arrow--next(
        @click="next()"
        v-show="!arrowNextDisabled"
        aria-label="Next"
        @keyup.left="previous()"
        @keyup.right="next()")
        slot(name="arrow-right")
          svg(viewBox="0 0 9 18")
            path(stroke-linecap="round" d="m1 1 l7 8 -7 8")
    .vueperslides__bullets(
      v-if="conf.bullets && canSlide && !disable && !conf.bulletsOutside"
      ref="bullets"
      role="tablist"
      aria-label="Slideshow navigation")
      slot(
        name="bullets"
        :current-slide="slides.current"
        :bullet-indexes="bulletIndexes"
        :go-to-slide="goToSlide"
        :previous="previous"
        :next="next")
        button.vueperslides__bullet(
          v-for="(slideIndex, i) in bulletIndexes"
          :key="i"
          :class="{ 'vueperslides__bullet--active': slides.current === slideIndex }"
          role="tab"
          :aria-label="`Slide ${i + 1}`"
          @click="goToSlide(slideIndex)"
          @keyup.left="previous()"
          @keyup.right="next()")
          slot(name="bullet" :active="slides.current === slideIndex" :slide-index="slideIndex" :index="i + 1")
            .default
              span {{ i + 1 }}

  .vueperslides__bullets.vueperslides__bullets--outside(
    v-if="conf.bullets && canSlide && !disable && conf.bulletsOutside"
    ref="bullets"
    role="tablist"
    aria-label="Slideshow navigation")
    slot(
      name="bullets"
      :current-slide="slides.current"
      :bullet-indexes="bulletIndexes"
      :go-to-slide="goToSlide"
      :previous="previous"
      :next="next")
      button.vueperslides__bullet(
        v-for="(slideIndex, i) in bulletIndexes"
        :key="i"
        :class="{ 'vueperslides__bullet--active': slides.current === slideIndex }"
        role="tab"
        :aria-label="`Slide ${i + 1}`"
        @click="goToSlide(slideIndex)"
        @keyup.left="previous()"
        @keyup.right="next()")
        slot(name="bullet" :active="slides.current === slideIndex" :slide-index="slideIndex" :index="i + 1")
          .default
            span {{ i + 1 }}

  .vueperslide__content-wrapper.vueperslide__content-wrapper--outside-bottom(
    v-if="slidesCount && conf.slideContentOutside === 'bottom'"
    :class="conf.slideContentOutsideClass")
    vnodes(v-if="currentSlide.contentSlot" :vnodes="currentSlide.contentSlot")
    template(v-else)
      .vueperslide__title(v-if="currentSlide.title" v-html="currentSlide.title")
      .vueperslide__content(v-if="currentSlide.content" v-html="currentSlide.content")
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
    alwaysRefreshClones: { type: Boolean, default: false },
    arrows: { type: Boolean, default: true },
    arrowsOutside: { type: Boolean, default: null },
    autoplay: { type: Boolean, default: false },
    breakpoints: { type: Object, default: () => ({}) },
    bullets: { type: Boolean, default: true },
    bulletsOutside: { type: Boolean, default: null },
    disable: { type: Boolean, default: false },
    // Ability to disable arrows on slideshow edges. Only if not infinite mode.
    disableArrowsOnEdges: { type: [Boolean, String], default: false },
    // By default when touch is enabled you have to drag from a slide side and pass 50% of
    // slideshow width to change slide. This setting changes this behavior to a horizontal
    // pixel amount from anywhere on slideshow.
    draggingDistance: { type: Number, default: null },
    duration: { type: [Number, String], default: 4000 }, // Autoplay slide duration.
    infinite: { type: Boolean, default: true },
    fade: { type: Boolean, default: false },
    fixedHeight: { type: [Boolean, String], default: false },
    fractions: { type: Boolean, default: false },
    gap: { type: Number, default: 0 },
    initSlide: { type: Number, default: 1 },
    lazy: { type: Boolean, default: false },
    lazyLoadOnDrag: { type: Boolean, default: false },
    pauseOnHover: { type: Boolean, default: true },
    parallax: { type: [Boolean, Number], default: false },
    parallaxFixedContent: { type: Boolean, default: false },
    // This one is not modifiable through breakpoints: event handlers are added/removed.
    preventYScroll: { type: Boolean, default: false },
    progress: { type: Boolean, default: false },
    slideContentOutside: { type: [Boolean, String], default: false },
    slideContentOutsideClass: { type: String, default: '' },
    slideImageInside: { type: Boolean, default: false },
    slideMultiple: { type: [Boolean, Number], default: false },
    slideRatio: { type: Number, default: 1 / 3 },
    touchable: { type: Boolean, default: true },
    transitionSpeed: { type: [Number, String], default: 600 },
    visibleSlides: { type: Number, default: 1 },
    '3d': { type: Boolean, default: false }
  },

  data: () => ({
    isReady: false,
    container: null,
    slides: {
      list: [],
      activeId: null,
      current: 0, // Index of current slide.
      // Don't loose the focused slide when changing breakpoint & slideMultiple > 1.
      focus: 0
    },
    mouseDown: false,
    mouseOver: false,
    touch: {
      enabled: true,
      dragging: false,
      // When lazy & lazyLoadOnDrag are true, try to lazy load the next visible slides
      // and set a flag that it already triggered to not keep trying in the same drag.
      lazyloadTriggered: false,
      justDragged: false,
      dragStartX: 0,
      dragNowX: 0,
      dragAmount: 0
    },
    transition: { currentTranslation: 0, speed: 0, animated: false },
    autoplayTimer: null,
    nextSlideIsClone: false,
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

      const options = { animation: false, autoPlaying: this.conf.autoplay }
      this.goToSlide(this.conf.initSlide - 1, options)
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
      let args = null

      if (includeCurrentSlide || typeof includeNextSlide === 'number') {
        args = {}

        if (includeCurrentSlide && this.slides.activeId && this.slidesCount) {
          args.currentSlide = this.getSlideData(this.slides.current)
        }

        if (typeof includeNextSlide === 'number' && this.slidesCount) {
          const { nextSlide: nextSlideIndex } = this.getSlideInRange(includeNextSlide)
          args.nextSlide = this.getSlideData(nextSlideIndex)
        }
      }

      this.$emit(...(args ? [name, args] : [name]))
    },

    getSlideData (index) {
      const slide = this.slides.list[index]
      let data = {}

      if (slide) {
        data = {
          index,
          title: slide.title,
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
      const slideMultipleChanged = bp.slideMultiple && bp.slideMultiple !== this.conf.slideMultiple
      const visibleSlidesChanged = bp.visibleSlides && bp.visibleSlides !== this.conf.visibleSlides

      // this.conf gets updated by itself when this.breakpointsData.current changes.
      this.breakpointsData.current = breakpoint
      this.slides.current = this.getFirstVisibleSlide(this.slides.focus)

      if (slideMultipleChanged || visibleSlidesChanged) {
        this.goToSlide(this.slides.current, { breakpointChange: true })
      }
      else this.updateTrackTranslation()
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

        while ((el = el.offsetParent)) top += el.offsetTop

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
        if (this.hasBreakpointChanged(breakpoint)) this.setBreakpointConfig(breakpoint)
      }

      // Only refresh parallaxData.slideshowOffsetTop value on resize for better performance.
      if (this.conf.parallax) this.getSlideshowOffsetTop(true)
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

      if (!this.conf.draggingDistance) this.updateTrackTranslation(this.touch.dragStartX)
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

          this.updateTrackTranslation()
          this.transition.currentTranslation += 100 * dragAmountPercentage
        }
        else this.updateTrackTranslation(this.touch.dragNowX)
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

      if (reasonsToCancelSliding.includes(true)) this.cancelSlideChange()
      else {
        const targetSlide = this.slides.current + this.conf.slideMultiple * (forwards ? 1 : -1)
        this.emit(forwards ? 'next' : 'previous')
        this.goToSlide(targetSlide)
      }

      this.touch.dragStartX = null
      this.touch.dragNowX = null
      this.touch.dragAmount = null

      // Can be called from a click event.
      // As click event triggers after mouseup, we need a persistent variable until
      // click event triggers.
      this.touch.justDragged = true
      setTimeout(() => (this.touch.justDragged = false), 50)

      this.touch.lazyloadTriggered = false // Reinit for the next drag.
    },

    // Check if dragging just happened - also for external use.
    justDragged () {
      return this.touch.justDragged
    },

    // Dragging did not pass conditions to change slide, snap back to current slide.
    cancelSlideChange () {
      if (!this.conf.fade) this.updateTrackTranslation()
    },

    getCurrentMouseX (e) {
      return 'ontouchstart' in window ? e.touches[0].clientX : e.clientX
    },

    /**
     * The translation of most cases, in other cases this can still be used as a base calc.
     */
    getBasicTranslation () {
      const { visibleSlides, infinite } = this.conf
      let translation = this.slides.current / visibleSlides

      // A clone is prepended to the slides track.
      if (infinite && this.canSlide) translation += 1 / visibleSlides

      return translation
    },

    /**
     * Update the current translation of the slides track - for sliding slideshows.
     * The resulting translation will be set in percentage and negative value.
     *
     * @param {null | float} currentDragX: whether the slide track is being dragged and if so
     *                                     the value of the current drag.
     */
    updateTrackTranslation (currentMouseX = null) {
      let translation = this.getBasicTranslation()
      const { infinite, visibleSlides, slideMultiple, gap, '3d': threeD, lazy, lazyLoadOnDrag } = this.conf

      if (infinite && this.nextSlideIsClone !== false) {
        translation = (this.nextSlideIsClone ? this.slidesCount + 1 : 0) / visibleSlides
      }

      // Add all the gaps to the translation except if current slide is first.
      if (gap && this.nextSlideIsClone !== 0) {
        translation += (this.gapsCount / (visibleSlides / slideMultiple)) * gap / 100
      }

      // If dragging.
      if (infinite && this.nextSlideIsClone !== false) {}
      else if (this.touch.dragStartX && currentMouseX) {
        let dragPercentage = 0
        const dragPercentageStart = (this.touch.dragStartX - this.container.offsetLeft) / this.container.clientWidth
        let dragPercentageNow = (currentMouseX - this.container.offsetLeft) / this.container.clientWidth

        if (threeD) {
          // Prevent dragging more than 1 face away from front face,
          // So that we don't need to update faces on drag.
          const range = Math.round(dragPercentageStart) ? [0, 2] : [-1, 1]
          dragPercentageNow = Math.min(Math.max(dragPercentageNow, range[0]), range[1])
        }

        dragPercentage = (dragPercentageStart < 0.5 ? 0 : 1) - dragPercentageNow
        translation += dragPercentage

        if (lazy && lazyLoadOnDrag && !this.touch.lazyloadTriggered) {
          this.touch.lazyloadTriggered = true

          let nextSlideGuess = this.slides.current + (dragPercentage > 0 ? 1 : -1) * visibleSlides
          // If out of range and infinite, load the correct clone original, that will update the clone.
          if (infinite && nextSlideGuess === -1) nextSlideGuess = this.slidesCount - 1
          else if (infinite && nextSlideGuess === this.slidesCount) nextSlideGuess = 0

          // Load the next visible slides images.
          for (let i = 0; i < visibleSlides; i++) {
            const slide = this.slides.list[nextSlideGuess + i]
            if (slide && !slide.loaded) this.loadSlide(slide, nextSlideGuess + i)
          }
        }
      }

      // Special behavior if multiple visible slides and sliding 1 by 1:
      // The translation is modified as user slides just to look nicer.
      if (visibleSlides > 1 && slideMultiple === 1) {
        // If not infinite sliding.
        if (!infinite) {
          // The preferred position is the most center slide amongst the visible ones,
          // if `visibleSlides` is an odd number the preferred position can never be at the center,
          // so take the closest on the left side.
          const preferredPositionIsPassed = this.slidePosAfterPreferred > 0

          // Subtract the first slides without translation, until we reach the preferred position.
          let subtractFromTranslation = Math.min(this.preferredPosition, this.slides.current)

          // From next position after the preferred position.
          if (preferredPositionIsPassed) subtractFromTranslation += this.slidePosAfterPreferred

          translation -= subtractFromTranslation / visibleSlides
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
      }, this.currentSlide.duration || this.conf.duration)
      this.emit('autoplay-resume')
    },

    previous (emit = true) {
      if (emit) this.emit('previous')
      this.goToSlide(this.slides.current - this.conf.slideMultiple)
    },

    next (emit = true) {
      if (emit) this.emit('next')
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
      let clone = false

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
      }

      // Disable sliding if already on edge with disableArrowsOnEdges.
      if (this.conf.disableArrowsOnEdges && (index < 0 || index > this.slidesCount - 1) && !autoPlaying) {
        newIndex = this.slides.current
      }

      return { nextSlide: newIndex, clone }
    },

    // animation = slide transition will be animated.
    // autoPlaying = going to the next slide from autoplay - no user intervention.
    // jumping = after reaching a clone, the callback jumps back to original slide with no animation.
    goToSlide (index, { animation = true, autoPlaying = false, jumping = false, breakpointChange = false, emit = true } = {}) {
      if (!this.slidesCount || this.disable) return

      if (this.conf.autoplay && autoPlaying) this.pauseAutoplay()

      this.transition.animated = animation
      setTimeout(() => (this.transition.animated = false), this.transitionSpeed)

      // Get the next slide index and whether it's a clone.
      const { nextSlide, clone: nextSlideIsClone } = this.getSlideInRange(index, autoPlaying)
      this.nextSlideIsClone = nextSlideIsClone

      // If the slide is not found don't go further.
      if (!this.slides.list[nextSlide]) return

      if (this.conf.lazy) {
        // Load each of the next visible slide images.
        for (let i = 0; i < this.conf.visibleSlides; i++) {
          const slide = this.slides.list[nextSlide + i]
          if (slide && !slide.loaded) this.loadSlide(slide, nextSlide + i)
        }
      }

      // Emit event. First use of `goToSlide` is while init, so should not propagate an event.
      if (this.isReady && !jumping && emit) this.emit('before-slide', true, nextSlide)

      // Infinite sliding with cloned slides:
      // When reaching last slide and going next the cloned slide of the first slide
      // shows up, when the animation ends the real change to the first slide is done
      // immediately with no animation.
      // Same principle when going beyond first slide.
      if (nextSlideIsClone !== false) { // Gives clone id (0 or 1) or false.
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

      // Don't change the focus slide if calling goToSlide from breakpoint change.
      // The focused slide is to keep track which slide to snap to when switching
      // between 2 breakpoints that have multiple visible slides.
      if (!breakpointChange) this.slides.focus = nextSlide

      // Only apply sliding transition when the slideshow animation type is `slide`.
      if (!this.conf.fade) this.updateTrackTranslation()

      this.slides.activeId = this.slides.list[this.slides.current].id

      if (this.conf.autoplay && autoPlaying && !(this.conf.pauseOnHover && this.mouseOver)) {
        this.resumeAutoplay()
      }

      if (this.slidesCount) {
        // First use of goToSlide is while init, so should not propagate an event.
        if (this.$slots.default[this.slides.current] && this.isReady && !jumping && emit) {
          this.emit('slide')
        }

        // Focus the current bullet for accessibility.
        // First get the ref on bullets list then try to find buttons.
        // As this is customizable through a slot there might not be any.
        if (this.isReady && this.conf.bullets && !autoPlaying && !jumping && this.$refs.bullets) {
          const bulletButtons = this.$refs.bullets.children
          const activeBulletButton = bulletButtons && bulletButtons[this.slides.current / this.conf.slideMultiple]
          if (activeBulletButton && activeBulletButton.nodeName.toLowerCase() === 'button') activeBulletButton.focus()
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
        this.slides.list.splice(index, 1) // Remove the slide.

        // If the slide to remove is the current slide, slide to the previous slide,
        // unless it was the only one.
        if (this.slidesCount && slideId === this.slides.activeId) {
          this.goToSlide(index - 1, { autoPlaying: true })
        }
      }

      // This can only happen if removing and adding slides very fast - like hot reloading.
      if (this.slides.current >= this.slidesCount) this.goToSlide(0, { autoPlaying: true })
    },

    // Lazy loading a slide image.
    loadSlide (slide, index) {
      slide.loadImage()
        .then(response => {
          const { image, style } = response
          slide.loaded = true
          slide.image = image
          slide.style = style
          this.$emit('image-loaded', this.getSlideData(index))
        }, () => {
          slide.loaded = false
          this.$emit('image-failed', this.getSlideData(index))
        })
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
    document.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
  },

  computed: {
    // this.conf needs to be reactive so user can change a Vueper Slides option and everything gets updated.
    conf () {
      // Read config from the props then check if breakpoints are defined.
      // If so override the config with the breakpoint ones.
      const conf = {
        ...this.$props,
        ...((this.$props.breakpoints && this.$props.breakpoints[this.breakpointsData.current]) || {})
      }

      // Overrides: once config from breakpoints is imported, we can use the `conf` object
      // and be sure all the options are up to date.
      // ------------------------------- //
      conf.slideMultiple = conf.slideMultiple ? conf.visibleSlides : 1

      conf.gap = (this.gap && parseInt(this.gap)) || 0
      // conf.gapPx = this.gap && this.gap.toString().includes('px')

      if (conf.visibleSlides > 1) conf['3d'] = false

      if (conf.fade || conf.disableArrowsOnEdges || conf.visibleSlides > 1 || conf['3d']) {
        conf.infinite = false
      }

      // Place arrows & bullets outside by default if visibleSlides > 1.
      if (conf.visibleSlides > 1 && conf.arrowsOutside === null) conf.arrowsOutside = true
      if (conf.visibleSlides > 1 && conf.bulletsOutside === null) conf.bulletsOutside = true

      if (this.touchEnabled !== conf.touchable) this.toggleTouchableOption(conf.touchable)

      if (conf.parallax && conf.parallaxFixedContent) {
        conf.slideContentOutside = 'top'
        conf.slideContentOutsideClass = 'parallax-fixed-content'
      }
      // ------------------------------- //

      return conf
    },
    slidesCount () {
      return this.slides.list.length
    },
    gapsCount () {
      const { fade, '3d': threeD, infinite, slideMultiple, gap } = this.conf
      if (!gap || fade || threeD) return 0

      if (this.multipleSlides1by1 && this.slides.current < this.preferredPosition) return 0
      if (!this.slides.current && this.nextSlideIsClone) return this.slidesCount + 1

      let gapsCount = (this.slides.current / slideMultiple + (infinite ? 1 : 0)) - this.preferredPosition
      if (this.multipleSlides1by1 && this.slidePosAfterPreferred > 0) {
        gapsCount -= this.slidePosAfterPreferred
      }

      return gapsCount
    },
    slidesAfterCurrent () {
      return this.slidesCount - (this.slides.current + 1)
    },
    // When visibleSlides > 1, the preferred position is the most center slide amongst the visible ones.
    // If visibleSlides is an odd number the preferred position can never be at the center,
    // so take the closest on the left side.
    preferredPosition () {
      return this.multipleSlides1by1 ? Math.ceil(this.conf.visibleSlides / 2) - 1 : 0
    },
    slidePosAfterPreferred () {
      return this.conf.visibleSlides - this.preferredPosition - this.slidesAfterCurrent - 1
    },
    multipleSlides1by1 () {
      return this.conf.visibleSlides > 1 && this.conf.slideMultiple === 1
    },
    touchEnabled: {
      get () {
        return this.slidesCount > 1 && this.touchable
      },
      set () {}
    },
    canSlide () {
      return (this.slidesCount / this.conf.visibleSlides) > 1
    },
    firstSlide () {
      const slide = this.slidesCount ? this.slides.list[0] : {}
      if (slide.style) slide.style = slide.style.replace(/width: ?\d+.*?;?/, '')
      return slide
    },
    lastSlide () {
      const slide = this.slidesCount ? this.slides.list[this.slidesCount - 1] : {}
      if (slide.style) slide.style = slide.style.replace(/width: ?\d+.*?;?/, '')
      return slide
    },
    currentSlide () {
      const currentSlide = (this.slidesCount && this.slides.list[this.slides.current]) || {}
      if (this.slides.current < this.slidesCount && currentSlide.id !== this.slides.activeId) {
        this.goToSlide(this.slides.current, { animation: false, autoPlaying: true })
      }

      return currentSlide
    },
    vueperslidesClasses () {
      return {
        'vueperslides--ready': this.isReady,
        'vueperslides--fade': this.conf.fade,
        'vueperslides--parallax': this.conf.parallax,
        'vueperslides--slide-image-inside': this.conf.slideImageInside,
        'vueperslides--touchable': this.touchEnabled && !this.disable,
        'vueperslides--fixed-height': this.conf.fixedHeight,
        'vueperslides--3d': this.conf['3d'],
        'vueperslides--slide-multiple': this.conf.slideMultiple > 1,
        'vueperslides--bullets-outside': this.conf.bulletsOutside,
        'vueperslides--animated': this.transition.animated // While transitioning.
      }
    },
    vueperslidesStyles () {
      return /^-?\d/.test(this.conf.fixedHeight) ? `height: ${this.conf.fixedHeight}` : null
    },
    trackStyles () {
      const styles = {}

      if (this.conf.parallax) {
        styles.transform = `translate3d(0, ${this.parallaxData.translation}%, 0)`

        // Increase browser optimizations by allocating more machine resource.
        // ! \\ To be used wisely so deactivate when not needed.
        styles.willChange = this.parallaxData.isVisible ? 'transform' : 'auto'
      }

      return styles
    },
    trackInnerStyles () {
      const styles = {}
      const { fade, '3d': threeD } = this.conf

      // Prevent animation if VueperSlides is not yet ready (so that the first clone is not shown before ready).
      styles.transitionDuration = (this.isReady ? this.transition.speed : 0) + 'ms'

      if (threeD) {
        const rotation = this.transition.currentTranslation * 90 / 100
        // Following calculation is equivalent to:
        // 'translateZ(slideshowWidth / 2) rotateY(' + rotation + 'deg)'
        // but does not require a fixed width.
        styles.transform = `rotateY(-90deg) translateX(-50%) rotateY(90deg) rotateY(${rotation}deg)`
      }
      else if (!fade) {
        const translation = this.transition.currentTranslation

        styles.transform = `translate3d(${translation}%, 0, 0)`

        // Increase browser optimizations by allocating more machine resource.
        // ! \\ To be used wisely so deactivate when not needed.
        styles.willChange = this.touch.dragging || this.transition.animated ? 'transform' : 'auto'
      }

      return styles
    },
    bulletIndexes () {
      return Array(Math.ceil(this.slidesCount / this.conf.slideMultiple)).fill().map((v, i) => i * this.conf.slideMultiple)
    },
    arrowPrevDisabled () {
      return !this.slides.current && this.conf.disableArrowsOnEdges
    },
    arrowNextDisabled () {
      const { disableArrowsOnEdges, visibleSlides, slideMultiple } = this.conf
      const lastSlide = this.slides.current + (slideMultiple > 1 && visibleSlides > 1 ? visibleSlides - 1 : 0)
      return lastSlide === this.slidesCount - 1 && disableArrowsOnEdges
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

    &.vueperslides--bullets-outside {margin-bottom: 4em;}
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
    display: flex;

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
    font-size: inherit;
    color: inherit;
    text-align: center;
    transform: translateY(-50%);
    transition: 0.3s ease-in-out;
    cursor: pointer;
    user-select: none;
    outline: none;
    z-index: 2;
    line-height: 1;

    svg {
      vertical-align: middle;
      stroke: currentColor;
      fill: none;
      width: 3.5em;
      padding: 1em;
      stroke-width: 1;
      transition: 0.3s ease-in-out;
      box-sizing: border-box;
    }
    svg:hover {stroke-width: 1.3;}
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

  // Targetting all the buttons in bullets list regardless of
  // the class for customization through slot.
  &__bullets button, &__bullet {
    cursor: pointer;
    user-select: none;
    outline: none;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    &::-moz-focus-inner {border: 0;}
  }

  &__fractions {
    position: absolute;
    top: 0.8em;
    left: 0.5em;
    z-index: 2;
    padding: 0.2em 1em;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 2em;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  &__progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    height: 6px;
    color: rgba(0, 0, 0, 0.7);

    > * {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background: currentColor;
      transition: 0.3s ease-in-out;
    }
  }
}
</style>
