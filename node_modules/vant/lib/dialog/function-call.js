var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  Dialog: () => Dialog
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../utils");
var import_mount_component = require("../utils/mount-component");
var import_Dialog = __toESM(require("./Dialog"));
let instance;
function initInstance() {
  const Wrapper = {
    setup() {
      const {
        state,
        toggle
      } = (0, import_mount_component.usePopupState)();
      return () => (0, import_vue.createVNode)(import_Dialog.default, (0, import_vue.mergeProps)(state, {
        "onUpdate:show": toggle
      }), null);
    }
  };
  ({
    instance
  } = (0, import_mount_component.mountComponent)(Wrapper));
}
function Dialog(options) {
  if (!import_utils.inBrowser) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance();
    }
    instance.open((0, import_utils.extend)({}, Dialog.currentOptions, options, {
      callback: (action) => {
        (action === "confirm" ? resolve : reject)(action);
      }
    }));
  });
}
Dialog.defaultOptions = {
  title: "",
  width: "",
  theme: null,
  message: "",
  overlay: true,
  callback: null,
  teleport: "body",
  className: "",
  allowHtml: false,
  lockScroll: true,
  transition: void 0,
  beforeClose: null,
  overlayClass: "",
  overlayStyle: void 0,
  messageAlign: "",
  cancelButtonText: "",
  cancelButtonColor: null,
  cancelButtonDisabled: false,
  confirmButtonText: "",
  confirmButtonColor: null,
  confirmButtonDisabled: false,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false
};
Dialog.currentOptions = (0, import_utils.extend)({}, Dialog.defaultOptions);
Dialog.alert = Dialog;
Dialog.confirm = (options) => Dialog((0, import_utils.extend)({
  showCancelButton: true
}, options));
Dialog.close = () => {
  if (instance) {
    instance.toggle(false);
  }
};
Dialog.setDefaultOptions = (options) => {
  (0, import_utils.extend)(Dialog.currentOptions, options);
};
Dialog.resetDefaultOptions = () => {
  Dialog.currentOptions = (0, import_utils.extend)({}, Dialog.defaultOptions);
};
Dialog.Component = (0, import_utils.withInstall)(import_Dialog.default);
Dialog.install = (app) => {
  app.use(Dialog.Component);
  app.config.globalProperties.$dialog = Dialog;
};
