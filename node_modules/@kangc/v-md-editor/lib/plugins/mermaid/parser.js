"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = parser;

var _markdownItMermaid = _interopRequireDefault(require("../../utils/markdown-it-mermaid"));

function parser(vMdParser) {
  vMdParser.extendMarkdown(function (mdParser) {
    if (mdParser) {
      mdParser.use(_markdownItMermaid.default);
    }
  });
}