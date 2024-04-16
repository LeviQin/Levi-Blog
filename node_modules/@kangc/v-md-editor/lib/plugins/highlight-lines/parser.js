"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _markdownItHighlightLines = _interopRequireDefault(require("../../utils/markdown-it-highlight-lines"));

function _default(vMdParser) {
  vMdParser.extendMarkdown(function (mdParser) {
    mdParser.use(_markdownItHighlightLines.default);
  });
}