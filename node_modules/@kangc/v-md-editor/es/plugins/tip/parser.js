import markdownItContainer from "../../utils/markdown-it-container";
export default function (vMdParser) {
  vMdParser.extendMarkdown(function (mdParser) {
    var blockClass = 'v-md-plugin-tip';

    var getLangConfig = function getLangConfig() {
      var lang = vMdParser.lang.config;
      var langConfig = lang.langConfig[lang.lang];
      return langConfig;
    };

    markdownItContainer(mdParser, {
      type: 'tip',
      defaultTitle: function defaultTitle() {
        return getLangConfig().tip.tip.defaultTitle;
      },
      blockClass: blockClass
    });
    markdownItContainer(mdParser, {
      type: 'warning',
      defaultTitle: function defaultTitle() {
        return getLangConfig().tip.warning.defaultTitle;
      },
      blockClass: blockClass
    });
    markdownItContainer(mdParser, {
      type: 'danger',
      defaultTitle: function defaultTitle() {
        return getLangConfig().tip.danger.defaultTitle;
      },
      blockClass: blockClass
    });
    markdownItContainer(mdParser, {
      type: 'details',
      defaultTitle: function defaultTitle() {
        return getLangConfig().tip.details.defaultTitle;
      },
      before: function before(info) {
        return "<details class=\"" + blockClass + " details\">" + (info ? "<summary>" + info + "</summary>" : '') + "\n";
      },
      after: function after() {
        return '</details>\n';
      }
    });
  });
  vMdParser.lang.add({
    'zh-CN': {
      tip: {
        tip: {
          defaultTitle: '提示'
        },
        warning: {
          defaultTitle: '注意'
        },
        danger: {
          defaultTitle: '警告'
        },
        details: {
          defaultTitle: '详细信息'
        }
      }
    },
    'en-US': {
      tip: {
        tip: {
          defaultTitle: 'TIP'
        },
        warning: {
          defaultTitle: 'WARNING'
        },
        danger: {
          defaultTitle: 'DANGER'
        },
        details: {
          defaultTitle: 'DETAILS'
        }
      }
    }
  });
}