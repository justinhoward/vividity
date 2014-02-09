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