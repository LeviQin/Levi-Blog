export default function commandHandler(editor, emojiType) {
  editor.insert(function () {
    var prefix = ':';
    var suffix = ':';
    return {
      text: "" + prefix + emojiType + suffix
    };
  });
}