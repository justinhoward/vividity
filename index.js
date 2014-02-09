var modules = [
    require('./lib/curry.js'),
    require('./lib/compose.js'),
    require('./lib/flip.js'),
    require('./lib/map.js'),
    require('./lib/reduce.js')
];

var i = 0, iLen = modules.length;
var exp;
for ( ; i < iLen; i++ ) {
    for ( exp in modules[ i ] ) {
        if (!modules[i].hasOwnProperty(exp))
            continue;

        exports[exp] = modules[i][exp];
    }
}