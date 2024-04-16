"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _markdownItTodoList = _interopRequireDefault(require("../../utils/markdown-it-todo-list"));

function _default(vMdParser, options) {
  vMdParser.extendMarkdown(function (mdParser) {
    var color = (options == null ? void 0 : options.color) || '#3eaf7c';
    var defaultBorderColor = '#d9d9d9';

    var border = function border(type) {
      return "border-color: " + (type === 'todo' ? defaultBorderColor : color);
    };

    var background = "background-color: " + color;
    mdParser.use(_markdownItTodoList.default, {
      renderCheckbox: function renderCheckbox(type) {
        var checkboxClass = 'v-md-editor__todo-list-checkbox';
        var style = type === 'todo' ? "" + border(type) : border(type) + ";" + background;
        return "<span class=\"" + checkboxClass + (type === 'todo' ? '' : " " + checkboxClass + "--checked") + "\" style=\"" + style + "\"></span>";
      }
    });
  });
}