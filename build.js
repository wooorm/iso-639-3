'use strict';

var fs = require('fs');
var path = require('path');
var http = require('http');
var concat = require('concat-stream');
var unzip = require('unzip');
var dsv = require('d3-dsv');
var bail = require('bail');

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

http
  .request('http://www-01.sil.org/iso639-3/iso-639-3_Code_Tables_20160115.zip', onrequest)
  .end();

function onrequest(response) {
  response
    .pipe(new unzip.Parse())
    .on('entry', onentry);
}

function onentry(entry) {
  if (path.basename(entry.path) === 'iso-639-3_20160115.tab') {
    entry.pipe(concat(onconcat));
  } else {
    entry.autodrain();
  }
}

function onconcat(body) {
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

  fs.writeFile('index.json', JSON.stringify(data, 0, 2) + '\n', bail);
}
