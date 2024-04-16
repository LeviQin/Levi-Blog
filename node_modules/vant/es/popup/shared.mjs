import { truthProp, unknownProp, numericProp } from "../utils/index.mjs";
const popupSharedProps = {
  show: Boolean,
  zIndex: numericProp,
  overlay: truthProp,
  duration: numericProp,
  teleport: [String, Object],
  lockScroll: truthProp,
  lazyRender: truthProp,
  beforeClose: Function,
  overlayStyle: Object,
  overlayClass: unknownProp,
  transitionAppear: Boolean,
  closeOnClickOverlay: truthProp
};
const popupSharedPropKeys = Object.keys(
  popupSharedProps
);
export {
  popupSharedPropKeys,
  popupSharedProps
};
