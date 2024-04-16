"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _full = _interopRequireDefault(require("markdown-it-emoji/lib/data/full.json"));

var _creator = _interopRequireDefault(require("./creator"));

var _parserFull = _interopRequireDefault(require("./parser-full"));

var _default = (0, _creator.default)({
  emojiJson: _full.default,
  parser: _parserFull.default
});

exports.default = _default;