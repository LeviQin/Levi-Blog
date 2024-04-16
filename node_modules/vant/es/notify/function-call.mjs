import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { extend, isObject, inBrowser, withInstall } from "../utils/index.mjs";
import { mountComponent, usePopupState } from "../utils/mount-component.mjs";
import VanNotify from "./Notify.mjs";
let timer;
let instance;
const parseOptions = (message) => isObject(message) ? message : {
  message
};
function initInstance() {
  ({
    instance
  } = mountComponent({
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      return () => _createVNode(VanNotify, _mergeProps(state, {
        "onUpdate:show": toggle
      }), null);
    }
  }));
}
function Notify(options) {
  if (!inBrowser) {
    return;
  }
  if (!instance) {
    initInstance();
  }
  options = extend({}, Notify.currentOptions, parseOptions(options));
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
  extend(Notify.currentOptions, options);
};
Notify.resetDefaultOptions = () => {
  Notify.currentOptions = getDefaultOptions();
};
Notify.Component = withInstall(VanNotify);
Notify.install = (app) => {
  app.use(Notify.Component);
  app.config.globalProperties.$notify = Notify;
};
export {
  Notify
};
