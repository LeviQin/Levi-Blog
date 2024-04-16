import _extends from "@babel/runtime/helpers/esm/extends";
import { importAll } from "./util";
var defaultToolbars = {};
importAll(defaultToolbars, require.context('@/toolbar', false, /\.(js)$/));
export default function registerToolbar(target, name, config) {
  if (name) {
    target[name] = _extends({}, config);
  } else {
    console.error('Toolbar name is required');
  }
}
export function toolbarWrapper(component) {
  component.toolbars = {};

  component.toolbar = function (name, config) {
    registerToolbar(component.toolbars, name, config);
  };

  Object.keys(defaultToolbars).forEach(function (key) {
    var module = defaultToolbars[key];
    var config = module.default;
    component.toolbar(config.name, config);
  });
}