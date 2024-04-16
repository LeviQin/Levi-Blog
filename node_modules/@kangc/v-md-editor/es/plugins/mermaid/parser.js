import markdownItMermaid from "../../utils/markdown-it-mermaid";
export default function parser(vMdParser) {
  vMdParser.extendMarkdown(function (mdParser) {
    if (mdParser) {
      mdParser.use(markdownItMermaid);
    }
  });
}