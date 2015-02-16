'use strict';

var path = require('path');
var execSync = require('exec-sync');

var helper = module.exports = {
  tmpDir: function (relativePath) {
    return path.resolve(__dirname, 'tmp', relativePath);
  },

  prepare: function () {
    execSync('rm -rf ' + helper.tmpDir('scope'));
    execSync('mkdir -p ' + helper.tmpDir('scope/test/unit'));
  },

  runTest: function (filename) {
    helper.prepare();
    execSync('cp ' + helper.tmpDir(filename) + ' ' + helper.tmpDir('scope/test/unit/' + filename));
    execSync('cp ' + helper.tmpDir('gulpfile.js') + ' ' + helper.tmpDir('scope/'));
    return execSync(
      __dirname + '/../node_modules/.bin/gulp --gulpfile ' + helper.tmpDir('scope/gulpfile.js'),
      true
    );
  }
};
