(function () {
	'use strict';

	angular
		.module('app.common')
		.run(run);

	run.$inject = ['$httpBackend', 'urls', '$http'];

	function run($httpBackend, urls, $http) {
		var deliveryModes = [];

		$http.get('app/common/mocks/deliveryMocks.json').then(function (mocks) {
			deliveryModes = mocks.data;
		});

		$httpBackend.whenGET(urls.mock('delivery'), undefined, ['id'])
			.respond(function (method, url, data, headers, params) {
				var id = parseInt(params.id, 10),
					deliveryMode;

				// all
				if (isNaN(id)) {
					return [200, angular.toJson(deliveryModes), {}];
				}

				// single
				deliveryMode = _.find(deliveryModes, function (item) {
					return item.id === id;
				});

				if (!deliveryMode) {
					return [400, angular.toJson(null), {}];
				}

				return [200, angular.toJson(deliveryMode), {}];
			});
	}

}());
