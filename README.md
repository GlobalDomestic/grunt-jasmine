# grunt-jasmine

> Run Jasmine 2.0 specs through node.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jasmine --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jasmine');
```

## The "jasmine" task

### Overview
In your project's Gruntfile, add a section named `jasmine` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jasmine: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.showColors
Type: `Boolean`
Default value: `false`

Output color text to Grunt.

#### options.allowStackTrace
Type: `Boolean`
Default value: `false`

Output stack trace for any spec errors. Using the Grunt `--stack` option will override any configuration settings.

### Usage Examples

#### Default Options
In this example, the default options are used to do run all specs from `src/tests/**/*.js`.

```js
grunt.initConfig({
  jasmine: {
    options: {},
    files: ['src/testing/**/*.js'],
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
