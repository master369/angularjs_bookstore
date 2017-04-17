(function () {
	'use strict';

	angular
		.module('app')
		.controller('buyButtonCtrl', buyButtonCtrl)
		.directive('buyButton', buyButton);

	function buyButton() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				item: '='
			},
			bindToController: true,
			controllerAs: 'vm',
			controller: 'buyButtonCtrl',
			templateUrl: 'app/common/directives/buyButton/buyButton.html',
		};
	}

	buyButtonCtrl.$inject = ['cartService', 'messageService'];
	function buyButtonCtrl(cartService, messageService) {
		var vm = this,
			BUY_BUTTON_STATE = {
				ADD: 'В корзину',
				INCART: 'Добавлен',
				NOTAVAILABLE: 'Нет в наличии'
			}

		vm.available = false;
		vm.title = '';
		vm.state = BUY_BUTTON_STATE.ADD;

		vm.isAvailable = _isAvailable;
		vm.addToCart = _addToCart;
		vm.isInCart = _isInCart;

		_activate();

		function _activate() {
			_updateState();
		}

		function _isAvailable() {
			return vm.item.count && vm.item.count > 0;
		}
		function _isInCart() {
			return cartService.has(vm.item.id)
		}

		function _updateState() {
			vm.available = _isAvailable();

			if (!vm.available) {
				vm.state = BUY_BUTTON_STATE.NOTAVAILABLE;
			}
			else if (_isInCart()) {
				vm.state = BUY_BUTTON_STATE.INCART;
			}
			else {
				vm.state = BUY_BUTTON_STATE.ADD;
			}

			vm.title = vm.state;
		}

		function _addToCart() {
			if (_isInCart(vm.item.id)) {
				return true;
			}

			cartService.add(vm.item);
			_updateState();
			messageService.notifyInform('Добавлено');
		}
	}
}());
