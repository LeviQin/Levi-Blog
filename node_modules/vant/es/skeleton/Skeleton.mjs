import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { addUnit, truthProp, numericProp, getSizeStyle, makeStringProp, makeNumericProp, createNamespace } from "../utils/index.mjs";
const [name, bem] = createNamespace("skeleton");
const DEFAULT_ROW_WIDTH = "100%";
const DEFAULT_LAST_ROW_WIDTH = "60%";
const skeletonProps = {
  row: makeNumericProp(0),
  title: Boolean,
  round: Boolean,
  avatar: Boolean,
  loading: truthProp,
  animate: truthProp,
  avatarSize: numericProp,
  titleWidth: numericProp,
  avatarShape: makeStringProp("round"),
  rowWidth: {
    type: [Number, String, Array],
    default: DEFAULT_ROW_WIDTH
  }
};
var stdin_default = defineComponent({
  name,
  inheritAttrs: false,
  props: skeletonProps,
  setup(props, {
    slots,
    attrs
  }) {
    const renderAvatar = () => {
      if (props.avatar) {
        return _createVNode("div", {
          "class": bem("avatar", props.avatarShape),
          "style": getSizeStyle(props.avatarSize)
        }, null);
      }
    };
    const renderTitle = () => {
      if (props.title) {
        return _createVNode("h3", {
          "class": bem("title"),
          "style": {
            width: addUnit(props.titleWidth)
          }
        }, null);
      }
    };
    const getRowWidth = (index) => {
      const {
        rowWidth
      } = props;
      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }
      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }
      return rowWidth;
    };
    const renderRows = () => Array(+props.row).fill("").map((_, i) => _createVNode("div", {
      "class": bem("row"),
      "style": {
        width: addUnit(getRowWidth(i))
      }
    }, null));
    return () => {
      var _a;
      if (!props.loading) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      return _createVNode("div", _mergeProps({
        "class": bem({
          animate: props.animate,
          round: props.round
        })
      }, attrs), [renderAvatar(), _createVNode("div", {
        "class": bem("content")
      }, [renderTitle(), renderRows()])]);
    };
  }
});
export {
  stdin_default as default
};
