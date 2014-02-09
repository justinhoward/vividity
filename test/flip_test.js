var F = require('../lib/flip.js');

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

exports.testReturnsFunction = function(test) {
    test.ok(F.flip(getHi()) instanceof Function);
    test.done();
};

exports.testReversesArguments = function(test) {
    var flipped = F.flip(getHi());

    test.equal('Hello Howard Justin', flipped('Justin', 'Howard'));
    test.done();
};

exports.testPreservesContext = function(test)
{
    var flipped = F.flip(getGreetContext());
    var result = flipped.call( 'Justin', 'how are you doing?', 'Hello' );

    test.equal('Hello Justin, how are you doing?', result);
    test.done();
};