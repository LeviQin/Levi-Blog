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
  Notify: () => Notify
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../utils");
var import_mount_component = require("../utils/mount-component");
var import_Notify = __toESM(require("./Notify"));
let timer;
let instance;
const parseOptions = (message) => (0, import_utils.isObject)(message) ? message : {
  message
};
function initInstance() {
  ({
    instance
  } = (0, import_mount_component.mountComponent)({
    setup() {
      const {
        state,
        toggle
      } = (0, import_mount_component.usePopupState)();
      return () => (0, import_vue.createVNode)(import_Notify.default, (0, import_vue.mergeProps)(state, {
        "onUpdate:show": toggle
      }), null);
    }
  }));
}
function Notify(options) {
  if (!import_utils.inBrowser) {
    return;
  }
  if (!instance) {
    initInstance();
  }
  options = (0, import_utils.extend)({}, Notify.currentOptions, parseOptions(options));
  instance.open(options);
  clearTimeout(timer);
  if (options.duration > 0) {
    timer = window.setTimeout(Notify.clear, options.duration);
  }
  return instance;
}
const getDefaultOptions = () => ({
  type: "danger",
  color: void 0,
  message: "",
  onClose: void 0,
  onClick: void 0,
  onOpened: void 0,
  duration: 3e3,
  position: void 0,
  className: "",
  lockScroll: false,
  background: void 0
});
Notify.clear = () => {
  if (instance) {
    instance.toggle(false);
  }
};
Notify.currentOptions = getDefaultOptions();
Notify.setDefaultOptions = (options) => {
  (0, import_utils.extend)(Notify.currentOptions, options);
};
Notify.resetDefaultOptions = () => {
  Notify.currentOptions = getDefaultOptions();
};
Notify.Component = (0, import_utils.withInstall)(import_Notify.default);
Notify.install = (app) => {
  app.use(Notify.Component);
  app.config.globalProperties.$notify = Notify;
};
