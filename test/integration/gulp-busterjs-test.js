'use strict';

var buster   = require('buster');
var expect   = buster.expect;
var describe = buster.spec.describe;
var it       = buster.spec.it;

var helper   = require('../helper');

describe('gulp-busterjs', function () {
  it('does not fail if the stdout prints "Error:"', function () {
    var result = helper.runTest('error-test.js');
    expect(result.stdout).not.toContain('Buster failed.');
  });

  it('fails if the test cannot require some files', function () {
    var result = helper.runTest('require-failed-test.js');
    expect(result.stdout).toContain('Buster failed.');
  });

  it('fails if with a failing test', function () {
    var result = helper.runTest('failing-test.js');
    expect(result.stdout).toContain('Buster failed.');
  });
});
