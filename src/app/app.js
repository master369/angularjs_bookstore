(function () {
	'use strict';
	angular
		.module('app', [
			'ngAnimate',
			'ngCookies',
			'ngTouch',
			'ngSanitize',
			'ui.router',
			'ui.bootstrap',
			'ngMessages',
			'ngMockE2E',
			'LocalStorageModule',
			'app.common',
			'app.backend',
			'pascalprecht.translate'
		]);
} ());
