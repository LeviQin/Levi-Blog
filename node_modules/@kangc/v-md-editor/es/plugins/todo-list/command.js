import { generatorText } from "../../utils/util";
export default function commandHandler(editor, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'todo' : _ref$type;

  editor.insert(function (selected) {
    var placeholder = editor.langConfig.task.placeholder;
    var markup = type === 'todo' ? ' ' : 'x';

    var selectedGetter = function selectedGetter(selected) {
      return selected || placeholder;
    };

    var _generatorText = generatorText({
      selected: selected,
      InsertGetter: function InsertGetter(selected) {
        return "- [" + markup + "] " + selectedGetter(selected);
      },
      selectedGetter: selectedGetter
    }),
        insertContent = _generatorText.insertContent,
        newSelected = _generatorText.newSelected;

    return {
      text: insertContent,
      selected: newSelected
    };
  });
}