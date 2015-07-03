exports.beginsWith = function(begin, word) {
  return word.substr(0, begin.length) == begin;
}

exports.endsWith = function(end, word) {
  return word.substr(word.length - end.length) == end;
}

exports.lengthIs = function(len, word) {
  return word.length == len;
}

exports.composeFilter = function(query) {
  var filterKeys = {};
  for (var key in query) {
    if (typeof exports[key] == 'function' && query[key]) {
      filterKeys[key] = query[key];
    }
  }

  return function(word) {
    for (var key in filterKeys) {
      if (!exports[key](filterKeys[key], word)) {
        return false;
      }
    }
    return true;
  }
}
