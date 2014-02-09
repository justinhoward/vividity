'use strict';
var C = require('./curry.js');

var reduceGeneric = function(func, accumulator, array, start) {
    var i = start, iLen = array.length;
    for(; i < iLen; i++) {
        accumulator = func.call(this, accumulator, array[i]);
    }

    return accumulator;
};

var reduceRightGeneric = function(func, accumulator, array, length) {
    var i = length;
    while(i--) {
        accumulator = func.call(this, accumulator, array[i]);
    }

    return accumulator;
};

var reduce = function(func, accumulator, array) {
    return reduceGeneric.call(this, func, accumulator, array, 0);
};

var reduceRight = function(func, accumulator, array) {
    return reduceRightGeneric.call(this, func, accumulator, array, array.length);
};

var assertNotEmpty = function(array) {
    if (!array.length)
        throw new Error('Array must not be empty');
};

var reduce1 = function(func, array) {
    assertNotEmpty(array);
    var accumulator = array[0];
    return reduceGeneric.call(this, func, accumulator, array, 1);
};

var reduceRight1 = function(func, array) {
    assertNotEmpty(array);
    var end = array.length-1;
    var accumulator = array[end];
    return reduceGeneric.call(this, func, accumulator, array, end);
};

exports.reduce = C.autoCurry(reduce);
exports.reduceRight = C.autoCurry(reduceRight);
exports.reduce1 = C.autoCurry(reduce1);
exports.reduceRight1 = C.autoCurry(reduceRight1);