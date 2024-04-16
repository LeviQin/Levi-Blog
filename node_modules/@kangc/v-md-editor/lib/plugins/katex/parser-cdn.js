"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _parserCreator = _interopRequireDefault(require("./parser-creator"));

var isServer = typeof window === 'undefined';

if (!isServer && !window.katex) {
  console.error('Please import resources katex from cdn');
}

var _default = (0, _parserCreator.default)(!isServer ? window.katex : null);

exports.default = _default;