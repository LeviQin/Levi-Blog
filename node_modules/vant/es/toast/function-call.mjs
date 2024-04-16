import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { ref, watch, getCurrentInstance } from "vue";
import { extend, isObject, inBrowser, withInstall } from "../utils/index.mjs";
import { mountComponent, usePopupState } from "../utils/mount-component.mjs";
import VanToast from "./Toast.mjs";
const defaultOptions = {
  icon: "",
  type: "text",
  message: "",
  className: "",
  overlay: false,
  onClose: void 0,
  onOpened: void 0,
  duration: 2e3,
  teleport: "body",
  iconSize: void 0,
  iconPrefix: void 0,
  position: "middle",
  transition: "van-fade",
  forbidClick: false,
  loadingType: void 0,
  overlayClass: "",
  overlayStyle: void 0,
  closeOnClick: false,
  closeOnClickOverlay: false
};
let queue = [];
let allowMultiple = false;
let currentOptions = extend({}, defaultOptions);
const defaultOptionsMap = /* @__PURE__ */ new Map();
function parseOptions(message) {
  if (isObject(message)) {
    return message;
  }
  return {
    message
  };
}
function createInstance() {
  const {
    instance,
    unmount
  } = mountComponent({
    setup() {
      const message = ref("");
      const {
        open,
        state,
        close,
        toggle
      } = usePopupState();
      const onClosed = () => {
        if (allowMultiple) {
          queue = queue.filter((item) => item !== instance);
          unmount();
        }
      };
      const render = () => {
        const attrs = {
          onClosed,
          "onUpdate:show": toggle
        };
        return _createVNode(VanToast, _mergeProps(state, attrs), null);
      };
      watch(message, (val) => {
        state.message = val;
      });
      getCurrentInstance().render = render;
      return {
        open,
        clear: close,
        message
      };
    }
  });
  return instance;
}
function getInstance() {
  if (!queue.length || allowMultiple) {
    const instance = createInstance();
    queue.push(instance);
  }
  return queue[queue.length - 1];
}
function Toast(options = {}) {
  if (!inBrowser) {
    return {};
  }
  const toast = getInstance();
  const parsedOptions = parseOptions(options);
  toast.open(extend({}, currentOptions, defaultOptionsMap.get(parsedOptions.type || currentOptions.type), parsedOptions));
  return toast;
}
const createMethod = (type) => (options) => Toast(extend({
  type
}, parseOptions(options)));
Toast.loading = createMethod("loading");
Toast.success = createMethod("success");
Toast.fail = createMethod("fail");
Toast.clear = (all) => {
  var _a;
  if (queue.length) {
    if (all) {
      queue.forEach((toast) => {
        toast.clear();
      });
      queue = [];
    } else if (!allowMultiple) {
      queue[0].clear();
    } else {
      (_a = queue.shift()) == null ? void 0 : _a.clear();
    }
  }
};
function setDefaultOptions(type, options) {
  if (typeof type === "string") {
    defaultOptionsMap.set(type, options);
  } else {
    extend(currentOptions, type);
  }
}
Toast.setDefaultOptions = setDefaultOptions;
Toast.resetDefaultOptions = (type) => {
  if (typeof type === "string") {
    defaultOptionsMap.delete(type);
  } else {
    currentOptions = extend({}, defaultOptions);
    defaultOptionsMap.clear();
  }
};
Toast.allowMultiple = (value = true) => {
  allowMultiple = value;
};
Toast.install = (app) => {
  app.use(withInstall(VanToast));
  app.config.globalProperties.$toast = Toast;
};
export {
  Toast
};
