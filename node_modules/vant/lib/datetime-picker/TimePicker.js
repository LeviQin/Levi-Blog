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
var import_utils = require("../utils");
var import_utils2 = require("./utils");
var import_use_expose = require("../composables/use-expose");
var import_picker = require("../picker");
const [name] = (0, import_utils.createNamespace)("time-picker");
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: (0, import_utils.extend)({}, import_utils2.sharedProps, {
    minHour: (0, import_utils.makeNumericProp)(0),
    maxHour: (0, import_utils.makeNumericProp)(23),
    minMinute: (0, import_utils.makeNumericProp)(0),
    maxMinute: (0, import_utils.makeNumericProp)(59),
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
        value = `${(0, import_utils.padZero)(minHour)}:${(0, import_utils.padZero)(minMinute)}`;
      }
      let [hour, minute] = value.split(":");
      hour = (0, import_utils.padZero)((0, import_utils.clamp)(+hour, +minHour, +maxHour));
      minute = (0, import_utils.padZero)((0, import_utils.clamp)(+minute, +minMinute, +maxMinute));
      return `${hour}:${minute}`;
    };
    const picker = (0, import_vue2.ref)();
    const currentDate = (0, import_vue2.ref)(formatValue(props.modelValue));
    const ranges = (0, import_vue2.computed)(() => [{
      type: "hour",
      range: [+props.minHour, +props.maxHour]
    }, {
      type: "minute",
      range: [+props.minMinute, +props.maxMinute]
    }]);
    const originColumns = (0, import_vue2.computed)(() => ranges.value.map(({
      type,
      range: rangeArr
    }) => {
      let values = (0, import_utils2.times)(rangeArr[1] - rangeArr[0] + 1, (index) => (0, import_utils.padZero)(rangeArr[0] + index));
      if (props.filter) {
        values = props.filter(type, values);
      }
      return {
        type,
        values
      };
    }));
    const columns = (0, import_vue2.computed)(() => originColumns.value.map((column) => ({
      values: column.values.map((value) => props.formatter(column.type, value))
    })));
    const updateColumnValue = () => {
      const pair = currentDate.value.split(":");
      const values = [props.formatter("hour", pair[0]), props.formatter("minute", pair[1])];
      (0, import_vue2.nextTick)(() => {
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
      (0, import_vue2.nextTick)(() => {
        (0, import_vue2.nextTick)(() => emit("change", currentDate.value));
      });
    };
    (0, import_vue2.onMounted)(() => {
      updateColumnValue();
      (0, import_vue2.nextTick)(updateInnerValue);
    });
    (0, import_vue2.watch)(columns, updateColumnValue);
    (0, import_vue2.watch)(() => [props.filter, props.maxHour, props.minMinute, props.maxMinute], updateInnerValue);
    (0, import_vue2.watch)(() => props.minHour, () => {
      (0, import_vue2.nextTick)(updateInnerValue);
    });
    (0, import_vue2.watch)(currentDate, (value) => emit("update:modelValue", value));
    (0, import_vue2.watch)(() => props.modelValue, (value) => {
      value = formatValue(value);
      if (value !== currentDate.value) {
        currentDate.value = value;
        updateColumnValue();
      }
    });
    (0, import_use_expose.useExpose)({
      getPicker: () => picker.value && (0, import_utils2.proxyPickerMethods)(picker.value, updateInnerValue)
    });
    return () => (0, import_vue.createVNode)(import_picker.Picker, (0, import_vue.mergeProps)({
      "ref": picker,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, (0, import_utils.pick)(props, import_utils2.pickerInheritKeys)), slots);
  }
});
