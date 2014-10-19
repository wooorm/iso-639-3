'use strict';

var fs,
    textToJSON;

fs = require('fs');
textToJSON = require('plain-text-data-to-json');

var input;

input = fs.readFileSync('data/iso-639-3.txt', 'utf8');

var data;

data = textToJSON(input, {
    'comment' : false,
    'delimiter' : null,
    'forgiving' : 'fix'
});

var dictionary,
    scopeMap,
    typeMap;

dictionary = {};

scopeMap = {
    'I' : 'individual',
    'M' : 'macrolanguage',
    'S' : 'special'
};

typeMap = {
    'A' : 'ancient',
    'C' : 'constructed',
    'E' : 'extinct',
    'H' : 'historical',
    'L' : 'living',
    'S' : 'special'
};

data.forEach(function (line) {
    var code;

    line = line.split('\t');
    code = line.shift();

    if (code === 'Id') {
        return;
    }

    dictionary[code] = {
        'iso6392B' : line[0] || null,
        'iso6392T' : line[1] || null,
        'iso6391' : line[2] || null,
        'scope' : scopeMap[line[3]],
        'type' : typeMap[line[4]],
        'name' : line[5] || null,
        'comment' : line[6] || null
    };
});

fs.writeFileSync('data/iso-639-3.json', JSON.stringify(dictionary, 0, 2));
