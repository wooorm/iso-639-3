# iso-639-3 [![Build Status](https://img.shields.io/travis/wooorm/iso-639-3.svg?style=flat)](https://travis-ci.org/wooorm/iso-639-3) [![Coverage Status](https://img.shields.io/coveralls/wooorm/iso-639-3.svg?style=flat)](https://coveralls.io/r/wooorm/iso-639-3?branch=master)

[ISO-639-3](http://www-01.sil.org/iso639%2D3/) codes in an accessible format, all 7879 of 'em.

## Installation

npm:
```sh
$ npm install iso-639-3
```

## Usage

```js
var iso6393 = require('iso-639-3');

iso6393.get('eng');
/**
 * {
 *   iso6392B: 'eng',
 *   iso6392T: 'eng',
 *   iso6391: 'en',
 *   scope: 'individual',
 *   type: 'living',
 *   name: 'English',
 *   comment: null
 * }
 */

iso6393.has('unicorn'); // false

iso6393.all(); // A huge array with 7879 objects.
```

## API

See [the **datamap-interface** API](https://github.com/wooorm/datamap-interface).

## Support

See [Support.md](Support.md).

## License

MIT © [Titus Wormer](http://wooorm.com)
