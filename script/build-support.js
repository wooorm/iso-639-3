'use strict';

var fs,
    languages;

fs = require('fs');
languages = require('../').all();

fs.writeFileSync('Supported-codes.md',
    'Supported Codes\n' +
    '=================\n' +
    '\n' +

    Object.keys(languages).map(function (code) {
        return '- ' + code + ': ' + languages[code].name;
    }).join(';\n') +

    '.\n'
);
