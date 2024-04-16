import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import parser from "./parser";
import { deepAssign } from "../../utils/deep-assign";
import { inBrowser } from "../../utils/util";

function getPreviewEl(el) {
  var previewElClass = 'v-md-editor-preview';
  return el.classList.contains(previewElClass) ? el : el.querySelector("." + previewElClass);
}

export default function creator(mermaid) {
  function handleMdChange() {
    return _handleMdChange.apply(this, arguments);
  }

  function _handleMdChange() {
    _handleMdChange = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var previewEl, eles;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (inBrowser) {
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
    deepAssign(initialize, mermaidInitializeOptions);
    return {
      install: function install(VMdEditor) {
        VMdEditor.vMdParser.use(parser);
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