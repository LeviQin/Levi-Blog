"use strict";

exports.__esModule = true;
exports.default = void 0;

var _deepAssign = require("./deep-assign");

var Lang = /*#__PURE__*/function () {
  function Lang(options) {
    if (options === void 0) {
      options = {};
    }

    this.config = {
      lang: 'zh-CN',
      langConfig: {
        'zh-CN': {}
      }
    };
    this.options = options;
  }

  var _proto = Lang.prototype;

  _proto.use = function use(lang, config) {
    var _this$add;

    this.config.lang = lang;
    this.add((_this$add = {}, _this$add[lang] = config, _this$add));
    if (this.options.afterUse) this.options.afterUse(lang, config);
  };

  _proto.add = function add(config) {
    if (config === void 0) {
      config = {};
    }

    (0, _deepAssign.deepAssign)(this.config.langConfig, config);
  };

  return Lang;
}();

exports.default = Lang;