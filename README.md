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

var path   = require("path");
var gulp   = require("gulp");
var buster = require("gulp-busterjs");

gulp.task("test", function () {
  gulp
    .src(path.resolve(__dirname, "test", "**", "*-test.js"))
    .pipe(buster());
});
```
