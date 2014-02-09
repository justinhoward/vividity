'use strict';

exports.flip = function(func) {
    return function(arg1,arg2) {
        return func.call(this, arg2, arg1);
    };
};