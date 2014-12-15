var expect = require('chai').expect;
var compose = require('../lib/compose');
var curry = require('../lib/curry');
var flip = require('../lib/flip');
var map = require('../lib/map');
var reduce = require('../lib/reduce');
var index = require('../index');

describe('index', function() {
    it('contains the correct properties', function() {
    	expect(index.compose).to.equal(compose.compose);
    	expect(index.curry).to.equal(curry.curry);
    	expect(index.autoCurry).to.equal(curry.autoCurry);
    	expect(index.flip).to.equal(flip.flip);
    	expect(index.map).to.equal(map.map);
    	expect(index.reduce).to.equal(reduce.reduce);
    	expect(index.reduceRight).to.equal(reduce.reduceRight);
    	expect(index.reduce1).to.equal(reduce.reduce1);
    	expect(index.reduceRight1).to.equal(reduce.reduceRight1);
    });
});