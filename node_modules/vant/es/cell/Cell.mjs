import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { isDef, extend, truthProp, unknownProp, numericProp, createNamespace } from "../utils/index.mjs";
import { useRoute, routeProps } from "../composables/use-route.mjs";
import { Icon } from "../icon/index.mjs";
const [name, bem] = createNamespace("cell");
const cellSharedProps = {
  icon: String,
  size: String,
  title: numericProp,
  value: numericProp,
  label: numericProp,
  center: Boolean,
  isLink: Boolean,
  border: truthProp,
  required: Boolean,
  iconPrefix: String,
  valueClass: unknownProp,
  labelClass: unknownProp,
  titleClass: unknownProp,
  titleStyle: null,
  arrowDirection: String,
  clickable: {
    type: Boolean,
    default: null
  }
};
const cellProps = extend({}, cellSharedProps, routeProps);
var stdin_default = defineComponent({
  name,
  props: cellProps,
  setup(props, {
    slots
  }) {
    const route = useRoute();
    const renderLabel = () => {
      const showLabel = slots.label || isDef(props.label);
      if (showLabel) {
        return _createVNode("div", {
          "class": [bem("label"), props.labelClass]
        }, [slots.label ? slots.label() : props.label]);
      }
    };
    const renderTitle = () => {
      if (slots.title || isDef(props.title)) {
        return _createVNode("div", {
          "class": [bem("title"), props.titleClass],
          "style": props.titleStyle
        }, [slots.title ? slots.title() : _createVNode("span", null, [props.title]), renderLabel()]);
      }
    };
    const renderValue = () => {
      const slot = slots.value || slots.default;
      const hasValue = slot || isDef(props.value);
      if (hasValue) {
        const hasTitle = slots.title || isDef(props.title);
        return _createVNode("div", {
          "class": [bem("value", {
            alone: !hasTitle
          }), props.valueClass]
        }, [slot ? slot() : _createVNode("span", null, [props.value])]);
      }
    };
    const renderLeftIcon = () => {
      if (slots.icon) {
        return slots.icon();
      }
      if (props.icon) {
        return _createVNode(Icon, {
          "name": props.icon,
          "class": bem("left-icon"),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };
    const renderRightIcon = () => {
      if (slots["right-icon"]) {
        return slots["right-icon"]();
      }
      if (props.isLink) {
        const name2 = props.arrowDirection && props.arrowDirection !== "right" ? `arrow-${props.arrowDirection}` : "arrow";
        return _createVNode(Icon, {
          "name": name2,
          "class": bem("right-icon")
        }, null);
      }
    };
    return () => {
      var _a, _b;
      const {
        size,
        center,
        border,
        isLink,
        required
      } = props;
      const clickable = (_a = props.clickable) != null ? _a : isLink;
      const classes = {
        center,
        required,
        clickable,
        borderless: !border
      };
      if (size) {
        classes[size] = !!size;
      }
      return _createVNode("div", {
        "class": bem(classes),
        "role": clickable ? "button" : void 0,
        "tabindex": clickable ? 0 : void 0,
        "onClick": route
      }, [renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), (_b = slots.extra) == null ? void 0 : _b.call(slots)]);
    };
  }
});
export {
  cellSharedProps,
  stdin_default as default
};
