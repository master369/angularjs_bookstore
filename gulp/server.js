(function () {
	'use strict';

	var gulp = require('gulp');
	var paths = gulp.paths;
	var util = require('util');
	var browserSync = require('browser-sync');
	var middleware = require('./proxy');
	var runSequence = require('run-sequence');

	function browserSyncInit(baseDir, files, browser, isMockUrlParam) {
		browser = !browser ? 'default' : browser;

		var routes = null;
		if (baseDir === paths.src || util.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1) {
			routes = {
				'/bower_components': 'bower_components'
			};
		}

		browserSync.instance = browserSync.init(files, {
			startPath: '/?dev=1' + (isMockUrlParam ? '&mock=1' : ''),
			server: {
				baseDir: baseDir,
				middleware: middleware,
				routes: routes
			},
			browser: browser,
			ghostMode: false,
			notify: false
		});
	}

	gulp.task('serve', function () {
		runSequence('watch', '_serve');
	});

	gulp.task('serve_mock', function () {
		runSequence('watch', '_serve_mock');
	});

	gulp.task('_serve', function () {
		serve(false);
	});

	gulp.task('_serve_mock', function () {
		serve(true);
	});

	function serve(isMockUrlParam) {
		browserSyncInit([
			paths.tmp + '/serve',
			paths.src
		], [
			paths.tmp + '/serve/app/**/*.css'
		], null, isMockUrlParam);
	}

	gulp.task('dist', ['build'], function () {
		browserSyncInit(paths.dist);
	});

	gulp.task('serve:e2e', ['inject'], function () {
		browserSyncInit([paths.tmp + '/serve', paths.src], null, []);
	});

	gulp.task('serve:e2e-dist', ['build'], function () {
		browserSyncInit(paths.dist, null, []);
	});
}());
