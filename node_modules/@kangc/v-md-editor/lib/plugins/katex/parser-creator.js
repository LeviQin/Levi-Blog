"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = parserCreator;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _markdownItKatex = _interopRequireDefault(require("../../utils/markdown-it-katex"));

function parserCreator(katex) {
  return function parser(vMdParser, katexOptions) {
    vMdParser.extendMarkdown(function (mdParser) {
      if (katex) {
        mdParser.use(_markdownItKatex.default, (0, _extends2.default)({}, katexOptions, {
          katex: katex
        }));
      }
    });
  };
}