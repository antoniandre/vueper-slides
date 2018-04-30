(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.VueperSlides = global.VueperSlides || {})));
}(this, (function (exports) { 'use strict';

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
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: { 'vueperslides__slide': true, 'vueperslides__slide--active': _vm.$parent.activeSlideUid === _vm._uid }, style: _vm.styles }, [!_vm.$parent.slideContentOutside && (_vm.title || _vm.content) ? _c('div', { staticClass: "vueperslides__slide-content" }, [_c('p', { staticClass: "slide-title", domProps: { "innerHTML": _vm._s(_vm.title) } }), _c('p', { staticClass: "slide-content", domProps: { "innerHTML": _vm._s(_vm.content) } })]) : _vm._e()]);
  }, staticRenderFns: [],
  props: {
    clone: {
      type: Number,
      default: null
    },
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
  created: function created() {
    this.$parent.addSlide({
      _uid: this._uid,
      image: this.image,
      title: this.title,
      content: this.content,
      clone: this.clone
    });
  },

  // When removing a slide programmatically, remove it from the config so vueperslides
  // component is aware of the change.
  destroyed: function destroyed() {
    if (this.clone === null) this.$parent.removeSlide(this._uid);
  },

  computed: {
    styles: function styles() {
      var styles = {};
      if (this.image) {
        styles.backgroundImage = 'url(' + this.image + ')';
      }
      if (this.$parent.slideRatio) {
        styles.paddingBottom = this.$parent.slideRatio * 100 + '%';
      }
      return styles;
    }
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = ".vueperslides { position: relative; } .vueperslides-wrapper { position: relative; } .vueperslides__slides-wrapper { position: relative; overflow: hidden; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; z-index: 1; } .vueperslides__slides-wrapper::before, .vueperslides__slides-wrapper::after { content: \"\"; position: absolute; bottom: 100%; left: -1em; right: -1em; height: 2em; box-shadow: 0 0 20px rgba(0, 0, 0, 0.25); z-index: 2; } .vueperslides__slides-wrapper::after { top: 100%; bottom: auto; } .vueperslides--fade .vueperslides__track { white-space: normal; transition: none; } .vueperslides--touchable .vueperslides__track { cursor: ew-resize; cursor: -webkit-grab; } .vueperslides--touchable .vueperslides__track--mousedown, .vueperslides--touchable .vueperslides__track--dragging { cursor: -webkit-grabbing; } .vueperslides__track { white-space: nowrap; transition: 0.5s ease-in-out transform; } .vueperslides__track--mousedown { transition: 0.2s ease-in-out transform; } .vueperslides__track--dragging { transition: none; } .vueperslides__track--no-animation { transition-duration: 0s; } .vueperslides__slide { white-space: normal; padding-bottom: 34%; background-position: top; background-size: cover; display: inline-block; width: 100%; height: 0; margin-bottom: -8px; } .vueperslides__slide-content { user-select: none; } .vueperslides__slide-content--outside { user-select: initial; } .vueperslides--fade .vueperslides__slide { position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0; transition: .8s ease-in-out opacity; } .vueperslides--fade .vueperslides__slide--active { z-index: 1; opacity: 1; } .vueperslides__arrow { position: absolute; top: 50%; color: #fff; fill: currentColor; font-size: 3em; width: 1em; text-align: center; transform: translateY(-50%); opacity: 0.7; z-index: 10; transition: 0.3s ease-in-out; cursor: pointer; user-select: none; outline: none; z-index: 2; } .vueperslides__arrow--prev { left: 10px; } .vueperslides__arrow--next { right: 10px; } .vueperslides__arrow:hover { opacity: 1; } .vueperslides__paused { position: absolute; top: 3%; right: 3%; opacity: 0; transition: 0.3s ease-in-out; text-shadow: 0 0 3px rgba(0, 0, 0, 0.4); z-index: 1; } .vueperslides:hover .vueperslides__paused { opacity: 1; } .vueperslides__bullets { display: flex; justify-content: center; position: absolute; bottom: 0; left: 0; right: 0; } .vueperslides__bullets--outside { position: relative; } .vueperslides__bullet { width: 12px; height: 12px; border-radius: 12px; border: 1px solid #fff; box-shadow: 0 0 1px rgba(0, 0, 0, 0.5), 0 0 3px rgba(0, 0, 0, 0.3); margin: 1.5em 0.6em; display: inline-block; cursor: pointer; user-select: none; outline: none; z-index: 2; display: flex; justify-content: center; align-items: center; } .vueperslides__bullet--active { background-color: #fff; } .vueperslides__bullet span { display: none; } @media screen and (max-width: 1000px) { .vueperslides__slide { padding-bottom: 45%; } .vueperslides--fade .vueperslides__track { padding-bottom: 45%; } } @media screen and (max-width: 700px) { .vueperslides__slide { padding-bottom: 54%; } .vueperslides--fade .vueperslides__track { padding-bottom: 54%; } } @media screen and (max-width: 400px) { .vueperslides__slide { padding-bottom: 60%; } .vueperslides--fade .vueperslides__track { padding-bottom: 60%; } } ";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var VueperSlides = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "vueperslides-wrapper", class: { 'ready': _vm.isReady } }, [_vm.slideContentOutside ? _c('div', { staticClass: "vueperslides__slide-content vueperslides__slide-content--outside", class: _vm.slideContentOutsideClass }, [_vm.slidesCount && _vm.slides[_vm.currentSlide].title ? _c('p', { staticClass: "slide-title", domProps: { "innerHTML": _vm._s(_vm.slides[_vm.currentSlide].title) } }) : _vm._e(), _vm.slidesCount && _vm.slides[_vm.currentSlide].content ? _c('p', { staticClass: "slide-content", domProps: { "innerHTML": _vm._s(_vm.slides[_vm.currentSlide].content) } }) : _vm._e()]) : _vm._e(), _c('div', { ref: "vueperslides", staticClass: "vueperslides", class: { 'vueperslides--fade': _vm.fade, 'vueperslides--touchable': _vm.touchEnabled && !_vm.disable } }, [_c('div', { staticClass: "vueperslides__slides-wrapper" }, [_c('div', { ref: "track", staticClass: "vueperslides__track", class: { 'vueperslides__track--dragging': _vm.dragging, 'vueperslides__track--mousedown': _vm.mouseDown }, style: !_vm.fade ? 'transform: translate3d(' + _vm.currentTranslation + '%, 0, 0)' : 'padding-bottom: ' + this.slideRatio * 100 + '%' }, [_vm.slidesCount && _vm.clones[0] ? _c('vueper-slide', { staticClass: "vueperslides__slide--clone", style: _vm.clones[0].style, attrs: { "clone": 0, "title": _vm.clones[0].title, "content": _vm.clones[0].content, "image": _vm.clones[0].image } }) : _vm._e(), _vm._t("default", null, { currentSlide: _vm.currentSlide }), _vm.slidesCount && _vm.clones[1] ? _c('vueper-slide', { staticClass: "vueperslides__slide--clone", style: _vm.clones[1].style, attrs: { "clone": 1, "title": _vm.clones[1].title, "content": _vm.clones[1].content, "image": _vm.clones[1].image } }) : _vm._e()], 2)]), _vm.$slots.pausedIcon ? _c('div', { staticClass: "vueperslides__paused" }, [_vm._t("pausedIcon")], 2) : _vm._e(), _vm.arrows && _vm.slidesCount > 1 && !_vm.disable ? _c('div', { staticClass: "vueperslides__arrows" }, [_c('button', { directives: [{ name: "show", rawName: "v-show", value: !_vm.arrowPrevDisabled, expression: "!arrowPrevDisabled" }], staticClass: "vueperslides__arrow vueperslides__arrow--prev", on: { "click": function click($event) {
          _vm.onArrowClick(false);
        } } }, [_vm._t("arrowLeft", [_c('svg', { attrs: { "viewBox": "0 0 24 24" } }, [_c('path', { attrs: { "d": "M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z" } })])])], 2), _c('button', { directives: [{ name: "show", rawName: "v-show", value: !_vm.arrowNextDisabled, expression: "!arrowNextDisabled" }], staticClass: "vueperslides__arrow vueperslides__arrow--next", on: { "click": function click($event) {
          _vm.onArrowClick();
        } } }, [_vm._t("arrowRight", [_c('svg', { attrs: { "viewBox": "0 0 24 24" } }, [_c('path', { attrs: { "d": "M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z" } })])])], 2)]) : _vm._e(), _vm.bullets && _vm.slidesCount > 1 && !_vm.disable ? _c('div', { staticClass: "vueperslides__bullets", class: { 'vueperslides__bullets--outside': _vm.bulletsOutside } }, _vm._l(_vm.slides, function (item, i) {
      return _c('button', { key: i, ref: "bullet", refInFor: true, staticClass: "vueperslides__bullet", class: { 'vueperslides__bullet--active': _vm.currentSlide === i }, on: { "click": function click($event) {
            _vm.goToSlide(i);
          }, "keyup": [function ($event) {
            if (!('button' in $event) && _vm._k($event.keyCode, "left", 37, $event.key, ["Left", "ArrowLeft"])) {
              return null;
            }if ('button' in $event && $event.button !== 0) {
              return null;
            }_vm.onArrowClick(false);
          }, function ($event) {
            if (!('button' in $event) && _vm._k($event.keyCode, "right", 39, $event.key, ["Right", "ArrowRight"])) {
              return null;
            }if ('button' in $event && $event.button !== 2) {
              return null;
            }_vm.onArrowClick();
          }] } }, [_c('span', [_vm._v(_vm._s(i + 1))])]);
    })) : _vm._e()])]);
  }, staticRenderFns: [],
  name: 'vueper-slides',
  components: {
    VueperSlide: VueperSlide
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
  data: function data() {
    return {
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
    };
  },
  mounted: function mounted() {
    this.init();
  },

  methods: {
    init: function init() {
      this.emit('before-init', false);
      this.slidesCount = this.slides.length;
      this.touchEnabled = this.touchable;

      if (this.infinite && !this.fade) {
        this.cloneSlides();
      }

      this.goToSlide(this.initSlide - 1);
      this.bindEvents();

      this.isReady = true;
      this.emit('ready');
    },


    // Emit a named event outside the component with 2 possible parameters:
    // current slide info & next slide info.
    emit: function emit(name) {
      var includeCurrentSlide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var includeNextSlide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var args = [name];

      if (includeCurrentSlide || typeof includeNextSlide === 'number') {
        args[1] = {};
        if (includeCurrentSlide && this.activeSlideUid) {
          args[1].currentSlide = {
            index: this.currentSlide,
            title: this.slides[this.currentSlide].title,
            content: this.slides[this.currentSlide].content
          };
        }
        if (typeof includeNextSlide === 'number') {
          var _getSlideInRange = this.getSlideInRange(includeNextSlide),
              nextSlide = _getSlideInRange.nextSlide;

          args[1].nextSlide = {
            index: nextSlide,
            title: this.slides[nextSlide].title,
            content: this.slides[nextSlide].content
          };
        }
      }

      this.$emit.apply(this, [name].concat(args));
    },
    cloneSlides: function cloneSlides() {
      var firstNodeIsVnode = this.$slots.default[0].tag;
      var firstSlide = this.$slots.default[firstNodeIsVnode ? 0 : 1].elm;
      var lastSlide = this.$slots.default[this.$slots.default.length - 1].elm;

      this.clones[0] = {
        title: this.slides[this.slidesCount - 1].title,
        content: this.slides[this.slidesCount - 1].content,
        image: this.slides[this.slidesCount - 1].image,
        style: lastSlide && lastSlide.attributes.style ? lastSlide.attributes.style.value : null
      };
      this.clones[1] = {
        title: this.slides[0].title,
        content: this.slides[0].content,
        image: this.slides[0].image,
        style: firstSlide && lastSlide.attributes.style ? firstSlide.attributes.style.value : null
      };
    },
    bindEvents: function bindEvents() {
      var hasTouch = 'ontouchstart' in window;

      if (this.touchEnabled) {
        this.$refs.track.addEventListener(hasTouch ? 'touchstart' : 'mousedown', this.onMouseDown);
        document.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove);
        document.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp);
      }

      // Pause autoplay on mouseover.
      if (this.pauseOnHover && !hasTouch && this.autoplay) {
        this.$refs.vueperslides.addEventListener('mouseover', this.onMouseIn);
        this.$refs.vueperslides.addEventListener('mouseout', this.onMouseOut);
      }

      // window.addEventListener('resize', this.getSlideshowWidth)
    },
    getDragPercentage: function getDragPercentage(e) {
      this.dragStartX = 'ontouchstart' in window ? e.touches[0].clientX : e.clientX;

      // For full window width slideshow only.
      // let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      // return this.dragStartX / windowWidth

      var vueperslidesWrapper = this.$refs.vueperslides.offsetParent;
      return (this.dragStartX - vueperslidesWrapper.offsetLeft) / vueperslidesWrapper.clientWidth;
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
      if (!this.touchEnabled || this.disable) return;

      if (!e.touches) {
        e.preventDefault();
      }

      this.mouseDown = true;

      var dragPercentage = this.getDragPercentage(e);

      // Set a flag for use while dragging in `onMouseMove` to know if drag was toward left or right.
      this.goNext = dragPercentage >= 0.5;

      this.currentTranslation = -100 * (this.currentSlide + (this.goNext ? 1 : 0) + (this.clones.length ? 1 : 0) - dragPercentage);
    },
    onMouseMove: function onMouseMove(e) {
      if (this.mouseDown || this.dragging) {
        this.mouseDown = false;
        this.dragging = true;

        var dragPercentage = this.getDragPercentage(e);
        this.currentTranslation = -100 * (this.currentSlide + (this.goNext ? 1 : 0) + (this.clones.length ? 1 : 0) - dragPercentage);
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
        var slideOnDragEnd = -(Math.round(this.currentTranslation / 100) + (this.clones.length ? 1 : 0));

        var _getSlideInRange2 = this.getSlideInRange(slideOnDragEnd),
            nextSlide = _getSlideInRange2.nextSlide;

        // If drag is not allowed (`arrowNextDisabled` = true) and dragging beyond last slide,
        // cancel sliding and snap back to last slide.


        if (this.arrowNextDisabled && this.autoplay && nextSlide === 0) {
          nextSlide = this.slidesCount - 1;
        }

        // Only call `goToSlide` if the drag ends on a slide that is different than the currentSlide.
        if (nextSlide !== this.currentSlide) {
          this.goToSlide(slideOnDragEnd);
        } else {
          // Apply transition to snap back to current slide.
          this.currentTranslation = -(this.currentSlide + (this.clones.length ? 1 : 0)) * 100;
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
        _this.goToSlide(_this.currentSlide + 1, true, true);
      }, this.speed);
    },
    onArrowClick: function onArrowClick() {
      var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.goToSlide(this.currentSlide + (next ? 1 : -1));
    },
    getSlideInRange: function getSlideInRange(i) {
      var clone = null;

      // If infinite enabled, going out of range takes the first slide from the other end.
      if (this.clones.length) {
        if (i < 0) {
          i = this.slidesCount - 1;
          clone = 0;
        } else if (i > this.slidesCount - 1) {
          i = 0;
          clone = 1;
        }
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

      return { nextSlide: i, clone: clone };
    },
    goToSlide: function goToSlide(i) {
      var _this2 = this;

      var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var autoSliding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!this.slidesCount || this.disable) return;

      if (this.autoplay) this.clearTimer();

      var _getSlideInRange3 = this.getSlideInRange(i),
          nextSlide = _getSlideInRange3.nextSlide,
          nextSlideIsClone = _getSlideInRange3.clone;

      // First use of `goToSlide` is while init, so should not propagate an event.


      if (this.isReady) this.emit('before-slide', true, nextSlide);

      // Disable arrows if `disableArrowsOnEdges` is on and there is no slide to go to on that end.
      if (this.arrows && this.disableArrowsOnEdges) {
        this.arrowPrevDisabled = nextSlide === 0;
        this.arrowNextDisabled = nextSlide === this.slidesCount - 1;
      }

      this.$refs.track.classList[animation ? 'remove' : 'add']('vueperslides__track--no-animation');

      // Infinite sliding with cloned slides:
      // When reaching last slide and going next the cloned slide of the first slide
      // shows up, when the animation ends the real change to the first slide is done
      // immediately with no animation.
      // Same principle when going beyond first slide.
      if (nextSlideIsClone !== null) {
        setTimeout(function () {
          _this2.goToSlide(nextSlideIsClone ? 0 : _this2.slidesCount - 1, false, autoSliding);
        }, 400);
      }

      this.currentSlide = nextSlide;

      // Only apply sliding transition when the slideshow animation type is `slide`.
      if (!this.fade) {
        if (nextSlideIsClone !== null) {
          this.currentTranslation = -100 * (nextSlideIsClone ? this.slidesCount + 1 : 0);
        } else this.currentTranslation = -100 * (this.currentSlide + (this.clones.length ? 1 : 0));
      }

      this.activeSlideUid = this.slides[this.currentSlide]._uid;

      if (this.autoplay && !this.mouseOver) {
        this.setTimer();
      }

      if (this.slidesCount) {
        if (this.$slots.default[this.currentSlide]) {
          // First use of goToSlide is while init, so should not propagate an event.
          if (this.isReady) this.emit('slide');
        }

        if (this.isReady && !autoSliding && this.$refs.bullet[this.currentSlide]) {
          this.$refs.bullet[this.currentSlide].focus();
        }
      }
    },
    addSlide: function addSlide(newSlide) {
      var _this3 = this;

      var needReclone = this.infinite && !this.fade && this.isReady && !newSlide.clone;

      if (newSlide.clone !== null) {
        this.clones[newSlide.clone] = newSlide;
      } else {
        // Add the slide in the slides array & update slidesCount.
        this.slides.push(newSlide);
        this.slidesCount = this.slides.length;
      }

      if (this.slidesCount > 1) {
        this.touchEnabled = true;
      }

      if (needReclone) {
        this.$nextTick(function () {
          return _this3.cloneSlides();
        });
      }
    },
    removeSlide: function removeSlide(uid) {
      var _this4 = this;

      // let needReclone = this.infinite && !this.fade && this.isReady
      var needReclone = false;

      this.slides.some(function (slide, i) {
        if (slide._uid === uid) {
          // Remove the slide.
          _this4.slides.splice(i, 1);
          _this4.slidesCount = _this4.slides.length;

          // If the slide to remove is the current slide, slide to the previous slide.
          if (uid === _this4.activeSlideUid) {
            _this4.activeSlideUid = null;
            _this4.goToSlide(i - 1, true, true);
          }

          if (_this4.slidesCount <= 1) {
            _this4.touchEnabled = false;
          }

          if (_this4.clones.length && _this4.isReady && !slide.clone) needReclone = true;

          return true; // Break the `Array.some` loop.
        }
      });

      if (this.slidesCount && needReclone) {
        this.cloneSlides();
      }
    }
  }
};

// Expose component to global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('vueper-slides', VueperSlides);
  window.Vue.component('vueper-slide', VueperSlide);
}

exports.VueperSlides = VueperSlides;
exports.VueperSlide = VueperSlide;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vueperslides.js.map
