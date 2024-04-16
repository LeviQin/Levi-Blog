import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { ref, watch, computed, reactive, nextTick, onActivated, defineComponent, getCurrentInstance } from "vue";
import { pick, isDef, addUnit, isHidden, unitToPx, truthProp, numericProp, windowWidth, getElementTop, makeStringProp, callInterceptor, createNamespace, makeNumericProp, setRootScrollTop, BORDER_TOP_BOTTOM } from "../utils/index.mjs";
import { scrollLeftTo, scrollTopTo } from "./utils.mjs";
import { useRect, useChildren, useScrollParent, useEventListener, onMountedOrActivated } from "@vant/use";
import { useId } from "../composables/use-id.mjs";
import { route } from "../composables/use-route.mjs";
import { useRefs } from "../composables/use-refs.mjs";
import { useExpose } from "../composables/use-expose.mjs";
import { onPopupReopen } from "../composables/on-popup-reopen.mjs";
import { Sticky } from "../sticky/index.mjs";
import TabsTitle from "./TabsTitle.mjs";
import TabsContent from "./TabsContent.mjs";
const [name, bem] = createNamespace("tabs");
const tabsProps = {
  type: makeStringProp("line"),
  color: String,
  border: Boolean,
  sticky: Boolean,
  shrink: Boolean,
  active: makeNumericProp(0),
  duration: makeNumericProp(0.3),
  animated: Boolean,
  ellipsis: truthProp,
  swipeable: Boolean,
  scrollspy: Boolean,
  offsetTop: makeNumericProp(0),
  background: String,
  lazyRender: truthProp,
  lineWidth: numericProp,
  lineHeight: numericProp,
  beforeChange: Function,
  swipeThreshold: makeNumericProp(5),
  titleActiveColor: String,
  titleInactiveColor: String
};
const TABS_KEY = Symbol(name);
var stdin_default = defineComponent({
  name,
  props: tabsProps,
  emits: ["click", "change", "scroll", "disabled", "rendered", "click-tab", "update:active"],
  setup(props, {
    emit,
    slots
  }) {
    var _a, _b;
    if (process.env.NODE_ENV !== "production") {
      const props2 = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.vnode) == null ? void 0 : _b.props;
      if (props2 && "onClick" in props2) {
        console.warn('[Vant] Tabs: "click" event is deprecated, using "click-tab" instead.');
      }
      if (props2 && "onDisabled" in props2) {
        console.warn('[Vant] Tabs: "disabled" event is deprecated, using "click-tab" instead.');
      }
    }
    let tabHeight;
    let lockScroll;
    let stickyFixed;
    const root = ref();
    const navRef = ref();
    const wrapRef = ref();
    const contentRef = ref();
    const id = useId();
    const scroller = useScrollParent(root);
    const [titleRefs, setTitleRefs] = useRefs();
    const {
      children,
      linkChildren
    } = useChildren(TABS_KEY);
    const state = reactive({
      inited: false,
      position: "",
      lineStyle: {},
      currentIndex: -1
    });
    const scrollable = computed(() => children.length > props.swipeThreshold || !props.ellipsis || props.shrink);
    const navStyle = computed(() => ({
      borderColor: props.color,
      background: props.background
    }));
    const getTabName = (tab, index) => {
      var _a2;
      return (_a2 = tab.name) != null ? _a2 : index;
    };
    const currentName = computed(() => {
      const activeTab = children[state.currentIndex];
      if (activeTab) {
        return getTabName(activeTab, state.currentIndex);
      }
    });
    const offsetTopPx = computed(() => unitToPx(props.offsetTop));
    const scrollOffset = computed(() => {
      if (props.sticky) {
        return offsetTopPx.value + tabHeight;
      }
      return 0;
    });
    const scrollIntoView = (immediate) => {
      const nav = navRef.value;
      const titles = titleRefs.value;
      if (!scrollable.value || !nav || !titles || !titles[state.currentIndex]) {
        return;
      }
      const title = titles[state.currentIndex].$el;
      const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
      scrollLeftTo(nav, to, immediate ? 0 : +props.duration);
    };
    const setLine = () => {
      const shouldAnimate = state.inited;
      nextTick(() => {
        const titles = titleRefs.value;
        if (!titles || !titles[state.currentIndex] || props.type !== "line" || isHidden(root.value)) {
          return;
        }
        const title = titles[state.currentIndex].$el;
        const {
          lineWidth,
          lineHeight
        } = props;
        const left = title.offsetLeft + title.offsetWidth / 2;
        const lineStyle = {
          width: addUnit(lineWidth),
          backgroundColor: props.color,
          transform: `translateX(${left}px) translateX(-50%)`
        };
        if (shouldAnimate) {
          lineStyle.transitionDuration = `${props.duration}s`;
        }
        if (isDef(lineHeight)) {
          const height = addUnit(lineHeight);
          lineStyle.height = height;
          lineStyle.borderRadius = height;
        }
        state.lineStyle = lineStyle;
      });
    };
    const findAvailableTab = (index) => {
      const diff = index < state.currentIndex ? -1 : 1;
      while (index >= 0 && index < children.length) {
        if (!children[index].disabled) {
          return index;
        }
        index += diff;
      }
    };
    const setCurrentIndex = (currentIndex, skipScrollIntoView) => {
      const newIndex = findAvailableTab(currentIndex);
      if (!isDef(newIndex)) {
        return;
      }
      const newTab = children[newIndex];
      const newName = getTabName(newTab, newIndex);
      const shouldEmitChange = state.currentIndex !== null;
      if (state.currentIndex !== newIndex) {
        state.currentIndex = newIndex;
        if (!skipScrollIntoView) {
          scrollIntoView();
        }
        setLine();
      }
      if (newName !== props.active) {
        emit("update:active", newName);
        if (shouldEmitChange) {
          emit("change", newName, newTab.title);
        }
      }
      if (stickyFixed && !props.scrollspy) {
        setRootScrollTop(Math.ceil(getElementTop(root.value) - offsetTopPx.value));
      }
    };
    const setCurrentIndexByName = (name2, skipScrollIntoView) => {
      const matched = children.find((tab, index2) => getTabName(tab, index2) === name2);
      const index = matched ? children.indexOf(matched) : 0;
      setCurrentIndex(index, skipScrollIntoView);
    };
    const scrollToCurrentContent = (immediate = false) => {
      if (props.scrollspy) {
        const target = children[state.currentIndex].$el;
        if (target && scroller.value) {
          const to = getElementTop(target, scroller.value) - scrollOffset.value;
          lockScroll = true;
          scrollTopTo(scroller.value, to, immediate ? 0 : +props.duration, () => {
            lockScroll = false;
          });
        }
      }
    };
    const onClickTab = (item, index, event) => {
      const {
        title,
        disabled
      } = children[index];
      const name2 = getTabName(children[index], index);
      if (disabled) {
        emit("disabled", name2, title);
      } else {
        callInterceptor(props.beforeChange, {
          args: [name2],
          done: () => {
            setCurrentIndex(index);
            scrollToCurrentContent();
          }
        });
        emit("click", name2, title);
        route(item);
      }
      emit("click-tab", {
        name: name2,
        title,
        event,
        disabled
      });
    };
    const onStickyScroll = (params) => {
      stickyFixed = params.isFixed;
      emit("scroll", params);
    };
    const scrollTo = (name2) => {
      nextTick(() => {
        setCurrentIndexByName(name2);
        scrollToCurrentContent(true);
      });
    };
    const getCurrentIndexOnScroll = () => {
      for (let index = 0; index < children.length; index++) {
        const {
          top
        } = useRect(children[index].$el);
        if (top > scrollOffset.value) {
          return index === 0 ? 0 : index - 1;
        }
      }
      return children.length - 1;
    };
    const onScroll = () => {
      if (props.scrollspy && !lockScroll) {
        const index = getCurrentIndexOnScroll();
        setCurrentIndex(index);
      }
    };
    const renderNav = () => children.map((item, index) => _createVNode(TabsTitle, _mergeProps({
      "key": item.id,
      "id": `${id}-${index}`,
      "ref": setTitleRefs(index),
      "type": props.type,
      "color": props.color,
      "style": item.titleStyle,
      "class": item.titleClass,
      "shrink": props.shrink,
      "isActive": index === state.currentIndex,
      "controls": item.id,
      "scrollable": scrollable.value,
      "activeColor": props.titleActiveColor,
      "inactiveColor": props.titleInactiveColor,
      "onClick": (event) => onClickTab(item, index, event)
    }, pick(item, ["dot", "badge", "title", "disabled", "showZeroBadge"])), {
      title: item.$slots.title
    }));
    const renderLine = () => {
      if (props.type === "line" && children.length) {
        return _createVNode("div", {
          "class": bem("line"),
          "style": state.lineStyle
        }, null);
      }
    };
    const renderHeader = () => {
      var _a2, _b2, _c;
      const {
        type,
        border,
        sticky
      } = props;
      const Header = [_createVNode("div", {
        "ref": sticky ? void 0 : wrapRef,
        "class": [bem("wrap"), {
          [BORDER_TOP_BOTTOM]: type === "line" && border
        }]
      }, [_createVNode("div", {
        "ref": navRef,
        "role": "tablist",
        "class": bem("nav", [type, {
          shrink: props.shrink,
          complete: scrollable.value
        }]),
        "style": navStyle.value,
        "aria-orientation": "horizontal"
      }, [(_a2 = slots["nav-left"]) == null ? void 0 : _a2.call(slots), renderNav(), renderLine(), (_b2 = slots["nav-right"]) == null ? void 0 : _b2.call(slots)])]), (_c = slots["nav-bottom"]) == null ? void 0 : _c.call(slots)];
      if (sticky) {
        return _createVNode("div", {
          "ref": wrapRef
        }, [Header]);
      }
      return Header;
    };
    watch([() => props.color, windowWidth], setLine);
    watch(() => props.active, (value) => {
      if (value !== currentName.value) {
        setCurrentIndexByName(value);
      }
    });
    watch(() => children.length, () => {
      if (state.inited) {
        setCurrentIndexByName(props.active);
        setLine();
        nextTick(() => {
          scrollIntoView(true);
        });
      }
    });
    const init = () => {
      setCurrentIndexByName(props.active, true);
      nextTick(() => {
        state.inited = true;
        if (wrapRef.value) {
          tabHeight = useRect(wrapRef.value).height;
        }
        scrollIntoView(true);
      });
    };
    const onRendered = (name2, title) => emit("rendered", name2, title);
    const resize = () => {
      setLine();
      nextTick(() => {
        var _a2, _b2;
        return (_b2 = (_a2 = contentRef.value) == null ? void 0 : _a2.swipeRef.value) == null ? void 0 : _b2.resize();
      });
    };
    useExpose({
      resize,
      scrollTo
    });
    onActivated(setLine);
    onPopupReopen(setLine);
    onMountedOrActivated(init);
    useEventListener("scroll", onScroll, {
      target: scroller,
      passive: true
    });
    linkChildren({
      id,
      props,
      setLine,
      onRendered,
      currentName,
      scrollIntoView
    });
    return () => _createVNode("div", {
      "ref": root,
      "class": bem([props.type])
    }, [props.sticky ? _createVNode(Sticky, {
      "container": root.value,
      "offsetTop": offsetTopPx.value,
      "onScroll": onStickyScroll
    }, {
      default: () => [renderHeader()]
    }) : renderHeader(), _createVNode(TabsContent, {
      "ref": contentRef,
      "count": children.length,
      "inited": state.inited,
      "animated": props.animated,
      "duration": props.duration,
      "swipeable": props.swipeable,
      "lazyRender": props.lazyRender,
      "currentIndex": state.currentIndex,
      "onChange": setCurrentIndex
    }, {
      default: () => {
        var _a2;
        return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)];
      }
    })]);
  }
});
export {
  TABS_KEY,
  stdin_default as default
};
