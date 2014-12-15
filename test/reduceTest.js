var R = require('../lib/reduce.js');
var expect = require('chai').expect;

describe('reduce', function() {
    it('calls the function for each item in the array', function() {
        var i = 0;
        var testFunc = function() {
            i++;
        };

        R.reduce(testFunc, 0, [0,0,0]);
        R.reduceRight(testFunc, 0, [0,0,0]);

        expect(i).to.equal(6);
    });

    it('passes the function the initial accumulator', function() {
        var i = 0;
        var testFunc = function(acc) {
            expect(acc).to.equal(5);
            i++;
        };

        R.reduce(testFunc, 5, [0]);
        R.reduceRight(testFunc, 5, [0]);

        expect(i).to.equal(2);
    });

    it('passes the function each array value to the value argument', function() {
        var i = 1;

        R.reduce(function(acc, value) {
            expect(value).to.equal(i*10);
            ++i;
        }, 0, [10,20,30]);

        expect(i).to.equal(4);
    });

    it('passes the function each array value for reduce right', function() {
        var i = 3;
        R.reduceRight(function(acc, value) {
            expect(value).to.equal(i*10);
            --i;
        }, 0, [10,20,30]);

        expect(i).to.equal(0);
    });

    it('passes the return value of the last call to the accumulator', function() {
        var expected = [0,10,20], i;

        var testFunc = function(acc) {
            expect(acc).to.equal(expected[i]);
            ++i;
            return i*10;
        };

        i = 0;
        R.reduce(testFunc, 0, [0,0,0]);
        expect(i).to.equal(3);

        i = 0;
        R.reduceRight(testFunc, 0, [0,0,0]);
        expect(i).to.equal(3);
    });

    it('preserves the context', function() {
        var i = 0;
        var testFunc = function() {
            expect(this.msg).to.equal('hi');
            i++;
        };

        R.reduce.call({msg:'hi'}, testFunc, 0, [0]);
        R.reduceRight.call({msg:'hi'}, testFunc, 0, [0]);

        expect(i).to.equal(2);
    });

    it('returns the final return value', function() {
        var i;
        var testFunc = function() {
            var value = 'hi ' + i;
            ++i;
            return value;
        };

        i = 0;
        expect(R.reduce(testFunc, 0, [0,0,0])).to.equal('hi 2');
        expect(i).to.equal(3);

        i = 0;
        expect(R.reduceRight(testFunc, 0, [0,0,0])).to.equal('hi 2');
        expect(i).to.equal(3);
    });

    it('sets the accumulator to the first value for reduce1', function() {
        var i;
        var testFunc = function(acc) {
            expect(acc).to.equal(1);
            i++;
        };

        i = 0;
        R.reduce1(testFunc, [1,2]);
        expect(i).to.equal(1);

        i = 0;
        R.reduceRight1(testFunc, [2,1]);
        expect(i).to.equal(1);
    });

    it('accumulates correct value for reduce1', function() {
        var sum = R.reduce1(function(acc, value) {return acc+value;});

        expect(sum([1,2,3])).to.equal(6);
    });

    it('accumulates the correct value for reduceRight1', function() {
        var sum = R.reduceRight1(function(acc, value) {return acc+value;});

        expect(sum([1,2,3])).to.equal(6);
    });

    it('throws an error for reduce1 with emtpy array', function() {
        expect(function() {
            R.reduce1(function(){}, []);
        }).to.throw(Error);
    });

    it('throws an error for reduceRight1 with empty array', function() {
        expect(function() {
            R.reduceRight1(function(){}, []);
        }).to.throw(Error);
    });

    it('can curry reduce', function() {
        var reduceAdd = R.reduce(function(acc,value) {return acc+value;});

        expect(reduceAdd(0, [1,2,3])).to.equal(6);
    });

    it('can curry reduceRight', function() {
        var reduceAdd = R.reduceRight(function(acc,value) {return acc+value;});

        expect(reduceAdd(0, [1,2,3])).to.equal(6);
    });

    it('can curry reduce1', function() {
        var sum = R.reduce1(function(acc,value) {return acc+value;});

        expect(sum([1,2,3])).to.equal(6);
    });

    it('can curry reduceRight1', function() {
        var sum = R.reduceRight1(function(acc,value) {return acc+value;});

        expect(sum([1,2,3])).to.equal(6);
    });
});