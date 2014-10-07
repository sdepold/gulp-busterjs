# gulp-busterjs

This module allows you to run your [BusterJS](http://docs.busterjs.org) tests
with [gulp](http://gulpjs.com). It will also replace your configuration file
and generate them on each test run for you.

## Getting started

Using the module is as simple as that:

```js
"use strict";

var path   = require("path");
var gulp   = require("gulp");
var buster = require("gulp-busterjs");

gulp.task("test", function () {
  gulp
    .src(path.resolve(__dirname, "test", "**", "*-test.js"))
    .pipe(buster());
});
```
