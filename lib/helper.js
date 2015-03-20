'use strict';

var _       = require('lodash');
var fs      = require('fs');
var path    = require('path');
var child   = require('child_process');
var spawn   = child.spawn;
var resolve = require('resolve').sync;
var lodash  = require('lodash');

module.exports = {
  getConfigPath: function () {
    return path.resolve(process.cwd(), 'buster.js');
  },

  generateBusterFile: function (options, tests) {
    options = lodash.extend({
      name:         'testrun ' + ~~(9999 * Math.random()),
      environment:  'node',
      rootPath:     process.cwd(),
      failOnStderr: true
    }, options);

    options.tests = tests.map(function (file) {
      return path.relative(options.rootPath, file);
    });

    var content = [
      '"use strict";',
      'var config = module.exports;',
      'config["' + options.name + '"] = ' + JSON.stringify(_.omit(options, 'failOnStderr'))
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

  getSpawnOptions: function(options) {
    function defaultTransformer (args) {
      return args;
    }

    var defaultArgs = [this.findBusterExecutable(), ['-c', this.getConfigPath()]];
    var transformer = (options || {}).transformSpawnArgs || defaultTransformer;

    return transformer(defaultArgs);
  },

  runBuster: function (options, stdout, stderr, callback) {
    var code = 0;
    var args = this.getSpawnOptions(options);
    var call = spawn(args[0], args[1]);

    call.stdout.on('data', function(data) {
      var lines = data.toString().split('\n');

      // This is overly bad and needs to get fixed.
      // Ideally one would correctly read the exit code of buster.
      lines.forEach(function (line) {
        if (
          (line.indexOf('runtime ... ') > -1) &&
          (line.indexOf('%') === -1) &&
          (line.indexOf('OK') === -1)
        ) {
          code = 1;
        }
      });

      stdout.write(data);
    });

    call.stderr.on('data', function (data) {
      if (options.failOnStderr) {
        code = 2;
      } else {
        var lines = data.toString().split('\n');

        lines.forEach(function (line) {
          if (line.indexOf('Failed requiring') > -1) {
            code = 3;
          }
        });
      }
      
      stderr.write(data);
    });

    call.on('exit', function () {
      callback(code);
    });
  }
};
