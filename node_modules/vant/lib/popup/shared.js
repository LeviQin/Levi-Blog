var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  popupSharedPropKeys: () => popupSharedPropKeys,
  popupSharedProps: () => popupSharedProps
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("../utils");
const popupSharedProps = {
  show: Boolean,
  zIndex: import_utils.numericProp,
  overlay: import_utils.truthProp,
  duration: import_utils.numericProp,
  teleport: [String, Object],
  lockScroll: import_utils.truthProp,
  lazyRender: import_utils.truthProp,
  beforeClose: Function,
  overlayStyle: Object,
  overlayClass: import_utils.unknownProp,
  transitionAppear: Boolean,
  closeOnClickOverlay: import_utils.truthProp
};
const popupSharedPropKeys = Object.keys(
  popupSharedProps
);
