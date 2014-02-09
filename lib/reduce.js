'use strict';
var C = require('./curry.js');

exports.reduce = C.autoCurry(function(func, accumulator, array) {
    var i = 0, iLen = array.length;
    for(; i < iLen; i++) {
        accumulator = func.call(this, accumulator, array[i]);
    }

    return accumulator;
});

exports.reduceRight = C.autoCurry(function(func, accumulator, array) {
    var i = array.length;
    while(i--) {
        accumulator = func.call(this, accumulator, array[i]);
    }

    return accumulator;
});