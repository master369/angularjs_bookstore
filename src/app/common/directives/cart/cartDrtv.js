(function () {
	'use strict';

	angular
		.module('app')
		.controller('cartDrtvCtrl', cartDrtvCtrl)
		.directive('cart', function () {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					list: '='
				},
				bindToController: true,
				controllerAs: 'vm',
				controller: 'cartDrtvCtrl',
				templateUrl: function (elem, attrs) {
					if (angular.isDefined(attrs.editMode)) {
						return 'app/common/directives/cart/cartEdit.html'
					}

					return 'app/common/directives/cart/cartStatic.html'
				}
			};
		});

	cartDrtvCtrl.$inject = ['cartService', '$state', 'states'];
	function cartDrtvCtrl(cartService, $state, states) {
		var vm = this;

		vm.items = [];
		vm.cartIsEmpty = _cartIsEmpty;
		vm.removeAll = _removeAll;
		vm.isAvailable = _isAvailable;
		vm.deleteItem = _deleteItem;
		vm.totalItemPrice = _totalItemPrice;
		vm.totalPrice = _totalPrice;
		vm.totalCount = _totalCount;
		vm.totalWeight = _totalWeight;
		vm.stateGo = _stateGo;

		_activate();

		function _activate() {
			_setItems();
		}

		function _setItems() {
			vm.items = vm.list || cartService.getAll();
		}

		function _cartIsEmpty() {
			return vm.items.length === 0;
		}

		function _removeAll() {
			vm.items = [];
			cartService.removeAll();
		}

		function _isAvailable(item) {
			return item.count > 0;
		}

		function _deleteItem(id) {
			vm.items = vm.items.filter(function (item) {
				return id !== item.id;
			});

			cartService.remove(id);
		}

		function _totalItemPrice(item) {
			return item.price * item.buyCount;
		}

		function _totalCount() {
			var totalCount = vm.items.reduce(function (prevValue, item) {
				return prevValue + item.buyCount;
			}, 0);

			return totalCount;
		}
		function _totalPrice() {
			var totalPrice = vm.items.reduce(function (prevValue, item) {
				return prevValue + item.buyCount * item.price;
			}, 0);

			return totalPrice;
		}
		function _totalWeight() {
			var totalWeight = vm.items.reduce(function (prevValue, item) {
				return prevValue + item.buyCount * item.weight;
			}, 0);

			return totalWeight;
		}

		function _stateGo(state, params) {
			$state.go(states[state].data.stateName, params);
		}
	}
}());
