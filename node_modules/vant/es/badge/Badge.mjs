import { createVNode as _createVNode } from "vue";
import { computed, defineComponent } from "vue";
import { isDef, addUnit, isNumeric, truthProp, numericProp, makeStringProp, createNamespace } from "../utils/index.mjs";
const [name, bem] = createNamespace("badge");
const badgeProps = {
  dot: Boolean,
  max: numericProp,
  tag: makeStringProp("div"),
  color: String,
  offset: Array,
  content: numericProp,
  showZero: truthProp,
  position: makeStringProp("top-right")
};
var stdin_default = defineComponent({
  name,
  props: badgeProps,
  setup(props, {
    slots
  }) {
    const hasContent = () => {
      if (slots.content) {
        return true;
      }
      const {
        content,
        showZero
      } = props;
      return isDef(content) && content !== "" && (showZero || content !== 0 && content !== "0");
    };
    const renderContent = () => {
      const {
        dot,
        max,
        content
      } = props;
      if (!dot && hasContent()) {
        if (slots.content) {
          return slots.content();
        }
        if (isDef(max) && isNumeric(content) && +content > max) {
          return `${max}+`;
        }
        return content;
      }
    };
    const style = computed(() => {
      const style2 = {
        background: props.color
      };
      if (props.offset) {
        const [x, y] = props.offset;
        if (slots.default) {
          style2.top = addUnit(y);
          if (typeof x === "number") {
            style2.right = addUnit(-x);
          } else {
            style2.right = x.startsWith("-") ? x.replace("-", "") : `-${x}`;
          }
        } else {
          style2.marginTop = addUnit(y);
          style2.marginLeft = addUnit(x);
        }
      }
      return style2;
    });
    const renderBadge = () => {
      if (hasContent() || props.dot) {
        return _createVNode("div", {
          "class": bem([props.position, {
            dot: props.dot,
            fixed: !!slots.default
          }]),
          "style": style.value
        }, [renderContent()]);
      }
    };
    return () => {
      if (slots.default) {
        const {
          tag
        } = props;
        return _createVNode(tag, {
          "class": bem("wrapper")
        }, {
          default: () => [slots.default(), renderBadge()]
        });
      }
      return renderBadge();
    };
  }
});
export {
  stdin_default as default
};
