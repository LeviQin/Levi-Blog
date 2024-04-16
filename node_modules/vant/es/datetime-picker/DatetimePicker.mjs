import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { ref, defineComponent } from "vue";
import { pick, extend, createNamespace } from "../utils/index.mjs";
import { useExpose } from "../composables/use-expose.mjs";
import TimePicker from "./TimePicker.mjs";
import DatePicker from "./DatePicker.mjs";
const [name, bem] = createNamespace("datetime-picker");
const timePickerPropKeys = Object.keys(TimePicker.props);
const datePickerPropKeys = Object.keys(DatePicker.props);
const datetimePickerProps = extend({}, TimePicker.props, DatePicker.props, {
  modelValue: [String, Date]
});
var stdin_default = defineComponent({
  name,
  props: datetimePickerProps,
  setup(props, {
    attrs,
    slots
  }) {
    const root = ref();
    useExpose({
      getPicker: () => {
        var _a;
        return (_a = root.value) == null ? void 0 : _a.getPicker();
      }
    });
    return () => {
      const isTimePicker = props.type === "time";
      const Component = isTimePicker ? TimePicker : DatePicker;
      const inheritProps = pick(props, isTimePicker ? timePickerPropKeys : datePickerPropKeys);
      return _createVNode(Component, _mergeProps({
        "ref": root,
        "class": bem()
      }, inheritProps, attrs), slots);
    };
  }
});
export {
  stdin_default as default
};
