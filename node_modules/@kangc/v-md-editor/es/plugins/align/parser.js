import markdownItContainer from "../../utils/markdown-it-container";
export default function (vMdParser) {
  vMdParser.extendMarkdown(function (mdParser) {
    markdownItContainer(mdParser, {
      type: 'align-left',
      defaultTitle: '',
      before: function before(info) {
        return "<div align=\"left\">" + (info || '') + "\n";
      },
      after: function after() {
        return '</div>\n';
      }
    });
    markdownItContainer(mdParser, {
      type: 'align-center',
      defaultTitle: '',
      before: function before(info) {
        return "<div align=\"center\">" + (info || '') + "\n";
      },
      after: function after() {
        return '</div>\n';
      }
    });
    markdownItContainer(mdParser, {
      type: 'align-right',
      defaultTitle: '',
      before: function before(info) {
        return "<div align=\"right\">" + (info || '') + "\n";
      },
      after: function after() {
        return '</div>\n';
      }
    });
  });
}