(function () {
	'use strict';

	var orders = [];

	angular.module('app.common')
		.run(run);

	run.$inject = ['$http', '$httpBackend', 'urls', 'enums'];

	function run($http, $httpBackend, urls, enums) {
		var ORDER_STATE = enums.ORDER_STATE;

		$http.get('app/common/mocks/orderMocks.json').then(function (mocks) {
			orders = mocks.data;
		});

		$httpBackend.whenGET(urls.mock('orders'), undefined, ['id', 'user'])
			.respond(function (method, url, data, headers, params) {
				var id = parseInt(params.id, 10),
					user = parseInt(params.user, 10),
					order;

				// by id
				if (!isNaN(id)) {
					order = _find(id);
					if (!order) {
						return [400, {}, {}];
					}
					return [200, angular.toJson(order), {}];
				}

				// by user
				if (!isNaN(user)) {
					return [200, angular.toJson(_getUserOrders(user)), {}];
				}

				// all
				return [200, angular.toJson(_getAll()), {}];
			});

		$httpBackend.whenPOST(urls.mock('orders'))
			.respond(function (method, url, data, headers) {
				var order = _add(angular.fromJson(data));
				return [202, angular.toJson(order), {}];
			});
		$httpBackend.whenPUT(urls.mock('orders'), undefined, undefined, ['id'])
			.respond(function (method, url, updatedData, headers, params) {
				var id = parseInt(params.id, 10),
					order;

				if (angular.isUndefined(id)) {
					return [400, {}, {}];
				}
				order = _find(id);

				if (angular.isUndefined(order)) {
					return [400, {}, {}];
				}
				angular.extend(order, angular.fromJson(updatedData));
				return [200, angular.toJson(order), {}];
			});


		function _getAll() {
			return _.clone(orders);
		}
		function _getUserOrders(userId) {
			return orders.filter(function (item) {
				return item.user.id === userId;
			});
		}

		function _find(id) {
			return orders.find(function (item) {
				return item.id === id;
			});
		}

		function _add(data) {
			var order = data;

			order.id = orders[orders.length - 1].id + 1;
			order.date = new Date();
			order.number = _generateOrderNumber(order.date);
			order.status = ORDER_STATE.FORMALIZE.value;

			orders.unshift(order);

			return order;
		}

		function _generateOrderNumber(date) {
			return moment().format('DDMMYY_hhmmss');
		}
	}
}());
