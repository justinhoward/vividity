var C = require('../lib/compose.js');

exports.testComposeReturnsFunction = function(test) {
    var result = C.compose(function(){}, function(){});
    test.ok(result instanceof Function);
    test.done();
};

exports.testComposedCallsSecondThenFirst = function(test) {
    test.expect(2);

    var i = 0;
    var composed = C.compose(function(){
        test.equal(1,i);
    },function(){
        test.equal(0,i);
        i = 1;
    });

    composed();
    test.done();
};

exports.testArgumentPassedToSecondFunction = function(test) {
    test.expect(1);
    var composed = C.compose(function(){}, function(arg) {
        test.equal('hi', arg);
    });

    composed('hi');
    test.done();
};

exports.testFirstFunctionPassedResultOfSecond = function(test) {
    test.expect(1);

    var composed = C.compose(function(value) {
        test.equal('hi',value);
    }, function() {
        return 'hi';
    });

    composed();
    test.done();
};

exports.testReturnValueisResultOfFirst = function(test) {
    var composed = C.compose(function() {
        return 'hi';
    }, function(){});

    test.equal('hi', composed());
    test.done();
};

exports.testSecondFunctionContextIsSet = function(test) {
    test.expect(1);
    var composed = C.compose(function(){}, function() {
        test.equal('hi', this);
    });

    composed.call('hi');
    test.done();
};

exports.testFirstFunctionContextIsSet = function(test) {
    test.expect(1);
    var composed = C.compose(function() {
        test.equal('hi', this);
    }, function(){});

    composed.call('hi');
    test.done();
};

exports.testCanCurry = function(test) {
    var composeWithAdd2 = C.compose( function(value) {
        return value+2;
    });

    var multiplyBy5ThenAdd2 = composeWithAdd2(function(value) {
        return value*5;
    });

    test.equals(12,multiplyBy5ThenAdd2(2));
    test.done();
};