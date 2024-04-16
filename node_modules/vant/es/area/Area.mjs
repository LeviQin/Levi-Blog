import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { ref, watch, computed, reactive, nextTick, onMounted, defineComponent } from "vue";
import { deepClone } from "../utils/deep-clone.mjs";
import { pick, extend, makeArrayProp, makeNumericProp, createNamespace } from "../utils/index.mjs";
import { pickerSharedProps } from "../picker/Picker.mjs";
import { useExpose } from "../composables/use-expose.mjs";
import { Picker } from "../picker/index.mjs";
const [name, bem] = createNamespace("area");
const EMPTY_CODE = "000000";
const INHERIT_SLOTS = ["title", "cancel", "confirm", "toolbar", "columns-top", "columns-bottom"];
const INHERIT_PROPS = ["title", "loading", "readonly", "itemHeight", "swipeDuration", "visibleItemCount", "cancelButtonText", "confirmButtonText"];
const isOverseaCode = (code) => code[0] === "9";
const areaProps = extend({}, pickerSharedProps, {
  value: String,
  columnsNum: makeNumericProp(3),
  columnsPlaceholder: makeArrayProp(),
  areaList: {
    type: Object,
    default: () => ({})
  },
  isOverseaCode: {
    type: Function,
    default: isOverseaCode
  }
});
var stdin_default = defineComponent({
  name,
  props: areaProps,
  emits: ["change", "confirm", "cancel"],
  setup(props, {
    emit,
    slots
  }) {
    const pickerRef = ref();
    const state = reactive({
      code: props.value,
      columns: [{
        values: []
      }, {
        values: []
      }, {
        values: []
      }]
    });
    const areaList = computed(() => {
      const {
        areaList: areaList2
      } = props;
      return {
        province: areaList2.province_list || {},
        city: areaList2.city_list || {},
        county: areaList2.county_list || {}
      };
    });
    const placeholderMap = computed(() => {
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
        value = deepClone(value);
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
    onMounted(setValues);
    watch(() => props.value, (value) => {
      state.code = value;
      setValues();
    });
    watch(() => props.areaList, setValues, {
      deep: true
    });
    watch(() => props.columnsNum, () => {
      nextTick(setValues);
    });
    useExpose({
      reset,
      getArea,
      getValues
    });
    return () => {
      const columns = state.columns.slice(0, +props.columnsNum);
      return _createVNode(Picker, _mergeProps({
        "ref": pickerRef,
        "class": bem(),
        "columns": columns,
        "columnsFieldNames": {
          text: "name"
        },
        "onChange": onChange,
        "onCancel": onCancel,
        "onConfirm": onConfirm
      }, pick(props, INHERIT_PROPS)), pick(slots, INHERIT_SLOTS));
    };
  }
});
export {
  stdin_default as default
};
