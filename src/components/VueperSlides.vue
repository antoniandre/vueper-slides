<template lang="pug">
div.vueperslides-wrapper(:class="{'ready': isReady}")
  div.vueperslides__slide-content.vueperslides__slide-content--outside(:class="slideContentOutsideClass" v-if="slideContentOutside")
      p.slide-title(v-html="slides[currentSlide].title")
      p.slide-content(v-html="slides[currentSlide].content")

  div.vueperslides(:class="{'vueperslides--fade': fade, 'vueperslides--touchable': touchable}" ref="vueperslides")
    div.vueperslides__slides-wrapper
      div.vueperslides__track(:class="{'vueperslides__track--dragging': dragging, 'vueperslides__track--mousedown': mouseDown}" ref="track" :style="!fade ? 'transform: translate3d(' + - currentTranslation + '%, 0, 0)' : ('padding-bottom: ' + (this.slideRatio * 100) + '%')")
        slot(:currentSlide="currentSlide")

    div.vueperslides__paused(v-if="$slots.pausedIcon")
      slot(name="pausedIcon")
    div.vueperslides__arrows(v-if="arrows")
      div.vueperslides__arrow.vueperslides__arrow--prev(@click="onArrowClick(false)" v-show="!arrowPrevDisabled")
        slot(name="arrowLeft")
          svg(viewBox="0 0 24 24")
            path(d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z")
      div.vueperslides__arrow.vueperslides__arrow--next(@click="onArrowClick()" v-show="!arrowNextDisabled")
        slot(name="arrowRight")
          svg(viewBox="0 0 24 24")
            path(d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z")
    div.vueperslides__bullets(:class="{'vueperslides__bullets--outside': bulletsOutside}" v-if="bullets")
      span.vueperslides__bullet(:class="{'vueperslides__bullet--active': currentSlide === i}" v-for="(item, i) in slides" :key="i" v-if="!item.clone" @click="goToSlide(i)")
        span {{ infinite ? i : (i + 1) }}
</template>

<script>
const config = {
  defaults: {
    slides: [],
    slideRatio: 1/3,
    slideContentOutside: false,
    activeSlideUid: null
  }
}

export default {
  name: "vueper-slides",
  provide: {
    config
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
      type: Boolean,
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
      default: ""
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
    }
  },
  data: () => ({
    isReady: false,
    slides: [
      {
        content: {}
      }
    ],
    slidesCount: 0,
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
    arrowNextDisabled: false
  }),
  created () {
    // Set the shared config as soon as possible.
    this.getConfig().slideRatio = this.slideRatio
    this.getConfig().slideContentOutside = this.slideContentOutside
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.emit('before-init', false)
      this.slides = this.getConfig().slides
      this.slidesCount = this.slides.length

      if (this.infinite && !this.fade) {
        this.cloneSlides()
        this.goToSlide(this.initSlide)
      } else this.goToSlide(this.initSlide - 1)

      this.bindEvents()

      this.isReady = true
      this.emit('ready')
    },

    // Emit a named event outside the component with 2 possible parameters:
    // current slide info & next slide info.
    emit(name, includeCurrentSlide = true, includeNextSlide = false) {
      let args = [name]

      if (includeCurrentSlide || typeof includeNextSlide === "number") {
        args[1] = {}
        if (includeCurrentSlide) {
          args[1].currentSlide = {
            index: this.currentSlide,
            title: this.slides[this.currentSlide].title,
            content: this.slides[this.currentSlide].content
          }
        }
        if (typeof includeNextSlide === "number") {
          let nextSlide = this.getSlideInRange(includeNextSlide)
          args[1].nextSlide = {
            index: nextSlide,
            title: this.slides[nextSlide].title,
            content: this.slides[nextSlide].content
          }
        }
      }

      this.$emit(name, ...args)
    },

    getConfig () {
      if (!config[this._uid]) {
        config[this._uid] = JSON.parse(JSON.stringify(config.defaults))
      }

      return config[this._uid]
    },

    setConfig (key, value) {
      this.getConfig()[key] = value
    },

    cloneSlides () {
      //----- Add a clone of the first slide at the end. -----//
      // If first node in this.$slots.default is a text node take the next one.
      let firstNodeIsVnode = this.$slots.default[0].tag
      let firstSlide = this.$slots.default[firstNodeIsVnode ? 0 : 1].elm
      let clonedFirstSlide = firstSlide.cloneNode(true)
      clonedFirstSlide.classList.add("vueperslides__slide--clone")
      this.$refs.track.appendChild(clonedFirstSlide)

      //----- Add a clone of the last slide at the begining. -----//
      let lastSlide = this.$slots.default[this.$slots.default.length - 1].elm
      let clonedLastSlide = lastSlide.cloneNode(true)
      clonedLastSlide.classList.add("vueperslides__slide--clone")
      this.$refs.track.insertBefore(clonedLastSlide, firstSlide)

      this.slides.unshift({
        _uid: this.slides[this.slidesCount - 1]._uid,
        title: this.slides[this.slidesCount - 1].title,
        content: this.slides[this.slidesCount - 1].content,
        clone: true
      })
      this.slides.push({
        _uid: this.slides[0]._uid,
        title: this.slides[0].title,
        content: this.slides[0].content,
        clone: true
      })
      this.slidesCount = this.slides.length

      this.getConfig().slides = this.slides
    },

    bindEvents () {
      const hasTouch = "ontouchstart" in window

      if (this.touchable) {
        this.$refs.track.addEventListener(hasTouch ? "touchstart" : "mousedown", this.onMouseDown)
        document.addEventListener(hasTouch ? "touchmove" : "mousemove", this.onMouseMove)
        document.addEventListener(hasTouch ? "touchend" : "mouseup", this.onMouseUp)
      }

      // Pause autoplay on mouseover.
      if (this.pauseOnHover && !hasTouch && this.autoplay) {
        this.$refs.vueperslides.addEventListener("mouseover", this.onMouseIn)
        this.$refs.vueperslides.addEventListener("mouseout", this.onMouseOut)
      }

      // window.addEventListener('resize', this.getSlideshowWidth)
    },

    getDragPercentage(e) {
      this.dragStartX = "ontouchstart" in window ? e.touches[0].clientX : e.clientX
      this.dragStartY = "ontouchstart" in window ? e.touches[0].clientY : e.clientY
      let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

      return this.dragStartX / windowWidth
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
      if (!e.touches) {
        e.preventDefault()
      }

      this.mouseDown = true

      let dragPercentage = this.getDragPercentage(e)

      // Set a flag for use while dragging in `onMouseMove` to know if drag was toward left or right.
      this.goNext = dragPercentage >= 0.5

      this.currentTranslation = 100 * (this.currentSlide + (this.goNext ? 1 : 0) - dragPercentage)
    },

    onMouseMove (e) {
      if (this.mouseDown || this.dragging) {
        this.mouseDown = false
        this.dragging = true

        let dragPercentage = this.getDragPercentage(e)
        this.currentTranslation = 100 * (this.currentSlide + (this.goNext ? 1 : 0) - dragPercentage)
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
        let slideOnDragEnd = Math.round(this.currentTranslation / 100)
        let nextSlide = this.getSlideInRange(slideOnDragEnd)

        // If drag is not allowed (`arrowNextDisabled` = true) and dragging beyond last slide,
        // cancel sliding and snap back to last slide.
        if (this.arrowNextDisabled && this.autoplay && nextSlide === 0) {
          nextSlide = this.slidesCount - 1
        }

        // Apply transition to finish sliding.
        this.currentTranslation = nextSlide * 100

        // Only call `goToSlide` if the final slide is different than the one before drag event started.
        if (nextSlide !== this.currentSlide) {
          this.goToSlide(nextSlide)
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
        this.goToSlide(this.currentSlide + 1)
      }, this.speed)
    },

    onArrowClick (next = true) {
      this.goToSlide(this.currentSlide + (next ? 1 : -1))
    },

    getSlideInRange (i) {
      // If infinite enabled, going out of range takes the first slide from the other end.
      if (this.infinite) {
        if (i < 0) i = this.slidesCount - 1
        else if (i > this.slidesCount - 1) i = 0
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

      return i
    },

    goToSlide (i, noAnimation = false) {
      let nextSlide = this.getSlideInRange(i)

      // First use of `goToSlide` is while init, so should not propagate an event.
      if (this.isReady) this.emit('before-slide', true, nextSlide)

      if (this.autoplay) this.clearTimer()

      // Disable arrows if `disableArrowsOnEdges` is on and there is no slide to go to on that end.
      if (this.arrows && this.disableArrowsOnEdges) {
        this.arrowPrevDisabled = nextSlide === 0
        this.arrowNextDisabled = nextSlide === this.slidesCount - 1
      }

      this.currentSlide = nextSlide

      // Infinite sliding with cloned slides:
      // When reaching last slide and going next the cloned slide of the first slide
      // shows up, when the animation ends the real change to the first slide is done
      // immediately with no animation.
      // Same principle when going beyond first slide.
      if (this.infinite && !this.fade) {
        if (!noAnimation) {
          this.$refs.track.classList.remove("vueperslides__track--no-animation")
        }

        if (i <= 0 || i >= this.slidesCount - 1) {
          setTimeout(() => {
            this.$refs.track.classList.add("vueperslides__track--no-animation")

            if (i <= 0) this.goToSlide(this.slidesCount - 2, true)
            else if (i >= this.slidesCount - 1) this.goToSlide(1, true)
          }, 400)
        }
      }

      // Only apply sliding transition when the slideshow animation type is `slide`.
      if (!this.fade) {
        this.currentTranslation = 100 * this.currentSlide
      }

      if (this.autoplay && !this.mouseOver) {
        this.setTimer()
      }

      if (this.$slots.default[this.currentSlide]) {
        // First use of goToSlide is while init, so should not propagate an event.
        if (this.isReady) this.emit('slide')
        this.setConfig('activeSlideUid', this.getConfig().slides[this.currentSlide]._uid)
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
    // padding-bottom: 45%;
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
      bottom: auto;
      top: 100%;
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
