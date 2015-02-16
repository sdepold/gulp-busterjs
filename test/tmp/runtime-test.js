'use strict';

var buster   = require('buster');
var expect   = buster.expect;
var describe = buster.spec.describe;
var it       = buster.spec.it;

describe('gulp-busterjs', function () {
  it('throws when I print a runtime error', function () {
    console.log('1 test, 0 assertions, 1 runtime ... 1 failure');
    expect(true).toEqual(true);
  });
});
