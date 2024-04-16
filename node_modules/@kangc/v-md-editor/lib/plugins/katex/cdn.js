"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _creator = _interopRequireDefault(require("./creator"));

var _parserCdn = _interopRequireDefault(require("./parser-cdn"));

var _default = (0, _creator.default)(_parserCdn.default);

exports.default = _default;