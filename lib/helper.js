"use strict";

var fs      = require("fs");
var path    = require("path");
var spawn   = require("child_process").spawn;

module.exports = {
  getConfigPath: function () {
    return path.resolve(process.cwd(), "buster.js");
  },

  generateBusterFile: function (tests) {
    var content = [
      "'use strict';",
      "var config = module.exports;",
      "config.unit = " + JSON.stringify({
        environment: "node",
        rootPath: process.cwd(),
        tests: tests.map(function (file) {
          return path.relative(process.cwd(), file);
        })
      })
    ].join("\n");

    fs.writeFileSync(this.getConfigPath(), content);
  },

  deleteBusterFile: function () {
    fs.unlinkSync(this.getConfigPath());
  },

  runBuster: function (stdout, stderr, callback) {
    var code = 0;

    var call = spawn(
      path.resolve(__dirname, "..", "node_modules", ".bin", "buster-test"),
      [ "-c", this.getConfigPath() ]
    );

    call.stdout.on("data", function(data) {
      var lines = data.toString().split("\n");

      // This is overly bad and needs to get fixed.
      // Ideally one would correctly read the exit code of buster.
      lines.forEach(function (line) {
        if (line.indexOf("Failure: ") !== -1) {
          code = 1;
        }
      });

      stdout.write(data);
    });

    call.stderr.on("data", function (data) {
      stderr.write(data);
    });

    call.on("exit", function () {
      callback(code);
    });
  }
};
