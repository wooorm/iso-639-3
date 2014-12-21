'use strict';

/*
 * Dependencies.
 */

var fs,
    textToJSON;

fs = require('fs');
textToJSON = require('plain-text-data-to-json');

/*
 * Data.
 */

var data;

data = textToJSON(fs.readFileSync('data/iso-639-3.txt', 'utf8'), {
    'comment': false,
    'delimiter': null,
    'forgiving': 'fix'
});

/*
 * Constants.
 */

var SCOPE,
    TYPE;

SCOPE = {
    'I': 'individual',
    'M': 'macrolanguage',
    'S': 'special'
};

TYPE = {
    'A': 'ancient',
    'C': 'constructed',
    'E': 'extinct',
    'H': 'historical',
    'L': 'living',
    'S': 'special'
};

/*
 * Parse.
 */

var dictionary;

dictionary = {};

data.forEach(function (line) {
    var code;

    line = line.split('\t');
    code = line.shift();

    if (code === 'Id') {
        return;
    }

    dictionary[code] = {
        'iso6392B': line[0] || null,
        'iso6392T': line[1] || null,
        'iso6391': line[2] || null,
        'scope': SCOPE[line[3]],
        'type': TYPE[line[4]],
        'name': line[5] || null,
        'comment': line[6] || null
    };
});

/*
 * Write.
 */

fs.writeFileSync('data/iso-639-3.json', JSON.stringify(dictionary, 0, 2));
