# gulp-busterjs [![Build Status](https://travis-ci.org/sdepold/gulp-busterjs.svg?branch=v1.0.1)](https://travis-ci.org/sdepold/gulp-busterjs)

This module allows you to run your [BusterJS](http://docs.busterjs.org) tests
with [gulp](http://gulpjs.com). It will also replace your configuration file
and generate them on each test run for you.

## Installation

```
npm install --save-dev buster gulp gulp-busterjs
```

Please note that `gulp-busterjs` will not bundle buster for you. You need
to add it on your own.

## Getting started

Using the module is as simple as that:

```js
"use strict";

var gulp   = require("gulp");
var buster = require("gulp-busterjs");

gulp.task("test", function () {
  gulp
    .src("./test/**/*-test.js")
    .pipe(buster());
});
```

If you want to run different buster configurations separated from each other
you can also do this:

```js
"use strict";

var gulp   = require("gulp");
var buster = require("gulp-busterjs");

gulp.task("test", ["test-unit", "test-integration"], function () {});

gulp.task("test-unit", function () {
  gulp
    .src("./test/unit/**/*-test.js")
    .pipe(buster({ name: "unit" }));
});

gulp.task("test-integration", function () {
  gulp
    .src("./test/integration/**/*-test.js")
    .pipe(buster({ name: "integration" }));
});
```

You can also pass additional options to the buster function:

```js
gulp.task("test", function () {
  gulp
    .src("./test/**/*-test.js")
    .pipe(buster({
      name:         "my lovely configuration name", // default: "testrun 123"
      environment:  "browser",                      // default: "node"
      rootPath:     "my/tests",                     // default: process.cwd()
      tests:        [],                             // default: the gulp files
      failOnStderr: false,                          // default: true
      useHeadlessBrowser: true,                     // default: false. Will spawn a headless phantom browser before running the tests.
      transformSpawnArgs: function (args) {
        return args;
      }
    }));
});
```
