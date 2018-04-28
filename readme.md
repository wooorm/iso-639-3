# iso-639-3 [![Build Status][build-badge]][build-page]

[ISO 639-3][iso] codes in an accessible format, all of them.

## Installation

[npm][]:

```bash
npm install iso-639-3
```

## Usage

```javascript
var iso6393 = require('iso-639-3')

console.log(iso6393.slice(1822, 1827))
```

Yields:

```javascript
[ { name: 'Ende',
    type: 'living',
    scope: 'individual',
    iso6393: 'end',
    iso6392B: null,
    iso6392T: null,
    iso6391: null },
  { name: 'Forest Enets',
    type: 'living',
    scope: 'individual',
    iso6393: 'enf',
    iso6392B: null,
    iso6392T: null,
    iso6391: null },
  { name: 'English',
    type: 'living',
    scope: 'individual',
    iso6393: 'eng',
    iso6392B: 'eng',
    iso6392T: 'eng',
    iso6391: 'en' },
  { name: 'Tundra Enets',
    type: 'living',
    scope: 'individual',
    iso6393: 'enh',
    iso6392B: null,
    iso6392T: null,
    iso6391: null },
  { name: 'Enlhet',
    type: 'living',
    scope: 'individual',
    iso6393: 'enl',
    iso6392B: null,
    iso6392T: null,
    iso6391: null } ]
```

## API

### `iso6393`

`Array.<Language>` — List of languages.

### `Language`

`Object`:

###### `name`

Language name (`string`).

###### `type`

Language type ([`Type`][type]).

###### `type`

Language scope ([`Scope`][scope])

###### `iso6392B`

Bibliographic ISO 639-2 code, if available (`string?`).

###### `iso6392T`

Terminological ISO 639-2 code, if available (`string?`).

###### `iso6391`

ISO 639-1 code, if available (`string?`).

## `Type`

`string`, one of the following:

###### `'living'`

Still spoken languages (example: `nhi` for `Zacatlán-Ahuacatlán-Tepetzintla
Nahuatl`).

###### `'historical'`

Distinct from any modern languages that are descended from it (example: `ofs`
for `Old Frisian`).

###### `'extinct'`

Language that went extinct in recent time (example: `rbp` for `Barababaraba`).

###### `'ancient'`

Language that went extinct in ancient times (example: `got` for `Gothic`).

###### `'constructed'`

Artificial languages, but not programming languages (example: `epo` for
`Esperanto`).

###### `'special'`

Non-language codes (example: `und` for `Undetermined`).

## `Scope`

`string`, one of the following:

###### `'special'`

Non-language codes (example: `und` for `Undetermined`).

###### `'macrolanguage'`

One-to-many grouping of languages, because older ISO 639s included them
(example: `ara` for `Arabic`).

###### `'language'`

Normal, single language (example: `eng` for `English`).

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/wooorm/iso-639-3.svg

[build-page]: https://travis-ci.org/wooorm/iso-639-3

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[iso]: http://www-01.sil.org/iso639-3

[type]: #type

[scope]: #scope
