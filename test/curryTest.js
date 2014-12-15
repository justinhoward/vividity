var C = require('../lib/curry.js');
var expect = require('chai').expect;

function getHi() {
    return function( first, last ) {
        return 'Hello ' + first + ' ' + last;
    };
}

function getGreetContext() {
    return function( greeting, message ) {
        return greeting + ' ' + this + ', ' + message;
    };
}

describe('curry', function() {
    it('returns a function', function() {
        expect(C.curry(0, function() {})).to.be.a('function');
    });

    it('returns the normal result when calling with all arguments', function() {
        var hi = getHi();
        var curried = C.curry( 2, hi );

        expect(curried('Justin', 'Howard')).to.equal('Hello Justin Howard');
    });

    it('returns a function if partially applied', function() {
        var hi = getHi();
        var curried = C.curry(2, hi);

        expect(curried('Justin')).to.be.a('function');
    });

    it('can finish application of a partially applied function', function() {
        var hi = getHi();
        var curried = C.curry(2, hi);
        var partial = curried('Justin');

        expect(partial('Howard')).to.equal('Hello Justin Howard');
    });

    it('returns an identity if partially applied with no arguments', function() {
        var hi = getHi();
        var curried = C.curry(2, hi);
        var applied = curried();

        expect(applied).to.equal(curried);
    });

    it('can curry zero arguments', function() {
        var hi = getHi();
        var curried = C.curry(0, hi);

        expect(curried).to.not.equal(hi);
        expect(hi('Justin', 'Howard')).to.equal('Hello Justin Howard');
    });

    it('calls the function for a zero argument curry when passed no arguments', function() {
        var hi = getHi();
        var curried = C.curry(0, hi);

        expect(curried()).to.equal('Hello undefined undefined');
    });

    it('treats an object as zero for the numArgs argument', function() {
        var hi = getHi();
        var curried = C.curry({}, hi);

        expect(curried()).to.equal('Hello undefined undefined');
    });

    it('coerces string numArgs as a number', function() {
        var hi = getHi();
        var curried = C.curry('2', hi);

        expect(curried).to.be.a('function');
    });

    it('preserves the context when arguments are fully applied', function() {
        var ctx = getGreetContext();
        var curried = C.curry(2, ctx);

        expect(curried.call('Justin', 'Hello', 'how you doin?')).to.equal('Hello Justin, how you doin?');
    });

    it('preserves the context when arguments are partially applied', function() {
        var ctx = getGreetContext();
        var curried = C.curry(2, ctx);
        var partial = curried( 'Hello' );

        expect(partial.call('Justin', 'how you doin?')).to.equal('Hello Justin, how you doin?');
    });

    it('can auto curry', function() {
        var hi = getHi();
        var curried = C.autoCurry(hi);
        var partial = curried('Justin');

        expect(partial('Howard')).to.equal('Hello Justin Howard');
    });
});