(function () {
	//'use strict';

	var gulp = require('gulp');
	var paths = gulp.paths;
	var eslint = require('gulp-eslint');

	var files = [
		paths.src + '/**/*.js',
		paths.e2e + '/**/*.js',
		'./gulp' + '/**/*.js',
		'!/**/co-desktop-calendar.js',
		'!/**/coDesktopCalendar.js',
		'!/**/angular-applicationinsights.js'
	];

	function esLintPipe() {
		return gulp.src(files)
			.pipe(eslint())
			// eslint.format() outputs the lint results to the console.
			// Alternatively use eslint.formatEach() (see Docs).
			.pipe(eslint.format());
	}

	gulp.task('eslint', function () {
		return esLintPipe()
			.pipe(eslint.failOnError());
	});

	gulp.task('eslint_notfail', function () {
		return esLintPipe();
	});

	gulp.task('eslintw', ['eslint_notfail'], function () {
		gulp.watch(files, ['eslint_notfail']);
	});
} ());
