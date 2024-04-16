"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _light = _interopRequireDefault(require("markdown-it-emoji/lib/data/light.json"));

var _creator = _interopRequireDefault(require("./creator"));

var _parser = _interopRequireDefault(require("./parser"));

var _default = (0, _creator.default)({
  emojiJson: _light.default,
  parser: _parser.default
});

exports.default = _default;