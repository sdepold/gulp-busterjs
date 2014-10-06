"use strict";

var through = require("through");
var helper  = require("./helper");

module.exports = function () {
  var files = [];

  return through(function (file) {
    files.push(file);
    this.queue(file);
  }, function () {
    files = files.map(function (file) {
      return file.path;
    });

    helper.generateBusterFile(files);
    helper.runBuster(process.stdout, process.stderr, function (code) {
      helper.deleteBusterFile();
      process.exit(code);
    });
  });
};
