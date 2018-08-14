<template lang="pug">
div.vueperslides(:class="{ 'vueperslides--ready': isReady, 'vueperslides--fade': conf.fade, 'vueperslides--parallax': conf.parallax, 'vueperslides--touchable': touch.enabled && !disable, 'vueperslides--fixed-height': conf.fixedHeight, 'vueperslides--animated': transition.animated }" ref="vueperslides" aria-label="Slideshow" :style="vueperStyles")
  div.vueperslide__content-wrapper.vueperslide__content-wrapper--outside-top(:class="conf.slideContentOutsideClass" v-if="conf.slideContentOutside === 'top'")
    div.vueperslide__title(v-if="slides.count" v-html="getCurrentSlideData('title')")
    div.vueperslide__content(v-if="slides.count" v-html="getCurrentSlideData('content')")

  div.vueperslides__inner
    div.vueperslides__parallax-wrapper(:style="'padding-bottom:' + (conf.slideRatio * 100) + '%'" aria-live="polite")
      div.vueperslides__track-wrapper(:style="trackWrapperStyles")
        div.vueperslides__track(:class="{ 'vueperslides__track--dragging': touch.dragging, 'vueperslides__track--mousedown': mouseDown }" ref="track" :style="trackStyles")
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
      button.vueperslides__bullet(:class="{ 'vueperslides__bullet--active': slides.current === i }" v-for="(item, i) in slides.list" :key="i" @click="goToSlide(i)" @keyup.left="previous()" @keyup.right="next()" ref="bullet")
        span {{ i + 1 }}

  div.vueperslides__bullets.vueperslides__bullets--outside(v-if="conf.bullets && slides.count > 1 && !disable && conf.bulletsOutside")
    button.vueperslides__bullet(:class="{ 'vueperslides__bullet--active': slides.current === i }" v-for="(item, i) in slides.list" :key="i" @click="goToSlide(i)" @keyup.left="previous()" @keyup.right="next()" ref="bullet")
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
      // this.conf gets updated by itself when this.breakpointsData.current changes.
      this.breakpointsData.current = breakpoint
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

      if (this.conf.infinite) this.cloneSlides()
      // this.disableScroll()

      this.mouseDown = true

      if (this.conf.draggingDistance) {
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

        // The clones are created with a copy of content.
        // Set refreshClonesOnDrag to true if you want to keep updating clones before you see them.
        if (this.conf.refreshClonesOnDrag && this.conf.infinite) {
          this.cloneSlides()
        }

        if (this.conf.draggingDistance) {
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
      this.mouseDown = false

      // If no mouse move there is nothing to do so don't go further.
      if (!this.touch.dragging) return this.cancelSlideChange()

      this.touch.dragging = false
      let itemsToSlide = this.conf.slideMultiple || 1
      let dragAmount = - this.touch.dragAmount
      let realCurrentSlideIndex = this.slides.current + !!this.clones.length * 1// Takes clones in account if any.
      let dragAmountRef50percent = - (this.transition.currentTranslation + realCurrentSlideIndex * 100)
      let forwards = (dragAmount || dragAmountRef50percent) > 0

      let reasonsToCancelSliding = [
        // Dragging distance conf is set & drag amount is lesser than dragging distance conf.
        Math.abs(dragAmount) < this.conf.draggingDistance,

        // Dragging distance conf is not set & dragging is lesser than 50%.
        !this.conf.draggingDistance && Math.abs(dragAmountRef50percent) < 50,

        // arrowNext is disabled and dragging beyond last slide.
        this.arrowPrevDisabled && !this.slides.current && !forwards,

        // arrowPrev is disabled and dragging beyond first slide.
        this.arrowNextDisabled && this.slides.current === this.slides.count - 1 && forwards
      ]

      // If no reason to cancel sliding.
      if (reasonsToCancelSliding.indexOf(true) === -1) {
        let targetSlide = this.slides.current + itemsToSlide * (forwards ? 1 : -1)
        this.goToSlide(targetSlide)
      }

      else this.cancelSlideChange()

      this.touch.dragStartX = null
      this.touch.dragAmount = null
      // this.enableScroll()
    },

    // Dragging did not pass conditions to change slide, snap back to current slide.
    cancelSlideChange () {
      this.transition.currentTranslation = - (this.slides.current + (this.clones.length ? 1 : 0)) * 100
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
        this.goToSlide(this.slides.current + 1, { autoPlaying: true })
      }, this.conf.speed)
    },

    previous () {
      let itemsToSlide = this.conf.slideMultiple || 1
      this.goToSlide(this.slides.current - itemsToSlide)
    },

    next () {
      let itemsToSlide = this.conf.slideMultiple || 1
      this.goToSlide(this.slides.current + itemsToSlide)
    },

    refreshParallax () {
      setTimeout(() => {
        this.onResize()
        this.onScroll()
      }, 100)
    },

    getSlideInRange (index, autoPlaying) {
      let clone = null

      // If infinite enabled, going out of range takes the first slide from the other end.
      if (this.conf.infinite && index === -1) clone = 0
      else if (this.conf.infinite && index === this.slides.count) clone = 1

      // If going beyond slides count, take the modulo as next slide index.
      // E.g. If we want to access slide 9 and there are only 6 slides, go to slide 3.
      let newIndex = index % this.slides.count + (index < 0 ? this.slides.count : 0)

      if (this.conf.disableArrowsOnEdges && (index < 0 || index > this.slides.count - 1) && !autoPlaying) {
        newIndex = this.slides.current
      }

      return { nextSlide: newIndex, clone: clone }
    },

    getSlideInRange_old (index) {
      let clone = null

      // If infinite enabled, going out of range takes the first slide from the other end.
      if (this.clones.length) {
        if (index < 0) {
          index = this.slides.count - 1
          clone = 0
        } else if (index > this.slides.count - 1) {
          index = 0
          clone = 1
        }
      }

      // If not infinite, can't go lower than 0 or beyond `slides.count` with `disableArrowsOnEdges`.
      // If `disableArrowsOnEdges` is enabled going out of range will take first slide from the other end
      // of the slideshow.
      else {
        if (index < 0) index = this.conf.disableArrowsOnEdges ? 0 : this.slides.count - 1
        else if (index > this.slides.count - 1) {
          // If autoplay is on but disableArrowsOnEdges is enabled, going beyond the last one will also bring
          // the first one in.
          index = this.conf.disableArrowsOnEdges ? (this.conf.autoplay ? 0 : this.slides.count - 1) : 0
        }
      }

      return { nextSlide: index, clone: clone }
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
        this.arrowPrevDisabled = nextSlide === 0 || (this.conf.slideMultiple && nextSlide - this.conf.slideMultiple) < 0
        this.arrowNextDisabled = nextSlide === this.slides.count - 1 || (this.conf.slideMultiple && nextSlide + this.conf.slideMultiple) > this.slides.count - 1
      }

      // Infinite sliding with cloned slides:
      // When reaching last slide and going next the cloned slide of the first slide
      // shows up, when the animation ends the real change to the first slide is done
      // immediately with no animation.
      // Same principle when going beyond first slide.
      if (nextSlideIsClone !== null) {// Gives clone id (0 or 1 or null).
        setTimeout(() => {
          console.log('timeout cz next slide is clone', nextSlideIsClone)
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
          else {console.log('timeout cancelled :D', nextSlideIsClone);this.transition.speed = 0}
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
      // Read config from the props then check if breakpoints are defined. If so override the config with
      // the breakpoint ones.
      let conf = {
        ...this.$props,
        ...(this.$props.breakpoints && this.$props.breakpoints[this.breakpointsData.current] || {})
      }

      if (conf.fade || conf.disableArrowsOnEdges) {
        conf.infinite = false
      }

      return conf
    },
    vueperStyles () {
      return /^-?\d/.test(this.conf.fixedHeight) ? 'height: ' + this.conf.fixedHeight : null
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