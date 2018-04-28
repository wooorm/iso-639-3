'use strict'

var fs = require('fs')
var path = require('path')
var https = require('https')
var concat = require('concat-stream')
var unzip = require('unzip')
var dsv = require('d3-dsv')
var bail = require('bail')

var found

var SCOPES = {
  I: 'individual',
  M: 'macrolanguage',
  S: 'special'
}

var TYPES = {
  A: 'ancient',
  C: 'constructed',
  E: 'extinct',
  H: 'historical',
  L: 'living',
  S: 'special'
}

https
  .request(
    'https://iso639-3.sil.org/sites/iso639-3/files/downloads/iso-639-3_Code_Tables_20180123.zip',
    onrequest
  )
  .end()

process.on('exit', onexit)

function onexit() {
  if (!found) {
    throw new Error('Could not find expected file')
  }
}

function onrequest(response) {
  response.pipe(new unzip.Parse()).on('entry', onentry)
}

function onentry(entry) {
  if (path.basename(entry.path) === 'iso-639-3_20180123.tab') {
    found = true
    entry.pipe(concat(onconcat))
  } else {
    entry.autodrain()
  }
}

function onconcat(body) {
  var data = dsv.tsvParse(String(body)).map(mapper)

  fs.writeFile('index.json', JSON.stringify(data, 0, 2) + '\n', bail)
}

function mapper(language) {
  return {
    name: language.Ref_Name || null,
    type: TYPES[language.Language_Type],
    scope: SCOPES[language.Scope],
    iso6393: language['﻿Id'], // There’s a `<U+FEFF>`
    // in there, I don’t know why, but meh.
    iso6392B: language.Part2B || null,
    iso6392T: language.Part2T || null,
    iso6391: language.Part1 || null
  }
}
