(function () {
	'use strict';

	angular.module('app')
		.controller('cartCtrl', cartCtrl);

	cartCtrl.$inject = ['$state', 'states', 'cartService', 'orderService'];


	function cartCtrl($state, states, cartService, orderService) {
		var vm = this;
		vm.order = _order;
		vm.stateGo = _stateGo;
		vm.continue = false;
		_activate();

		function _activate() {
			if(orderService.getLastStep()) {
				vm.continue = true;
			}
			
		}

		function _stateGo(state) {
			$state.go(states[state].data.stateName);
		}

		function _order() {
			var toState = orderService.getLastStep();
			if(angular.isUndefined(toState)) {
				toState = orderService.setStep('delivery');
			}
			$state.go(toState);
		}

		vm.isEmpty = function () {
			return cartService.getCount() === 0;
		}
	}
}());
