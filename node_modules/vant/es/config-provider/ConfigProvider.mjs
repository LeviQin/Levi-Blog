import { createVNode as _createVNode } from "vue";
import { provide, computed, watchEffect, defineComponent } from "vue";
import { kebabCase, makeStringProp, createNamespace } from "../utils/index.mjs";
import { setGlobalZIndex } from "../composables/use-global-z-index.mjs";
const [name, bem] = createNamespace("config-provider");
const CONFIG_PROVIDER_KEY = Symbol(name);
const configProviderProps = {
  tag: makeStringProp("div"),
  zIndex: Number,
  themeVars: Object,
  iconPrefix: String
};
function mapThemeVarsToCSSVars(themeVars) {
  const cssVars = {};
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--van-${kebabCase(key)}`] = themeVars[key];
  });
  return cssVars;
}
var stdin_default = defineComponent({
  name,
  props: configProviderProps,
  setup(props, {
    slots
  }) {
    const style = computed(() => {
      if (props.themeVars) {
        return mapThemeVarsToCSSVars(props.themeVars);
      }
    });
    provide(CONFIG_PROVIDER_KEY, props);
    watchEffect(() => {
      if (props.zIndex !== void 0) {
        setGlobalZIndex(props.zIndex);
      }
    });
    return () => _createVNode(props.tag, {
      "class": bem(),
      "style": style.value
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
      }
    });
  }
});
export {
  CONFIG_PROVIDER_KEY,
  stdin_default as default
};
