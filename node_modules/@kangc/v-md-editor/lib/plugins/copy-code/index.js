"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = createCopyCodePlugin;

var _parser = _interopRequireDefault(require("./parser"));

var _preview = _interopRequireDefault(require("./preview"));

function createCopyCodePlugin() {
  return {
    install: function install(VMdEditor) {
      VMdEditor.vMdParser.use(_parser.default);
      VMdEditor.use((0, _preview.default)());
    }
  };
}