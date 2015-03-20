'use strict';

var buster   = require('buster');
var expect   = buster.expect;
var describe = buster.spec.describe;
var it       = buster.spec.it;

require('./nomnomnom.js');

describe('gulp-busterjs', function () {
  it('allows me to print "Error:"', function () {
    console.log('Error: ');
    expect(true).toEqual(true);
  });
});
