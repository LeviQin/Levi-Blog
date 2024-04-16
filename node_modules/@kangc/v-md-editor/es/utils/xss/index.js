import _extends from "@babel/runtime/helpers/esm/extends";
import xss from 'xss';
import { svgTagWhiteList, svgAttrWhiteList } from "./svg";
import { katexTagWhiteList, katexAttrWhiteList } from "./KaTex";
import { attrWhiteList, prefixAttrWhiteList, commonWhiteList } from "./common";
var options = {
  whiteList: _extends({}, xss.getDefaultWhiteList(), commonWhiteList, svgTagWhiteList, katexTagWhiteList),
  onIgnoreTagAttr: function onIgnoreTagAttr(tag, name, value) {
    if (svgTagWhiteList[tag] && svgAttrWhiteList.includes(name) || katexTagWhiteList[tag] && katexAttrWhiteList.includes(name) || attrWhiteList.some(function (attr) {
      return attr === name;
    }) || prefixAttrWhiteList.some(function (prefix) {
      return name.startsWith(prefix);
    })) {
      return name + "=\"" + xss.escapeAttrValue(value) + "\"";
    }
  }
};
var xssFilterInstance = new xss.FilterXSS(options);

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

export default xssFilterInstance;