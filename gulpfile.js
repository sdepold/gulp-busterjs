"use strict";

var path   = require("path");
var gulp   = require("gulp");
var jshint = require("gulp-jshint");
var buster = require(path.resolve(__dirname, "lib", "gulp-buster"));

gulp.task("default", ["lint", "test"], function () {});

gulp.task("lint", function () {
  gulp
    .src([
      path.resolve(__dirname, "gulpfile.js"),
      path.resolve(__dirname, "lib", "*.js"),
      path.resolve(__dirname, "test", "**", "*.js")
    ])
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(jshint.instafailReporter());
});

gulp.task("test", function () {
  gulp
    .src(path.resolve(__dirname, "test", "**", "*-test.js"))
    .pipe(buster());
});
