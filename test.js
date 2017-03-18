'use strict';

/* Dependencies. */
var test = require('tape');
var iso6393 = require('./');

/* Tests. */
test('iso6393', function (t) {
  t.plan(8);

  t.ok(Array.isArray(iso6393), 'should be an `array`');

  iso6393.forEach(function (language) {
    if (language.iso6393 !== 'eng') {
      return;
    }

    t.equal(language.iso6393, 'eng', 'should have a 639-3 code');
    t.equal(language.iso6392B, 'eng', 'should have a 639-2B code');
    t.equal(language.iso6392T, 'eng', 'should have a 639-2T code');
    t.equal(language.iso6391, 'en', 'should have a 639-1 code');
    t.equal(language.scope, 'individual', 'should have a scope');
    t.equal(language.type, 'living', 'should have a type');
    t.equal(language.name, 'English', 'should have a name');
  });
});
