import markdownItHighlightLines from "../../utils/markdown-it-highlight-lines";
export default function (vMdParser) {
  vMdParser.extendMarkdown(function (mdParser) {
    mdParser.use(markdownItHighlightLines);
  });
}