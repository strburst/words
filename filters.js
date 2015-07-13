/** Test whether a word begins with the given string. */
exports.beginsWith = function(begin, word) {
  return word.substr(0, begin.length) == begin;
};

/** Test whether a word ends with the given string. */
exports.endsWith = function(end, word) {
  return word.substr(word.length - end.length) == end;
};

/** Test whether a word has the given length. */
exports.lengthIs = function(len, word) {
  return word.length == len;
};

/** Create a filter that tests all of the properties in query. */
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
  };
};
