'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var http = require('http');
var concat = require('concat-stream');
var unzip = require('unzip');
var dsv = require('d3-dsv');

/* Constants. */
var ID = '20160115';
var INPUT = 'http://www-01.sil.org/iso639-3/' +
    'iso-639-3_Code_Tables_' + ID + '.zip';
var ENTRY = 'iso-639-3_' + ID + '.tab';
var OUTPUT = path.join(__dirname, 'index.json');

/* Constants. */
var SCOPES = {
  I: 'individual',
  M: 'macrolanguage',
  S: 'special'
};

var TYPES = {
  A: 'ancient',
  C: 'constructed',
  E: 'extinct',
  H: 'historical',
  L: 'living',
  S: 'special'
};

/* Core. */
http.request(INPUT, function (response) {
  response.pipe(new unzip.Parse()).on('entry', function (entry) {
    if (path.basename(entry.path) !== ENTRY) {
      entry.autodrain();
      return;
    }

    entry.pipe(concat(function (body) {
      var data = dsv.tsvParse(body.toString()).map(function (language) {
        return {
          name: language.Ref_Name || null,
          type: TYPES[language.Language_Type],
          scope: SCOPES[language.Scope],
          iso6393: language['﻿Id'], // There’s a `<U+FEFF>`
          // in there, I don’t know why, but meh.
          iso6392B: language.Part2B || null,
          iso6392T: language.Part2T || null,
          iso6391: language.Part1 || null
        };
      });

      fs.writeFile(OUTPUT, JSON.stringify(data, 0, 2) + '\n');
    }));
  });
}).end();
