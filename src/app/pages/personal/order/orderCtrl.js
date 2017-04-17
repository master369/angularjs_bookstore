(function () {
	'use strict';

	angular.module('app')
		.controller('orderCtrl', orderCtrl);

	orderCtrl.$inject = ['$rootScope', '$scope', 'cartService', 'orderService', '$state'];

	function orderCtrl($rootScope, $scope, cartService, orderService, $state) {
		var vm = this,
			handlers = [];

		vm.delivery = {};
		vm.cart = {};

		vm.getTotalPrice = _getTotalPrice;

		_activate();

		function _activate() {
			vm.delivery = orderService.getDelivery();
			vm.cart = orderService.getCart();

			_setHandlers();
		}

		function _setHandlers() {
			handlers.push(
				$rootScope.$on('orderChanged', function (event, data) {
					vm.delivery = data;
				})
			);

			$scope.$on('$destroy', function () {
				_destroyHandlers();
			});
		}
		function _destroyHandlers() {
			handlers.forEach(function (handler) {
				handler();
			});
		}

		function _getTotalPrice() {
			return vm.delivery.price + vm.cart.price;
		}
	}
}());
