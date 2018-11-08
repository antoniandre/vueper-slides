(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VueperSlides = {})));
}(this, (function (exports) { 'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
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
      // vueperslide component has this useful attributes:
      // _uid, image, title, titleSlot, content, contentSlot, clone.
      this.$parent.addSlide(this);
    },

    // When removing a slide programmatically, remove it from the config so vueperslides
    // component is aware of the change.
    destroyed: function destroyed() {
      if (this.clone === null) this.$parent.removeSlide(this._uid);
    },

    computed: {
      wrapperStyles: function wrapperStyles() {
        return _extends({}, !this.$parent.conf.slideImageInside && this.image && { backgroundImage: 'url(' + this.image + ')' }, this.$parent.conf.visibleSlides && { width: 100 / this.$parent.conf.visibleSlides + '%' });
      },
      imageStyles: function imageStyles() {
        return _extends({}, this.$parent.conf.slideImageInside && this.image && { backgroundImage: 'url(' + this.image + ')' });
      },
      hasTitleSlotData: function hasTitleSlotData() {
        var slideTitle = this.$slots.slideTitle;

        return slideTitle !== undefined;
      },
      hasContentSlotData: function hasContentSlotData() {
        var slideContent = this.$slots.slideContent;

        return slideContent !== undefined;
      }
    }
  };

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", {
      class: {
        vueperslide: true,
        "vueperslide--active": _vm.$parent.slides.activeUid === _vm._uid
      },
      style: _vm.wrapperStyles,
      attrs: {
        "aria-hidden": _vm.$parent.slides.activeUid === _vm._uid ? "false" : "true"
      }
    }, [_vm.image && _vm.$parent.conf.slideImageInside ? _c("div", {
      staticClass: "vueperslide__image",
      style: _vm.imageStyles
    }) : _vm._e(), _c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.$parent.conf.slideContentOutside && (_vm.title || _vm.hasTitleSlotData || _vm.content || _vm.hasContentSlotData),
        expression: "!$parent.conf.slideContentOutside && (title || hasTitleSlotData || content || hasContentSlotData)"
      }],
      staticClass: "vueperslide__content-wrapper"
    }, [_c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.title || _vm.hasTitleSlotData,
        expression: "title || hasTitleSlotData"
      }],
      staticClass: "vueperslide__title"
    }, [_c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.$parent.conf.slideContentOutside && !_vm.title,
        expression: "!$parent.conf.slideContentOutside && !title"
      }]
    }, [_vm._t("slideTitle")], 2), _vm.title ? _c("div", { domProps: { innerHTML: _vm._s(_vm.title) } }) : _vm._e()]), _vm.content || _vm.hasContentSlotData ? _c("div", { staticClass: "vueperslide__content" }, [_c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.$parent.conf.slideContentOutside && !_vm.content,
        expression: "!$parent.conf.slideContentOutside && !content"
      }]
    }, [_vm._t("slideContent")], 2), _vm.content ? _c("div", { domProps: { innerHTML: _vm._s(_vm.content) } }) : _vm._e()]) : _vm._e()])]);
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-37ed1eb1_0", { source: "\n.vueperslide {\n  white-space: normal;\n  background-size: cover;\n  display: inline-block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.vueperslide__image {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-size: cover;\n}\n.vueperslide__content-wrapper:not(.vueperslide__content-wrapper--outside-top):not(.vueperslide__content-wrapper--outside-bottom) {\n    position: absolute;\n}\n.vueperslides--fade .vueperslide {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: 0;\n  transition: .8s ease-in-out opacity;\n}\n.vueperslides--fade .vueperslide--active {\n    z-index: 1;\n    opacity: 1;\n}\n\n/*# sourceMappingURL=VueperSlide.vue.map */", map: { "version": 3, "sources": ["/Users/anto/Programming/localhost/vueper-slides/src/components/VueperSlide.vue", "VueperSlide.vue"], "names": [], "mappings": ";AAmEA;EACA,oBAAA;EACA,uBAAA;EACA,sBAAA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;CAcA;AAZA;IACA,mBAAA;IACA,OAAA;IACA,QAAA;IACA,SAAA;IACA,UAAA;IACA,uBAAA;CACA;AAEA;IACA,mBAAA;CACA;AAGA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;EACA,oCAAA;CAMA;AAbA;IAUA,WAAA;IACA,WAAA;CACA;;ACxEA,2CAA2C", "file": "VueperSlide.vue", "sourcesContent": [null, ".vueperslide {\n  white-space: normal;\n  background-size: cover;\n  display: inline-block;\n  position: relative;\n  width: 100%;\n  height: 100%; }\n  .vueperslide__image {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-size: cover; }\n  .vueperslide__content-wrapper:not(.vueperslide__content-wrapper--outside-top):not(.vueperslide__content-wrapper--outside-bottom) {\n    position: absolute; }\n\n.vueperslides--fade .vueperslide {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: 0;\n  transition: .8s ease-in-out opacity; }\n  .vueperslides--fade .vueperslide--active {\n    z-index: 1;\n    opacity: 1; }\n\n/*# sourceMappingURL=VueperSlide.vue.map */"] }, media: undefined });
  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/anto/Programming/localhost/vueper-slides/src/components/VueperSlide.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      var hook = void 0;
      if (style) {
        hook = function hook(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component;
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */

  var VueperSlide = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

  var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  var script$1 = {
    name: 'vueper-slides',
    components: { VueperSlide: VueperSlide },
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
        default: function _default() {
          return {};
        }
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
      }
    },
    data: function data() {
      return {
        isReady: false,
        container: null,
        slides: {
          list: [],
          count: 0,
          activeUid: null,
          current: 0,
          focus: 0, // Don't loose the focused slide when changing breakpoint & slideMultiple > 1.
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
      };
    },
    mounted: function mounted() {
      this.init();
    },

    methods: {
      init: function init() {
        var _this = this;

        this.emit('before-init', false);
        this.container = this.$refs.vueperslides;
        this.touch.enabled = this.conf.touchable;
        // Store speed in extra variable because transition.speed can be set to 0,
        // then after slide change we need to reapply original speed.
        this.transition.speed = this.conf.transitionSpeed;

        if (Object.keys(this.breakpoints).length) {
          this.setBreakpointsList();
          this.setBreakpointConfig(this.getCurrentBreakpoint());
        }

        if (this.conf.infinite) {
          this.cloneSlides();
          this.$nextTick(function () {
            return _this.cloneSlides();
          });
        }

        this.goToSlide(this.conf.initSlide - 1);
        this.bindEvents();

        this.isReady = true;
        this.emit('ready');
      },


      // Emit a named event outside the component with 2 possible parameters:
      // current slide info & next slide info.
      emit: function emit(name) {
        var includeCurrentSlide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var includeNextSlide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        // Emit param 0 = event name string.
        var args = [name];

        if (includeCurrentSlide || typeof includeNextSlide === 'number') {
          // Emit param 1 is object like { currentSlide: ...[, nextSlide: ...] }.
          args[1] = {};

          if (includeCurrentSlide && this.slides.activeUid) {
            args[1].currentSlide = this.getSlideData(this.slides.current);
          }

          if (typeof includeNextSlide === 'number') {
            var _getSlideInRange = this.getSlideInRange(includeNextSlide),
                nextSlideIndex = _getSlideInRange.nextSlide;

            args[1].nextSlide = this.getSlideData(nextSlideIndex);
          }
        }

        this.$emit.apply(this, [name].concat(args));
      },
      getSlideData: function getSlideData(index) {
        var withStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var slide = this.slides.list[index];
        var _slide$$slots = slide.$slots,
            _slide$$slots$slideTi = _slide$$slots.slideTitle,
            slideTitle = _slide$$slots$slideTi === undefined ? [{}] : _slide$$slots$slideTi,
            _slide$$slots$slideCo = _slide$$slots.slideContent,
            slideContent = _slide$$slots$slideCo === undefined ? [{}] : _slide$$slots$slideCo;
        var _slideTitle$0$elm = slideTitle[0].elm,
            elmT = _slideTitle$0$elm === undefined ? {} : _slideTitle$0$elm;
        var _slideContent$0$elm = slideContent[0].elm,
            elmC = _slideContent$0$elm === undefined ? {} : _slideContent$0$elm;


        var data = {
          index: index,
          title: slide.title,
          titleSlot: elmT && elmT.innerHTML || null,
          content: slide.content,
          contentSlot: elmC && elmC.innerHTML || null,
          image: slide.image
        };

        if (withStyle) {
          var _slide$$el$attributes = slide.$el.attributes;
          _slide$$el$attributes = _slide$$el$attributes === undefined ? {} : _slide$$el$attributes;
          var _slide$$el$attributes2 = _slide$$el$attributes.style;
          _slide$$el$attributes2 = _slide$$el$attributes2 === undefined ? {} : _slide$$el$attributes2;
          var _slide$$el$attributes3 = _slide$$el$attributes2.value,
              value = _slide$$el$attributes3 === undefined ? '' : _slide$$el$attributes3;

          data.style = value;
        }

        return data;
      },
      getCurrentSlideData: function getCurrentSlideData(what) {
        var _getSlideData = this.getSlideData(this.slides.current),
            titleSlot = _getSlideData.titleSlot,
            title = _getSlideData.title,
            contentSlot = _getSlideData.contentSlot,
            content = _getSlideData.content;
        // If both slot and attribute are provided use the attribute source.


        return what === 'title' ? title || titleSlot : content || contentSlot;
      },
      setBreakpointsList: function setBreakpointsList() {
        this.breakpointsData.list = [99999].concat(_toConsumableArray(Object.keys(this.breakpoints))).map(function (bp) {
          return parseInt(bp);
        }).sort(function (a, b) {
          return parseInt(b) - parseInt(a);
        });
      },
      getCurrentBreakpoint: function getCurrentBreakpoint() {
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var breakpoints = [windowWidth].concat(_toConsumableArray(this.breakpointsData.list)).sort(function (a, b) {
          return parseInt(b) - parseInt(a);
        });
        return this.breakpointsData.list[breakpoints.indexOf(windowWidth) - 1];
      },
      hasBreakpointChanged: function hasBreakpointChanged(breakpoint) {
        return this.breakpointsData.current !== parseInt(breakpoint);
      },
      setBreakpointConfig: function setBreakpointConfig(breakpoint) {
        var bp = this.breakpoints && this.breakpoints[breakpoint] || {};
        var slideMultipleChanged = bp.slideMultiple !== this.conf.slideMultiple;

        // this.conf gets updated by itself when this.breakpointsData.current changes.
        this.breakpointsData.current = breakpoint;

        if (slideMultipleChanged) {
          this.slides.current = this.slides.focus;
          this.goToSlide(this.slides.current);
        }
      },
      cloneSlides: function cloneSlides() {
        this.clones[0] = this.getSlideData(this.slides.count - 1, true);
        this.clones[1] = this.getSlideData(0, true);
      },
      bindEvents: function bindEvents() {
        var hasTouch = 'ontouchstart' in window;

        // Touch enabled slideshow.
        if (this.touch.enabled) {
          this.$refs.track.addEventListener(hasTouch ? 'touchstart' : 'mousedown', this.onMouseDown);
          document.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove);
          document.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp);
        }

        // Pause autoplay on mouseover.
        if (this.conf.pauseOnHover && !hasTouch && this.conf.autoplay) {
          this.container.addEventListener('mouseover', this.onMouseIn);
          this.container.addEventListener('mouseout', this.onMouseOut);
        }

        // Breakpoints or parallax need a resize event.
        if (this.breakpointsData.list.length || this.conf.parallax) {
          window.addEventListener('resize', this.onResize);
        }

        // Parallax slideshow.
        if (this.conf.parallax) {
          // First render the onload translation.
          this.refreshParallax();

          // then add event listener.
          document.addEventListener('scroll', this.onScroll);
        }
      },


      // Recursively sum all the offsetTop values from current element up the tree until body.
      // By doing so a padding or margin on a parent won't cause a wrong calculation.
      getSlideshowOffsetTop: function getSlideshowOffsetTop() {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (this.parallaxData.slideshowOffsetTop === null || force) {
          var el = this.container;
          var top = el.offsetTop;

          while (el = el.offsetParent) {
            top += el.offsetTop;
          }

          this.parallaxData.slideshowOffsetTop = top;
        }

        return this.parallaxData.slideshowOffsetTop;
      },
      onScroll: function onScroll() {
        var doc = document.documentElement;
        var scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        var windowHeight = window.innerHeight || doc.clientHeight || document.body.clientHeight;
        var slideshowHeight = this.container.clientHeight;
        var slideshowTopOffset = this.getSlideshowOffsetTop();

        // The distance between the bottom line of the current vueperslides slideshow and top of window.
        // Negative value means the slideshow is totally above the current window box.
        var vsBottom2WinTop = slideshowTopOffset + slideshowHeight - scrollTop;
        // The distance between the top line of the current vueperslides slideshow and bottom of window.
        // Negative value means the slideshow is totally bellow the current window box.
        var vsTop2winBottom = windowHeight + scrollTop - slideshowTopOffset;

        this.parallaxData.isVisible = vsBottom2WinTop > 0 && vsTop2winBottom > 0;

        // Only apply translation when slideshow is visible.
        if (this.parallaxData.isVisible) {
          var heightToCoverWithTranslation = windowHeight + slideshowHeight;
          var percentage = vsBottom2WinTop * 100 / heightToCoverWithTranslation;
          var translatePercentage = this.conf.parallax === -1 ? 100 - percentage : percentage;
          this.parallaxData.translation = -translatePercentage / 2;
        }
      },
      onResize: function onResize() {
        if (this.breakpointsData.list.length) {
          var breakpoint = this.getCurrentBreakpoint();
          if (this.hasBreakpointChanged(breakpoint)) {
            this.setBreakpointConfig(breakpoint);
          }
        }

        if (this.conf.parallax) {
          // Only refresh parallaxData.slideshowOffsetTop value on resize for better performance.
          this.getSlideshowOffsetTop(true);
        }
      },
      onMouseIn: function onMouseIn() {
        this.mouseOver = true;

        if (this.conf.pauseOnHover && this.conf.autoplay) {
          this.clearTimer();
        }
      },
      onMouseOut: function onMouseOut() {
        this.mouseOver = false;

        if (this.conf.pauseOnHover && this.conf.autoplay) {
          this.setTimer();
        }
      },
      onMouseDown: function onMouseDown(e) {
        if (!this.touch.enabled || this.disable) return;
        if (!e.touches) e.preventDefault();

        // The clones are created with a copy of content. Refresh this content before dragging.
        if (this.conf.infinite) this.cloneSlides();
        // this.disableScroll()

        this.mouseDown = true;

        // Store drag start in var for distance calculation in onMouseUp().
        this.touch.dragStartX = this.getCurrentMouseX(e);

        if (!this.conf.draggingDistance) {
          this.updateCurrentTranslation(null, this.touch.dragStartX);
        }
      },
      onMouseMove: function onMouseMove(e) {
        if (this.mouseDown || this.touch.dragging) {
          this.mouseDown = false;
          this.touch.dragging = true;

          // The clones are created with a copy of content.
          // Set refreshClonesOnDrag to true if you want to keep updating clones before you see them.
          if (this.conf.refreshClonesOnDrag && this.conf.infinite) {
            this.cloneSlides();
          }

          // Store current drag position in var for distance calculation in onMouseUp().
          this.touch.dragNowX = this.getCurrentMouseX(e);

          if (this.conf.draggingDistance) {
            this.touch.dragAmount = this.touch.dragNowX - this.touch.dragStartX;
            var dragAmountPercentage = this.touch.dragAmount / this.container.clientWidth;

            this.updateCurrentTranslation();
            this.transition.currentTranslation += 100 * dragAmountPercentage;
          } else {
            this.updateCurrentTranslation(null, this.touch.dragNowX);
          }
        }
      },
      onMouseUp: function onMouseUp(e) {
        var _this2 = this;

        this.mouseDown = false;

        // If no mouse move there is nothing to do so don't go further.
        if (!this.touch.dragging) return this.cancelSlideChange();

        this.touch.dragging = false;
        var dragAmount = this.conf.draggingDistance ? -this.touch.dragAmount : 0;
        var realCurrentSlideIndex = this.slides.current + !!this.clones.length * 1; // Takes clones in account if any.
        var dragPercentageStart = (this.touch.dragStartX - this.container.offsetLeft) / this.container.clientWidth;
        var dragPercentageNow = (this.touch.dragNowX - this.container.offsetLeft) / this.container.clientWidth;
        var dragPercentage = ((dragPercentageStart < 0.5 ? 0 : 1) - dragPercentageNow) * 100;
        var forwards = (dragAmount || dragPercentage) > 0;

        var reasonsToCancelSliding = [
        // Dragging distance conf is set & drag amount is lesser than dragging distance conf.
        Math.abs(dragAmount) < this.conf.draggingDistance,

        // Dragging distance conf is not set & dragging is lesser than 50%.
        !this.conf.draggingDistance && Math.abs(dragPercentage) < 50,

        // arrowNext is disabled and dragging beyond last slide.
        this.arrowPrevDisabled && !this.slides.current && !forwards,

        // arrowPrev is disabled and dragging beyond first slide.
        this.arrowNextDisabled && this.slides.current === this.slides.count - 1 && forwards];

        // If no reason to cancel sliding.
        if (reasonsToCancelSliding.indexOf(true) === -1) {
          var targetSlide = this.slides.current + this.conf.slideMultiple * (forwards ? 1 : -1);
          this.goToSlide(targetSlide);
        } else this.cancelSlideChange();

        this.touch.dragStartX = null;
        this.touch.dragNowX = null;
        this.touch.dragAmount = null;
        // this.enableScroll()

        // Can be called from a click event.
        // As click event triggers after mouseup, we need a persistent variable until
        // click event triggers.
        this.touch.justDragged = true;
        setTimeout(function () {
          return _this2.touch.justDragged = false;
        }, 50);
      },


      // Check if dragging just happened.
      justDragged: function justDragged() {
        return this.touch.justDragged;
      },


      // Dragging did not pass conditions to change slide, snap back to current slide.
      cancelSlideChange: function cancelSlideChange() {
        if (!this.conf.fade) {
          this.updateCurrentTranslation();
        }
      },
      getCurrentMouseX: function getCurrentMouseX(e) {
        return 'ontouchstart' in window ? e.touches[0].clientX : e.clientX;
      },


      /**
       * The translation of most cases, in other cases this can still be used as a base calc.
       */
      getBasicTranslation: function getBasicTranslation() {
        var translation = this.slides.current / this.conf.visibleSlides;

        if (this.conf.infinite) translation += 1 / this.conf.visibleSlides; // A clone is prepended to the slides track.

        return translation;
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
      updateCurrentTranslation: function updateCurrentTranslation() {
        var nextSlideIsClone = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var currentMouseX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var translation = this.getBasicTranslation();

        if (this.conf.infinite && nextSlideIsClone !== null) {
          translation = (nextSlideIsClone ? this.slides.count + 1 : 0) / this.conf.visibleSlides;
        }

        // If dragging.
        if (this.touch.dragStartX && currentMouseX) {
          var dragPercentage = 0;
          var dragPercentageStart = (this.touch.dragStartX - this.container.offsetLeft) / this.container.clientWidth;
          var dragPercentageNow = (currentMouseX - this.container.offsetLeft) / this.container.clientWidth;

          dragPercentage = (dragPercentageStart < 0.5 ? 0 : 1) - dragPercentageNow;

          translation += dragPercentage;
        }

        // Special behavior if multiple visible slides and sliding 1 by 1:
        // The translation is modified as user slides just to look nicer.
        if (this.conf.visibleSlides > 1 && this.conf.slideMultiple === 1) {
          // If not inifinite sliding.
          if (!this.conf.infinite) {
            var preferredPosition = Math.ceil(this.conf.visibleSlides / 2);
            var remainingSlides = this.slides.count - (this.slides.current + 1);
            var positionsAfterPreferred = this.conf.visibleSlides - preferredPosition;
            var preferredPositionIsPassed = remainingSlides < positionsAfterPreferred;

            var slidesWOTranslation = preferredPosition - 1;
            var substractFromTranslation = Math.min(slidesWOTranslation, this.slides.current);

            // From next position after the preferred position.
            if (preferredPositionIsPassed) {
              substractFromTranslation += positionsAfterPreferred - remainingSlides;
            }

            translation -= substractFromTranslation / this.conf.visibleSlides;
          }
        }

        this.transition.currentTranslation = -translation * 100;
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
        var _this3 = this;

        this.timer = setTimeout(function () {
          _this3.goToSlide(_this3.slides.current + _this3.conf.slideMultiple, { autoPlaying: true });
        }, this.conf.speed);
      },
      previous: function previous() {
        this.goToSlide(this.slides.current - this.conf.slideMultiple);
      },
      next: function next() {
        this.goToSlide(this.slides.current + this.conf.slideMultiple);
      },
      refreshParallax: function refreshParallax() {
        var _this4 = this;

        setTimeout(function () {
          _this4.onResize();
          _this4.onScroll();
        }, 100);
      },


      /**
       * When visibleSlides > 1 and slideMultiple > 1, get the first visible slide from given index.
       *
       * @return {integer} the first visible slide index
       */
      getFirstVisibleSlide: function getFirstVisibleSlide(index) {
        return Math.floor(index / this.conf.slideMultiple) * this.conf.slideMultiple;
      },
      getSlideInRange: function getSlideInRange(index, autoPlaying) {
        var clone = null;

        // If infinite enabled, going out of range takes the first slide from the other end.
        if (this.conf.infinite && index === -1) clone = 0;else if (this.conf.infinite && index === this.slides.count) clone = 1;

        // Generic case:
        // If going beyond slides count, take the modulo as next slide index.
        // E.g. If we want to access slide 9 and there are only 6 slides, go to slide 3.
        // (index + this.slides.count) to also handle negative index.
        var newIndex = (index + this.slides.count) % this.slides.count;

        if (this.conf.slideMultiple > 1) {
          var lastSlideItems = this.slides.count % this.conf.slideMultiple || this.conf.slideMultiple;
          var missingItems = this.conf.slideMultiple - lastSlideItems;

          newIndex += index < 0 ? missingItems : 0;
          newIndex = this.getFirstVisibleSlide(newIndex);

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
            this.slides.focus = newIndex;
          }
        }

        // Disable sliding if already on edge with disableArrowsOnEdges.
        if (this.conf.disableArrowsOnEdges && (index < 0 || index > this.slides.count - 1) && !autoPlaying) {
          newIndex = this.slides.current;
        }

        return { nextSlide: newIndex, clone: clone };
      },
      goToSlide: function goToSlide(index) {
        var _this5 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!this.slides.count || this.disable) return;

        if (this.conf.autoplay) this.clearTimer();

        // animation = slide transition is animated.
        // autoPlaying = go to the next slide by autoplay - no user intervention.
        // jumping = after reaching a clone, the callback jumps back to original slide with no animation.
        var _options$animation = options.animation,
            animation = _options$animation === undefined ? true : _options$animation,
            _options$autoPlaying = options.autoPlaying,
            autoPlaying = _options$autoPlaying === undefined ? false : _options$autoPlaying,
            _options$jumping = options.jumping,
            jumping = _options$jumping === undefined ? false : _options$jumping;


        this.transition.animated = animation;
        setTimeout(function () {
          return _this5.transition.animated = false;
        }, this.transitionSpeed);

        // Get the next slide index and whether it's a clone.

        var _getSlideInRange2 = this.getSlideInRange(index, autoPlaying),
            nextSlide = _getSlideInRange2.nextSlide,
            nextSlideIsClone = _getSlideInRange2.clone;

        // Emit event. First use of `goToSlide` is while init, so should not propagate an event.


        if (this.isReady && !jumping) {
          this.emit('before-slide', true, nextSlide);

          // Refresh clones.
          if (nextSlideIsClone !== null) this.cloneSlides();
        }

        // Disable arrows if `disableArrowsOnEdges` is on and there is no slide to go to on that end.
        if (this.conf.arrows && this.conf.disableArrowsOnEdges) {
          this.arrowPrevDisabled = nextSlide === 0 || nextSlide - this.conf.slideMultiple < 0;
          this.arrowNextDisabled = nextSlide === this.slides.count - 1 || nextSlide + this.conf.slideMultiple > this.slides.count - 1;
        }

        // Infinite sliding with cloned slides:
        // When reaching last slide and going next the cloned slide of the first slide
        // shows up, when the animation ends the real change to the first slide is done
        // immediately with no animation.
        // Same principle when going beyond first slide.
        if (nextSlideIsClone !== null) {
          // Gives clone id (0 or 1 or null).
          setTimeout(function () {
            // inside the callback, also check if it is not too late to apply next slide
            // (user may have slid fast multiple times) if so cancel callback.
            var passedCloneBackward = index === -1 && _this5.slides.current !== _this5.slides.count - 1;
            var passedCloneForward = index === _this5.slides.count && _this5.slides.current !== 0;
            var tooLateToSetTimeout = passedCloneBackward || passedCloneForward;

            if (!tooLateToSetTimeout) {
              _this5.transition.speed = 0;
              _this5.goToSlide(nextSlideIsClone ? 0 : _this5.slides.count - 1, { animation: false, jumping: true });
              setTimeout(function () {
                return _this5.transition.speed = _this5.conf.transitionSpeed;
              }, 50);
            }
          }, this.transition.speed - 50);
        }

        this.slides.current = nextSlide;

        // Only apply sliding transition when the slideshow animation type is `slide`.
        if (!this.conf.fade) {
          this.updateCurrentTranslation(nextSlideIsClone);
        }

        this.slides.activeUid = this.slides.list[this.slides.current]._uid;

        if (this.conf.autoplay && !this.mouseOver) {
          this.setTimer();
        }

        if (this.slides.count) {
          if (this.$slots.default[this.slides.current]) {
            // First use of goToSlide is while init, so should not propagate an event.
            if (this.isReady && !jumping) this.emit('slide');
          }

          if (this.isReady && this.conf.bullets && !autoPlaying && !jumping && this.$refs.bullet && this.$refs.bullet[this.slides.current]) {
            this.$refs.bullet[this.slides.current].focus();
          }
        }
      },
      addSlide: function addSlide(newSlide) {
        var _this6 = this;

        var needReclone = this.conf.infinite && this.isReady && newSlide.clone === null;

        if (newSlide.clone !== null) {
          this.clones[newSlide.clone] = newSlide;
        } else {
          // Add the slide in the slides array & update slides.count.
          this.slides.list.push(newSlide);
          this.slides.count = this.slides.list.length;
        }

        if (this.slides.count > 1 && this.touchable) {
          this.touch.enabled = true;
        }

        // cloneSlides() is called at the end of init so calling it before would be redundant.
        if (needReclone) {
          this.$nextTick(function () {
            return _this6.cloneSlides();
          });
        }
      },
      removeSlide: function removeSlide(uid) {
        var _this7 = this;

        var needReclone = false;

        this.slides.list.some(function (slide, i) {
          if (slide._uid === uid) {
            // Remove the slide.
            _this7.slides.list.splice(i, 1);
            _this7.slides.count = _this7.slides.list.length;

            // If the slide to remove is the current slide, slide to the previous slide.
            if (uid === _this7.slides.activeUid) {
              _this7.slides.activeUid = null;
              _this7.goToSlide(i - 1, { autoPlaying: true });
            }

            if (_this7.slides.count <= 1) {
              _this7.touch.enabled = false;
            }

            if (_this7.clones.length && _this7.isReady && !slide.clone) needReclone = true;

            return true; // Break the `Array.some` loop.
          }
        });

        if (this.slides.count && needReclone) {
          this.cloneSlides();
        }
      }
    },

    computed: {
      // this.conf needs to be reactive so user can change a Vueper Slides option and everything gets updated.
      conf: function conf() {
        // Read config from the props then check if breakpoints are defined.
        // If so override the config with the breakpoint ones.
        var conf = _extends$1({}, this.$props, this.$props.breakpoints && this.$props.breakpoints[this.breakpointsData.current] || {});

        // Overrides: once config from breakpoints is imported, we can use the conf object
        // and be sure all the options are up to date.
        //-------------------------------//
        conf.slideMultiple = conf.slideMultiple ? conf.visibleSlides : 1;

        if (conf.fade || conf.disableArrowsOnEdges || conf.visibleSlides > 1) {
          conf.infinite = false;
        }

        conf.arrowsOutside = conf.arrowsOutside || conf.visibleSlides > 1 && conf.arrowsOutside === null;
        conf.bulletsOutside = conf.bulletsOutside || conf.visibleSlides > 1 && conf.bulletsOutside === null;
        //-------------------------------//

        return conf;
      },
      vueperStyles: function vueperStyles() {
        return (/^-?\d/.test(this.conf.fixedHeight) ? 'height: ' + this.conf.fixedHeight : null
        );
      },
      trackStyles: function trackStyles() {
        var styles = {};

        if (this.conf.parallax) {
          styles.transform = 'translate3d(0, ' + this.parallaxData.translation + '%, 0)';

          // Increase browser optimizations by allocating more machine resource.
          // ! \\ To be used wisely so deactivate when not needed.
          styles.willChange = this.parallaxData.isVisible ? 'transform' : 'auto';
        }

        return styles;
      },
      trackInnerStyles: function trackInnerStyles() {
        var styles = {};

        styles.transitionDuration = this.transition.speed + 'ms';

        if (!this.conf.fade) {
          styles.transform = 'translate3d(' + this.transition.currentTranslation + '%, 0, 0)';

          // Increase browser optimizations by allocating more machine resource.
          // ! \\ To be used wisely so deactivate when not needed.
          styles.willChange = this.touch.dragging || this.transition.animated ? 'transform' : 'auto';
        }

        return styles;
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", {
      ref: "vueperslides",
      staticClass: "vueperslides",
      class: {
        "vueperslides--ready": _vm.isReady,
        "vueperslides--fade": _vm.conf.fade,
        "vueperslides--parallax": _vm.conf.parallax,
        "vueperslides--touchable": _vm.touch.enabled && !_vm.disable,
        "vueperslides--fixed-height": _vm.conf.fixedHeight,
        "vueperslides--animated": _vm.transition.animated
      },
      style: _vm.vueperStyles,
      attrs: { "aria-label": "Slideshow" }
    }, [_vm.conf.slideContentOutside === "top" ? _c("div", {
      staticClass: "vueperslide__content-wrapper vueperslide__content-wrapper--outside-top",
      class: _vm.conf.slideContentOutsideClass
    }, [_vm.slides.count ? _c("div", {
      staticClass: "vueperslide__title",
      domProps: {
        innerHTML: _vm._s(_vm.getCurrentSlideData("title"))
      }
    }) : _vm._e(), _vm.slides.count ? _c("div", {
      staticClass: "vueperslide__content",
      domProps: {
        innerHTML: _vm._s(_vm.getCurrentSlideData("content"))
      }
    }) : _vm._e()]) : _vm._e(), _c("div", { staticClass: "vueperslides__inner" }, [_c("div", {
      staticClass: "vueperslides__parallax-wrapper",
      style: "padding-bottom:" + _vm.conf.slideRatio * 100 + "%",
      attrs: { "aria-live": "polite" }
    }, [_c("div", {
      ref: "track",
      staticClass: "vueperslides__track",
      class: {
        "vueperslides__track--dragging": _vm.touch.dragging,
        "vueperslides__track--mousedown": _vm.mouseDown
      },
      style: _vm.trackStyles
    }, [_c("div", {
      staticClass: "vueperslides__track-inner",
      style: _vm.trackInnerStyles
    }, [_vm.slides.count && _vm.clones[0] ? _c("vueper-slide", {
      staticClass: "vueperslide--clone",
      style: _vm.clones[0].style,
      attrs: {
        clone: 0,
        title: _vm.clones[0].title,
        content: _vm.clones[0].content,
        image: _vm.clones[0].image,
        "aria-hidden": "true"
      }
    }, [_vm.clones[0].titleSlot ? _c("div", {
      attrs: { slot: "slideTitle" },
      domProps: {
        innerHTML: _vm._s(_vm.clones[0].titleSlot)
      },
      slot: "slideTitle"
    }) : _vm._e(), _vm.clones[0].contentSlot ? _c("div", {
      attrs: { slot: "slideContent" },
      domProps: {
        innerHTML: _vm._s(_vm.clones[0].contentSlot)
      },
      slot: "slideContent"
    }) : _vm._e()]) : _vm._e(), _vm._t("default", null, {
      currentSlide: _vm.slides.current
    }), _vm.slides.count && _vm.clones[1] ? _c("vueper-slide", {
      staticClass: "vueperslide--clone",
      style: _vm.clones[1].style,
      attrs: {
        clone: 1,
        title: _vm.clones[1].title,
        content: _vm.clones[1].content,
        image: _vm.clones[1].image,
        "aria-hidden": "true"
      }
    }, [_vm.clones[1].titleSlot ? _c("div", {
      attrs: { slot: "slideTitle" },
      domProps: {
        innerHTML: _vm._s(_vm.clones[1].titleSlot)
      },
      slot: "slideTitle"
    }) : _vm._e(), _vm.clones[1].contentSlot ? _c("div", {
      attrs: { slot: "slideContent" },
      domProps: {
        innerHTML: _vm._s(_vm.clones[1].contentSlot)
      },
      slot: "slideContent"
    }) : _vm._e()]) : _vm._e()], 2)])]), _vm.$slots.pausedIcon ? _c("div", { staticClass: "vueperslides__paused" }, [_vm._t("pausedIcon")], 2) : _vm._e(), _vm.conf.arrows && _vm.slides.count > 1 && !_vm.disable ? _c("div", {
      staticClass: "vueperslides__arrows",
      class: {
        "vueperslides__arrows--outside": _vm.conf.arrowsOutside
      }
    }, [_c("button", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.arrowPrevDisabled,
        expression: "!arrowPrevDisabled"
      }],
      staticClass: "vueperslides__arrow vueperslides__arrow--prev",
      attrs: { "aria-label": "Previous" },
      on: {
        click: function click($event) {
          _vm.previous();
        },
        keyup: [function ($event) {
          if (!("button" in $event) && _vm._k($event.keyCode, "left", 37, $event.key, ["Left", "ArrowLeft"])) {
            return null;
          }
          if ("button" in $event && $event.button !== 0) {
            return null;
          }
          _vm.previous();
        }, function ($event) {
          if (!("button" in $event) && _vm._k($event.keyCode, "right", 39, $event.key, ["Right", "ArrowRight"])) {
            return null;
          }
          if ("button" in $event && $event.button !== 2) {
            return null;
          }
          _vm.next();
        }]
      }
    }, [_vm._t("arrowLeft", [_c("svg", { attrs: { viewBox: "0 0 24 24" } }, [_c("path", {
      attrs: {
        d: "M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z"
      }
    })])])], 2), _c("button", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.arrowNextDisabled,
        expression: "!arrowNextDisabled"
      }],
      staticClass: "vueperslides__arrow vueperslides__arrow--next",
      attrs: { "aria-label": "Next" },
      on: {
        click: function click($event) {
          _vm.next();
        },
        keyup: [function ($event) {
          if (!("button" in $event) && _vm._k($event.keyCode, "left", 37, $event.key, ["Left", "ArrowLeft"])) {
            return null;
          }
          if ("button" in $event && $event.button !== 0) {
            return null;
          }
          _vm.previous();
        }, function ($event) {
          if (!("button" in $event) && _vm._k($event.keyCode, "right", 39, $event.key, ["Right", "ArrowRight"])) {
            return null;
          }
          if ("button" in $event && $event.button !== 2) {
            return null;
          }
          _vm.next();
        }]
      }
    }, [_vm._t("arrowRight", [_c("svg", { attrs: { viewBox: "0 0 24 24" } }, [_c("path", {
      attrs: {
        d: "M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z"
      }
    })])])], 2)]) : _vm._e(), _vm.conf.bullets && _vm.slides.count > 1 && !_vm.disable && !_vm.conf.bulletsOutside ? _c("div", {
      staticClass: "vueperslides__bullets",
      attrs: { role: "tablist", "aria-label": "Slideshow navigation" }
    }, _vm._l(Math.ceil(_vm.slides.count / _vm.conf.slideMultiple), function (item, i) {
      return _c("button", {
        key: i,
        ref: "bullet",
        refInFor: true,
        staticClass: "vueperslides__bullet",
        class: {
          "vueperslides__bullet--active": _vm.slides.current === i * _vm.conf.slideMultiple
        },
        on: {
          click: function click($event) {
            _vm.goToSlide(i * _vm.conf.slideMultiple);
          },
          keyup: [function ($event) {
            if (!("button" in $event) && _vm._k($event.keyCode, "left", 37, $event.key, ["Left", "ArrowLeft"])) {
              return null;
            }
            if ("button" in $event && $event.button !== 0) {
              return null;
            }
            _vm.previous();
          }, function ($event) {
            if (!("button" in $event) && _vm._k($event.keyCode, "right", 39, $event.key, ["Right", "ArrowRight"])) {
              return null;
            }
            if ("button" in $event && $event.button !== 2) {
              return null;
            }
            _vm.next();
          }]
        }
      }, [_c("span", [_vm._v(_vm._s(i + 1))])]);
    })) : _vm._e()]), _vm.conf.bullets && _vm.slides.count > 1 && !_vm.disable && _vm.conf.bulletsOutside ? _c("div", {
      staticClass: "vueperslides__bullets vueperslides__bullets--outside"
    }, _vm._l(Math.ceil(_vm.slides.count / _vm.conf.slideMultiple), function (item, i) {
      return _c("button", {
        key: i,
        ref: "bullet",
        refInFor: true,
        staticClass: "vueperslides__bullet",
        class: {
          "vueperslides__bullet--active": _vm.slides.current === i * _vm.conf.slideMultiple
        },
        on: {
          click: function click($event) {
            _vm.goToSlide(i * _vm.conf.slideMultiple);
          },
          keyup: [function ($event) {
            if (!("button" in $event) && _vm._k($event.keyCode, "left", 37, $event.key, ["Left", "ArrowLeft"])) {
              return null;
            }
            if ("button" in $event && $event.button !== 0) {
              return null;
            }
            _vm.previous();
          }, function ($event) {
            if (!("button" in $event) && _vm._k($event.keyCode, "right", 39, $event.key, ["Right", "ArrowRight"])) {
              return null;
            }
            if ("button" in $event && $event.button !== 2) {
              return null;
            }
            _vm.next();
          }]
        }
      }, [_c("span", [_vm._v(_vm._s(i + 1))])]);
    })) : _vm._e(), _vm.conf.slideContentOutside === "bottom" ? _c("div", {
      staticClass: "vueperslide__content-wrapper vueperslide__content-wrapper--outside-bottom",
      class: _vm.conf.slideContentOutsideClass
    }, [_vm.slides.count ? _c("div", {
      staticClass: "vueperslide__title",
      domProps: {
        innerHTML: _vm._s(_vm.getCurrentSlideData("title"))
      }
    }) : _vm._e(), _vm.slides.count ? _c("div", {
      staticClass: "vueperslide__content",
      domProps: {
        innerHTML: _vm._s(_vm.getCurrentSlideData("content"))
      }
    }) : _vm._e()]) : _vm._e()]);
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-9b6f39f4_0", { source: "\n.vueperslides {\n  position: relative;\n}\n.vueperslides--fixed-height .vueperslides__inner,\n  .vueperslides--fixed-height .vueperslides__parallax-wrapper,\n  .vueperslides--fixed-height .vueperslide {\n    height: inherit;\n}\n.vueperslides--fixed-height .vueperslides__parallax-wrapper {\n    padding-bottom: 0 !important;\n}\n.vueperslides__inner {\n    position: relative;\n    user-select: none;\n}\n.vueperslides__parallax-wrapper {\n    position: relative;\n    overflow: hidden;\n}\n.vueperslides__track {\n    position: absolute;\n    top: 0;\n    height: 100%;\n    left: 0;\n    right: 0;\n    overflow: hidden;\n    z-index: 1;\n}\n.vueperslides--parallax .vueperslides__track {\n      height: 200%;\n      transform: translateY(0);\n}\n.vueperslides--touchable .vueperslides__track {\n      cursor: ew-resize;\n      cursor: -webkit-grab;\n      cursor: grab;\n}\n.vueperslides--touchable .vueperslides__track--mousedown, .vueperslides--touchable .vueperslides__track--dragging {\n        cursor: -webkit-grabbing;\n        cursor: grabbing;\n}\n.vueperslides__track-inner {\n    white-space: nowrap;\n    transition: 0.5s ease-in-out transform;\n    height: 100%;\n}\n.vueperslides--fade .vueperslides__track-inner {\n      white-space: normal;\n      transition: none;\n}\n.vueperslides__track--mousedown .vueperslides__track-inner {\n      transition: 0.2s ease-in-out transform !important;\n}\n.vueperslides__track--dragging .vueperslides__track-inner {\n      transition: none;\n}\n.vueperslides__track--no-animation .vueperslides__track-inner {\n      transition-duration: 0s;\n}\n.vueperslides__arrow {\n    position: absolute;\n    fill: currentColor;\n    width: 1em;\n    text-align: center;\n    transform: translateY(-50%);\n    transition: 0.3s ease-in-out;\n    cursor: pointer;\n    user-select: none;\n    outline: none;\n    z-index: 2;\n}\n.vueperslides__paused {\n    position: absolute;\n    transition: 0.3s ease-in-out;\n}\n.vueperslides__bullets {\n    display: flex;\n    justify-content: center;\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n}\n.vueperslides__bullets--outside {\n      position: relative;\n}\n.vueperslides__bullet {\n    cursor: pointer;\n    user-select: none;\n    outline: none;\n    z-index: 2;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.vueperslides__bullet::-moz-focus-inner {\n      border: 0;\n}\n\n/*# sourceMappingURL=VueperSlides.vue.map */", map: { "version": 3, "sources": ["/Users/anto/Programming/localhost/vueper-slides/src/components/VueperSlides.vue", "VueperSlides.vue"], "names": [], "mappings": ";AA+0BA;EACA,mBAAA;CAqHA;AAnHA;;;IAIA,gBAAA;CACA;AALA;IAQA,6BAAA;CACA;AAGA;IACA,mBAAA;IACA,kBAAA;CACA;AAEA;IACA,mBAAA;IACA,iBAAA;CACA;AAEA;IACA,mBAAA;IACA,OAAA;IACA,aAAA;IACA,QAAA;IACA,SAAA;IACA,iBAAA;IACA,WAAA;CAiBA;AAfA;MACA,aAAA;MACA,yBAAA;CACA;AAEA;MACA,kBAAA;MACA,qBAAA;MACA,aAAA;CAMA;AATA;QAMA,yBAAA;QACA,iBAAA;CACA;AAIA;IACA,oBAAA;IACA,uCAAA;IACA,aAAA;CAkBA;AAhBA;MACA,oBAAA;MACA,iBAAA;CACA;AAEA;MACA,kDAAA;CACA;AAEA;MACA,iBAAA;CACA;AAEA;MACA,wBAAA;CACA;AAGA;IACA,mBAAA;IACA,mBAAA;IACA,WAAA;IACA,mBAAA;IACA,4BAAA;IACA,6BAAA;IACA,gBAAA;IACA,kBAAA;IACA,cAAA;IACA,WAAA;CACA;AAEA;IACA,mBAAA;IACA,6BAAA;CACA;AAEA;IACA,cAAA;IACA,wBAAA;IACA,mBAAA;IACA,UAAA;IACA,QAAA;IACA,SAAA;CAKA;AAHA;MACA,mBAAA;CACA;AAGA;IACA,gBAAA;IACA,kBAAA;IACA,cAAA;IACA,WAAA;IACA,cAAA;IACA,wBAAA;IACA,oBAAA;CAKA;AAZA;MAUA,UAAA;CACA;;ACp3BA,4CAA4C", "file": "VueperSlides.vue", "sourcesContent": [null, ".vueperslides {\n  position: relative; }\n  .vueperslides--fixed-height .vueperslides__inner,\n  .vueperslides--fixed-height .vueperslides__parallax-wrapper,\n  .vueperslides--fixed-height .vueperslide {\n    height: inherit; }\n  .vueperslides--fixed-height .vueperslides__parallax-wrapper {\n    padding-bottom: 0 !important; }\n  .vueperslides__inner {\n    position: relative;\n    user-select: none; }\n  .vueperslides__parallax-wrapper {\n    position: relative;\n    overflow: hidden; }\n  .vueperslides__track {\n    position: absolute;\n    top: 0;\n    height: 100%;\n    left: 0;\n    right: 0;\n    overflow: hidden;\n    z-index: 1; }\n    .vueperslides--parallax .vueperslides__track {\n      height: 200%;\n      transform: translateY(0); }\n    .vueperslides--touchable .vueperslides__track {\n      cursor: ew-resize;\n      cursor: -webkit-grab;\n      cursor: grab; }\n      .vueperslides--touchable .vueperslides__track--mousedown, .vueperslides--touchable .vueperslides__track--dragging {\n        cursor: -webkit-grabbing;\n        cursor: grabbing; }\n  .vueperslides__track-inner {\n    white-space: nowrap;\n    transition: 0.5s ease-in-out transform;\n    height: 100%; }\n    .vueperslides--fade .vueperslides__track-inner {\n      white-space: normal;\n      transition: none; }\n    .vueperslides__track--mousedown .vueperslides__track-inner {\n      transition: 0.2s ease-in-out transform !important; }\n    .vueperslides__track--dragging .vueperslides__track-inner {\n      transition: none; }\n    .vueperslides__track--no-animation .vueperslides__track-inner {\n      transition-duration: 0s; }\n  .vueperslides__arrow {\n    position: absolute;\n    fill: currentColor;\n    width: 1em;\n    text-align: center;\n    transform: translateY(-50%);\n    transition: 0.3s ease-in-out;\n    cursor: pointer;\n    user-select: none;\n    outline: none;\n    z-index: 2; }\n  .vueperslides__paused {\n    position: absolute;\n    transition: 0.3s ease-in-out; }\n  .vueperslides__bullets {\n    display: flex;\n    justify-content: center;\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0; }\n    .vueperslides__bullets--outside {\n      position: relative; }\n  .vueperslides__bullet {\n    cursor: pointer;\n    user-select: none;\n    outline: none;\n    z-index: 2;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n    .vueperslides__bullet::-moz-focus-inner {\n      border: 0; }\n\n/*# sourceMappingURL=VueperSlides.vue.map */"] }, media: undefined });
  };
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/anto/Programming/localhost/vueper-slides/src/components/VueperSlides.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      var hook = void 0;
      if (style) {
        hook = function hook(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component;
  }
  /* style inject */
  function __vue_create_injector__$1() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */

  var VueperSlides = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

  // Expose component to global scope.
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('vueper-slides', VueperSlides);
    window.Vue.component('vueper-slide', VueperSlide);
  }

  exports.VueperSlides = VueperSlides;
  exports.VueperSlide = VueperSlide;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
