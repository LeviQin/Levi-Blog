import createToolbar from "./toolbar";
import commandHandler from "./command";
import parser from "./parser";
export default function createTodoListPlugin(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? 'todo-list' : _ref$name,
      _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? 'v-md-icon-checkbox' : _ref$icon,
      text = _ref.text,
      color = _ref.color;

  var toolbar = createToolbar({
    commandName: name,
    title: function title(editor) {
      return editor.langConfig.task.toolbar + "\uFF08Ctrl+Shift+U\uFF09";
    },
    text: text,
    icon: icon
  });
  return {
    install: function install(VMdEditor) {
      if (VMdEditor.name === 'v-md-editor') {
        VMdEditor.command(name, commandHandler);
        VMdEditor.toolbar(name, toolbar);
        VMdEditor.hotkey({
          modifier: 'ctrlShift',
          key: 'u',
          action: function action(editor) {
            editor.execCommand(name);
          }
        });
        VMdEditor.lang.add({
          'zh-CN': {
            task: {
              toolbar: '任务列表',
              placeholder: '任务列表'
            }
          },
          'en-US': {
            task: {
              toolbar: 'Task',
              placeholder: 'Task'
            }
          }
        });
      }

      VMdEditor.vMdParser.use(parser, {
        color: color
      });
    }
  };
}