var F = require('../lib/flip.js');
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


describe('flip', function() {
    it('returns a function', function() {
        expect(F.flip(getHi())).to.be.a('function');
    });

    it('reverses the arguments', function() {
        var flipped = F.flip(getHi());

        expect(flipped('Justin', 'Howard')).to.equal('Hello Howard Justin');
    });

    it('preserves context', function() {
        var flipped = F.flip(getGreetContext());

        var result = flipped.call( 'Justin', 'how are you doing?', 'Hello' );
        expect(result).to.equal('Hello Justin, how are you doing?');
    });
});