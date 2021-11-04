# iso-639-3

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Info on ISO 639-3.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`iso6393`](#iso6393)
    *   [`iso6393To1`](#iso6393to1)
    *   [`iso6393To2B`](#iso6393to2b)
    *   [`iso6393To2T`](#iso6393to2t)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package contains info on [ISO 639-3][iso].
ISO 639-3 is a set of codes that defines three letter identifiers for all known
human languages, whether living, extinct, ancient, historic, or constructed.

## When should I use this?

You can use this package any time you have to deal with languages or ISO 639-3
in particular.

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install iso-639-3
```

In Deno with [Skypack][]:

```js
import {iso6393} from 'https://cdn.skypack.dev/iso-639-3@3?dts'
```

In browsers with [Skypack][]:

```html
<script type="module">
  import {iso6393} from 'https://cdn.skypack.dev/iso-639-3@3?min'
</script>
```

## Use

```js
import {iso6393} from 'iso-639-3'

console.log(iso6393.slice(1820, 1830))
```

Yields:

```js
[
  {name: 'En', type: 'living', scope: 'individual', iso6393: 'enc'},
  {name: 'Ende', type: 'living', scope: 'individual', iso6393: 'end'},
  {name: 'Forest Enets', type: 'living', scope: 'individual', iso6393: 'enf'},
  {
    name: 'English',
    type: 'living',
    scope: 'individual',
    iso6393: 'eng',
    iso6392B: 'eng',
    iso6392T: 'eng',
    iso6391: 'en'
  },
  {name: 'Tundra Enets', type: 'living', scope: 'individual', iso6393: 'enh'},
  {name: 'Enlhet', type: 'living', scope: 'individual', iso6393: 'enl'},
  {
    name: 'Middle English (1100-1500)',
    type: 'historical',
    scope: 'individual',
    iso6393: 'enm',
    iso6392B: 'enm',
    iso6392T: 'enm'
  },
  {name: 'Engenni', type: 'living', scope: 'individual', iso6393: 'enn'},
  {name: 'Enggano', type: 'living', scope: 'individual', iso6393: 'eno'},
  {name: 'Enga', type: 'living', scope: 'individual', iso6393: 'enq'}
]
```

## API

This package exports the following identifiers: `iso6393`, `iso6393To1`,
`iso6393To2B`, and `iso6393To2T`.
There is no default export.

### `iso6393`

List of [`Language`][language]s (`Array<Language>`).

#### `Language`

Object representing a language:

*   `name` (`string`)
    — name (example: `'English'`)
*   `type` (`string`)
    — [`Type`][type] (example: `'living'`)
*   `scope` (`string`)
    — [`Scope`][scope] (example: `'individual'`)
*   `iso6393` (`string`)
    — ISO 639-3 code (example: `'eng'`)
*   `iso6392B` (`string?`)
    — ISO 639-2 (bibliographic) code (example: `'eng'`)
*   `iso6392T` (`string?`)
    — ISO 639-2 (terminologic) code (example: `'eng'`)
*   `iso6391` (`string?`) — ISO 639-1 code
    — ISO 639-1 code (example: `'en'`)

#### `Type`

Category of a language:

*   `'living'`
    — currently spoken language
    (example: `nhi` for `Zacatlán-Ahuacatlán-Tepetzintla Nahuatl`)
*   `'historical'`
    — extinct language distinct from modern languages that descended from it
    (example: `ofs` for `Old Frisian`)
*   `'extinct'`
    — language that went extinct recently
    (example: `rbp` for `Barababaraba`)
*   `'ancient'`
    — language that went extinct long ago
    (example: `got` for `Gothic`)
*   `'constructed'`
    — artificial languages, excluding programming languages
    (example: `epo` for `Esperanto`)
*   `'special'`
    — non-language codes
    (example: `und` for `Undetermined`)

#### `Scope`

Scope of a language:

*   `'individual'`
    — normal, single language
    (example: `eng` for `English`)
*   `'macrolanguage'`
    — one-to-many grouping of languages, because older ISO 639s included them
    (example: `ara` for `Arabic`)
*   `'special'`
    — non-language codes
    (example: `und` for `Undetermined`)

### `iso6393To1`

Map of ISO 639-3 codes to ISO 639-1 codes (`Record<string, string>`).

### `iso6393To2B`

Map of ISO 639-3 codes to bibliographic ISO 639-2 codes
(`Record<string, string>`).

### `iso6393To2T`

Map of ISO 639-3 codes to terminologic ISO 639-2 codes
(`Record<string, string>`).

## Types

This package is fully typed with [TypeScript][].

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
It also works in Deno and modern browsers.

## Security

This package is safe.

## Related

*   [`bcp-47`](https://github.com/wooorm/bcp-47)
    — Parse and serialize BCP 47 language tags
*   [`bcp-47-match`](https://github.com/wooorm/bcp-47-match)
    — Match BCP 47 language tags with language ranges per RFC 4647
*   [`bcp-47-normalize`](https://github.com/wooorm/bcp-47-normalize)
    — Normalize, canonicalize, and format BCP 47 tags
*   [`iso-3166`](https://github.com/wooorm/iso-3166)
    — ISO 3166 codes
*   [`iso-639-2`](https://github.com/wooorm/iso-639-2)
    — ISO 639-2 codes
*   [`iso-15924`](https://github.com/wooorm/iso-15924)
    — ISO 15924 codes
*   [`un-m49`](https://github.com/wooorm/un-m49)
    — UN M49 codes

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://github.com/wooorm/iso-639-3/workflows/main/badge.svg

[build]: https://github.com/wooorm/iso-639-3/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/iso-639-3.svg

[coverage]: https://codecov.io/github/wooorm/iso-639-3

[downloads-badge]: https://img.shields.io/npm/dm/iso-639-3.svg

[downloads]: https://www.npmjs.com/package/iso-639-3

[size-badge]: https://img.shields.io/bundlephobia/minzip/iso-639-3.svg

[size]: https://bundlephobia.com/result?p=iso-639-3

[npm]: https://docs.npmjs.com/cli/install

[skypack]: https://www.skypack.dev

[license]: license

[author]: https://wooorm.com

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[iso]: https://iso639-3.sil.org

[language]: #language

[type]: #type

[scope]: #scope
