var M = require('../lib/map.js');

exports.testMapReturnsArray = function(test) {
    var result = M.map(function(){},[]);

    test.ok(result instanceof Array);
    test.done();
};

exports.testMapReturnsArrayOfSameLength = function(test) {
    var result = M.map(function(){},[0,1,2]);

    test.equal(3, result.length);
    test.done();
};

exports.testMapCallsFunctionNTimes = function(test) {
    test.expect(3);
    M.map(function() {
        test.ok(true);
    }, [0,1,2]);

    test.done();
};

exports.testFunctionIsPassedArrayContents = function(test) {
    test.expect(3);
    var i = 1;
    M.map(function(value) {
        test.equal((i)*10, value);
        ++i;
    }, [10,20,30]);

    test.done();
};

exports.testResultContainsFunctionReturnValues = function(test) {
    var result = M.map(function(value) {
        return value-1;
    }, [10,20,30]);

    test.expect(3);
    var expected = [9,19,29];
    var i = 0, iLen = result.length;
    for (; i < iLen; i++) {
        test.equal(expected[i], result[i]);
    }

    test.done();
};

exports.testContextIsPassedToFunction = function(test) {
    var result = M.map.call('ctx', function() {
        return 'hi from ' + this;
    }, [0]);

    test.equal('hi from ctx', result[0]);
    test.done();
};

exports.testCanCurry = function(test) {
    var mapPlus2 = M.map(function(value) {return value+2;});
    var result = mapPlus2([10,20,30]);

    test.equal(22, result[1]);
    test.done();
};