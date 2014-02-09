'use strict';

var C = require('./curry.js');

exports.compose = C.autoCurry(function(f,g) {
    return function(x) {
        return f.call(this, g.call(this, x));
    };
});