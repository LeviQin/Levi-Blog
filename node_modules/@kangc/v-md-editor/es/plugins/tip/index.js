import parser from "./parser";
export default function createTipPlugin(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? 'tip' : _ref$name,
      _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? 'v-md-icon-tip' : _ref$icon,
      text = _ref.text;

  var commandHandler = function commandHandler(editor, type) {
    if (type === void 0) {
      type = 'tip';
    }

    editor.insert(function (selected) {
      var prefix = ':::';
      var suffix = ':::';
      var content = selected || editor.langConfig.tip[type].placeholder;
      return {
        text: prefix + " " + type + "\n  " + content + "\n" + suffix,
        selected: content
      };
    });
  };

  var toolbar = {
    title: function title(editor) {
      return editor.langConfig.tip.toolbar;
    },
    icon: icon,
    text: text,
    menus: [{
      name: 'tip',
      text: function text(editor) {
        return editor.langConfig.tip.tip.toolbar;
      },
      action: function action(editor) {
        editor.execCommand(name);
      }
    }, {
      name: 'warning',
      text: function text(editor) {
        return editor.langConfig.tip.warning.toolbar;
      },
      action: function action(editor) {
        editor.execCommand(name, 'warning');
      }
    }, {
      name: 'danger',
      text: function text(editor) {
        return editor.langConfig.tip.danger.toolbar;
      },
      action: function action(editor) {
        editor.execCommand(name, 'danger');
      }
    }, {
      name: 'details',
      text: function text(editor) {
        return editor.langConfig.tip.details.toolbar;
      },
      action: function action(editor) {
        editor.execCommand(name, 'details');
      }
    }]
  };
  return {
    install: function install(VMdEditor) {
      if (VMdEditor.name === 'v-md-editor') {
        VMdEditor.command(name, commandHandler);
        VMdEditor.toolbar(name, toolbar);
        VMdEditor.lang.add({
          'zh-CN': {
            tip: {
              toolbar: '插入提示',
              tip: {
                toolbar: '提示',
                placeholder: '在此输入内容'
              },
              warning: {
                toolbar: '注意',
                placeholder: '在此输入内容'
              },
              danger: {
                toolbar: '警告',
                placeholder: '在此输入内容'
              },
              details: {
                toolbar: '详细信息',
                placeholder: '内容'
              }
            }
          },
          'en-US': {
            tip: {
              toolbar: 'Insert tip',
              tip: {
                toolbar: 'Tip',
                placeholder: 'Insert content'
              },
              warning: {
                toolbar: 'Warning',
                placeholder: 'Insert content'
              },
              danger: {
                toolbar: 'Danger',
                placeholder: 'Insert content'
              },
              details: {
                toolbar: 'Details',
                placeholder: 'Content'
              }
            }
          }
        });
      }

      VMdEditor.vMdParser.use(parser);
    }
  };
}