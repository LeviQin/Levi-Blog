"use strict";

exports.__esModule = true;
exports.prefixAttrWhiteList = exports.commonWhiteList = exports.attrWhiteList = void 0;
var attrWhiteList = ['style', 'align', 'class', 'id'];
exports.attrWhiteList = attrWhiteList;
var prefixAttrWhiteList = ['data-'];
exports.prefixAttrWhiteList = prefixAttrWhiteList;
var commonWhiteList = {
  input: ['type'],
  ol: ['reversed', 'start', 'type'],
  button: ['type'],
  summary: []
};
exports.commonWhiteList = commonWhiteList;