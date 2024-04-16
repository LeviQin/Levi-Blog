import createToolbar from "./toolbar";
import commandHandler from "./command";
export default function creator(_ref) {
  var emojiJson = _ref.emojiJson,
      parser = _ref.parser;
  return function createEmojiPlugin(_temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        _ref2$name = _ref2.name,
        name = _ref2$name === void 0 ? 'emoji' : _ref2$name,
        _ref2$icon = _ref2.icon,
        icon = _ref2$icon === void 0 ? 'v-md-icon-emoji' : _ref2$icon,
        text = _ref2.text,
        _ref2$title = _ref2.title,
        title = _ref2$title === void 0 ? function (editor) {
      return editor.langConfig.emoji;
    } : _ref2$title,
        customEmoji = _ref2.customEmoji;

    var toolbar = createToolbar({
      commandName: name,
      title: title,
      text: text,
      icon: icon,
      emojiJson: emojiJson
    });
    return {
      install: function install(VMdEditor) {
        if (VMdEditor.name === 'v-md-editor') {
          VMdEditor.command(name, commandHandler);
          VMdEditor.toolbar(name, toolbar);
          VMdEditor.lang.add({
            'zh-CN': {
              emoji: '插入emoji表情'
            },
            'en-US': {
              emoji: 'Insert emoji'
            }
          });
        }

        VMdEditor.vMdParser.use(parser, {
          customEmoji: customEmoji
        });
      }
    };
  };
}