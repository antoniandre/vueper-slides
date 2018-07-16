<template lang="pug">
div.vueperslides(:class="{ 'vueperslides--ready': isReady, 'vueperslides--fade': conf.fade, 'vueperslides--parallax': conf.parallax, 'vueperslides--touchable': touch.enabled && !disable, 'vueperslides--animated': true }" ref="vueperslides" aria-label="Slideshow")
  div.vueperslides__slide-content.vueperslides__slide-content--outside-top(:class="conf.slideContentOutsideClass" v-if="conf.slideContentOutside === 'top'")
    div.slide-title(v-if="slides.count && slides.list[slides.current].title" v-html="slides.list[slides.current].title")
    div.slide-title(v-if="slides.count && slides.list[slides.current].titleSlot" v-html="slides.list[slides.current].titleSlot")
    div.slide-content(v-if="slides.count && slides.list[slides.current].content" v-html="slides.list[slides.current].content")
    div.slide-content(v-if="slides.count && slides.list[slides.current].contentSlot" v-html="slides.list[slides.current].contentSlot")

  div.vueperslides__inner
    div.vueperslides__parallax-wrapper(:style="'padding-bottom:' + (conf.slideRatio * 100) + '%'" aria-live="polite")
      div.vueperslides__track-wrapper(:style="trackWrapperStyles")
        div.vueperslides__track(:class="{ 'vueperslides__track--dragging': touch.dragging, 'vueperslides__track--mousedown': mouseDown }" ref="track" :style="trackStyles")
          vueper-slide.vueperslides__slide--clone(v-if="slides.count && clones[0]" :clone="0" :title="clones[0].title" :content="clones[0].content" :image="clones[0].image" :style="clones[0].style" aria-hidden="true")
            div(v-if="clones[0].titleSlot" slot="slideTitle" v-html="clones[0].titleSlot")
            div(v-if="clones[0].contentSlot" slot="slideContent" v-html="clones[0].contentSlot")
          slot(:currentSlide="slides.current")
          vueper-slide.vueperslides__slide--clone(v-if="slides.count && clones[1]" :clone="1" :title="clones[1].title" :content="clones[1].content" :image="clones[1].image" :style="clones[1].style" aria-hidden="true")
            div(v-if="clones[1].titleSlot" slot="slideTitle" v-html="clones[1].titleSlot")
            div(v-if="clones[1].contentSlot" slot="slideContent" v-html="clones[1].contentSlot")

    div.vueperslides__paused(v-if="$slots.pausedIcon")
      slot(name="pausedIcon")
    div.vueperslides__arrows(:class="{ 'vueperslides__arrows--outside': conf.arrowsOutside }" v-if="conf.arrows && slides.count > 1 && !disable")
      button.vueperslides__arrow.vueperslides__arrow--prev(@click="onArrowClick(false)" v-show="!arrowPrevDisabled" aria-label="Previous")
        slot(name="arrowLeft")
          svg(viewBox="0 0 24 24")
            path(d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z")
      button.vueperslides__arrow.vueperslides__arrow--next(@click="onArrowClick()" v-show="!arrowNextDisabled" aria-label="Next")
        slot(name="arrowRight")
          svg(viewBox="0 0 24 24")
            path(d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z")
    div.vueperslides__bullets(v-if="conf.bullets && slides.count > 1 && !disable && !conf.bulletsOutside" role="tablist" aria-label="Slideshow navigation")
      button.vueperslides__bullet(:class="{ 'vueperslides__bullet--active': slides.current === i }" v-for="(item, i) in slides.list" :key="i" @click="goToSlide(i)" @keyup.left="onArrowClick(false)" @keyup.right="onArrowClick()" ref="bullet")
        span {{ i + 1 }}

  div.vueperslides__bullets.vueperslides__bullets--outside(v-if="conf.bullets && slides.count > 1 && !disable && conf.bulletsOutside")
    button.vueperslides__bullet(:class="{ 'vueperslides__bullet--active': slides.current === i }" v-for="(item, i) in slides.list" :key="i" @click="goToSlide(i)" @keyup.left="onArrowClick(false)" @keyup.right="onArrowClick()" ref="bullet")
      span {{ i + 1 }}

  div.vueperslides__slide-content.vueperslides__slide-content--outside-bottom(:class="conf.slideContentOutsideClass" v-if="conf.slideContentOutside === 'bottom'")
    div.slide-title(v-if="slides.count && slides.list[slides.current].title" v-html="slides.list[slides.current].title")
    div.slide-title(v-if="slides.count && slides.list[slides.current].titleSlot" v-html="slides.list[slides.current].titleSlot")
    div.slide-content(v-if="slides.count && slides.list[slides.current].content" v-html="slides.list[slides.current].content")
    div.slide-content(v-if="slides.count && slides.list[slides.current].contentSlot" v-html="slides.list[slides.current].contentSlot")
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
      default: false
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
    }
  },
  data: () => ({
    isReady: false,
    container: null,
    slides: { list: [], count: 0, activeUid: null, current: 0, clones: [] },
    clones: [],
    mouseDown: false,
    mouseOver: false,
    touch: { enabled: true, dragging: false, dragStartX: 0, dragAmount: 0, goNext: true },
    transition: { currentTranslation: 0, speed: 0 },
    timer: null,
    arrowPrevDisabled: false,
    arrowNextDisabled: false,
    breakpointsData: { list: [], current: null },
    parallaxData: { translation: 0, slideshowOffsetTop: null, isVisible: false },
  }),
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.emit('before-init', false)
      this.container = this.$refs.vueperslides
      this.touch.enabled = this.conf.touchable
      this.transition.speed = this.conf.transitionSpeed

      if (Object.keys(this.breakpoints).length) {
        this.setBreakpointsList()
        this.setBreakpointConfig(this.getCurrentBreakpoint())
      }

      if (this.conf.infinite && !this.conf.fade) {
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
      let args = [name]

      if (includeCurrentSlide || typeof includeNextSlide === 'number') {
        args[1] = {}
        if (includeCurrentSlide && this.slides.activeUid) {
          args[1].currentSlide = {
            index: this.slides.current,
            title: this.slides.list[this.slides.current].titleSlot ?
                   this.slides.list[this.slides.current].titleSlot
                   : this.slides.list[this.slides.current].title,
            content: this.slides.list[this.slides.current].contentSlot ?
                     this.slides.list[this.slides.current].contentSlot
                     : this.slides.list[this.slides.current].content,
          }
        }
        if (typeof includeNextSlide === 'number') {
          let { nextSlide } = this.getSlideInRange(includeNextSlide)
          args[1].nextSlide = {
            index: nextSlide,
            title: this.slides.list[nextSlide].titleSlot ?
                   this.slides.list[nextSlide].titleSlot
                   : this.slides.list[nextSlide].title,
            content: this.slides.list[nextSlide].contentSlot ?
                     this.slides.list[nextSlide].contentSlot
                     : this.slides.list[nextSlide].content,
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
      // this.conf gets updated by itself when this.breakpointsData.current changes.
    },

    cloneSlides () {
      let firstNodeIsVnode = this.$slots.default[0].tag
      let firstSlide = this.$slots.default[firstNodeIsVnode ? 0 : 1].elm
      let lastSlide = this.$slots.default[this.$slots.default.length - 1].elm

      this.clones[0] = {
        title: this.slides.list[this.slides.count - 1].title,
        titleSlot: this.slides.list[this.slides.count - 1].titleSlot || '',
        content: this.slides.list[this.slides.count - 1].content,
        contentSlot: this.slides.list[this.slides.count - 1].contentSlot || '',
        image: this.slides.list[this.slides.count - 1].image,
        style: lastSlide && lastSlide.attributes.style ? lastSlide.attributes.style.value : ''
      }
      this.clones[1] = {
        title: this.slides.list[0].title,
        titleSlot: this.slides.list[0].titleSlot || '',
        content: this.slides.list[0].content,
        contentSlot: this.slides.list[0].contentSlot || '',
        image: this.slides.list[0].image,
        style: firstSlide && firstSlide.attributes.style ? firstSlide.attributes.style.value : ''
      }
    },

    updateSlideContent (slideUID, key, value) {
      this.slides.list.some(slide => {
        if (slide._uid === slideUID) {
          slide[key] = value
        }

        return slide._uid === slideUID
      })
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

    onScroll (e) {
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

      // this.disableScroll()

      this.mouseDown = true

      if (this.draggingDistance) {
        // Store drag start in var for distance calculation in onMouseUp().
        this.touch.dragStartX = 'ontouchstart' in window ? e.touches[0].clientX : e.clientX
      } else {
        let dragPercentage = this.getDragPercentage(e)

        // Set a flag for use while dragging in `onMouseMove` to know if drag was toward left or right.
        this.touch.goNext = dragPercentage >= 0.5

        this.transition.currentTranslation = - 100 * (this.slides.current + (this.touch.goNext ? 1 : 0) + (this.clones.length ? 1 : 0) - dragPercentage)
      }
    },

    onMouseMove (e) {
      if (this.mouseDown || this.touch.dragging) {
        this.mouseDown = false
        this.touch.dragging = true

        if (this.draggingDistance) {
          this.touch.dragAmount = this.getDragAmount(e)
          let dragAmountPercentage = this.touch.dragAmount / this.container.clientWidth

          this.transition.currentTranslation = - 100 * (this.slides.current + (this.clones.length ? 1 : 0) - dragAmountPercentage)
        } else {
          let dragPercentage = this.getDragPercentage(e)
          this.transition.currentTranslation = - 100 * (this.slides.current + (this.touch.goNext ? 1 : 0) + (this.clones.length ? 1 : 0) - dragPercentage)
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
          let dragAmountPercentage = dragAmount / this.container.clientWidth

          slideOnDragEnd = this.slides.current
          if (Math.abs(dragAmount) >= this.draggingDistance) {
            slideOnDragEnd += dragAmount > 0 ? -1 : 1
          }
        } else {
          // When the drag is realeased, calculate if the drag ends before or after the 50%-slideshow-width threshold.
          // Then finish the sliding toward that slide.
          slideOnDragEnd = - (Math.round(this.transition.currentTranslation / 100) + (this.clones.length ? 1 : 0))
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
          this.transition.currentTranslation = - (this.slides.current + (this.clones.length ? 1 : 0)) * 100
        }

        this.touch.dragStartX = null
        this.touch.dragAmount = null
        this.enableScroll()
      }
    },

    getDragPercentage (e) {
      let dragStartX = 'ontouchstart' in window ? e.touches[0].clientX : e.clientX

      // For full window width slideshow only.
      // let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      // return dragStartX / windowWidth

      return (dragStartX - this.container.offsetLeft) / this.container.clientWidth
    },

    /**
     * Return the x distance in pixel between drag start and current drag position.
     */
    getDragAmount (e) {
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

      // Infinite sliding with cloned slides:
      // When reaching last slide and going next the cloned slide of the first slide
      // shows up, when the animation ends the real change to the first slide is done
      // immediately with no animation.
      // Same principle when going beyond first slide.
      if (nextSlideIsClone !== null) {// Gives clone id (0 or 1 or null).
        setTimeout(() => {
          // inside the callback, also check if it is not too late to apply next slide
          // (user may have slid fast multiple times) if so cancel callback.
          let passedCloneBackward = i === -1 && this.slides.current !== this.slides.count - 1
          let passedCloneForward = i === this.slides.count && this.slides.current !== 0
          let tooLateToSetTimeout = passedCloneBackward || passedCloneForward

          if (!tooLateToSetTimeout) {
            this.transition.speed = 0
            this.goToSlide(nextSlideIsClone ? 0 : this.slides.count - 1, false, autoSliding)
            setTimeout(() => { this.transition.speed = this.conf.transitionSpeed }, 10)
          }
        }, this.transition.speed - 50)
      }

      this.slides.current = nextSlide

      // Only apply sliding transition when the slideshow animation type is `slide`.
      if (!this.conf.fade) {
        if (nextSlideIsClone !== null) {
          this.transition.currentTranslation = - 100 * (nextSlideIsClone ? this.slides.count + 1 : 0)
        }
        else this.transition.currentTranslation = - 100 * (this.slides.current + (this.clones.length ? 1 : 0))
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

    addSlide (newSlide) {
      const needReclone = this.conf.infinite && !this.conf.fade && this.isReady && newSlide.clone === null

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
  },

  computed: {
    // this.conf needs to be reactive so user can change a Vueper Slides option and everything gets updated.
    conf () {
      // Read config from the props then check if breakpoints are defined. If so override the config with
      // the breakpoint ones.
      return {
        ...this.$props,
        ...(this.$props.breakpoints && this.$props.breakpoints[this.breakpointsData.current] || {})
      }
    },
    trackStyles () {
      let styles = {}

      styles.transitionDuration = this.transition.speed + 'ms'

      if (!this.conf.fade) {
        styles.transform = 'translateX(' + this.transition.currentTranslation + '%)'
      }

      return styles
    },
    trackWrapperStyles () {
      let styles = {}

      if (this.conf.parallax) {
        styles.transform = 'translateY(' + this.parallaxData.translation + '%)'

        // Increase browser optimizations by allocating more machine resource.
        // ! \\ To be used wisely so deactivate when not needed.
        styles.willChange = this.parallaxData.isVisible ? 'transform' : 'auto'
      }

      return styles
    }
  }
}
</script>

<style lang="scss">
// Vueperslides REQUIRED styles.
// The nice-to-have not required styles are placed in an external
// css file so the end user can easily override them.
.vueperslides {
  position: relative;

  &__inner {
    position: relative;
    user-select: none;
  }

  &__parallax-wrapper {
    position: relative;
    // padding-bottom: 33.33%;
    overflow: hidden;
  }

  &__track-wrapper {
    position: absolute;
    top: 0;
    height: 100%;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: 1;
  }

  &--parallax &__track-wrapper {
    height: 200%;
    transform: translateY(0);
  }

  &--fade &__track {
    white-space: normal;
    transition: none;
  }

  &--touchable &__track {
    cursor: ew-resize;
    cursor: -webkit-grab;
    cursor: grab;

    &--mousedown, &--dragging {
      cursor: -webkit-grabbing;
      cursor: grabbing;
    }
  }

  &__track {
    white-space: nowrap;
    transition: 0.5s ease-in-out transform;
    height: 100%;

    &--mousedown {
      transition: 0.2s ease-in-out transform !important;
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
    background-position: top;
    background-size: cover;
    display: inline-block;
    width: 100%;
    height: 100%;
    position: relative;
  }

  &__slide &__slide-content {
    position: absolute;
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