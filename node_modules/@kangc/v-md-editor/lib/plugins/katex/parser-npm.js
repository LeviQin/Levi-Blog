"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _parserCreator = _interopRequireDefault(require("./parser-creator"));

var _katex = _interopRequireDefault(require("katex"));

var _default = (0, _parserCreator.default)(_katex.default);

exports.default = _default;