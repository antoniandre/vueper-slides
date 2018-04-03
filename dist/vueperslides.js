'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = ".vueperslides { position: relative; } .vueperslides-wrapper { position: relative; } .vueperslides__slides-wrapper { position: relative; overflow: hidden; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; } .vueperslides__slides-wrapper::before, .vueperslides__slides-wrapper::after { content: \"\"; position: absolute; bottom: 100%; left: -1em; right: -1em; height: 2em; box-shadow: 0 0 20px rgba(0, 0, 0, 0.25); z-index: 2; } .vueperslides__slides-wrapper::after { top: 100%; bottom: auto; } .vueperslides--fade .vueperslides__track { white-space: normal; transition: none; } .vueperslides--touchable .vueperslides__track { cursor: ew-resize; cursor: -webkit-grab; } .vueperslides--touchable .vueperslides__track--mousedown, .vueperslides--touchable .vueperslides__track--dragging { cursor: -webkit-grabbing; } .vueperslides__track { white-space: nowrap; transition: 0.5s ease-in-out transform; } .vueperslides__track--mousedown { transition: 0.2s ease-in-out transform; } .vueperslides__track--dragging { transition: none; } .vueperslides__track--no-animation { transition-duration: 0s; } .vueperslides__slide { white-space: normal; padding-bottom: 34%; background-position: top; background-size: cover; display: inline-block; width: 100%; height: 0; margin-bottom: -8px; } .vueperslides__slide-content { user-select: none; } .vueperslides__slide-content--outside { user-select: initial; } .vueperslides--fade .vueperslides__slide { position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0; transition: .8s ease-in-out opacity; } .vueperslides--fade .vueperslides__slide--active { z-index: 1; opacity: 1; } .vueperslides__arrow { position: absolute; top: 50%; color: #fff; fill: currentColor; font-size: 3em; width: 1em; text-align: center; transform: translateY(-50%); opacity: 0.7; z-index: 10; transition: 0.3s ease-in-out; cursor: pointer; user-select: none; z-index: 2; } .vueperslides__arrow--prev { left: 10px; } .vueperslides__arrow--next { right: 10px; } .vueperslides__arrow:hover { opacity: 1; } .vueperslides__paused { position: absolute; top: 3%; right: 3%; opacity: 0; transition: 0.3s ease-in-out; text-shadow: 0 0 3px rgba(0, 0, 0, 0.4); } .vueperslides:hover .vueperslides__paused { opacity: 1; } .vueperslides__bullets { display: flex; justify-content: center; position: absolute; bottom: 0; left: 0; right: 0; } .vueperslides__bullets--outside { bottom: auto; top: 100%; } .vueperslides__bullet { width: 12px; height: 12px; border-radius: 12px; border: 1px solid #fff; box-shadow: 0 0 1px rgba(0, 0, 0, 0.5), 0 0 3px rgba(0, 0, 0, 0.3); margin: 1.5em 0.6em; display: inline-block; cursor: pointer; user-select: none; z-index: 2; display: flex; justify-content: center; align-items: center; } .vueperslides__bullet--active { background-color: #fff; } .vueperslides__bullet span { display: none; } @media screen and (max-width: 1000px) { .vueperslides__slide { padding-bottom: 45%; } .vueperslides--fade .vueperslides__track { padding-bottom: 45%; } } @media screen and (max-width: 700px) { .vueperslides__slide { padding-bottom: 54%; } .vueperslides--fade .vueperslides__track { padding-bottom: 54%; } } @media screen and (max-width: 400px) { .vueperslides__slide { padding-bottom: 60%; } .vueperslides--fade .vueperslides__track { padding-bottom: 60%; } } ";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var config = {
  defaults: {
    slides: [],
    slideRatio: 1 / 3,
    slideContentOutside: false,
    activeSlideUid: null
  }
};

var VueperSlides = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "vueperslides-wrapper", class: { 'ready': _vm.isReady } }, [_vm.slideContentOutside ? _c('div', { staticClass: "vueperslides__slide-content vueperslides__slide-content--outside", class: _vm.slideContentOutsideClass }, [_c('p', { staticClass: "slide-title", domProps: { "innerHTML": _vm._s(_vm.slides[_vm.currentSlide].title) } }), _c('p', { staticClass: "slide-content", domProps: { "innerHTML": _vm._s(_vm.slides[_vm.currentSlide].content) } })]) : _vm._e(), _c('div', { ref: "vueperslides", staticClass: "vueperslides", class: { 'vueperslides--fade': _vm.fade, 'vueperslides--touchable': _vm.touchable } }, [_c('div', { staticClass: "vueperslides__slides-wrapper" }, [_c('div', { ref: "track", staticClass: "vueperslides__track", class: { 'vueperslides__track--dragging': _vm.dragging, 'vueperslides__track--mousedown': _vm.mouseDown }, style: !_vm.fade ? 'transform: translate3d(' + -_vm.currentTranslation + '%, 0, 0)' : 'padding-bottom: ' + this.slideRatio * 100 + '%' }, [_vm._t("default", null, { currentSlide: _vm.currentSlide })], 2)]), _vm.$slots.pausedIcon ? _c('div', { staticClass: "vueperslides__paused" }, [_vm._t("pausedIcon")], 2) : _vm._e(), _vm.arrows ? _c('div', { staticClass: "vueperslides__arrows" }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: !_vm.arrowPrevDisabled, expression: "!arrowPrevDisabled" }], staticClass: "vueperslides__arrow vueperslides__arrow--prev", on: { "click": function click($event) {
          _vm.onArrowClick(false);
        } } }, [_vm._t("arrowLeft", [_c('svg', { attrs: { "viewBox": "0 0 24 24" } }, [_c('path', { attrs: { "d": "M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z" } })])])], 2), _c('div', { directives: [{ name: "show", rawName: "v-show", value: !_vm.arrowNextDisabled, expression: "!arrowNextDisabled" }], staticClass: "vueperslides__arrow vueperslides__arrow--next", on: { "click": function click($event) {
          _vm.onArrowClick();
        } } }, [_vm._t("arrowRight", [_c('svg', { attrs: { "viewBox": "0 0 24 24" } }, [_c('path', { attrs: { "d": "M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z" } })])])], 2)]) : _vm._e(), _vm.bullets ? _c('div', { staticClass: "vueperslides__bullets", class: { 'vueperslides__bullets--outside': _vm.bulletsOutside } }, _vm._l(_vm.slides, function (item, i) {
      return !item.clone ? _c('span', { key: i, staticClass: "vueperslides__bullet", class: { 'vueperslides__bullet--active': _vm.currentSlide === i }, on: { "click": function click($event) {
            _vm.goToSlide(i);
          } } }, [_c('span', [_vm._v(_vm._s(i + 1))])]) : _vm._e();
    })) : _vm._e()])]);
  }, staticRenderFns: [],
  name: "vueper-slides",
  provide: {
    config: config
  },
  props: {
    initSlide: {
      type: Number,
      default: 1
    },
    slideRatio: {
      type: Number,
      default: 1 / 3
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
  data: function data() {
    return {
      isReady: false,
      slides: [{
        content: {}
      }],
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
    };
  },
  created: function created() {
    // Set the shared config as soon as possible.
    this.getConfig().slideRatio = this.slideRatio;
    this.getConfig().slideContentOutside = this.slideContentOutside;
  },
  mounted: function mounted() {
    this.init();
  },

  methods: {
    init: function init() {
      this.emit('before-init', false);
      this.slides = this.getConfig().slides;
      this.slidesCount = this.slides.length;

      if (this.infinite && !this.fade) {
        this.cloneSlides();
        this.goToSlide(this.initSlide);
      } else this.goToSlide(this.initSlide - 1);

      this.bindEvents();

      this.isReady = true;
      this.emit('ready');
    },
    emit: function emit(name) {
      var includeCurrentSlide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var includeNextSlide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var args = [name];

      if (includeCurrentSlide || includeNextSlide) {
        args[1] = {};
        if (includeCurrentSlide) {
          args[1].currentSlide = {
            index: this.currentSlide,
            title: this.slides[this.currentSlide].title,
            content: this.slides[this.currentSlide].content
          };
        }
        if (includeNextSlide) {
          args[1].nextSlide = {
            index: this.currentSlide,
            title: this.slides[this.currentSlide].title,
            content: this.slides[this.currentSlide].content
          };
        }
      }

      this.$emit.apply(this, [name].concat(args));
    },
    getConfig: function getConfig() {
      if (!config[this._uid]) {
        config[this._uid] = JSON.parse(JSON.stringify(config.defaults));
      }

      return config[this._uid];
    },
    setConfig: function setConfig(key, value) {
      this.getConfig()[key] = value;
    },
    cloneSlides: function cloneSlides() {
      //----- Add a clone of the first slide at the end. -----//
      // If first node in this.$slots.default is a text node take the next one.
      var firstNodeIsVnode = this.$slots.default[0].tag;
      var firstSlide = this.$slots.default[firstNodeIsVnode ? 0 : 1].elm;
      var clonedFirstSlide = firstSlide.cloneNode(false);
      clonedFirstSlide.classList.add("vueperslides__slide--clone");
      this.$refs.track.appendChild(clonedFirstSlide);

      //----- Add a clone of the last slide at the begining. -----//
      var lastSlide = this.$slots.default[this.$slots.default.length - 1].elm;
      var clonedLastSlide = lastSlide.cloneNode(false);
      clonedLastSlide.classList.add("vueperslides__slide--clone");
      this.$refs.track.insertBefore(clonedLastSlide, firstSlide);

      this.slides.unshift({
        _uid: this.slides[this.slidesCount - 1]._uid,
        title: this.slides[this.slidesCount - 1].title,
        content: this.slides[this.slidesCount - 1].content,
        clone: true
      });
      this.slides.push({
        _uid: this.slides[0]._uid,
        title: this.slides[0].title,
        content: this.slides[0].content,
        clone: true
      });
      this.slidesCount = this.slides.length;
    },
    bindEvents: function bindEvents() {
      var hasTouch = "ontouchstart" in window;

      if (this.touchable) {

        this.$refs.track.addEventListener(hasTouch ? "touchstart" : "mousedown", this.onMouseDown);
        document.addEventListener(hasTouch ? "touchmove" : "mousemove", this.onMouseMove);
        document.addEventListener(hasTouch ? "touchend" : "mouseup", this.onMouseUp);
      }

      // Pause autoplay on mouseover.
      if (this.pauseOnHover && !hasTouch && this.autoplay) {
        this.$refs.vueperslides.addEventListener("mouseover", this.onMouseIn);
        this.$refs.vueperslides.addEventListener("mouseout", this.onMouseOut);
      }

      // window.addEventListener('resize', this.getSlideshowWidth)
    },
    getDragPercentage: function getDragPercentage(e) {
      this.dragStartX = "ontouchstart" in window ? e.touches[0].clientX : e.clientX;
      this.dragStartY = "ontouchstart" in window ? e.touches[0].clientY : e.clientY;
      var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      return this.dragStartX / windowWidth;
    },
    onMouseIn: function onMouseIn() {
      this.mouseOver = true;

      if (this.pauseOnHover && this.autoplay) {
        this.clearTimer();
      }
    },
    onMouseOut: function onMouseOut() {
      this.mouseOver = false;

      if (this.pauseOnHover && this.autoplay) {
        this.setTimer();
      }
    },
    onMouseDown: function onMouseDown(e) {
      if (!e.touches) {
        e.preventDefault();
      }

      this.mouseDown = true;

      var dragPercentage = this.getDragPercentage(e);

      // Set a flag for use while dragging in `onMouseMove` to know if drag was toward left or right.
      this.goNext = dragPercentage >= 0.5;

      this.currentTranslation = 100 * (this.currentSlide + (this.goNext ? 1 : 0) - dragPercentage);
    },
    onMouseMove: function onMouseMove(e) {
      if (this.mouseDown || this.dragging) {
        this.mouseDown = false;
        this.dragging = true;

        var dragPercentage = this.getDragPercentage(e);
        this.currentTranslation = 100 * (this.currentSlide + (this.goNext ? 1 : 0) - dragPercentage);
      }
    },
    onMouseUp: function onMouseUp() {
      if (this.mouseDown || this.dragging) {
        this.mouseDown = false;
        this.dragging = false;

        // this.currentTranslation = Math.min(Math.max(0, Math.round(this.currentTranslation / 100) * 100), (this.slidesCount - 1) * 100)
        // this.currentSlide = this.currentTranslation / 100

        // When the drag is realeased, calculate if the drag ends before or after the 50%-slideshow-width threshold.
        // Then finish the sliding toward that slide.
        var slideOnDragEnd = Math.round(this.currentTranslation / 100);
        var nextSlide = this.getSlideInRange(slideOnDragEnd);

        // If drag is not allowed (`arrowNextDisabled` = true) and dragging beyond last slide,
        // cancel sliding and snap back to last slide.
        if (this.arrowNextDisabled && this.autoplay && nextSlide === 0) {
          nextSlide = this.slidesCount - 1;
        }

        // Apply transition to finish sliding.
        this.currentTranslation = nextSlide * 100;

        // Only call `goToSlide` if the final slide is different than the one before drag event started.
        if (nextSlide !== this.currentSlide) {
          this.goToSlide(nextSlide);
        }

        this.enableScroll();
      }
    },
    disableScroll: function disableScroll() {
      document.ontouchmove = function (e) {
        e.preventDefault();
      };
    },
    enableScroll: function enableScroll() {
      document.ontouchmove = function () {
        return true;
      };
    },
    clearTimer: function clearTimer() {
      clearTimeout(this.timer);
      this.timer = 0;
    },
    setTimer: function setTimer() {
      var _this = this;

      this.timer = setTimeout(function () {
        _this.goToSlide(_this.currentSlide + 1);
      }, this.speed);
    },
    onArrowClick: function onArrowClick() {
      var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.goToSlide(this.currentSlide + (next ? 1 : -1));
    },
    getSlideInRange: function getSlideInRange(i) {
      // If infinite enabled, going out of range takes the first slide from the other end.
      if (this.infinite) {
        if (i < 0) i = this.slidesCount - 1;else if (i > this.slidesCount - 1) i = 0;
      }

      // If not infinite, can't go lower than 0 or beyond `slidesCount` with `disableArrowsOnEdges`.
      // If `disableArrowsOnEdges` is enabled going out of range will take first slide from the other end
      // of the slideshow.
      else {
          if (i < 0) i = this.disableArrowsOnEdges ? 0 : this.slidesCount - 1;else if (i > this.slidesCount - 1) {
            // If autoplay is on but disableArrowsOnEdges is enabled, going beyond the last one will also bring
            // the first one in.
            i = this.disableArrowsOnEdges ? this.autoplay ? 0 : this.slidesCount - 1 : 0;
          }
        }

      return i;
    },
    goToSlide: function goToSlide(i) {
      var noAnimation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var nextSlide = this.getSlideInRange(i);

      // First use of `goToSlide` is while init, so should not propagate an event.
      if (this.isReady) this.emit('before-slide', true, true);

      if (this.autoplay) this.clearTimer();

      console.log('current slide = ' + this.currentSlide + ', next slide = ' + nextSlide);

      // Disable arrows if `disableArrowsOnEdges` is on and there is no slide to go to on that end.
      if (this.arrows && this.disableArrowsOnEdges) {
        this.arrowPrevDisabled = nextSlide === 0;
        this.arrowNextDisabled = nextSlide === this.slidesCount - 1;
      }

      this.currentSlide = nextSlide;

      // Infinite sliding.
      // if (this.infinite && !this.fade) {
      //   if (!noAnimation) {
      //     this.$refs.track.classList.remove("vueperslides__track--no-animation")
      //   }

      //   if (i <= 0 || i >= this.slidesCount - 1) {
      //     setTimeout(() => {
      //       this.$refs.track.classList.add("vueperslides__track--no-animation")

      //       if (i <= 0) this.goToSlide(this.slidesCount - 2, true)
      //       else if (i >= this.slidesCount - 1) this.goToSlide(1, true)
      //     }, 500)
      //   }
      //   this.currentSlide = i
      // }

      // Only apply sliding transition when the slideshow animation type is `slide`.
      if (!this.fade) {
        this.currentTranslation = 100 * this.currentSlide;
      }

      if (this.autoplay && !this.mouseOver) {
        this.setTimer();
      }

      if (this.$slots.default[this.currentSlide]) {
        // First use of goToSlide is while init, so should not propagate an event.
        if (this.isReady) this.emit('slide');
        this.setConfig('activeSlideUid', this.getConfig().slides[this.currentSlide]._uid);
      }
    }
  }
};

var _this = undefined;

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var VueperSlide = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: { 'vueperslides__slide': true, 'vueperslides__slide--active': _vm.conf.activeSlideUid === _vm._uid }, style: _vm.styles }, [!_vm.conf.slideContentOutside && (_vm.title || _vm.content) ? _c('div', { staticClass: "vueperslides__slide-content" }, [_c('p', { staticClass: "slide-title", domProps: { "innerHTML": _vm._s(_vm.title) } }), _c('p', { staticClass: "slide-content", domProps: { "innerHTML": _vm._s(_vm.content) } })]) : _vm._e()]);
  }, staticRenderFns: [],
  name: 'vueper-slide',
  inject: ['config'],
  props: {
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      conf: function conf() {
        return _this.config.defaults;
      } // Make configs reactive.
    };
  },
  methods: {
    getConfig: function getConfig() {
      if (!this.config[this.$parent._uid]) {
        this.config[this.$parent._uid] = JSON.parse(JSON.stringify(this.config.defaults));
      }

      return this.config[this.$parent._uid];
    }
  },
  created: function created() {
    this.conf = this.getConfig();
    this.conf.slides.push({
      _uid: this._uid,
      image: this.image,
      title: this.title,
      content: this.content
    });
  },

  computed: {
    styles: function styles() {
      var styles = {};
      if (this.image) {
        styles.backgroundImage = 'url(' + this.image + ')';
      }
      if (this.conf.slideRatio) {
        styles.paddingBottom = this.conf.slideRatio * 100 + '%';
      }
      return styles;
    }
  }
};

// expose component to global scope
if (typeof window !== 'undefined' && window.Vue) {
  Vue.component('vueper-slides', VueperSlides);
  Vue.component('vueper-slide', VueperSlide);
}

exports.VueperSlides = VueperSlides;
exports.VueperSlide = VueperSlide;
