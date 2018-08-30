<template lang="pug">
div.vueperslides(:class="{ 'vueperslides--ready': isReady, 'vueperslides--fade': conf.fade, 'vueperslides--parallax': conf.parallax, 'vueperslides--touchable': touch.enabled && !disable, 'vueperslides--fixed-height': conf.fixedHeight, 'vueperslides--3d': conf['3d'], 'vueperslides--animated': transition.animated }" ref="vueperslides" aria-label="Slideshow" :style="vueperStyles")
  div.vueperslide__content-wrapper.vueperslide__content-wrapper--outside-top(:class="conf.slideContentOutsideClass" v-if="conf.slideContentOutside === 'top'")
    div.vueperslide__title(v-if="slides.count" v-html="getCurrentSlideData('title')")
    div.vueperslide__content(v-if="slides.count" v-html="getCurrentSlideData('content')")

  div.vueperslides__inner
    div.vueperslides__parallax-wrapper(:style="'padding-bottom:' + (conf.slideRatio * 100) + '%'" aria-live="polite")
      div.vueperslides__track(:class="{ 'vueperslides__track--dragging': touch.dragging, 'vueperslides__track--mousedown': mouseDown }" :style="trackStyles" ref="track")
        div.vueperslides__track-inner(:style="trackInnerStyles")
          vueper-slide.vueperslide--clone(v-if="slides.count && clones[0]" :clone="0" :title="clones[0].title" :content="clones[0].content" :image="clones[0].image" :style="clones[0].style" aria-hidden="true")
            div(v-if="clones[0].titleSlot" slot="slideTitle" v-html="clones[0].titleSlot")
            div(v-if="clones[0].contentSlot" slot="slideContent" v-html="clones[0].contentSlot")
          slot(:currentSlide="slides.current")
          vueper-slide.vueperslide--clone(v-if="slides.count && clones[1]" :clone="1" :title="clones[1].title" :content="clones[1].content" :image="clones[1].image" :style="clones[1].style" aria-hidden="true")
            div(v-if="clones[1].titleSlot" slot="slideTitle" v-html="clones[1].titleSlot")
            div(v-if="clones[1].contentSlot" slot="slideContent" v-html="clones[1].contentSlot")

    div.vueperslides__paused(v-if="$slots.pausedIcon")
      slot(name="pausedIcon")
    div.vueperslides__arrows(:class="{ 'vueperslides__arrows--outside': conf.arrowsOutside }" v-if="conf.arrows && slides.count > 1 && !disable")
      button.vueperslides__arrow.vueperslides__arrow--prev(@click="previous()" v-show="!arrowPrevDisabled" aria-label="Previous")
        slot(name="arrowLeft")
          svg(viewBox="0 0 24 24")
            path(d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z")
      button.vueperslides__arrow.vueperslides__arrow--next(@click="next()" v-show="!arrowNextDisabled" aria-label="Next")
        slot(name="arrowRight")
          svg(viewBox="0 0 24 24")
            path(d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z")
    div.vueperslides__bullets(v-if="conf.bullets && slides.count > 1 && !disable && !conf.bulletsOutside" role="tablist" aria-label="Slideshow navigation")
      button.vueperslides__bullet(:class="{ 'vueperslides__bullet--active': slides.current === i * conf.slideMultiple }" v-for="(item, i) in Math.ceil(slides.count / conf.slideMultiple)" :key="i" @click="goToSlide(i * conf.slideMultiple)" @keyup.left="previous()" @keyup.right="next()" ref="bullet")
        span {{ i + 1 }}

  div.vueperslides__bullets.vueperslides__bullets--outside(v-if="conf.bullets && slides.count > 1 && !disable && conf.bulletsOutside")
    button.vueperslides__bullet(:class="{ 'vueperslides__bullet--active': slides.current === i * conf.slideMultiple }" v-for="(item, i) in Math.ceil(slides.count / conf.slideMultiple)" :key="i" @click="goToSlide(i * conf.slideMultiple)" @keyup.left="previous()" @keyup.right="next()" ref="bullet")
      span {{ i + 1 }}

  div.vueperslide__content-wrapper.vueperslide__content-wrapper--outside-bottom(:class="conf.slideContentOutsideClass" v-if="conf.slideContentOutside === 'bottom'")
    div.vueperslide__title(v-if="slides.count" v-html="getCurrentSlideData('title')")
    div.vueperslide__content(v-if="slides.count" v-html="getCurrentSlideData('content')")
</template>

<script>
import VueperSlide from './VueperSlide.vue'
import './styles.scss'

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
    arrowsOutside: {
      type: Boolean,
      default: null
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
      default: null
    },
    fade: {
      type: Boolean,
      default: false
    },
    slideContentOutside: {
      type: [Boolean, String],
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
    transitionSpeed: {
      type: [Number, String],
      default: 600
    },
    pauseOnHover: {
      type: Boolean,
      default: true
    },
    infinite: {
      type: Boolean,
      default: true
    },
    refreshClonesOnDrag: {
      type: Boolean,
      default: false
    },
    parallax: {
      type: [Boolean, Number],
      default: false
    },
    touchable: {
      type: Boolean,
      default: true
    },
    // By default when touch is enabled you have to drag from a slide side and pass 50% of slideshow width to change
    // slide. This setting changes this behavior to a horizontal pixel amount from anywhere on slideshow.
    draggingDistance: {
      type: Number,
      default: null
    },
    disable: {
      type: Boolean,
      default: false
    },
    breakpoints: {
      type: Object,
      default: () => ({})
    },
    fixedHeight: {
      type: [Boolean, String],
      default: false
    },
    slideImageInside: {
      type: Boolean,
      default: false
    },
    slideMultiple: {
      type: [Boolean, Number],
      default: false
    },
    visibleSlides: {
      type: Number,
      default: 1
    },
    '3d': {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isReady: false,
    container: null,
    slides: {
      list: [],
      count: 0,
      activeUid: null,
      current: 0,
      focus: 0,// Don't loose the focused slide when changing breakpoint & slideMultiple > 1.
      clones: []
    },
    clones: [],
    mouseDown: false,
    mouseOver: false,
    touch: { enabled: true, dragging: false, dragStartX: 0, dragNowX: 0, dragAmount: 0 },
    transition: { currentTranslation: 0, speed: 0, animated: false },
    timer: null,
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
      this.emit('before-init', false)
      this.container = this.$refs.vueperslides
      this.touch.enabled = this.conf.touchable
      // Store speed in extra variable because transition.speed can be set to 0,
      // then after slide change we need to reapply original speed.
      this.transition.speed = this.conf.transitionSpeed

      if (Object.keys(this.breakpoints).length) {
        this.setBreakpointsList()
        this.setBreakpointConfig(this.getCurrentBreakpoint())
      }

      if (this.conf.infinite) {
        this.cloneSlides()
        this.$nextTick(() => this.cloneSlides())
      }

      this.goToSlide(this.conf.initSlide - 1)
      this.bindEvents()

      this.isReady = true
      this.emit('ready')
    },

    // Emit a named event outside the component with 2 possible parameters:
    // current slide info & next slide info.
    emit(name, includeCurrentSlide = true, includeNextSlide = false) {
      // Emit param 0 = event name string.
      let args = [name]

      if (includeCurrentSlide || typeof includeNextSlide === 'number') {
        // Emit param 1 is object like { currentSlide: ...[, nextSlide: ...] }.
        args[1] = {}

        if (includeCurrentSlide && this.slides.activeUid) {
          args[1].currentSlide = this.getSlideData(this.slides.current)
        }

        if (typeof includeNextSlide === 'number') {
          let { nextSlide: nextSlideIndex } = this.getSlideInRange(includeNextSlide)
          args[1].nextSlide = this.getSlideData(nextSlideIndex)
        }
      }

      this.$emit(name, ...args)
    },

    getSlideData (index, withStyle = false) {
      let slide = this.slides.list[index]
      let { slideTitle = [{}], slideContent = [{}] } = slide.$slots
      let { elm: elmT = {} } = slideTitle[0]
      let { elm: elmC = {} } = slideContent[0]

      let data =  {
        index: index,
        title: slide.title,
        titleSlot: elmT && elmT.innerHTML || null,
        content: slide.content,
        contentSlot: elmC && elmC.innerHTML || null,
        image: slide.image
      }

      if (withStyle) {
        let { attributes: { style: { value = '' } = {} } = {} } = slide.$el
        data.style = value
      }

      return data
    },

    getCurrentSlideData (what) {
      let { titleSlot, title, contentSlot, content } = this.getSlideData(this.slides.current)
      // If both slot and attribute are provided use the attribute source.
      return what === 'title' ? title || titleSlot : (content || contentSlot)
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
      let bp = this.breakpoints && this.breakpoints[breakpoint] || {}
      let slideMultipleChanged = bp.slideMultiple !== this.conf.slideMultiple

      // this.conf gets updated by itself when this.breakpointsData.current changes.
      this.breakpointsData.current = breakpoint

      if (slideMultipleChanged) {
        this.slides.current = this.slides.focus
        this.goToSlide(this.slides.current)
      }
    },

    cloneSlides () {
      this.clones[0] = this.getSlideData(this.slides.count - 1, true)
      this.clones[1] = this.getSlideData(0, true)
    },

    bindEvents () {
      const hasTouch = 'ontouchstart' in window

      // Touch enabled slideshow.
      if (this.touch.enabled) {
        this.$refs.track.addEventListener(hasTouch ? 'touchstart' : 'mousedown', this.onMouseDown)
        document.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove)
        document.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp)
      }

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

        while (el = el.offsetParent) {
          top += el.offsetTop
        }

        this.parallaxData.slideshowOffsetTop = top
      }

      return this.parallaxData.slideshowOffsetTop
    },

    onScroll () {
      let doc = document.documentElement
      let scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      let windowHeight = window.innerHeight || doc.clientHeight || document.body.clientHeight
      let slideshowHeight = this.container.clientHeight
      let slideshowTopOffset = this.getSlideshowOffsetTop()

      // The distance between the bottom line of the current vueperslides slideshow and top of window.
      // Negative value means the slideshow is totally above the current window box.
      let vsBottom2WinTop = slideshowTopOffset + slideshowHeight - scrollTop
      // The distance between the top line of the current vueperslides slideshow and bottom of window.
      // Negative value means the slideshow is totally bellow the current window box.
      let vsTop2winBottom = windowHeight + scrollTop - slideshowTopOffset

      this.parallaxData.isVisible = vsBottom2WinTop > 0 && vsTop2winBottom > 0

      // Only apply translation when slideshow is visible.
      if (this.parallaxData.isVisible) {
        let heightToCoverWithTranslation = windowHeight + slideshowHeight
        let percentage = vsBottom2WinTop * 100 / heightToCoverWithTranslation
        let translatePercentage = this.conf.parallax === -1 ? 100 - percentage : percentage
        this.parallaxData.translation = - translatePercentage / 2
      }
    },

    onResize () {
      if (this.breakpointsData.list.length) {
        let breakpoint = this.getCurrentBreakpoint()
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

      // The clones are created with a copy of content. Refresh this content before dragging.
      if (this.conf.infinite) this.cloneSlides()
      // this.disableScroll()

      this.mouseDown = true

      // Store drag start in var for distance calculation in onMouseUp().
      this.touch.dragStartX = this.getCurrentMouseX(e)

      if (!this.conf.draggingDistance) {
        this.updateCurrentTranslation(null, this.touch.dragStartX)
      }
    },

    onMouseMove (e) {
      if (this.mouseDown || this.touch.dragging) {
        this.mouseDown = false
        this.touch.dragging = true

        // The clones are created with a copy of content.
        // Set refreshClonesOnDrag to true if you want to keep updating clones before you see them.
        if (this.conf.refreshClonesOnDrag && this.conf.infinite) {
          this.cloneSlides()
        }

        // Store current drag position in var for distance calculation in onMouseUp().
        this.touch.dragNowX = this.getCurrentMouseX(e)

        if (this.conf.draggingDistance) {
          this.touch.dragAmount = this.touch.dragNowX - this.touch.dragStartX
          let dragAmountPercentage = this.touch.dragAmount / this.container.clientWidth

          this.updateCurrentTranslation()
          this.transition.currentTranslation += 100 * dragAmountPercentage
        } else {
          this.updateCurrentTranslation(null, this.touch.dragNowX)
        }
      }
    },

    onMouseUp (e) {
      this.mouseDown = false

      // If no mouse move there is nothing to do so don't go further.
      if (!this.touch.dragging) return this.cancelSlideChange()

      this.touch.dragging = false
      let dragAmount = this.conf.draggingDistance ? - this.touch.dragAmount : 0
      let realCurrentSlideIndex = this.slides.current + !!this.clones.length * 1// Takes clones in account if any.
      let dragPercentageStart = (this.touch.dragStartX - this.container.offsetLeft) / this.container.clientWidth
      let dragPercentageNow = (this.touch.dragNowX - this.container.offsetLeft) / this.container.clientWidth
      let dragPercentage = ((dragPercentageStart < 0.5 ? 0 : 1) - dragPercentageNow) * 100
      let forwards = (dragAmount || dragPercentage) > 0

      let reasonsToCancelSliding = [
        // Dragging distance conf is set & drag amount is lesser than dragging distance conf.
        Math.abs(dragAmount) < this.conf.draggingDistance,

        // Dragging distance conf is not set & dragging is lesser than 50%.
        !this.conf.draggingDistance && Math.abs(dragPercentage) < 50,

        // arrowNext is disabled and dragging beyond last slide.
        this.arrowPrevDisabled && !this.slides.current && !forwards,

        // arrowPrev is disabled and dragging beyond first slide.
        this.arrowNextDisabled && this.slides.current === this.slides.count - 1 && forwards
      ]

      // If no reason to cancel sliding.
      if (reasonsToCancelSliding.indexOf(true) === -1) {
        let targetSlide = this.slides.current + this.conf.slideMultiple * (forwards ? 1 : -1)
        this.goToSlide(targetSlide)
      }

      else this.cancelSlideChange()

      this.touch.dragStartX = null
      this.touch.dragNowX = null
      this.touch.dragAmount = null
      // this.enableScroll()
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
     * @param {null, 0, 1} nextSlideIsClone: wheter the slide to access is a clone, and
     *                                       if so, if it's the first or last one.
     * @param {null, float} currentDragX: whether the slide track is being dragged and if so
     *                                    the value of the current drag.
     */
    updateCurrentTranslation (nextSlideIsClone = null, currentMouseX = null) {
      let dragging = currentMouseX
      let translation = this.getBasicTranslation()

      if (this.conf.infinite && nextSlideIsClone !== null) {
        translation = (nextSlideIsClone ? this.slides.count + 1 : 0) / this.conf.visibleSlides
      }

      // If dragging.
      if (this.touch.dragStartX && currentMouseX) {
        let dragPercentage = 0
        let dragPercentageStart = (this.touch.dragStartX - this.container.offsetLeft) / this.container.clientWidth
        let dragPercentageNow = (currentMouseX - this.container.offsetLeft) / this.container.clientWidth

        dragPercentage = (dragPercentageStart < 0.5 ? 0 : 1) - dragPercentageNow

        translation += dragPercentage
      }

      // Special behavior if multiple visible slides and sliding 1 by 1:
      // The translation is modified as user slides just to look nicer.
      if (this.conf.visibleSlides > 1 && this.conf.slideMultiple === 1) {
        // If not inifinite sliding.
        if (!this.conf.infinite) {
          let preferredPosition = Math.ceil(this.conf.visibleSlides / 2)
          let remainingSlides = this.slides.count - (this.slides.current + 1)
          let positionsAfterPreferred = this.conf.visibleSlides - preferredPosition
          let preferredPositionIsPassed = remainingSlides < positionsAfterPreferred

          let slidesWOTranslation = preferredPosition - 1
          let substractFromTranslation = Math.min(slidesWOTranslation, this.slides.current)

          // From next position after the preferred position.
          if (preferredPositionIsPassed) {
            substractFromTranslation += positionsAfterPreferred - remainingSlides
          }

          translation -= substractFromTranslation / this.conf.visibleSlides
        }
      }

      this.transition.currentTranslation = - translation * 100
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
        this.goToSlide(this.slides.current + this.conf.slideMultiple, { autoPlaying: true })
      }, this.conf.speed)
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
     * @return {integer} the first visible slide index
     */
    getFirstVisibleSlide (index) {
      return Math.floor(index / this.conf.slideMultiple) * this.conf.slideMultiple
    },

    getSlideInRange (index, autoPlaying) {
      let clone = null

      // If infinite enabled, going out of range takes the first slide from the other end.
      if (this.conf.infinite && index === -1) clone = 0
      else if (this.conf.infinite && index === this.slides.count) clone = 1

      // Generic case:
      // If going beyond slides count, take the modulo as next slide index.
      // E.g. If we want to access slide 9 and there are only 6 slides, go to slide 3.
      // (index + this.slides.count) to also handle negative index.
      let newIndex = (index + this.slides.count) % this.slides.count

      if (this.conf.slideMultiple > 1) {
        let lastSlideItems = this.slides.count % this.conf.slideMultiple || this.conf.slideMultiple
        let missingItems = this.conf.slideMultiple - lastSlideItems

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
      if (this.conf.disableArrowsOnEdges && (index < 0 || index > this.slides.count - 1) && !autoPlaying) {
        newIndex = this.slides.current
      }

      return { nextSlide: newIndex, clone: clone }
    },

    goToSlide (index, options = {}) {
      if (!this.slides.count || this.disable) return

      if (this.conf.autoplay) this.clearTimer()

      // animation = slide transition is animated.
      // autoPlaying = go to the next slide by autoplay - no user intervention.
      // jumping = after reaching a clone, the callback jumps back to original slide with no animation.
      let { animation = true, autoPlaying = false, jumping = false } = options

      this.transition.animated = animation
      setTimeout(() => this.transition.animated = false, this.transitionSpeed)

      // Get the next slide index and whether it's a clone.
      let { nextSlide, clone: nextSlideIsClone } = this.getSlideInRange(index, autoPlaying)

      // Emit event. First use of `goToSlide` is while init, so should not propagate an event.
      if (this.isReady && !jumping) {
        this.emit('before-slide', true, nextSlide)

        // Refresh clones.
        if (nextSlideIsClone !== null) this.cloneSlides()
      }

      // Disable arrows if `disableArrowsOnEdges` is on and there is no slide to go to on that end.
      if (this.conf.arrows && this.conf.disableArrowsOnEdges) {
        this.arrowPrevDisabled = nextSlide === 0 || (nextSlide - this.conf.slideMultiple) < 0
        this.arrowNextDisabled = nextSlide === this.slides.count - 1 || (nextSlide + this.conf.slideMultiple) > this.slides.count - 1
      }

      // Infinite sliding with cloned slides:
      // When reaching last slide and going next the cloned slide of the first slide
      // shows up, when the animation ends the real change to the first slide is done
      // immediately with no animation.
      // Same principle when going beyond first slide.
      if (nextSlideIsClone !== null) {// Gives clone id (0 or 1 or null).
        setTimeout(() => {
          // inside the callback, also check if it is not too late to apply next slide
          // (user may have slid fast multiple times) if so cancel callback.
          let passedCloneBackward = index === -1 && this.slides.current !== this.slides.count - 1
          let passedCloneForward = index === this.slides.count && this.slides.current !== 0
          let tooLateToSetTimeout = passedCloneBackward || passedCloneForward

          if (!tooLateToSetTimeout) {
            this.transition.speed = 0
            this.goToSlide(nextSlideIsClone ? 0 : this.slides.count - 1, { animation: false, jumping: true })
            setTimeout(() => this.transition.speed = this.conf.transitionSpeed, 50)
          }
        }, this.transition.speed - 50)
      }

      this.slides.current = nextSlide

      // Only apply sliding transition when the slideshow animation type is `slide`.
      if (!this.conf.fade) {
        this.updateCurrentTranslation(nextSlideIsClone)
      }

      this.slides.activeUid = this.slides.list[this.slides.current]._uid

      if (this.conf.autoplay && !this.mouseOver) {
        this.setTimer()
      }

      if (this.slides.count) {
        if (this.$slots.default[this.slides.current]) {
          // First use of goToSlide is while init, so should not propagate an event.
          if (this.isReady && !jumping) this.emit('slide')
        }

        if (this.isReady && !autoPlaying && !jumping && this.$refs.bullet[this.slides.current]) {
          this.$refs.bullet[this.slides.current].focus()
        }
      }
    },

    addSlide (newSlide) {
      const needReclone = this.conf.infinite && this.isReady && newSlide.clone === null

      if (newSlide.clone !== null) {
        this.clones[newSlide.clone] = newSlide
      }

      else {
        // Add the slide in the slides array & update slides.count.
        this.slides.list.push(newSlide)
        this.slides.count = this.slides.list.length
      }

      if (this.slides.count > 1 && this.touchable) {
        this.touch.enabled = true
      }

      // cloneSlides() is called at the end of init so calling it before would be redundant.
      if (needReclone) {
        this.$nextTick(() => this.cloneSlides())
      }
    },

    removeSlide (uid) {
      let needReclone = false

      this.slides.list.some((slide, i) => {
        if (slide._uid === uid) {
          // Remove the slide.
          this.slides.list.splice(i, 1)
          this.slides.count = this.slides.list.length

          // If the slide to remove is the current slide, slide to the previous slide.
          if (uid === this.slides.activeUid) {
            this.slides.activeUid = null
            this.goToSlide(i - 1, { autoPlaying: true })
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
  },

  computed: {
    // this.conf needs to be reactive so user can change a Vueper Slides option and everything gets updated.
    conf () {
      // Read config from the props then check if breakpoints are defined.
      // If so override the config with the breakpoint ones.
      let conf = {
        ...this.$props,
        ...(this.$props.breakpoints && this.$props.breakpoints[this.breakpointsData.current] || {})
      }

      // Overrides: once config from breakpoints is imported, we can use the conf object
      // and be sure all the options are up to date.
      //-------------------------------//
      conf.slideMultiple = conf.slideMultiple ? conf.visibleSlides : 1

      if (conf.fade || conf.disableArrowsOnEdges || conf.visibleSlides > 1) {
        conf.infinite = false
      }

      conf.arrowsOutside = conf.arrowsOutside || (conf.visibleSlides > 1 && conf.arrowsOutside === null)
      conf.bulletsOutside = conf.bulletsOutside || (conf.visibleSlides > 1 && conf.bulletsOutside === null)
      //-------------------------------//

      return conf
    },
    vueperStyles () {
      return /^-?\d/.test(this.conf.fixedHeight) ? 'height: ' + this.conf.fixedHeight : null
    },
    trackStyles () {
      let styles = {}

      if (this.conf.parallax) {
        styles.transform = 'translateY(' + this.parallaxData.translation + '%)'

        // Increase browser optimizations by allocating more machine resource.
        // ! \\ To be used wisely so deactivate when not needed.
        styles.willChange = this.parallaxData.isVisible ? 'transform' : 'auto'
      }

      return styles
    },
    trackInnerStyles () {
      let styles = {}

      styles.transitionDuration = this.transition.speed + 'ms'

      if (!this.conf.fade) {
        styles.transform = 'translateX(' + this.transition.currentTranslation + '%)'
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
    .vueperslide {
      height: inherit;
    }

    .vueperslides__parallax-wrapper {
      padding-bottom: 0 !important;
    }
  }

  &__inner {
    position: relative;
    user-select: none;
  }

  &__parallax-wrapper {
    position: relative;
    overflow: hidden;

    .vueperslides--3d & {
      overflow: visible;
    }
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

    .vueperslides--3d & {
      transform-style: preserve-3d;
      transform: rotateY(10deg) !important;
    }

    .vueperslides__track--mousedown & {
      transition: 0.2s ease-in-out transform !important;
    }

    .vueperslides__track--dragging & {
      transition: none;
    }

    .vueperslides__track--no-animation & {
      transition-duration: 0s;
    }
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

    &--outside {
      position: relative;
    }
  }

  &__bullet {
    cursor: pointer;
    user-select: none;
    outline: none;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    &::-moz-focus-inner {
      border: 0;
    }
  }
}
</style>