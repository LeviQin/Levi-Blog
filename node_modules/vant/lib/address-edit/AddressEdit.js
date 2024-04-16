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
var import_area = require("../area");
var import_cell = require("../cell");
var import_form = require("../form");
var import_field = require("../field");
var import_popup = require("../popup");
var import_toast = require("../toast");
var import_button = require("../button");
var import_switch = require("../switch");
var import_AddressEditDetail = __toESM(require("./AddressEditDetail"));
const [name, bem, t] = (0, import_utils.createNamespace)("address-edit");
const DEFAULT_DATA = {
  name: "",
  tel: "",
  city: "",
  county: "",
  country: "",
  province: "",
  areaCode: "",
  isDefault: false,
  postalCode: "",
  addressDetail: ""
};
const isPostal = (value) => /^\d{6}$/.test(value);
const addressEditProps = {
  areaList: Object,
  isSaving: Boolean,
  isDeleting: Boolean,
  validator: Function,
  showArea: import_utils.truthProp,
  showDetail: import_utils.truthProp,
  showDelete: Boolean,
  showPostal: Boolean,
  disableArea: Boolean,
  searchResult: Array,
  telMaxlength: import_utils.numericProp,
  showSetDefault: Boolean,
  saveButtonText: String,
  areaPlaceholder: String,
  deleteButtonText: String,
  showSearchResult: Boolean,
  detailRows: (0, import_utils.makeNumericProp)(1),
  detailMaxlength: (0, import_utils.makeNumericProp)(200),
  areaColumnsPlaceholder: (0, import_utils.makeArrayProp)(),
  addressInfo: {
    type: Object,
    default: () => (0, import_utils.extend)({}, DEFAULT_DATA)
  },
  telValidator: {
    type: Function,
    default: import_utils.isMobile
  },
  postalValidator: {
    type: Function,
    default: isPostal
  }
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: addressEditProps,
  emits: ["save", "focus", "delete", "click-area", "change-area", "change-detail", "select-search", "change-default"],
  setup(props, {
    emit,
    slots
  }) {
    const areaRef = (0, import_vue2.ref)();
    const data = (0, import_vue2.reactive)({});
    const showAreaPopup = (0, import_vue2.ref)(false);
    const detailFocused = (0, import_vue2.ref)(false);
    const areaListLoaded = (0, import_vue2.computed)(() => (0, import_utils.isObject)(props.areaList) && Object.keys(props.areaList).length);
    const areaText = (0, import_vue2.computed)(() => {
      const {
        country,
        province,
        city,
        county,
        areaCode
      } = data;
      if (areaCode) {
        const arr = [country, province, city, county];
        if (province && province === city) {
          arr.splice(1, 1);
        }
        return arr.filter(Boolean).join("/");
      }
      return "";
    });
    const hideBottomFields = (0, import_vue2.computed)(() => {
      var _a;
      return ((_a = props.searchResult) == null ? void 0 : _a.length) && detailFocused.value;
    });
    const assignAreaValues = () => {
      if (areaRef.value) {
        const detail = areaRef.value.getArea();
        detail.areaCode = detail.code;
        delete detail.code;
        (0, import_utils.extend)(data, detail);
      }
    };
    const onFocus = (key) => {
      detailFocused.value = key === "addressDetail";
      emit("focus", key);
    };
    const rules = (0, import_vue2.computed)(() => {
      const {
        validator,
        telValidator,
        postalValidator
      } = props;
      const makeRule = (name2, emptyMessage) => ({
        validator: (value) => {
          if (validator) {
            const message = validator(name2, value);
            if (message) {
              return message;
            }
          }
          if (!value) {
            return emptyMessage;
          }
          return true;
        }
      });
      return {
        name: [makeRule("name", t("nameEmpty"))],
        tel: [makeRule("tel", t("telInvalid")), {
          validator: telValidator,
          message: t("telInvalid")
        }],
        areaCode: [makeRule("areaCode", t("areaEmpty"))],
        addressDetail: [makeRule("addressDetail", t("addressEmpty"))],
        postalCode: [makeRule("addressDetail", t("postalEmpty")), {
          validator: postalValidator,
          message: t("postalEmpty")
        }]
      };
    });
    const onSave = () => emit("save", data);
    const onChangeDetail = (val) => {
      data.addressDetail = val;
      emit("change-detail", val);
    };
    const onAreaConfirm = (values) => {
      values = values.filter(Boolean);
      if (values.some((value) => !value.code)) {
        (0, import_toast.Toast)(t("areaEmpty"));
      } else {
        showAreaPopup.value = false;
        assignAreaValues();
        emit("change-area", values);
      }
    };
    const onDelete = () => emit("delete", data);
    const getArea = () => {
      var _a;
      return ((_a = areaRef.value) == null ? void 0 : _a.getValues()) || [];
    };
    const setAreaCode = (code) => {
      data.areaCode = code || "";
      if (code) {
        (0, import_vue2.nextTick)(assignAreaValues);
      }
    };
    const onDetailBlur = () => {
      setTimeout(() => {
        detailFocused.value = false;
      });
    };
    const setAddressDetail = (value) => {
      data.addressDetail = value;
    };
    const renderSetDefaultCell = () => {
      if (props.showSetDefault) {
        const slots2 = {
          "right-icon": () => (0, import_vue.createVNode)(import_switch.Switch, {
            "modelValue": data.isDefault,
            "onUpdate:modelValue": ($event) => data.isDefault = $event,
            "size": "24",
            "onChange": (event) => emit("change-default", event)
          }, null)
        };
        return (0, import_vue.withDirectives)((0, import_vue.createVNode)(import_cell.Cell, {
          "center": true,
          "title": t("defaultAddress"),
          "class": bem("default")
        }, slots2), [[import_vue.vShow, !hideBottomFields.value]]);
      }
    };
    (0, import_use_expose.useExpose)({
      getArea,
      setAreaCode,
      setAddressDetail
    });
    (0, import_vue2.watch)(() => props.areaList, () => setAreaCode(data.areaCode));
    (0, import_vue2.watch)(() => props.addressInfo, (value) => {
      (0, import_utils.extend)(data, DEFAULT_DATA, value);
      setAreaCode(value.areaCode);
    }, {
      deep: true,
      immediate: true
    });
    return () => {
      const {
        disableArea
      } = props;
      return (0, import_vue.createVNode)(import_form.Form, {
        "class": bem(),
        "onSubmit": onSave
      }, {
        default: () => {
          var _a;
          return [(0, import_vue.createVNode)("div", {
            "class": bem("fields")
          }, [(0, import_vue.createVNode)(import_field.Field, {
            "modelValue": data.name,
            "onUpdate:modelValue": ($event) => data.name = $event,
            "clearable": true,
            "label": t("name"),
            "rules": rules.value.name,
            "placeholder": t("name"),
            "onFocus": () => onFocus("name")
          }, null), (0, import_vue.createVNode)(import_field.Field, {
            "modelValue": data.tel,
            "onUpdate:modelValue": ($event) => data.tel = $event,
            "clearable": true,
            "type": "tel",
            "label": t("tel"),
            "rules": rules.value.tel,
            "maxlength": props.telMaxlength,
            "placeholder": t("tel"),
            "onFocus": () => onFocus("tel")
          }, null), (0, import_vue.withDirectives)((0, import_vue.createVNode)(import_field.Field, {
            "readonly": true,
            "label": t("area"),
            "is-link": !disableArea,
            "modelValue": areaText.value,
            "rules": rules.value.areaCode,
            "placeholder": props.areaPlaceholder || t("area"),
            "onFocus": () => onFocus("areaCode"),
            "onClick": () => {
              emit("click-area");
              showAreaPopup.value = !disableArea;
            }
          }, null), [[import_vue.vShow, props.showArea]]), (0, import_vue.createVNode)(import_AddressEditDetail.default, {
            "show": props.showDetail,
            "rows": props.detailRows,
            "rules": rules.value.addressDetail,
            "value": data.addressDetail,
            "focused": detailFocused.value,
            "maxlength": props.detailMaxlength,
            "searchResult": props.searchResult,
            "showSearchResult": props.showSearchResult,
            "onBlur": onDetailBlur,
            "onFocus": () => onFocus("addressDetail"),
            "onInput": onChangeDetail,
            "onSelect-search": (event) => emit("select-search", event)
          }, null), props.showPostal && (0, import_vue.withDirectives)((0, import_vue.createVNode)(import_field.Field, {
            "modelValue": data.postalCode,
            "onUpdate:modelValue": ($event) => data.postalCode = $event,
            "type": "tel",
            "rules": rules.value.postalCode,
            "label": t("postal"),
            "maxlength": "6",
            "placeholder": t("postal"),
            "onFocus": () => onFocus("postalCode")
          }, null), [[import_vue.vShow, !hideBottomFields.value]]), (_a = slots.default) == null ? void 0 : _a.call(slots)]), renderSetDefaultCell(), (0, import_vue.withDirectives)((0, import_vue.createVNode)("div", {
            "class": bem("buttons")
          }, [(0, import_vue.createVNode)(import_button.Button, {
            "block": true,
            "round": true,
            "type": "danger",
            "text": props.saveButtonText || t("save"),
            "class": bem("button"),
            "loading": props.isSaving,
            "nativeType": "submit"
          }, null), props.showDelete && (0, import_vue.createVNode)(import_button.Button, {
            "block": true,
            "round": true,
            "class": bem("button"),
            "loading": props.isDeleting,
            "text": props.deleteButtonText || t("delete"),
            "onClick": onDelete
          }, null)]), [[import_vue.vShow, !hideBottomFields.value]]), (0, import_vue.createVNode)(import_popup.Popup, {
            "show": showAreaPopup.value,
            "onUpdate:show": ($event) => showAreaPopup.value = $event,
            "round": true,
            "teleport": "body",
            "position": "bottom",
            "lazyRender": false
          }, {
            default: () => [(0, import_vue.createVNode)(import_area.Area, {
              "ref": areaRef,
              "value": data.areaCode,
              "loading": !areaListLoaded.value,
              "areaList": props.areaList,
              "columnsPlaceholder": props.areaColumnsPlaceholder,
              "onConfirm": onAreaConfirm,
              "onCancel": () => {
                showAreaPopup.value = false;
              }
            }, null)]
          })];
        }
      });
    };
  }
});
