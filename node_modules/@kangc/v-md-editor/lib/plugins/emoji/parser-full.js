"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _markdownItEmoji = _interopRequireDefault(require("markdown-it-emoji"));

var _parserCreator = _interopRequireDefault(require("./parser-creator"));

var _default = (0, _parserCreator.default)(_markdownItEmoji.default);

exports.default = _default;