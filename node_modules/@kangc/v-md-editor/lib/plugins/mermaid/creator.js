"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = creator;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _parser = _interopRequireDefault(require("./parser"));

var _deepAssign = require("../../utils/deep-assign");

var _util = require("../../utils/util");

function getPreviewEl(el) {
  var previewElClass = 'v-md-editor-preview';
  return el.classList.contains(previewElClass) ? el : el.querySelector("." + previewElClass);
}

function creator(mermaid) {
  function handleMdChange() {
    return _handleMdChange.apply(this, arguments);
  }

  function _handleMdChange() {
    _handleMdChange = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var previewEl, eles;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (_util.inBrowser) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.next = 4;
            return this.$nextTick();

          case 4:
            previewEl = getPreviewEl(this.$el);
            eles = previewEl.querySelectorAll('.v-md-mermaid');

            if (eles.length) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return");

          case 8:
            mermaid.run({
              nodes: eles
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    return _handleMdChange.apply(this, arguments);
  }

  return function createMermaidPlugin(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$mermaidInitializ = _ref.mermaidInitializeOptions,
        mermaidInitializeOptions = _ref$mermaidInitializ === void 0 ? {} : _ref$mermaidInitializ;

    var initialize = {
      altFontFamily: 'sans-serif',
      flowchart: {
        htmlLabels: true,
        useMaxWidth: true
      },
      fontFamily: 'sans-serif',
      gantt: {
        leftPadding: 75,
        rightPadding: 20
      },
      securityLevel: 'loose',
      sequence: {
        boxMargin: 8,
        diagramMarginX: 8,
        diagramMarginY: 8,
        useMaxWidth: true
      },
      startOnLoad: false
    };
    (0, _deepAssign.deepAssign)(initialize, mermaidInitializeOptions);
    return {
      install: function install(VMdEditor) {
        VMdEditor.vMdParser.use(_parser.default);
        if (!VMdEditor.mixins) VMdEditor.mixins = [];
        var mixin = {
          created: function created() {
            mermaid.initialize(initialize);
          },
          watch: {
            html: {
              immediate: true,
              handler: handleMdChange
            }
          }
        };

        if (VMdEditor.name === 'v-md-editor') {
          VMdEditor.Preview.mixins.push(mixin);
        } else {
          VMdEditor.mixins.push(mixin);
        }
      }
    };
  };
}