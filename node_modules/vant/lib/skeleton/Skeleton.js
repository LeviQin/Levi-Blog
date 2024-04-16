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
const [name, bem] = (0, import_utils.createNamespace)("skeleton");
const DEFAULT_ROW_WIDTH = "100%";
const DEFAULT_LAST_ROW_WIDTH = "60%";
const skeletonProps = {
  row: (0, import_utils.makeNumericProp)(0),
  title: Boolean,
  round: Boolean,
  avatar: Boolean,
  loading: import_utils.truthProp,
  animate: import_utils.truthProp,
  avatarSize: import_utils.numericProp,
  titleWidth: import_utils.numericProp,
  avatarShape: (0, import_utils.makeStringProp)("round"),
  rowWidth: {
    type: [Number, String, Array],
    default: DEFAULT_ROW_WIDTH
  }
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  inheritAttrs: false,
  props: skeletonProps,
  setup(props, {
    slots,
    attrs
  }) {
    const renderAvatar = () => {
      if (props.avatar) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("avatar", props.avatarShape),
          "style": (0, import_utils.getSizeStyle)(props.avatarSize)
        }, null);
      }
    };
    const renderTitle = () => {
      if (props.title) {
        return (0, import_vue.createVNode)("h3", {
          "class": bem("title"),
          "style": {
            width: (0, import_utils.addUnit)(props.titleWidth)
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
    const renderRows = () => Array(+props.row).fill("").map((_, i) => (0, import_vue.createVNode)("div", {
      "class": bem("row"),
      "style": {
        width: (0, import_utils.addUnit)(getRowWidth(i))
      }
    }, null));
    return () => {
      var _a;
      if (!props.loading) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      return (0, import_vue.createVNode)("div", (0, import_vue.mergeProps)({
        "class": bem({
          animate: props.animate,
          round: props.round
        })
      }, attrs), [renderAvatar(), (0, import_vue.createVNode)("div", {
        "class": bem("content")
      }, [renderTitle(), renderRows()])]);
    };
  }
});
