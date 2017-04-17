(function () {
	'use strict';

	var gulp = require('gulp');

	// For fast access in Task Runner Explorer
	gulp.task('___dist', ['dist']);
	gulp.task('___protractor', ['protractor']);
	gulp.task('___publish', ['publish']);
	gulp.task('___serve', ['serve']);
	gulp.task('___serve_mock', ['serve_mock']);
	gulp.task('___test', ['test']);
	gulp.task('___testw', ['testw']);
}());
