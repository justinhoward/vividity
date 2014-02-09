var curry = require('../lib/curry.js');

function getHi() {
    return function( first, last ) {
        return 'Hello ' + first + ' ' + last;
    };
}

function getGreetContext() {
    return function( greeting, message )
    {
        return greeting + ' ' + this + ', ' + message;
    };
}

exports.testCurryReturnsFunction = function (test) {
    test.ok( curry.curry( 0, function() {} ) instanceof Function );
    test.done();
};

exports.testFullApplicationReturnsNormal = function(test) {
    var hi = getHi();
    var curried = curry.curry( 2, hi );

    test.equal( 'Hello Justin Howard', curried('Justin', 'Howard') );
    test.done();
};

exports.testPartialApplicationReturnsFunction = function(test) {
    var hi = getHi();
    var curried = curry.curry(2, hi);

    test.ok(curried('Justin') instanceof Function);
    test.done();
};

exports.testCanFinishPartialApplication = function(test) {
    var hi = getHi();
    var curried = curry.curry(2, hi);
    var partial = curried('Justin');

    test.equal('Hello Justin Howard', partial('Howard'));
    test.done();
};

exports.testApplyingWithNoArgsReturnsIdentical = function(test) {
    var hi = getHi();
    var curried = curry.curry(2, hi);
    var applied = curried();

    test.equal(curried, applied);
    test.done();
};

exports.testCurryZero = function(test) {
    var hi = getHi();
    var curried = curry.curry(0, hi);

    test.notEqual(hi, curried);
    test.equal('Hello Justin Howard', hi('Justin', 'Howard'));
    test.done();
};

exports.testCurryZeroCallWithNone = function(test) {
    var hi = getHi();
    var curried = curry.curry(0, hi);

    test.equal('Hello undefined undefined', curried());
    test.done();
};

exports.testObjectNumIsEquivalentToZero = function(test) {
    var hi = getHi();
    var curried = curry.curry({}, hi);

    test.equal('Hello undefined undefined', curried());
    test.done();
};

exports.testStringNumCoercesToNumber = function(test) {
    var hi = getHi();
    var curried = curry.curry('2', hi);

    test.ok(curried() instanceof Function);
    test.done();
};

exports.testContextIsPreservedWhenCalledWithAll = function(test) {
    var ctx = getGreetContext();
    var curried = curry.curry(2, ctx);

    test.equal('Hello Justin, how you doin?',
        curried.call( 'Justin', 'Hello', 'how you doin?' ));

    test.done();
};

exports.testContextIsPreservedInPartial = function(test) {
    var ctx = getGreetContext();
    var curried = curry.curry(2, ctx);
    var partial = curried( 'Hello' );

    test.equal('Hello Justin, how you doin?',
        partial.call( 'Justin', 'how you doin?' ));

    test.done();
};

exports.testAutoCurry = function(test) {
    var hi = getHi();
    var curried = curry.autoCurry(hi);
    var partial = curried('Justin');

    test.equal('Hello Justin Howard', partial('Howard'));
    test.done();
};