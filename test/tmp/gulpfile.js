'use strict';

var gulp   = require('gulp');
var buster = require('../../../');

gulp.task('default', function () {
  return gulp
    .src('./test/unit/**/*-test.js')
    .pipe(buster({ name: 'unit' }));
});
