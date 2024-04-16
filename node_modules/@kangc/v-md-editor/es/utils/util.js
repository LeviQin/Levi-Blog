var toString = Object.prototype.toString;
export var isObject = function isObject(target) {
  return toString.call(target) === '[object Object]';
};

function extend(to, _from) {
  Object.keys(_from).forEach(function (key) {
    to[key] = _from[key];
  });
  return to;
}

export function arraytoObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
export function importAll(map, r) {
  r.keys().forEach(function (filePath) {
    map[filePath] = r(filePath);
  });
}
export var inBrowser = typeof window !== 'undefined';
export function isKorean(text) {
  var reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
  return reg.test(text);
}
export function generatorText(_ref) {
  var selected = _ref.selected,
      InsertGetter = _ref.InsertGetter,
      _ref$selectedGetter = _ref.selectedGetter,
      selectedGetter = _ref$selectedGetter === void 0 ? function (selected) {
    return selected;
  } : _ref$selectedGetter,
      _ref$ignoreEmptyLine = _ref.ignoreEmptyLine,
      ignoreEmptyLine = _ref$ignoreEmptyLine === void 0 ? true : _ref$ignoreEmptyLine;
  var insertContent;
  var newSelected;

  if (selected) {
    newSelected = selectedGetter(selected);
    insertContent = InsertGetter(selected, 1); // 如果当前选中的文本包含换行 则插入后选中插入的所有文本

    if (selected.indexOf('\n') !== -1) {
      insertContent = selected.split('\n').map(function (rowText, index) {
        var isEmptyLine = !rowText;
        if (ignoreEmptyLine && isEmptyLine) return '';
        return InsertGetter(rowText, index + 1).replace(selectedGetter(null), '');
      }).join('\n');
      newSelected = insertContent;
    }
  } else {
    insertContent = InsertGetter(null, 1);
    newSelected = selectedGetter(selected);
  }

  return {
    insertContent: insertContent,
    newSelected: newSelected
  };
}