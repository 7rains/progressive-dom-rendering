'use strict';

/*
 * VERY Simple JSON string parser that only reads unnested JSON in the following format:
 * '[{}, {}, ...{}]'
 * returns ['{}', '{}', ...'{}']
*/
let parseJSON = (function () {
  let tokens = [];
  let buffer = '';
  let start = false;

  return function (input) {
    for (let i = 0, len = input.length; i < len; i++) {
      if (input[i] === '{') {
        buffer += input[i];
        start = true;
        continue;
      } 

      if (input[i] === '}') {
        start = false;
        buffer += input[i];
        tokens.push(buffer);
        buffer = '';
        continue;
      }

      if (start) {
        buffer += input[i];
      }
    }

    return tokens;
  };
})();


onmessage = function (e) {
  postMessage(parseJSON(e.data));
};