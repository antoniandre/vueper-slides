<template lang="pug">
div.vueperslides-wrapper(:class="{'ready': isReady}")
    div.vueperslides__slide-content.vueperslides__slide-content--outside(:class="slideContentOutsideClass" v-if="slideContentOutside")
        p.slide-title(v-html="slides[currentSlide].title")
        p.slide-content(v-html="slides[currentSlide].content")

    div.vueperslides(:class="{'vueperslides--fade': fade, 'vueperslides--touchable': touchable}" ref="vueperslides")
        div.vueperslides__slides-wrapper
            div.vueperslides__track(:class="{'vueperslides__track--dragging': dragging, 'vueperslides__track--mousedown': mouseDown}" ref="track" :style="!fade ? 'transform: translate3d(-' + currentTranslation + '%, 0, 0)' : slideRatio")
                slot(:currentSlide="currentSlide")

        div.vueperslides__paused(v-if="$slots.pausedIcon")
            slot(name="pausedIcon")
        div.vueperslides__arrows(v-if="arrows")
            div.vueperslides__arrow.vueperslides__arrow--prev(@click="onArrowClick(false)")
                slot(name="arrowLeft")
                    svg(viewBox="0 0 24 24")
                        path(d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z")
            div.vueperslides__arrow.vueperslides__arrow--next(@click="onArrowClick()")
                slot(name="arrowRight")
                    svg(viewBox="0 0 24 24")
                        path(d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z")
        div.vueperslides__bullets(:class="{'vueperslides__bullets--outside': bulletsOutside}" v-if="bullets")
            span.vueperslides__bullet(:class="{'vueperslides__bullet--active': currentSlide === i}" v-for="(item, i) in slides" :key="i" v-if="!item.clone" @click="goToSlide(i)")
                span {{ i + 1 }}
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
    bullets: {
      type: Boolean,
      default: true
    },
    arrows: {
      type: Boolean,
      default: true
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
    bulletsOutside: {
      type: Boolean,
      default: false
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
    timer: null
  }),
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.slides = this.getConfig().slides
      this.slidesCount = this.slides.length

      if (this.infinite && !this.fade) {
        this.cloneSlides()
        this.goToSlide(this.initSlide)
      } else this.goToSlide(this.initSlide - 1)

      this.getConfig().slideRatio = this.slideRatio
      if (this.fade) {
        this.slideRatio = `padding-bottom: ${this.slideRatio * 100}%`
      }

      this.bindEvents()

      this.isReady = true
      this.$emit("vueperslides.ready")
      this.getConfig().slideContentOutside = this.slideContentOutside
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
      // Add a clone of the first slide at the end.
      let firstSlide = this.$slots.default[0].elm
      let clonedFirstSlide = firstSlide.cloneNode(false)
      clonedFirstSlide.classList.add("vueperslides__slide--clone")
      this.$refs.track.appendChild(clonedFirstSlide)

      // Add a clone of the last slide at the begining.
      let lastSlide = this.$slots.default[this.$slots.default.length - 1].elm
      let clonedLastSlide = lastSlide.cloneNode(false)
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
    },

    bindEvents () {
      const hasTouch = "ontouchstart" in window

      if (this.touchable) {

        this.$refs.track.addEventListener(hasTouch ? "touchstart" : "mousedown", this.onMouseDown)
        this.$refs.track.addEventListener(hasTouch ? "touchmove" : "mousemove", this.onMouseMove)
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

      let windowWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      return this.dragStartX * 100 / windowWidth
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

      this.goNext = dragPercentage >= 50

      this.currentTranslation =
        100 * this.currentSlide +
        (this.goNext ? 100 - dragPercentage : -dragPercentage)
    },

    onMouseMove (e) {
      if (this.mouseDown || this.dragging) {
        this.mouseDown = false
        this.dragging = true

        let dragPercentage = this.getDragPercentage(e)

        this.currentTranslation =
          100 * this.currentSlide +
          (this.goNext ? 100 - dragPercentage : -dragPercentage)
      }
    },

    onMouseUp () {
      if (this.mouseDown || this.dragging) {
        this.mouseDown = false
        this.dragging = false

        // this.currentTranslation = Math.min(Math.max(0, Math.round(this.currentTranslation / 100) * 100), (this.slidesCount - 1) * 100)
        // this.currentSlide = this.currentTranslation / 100

        this.currentTranslation = Math.round(this.currentTranslation / 100) * 100
        this.goToSlide(this.currentTranslation / 100)

        if (this.$slots.default[this.currentSlide]) {
          this.$emit("vueperslides.slide")
          this.setConfig('activeSlideUid', this.getConfig().slides[this.currentSlide]._uid)
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

    goToSlide (i, noAnimation = false) {
      if (this.autoplay) {
        this.clearTimer()
      }

      // Infinite sliding.
      if (this.infinite && !this.fade) {
        if (!noAnimation) {
          this.$refs.track.classList.remove(
            "vueperslides__track--no-animation"
          )
        }

        if (i <= 0 || i >= this.slidesCount - 1) {
          setTimeout(() => {
            this.$refs.track.classList.add("vueperslides__track--no-animation")

            if (i <= 0) this.goToSlide(this.slidesCount - 2, true)
            else if (i >= this.slidesCount - 1) this.goToSlide(1, true)
          }, 500)
        }
        this.currentSlide = i
      }
      if (this.infinite || this.autoplay) {
        if (i < 0) this.currentSlide = this.slidesCount - 1
        else if (i > this.slidesCount - 1) this.currentSlide = 0
        else this.currentSlide = i
      } else this.currentSlide = Math.min(Math.max(0, i), this.slidesCount - 1)

      if (!this.fade) {
        this.currentTranslation = 100 * this.currentSlide
      }

      if (this.autoplay && !this.mouseOver) {
        this.setTimer()
      }

      if (this.$slots.default[this.currentSlide]) {
        // console.log('emitting', this.currentSlide - 1)
        this.$emit("vueperslides.slide")
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

  &__track {
    white-space: nowrap;
    transition: 0.5s ease-in-out transform;
    cursor: ew-resize;
    cursor: -webkit-grab;

    &--mousedown {
      transition: 0.2s ease-in-out transform;
      cursor: -webkit-grabbing;
    }

    &--dragging {
      transition: none;
      cursor: -webkit-grabbing;
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
