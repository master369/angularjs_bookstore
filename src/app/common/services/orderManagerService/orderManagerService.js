(function () {
	'use strict';
	angular.module('app.common')
		.factory('orderManagerService', orderManagerService);

	orderManagerService.$inject = ['$resource', 'urls'];

	function orderManagerService($resource, urls) {
		return $resource(urls.api('orders'), {
			id: '@id',
			user: '@user'
		}, {
				update: {
					method: 'PUT'
				}
			});
	}
}());
