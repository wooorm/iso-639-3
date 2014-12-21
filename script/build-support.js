'use strict';

/*
 * Dependencies.
 */

var fs,
    iso6393;

fs = require('fs');
iso6393 = require('../');

/*
 * Write.
 */

fs.writeFileSync('Support.md',
    'Supported Codes\n' +
    '=================\n' +
    '\n' +

    /*
     * A nice table is too long: GitHub won't be able
     * to render it, so we create a boring list.
     */

    iso6393.keys().map(function (code) {
        return '- ' + code + ': ' + iso6393.get(code).name;
    }).join(';\n') +

    '.\n'
);
