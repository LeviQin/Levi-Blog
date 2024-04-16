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
  PICKER_KEY: () => PICKER_KEY,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_deep_clone = require("../utils/deep-clone");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_touch = require("../composables/use-touch");
var import_use_expose = require("../composables/use-expose");
const DEFAULT_DURATION = 200;
const MOMENTUM_LIMIT_TIME = 300;
const MOMENTUM_LIMIT_DISTANCE = 15;
const [name, bem] = (0, import_utils.createNamespace)("picker-column");
function getElementTranslateY(element) {
  const {
    transform
  } = window.getComputedStyle(element);
  const translateY = transform.slice(7, transform.length - 1).split(", ")[5];
  return Number(translateY);
}
const PICKER_KEY = Symbol(name);
const isOptionDisabled = (option) => (0, import_utils.isObject)(option) && option.disabled;
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: {
    textKey: (0, import_utils.makeRequiredProp)(String),
    readonly: Boolean,
    allowHtml: Boolean,
    className: import_utils.unknownProp,
    itemHeight: (0, import_utils.makeRequiredProp)(Number),
    defaultIndex: (0, import_utils.makeNumberProp)(0),
    swipeDuration: (0, import_utils.makeRequiredProp)(import_utils.numericProp),
    initialOptions: (0, import_utils.makeArrayProp)(),
    visibleItemCount: (0, import_utils.makeRequiredProp)(import_utils.numericProp)
  },
  emits: ["change"],
  setup(props, {
    emit,
    slots
  }) {
    let moving;
    let startOffset;
    let touchStartTime;
    let momentumOffset;
    let transitionEndTrigger;
    const root = (0, import_vue2.ref)();
    const wrapper = (0, import_vue2.ref)();
    const state = (0, import_vue2.reactive)({
      index: props.defaultIndex,
      offset: 0,
      duration: 0,
      options: (0, import_deep_clone.deepClone)(props.initialOptions)
    });
    const touch = (0, import_use_touch.useTouch)();
    const count = () => state.options.length;
    const baseOffset = () => props.itemHeight * (+props.visibleItemCount - 1) / 2;
    const adjustIndex = (index) => {
      index = (0, import_utils.clamp)(index, 0, count());
      for (let i = index; i < count(); i++) {
        if (!isOptionDisabled(state.options[i]))
          return i;
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!isOptionDisabled(state.options[i]))
          return i;
      }
    };
    const setIndex = (index, emitChange) => {
      index = adjustIndex(index) || 0;
      const offset = -index * props.itemHeight;
      const trigger = () => {
        if (index !== state.index) {
          state.index = index;
          if (emitChange) {
            emit("change", index);
          }
        }
      };
      if (moving && offset !== state.offset) {
        transitionEndTrigger = trigger;
      } else {
        trigger();
      }
      state.offset = offset;
    };
    const setOptions = (options) => {
      if (JSON.stringify(options) !== JSON.stringify(state.options)) {
        state.options = (0, import_deep_clone.deepClone)(options);
        setIndex(props.defaultIndex);
      }
    };
    const onClickItem = (index) => {
      if (moving || props.readonly) {
        return;
      }
      transitionEndTrigger = null;
      state.duration = DEFAULT_DURATION;
      setIndex(index, true);
    };
    const getOptionText = (option) => {
      if ((0, import_utils.isObject)(option) && props.textKey in option) {
        return option[props.textKey];
      }
      return option;
    };
    const getIndexByOffset = (offset) => (0, import_utils.clamp)(Math.round(-offset / props.itemHeight), 0, count() - 1);
    const momentum = (distance, duration) => {
      const speed = Math.abs(distance / duration);
      distance = state.offset + speed / 3e-3 * (distance < 0 ? -1 : 1);
      const index = getIndexByOffset(distance);
      state.duration = +props.swipeDuration;
      setIndex(index, true);
    };
    const stopMomentum = () => {
      moving = false;
      state.duration = 0;
      if (transitionEndTrigger) {
        transitionEndTrigger();
        transitionEndTrigger = null;
      }
    };
    const onTouchStart = (event) => {
      if (props.readonly) {
        return;
      }
      touch.start(event);
      if (moving) {
        const translateY = getElementTranslateY(wrapper.value);
        state.offset = Math.min(0, translateY - baseOffset());
        startOffset = state.offset;
      } else {
        startOffset = state.offset;
      }
      state.duration = 0;
      touchStartTime = Date.now();
      momentumOffset = startOffset;
      transitionEndTrigger = null;
    };
    const onTouchMove = (event) => {
      if (props.readonly) {
        return;
      }
      touch.move(event);
      if (touch.isVertical()) {
        moving = true;
        (0, import_utils.preventDefault)(event, true);
      }
      state.offset = (0, import_utils.clamp)(startOffset + touch.deltaY.value, -(count() * props.itemHeight), props.itemHeight);
      const now = Date.now();
      if (now - touchStartTime > MOMENTUM_LIMIT_TIME) {
        touchStartTime = now;
        momentumOffset = state.offset;
      }
    };
    const onTouchEnd = () => {
      if (props.readonly) {
        return;
      }
      const distance = state.offset - momentumOffset;
      const duration = Date.now() - touchStartTime;
      const allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;
      if (allowMomentum) {
        momentum(distance, duration);
        return;
      }
      const index = getIndexByOffset(state.offset);
      state.duration = DEFAULT_DURATION;
      setIndex(index, true);
      setTimeout(() => {
        moving = false;
      }, 0);
    };
    const renderOptions = () => {
      const optionStyle = {
        height: `${props.itemHeight}px`
      };
      return state.options.map((option, index) => {
        const text = getOptionText(option);
        const disabled = isOptionDisabled(option);
        const data = {
          role: "button",
          style: optionStyle,
          tabindex: disabled ? -1 : 0,
          class: bem("item", {
            disabled,
            selected: index === state.index
          }),
          onClick: () => onClickItem(index)
        };
        const childData = {
          class: "van-ellipsis",
          [props.allowHtml ? "innerHTML" : "textContent"]: text
        };
        return (0, import_vue.createVNode)("li", data, [slots.option ? slots.option(option) : (0, import_vue.createVNode)("div", childData, null)]);
      });
    };
    const setValue = (value) => {
      const {
        options
      } = state;
      for (let i = 0; i < options.length; i++) {
        if (getOptionText(options[i]) === value) {
          return setIndex(i);
        }
      }
    };
    const getValue = () => state.options[state.index];
    const hasOptions = () => state.options.length;
    setIndex(state.index);
    (0, import_use.useParent)(PICKER_KEY);
    (0, import_use_expose.useExpose)({
      state,
      setIndex,
      getValue,
      setValue,
      setOptions,
      hasOptions,
      stopMomentum
    });
    (0, import_vue2.watch)(() => props.initialOptions, setOptions);
    (0, import_vue2.watch)(() => props.defaultIndex, (value) => setIndex(value));
    (0, import_use.useEventListener)("touchmove", onTouchMove, {
      target: root
    });
    return () => (0, import_vue.createVNode)("div", {
      "ref": root,
      "class": [bem(), props.className],
      "onTouchstartPassive": onTouchStart,
      "onTouchend": onTouchEnd,
      "onTouchcancel": onTouchEnd
    }, [(0, import_vue.createVNode)("ul", {
      "ref": wrapper,
      "style": {
        transform: `translate3d(0, ${state.offset + baseOffset()}px, 0)`,
        transitionDuration: `${state.duration}ms`,
        transitionProperty: state.duration ? "all" : "none"
      },
      "class": bem("wrapper"),
      "onTransitionend": stopMomentum
    }, [renderOptions()])]);
  }
});
