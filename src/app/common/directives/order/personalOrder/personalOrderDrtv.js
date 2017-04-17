(function () {
	'use strict';

	angular
		.module('app')
		.controller('personalOrderDrtvCtrl', personalOrderDrtvCtrl)
		.directive('personalOrder', [function () {
			return {
				restrict: 'E',
				require: '^personalOrderList',
				scope: {
					order: '='
				},
				bindToController: true,
				controllerAs: 'vm',
				controller: 'personalOrderDrtvCtrl',
				templateUrl: 'app/common/directives/order/personalOrder/personalOrder.html',
				link: function (scope, elem, attrs, ctrl) {
					ctrl.addItem(scope.vm.item);
				}
			};
		}]);

	personalOrderDrtvCtrl.$inject = ['orderManagerService', 'enums'];
	function personalOrderDrtvCtrl(orderManagerService, enums) {
		var vm = this;

		vm.ORDER_STATE = enums.ORDER_STATE;

		vm.item = {
			isCollapsed: false,
			collapse: _collapse
		};

		vm.toggleCollapse = _toggleCollapse;
		vm.getStatusText = _getStatusText;
		vm.isCanceled = _isCanceled;

		vm.cancelOrder = _cancelOrder;
		vm.formOrder = _formOrder;

		function _toggleCollapse() {
			vm.item.isCollapsed = !vm.item.isCollapsed;
		}
		function _collapse() {
			vm.item.isCollapsed = false;
		}

		function _isCanceled() {
			return vm.order.status === vm.ORDER_STATE.CANCELED.value;
		}
		function _cancelOrder() {
			vm.order.status = vm.ORDER_STATE.CANCELED.value;
			orderManagerService.update({ id: vm.order.id }, vm.order);
		}
		function _formOrder() {
			vm.order.status = vm.ORDER_STATE.FORMALIZE.value;
			orderManagerService.update({ id: vm.order.id }, vm.order);
		}

		function _getStatusText() {
			var status = _.find(vm.ORDER_STATE, function (item) {
				return item.value === vm.order.status;
			});

			return status.label;
		}

	}
}());
