"use strict";

exports.__esModule = true;
exports.default = _default;

function _default(parser) {
  return function createKatexPlugin(katexOptions) {
    return {
      install: function install(VMdEditor) {
        VMdEditor.vMdParser.use(parser, katexOptions);
      }
    };
  };
}