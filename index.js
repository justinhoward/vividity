module.exports = {
    curry: require('./lib/curry').curry,
    autoCurry: require('./lib/curry').autoCurry,
    compose: require('./lib/compose').compose,
    flip: require('./lib/flip').flip,
    map: require('./lib/map').map,
    reduce: require('./lib/reduce').reduce,
    reduceRight: require('./lib/reduce').reduceRight,
    reduce1: require('./lib/reduce').reduce1,
    reduceRight1: require('./lib/reduce').reduceRight1
};