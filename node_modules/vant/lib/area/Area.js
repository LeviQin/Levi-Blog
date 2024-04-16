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
var import_deep_clone = require("../utils/deep-clone");
var import_utils = require("../utils");
var import_Picker = require("../picker/Picker");
var import_use_expose = require("../composables/use-expose");
var import_picker = require("../picker");
const [name, bem] = (0, import_utils.createNamespace)("area");
const EMPTY_CODE = "000000";
const INHERIT_SLOTS = ["title", "cancel", "confirm", "toolbar", "columns-top", "columns-bottom"];
const INHERIT_PROPS = ["title", "loading", "readonly", "itemHeight", "swipeDuration", "visibleItemCount", "cancelButtonText", "confirmButtonText"];
const isOverseaCode = (code) => code[0] === "9";
const areaProps = (0, import_utils.extend)({}, import_Picker.pickerSharedProps, {
  value: String,
  columnsNum: (0, import_utils.makeNumericProp)(3),
  columnsPlaceholder: (0, import_utils.makeArrayProp)(),
  areaList: {
    type: Object,
    default: () => ({})
  },
  isOverseaCode: {
    type: Function,
    default: isOverseaCode
  }
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: areaProps,
  emits: ["change", "confirm", "cancel"],
  setup(props, {
    emit,
    slots
  }) {
    const pickerRef = (0, import_vue2.ref)();
    const state = (0, import_vue2.reactive)({
      code: props.value,
      columns: [{
        values: []
      }, {
        values: []
      }, {
        values: []
      }]
    });
    const areaList = (0, import_vue2.computed)(() => {
      const {
        areaList: areaList2
      } = props;
      return {
        province: areaList2.province_list || {},
        city: areaList2.city_list || {},
        county: areaList2.county_list || {}
      };
    });
    const placeholderMap = (0, import_vue2.computed)(() => {
      const {
        columnsPlaceholder
      } = props;
      return {
        province: columnsPlaceholder[0] || "",
        city: columnsPlaceholder[1] || "",
        county: columnsPlaceholder[2] || ""
      };
    });
    const getDefaultCode = () => {
      if (props.columnsPlaceholder.length) {
        return EMPTY_CODE;
      }
      const {
        county,
        city
      } = areaList.value;
      const countyCodes = Object.keys(county);
      if (countyCodes[0]) {
        return countyCodes[0];
      }
      const cityCodes = Object.keys(city);
      if (cityCodes[0]) {
        return cityCodes[0];
      }
      return "";
    };
    const getColumnValues = (type, code) => {
      let column = [];
      if (type !== "province" && !code) {
        return column;
      }
      const list = areaList.value[type];
      column = Object.keys(list).map((listCode) => ({
        code: listCode,
        name: list[listCode]
      }));
      if (code) {
        if (type === "city" && props.isOverseaCode(code)) {
          code = "9";
        }
        column = column.filter((item) => item.code.indexOf(code) === 0);
      }
      if (placeholderMap.value[type] && column.length) {
        let codeFill = "";
        if (type === "city") {
          codeFill = EMPTY_CODE.slice(2, 4);
        } else if (type === "county") {
          codeFill = EMPTY_CODE.slice(4, 6);
        }
        column.unshift({
          code: code + codeFill,
          name: placeholderMap.value[type]
        });
      }
      return column;
    };
    const getIndex = (type, code) => {
      let compareNum = code.length;
      if (type === "province") {
        compareNum = props.isOverseaCode(code) ? 1 : 2;
      }
      if (type === "city") {
        compareNum = 4;
      }
      code = code.slice(0, compareNum);
      const list = getColumnValues(type, compareNum > 2 ? code.slice(0, compareNum - 2) : "");
      for (let i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }
      return 0;
    };
    const setValues = () => {
      const picker = pickerRef.value;
      if (!picker) {
        return;
      }
      let code = state.code || getDefaultCode();
      const province = getColumnValues("province");
      const city = getColumnValues("city", code.slice(0, 2));
      picker.setColumnValues(0, province);
      picker.setColumnValues(1, city);
      if (city.length && code.slice(2, 4) === "00" && !props.isOverseaCode(code)) {
        [{
          code
        }] = city;
      }
      picker.setColumnValues(2, getColumnValues("county", code.slice(0, 4)));
      picker.setIndexes([getIndex("province", code), getIndex("city", code), getIndex("county", code)]);
    };
    const parseValues = (values) => values.map((value, index) => {
      if (value) {
        value = (0, import_deep_clone.deepClone)(value);
        if (!value.code || value.name === props.columnsPlaceholder[index]) {
          value.code = "";
          value.name = "";
        }
      }
      return value;
    });
    const getValues = () => {
      if (pickerRef.value) {
        const values = pickerRef.value.getValues().filter(Boolean);
        return parseValues(values);
      }
      return [];
    };
    const getArea = () => {
      const values = getValues();
      const area = {
        code: "",
        country: "",
        province: "",
        city: "",
        county: ""
      };
      if (!values.length) {
        return area;
      }
      const names = values.map((item) => item.name);
      const validValues = values.filter((value) => value.code);
      area.code = validValues.length ? validValues[validValues.length - 1].code : "";
      if (props.isOverseaCode(area.code)) {
        area.country = names[1] || "";
        area.province = names[2] || "";
      } else {
        area.province = names[0] || "";
        area.city = names[1] || "";
        area.county = names[2] || "";
      }
      return area;
    };
    const reset = (newCode = "") => {
      state.code = newCode;
      setValues();
    };
    const onChange = (values, index) => {
      state.code = values[index].code;
      setValues();
      if (pickerRef.value) {
        const parsedValues = parseValues(pickerRef.value.getValues());
        emit("change", parsedValues, index);
      }
    };
    const onConfirm = (values, index) => {
      setValues();
      emit("confirm", parseValues(values), index);
    };
    const onCancel = (...args) => emit("cancel", ...args);
    (0, import_vue2.onMounted)(setValues);
    (0, import_vue2.watch)(() => props.value, (value) => {
      state.code = value;
      setValues();
    });
    (0, import_vue2.watch)(() => props.areaList, setValues, {
      deep: true
    });
    (0, import_vue2.watch)(() => props.columnsNum, () => {
      (0, import_vue2.nextTick)(setValues);
    });
    (0, import_use_expose.useExpose)({
      reset,
      getArea,
      getValues
    });
    return () => {
      const columns = state.columns.slice(0, +props.columnsNum);
      return (0, import_vue.createVNode)(import_picker.Picker, (0, import_vue.mergeProps)({
        "ref": pickerRef,
        "class": bem(),
        "columns": columns,
        "columnsFieldNames": {
          text: "name"
        },
        "onChange": onChange,
        "onCancel": onCancel,
        "onConfirm": onConfirm
      }, (0, import_utils.pick)(props, INHERIT_PROPS)), (0, import_utils.pick)(slots, INHERIT_SLOTS));
    };
  }
});
