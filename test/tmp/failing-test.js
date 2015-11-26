'use strict';

var buster   = require('buster');
var expect   = buster.expect;
var describe = buster.spec.describe;
var it       = buster.spec.it;

describe('gulp-busterjs', function () {
  it('throws when I print a runtime error', function () {
    expect(false).toEqual(true);
  });
});
