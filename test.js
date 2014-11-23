'use strict';

/**
 * Dependencies.
 */

var iso6393,
    assert;

iso6393 = require('./');
assert = require('assert');

/**
 * Tests.
 */

describe('iso6393.get(property)', function () {
    it('should return the value of an item in the database', function () {
        var result;

        result = iso6393.get('eng');

        assert(typeof result === 'object');

        assert(result.iso6392B === 'eng');
        assert(result.iso6392T === 'eng');
        assert(result.iso6391 === 'en');
        assert(result.scope === 'individual');
        assert(result.type === 'living');
        assert(result.name === 'English');
        assert(result.comment === null);
    });

    it('should return null if am item is not in the database', function () {
        assert(iso6393.get('zzz') === null);
    });
});

describe('iso6393.has(property)', function () {
    it('should return if an item is in the database', function () {
        assert(iso6393.has('eng') === true);
        assert(iso6393.has('unicorn') === false);
    });

    it('should not fail on prototpe extending', function () {
        /* eslint-disable no-extend-native */
        Object.prototype.unicorn = 'mammal';

        assert(!iso6393.has('unicorn'));

        delete Object.prototype.unicorn;
        /* eslint-enable no-extend-native */
    });

    it('should not fail on native properties', function () {
        assert(!iso6393.has('toString'));
        assert(!iso6393.has('constructor'));
        assert(!iso6393.has('hasOwnProperty'));
    });
});

describe('iso6393.all()', function () {
    var all;

    all = iso6393.all();

    it('should return an object', function () {
        assert(typeof all === 'object');
    });

    it('should return all values in the datamap', function () {
        assert(Object.keys(all).length === 7879);

        assert('eng' in all);
        assert('nld' in all);
    });

    it('should be immutable', function () {
        all.unicorn = 'mammal';

        assert(!iso6393.has('unicorn'));

        assert(!('unicorn' in iso6393.all()));
    });
});
