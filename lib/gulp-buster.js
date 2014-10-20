"use strict";

var through     = require("through2");
var gutil       = require("gulp-util");
var PluginError = gutil.PluginError;
var helper      = require("./helper");

module.exports = function (options) {
  var files = [];

  return through.obj(function (file, enc, cb) {
    this.push(file);
    files.push(file.path);
    cb();
  }, function (cb) {
    helper.generateBusterFile(options || {}, files);
    helper.runBuster(process.stdout, process.stderr, function (code) {
      helper.deleteBusterFile();

      if (code !== 0) {
        cb(new PluginError("gulp-busterjs", "Buster failed."));
      } else {
        cb();
      }
    });
  });
};
