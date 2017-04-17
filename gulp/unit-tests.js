/*global __dirname*/
(function () {
	'use strict';

	var gulp = require('gulp');
	var path = require('path');
	//var $ = require('gulp-load-plugins')();
	var wiredep = require('wiredep');
	var paths = gulp.paths;
	var runSequence = require('run-sequence');
	var Server = require('karma').Server;

	function runTests(singleRun, done) {
		var bowerDeps = wiredep({
			directory: 'bower_components',
			exclude: ['bootstrap-sass-official'],
			dependencies: true,
			devDependencies: true
		});

		var testFiles = bowerDeps.js.concat([
			paths.src + '/app/app.js',
			paths.src + '/app/common/module.js',
			paths.src + '/app/**/*.js',
			paths.tmp + '/**/*.js',
			paths.src + '/app/**/backend.routes.js',
			paths.src + '/app/**/testHelpers/*.js'
		]);

		new Server({
			configFile: path.join(__dirname, '../karma.conf.js'),
			files: testFiles,
			exclude: [
				paths.src + '/app/common/utils/bliss-fonts.js',
				paths.src + '/app/angular-applicationinsights.js'
			],
			singleRun: singleRun
		}, function () { done() }).start();
	}

	gulp.task('test', function () {
		runSequence('_test');
	});
	// gulp.task('_test', ['eslint', 'partials'], function (done) {
	gulp.task('_test', function (done) {
		runTests(true, done);
	});
	gulp.task('testw', function () {
		runSequence('watchCommon', '_testw');
	});
	gulp.task('_testw', ['eslintw', 'partials'], function (done) {
		runTests(false, done);
	});
} ());
