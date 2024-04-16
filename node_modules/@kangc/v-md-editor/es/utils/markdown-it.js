import MarkdownIt from 'markdown-it';
import { escapeHtml } from 'markdown-it/lib/common/utils';
export function createHighlightRender(_ref) {
  var _ref$codeHighlightExt = _ref.codeHighlightExtensionMap,
      codeHighlightExtensionMap = _ref$codeHighlightExt === void 0 ? {} : _ref$codeHighlightExt,
      _ref$hasLang = _ref.hasLang,
      hasLang = _ref$hasLang === void 0 ? function () {
    return true;
  } : _ref$hasLang,
      _ref$highlight = _ref.highlight,
      highlight = _ref$highlight === void 0 ? function (str) {
    return str;
  } : _ref$highlight,
      codeBlockClass = _ref.codeBlockClass;

  var getCodeBlockClass = function getCodeBlockClass(lang) {
    return codeBlockClass ? codeBlockClass(lang) : "language-" + lang;
  };

  return function (str, lang) {
    var res = escapeHtml(str);
    lang = codeHighlightExtensionMap[lang] || lang;

    if (lang) {
      if (hasLang(lang)) {
        res = highlight(str, lang);
      }
    }

    return "<pre class=\"" + getCodeBlockClass(lang) + "\"><code>" + res + "</code></pre>";
  };
}
export default function () {
  var markdownItInstance = new MarkdownIt();
  markdownItInstance.set({
    html: true,
    breaks: true,
    linkify: false,
    typographer: true
  });
  return markdownItInstance;
}