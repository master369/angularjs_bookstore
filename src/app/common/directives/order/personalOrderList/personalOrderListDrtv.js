(function () {
	'use strict';

	angular
		.module('app')
		.controller('personalOrderListDrtvCtrl', personalOrderListDrtvCtrl)
		.directive('personalOrderList', function () {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					orders: '='
				},
				bindToController: true,
				controllerAs: 'vm',
				controller: 'personalOrderListDrtvCtrl',
				templateUrl: 'app/common/directives/order/personalOrderList/personalOrderList.html'
			};
		});

	personalOrderListDrtvCtrl.$inject = ['enums'];
	function personalOrderListDrtvCtrl(enums) {
		var vm = this,
			ORDER_STATE = enums.ORDER_STATE;

		vm.items = [];

		vm.addItem = _addItem;
		vm.collapseAll = _collapseAll;

		vm.filterOption = [];
		vm.filterByStatus = _filterByStatus;
		vm.getCompleteCount = _getCompleteCount;
		vm.getActiveCount = _getActiveCount;

		vm.setFilterActive = _setFilterActive;
		vm.setFilterComplete = _setFilterComplete;
		vm.resetFilter = _resetFilter;

		vm.isEmpty = _isEmpty;

		_activate();

		function _activate() {
		}

		function _addItem(item) {
			this.items.push(item);
		}
		function _collapseAll() {
			vm.items.forEach(function (item) {
				item.collapse();
			});
		}

		function _getStatusCount(filter) {
			return vm.orders.filter(function (item) {
				return filter(item.status);
			}).length;
		}

		function _getCompleteCount() {
			return _getStatusCount(function (status) {
				return status === ORDER_STATE.COMPLETE.value;
			});
		}
		function _getActiveCount() {
			return _getStatusCount(function (status) {
				return ORDER_STATE.ACTIVE_STATES.indexOf(status) >= 0;
			});
		}

		function _filterByStatus() {
			vm.countCurrent = 0;
			return function (item) {
				if (vm.filterOption.length === 0) {
					return true;
				}
				return vm.filterOption.indexOf(item.status) >= 0;
			};
		}
		function _setFilterActive() {
			vm.filterOption = ORDER_STATE.ACTIVE_STATES;

		}
		function _setFilterComplete() {
			vm.filterOption = [ORDER_STATE.COMPLETE.value];
		}
		function _resetFilter() {
			vm.filterOption = [];
		}

		function _isEmpty() {
			return vm.orders && vm.orders.length === 0;
		}
	}
}());
