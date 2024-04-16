import { extend } from "../utils/index.mjs";
import { pickerSharedProps } from "../picker/Picker.mjs";
const sharedProps = extend({}, pickerSharedProps, {
  filter: Function,
  columnsOrder: Array,
  formatter: {
    type: Function,
    default: (type, value) => value
  }
});
const pickerInheritKeys = Object.keys(pickerSharedProps);
function times(n, iteratee) {
  if (n < 0) {
    return [];
  }
  const result = Array(n);
  let index = -1;
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
function getTrueValue(value) {
  if (!value) {
    return 0;
  }
  while (Number.isNaN(parseInt(value, 10))) {
    if (value.length > 1) {
      value = value.slice(1);
    } else {
      return 0;
    }
  }
  return parseInt(value, 10);
}
const getMonthEndDay = (year, month) => 32 - new Date(year, month - 1, 32).getDate();
const proxyPickerMethods = (picker, callback) => {
  const methods = [
    "setValues",
    "setIndexes",
    "setColumnIndex",
    "setColumnValue"
  ];
  return new Proxy(picker, {
    get: (target, prop) => {
      if (methods.includes(prop)) {
        return (...args) => {
          target[prop](...args);
          callback();
        };
      }
      return target[prop];
    }
  });
};
export {
  getMonthEndDay,
  getTrueValue,
  pickerInheritKeys,
  proxyPickerMethods,
  sharedProps,
  times
};
