(function () {
	'use strict';

	angular.module('app')
		.controller('acceptedOrderCtrl', acceptedOrderCtrl);

	acceptedOrderCtrl.$inject = ['orderService', 'userService', '$state', 'states'];

	function acceptedOrderCtrl(orderService, userService, $state, states) {
		var vm = this;
		vm.order = {};
		vm.stateGo = _stateGo;
		vm.user = {};
		_activate();

		function _activate() {
			_loadOrder();
			_loadUser();
		}

		function _loadOrder() {
			vm.order = orderService.getOrder();
			orderService.clear();
			orderService.clearStep();
		}
		function _loadUser() {
			vm.user = userService.getCurrentUser();
		}
		function _stateGo(state, params) {
			$state.go(states[state].data.stateName, params);
		}
	}
} ());
