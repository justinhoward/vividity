var R = require('../lib/reduce.js');

exports.testCallsFuncForEach = function(test) {
    test.expect(6);

    var testFunc = function() {
        test.ok(true);
    };

    R.reduce(testFunc, 0, [0,0,0]);
    R.reduceRight(testFunc, 0, [0,0,0]);

    test.done();
};

exports.testPassesFuncInitialAccumulator = function(test) {
    test.expect(2);

    var testFunc = function(acc) {
        test.equals(5, acc);
    };

    R.reduce(testFunc, 5, [0]);
    R.reduceRight(testFunc, 5, [0]);

    test.done();
};

exports.testReducePassesFuncEachArrayValueToValue = function(test) {
    test.expect(3);

    var i = 1;
    R.reduce(function(acc, value) {
        test.equals(i*10, value);
        ++i;
    }, 0, [10,20,30]);

    test.done();
};

exports.testReduceRightPassesFuncEachArrayValueToValue = function(test) {
    test.expect(3);

    var i = 3;
    R.reduceRight(function(acc, value) {
        test.equals(i*10, value);
        --i;
    }, 0, [10,20,30]);

    test.done();
};

exports.testReduceAccumulatorIsReturnValueOfLast = function(test) {
    test.expect(6);

    var expected = [0,10,20], i;

    var testFunc = function(acc) {
        test.equals(expected[i], acc);
        ++i;
        return i*10;
    };

    i = 0;
    R.reduce(testFunc, 0, [0,0,0]);
    i = 0;
    R.reduceRight(testFunc, 0, [0,0,0]);

    test.done();
};

exports.testFuncIsCalledInContext = function(test) {
    test.expect(2);

    var testFunc = function() {
        test.equals('hi',this);
    };

    R.reduce.call('hi', testFunc, 0, [0]);
    R.reduceRight.call('hi', testFunc, 0, [0]);

    test.done();
};

exports.testReturnValueIsFinalReturn = function(test) {
    var i;
    var testFunc = function() {
        var value = 'hi ' + i;
        ++i;
        return value;
    };

    i = 0;
    test.equals('hi 2', R.reduce(testFunc, 0, [0,0,0]));

    i = 0;
    test.equals('hi 2', R.reduceRight(testFunc, 0, [0,0,0]));

    test.done();
};

exports.testCanCurryReduce = function(test) {
    var reduceAdd = R.reduce(function(acc,value) {return acc+value;});

    test.equals(6,reduceAdd(0,[1,2,3]));
    test.done();
};

exports.testCanCurryReduceRight = function(test) {
    var reduceAdd = R.reduceRight(function(acc,value) {return acc+value;});

    test.equals(6, reduceAdd(0, [1,2,3]));
    test.done();
};