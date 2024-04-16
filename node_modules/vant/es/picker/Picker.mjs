import { createVNode as _createVNode } from "vue";
import { ref, watch, computed, defineComponent } from "vue";
import { extend, unitToPx, truthProp, makeArrayProp, preventDefault, makeStringProp, makeNumericProp, createNamespace, HAPTICS_FEEDBACK, BORDER_UNSET_TOP_BOTTOM } from "../utils/index.mjs";
import { useChildren, useEventListener } from "@vant/use";
import { useExpose } from "../composables/use-expose.mjs";
import { Loading } from "../loading/index.mjs";
import Column, { PICKER_KEY } from "./PickerColumn.mjs";
const [name, bem, t] = createNamespace("picker");
const pickerSharedProps = {
  title: String,
  loading: Boolean,
  readonly: Boolean,
  allowHtml: Boolean,
  itemHeight: makeNumericProp(44),
  showToolbar: truthProp,
  swipeDuration: makeNumericProp(1e3),
  visibleItemCount: makeNumericProp(6),
  cancelButtonText: String,
  confirmButtonText: String
};
const pickerProps = extend({}, pickerSharedProps, {
  columns: makeArrayProp(),
  valueKey: String,
  defaultIndex: makeNumericProp(0),
  toolbarPosition: makeStringProp("top"),
  columnsFieldNames: Object
});
var stdin_default = defineComponent({
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
    const hasOptions = ref(false);
    const columnsRef = ref();
    const formattedColumns = ref([]);
    const columnsFieldNames = computed(() => {
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
    } = useChildren(PICKER_KEY);
    linkChildren();
    const itemHeight = computed(() => unitToPx(props.itemHeight));
    const dataType = computed(() => {
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
        return _createVNode("div", {
          "class": [bem("title"), "van-ellipsis"]
        }, [props.title]);
      }
    };
    const renderCancel = () => {
      const text = props.cancelButtonText || t("cancel");
      return _createVNode("button", {
        "type": "button",
        "class": [bem("cancel"), HAPTICS_FEEDBACK],
        "onClick": cancel
      }, [slots.cancel ? slots.cancel() : text]);
    };
    const renderConfirm = () => {
      const text = props.confirmButtonText || t("confirm");
      return _createVNode("button", {
        "type": "button",
        "class": [bem("confirm"), HAPTICS_FEEDBACK],
        "onClick": confirm
      }, [slots.confirm ? slots.confirm() : text]);
    };
    const renderToolbar = () => {
      if (props.showToolbar) {
        const slot = slots.toolbar || slots.default;
        return _createVNode("div", {
          "class": bem("toolbar")
        }, [slot ? slot() : [renderCancel(), renderTitle(), renderConfirm()]]);
      }
    };
    const renderColumnItems = () => formattedColumns.value.map((item, columnIndex) => {
      var _a;
      return _createVNode(Column, {
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
        return [_createVNode("div", {
          "class": bem("mask"),
          "style": maskStyle
        }, null), _createVNode("div", {
          "class": [BORDER_UNSET_TOP_BOTTOM, bem("frame")],
          "style": frameStyle
        }, null)];
      }
    };
    const renderColumns = () => {
      const wrapHeight = itemHeight.value * +props.visibleItemCount;
      const columnsStyle = {
        height: `${wrapHeight}px`
      };
      return _createVNode("div", {
        "ref": columnsRef,
        "class": bem("columns"),
        "style": columnsStyle
      }, [renderColumnItems(), renderMask(wrapHeight)]);
    };
    watch(() => props.columns, format, {
      immediate: true
    });
    useEventListener("touchmove", preventDefault, {
      target: columnsRef
    });
    useExpose({
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
      return _createVNode("div", {
        "class": bem()
      }, [props.toolbarPosition === "top" ? renderToolbar() : null, props.loading ? _createVNode(Loading, {
        "class": bem("loading")
      }, null) : null, (_a = slots["columns-top"]) == null ? void 0 : _a.call(slots), renderColumns(), (_b = slots["columns-bottom"]) == null ? void 0 : _b.call(slots), props.toolbarPosition === "bottom" ? renderToolbar() : null]);
    };
  }
});
export {
  stdin_default as default,
  pickerSharedProps
};
