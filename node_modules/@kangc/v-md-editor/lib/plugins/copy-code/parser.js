"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _markdownItCopyCode = _interopRequireDefault(require("../../utils/markdown-it-copy-code"));

function _default(vMdParser) {
  vMdParser.extendMarkdown(function (mdParser) {
    mdParser.use(_markdownItCopyCode.default);
  });
}