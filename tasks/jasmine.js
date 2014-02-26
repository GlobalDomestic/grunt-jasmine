/*
 * grunt-jasmine
 * https://github.com/GlobalDomestic/grunt-jasmine
 *
 * Copyright (c) 2014 GlobalDomestic
 * Licensed under the MIT license.
 */

'use strict';
var util = require('util');
var path = require('path');
var jasmineRequire = require('jasmine-core/lib/jasmine-core/jasmine.js');
var consoleFns = require('jasmine-core/lib/console/console.js');
var jasmine = jasmineRequire.core(jasmineRequire);

extend(jasmineRequire, consoleFns);
jasmineRequire.console(jasmineRequire, jasmine);

var env = jasmine.getEnv();

var jasmineInterface = {
  describe: function describe(description, specDefinitions) {
    return env.describe (description, specDefinitions);
  },
  xdescribe: function xdescribe(description, specDefinitions) {
    return env.xdescribe(description, specDefinitions);
  },
  it: function it(desc, func) {
    return env.it(desc, func);
  },
  xit: function xit(desc, func) {
    return env.xit(desc, func);
  },
  beforeEach: function beforeEach(beforeEachFunction) {
    return env.beforeEach(beforeEachFunction);
  },
  afterEach: function afterEach(afterEachFunction) {
    return env.afterEach(afterEachFunction);
  },
  expect: function expect(actual) {
    return env.expect(actual);
  },
  spyOn: function spyOn(obj, methodName) {
    return env.spyOn(obj, methodName);
  },
  jsApiReporter: new jasmine.JsApiReporter({
    timer: new jasmine.Timer()
  })
};

jasmine.addCustomEqualityTester = function addCustomEqualityTester(tester) {
  env.addCustomEqualityTester(tester);
};

jasmine.addMatchers = function addMatchers(matchers) {
  return env.addMatchers(matchers);
};

jasmine.clock = function clock() {
  return env.clock;
};

extend(global, jasmineInterface);

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('jasmine', 'Run jasmine specs through node.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async();
    var options = this.options({
      showColors: true
    });

    global.window = {
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setInterval: setInterval,
      clearInterval: clearInterval
    };

    // Iterate over all specified file groups.
    this.filesSrc.forEach(function(file) {
      var filepath = path.resolve(file);
      // Load file source.
      require(filepath);
      grunt.verbose.writeln('Loaded spec file: %s', filepath);
    });

    var jasmineEnv = jasmine.getEnv();
    var consoleReporter = new jasmine.ConsoleReporter({
      showColors: options.showColors,
      print: grunt.log.write,
      timer: new jasmine.Timer(),
      onComplete: function onComplete(exitCode) {
        done(exitCode);
      }
    });

    jasmineEnv.addReporter(consoleReporter);
    jasmineEnv.execute();
  });
};

function extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || typeof add !== 'object') {
    return origin;
  }

  var keys = Object.keys(add);
  var i = keys.length;

  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }

  return origin;
}
