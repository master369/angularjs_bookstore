(function () {
	'use strict';

	var gulp = require('gulp');
	var paths = gulp.paths;
	require('colors');

	gulp.task('watch', ['inject'], function () {
		gulp.watch([
			paths.src + '/*.html',
			// paths.src + '/{app,components,partials}/**/*.scss',
			paths.src + '/style/scss/**/*.scss',
			paths.src + '/{app,components,partials}/**/*.js',
			'bower.json'
		], ['inject']);
	});
} ());
