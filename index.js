var modules = [
    require('./lib/curry.js'),
    require('./lib/flip.js')
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