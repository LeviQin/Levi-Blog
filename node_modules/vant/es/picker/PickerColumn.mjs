import { createVNode as _createVNode } from "vue";
import { ref, watch, reactive, defineComponent } from "vue";
import { deepClone } from "../utils/deep-clone.mjs";
import { clamp, isObject, unknownProp, numericProp, makeArrayProp, makeNumberProp, preventDefault, createNamespace, makeRequiredProp } from "../utils/index.mjs";
import { useEventListener, useParent } from "@vant/use";
import { useTouch } from "../composables/use-touch.mjs";
import { useExpose } from "../composables/use-expose.mjs";
const DEFAULT_DURATION = 200;
const MOMENTUM_LIMIT_TIME = 300;
const MOMENTUM_LIMIT_DISTANCE = 15;
const [name, bem] = createNamespace("picker-column");
function getElementTranslateY(element) {
  const {
    transform
  } = window.getComputedStyle(element);
  const translateY = transform.slice(7, transform.length - 1).split(", ")[5];
  return Number(translateY);
}
const PICKER_KEY = Symbol(name);
const isOptionDisabled = (option) => isObject(option) && option.disabled;
var stdin_default = defineComponent({
  name,
  props: {
    textKey: makeRequiredProp(String),
    readonly: Boolean,
    allowHtml: Boolean,
    className: unknownProp,
    itemHeight: makeRequiredProp(Number),
    defaultIndex: makeNumberProp(0),
    swipeDuration: makeRequiredProp(numericProp),
    initialOptions: makeArrayProp(),
    visibleItemCount: makeRequiredProp(numericProp)
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
    const root = ref();
    const wrapper = ref();
    const state = reactive({
      index: props.defaultIndex,
      offset: 0,
      duration: 0,
      options: deepClone(props.initialOptions)
    });
    const touch = useTouch();
    const count = () => state.options.length;
    const baseOffset = () => props.itemHeight * (+props.visibleItemCount - 1) / 2;
    const adjustIndex = (index) => {
      index = clamp(index, 0, count());
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
        state.options = deepClone(options);
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
      if (isObject(option) && props.textKey in option) {
        return option[props.textKey];
      }
      return option;
    };
    const getIndexByOffset = (offset) => clamp(Math.round(-offset / props.itemHeight), 0, count() - 1);
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
        preventDefault(event, true);
      }
      state.offset = clamp(startOffset + touch.deltaY.value, -(count() * props.itemHeight), props.itemHeight);
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
        return _createVNode("li", data, [slots.option ? slots.option(option) : _createVNode("div", childData, null)]);
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
    useParent(PICKER_KEY);
    useExpose({
      state,
      setIndex,
      getValue,
      setValue,
      setOptions,
      hasOptions,
      stopMomentum
    });
    watch(() => props.initialOptions, setOptions);
    watch(() => props.defaultIndex, (value) => setIndex(value));
    useEventListener("touchmove", onTouchMove, {
      target: root
    });
    return () => _createVNode("div", {
      "ref": root,
      "class": [bem(), props.className],
      "onTouchstartPassive": onTouchStart,
      "onTouchend": onTouchEnd,
      "onTouchcancel": onTouchEnd
    }, [_createVNode("ul", {
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
export {
  PICKER_KEY,
  stdin_default as default
};
