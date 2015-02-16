'use strict';

var path   = require('path');
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var buster = require(path.resolve(__dirname, 'lib', 'gulp-buster'));
var noop   = function () {};

gulp.task('default', ['lint', 'test'], noop);

gulp.task('lint', function () {
  gulp
    .src([
      './gulpfile.js',
      './lib/*.js',
      './test/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.instafailReporter());
});

gulp.task('test', ['test-unit', 'test-integration'], noop);

gulp.task('test-unit', function () {
  return gulp
    .src('./test/unit/**/*-test.js')
    .pipe(buster({ name: 'unit' }));
});

//
// Add test-unit as dependency ensures the serial order of the tests.
//
gulp.task('test-integration', ['test-unit'], function () {
  return gulp
    .src('./test/integration/**/*-test.js')
    .pipe(buster({ name: 'integration' }));
});
