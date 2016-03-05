# iso-639-3 [![Build Status][build-badge]][build-page] [![Coverage Status][coverage-badge]][coverage-page]

[ISO 639-3][iso] codes in an accessible format, all of them.

## Installation

[npm][]:

```bash
npm install iso-639-3
```

**iso-639-3** is also available as an AMD, CommonJS, and globals
module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var iso6393 = require('iso-639-3');
```

Inspecting some values yields:

```js
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

And the `length` computes to:

```js
7879
```

## API

### `iso6393`

`Array.<Language>` — List of languages.

### `Language`

`Object`:

*   `name` (`string`) — Language name;
*   `type` ([`Type`][type]) — Language type;
*   `type` ([`Scope`][scope]) — Language scope;
*   `iso6392B` (`string?`) — Bibliographic ISO 639-2 code, if available;
*   `iso6392T` (`string?`) — Terminological ISO 639-2 code, if available;
*   `iso6391` (`string?`) — ISO 639-1 code, if available.

## `Type`

`string`, one of the following:

*   `'living'`
    — Still spoken languages, for example,
    `Zacatlán-Ahuacatlán-Tepetzintla Nahuatl` (`nhi`);

*   `'historical'`
    — Distinct from any modern languages that are descended from it, for
    example, `Old Frisian` (`ofs`);

*   `'extinct'`
    — Language which went extinct  in recent time, for example,
    `Barababaraba` (`rbp`);

*   `'ancient'`
    — Language which went extinct in ancient times, for example,
    `Gothic` (`got`);

*   `'constructed'`
    — Artificial languages (but not programming languages), for example,
    `Esperanto` (`epo`);

*   `'special'`
    — Non-language codes, for example, `Undetermined` (`und`).

## `Scope`

`string`, one of the following:

*   `'special'`
    — Non-language codes, for example, `Undetermined` (`und`);

*   `'macrolanguage'`
    — One-to-many grouping of languages, because older ISO 639s,
    included them, for example, `Arabic` (`ara`);

*   `'language'`
    — Normal, single language, for example, `English` (`eng`).

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/wooorm/iso-639-3.svg

[build-page]: https://travis-ci.org/wooorm/iso-639-3

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/iso-639-3.svg

[coverage-page]: https://codecov.io/github/wooorm/iso-639-3?branch=master

[npm]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/iso-639-3/releases

[license]: LICENSE

[author]: http://wooorm.com

[iso]: http://www-01.sil.org/iso639-3

[type]: #type

[scope]: #scope
