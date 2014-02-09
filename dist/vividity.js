/*! vividity - v0.1.0 - 2014-02-09
* https://github.com/justinhoward/vividity
* Copyright (c) 2014 Justin Howard; Licensed MIT */
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.vividity=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var modules = [
    _dereq_('./lib/curry.js'),
    _dereq_('./lib/flip.js')
];

var i = 0, iLen = modules.length;
var exp;
for ( ; i < iLen; i++ ) {
    for ( exp in modules[ i ] ) {
        if (!modules[i].hasOwnProperty(exp))
            continue;

        exports[exp] = modules[i][exp];
    }
}
},{"./lib/curry.js":2,"./lib/flip.js":3}],2:[function(_dereq_,module,exports){
'use strict';

function applyPartial(func, totalArgs, args) {
    return exports.curry(totalArgs - args.length, function()
    {
        return func.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    });
}

exports.curry = function(numArgs, func) {
    //coerce numArgs to an integer
    numArgs = numArgs << 0;

    var curried = function() {
        if (!arguments.length && numArgs )
            return curried;
        else if (arguments.length < numArgs)
            return applyPartial( func, numArgs, Array.prototype.slice.call(arguments));
        else
            return func.apply(this, arguments);
    };

    return curried;
};

exports.autoCurry = function(func) {
    return exports.curry(func.length, func);
};
},{}],3:[function(_dereq_,module,exports){
'use strict';

exports.flip = function(func) {
    return function(arg1,arg2) {
        return func.call(this, arg2, arg1);
    };
};
},{}]},{},[1])
(1)
});