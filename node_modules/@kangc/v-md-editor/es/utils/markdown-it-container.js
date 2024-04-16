// Modified from https://github.com/vuepress/vuepress-community/blob/master/packages/vuepress-plugin-container/src/markdown-it-container.ts
import container from 'markdown-it-container';

function wrapRenderPlaceFunction(func) {
  if (typeof func === 'string') {
    return function () {
      return func;
    };
  }

  return func;
}

export default function (md, _ref) {
  var validate = _ref.validate,
      marker = _ref.marker,
      render = _ref.render,
      type = _ref.type,
      before = _ref.before,
      after = _ref.after,
      _ref$defaultTitle = _ref.defaultTitle,
      defaultTitle = _ref$defaultTitle === void 0 ? type.toUpperCase() : _ref$defaultTitle,
      _ref$blockClass = _ref.blockClass,
      blockClass = _ref$blockClass === void 0 ? 'custom-block' : _ref$blockClass;

  if (!type) {
    return;
  }

  if (!render) {
    var renderBefore;
    var renderAfter;

    if (before !== undefined && after !== undefined) {
      // user defined
      renderBefore = wrapRenderPlaceFunction(before);
      renderAfter = wrapRenderPlaceFunction(after);
    } else {
      // fallback default
      renderBefore = function renderBefore(info) {
        return "<div class=\"" + blockClass + " " + type + "\">" + (info ? "<p class=\"" + blockClass + "-title\">" + info + "</p>" : '') + "\n";
      };

      renderAfter = function renderAfter() {
        return '</div>\n';
      };
    }

    render = function render(tokens, index) {
      var token = tokens[index];
      var info = token.info.trim().slice(type.length).trim();

      if (!info && defaultTitle) {
        if (typeof defaultTitle === 'function') {
          info = defaultTitle();
        } else {
          info = defaultTitle;
        }
      }

      if (token.nesting === 1) {
        return renderBefore(info);
      }

      return renderAfter(info);
    };
  }

  md.use(container, type, {
    render: render,
    validate: validate,
    marker: marker
  });
}