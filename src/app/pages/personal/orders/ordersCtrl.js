(function () {
	'use strict';

	angular.module('app')
		.controller('ordersCtrl', ordersCtrl);

	ordersCtrl.$inject = ['orderManagerService', '$state', 'states', 'userService'];

	function ordersCtrl(orderManagerService, $state, states, userService) {
		var vm = this;

		vm.orders = [];
		vm.stateGo = _stateGo;
		_activate();

		function _activate() {
			var currentUser = userService.getCurrentUser();

			if (!currentUser.logged) { return; }

			orderManagerService.query({
				user: currentUser.id
			}, function (response) {
				vm.orders = response;
			});
		}
		function _stateGo(state) {
			$state.go(states[state].data.stateName);
		}
	};
}());
