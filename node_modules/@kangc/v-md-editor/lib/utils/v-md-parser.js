"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.VMdParser = void 0;

var _lang = _interopRequireDefault(require("./lang"));

var VMdParser = /*#__PURE__*/function () {
  function VMdParser() {
    this.lang = new _lang.default();
  }

  var _proto = VMdParser.prototype;

  _proto.defaultMarkdownLoader = function defaultMarkdownLoader(text) {
    return text;
  };

  _proto.use = function use(optionsOrInstall, opt) {
    if (typeof optionsOrInstall === 'function') {
      optionsOrInstall(this, opt);
    } else {
      optionsOrInstall.install(this, opt);
    }

    return this;
  };

  _proto.theme = function theme(themeConfig) {
    this.themeConfig = themeConfig;
  };

  _proto.extendMarkdown = function extendMarkdown(extender) {
    if (!this.themeConfig) {
      return console.error('Please use theme before using plugins');
    }

    var markdownParser = this.themeConfig.markdownParser;
    extender(markdownParser);
  };

  _proto.parse = function parse(text) {
    var _markdownParser$rende;

    var markdownParser = this.themeConfig.markdownParser;
    var markdownLoader = (markdownParser == null ? void 0 : (_markdownParser$rende = markdownParser.render) == null ? void 0 : _markdownParser$rende.bind(markdownParser)) || this.defaultMarkdownLoader;

    if (typeof markdownLoader !== 'function' || markdownLoader === this.defaultMarkdownLoader) {
      console.error('Please configure your markdown parser');
    }

    return markdownLoader(text);
  };

  return VMdParser;
}();

exports.VMdParser = VMdParser;