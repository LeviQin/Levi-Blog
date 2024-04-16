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
const currentYear = new Date().getFullYear();
const [name] = (0, import_utils.createNamespace)("date-picker");
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: (0, import_utils.extend)({}, import_utils2.sharedProps, {
    type: (0, import_utils.makeStringProp)("datetime"),
    modelValue: Date,
    minDate: {
      type: Date,
      default: () => new Date(currentYear - 10, 0, 1),
      validator: import_utils.isDate
    },
    maxDate: {
      type: Date,
      default: () => new Date(currentYear + 10, 11, 31),
      validator: import_utils.isDate
    }
  }),
  emits: ["confirm", "cancel", "change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const formatValue = (value) => {
      if ((0, import_utils.isDate)(value)) {
        const timestamp = (0, import_utils.clamp)(value.getTime(), props.minDate.getTime(), props.maxDate.getTime());
        return new Date(timestamp);
      }
      return void 0;
    };
    const picker = (0, import_vue2.ref)();
    const currentDate = (0, import_vue2.ref)(formatValue(props.modelValue));
    const getBoundary = (type, value) => {
      const boundary = props[`${type}Date`];
      const year = boundary.getFullYear();
      let month = 1;
      let date = 1;
      let hour = 0;
      let minute = 0;
      if (type === "max") {
        month = 12;
        date = (0, import_utils2.getMonthEndDay)(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }
      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;
        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();
          if (value.getDate() === date) {
            hour = boundary.getHours();
            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }
      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
      };
    };
    const ranges = (0, import_vue2.computed)(() => {
      const {
        maxYear,
        maxDate,
        maxMonth,
        maxHour,
        maxMinute
      } = getBoundary("max", currentDate.value || props.minDate);
      const {
        minYear,
        minDate,
        minMonth,
        minHour,
        minMinute
      } = getBoundary("min", currentDate.value || props.minDate);
      let result = [{
        type: "year",
        range: [minYear, maxYear]
      }, {
        type: "month",
        range: [minMonth, maxMonth]
      }, {
        type: "day",
        range: [minDate, maxDate]
      }, {
        type: "hour",
        range: [minHour, maxHour]
      }, {
        type: "minute",
        range: [minMinute, maxMinute]
      }];
      switch (props.type) {
        case "date":
          result = result.slice(0, 3);
          break;
        case "year-month":
          result = result.slice(0, 2);
          break;
        case "month-day":
          result = result.slice(1, 3);
          break;
        case "datehour":
          result = result.slice(0, 4);
          break;
      }
      if (props.columnsOrder) {
        const columnsOrder = props.columnsOrder.concat(result.map((column) => column.type));
        result.sort((a, b) => columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type));
      }
      return result;
    });
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
      const value = currentDate.value || props.minDate;
      const {
        formatter
      } = props;
      const values = originColumns.value.map((column) => {
        switch (column.type) {
          case "year":
            return formatter("year", `${value.getFullYear()}`);
          case "month":
            return formatter("month", (0, import_utils.padZero)(value.getMonth() + 1));
          case "day":
            return formatter("day", (0, import_utils.padZero)(value.getDate()));
          case "hour":
            return formatter("hour", (0, import_utils.padZero)(value.getHours()));
          case "minute":
            return formatter("minute", (0, import_utils.padZero)(value.getMinutes()));
          default:
            return "";
        }
      });
      (0, import_vue2.nextTick)(() => {
        var _a;
        (_a = picker.value) == null ? void 0 : _a.setValues(values);
      });
    };
    const updateInnerValue = () => {
      const {
        type
      } = props;
      const indexes = picker.value.getIndexes();
      const getValue = (type2) => {
        let index = 0;
        originColumns.value.forEach((column, columnIndex) => {
          if (type2 === column.type) {
            index = columnIndex;
          }
        });
        const {
          values
        } = originColumns.value[index];
        return (0, import_utils2.getTrueValue)(values[indexes[index]]);
      };
      let year;
      let month;
      let day;
      if (type === "month-day") {
        year = (currentDate.value || props.minDate).getFullYear();
        month = getValue("month");
        day = getValue("day");
      } else {
        year = getValue("year");
        month = getValue("month");
        day = type === "year-month" ? 1 : getValue("day");
      }
      const maxDay = (0, import_utils2.getMonthEndDay)(year, month);
      day = day > maxDay ? maxDay : day;
      let hour = 0;
      let minute = 0;
      if (type === "datehour") {
        hour = getValue("hour");
      }
      if (type === "datetime") {
        hour = getValue("hour");
        minute = getValue("minute");
      }
      const value = new Date(year, month - 1, day, hour, minute);
      currentDate.value = formatValue(value);
    };
    const onConfirm = () => {
      emit("update:modelValue", currentDate.value);
      emit("confirm", currentDate.value);
    };
    const onCancel = () => emit("cancel");
    const onChange = () => {
      updateInnerValue();
      (0, import_vue2.nextTick)(() => {
        updateInnerValue();
        (0, import_vue2.nextTick)(() => emit("change", currentDate.value));
      });
    };
    (0, import_vue2.onMounted)(() => {
      updateColumnValue();
      (0, import_vue2.nextTick)(updateInnerValue);
    });
    (0, import_vue2.watch)(columns, updateColumnValue);
    (0, import_vue2.watch)(currentDate, (value, oldValue) => emit("update:modelValue", oldValue ? value : null));
    (0, import_vue2.watch)(() => [props.filter, props.minDate, props.maxDate], () => {
      (0, import_vue2.nextTick)(updateInnerValue);
    });
    (0, import_vue2.watch)(() => props.modelValue, (value) => {
      var _a;
      value = formatValue(value);
      if (value && value.valueOf() !== ((_a = currentDate.value) == null ? void 0 : _a.valueOf())) {
        currentDate.value = value;
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
