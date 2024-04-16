import { mergeProps as _mergeProps, Fragment as _Fragment, createVNode as _createVNode } from "vue";
import { ref, watch, nextTick, onMounted, watchEffect, onBeforeUnmount, defineComponent } from "vue";
import { createPopper, offsetModifier } from "@vant/popperjs";
import { pick, extend, truthProp, numericProp, unknownProp, BORDER_BOTTOM, makeArrayProp, makeStringProp, createNamespace } from "../utils/index.mjs";
import { useClickAway } from "@vant/use";
import { Icon } from "../icon/index.mjs";
import { Popup } from "../popup/index.mjs";
const [name, bem] = createNamespace("popover");
const popupProps = ["show", "overlay", "duration", "teleport", "overlayStyle", "overlayClass", "closeOnClickOverlay"];
const popoverProps = {
  show: Boolean,
  theme: makeStringProp("light"),
  overlay: Boolean,
  actions: makeArrayProp(),
  trigger: makeStringProp("click"),
  duration: numericProp,
  showArrow: truthProp,
  placement: makeStringProp("bottom"),
  iconPrefix: String,
  overlayClass: unknownProp,
  overlayStyle: Object,
  closeOnClickAction: truthProp,
  closeOnClickOverlay: truthProp,
  closeOnClickOutside: truthProp,
  offset: {
    type: Array,
    default: () => [0, 8]
  },
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
var stdin_default = defineComponent({
  name,
  props: popoverProps,
  emits: ["select", "touchstart", "update:show"],
  setup(props, {
    emit,
    slots,
    attrs
  }) {
    let popper;
    const popupRef = ref();
    const wrapperRef = ref();
    const popoverRef = ref();
    const getPopoverOptions = () => ({
      placement: props.placement,
      modifiers: [{
        name: "computeStyles",
        options: {
          adaptive: false,
          gpuAcceleration: false
        }
      }, extend({}, offsetModifier, {
        options: {
          offset: props.offset
        }
      })]
    });
    const createPopperInstance = () => {
      if (wrapperRef.value && popoverRef.value) {
        return createPopper(wrapperRef.value, popoverRef.value.popupRef.value, getPopoverOptions());
      }
      return null;
    };
    const updateLocation = () => {
      nextTick(() => {
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
      return [action.icon && _createVNode(Icon, {
        "name": action.icon,
        "classPrefix": props.iconPrefix,
        "class": bem("action-icon")
      }, null), _createVNode("div", {
        "class": [bem("action-text"), BORDER_BOTTOM]
      }, [action.text])];
    };
    const renderAction = (action, index) => {
      const {
        icon,
        color,
        disabled,
        className
      } = action;
      return _createVNode("div", {
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
    onMounted(() => {
      updateLocation();
      watchEffect(() => {
        var _a;
        popupRef.value = (_a = popoverRef.value) == null ? void 0 : _a.popupRef.value;
      });
    });
    onBeforeUnmount(() => {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    });
    watch(() => [props.show, props.offset, props.placement], updateLocation);
    useClickAway([wrapperRef, popupRef], onClickAway, {
      eventName: "touchstart"
    });
    return () => {
      var _a;
      return _createVNode(_Fragment, null, [_createVNode("span", {
        "ref": wrapperRef,
        "class": bem("wrapper"),
        "onClick": onClickWrapper
      }, [(_a = slots.reference) == null ? void 0 : _a.call(slots)]), _createVNode(Popup, _mergeProps({
        "ref": popoverRef,
        "class": bem([props.theme]),
        "position": "",
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "onUpdate:show": updateShow
      }, attrs, pick(props, popupProps)), {
        default: () => [props.showArrow && _createVNode("div", {
          "class": bem("arrow")
        }, null), _createVNode("div", {
          "role": "menu",
          "class": bem("content")
        }, [slots.default ? slots.default() : props.actions.map(renderAction)])]
      })]);
    };
  }
});
export {
  stdin_default as default
};
