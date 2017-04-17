(function () {
	'use strict';

	angular
		.module('app.common')
		.factory('deliveryService', deliveryService);

	deliveryService.$inject = ['$resource', 'urls'];
	function deliveryService($resource, urls) {
		return $resource(urls.api('delivery'), {
			id: '@id'
		});
	}
} ());
