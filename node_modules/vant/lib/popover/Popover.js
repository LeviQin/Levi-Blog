var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
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
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_popperjs = require("@vant/popperjs");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_icon = require("../icon");
var import_popup = require("../popup");
const [name, bem] = (0, import_utils.createNamespace)("popover");
const popupProps = ["show", "overlay", "duration", "teleport", "overlayStyle", "overlayClass", "closeOnClickOverlay"];
const popoverProps = {
  show: Boolean,
  theme: (0, import_utils.makeStringProp)("light"),
  overlay: Boolean,
  actions: (0, import_utils.makeArrayProp)(),
  trigger: (0, import_utils.makeStringProp)("click"),
  duration: import_utils.numericProp,
  showArrow: import_utils.truthProp,
  placement: (0, import_utils.makeStringProp)("bottom"),
  iconPrefix: String,
  overlayClass: import_utils.unknownProp,
  overlayStyle: Object,
  closeOnClickAction: import_utils.truthProp,
  closeOnClickOverlay: import_utils.truthProp,
  closeOnClickOutside: import_utils.truthProp,
  offset: {
    type: Array,
    default: () => [0, 8]
  },
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: popoverProps,
  emits: ["select", "touchstart", "update:show"],
  setup(props, {
    emit,
    slots,
    attrs
  }) {
    let popper;
    const popupRef = (0, import_vue2.ref)();
    const wrapperRef = (0, import_vue2.ref)();
    const popoverRef = (0, import_vue2.ref)();
    const getPopoverOptions = () => ({
      placement: props.placement,
      modifiers: [{
        name: "computeStyles",
        options: {
          adaptive: false,
          gpuAcceleration: false
        }
      }, (0, import_utils.extend)({}, import_popperjs.offsetModifier, {
        options: {
          offset: props.offset
        }
      })]
    });
    const createPopperInstance = () => {
      if (wrapperRef.value && popoverRef.value) {
        return (0, import_popperjs.createPopper)(wrapperRef.value, popoverRef.value.popupRef.value, getPopoverOptions());
      }
      return null;
    };
    const updateLocation = () => {
      (0, import_vue2.nextTick)(() => {
        if (!props.show) {
          return;
        }
        if (!popper) {
          popper = createPopperInstance();
        } else {
          popper.setOptions(getPopoverOptions());
        }
      });
    };
    const updateShow = (value) => emit("update:show", value);
    const onClickWrapper = () => {
      if (props.trigger === "click") {
        updateShow(!props.show);
      }
    };
    const onClickAction = (action, index) => {
      if (action.disabled) {
        return;
      }
      emit("select", action, index);
      if (props.closeOnClickAction) {
        updateShow(false);
      }
    };
    const onClickAway = () => {
      if (props.show && props.closeOnClickOutside && (!props.overlay || props.closeOnClickOverlay)) {
        updateShow(false);
      }
    };
    const renderActionContent = (action, index) => {
      if (slots.action) {
        return slots.action({
          action,
          index
        });
      }
      return [action.icon && (0, import_vue.createVNode)(import_icon.Icon, {
        "name": action.icon,
        "classPrefix": props.iconPrefix,
        "class": bem("action-icon")
      }, null), (0, import_vue.createVNode)("div", {
        "class": [bem("action-text"), import_utils.BORDER_BOTTOM]
      }, [action.text])];
    };
    const renderAction = (action, index) => {
      const {
        icon,
        color,
        disabled,
        className
      } = action;
      return (0, import_vue.createVNode)("div", {
        "role": "menuitem",
        "class": [bem("action", {
          disabled,
          "with-icon": icon
        }), className],
        "style": {
          color
        },
        "tabindex": disabled ? void 0 : 0,
        "aria-disabled": disabled || void 0,
        "onClick": () => onClickAction(action, index)
      }, [renderActionContent(action, index)]);
    };
    (0, import_vue2.onMounted)(() => {
      updateLocation();
      (0, import_vue2.watchEffect)(() => {
        var _a;
        popupRef.value = (_a = popoverRef.value) == null ? void 0 : _a.popupRef.value;
      });
    });
    (0, import_vue2.onBeforeUnmount)(() => {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    });
    (0, import_vue2.watch)(() => [props.show, props.offset, props.placement], updateLocation);
    (0, import_use.useClickAway)([wrapperRef, popupRef], onClickAway, {
      eventName: "touchstart"
    });
    return () => {
      var _a;
      return (0, import_vue.createVNode)(import_vue.Fragment, null, [(0, import_vue.createVNode)("span", {
        "ref": wrapperRef,
        "class": bem("wrapper"),
        "onClick": onClickWrapper
      }, [(_a = slots.reference) == null ? void 0 : _a.call(slots)]), (0, import_vue.createVNode)(import_popup.Popup, (0, import_vue.mergeProps)({
        "ref": popoverRef,
        "class": bem([props.theme]),
        "position": "",
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "onUpdate:show": updateShow
      }, attrs, (0, import_utils.pick)(props, popupProps)), {
        default: () => [props.showArrow && (0, import_vue.createVNode)("div", {
          "class": bem("arrow")
        }, null), (0, import_vue.createVNode)("div", {
          "role": "menu",
          "class": bem("content")
        }, [slots.default ? slots.default() : props.actions.map(renderAction)])]
      })]);
    };
  }
});
