'use strict';

var fs,
    languages;

fs = require('fs');
languages = require('./').all();

fs.writeFileSync('Supported-codes.md',
    'Supported Codes\n' +
    '=================\n' +
    '\n' +
    'Additionally to this list, there are also combinations returned, ' +
    'such as `NNP|VBN` for `England-born`.\n' +
    '\n' +
    '| ISO-639-3 | ISO-639-2B | ISO-639-2T | ISO-639-1 | scope | type |\n' +
    '| :-------: | :--------: | :--------: | :-------: | :---: | :--: |\n' +

    Object.keys(languages).map(function (code) {
        var language;

        language = languages[code];

        return '| ' +
            [
                code,
                language.iso6392B || '',
                language.iso6392T || '',
                language.iso6391 || '',
                language.scope,
                language.type
            ].join(' | ') +
            ' |';
    }).join('\n') +

    '\n'
);
