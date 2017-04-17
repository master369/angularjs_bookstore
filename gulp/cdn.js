(function () {
	'use strict';

	var gulp = require('gulp');
	var replace = require('gulp-replace');

	var paths = gulp.paths;
	var cdnPath = 'http://www.cdn.com';

	gulp.task('cdn', ['build'], function () {
		return gulp.src(paths.dist + '/*.html')
			.pipe(replace(/<link rel="stylesheet" href="([^"]*)">/g, styleCdnReplacer))
			.pipe(replace(/<script src="([^"]*)"><\/script>/g, scriptCdnReplacer))
			.pipe(gulp.dest(paths.dist + '/'));
	});

	function styleCdnReplacer(match, cssName) {
		return '<link rel="stylesheet" href="' + cdnPath + '/' + cssName + '">';
	}

	function scriptCdnReplacer(match, jsName) {
		return '<script src="' + cdnPath + '/' + jsName + '"><\/script>';
	}
}());
