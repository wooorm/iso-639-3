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

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'
import concatStream from 'concat-stream'
import yauzl from 'yauzl'
import {tsvParse} from 'd3-dsv'
import {bail} from 'bail'

/** @type {string[]} */
const other = []
let found = false

/** @type {Record<string, string>} */
const scopes = {
  I: 'individual',
  M: 'macrolanguage',
  S: 'special'
}

/** @type {Record<string, string>} */
const types = {
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
const url =
  'https://iso639-3.sil.org/sites/iso639-3/files/downloads/iso-639-3_Code_Tables_20200515.zip'
const expectedName = 'iso-639-3_20200515.tab'

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
  yauzl.open('archive.zip', {lazyEntries: true}, (error, archive) => {
    bail(error)
    assert(archive, 'expecter `archive` if w/o error')

    read()

    archive.on(
      'entry',
      /**
       * @param {import('yauzl').Entry} entry
       */ (entry) => {
        const name = path.basename(entry.fileName)

        if (name !== expectedName) {
          other.push(name)
          return read()
        }

        found = true
        archive.openReadStream(entry, (error, rs) => {
          bail(error)
          assert(rs, 'expecter readable stream if w/o error')
          rs.pipe(concatStream(onconcat)).on('error', bail)
          rs.on('end', read)
        })
      }
    )

    archive.on('end', () => {
      if (!found) {
        throw new Error('File not found, pick one of: `' + other + '`')
      }
    })

    function read() {
      assert(archive, 'expecter `archive` if w/o error')
      archive.readEntry()
    }
  })
}

/**
 * @param {Buffer} body
 */
async function onconcat(body) {
  const data = tsvParse(String(body)).map((d) => {
    const name = d.Ref_Name
    const id = d.Id
    const languageType = d.Language_Type
    const languageScope = d.Scope
    assert(typeof name === 'string', 'expected language w/ names')
    assert(typeof languageType === 'string', 'expected language w/ types')
    assert(typeof languageScope === 'string', 'expected language w/ scopes')
    assert(typeof id === 'string', 'expected language w/ ids')
    assert(languageType in types, 'expected language w/ types')
    assert(languageScope in scopes, 'expected language w/ scopes')

    /** @type {Language} */
    const result = {
      name,
      type: types[languageType],
      scope: scopes[languageScope],
      iso6393: id,
      iso6392B: d.Part2B || undefined,
      iso6392T: d.Part2T || undefined,
      iso6391: d.Part1 || undefined
    }

    return result
  })

  /** @type {Record<string, string>} */
  const toB = {}
  /** @type {Record<string, string>} */
  const toT = {}
  /** @type {Record<string, string>} */
  const to1 = {}
  let index = -1

  while (++index < data.length) {
    const d = data[index]
    if (d.iso6392B) toB[d.iso6393] = d.iso6392B
    if (d.iso6392T) toT[d.iso6393] = d.iso6392T
    if (d.iso6391) to1[d.iso6393] = d.iso6391
  }

  await fs.promises.writeFile(
    'iso6393.js',
    [
      '/**',
      " * @typedef {'living'|'historical'|'extinct'|'ancient'|'constructed'|'special'} Type",
      ' *   Category of a language:',
      ' *',
      " *   *   `'living'`",
      ' *       — currently spoken language',
      ' *       (example: `nhi` for `Zacatlán-Ahuacatlán-Tepetzintla Nahuatl`)',
      " *   *   `'historical'`",
      ' *       — extinct language distinct from modern languages that descended from it',
      ' *       (example: `ofs` for `Old Frisian`)',
      " *   *   `'extinct'`",
      ' *       — language that went extinct recently',
      ' *       (example: `rbp` for `Barababaraba`)',
      " *   *   `'ancient'`",
      ' *       — language that went extinct long ago',
      ' *       (example: `got` for `Gothic`)',
      " *   *   `'constructed'`",
      ' *       — artificial languages, excluding programming languages',
      ' *       (example: `epo` for `Esperanto`)',
      " *   *   `'special'`",
      ' *       — non-language codes',
      ' *       (example: `und` for `Undetermined`)',
      ' *',
      " * @typedef {'individual'|'macrolanguage'|'special'} Scope",
      ' *   Scope of a language:',
      ' *',
      " *   *   `'individual'`",
      ' *       — normal, single language',
      ' *       (example: `eng` for `English`)',
      " *   *   `'macrolanguage'`",
      ' *       — one-to-many grouping of languages, because older ISO 639s included them',
      ' *       (example: `ara` for `Arabic`)',
      " *   *   `'special'`",
      ' *       — non-language codes',
      ' *       (example: `und` for `Undetermined`)',
      ' *',
      ' * @typedef Language',
      ' *   Object representing a language.',
      ' * @property {string} name',
      " *   Name (example: `'English'`).",
      ' * @property {Type} type',
      " *   Type (example: `'living'`).",
      ' * @property {Scope} scope',
      " *   Scope (example: `'individual'`)",
      ' * @property {string} iso6393',
      ' *   ISO 639-3 code.',
      ' * @property {string} [iso6392B]',
      " *   ISO 639-2 (bibliographic) code (example: `'eng'`).",
      ' * @property {string} [iso6392T]',
      " *   ISO 639-2 (terminologic) code (example: `'eng'`).",
      ' * @property {string} [iso6391]',
      " *   ISO 639-1 code (example: `'en'`).",
      ' */',
      '',
      '/**',
      ' * List of ISO 639-3 languages.',
      ' *',
      ' * @type {Array<Language>}',
      ' */',
      '// @ts-expect-error',
      'export const iso6393 = ' + JSON.stringify(data, null, 2),
      ''
    ].join('\n')
  )

  await fs.promises.writeFile(
    'iso6393-to-1.js',
    [
      '/**',
      ' * Map of ISO 639-3 codes to ISO 639-1 codes.',
      ' *',
      ' * @type {Record<string, string>}',
      ' */',
      'export const iso6393To1 = ' + JSON.stringify(to1, null, 2),
      ''
    ].join('\n')
  )

  await fs.promises.writeFile(
    'iso6393-to-2b.js',
    [
      '/**',
      ' * Map of ISO 639-3 codes to bibliographic ISO 639-2 codes.',
      ' *',
      ' * @type {Record<string, string>}',
      ' */',
      'export const iso6393To2B = ' + JSON.stringify(toB, null, 2),
      ''
    ].join('\n')
  )

  await fs.promises.writeFile(
    'iso6393-to-2t.js',
    [
      '/**',
      ' * Map of ISO 639-3 codes to terminologic ISO 639-2 codes.',
      ' *',
      ' * @type {Record<string, string>}',
      ' */',
      'export const iso6393To2T = ' + JSON.stringify(toT, null, 2),
      ''
    ].join('\n')
  )
}
