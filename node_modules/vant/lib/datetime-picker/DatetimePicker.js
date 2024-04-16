var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use_expose = require("../composables/use-expose");
var import_TimePicker = __toESM(require("./TimePicker"));
var import_DatePicker = __toESM(require("./DatePicker"));
const [name, bem] = (0, import_utils.createNamespace)("datetime-picker");
const timePickerPropKeys = Object.keys(import_TimePicker.default.props);
const datePickerPropKeys = Object.keys(import_DatePicker.default.props);
const datetimePickerProps = (0, import_utils.extend)({}, import_TimePicker.default.props, import_DatePicker.default.props, {
  modelValue: [String, Date]
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: datetimePickerProps,
  setup(props, {
    attrs,
    slots
  }) {
    const root = (0, import_vue2.ref)();
    (0, import_use_expose.useExpose)({
      getPicker: () => {
        var _a;
        return (_a = root.value) == null ? void 0 : _a.getPicker();
      }
    });
    return () => {
      const isTimePicker = props.type === "time";
      const Component = isTimePicker ? import_TimePicker.default : import_DatePicker.default;
      const inheritProps = (0, import_utils.pick)(props, isTimePicker ? timePickerPropKeys : datePickerPropKeys);
      return (0, import_vue.createVNode)(Component, (0, import_vue.mergeProps)({
        "ref": root,
        "class": bem()
      }, inheritProps, attrs), slots);
    };
  }
});
