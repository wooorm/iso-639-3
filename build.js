import fs from 'fs'
import path from 'path'
import https from 'https'
import concat from 'concat-stream'
import yauzl from 'yauzl'
import dsv from 'd3-dsv'
import {bail} from 'bail'

/**
 * @typedef {Object} Language
 * @property {string} name
 * @property {string} type
 * @property {string} scope
 * @property {string} iso6393
 * @property {string} [iso6392B]
 * @property {string} [iso6392T]
 * @property {string} [iso6391]
 */

/** @type {string[]} */
var other = []
var found = false

var scopes = {
  I: 'individual',
  M: 'macrolanguage',
  S: 'special'
}

var types = {
  A: 'ancient',
  C: 'constructed',
  E: 'extinct',
  H: 'historical',
  L: 'living',
  S: 'special'
}

// Note:
// You can find download links here:
// <https://iso639-3.sil.org/code_tables/download_tables>
// Just get the complete code tables in UTF-8.
var url =
  'https://iso639-3.sil.org/sites/iso639-3/files/downloads/iso-639-3_Code_Tables_20200515.zip'
var expectedName = 'iso-639-3_20200515.tab'

https.request(url, onrequest).end()

/**
 * @param {import('http').IncomingMessage} request
 */
function onrequest(request) {
  request
    .pipe(fs.createWriteStream('archive.zip'))
    .on('close', onclose)
    .on('error', bail)
}

function onclose() {
  yauzl.open('archive.zip', {lazyEntries: true}, onopen)
}

/**
 * @param {Error?} error
 * @param {import('yauzl').ZipFile} [archive]
 */
function onopen(error, archive) {
  bail(error)

  read()

  archive.on('entry', onentry)
  archive.on('end', onend)

  /**
   * @param {import('yauzl').Entry} entry
   */
  function onentry(entry) {
    var name = path.basename(entry.fileName)

    if (name !== expectedName) {
      other.push(name)
      return read()
    }

    found = true
    archive.openReadStream(entry, onreadstream)
  }

  /**
   * @param {Error?} error
   * @param {import('stream').Readable} [rs]
   */
  function onreadstream(error, rs) {
    bail(error)
    rs.pipe(concat(onconcat)).on('error', bail)
    rs.on('end', read)
  }

  function read() {
    archive.readEntry()
  }
}

function onend() {
  if (!found) {
    throw new Error('File not found, pick one of: `' + other + '`')
  }
}

/**
 * @param {Buffer} body
 */
function onconcat(body) {
  var data = dsv.tsvParse(String(body)).map(
    // @ts-ignore
    (d) => map(d)
  )
  /** @type {Object.<string, string>} */
  var toB = {}
  /** @type {Object.<string, string>} */
  var toT = {}
  /** @type {Object.<string, string>} */
  var to1 = {}
  var index = -1
  /** @type {Language} */
  var d

  while (++index < data.length) {
    d = data[index]
    if (d.iso6392B) toB[d.iso6393] = d.iso6392B
    if (d.iso6392T) toT[d.iso6393] = d.iso6392T
    if (d.iso6391) to1[d.iso6393] = d.iso6391
  }

  fs.writeFile(
    'iso6393.js',
    'export var iso6393 = ' + JSON.stringify(data, null, 2) + '\n',
    bail
  )
  fs.writeFile(
    'iso6393-to-1.js',
    'export var iso6393To1 = ' + JSON.stringify(to1, null, 2) + '\n',
    bail
  )
  fs.writeFile(
    'iso6393-to-2b.js',
    'export var iso6393To2B = ' + JSON.stringify(toB, null, 2) + '\n',
    bail
  )
  fs.writeFile(
    'iso6393-to-2t.js',
    'export var iso6393To2T = ' + JSON.stringify(toT, null, 2) + '\n',
    bail
  )
}

/**
 * @param {{Ref_Name: string, Id: string, Language_Type: string, Scope: string, Part2B?: string, Part2T: string, Part1?: string}} d
 * @returns {Language}
 */
function map(d) {
  var name = d.Ref_Name
  var id = d.Id
  /** @type {string?} */
  var type = types[d.Language_Type]
  /** @type {string?} */
  var scope = scopes[d.Scope]

  if (!name) {
    console.error('Cannot handle language w/o name', d)
  }

  if (!type) {
    console.error('Cannot handle language w/o type', d)
  }

  if (!scope) {
    console.error('Cannot handle language w/o scope', d)
  }

  if (!id) {
    console.error('Cannot handle language w/o scope', d)
  }

  return {
    name,
    type,
    scope,
    iso6393: id,
    iso6392B: d.Part2B || undefined,
    iso6392T: d.Part2T || undefined,
    iso6391: d.Part1 || undefined
  }
}
