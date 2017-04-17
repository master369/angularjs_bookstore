(function () {
	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$httpProvider'];
	function config($httpProvider) {
		// ===============================================
		// Interceptors
		// ===============================================
		$httpProvider.interceptors.push('errorsInterceptor');
	}

} ());
