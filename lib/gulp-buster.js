'use strict';

var through     = require('through2');
var gutil       = require('gulp-util');
var PluginError = gutil.PluginError;
var helper      = require('./helper');

module.exports = function (options) {
  var files = [];

  return through.obj(function (file, enc, cb) {
    this.push(file);
    files.push(file.path);
    cb();
  }, function (cb) {
    helper.generateBusterFile(options || {}, files);
    helper.spawnBusterServer(options, process.stdout, process.stderr, function (code, serverCall) {
      if (code !== 0) {
        cb(new PluginError('gulp-busterjs', 'Spawning buster server failed.'));
      } else {
        helper.runBuster(options, process.stdout, process.stderr, function (code) {
          helper.deleteBusterFile();
          helper.killBusterServer(serverCall);

          if (code !== 0) {
            cb(new PluginError('gulp-busterjs', 'Buster failed.'));
          } else {
            cb();
          }
        });
      }
    });
  });
};
