"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _xss = _interopRequireDefault(require("xss"));

var _svg = require("./svg");

var _KaTex = require("./KaTex");

var _common = require("./common");

var options = {
  whiteList: (0, _extends2.default)({}, _xss.default.getDefaultWhiteList(), _common.commonWhiteList, _svg.svgTagWhiteList, _KaTex.katexTagWhiteList),
  onIgnoreTagAttr: function onIgnoreTagAttr(tag, name, value) {
    if (_svg.svgTagWhiteList[tag] && _svg.svgAttrWhiteList.includes(name) || _KaTex.katexTagWhiteList[tag] && _KaTex.katexAttrWhiteList.includes(name) || _common.attrWhiteList.some(function (attr) {
      return attr === name;
    }) || _common.prefixAttrWhiteList.some(function (prefix) {
      return name.startsWith(prefix);
    })) {
      return name + "=\"" + _xss.default.escapeAttrValue(value) + "\"";
    }
  }
};
var xssFilterInstance = new _xss.default.FilterXSS(options);

xssFilterInstance.extend = function (extendOptions) {
  var instanceOptions = xssFilterInstance.options;
  Object.keys(extendOptions).forEach(function (optionName) {
    // extend whiteList
    if (optionName === 'whiteList') {
      Object.keys(extendOptions.whiteList).forEach(function (tagName) {
        var tagAttrWhiteList = extendOptions.whiteList[tagName];
        var instanceWhiteList = instanceOptions.whiteList;

        if (instanceWhiteList[tagName]) {
          instanceWhiteList[tagName] = [].concat(instanceWhiteList[tagName], tagAttrWhiteList);
        } else {
          instanceWhiteList[tagName] = tagAttrWhiteList;
        }
      });
    } else if (optionName === 'onIgnoreTagAttr') {
      var oldHandler = instanceOptions[optionName];

      instanceOptions[optionName] = function () {
        var _extendOptions$option;

        for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
          arg[_key] = arguments[_key];
        }

        var oldReturnVal = oldHandler.call.apply(oldHandler, [this].concat(arg));

        var newReturnVal = (_extendOptions$option = extendOptions[optionName]).call.apply(_extendOptions$option, [this].concat(arg));

        return oldReturnVal || newReturnVal;
      };
    } else {
      instanceOptions[optionName] = extendOptions[optionName];
    }
  });
};

var _default = xssFilterInstance;
exports.default = _default;