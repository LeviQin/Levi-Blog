import _extends from "@babel/runtime/helpers/esm/extends";
import markdownItKatex from "../../utils/markdown-it-katex";
export default function parserCreator(katex) {
  return function parser(vMdParser, katexOptions) {
    vMdParser.extendMarkdown(function (mdParser) {
      if (katex) {
        mdParser.use(markdownItKatex, _extends({}, katexOptions, {
          katex: katex
        }));
      }
    });
  };
}