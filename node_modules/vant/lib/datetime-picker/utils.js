var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
  getMonthEndDay: () => getMonthEndDay,
  getTrueValue: () => getTrueValue,
  pickerInheritKeys: () => pickerInheritKeys,
  proxyPickerMethods: () => proxyPickerMethods,
  sharedProps: () => sharedProps,
  times: () => times
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("../utils");
var import_Picker = require("../picker/Picker");
const sharedProps = (0, import_utils.extend)({}, import_Picker.pickerSharedProps, {
  filter: Function,
  columnsOrder: Array,
  formatter: {
    type: Function,
    default: (type, value) => value
  }
});
const pickerInheritKeys = Object.keys(import_Picker.pickerSharedProps);
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
