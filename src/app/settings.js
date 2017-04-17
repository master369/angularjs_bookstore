(function () {
	'use strict';

	angular
		.module('app')
		.constant('settings', angular.extend({}, {
			loginRoute: 'shell.login',
			refreshAuthTokenIntervalMinutes: 10
		}, window.PUBLISH_SETTINGS)); // eslint-disable-line

}());
