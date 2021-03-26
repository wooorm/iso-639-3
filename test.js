import test from 'tape'
import {iso6393} from './index.js'

test('iso6393', function (t) {
  var index = -1

  t.plan(8)

  t.ok(Array.isArray(iso6393), 'should be an `array`')

  while (++index < iso6393.length) {
    if (iso6393[index].iso6393 !== 'eng') {
      continue
    }

    t.equal(iso6393[index].iso6393, 'eng', 'should have a 639-3 code')
    t.equal(iso6393[index].iso6392B, 'eng', 'should have a 639-2B code')
    t.equal(iso6393[index].iso6392T, 'eng', 'should have a 639-2T code')
    t.equal(iso6393[index].iso6391, 'en', 'should have a 639-1 code')
    t.equal(iso6393[index].scope, 'individual', 'should have a scope')
    t.equal(iso6393[index].type, 'living', 'should have a type')
    t.equal(iso6393[index].name, 'English', 'should have a name')
  }
})
