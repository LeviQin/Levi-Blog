"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _lineNumbers = _interopRequireDefault(require("@vuepress/markdown/lib/lineNumbers"));

function _default(vMdParser) {
  vMdParser.extendMarkdown(function (mdParser) {
    mdParser.use(_lineNumbers.default);
  });
}