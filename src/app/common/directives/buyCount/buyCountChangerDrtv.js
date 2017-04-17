(function () {
	'use strict';

	angular
		.module('app')
		.controller('buyCountCtrl', buyCountCtrl)
		.directive('buyCount', buyCount);

	function buyCount() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				item: '='
			},
			bindToController: true,
			controllerAs: 'vm',
			controller: 'buyCountCtrl',
			templateUrl: 'app/common/directives/buyCount/buyCountChanger.html',
		};
	}

	buyCountCtrl.$inject = ['cartService'];
	function buyCountCtrl(cartService) {
		var vm = this;

		vm.count = 0;
		vm.changeCount = _changeCount;
		vm.isAvailable = _isAvailable;

		_activate();

		function _activate() {
			_loadItemCount();
		}

		function _loadItemCount() {
			var item = cartService.get(vm.item.id);

			if (item) {
				vm.count = item.buyCount;
			}
		}

		function _changeCount() {
			cartService.changeCount(vm.item, vm.count);
		}

		function _isAvailable() {
			return vm.item.count && vm.item.count > 0;
		}
	}
}());
