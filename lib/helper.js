'use strict';

var fs      = require('fs');
var path    = require('path');
var spawn   = require('child_process').spawn;
var resolve = require('resolve').sync;
var lodash  = require('lodash');

module.exports = {
  getConfigPath: function () {
    return path.resolve(process.cwd(), 'buster.js');
  },

  generateBusterFile: function (options, tests) {
    options = lodash.extend({
      name:        'testrun ' + ~~(9999 * Math.random()),
      environment: 'node',
      rootPath:    process.cwd()
    }, options);

    options.tests = tests.map(function (file) {
      return path.relative(options.rootPath, file);
    });

    var content = [
      '"use strict";',
      'var config = module.exports;',
      'config["' + options.name + '"] = ' + JSON.stringify(options)
    ].join('\n');

    fs.writeFileSync(this.getConfigPath(), content);
  },

  deleteBusterFile: function () {
    if (fs.existsSync(this.getConfigPath())) {
      fs.unlinkSync(this.getConfigPath());
    }
  },

  findBusterExecutable: function () {
    // Will be smth like node_modules/buster/lib/buster.js
    var busterPath = resolve('buster', { basedir: process.cwd() });

    // Will be smth like node_modules/buster/lib
    var busterDir  = path.dirname(busterPath);

    // Resolve to node_modules/buster/bin/buster-test
    return path.resolve(busterDir, '..', 'bin', 'buster-test');
  },

  runBuster: function (options, stdout, stderr, callback) {
    var code = 0;
    var call = spawn(
      this.findBusterExecutable(),
      [ '-c', this.getConfigPath() ]
    );

    call.stdout.on('data', function(data) {
      var lines = data.toString().split('\n');

      // This is overly bad and needs to get fixed.
      // Ideally one would correctly read the exit code of buster.
      lines.forEach(function (line) {
        if (!!line.match(/\sruntime\s...\s\d/)) {
          code = 1;
        }
      });

      stdout.write(data);
    });

    call.stderr.on('data', function (data) {
      if (options.failOnStderr) {
        code = 2;
      }
      stderr.write(data);
    });

    call.on('exit', function () {
      callback(code);
    });
  }
};
