var M = require('../lib/map.js');
var expect = require('chai').expect;

describe('map', function() {
    it('returns an array', function() {
        expect(M.map(function(){},[])).to.be.an('array');
    });

    it('returns an array of the same length', function() {
        var result = M.map(function(){},[0,1,2]);

        expect(result).to.have.length(3);
    });

    it('calls the function N times', function() {
        var i = 0;
        M.map(function() {
            i++;
        }, [0,1,2]);

        expect(i).to.equal(3);
    });

    it('passes the current array item to the function', function() {
        var i = 1;
        M.map(function(value) {
            expect(value).to.equal(i*10);
            i++;
        }, [10,20,30]);
        expect(i).to.equal(4);
    });

    it('returns an array of the function return values', function() {
        var result = M.map(function(value) {
            return value-1;
        }, [10,20,30]);

        expect(result).to.deep.equal([9,19,29]);
    });

    it('preserves the context', function() {
        var result = M.map.call({name: 'Justin'}, function() {
            return 'hi from ' + this.name;
        }, [0]);

        expect(result[0]).to.equal('hi from Justin');
    });

    it('can be curried', function() {
        var mapPlus2 = M.map(function(value) {return value+2;});
        var result = mapPlus2([10,20,30]);

        expect(result[1]).to.equal(22);
    });
});