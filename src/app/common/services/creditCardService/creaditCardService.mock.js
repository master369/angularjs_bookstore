(function () {
	'use strict';

	angular
		.module('app.common')
		.run(run);

	run.$inject = ['$httpBackend', 'urls', '$timeout', '$q'];

	function run($httpBackend, urls) {

		$httpBackend.whenPOST(urls.mock('pay'))
			.respond(function (method, url, data, headers, params) {
				return [200, angular.toJson({
					result: Math.random() > .5 ? true : false,
					transactionId: 141892489124,
					date: new Date().toISOString()
				})];
			});

	}

} ());
