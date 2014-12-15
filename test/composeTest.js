var C = require('../lib/compose.js');
var expect = require('chai').expect;

describe('compose', function() {
    it('returns a function', function() {
        var result = C.compose(function(){}, function(){});
        expect(result).to.be.a('function');
    });

    it('calls second function then first', function() {
        var i = 0;
        var composed = C.compose(function(){
            expect(i).to.equal(1);
        },function(){
            expect(i).to.equal(0);
            i = 1;
        });

        composed();
        expect(i).to.equal(1);
    });

    it('passes arguments to the second function', function(done) {
        var composed = C.compose(function(){}, function(arg) {
            expect(arg).to.equal('hi');
            done();
        });

        composed('hi');
    });

    it('passes the result of the second function to the first', function(done) {
        var composed = C.compose(function(value) {
            expect(value).to.equal('hi');
            done();
        }, function() {
            return 'hi';
        });

        composed();
    });

    it('returns the result of the first function', function() {
         var composed = C.compose(function() {
            return 'hi';
        }, function(){});

        expect(composed()).to.equal('hi');
    });

    it('sets the context of the second function', function(done) {
        var ctx = {};
        var composed = C.compose(function(){}, function() {
            expect(this).to.equal(ctx);
            done();
        });

        composed.call(ctx);
    });

    it('sets the context of the first function', function(done) {
        var ctx = {};
        var composed = C.compose(function() {
            expect(this).to.equal(ctx);
            done();
        }, function(){});

        composed.call(ctx);
    });

    it('can curry', function() {
        var composeWithAdd2 = C.compose(function(value) {
            return value + 2;
        });
        var multiplyBy5ThenAdd2 = composeWithAdd2(function(value) {
            return value * 5;
        });

        expect(multiplyBy5ThenAdd2(2)).to.equal(12);
    });
});