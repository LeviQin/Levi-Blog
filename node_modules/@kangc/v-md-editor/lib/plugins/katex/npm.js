"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _creator = _interopRequireDefault(require("./creator"));

var _parserNpm = _interopRequireDefault(require("./parser-npm"));

var _default = (0, _creator.default)(_parserNpm.default);

exports.default = _default;