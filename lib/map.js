'use strict';

var C = require('./curry');

exports.map = C.autoCurry(function(func, array) {
    var results = [];
    var i = 0, iLen = array.length;
    for (; i < iLen; i++) {
        results[i] = func.call(this, array[i]);
    }

    return results;
});