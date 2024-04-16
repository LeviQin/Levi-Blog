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
  default: () => stdin_default,
  pickerSharedProps: () => pickerSharedProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_expose = require("../composables/use-expose");
var import_loading = require("../loading");
var import_PickerColumn = __toESM(require("./PickerColumn"));
const [name, bem, t] = (0, import_utils.createNamespace)("picker");
const pickerSharedProps = {
  title: String,
  loading: Boolean,
  readonly: Boolean,
  allowHtml: Boolean,
  itemHeight: (0, import_utils.makeNumericProp)(44),
  showToolbar: import_utils.truthProp,
  swipeDuration: (0, import_utils.makeNumericProp)(1e3),
  visibleItemCount: (0, import_utils.makeNumericProp)(6),
  cancelButtonText: String,
  confirmButtonText: String
};
const pickerProps = (0, import_utils.extend)({}, pickerSharedProps, {
  columns: (0, import_utils.makeArrayProp)(),
  valueKey: String,
  defaultIndex: (0, import_utils.makeNumericProp)(0),
  toolbarPosition: (0, import_utils.makeStringProp)("top"),
  columnsFieldNames: Object
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: pickerProps,
  emits: ["confirm", "cancel", "change"],
  setup(props, {
    emit,
    slots
  }) {
    if (process.env.NODE_ENV !== "production") {
      if (slots.default) {
        console.warn('[Vant] Picker: "default" slot is deprecated, please use "toolbar" slot instead.');
      }
      if (props.valueKey) {
        console.warn('[Vant] Picker: "valueKey" prop is deprecated, please use "columnsFieldNames" prop instead.');
      }
    }
    const hasOptions = (0, import_vue2.ref)(false);
    const columnsRef = (0, import_vue2.ref)();
    const formattedColumns = (0, import_vue2.ref)([]);
    const columnsFieldNames = (0, import_vue2.computed)(() => {
      const {
        columnsFieldNames: columnsFieldNames2
      } = props;
      return {
        text: (columnsFieldNames2 == null ? void 0 : columnsFieldNames2.text) || props.valueKey || "text",
        values: (columnsFieldNames2 == null ? void 0 : columnsFieldNames2.values) || "values",
        children: (columnsFieldNames2 == null ? void 0 : columnsFieldNames2.children) || "children"
      };
    });
    const {
      children,
      linkChildren
    } = (0, import_use.useChildren)(import_PickerColumn.PICKER_KEY);
    linkChildren();
    const itemHeight = (0, import_vue2.computed)(() => (0, import_utils.unitToPx)(props.itemHeight));
    const dataType = (0, import_vue2.computed)(() => {
      const firstColumn = props.columns[0];
      if (typeof firstColumn === "object") {
        if (columnsFieldNames.value.children in firstColumn) {
          return "cascade";
        }
        if (columnsFieldNames.value.values in firstColumn) {
          return "object";
        }
      }
      return "plain";
    });
    const formatCascade = () => {
      var _a;
      const formatted = [];
      let cursor = {
        [columnsFieldNames.value.children]: props.columns
      };
      while (cursor && cursor[columnsFieldNames.value.children]) {
        const children2 = cursor[columnsFieldNames.value.children];
        let defaultIndex = (_a = cursor.defaultIndex) != null ? _a : +props.defaultIndex;
        while (children2[defaultIndex] && children2[defaultIndex].disabled) {
          if (defaultIndex < children2.length - 1) {
            defaultIndex++;
          } else {
            defaultIndex = 0;
            break;
          }
        }
        formatted.push({
          [columnsFieldNames.value.values]: cursor[columnsFieldNames.value.children],
          className: cursor.className,
          defaultIndex
        });
        cursor = children2[defaultIndex];
      }
      formattedColumns.value = formatted;
    };
    const format = () => {
      const {
        columns
      } = props;
      if (dataType.value === "plain") {
        formattedColumns.value = [{
          [columnsFieldNames.value.values]: columns
        }];
      } else if (dataType.value === "cascade") {
        formatCascade();
      } else {
        formattedColumns.value = columns;
      }
      hasOptions.value = formattedColumns.value.some((item) => item[columnsFieldNames.value.values] && item[columnsFieldNames.value.values].length !== 0) || children.some((item) => item.hasOptions);
    };
    const getIndexes = () => children.map((child) => child.state.index);
    const setColumnValues = (index, options) => {
      const column = children[index];
      if (column) {
        column.setOptions(options);
        hasOptions.value = true;
      }
    };
    const onCascadeChange = (columnIndex) => {
      let cursor = {
        [columnsFieldNames.value.children]: props.columns
      };
      const indexes = getIndexes();
      for (let i = 0; i <= columnIndex; i++) {
        cursor = cursor[columnsFieldNames.value.children][indexes[i]];
      }
      while (cursor && cursor[columnsFieldNames.value.children]) {
        columnIndex++;
        setColumnValues(columnIndex, cursor[columnsFieldNames.value.children]);
        cursor = cursor[columnsFieldNames.value.children][cursor.defaultIndex || 0];
      }
    };
    const getChild = (index) => children[index];
    const getColumnValue = (index) => {
      const column = getChild(index);
      if (column) {
        return column.getValue();
      }
    };
    const setColumnValue = (index, value) => {
      const column = getChild(index);
      if (column) {
        column.setValue(value);
        if (dataType.value === "cascade") {
          onCascadeChange(index);
        }
      }
    };
    const getColumnIndex = (index) => {
      const column = getChild(index);
      if (column) {
        return column.state.index;
      }
    };
    const setColumnIndex = (columnIndex, optionIndex) => {
      const column = getChild(columnIndex);
      if (column) {
        column.setIndex(optionIndex);
        if (dataType.value === "cascade") {
          onCascadeChange(columnIndex);
        }
      }
    };
    const getColumnValues = (index) => {
      const column = getChild(index);
      if (column) {
        return column.state.options;
      }
    };
    const getValues = () => children.map((child) => child.getValue());
    const setValues = (values) => {
      values.forEach((value, index) => {
        setColumnValue(index, value);
      });
    };
    const setIndexes = (indexes) => {
      indexes.forEach((optionIndex, columnIndex) => {
        setColumnIndex(columnIndex, optionIndex);
      });
    };
    const emitAction = (event) => {
      if (dataType.value === "plain") {
        emit(event, getColumnValue(0), getColumnIndex(0));
      } else {
        emit(event, getValues(), getIndexes());
      }
    };
    const onChange = (columnIndex) => {
      if (dataType.value === "cascade") {
        onCascadeChange(columnIndex);
      }
      if (dataType.value === "plain") {
        emit("change", getColumnValue(0), getColumnIndex(0));
      } else {
        emit("change", getValues(), columnIndex);
      }
    };
    const confirm = () => {
      children.forEach((child) => child.stopMomentum());
      emitAction("confirm");
    };
    const cancel = () => emitAction("cancel");
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props.title) {
        return (0, import_vue.createVNode)("div", {
          "class": [bem("title"), "van-ellipsis"]
        }, [props.title]);
      }
    };
    const renderCancel = () => {
      const text = props.cancelButtonText || t("cancel");
      return (0, import_vue.createVNode)("button", {
        "type": "button",
        "class": [bem("cancel"), import_utils.HAPTICS_FEEDBACK],
        "onClick": cancel
      }, [slots.cancel ? slots.cancel() : text]);
    };
    const renderConfirm = () => {
      const text = props.confirmButtonText || t("confirm");
      return (0, import_vue.createVNode)("button", {
        "type": "button",
        "class": [bem("confirm"), import_utils.HAPTICS_FEEDBACK],
        "onClick": confirm
      }, [slots.confirm ? slots.confirm() : text]);
    };
    const renderToolbar = () => {
      if (props.showToolbar) {
        const slot = slots.toolbar || slots.default;
        return (0, import_vue.createVNode)("div", {
          "class": bem("toolbar")
        }, [slot ? slot() : [renderCancel(), renderTitle(), renderConfirm()]]);
      }
    };
    const renderColumnItems = () => formattedColumns.value.map((item, columnIndex) => {
      var _a;
      return (0, import_vue.createVNode)(import_PickerColumn.default, {
        "textKey": columnsFieldNames.value.text,
        "readonly": props.readonly,
        "allowHtml": props.allowHtml,
        "className": item.className,
        "itemHeight": itemHeight.value,
        "defaultIndex": (_a = item.defaultIndex) != null ? _a : +props.defaultIndex,
        "swipeDuration": props.swipeDuration,
        "initialOptions": item[columnsFieldNames.value.values],
        "visibleItemCount": props.visibleItemCount,
        "onChange": () => onChange(columnIndex)
      }, {
        option: slots.option
      });
    });
    const renderMask = (wrapHeight) => {
      if (hasOptions.value) {
        const frameStyle = {
          height: `${itemHeight.value}px`
        };
        const maskStyle = {
          backgroundSize: `100% ${(wrapHeight - itemHeight.value) / 2}px`
        };
        return [(0, import_vue.createVNode)("div", {
          "class": bem("mask"),
          "style": maskStyle
        }, null), (0, import_vue.createVNode)("div", {
          "class": [import_utils.BORDER_UNSET_TOP_BOTTOM, bem("frame")],
          "style": frameStyle
        }, null)];
      }
    };
    const renderColumns = () => {
      const wrapHeight = itemHeight.value * +props.visibleItemCount;
      const columnsStyle = {
        height: `${wrapHeight}px`
      };
      return (0, import_vue.createVNode)("div", {
        "ref": columnsRef,
        "class": bem("columns"),
        "style": columnsStyle
      }, [renderColumnItems(), renderMask(wrapHeight)]);
    };
    (0, import_vue2.watch)(() => props.columns, format, {
      immediate: true
    });
    (0, import_use.useEventListener)("touchmove", import_utils.preventDefault, {
      target: columnsRef
    });
    (0, import_use_expose.useExpose)({
      confirm,
      getValues,
      setValues,
      getIndexes,
      setIndexes,
      getColumnIndex,
      setColumnIndex,
      getColumnValue,
      setColumnValue,
      getColumnValues,
      setColumnValues
    });
    return () => {
      var _a, _b;
      return (0, import_vue.createVNode)("div", {
        "class": bem()
      }, [props.toolbarPosition === "top" ? renderToolbar() : null, props.loading ? (0, import_vue.createVNode)(import_loading.Loading, {
        "class": bem("loading")
      }, null) : null, (_a = slots["columns-top"]) == null ? void 0 : _a.call(slots), renderColumns(), (_b = slots["columns-bottom"]) == null ? void 0 : _b.call(slots), props.toolbarPosition === "bottom" ? renderToolbar() : null]);
    };
  }
});
