import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { ref, watch, computed, nextTick, onMounted, defineComponent } from "vue";
import { pick, clamp, extend, padZero, createNamespace, makeNumericProp } from "../utils/index.mjs";
import { times, sharedProps, pickerInheritKeys, proxyPickerMethods } from "./utils.mjs";
import { useExpose } from "../composables/use-expose.mjs";
import { Picker } from "../picker/index.mjs";
const [name] = createNamespace("time-picker");
var stdin_default = defineComponent({
  name,
  props: extend({}, sharedProps, {
    minHour: makeNumericProp(0),
    maxHour: makeNumericProp(23),
    minMinute: makeNumericProp(0),
    maxMinute: makeNumericProp(59),
    modelValue: String
  }),
  emits: ["confirm", "cancel", "change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const formatValue = (value) => {
      const {
        minHour,
        maxHour,
        maxMinute,
        minMinute
      } = props;
      if (!value) {
        value = `${padZero(minHour)}:${padZero(minMinute)}`;
      }
      let [hour, minute] = value.split(":");
      hour = padZero(clamp(+hour, +minHour, +maxHour));
      minute = padZero(clamp(+minute, +minMinute, +maxMinute));
      return `${hour}:${minute}`;
    };
    const picker = ref();
    const currentDate = ref(formatValue(props.modelValue));
    const ranges = computed(() => [{
      type: "hour",
      range: [+props.minHour, +props.maxHour]
    }, {
      type: "minute",
      range: [+props.minMinute, +props.maxMinute]
    }]);
    const originColumns = computed(() => ranges.value.map(({
      type,
      range: rangeArr
    }) => {
      let values = times(rangeArr[1] - rangeArr[0] + 1, (index) => padZero(rangeArr[0] + index));
      if (props.filter) {
        values = props.filter(type, values);
      }
      return {
        type,
        values
      };
    }));
    const columns = computed(() => originColumns.value.map((column) => ({
      values: column.values.map((value) => props.formatter(column.type, value))
    })));
    const updateColumnValue = () => {
      const pair = currentDate.value.split(":");
      const values = [props.formatter("hour", pair[0]), props.formatter("minute", pair[1])];
      nextTick(() => {
        var _a;
        (_a = picker.value) == null ? void 0 : _a.setValues(values);
      });
    };
    const updateInnerValue = () => {
      const [hourIndex, minuteIndex] = picker.value.getIndexes();
      const [hourColumn, minuteColumn] = originColumns.value;
      const hour = hourColumn.values[hourIndex] || hourColumn.values[0];
      const minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];
      currentDate.value = formatValue(`${hour}:${minute}`);
      updateColumnValue();
    };
    const onConfirm = () => emit("confirm", currentDate.value);
    const onCancel = () => emit("cancel");
    const onChange = () => {
      updateInnerValue();
      nextTick(() => {
        nextTick(() => emit("change", currentDate.value));
      });
    };
    onMounted(() => {
      updateColumnValue();
      nextTick(updateInnerValue);
    });
    watch(columns, updateColumnValue);
    watch(() => [props.filter, props.maxHour, props.minMinute, props.maxMinute], updateInnerValue);
    watch(() => props.minHour, () => {
      nextTick(updateInnerValue);
    });
    watch(currentDate, (value) => emit("update:modelValue", value));
    watch(() => props.modelValue, (value) => {
      value = formatValue(value);
      if (value !== currentDate.value) {
        currentDate.value = value;
        updateColumnValue();
      }
    });
    useExpose({
      getPicker: () => picker.value && proxyPickerMethods(picker.value, updateInnerValue)
    });
    return () => _createVNode(Picker, _mergeProps({
      "ref": picker,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props, pickerInheritKeys)), slots);
  }
});
export {
  stdin_default as default
};
