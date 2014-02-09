/*! vividity - v0.1.0 - 2014-02-09
* https://github.com/justinhoward/vividity
* Copyright (c) 2014 Justin Howard; Licensed MIT */
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.vividity=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var modules = [
    _dereq_('./lib/curry.js'),
    _dereq_('./lib/compose.js'),
    _dereq_('./lib/flip.js'),
    _dereq_('./lib/map.js'),
    _dereq_('./lib/reduce.js')
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
},{"./lib/compose.js":2,"./lib/curry.js":3,"./lib/flip.js":4,"./lib/map.js":5,"./lib/reduce.js":6}],2:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('./curry.js');

exports.compose = C.autoCurry( function(f,g) {
    return function(x) {
        return f.call(this, g.call(this, x));
    };
});
},{"./curry.js":3}],3:[function(_dereq_,module,exports){
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
},{}],4:[function(_dereq_,module,exports){
'use strict';

exports.flip = function(func) {
    return function(arg1,arg2) {
        return func.call(this, arg2, arg1);
    };
};
},{}],5:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('./curry.js');

exports.map = C.autoCurry( function(func, array) {
    var results = [];
    var i = 0, iLen = array.length;
    for (; i < iLen; i++) {
        results[i] = func.call(this, array[i]);
    }

    return results;
});
},{"./curry.js":3}],6:[function(_dereq_,module,exports){
'use strict';
var C = _dereq_('./curry.js');

exports.reduce = C.autoCurry( function(func, accumulator, array) {
    var i = 0, iLen = array.length;
    for(; i < iLen; i++) {
        accumulator = func.call(this, accumulator, array[i]);
    }

    return accumulator;
});

exports.reduceRight = C.autoCurry( function(func, accumulator, array) {
    var i = array.length;
    while(i--) {
        accumulator = func.call(this, accumulator, array[i]);
    }

    return accumulator;
});
},{"./curry.js":3}]},{},[1])
(1)
});