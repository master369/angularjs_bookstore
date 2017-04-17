(function () {
	'use strict';

	var app = angular
		.module('app.common')
		.config(config);

	config.$inject = ['$compileProvider', '$provide'];

	function config($compileProvider, $provide) {
		app.cachedCompileProvider = $compileProvider;

		// ===============================================
		// Decorate httpBackend to delay payment method's mocks
		// ===============================================
		$provide.decorator('$httpBackend', HttpBackendDecorator);
		HttpBackendDecorator.$inject = ['$delegate', 'urls', '$timeout'];

		function HttpBackendDecorator($delegate, urls, $timeout) {
			var proxy = function(method, url, data, callback, headers, timeout, withCredentials) {
				var proxyCallback = url === urls.api('pay') ? function() {
					var delay = 3000;
					$timeout(function() {
						callback.apply(this, arguments[0]);
					}.bind(this, arguments), delay, false);
				} : callback;

				$delegate(method, url, data, proxyCallback, headers, timeout, withCredentials);
			};

			angular.extend(proxy, $delegate);

			return proxy;
		}
	}

} ());
