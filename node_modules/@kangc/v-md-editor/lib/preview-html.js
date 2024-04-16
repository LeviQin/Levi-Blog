(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define("VMdEditor", ["vue"], factory);
	else if(typeof exports === 'object')
		exports["VMdEditor"] = factory(require("vue"));
	else
		root["VMdEditor"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 110);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"root":"Vue","commonjs":"vue","commonjs2":"vue","amd":"vue"}
var external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_ = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/dist/templateLoader.js??ref--6!./node_modules/vue-loader/dist??ref--2-0!./src/preview-html.vue?vue&type=template&id=1cd8edb9&bindings={"html":"props","previewClass":"props"}

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_["openBlock"])(), Object(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_["createBlock"])("div", {
    class: "v-md-editor-preview",
    style: {
      tabSize: _ctx.tabSize,
      '-moz-tab-size': _ctx.tabSize,
      '-o-tab-size': _ctx.tabSize
    },
    onClick: _cache[1] || (_cache[1] = function () {
      return _ctx.handlePreviewClick.apply(_ctx, arguments);
    })
  }, [Object(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_["createVNode"])("div", {
    class: [$props.previewClass],
    innerHTML: $props.html
  }, null, 10
  /* CLASS, PROPS */
  , ["innerHTML"])], 4
  /* STYLE */
  );
}
// CONCATENATED MODULE: ./src/preview-html.vue?vue&type=template&id=1cd8edb9&bindings={"html":"props","previewClass":"props"}

// EXTERNAL MODULE: ./src/mixins/preview.js
var preview = __webpack_require__(16);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/dist??ref--2-0!./src/preview-html.vue?vue&type=script&lang=js

/* harmony default export */ var preview_htmlvue_type_script_lang_js = ({
  name: 'v-md-preview-html',
  mixins: [preview["a" /* default */]],
  props: {
    html: {
      type: String,
      default: ''
    },
    previewClass: String
  }
});
// CONCATENATED MODULE: ./src/preview-html.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/preview-html.vue



preview_htmlvue_type_script_lang_js.render = render

/* harmony default export */ var preview_html = (preview_htmlvue_type_script_lang_js);
// EXTERNAL MODULE: ./src/assets/css/font.css
var font = __webpack_require__(18);

// CONCATENATED MODULE: ./src/preview-html.js
// This file is auto generated by build/build-entry.js
 // font css


var version = '2.3.18';

var preview_html_install = function install(app) {
  app.component(preview_html.name, preview_html);
};

preview_html.version = version;
preview_html.install = preview_html_install;

preview_html.use = function (optionsOrInstall, opt) {
  if (typeof optionsOrInstall === 'function') {
    optionsOrInstall(preview_html, opt);
  } else {
    optionsOrInstall.install(preview_html, opt);
  }

  return preview_html;
};

/* harmony default export */ var src_preview_html = __webpack_exports__["default"] = (preview_html);

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils_scroll_top__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _utils_smooth_scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _utils_constants_markup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);



/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    tabSize: {
      type: Number,
      default: 2
    },
    scrollContainer: {
      type: Function,
      default: function _default() {
        return window;
      }
    },
    top: {
      type: Number,
      default: 0
    }
  },
  emits: ['image-click'],
  methods: {
    handlePreviewClick: function handlePreviewClick(e) {
      var target = e.target; // image preview

      if (target.tagName === 'IMG') {
        var src = target.getAttribute('src');
        if (!src) return;
        var imageEls = Array.from(this.$el.querySelectorAll('img'));
        var images = imageEls.map(function (el) {
          return el.getAttribute('src');
        }).filter(function (src) {
          return src;
        });
        var imagePreviewInitIndex = imageEls.indexOf(target);
        this.$emit('image-click', images, imagePreviewInitIndex);
        return;
      }

      var scrollToTargetId = target.getAttribute(_utils_constants_markup__WEBPACK_IMPORTED_MODULE_2__[/* ANCHOR_MARKUP */ "a"]);
      var scrollToTarget = this.$el.querySelector("[" + _utils_constants_markup__WEBPACK_IMPORTED_MODULE_2__[/* HEADING_MARKUP */ "b"] + "=\"" + scrollToTargetId + "\"]");

      if (scrollToTarget) {
        this.scrollToTarget({
          target: scrollToTarget
        });
      }
    },
    getOffsetTop: function getOffsetTop(target, container) {
      var rect = target.getBoundingClientRect();

      if (container === window || container === document.documentElement) {
        return rect.top;
      }

      return rect.top - container.getBoundingClientRect().top;
    },
    scrollToTarget: function scrollToTarget(_ref) {
      var target = _ref.target,
          _ref$scrollContainer = _ref.scrollContainer,
          scrollContainer = _ref$scrollContainer === void 0 ? this.scrollContainer() : _ref$scrollContainer,
          _ref$top = _ref.top,
          top = _ref$top === void 0 ? this.top : _ref$top,
          onScrollEnd = _ref.onScrollEnd;
      var offsetTop = this.getOffsetTop(target, scrollContainer);
      var scrollTop = Object(_utils_scroll_top__WEBPACK_IMPORTED_MODULE_0__[/* getScrollTop */ "a"])(scrollContainer) + offsetTop - top;
      Object(_utils_smooth_scroll__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
        scrollTarget: scrollContainer,
        scrollToTop: scrollTop,
        onScrollEnd: onScrollEnd
      });
    },
    scrollToLine: function scrollToLine(_ref2) {
      var lineIndex = _ref2.lineIndex,
          onScrollEnd = _ref2.onScrollEnd;

      if (lineIndex) {
        var target = this.$el.querySelector("[" + _utils_constants_markup__WEBPACK_IMPORTED_MODULE_2__[/* LINE_MARKUP */ "c"] + "=\"" + lineIndex + "\"]");
        if (target) this.scrollToTarget({
          target: target,
          onScrollEnd: onScrollEnd
        });
      }
    }
  }
});

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LINE_MARKUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HEADING_MARKUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ANCHOR_MARKUP; });
var LINE_MARKUP = 'data-v-md-line';
var HEADING_MARKUP = 'data-v-md-heading';
var ANCHOR_MARKUP = 'data-v-md-anchor';

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getScrollTop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return scrollTo; });
function getScrollTop(target) {
  var result = 0;

  if (target === window) {
    result = target.pageYOffset;
  } else if (target) {
    result = target.scrollTop;
  }

  return result;
}
function scrollTo(target, scrollTop) {
  if (target === window) {
    window.scrollTo(window.pageYOffset, scrollTop);
  } else if (target) {
    target.scrollTop = scrollTop;
  }
}

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return smooth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return smoothScroll; });
/* harmony import */ var _scroll_top__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

function smooth(_ref) {
  var currentScrollTop = _ref.currentScrollTop,
      scrollToTop = _ref.scrollToTop,
      scrollFn = _ref.scrollFn,
      _ref$percent = _ref.percent,
      percent = _ref$percent === void 0 ? 10 : _ref$percent,
      onScrollEnd = _ref.onScrollEnd;
  var scrollWay = scrollToTop > currentScrollTop ? 'down' : 'up';
  var step = (scrollToTop - currentScrollTop) * (percent / 100);
  var id;

  var scroll = function scroll() {
    currentScrollTop += step;

    if (scrollWay === 'down' && currentScrollTop >= scrollToTop || scrollWay === 'up' && currentScrollTop <= scrollToTop) {
      scrollFn(scrollToTop);
      window.cancelAnimationFrame(id);
      if (onScrollEnd) window.requestAnimationFrame(onScrollEnd);
    } else {
      scrollFn(currentScrollTop);
      window.requestAnimationFrame(scroll);
    }
  };

  window.requestAnimationFrame(scroll);
}
function smoothScroll(_ref2) {
  var scrollTarget = _ref2.scrollTarget,
      scrollToTop = _ref2.scrollToTop,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === void 0 ? 10 : _ref2$percent,
      onScrollEnd = _ref2.onScrollEnd;
  var currentScrollTop = Object(_scroll_top__WEBPACK_IMPORTED_MODULE_0__[/* getScrollTop */ "a"])(scrollTarget);
  smooth({
    currentScrollTop: currentScrollTop,
    scrollToTop: scrollToTop,
    scrollFn: function scrollFn(scrollTop) {
      return Object(_scroll_top__WEBPACK_IMPORTED_MODULE_0__[/* scrollTo */ "b"])(scrollTarget, scrollTop);
    },
    percent: percent,
    onScrollEnd: onScrollEnd
  });
}

/***/ })

/******/ })["default"];
});