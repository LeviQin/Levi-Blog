import { withDirectives as _withDirectives, vShow as _vShow, createVNode as _createVNode } from "vue";
import { ref, watch, provide, computed, nextTick, defineComponent } from "vue";
import { extend, truthProp, unknownProp, numericProp, createNamespace } from "../utils/index.mjs";
import { TABS_KEY } from "../tabs/Tabs.mjs";
import { doubleRaf, useParent } from "@vant/use";
import { useId } from "../composables/use-id.mjs";
import { useExpose } from "../composables/use-expose.mjs";
import { routeProps } from "../composables/use-route.mjs";
import { TAB_STATUS_KEY } from "../composables/use-tab-status.mjs";
import { SwipeItem } from "../swipe-item/index.mjs";
const [name, bem] = createNamespace("tab");
const tabProps = extend({}, routeProps, {
  dot: Boolean,
  name: numericProp,
  badge: numericProp,
  title: String,
  disabled: Boolean,
  titleClass: unknownProp,
  titleStyle: [String, Object],
  showZeroBadge: truthProp
});
var stdin_default = defineComponent({
  name,
  props: tabProps,
  setup(props, {
    slots
  }) {
    const id = useId();
    const inited = ref(false);
    const {
      parent,
      index
    } = useParent(TABS_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <Tab> must be a child component of <Tabs>.");
      }
      return;
    }
    const getName = () => {
      var _a;
      return (_a = props.name) != null ? _a : index.value;
    };
    const init = () => {
      inited.value = true;
      if (parent.props.lazyRender) {
        nextTick(() => {
          parent.onRendered(getName(), props.title);
        });
      }
    };
    const active = computed(() => {
      const isActive = getName() === parent.currentName.value;
      if (isActive && !inited.value) {
        init();
      }
      return isActive;
    });
    const hasInactiveClass = ref(!active.value);
    watch(active, (val) => {
      if (val) {
        hasInactiveClass.value = false;
      } else {
        doubleRaf(() => {
          hasInactiveClass.value = true;
        });
      }
    });
    watch(() => props.title, () => {
      parent.setLine();
      parent.scrollIntoView();
    });
    provide(TAB_STATUS_KEY, active);
    return () => {
      var _a;
      const label = `${parent.id}-${index.value}`;
      const {
        animated,
        swipeable,
        scrollspy,
        lazyRender
      } = parent.props;
      if (!slots.default && !animated) {
        return;
      }
      const show = scrollspy || active.value;
      if (animated || swipeable) {
        return _createVNode(SwipeItem, {
          "id": id,
          "role": "tabpanel",
          "class": bem("panel-wrapper", {
            inactive: hasInactiveClass.value
          }),
          "tabindex": active.value ? 0 : -1,
          "aria-hidden": !active.value,
          "aria-labelledby": label
        }, {
          default: () => {
            var _a2;
            return [_createVNode("div", {
              "class": bem("panel")
            }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])];
          }
        });
      }
      const shouldRender = inited.value || scrollspy || !lazyRender;
      const Content = shouldRender ? (_a = slots.default) == null ? void 0 : _a.call(slots) : null;
      useExpose({
        id
      });
      return _withDirectives(_createVNode("div", {
        "id": id,
        "role": "tabpanel",
        "class": bem("panel"),
        "tabindex": show ? 0 : -1,
        "aria-labelledby": label
      }, [Content]), [[_vShow, show]]);
    };
  }
});
export {
  stdin_default as default
};
