import markdownItCodeLineNumber from '@vuepress/markdown/lib/lineNumbers';
export default function (vMdParser) {
  vMdParser.extendMarkdown(function (mdParser) {
    mdParser.use(markdownItCodeLineNumber);
  });
}