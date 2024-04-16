"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _light = _interopRequireDefault(require("markdown-it-emoji/light"));

var _parserCreator = _interopRequireDefault(require("./parser-creator"));

var _default = (0, _parserCreator.default)(_light.default);

exports.default = _default;