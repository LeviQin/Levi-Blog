"use strict";

exports.__esModule = true;
exports.default = void 0;

var _util = require("./util");

// Modified from https://github.com/ElemeFE/element/blob/dev/src/utils/clickoutside.js
var nodeList = [];
var ctx = '@@clickoutsideContext';
var startClick;
var seed = 0;

if (_util.inBrowser) {
  document.addEventListener('mousedown', function (e) {
    startClick = e;
  });
  document.addEventListener('mouseup', function (e) {
    nodeList.forEach(function (node) {
      return node[ctx].documentHandler(e, startClick);
    });
  });
}

function createDocumentHandler(el, binding, vnode) {
  return function (mouseup, mousedown) {
    if (mouseup === void 0) {
      mouseup = {};
    }

    if (mousedown === void 0) {
      mousedown = {};
    }

    if (!vnode || !binding || !binding.instance || !mouseup.target || !mousedown.target || el.contains(mouseup.target) || el.contains(mousedown.target) || el === mouseup.target) {
      return;
    }

    if (binding.arg && el[ctx].methodName && binding.instance[el[ctx].methodName]) {
      binding.instance[el[ctx].methodName]();
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}

var _default = {
  beforeMount: function beforeMount(el, binding, vnode) {
    nodeList.push(el);
    var id = seed++;
    el[ctx] = {
      id: id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.arg,
      bindingFn: binding.value
    };
  },
  updated: function updated(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.arg;
    el[ctx].bindingFn = binding.value;
  },
  unmounted: function unmounted(el) {
    var len = nodeList.length;

    for (var i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }

    delete el[ctx];
  }
};
exports.default = _default;