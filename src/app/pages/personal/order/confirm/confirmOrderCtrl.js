(function () {
	'use strict';

	angular.module('app')
		.controller('confirmOrderCtrl', confirmOrderCtrl);

	confirmOrderCtrl.$inject = ['$state', 'orderService', 'states'];

	function confirmOrderCtrl($state, orderService, states) {
		var vm = this;

		vm.order;
		vm.submit = _submit;

		_activate();

		function _activate() {
			_loadOrder();
		}

		vm.prevStep = function() {
			$state.go(orderService.getPreviousStep());
		}

		function _loadOrder() {
			vm.order = orderService.getOrder();
		}
		function _submit() {
			var number = moment().format('hhmmss_DDMMYY'),
				date = moment().format('DD.MM.YYYY'),
				info = {
					date: date,
					number: number
				};
			orderService.setInfo(info);
			$state.go(orderService.setStep('payment'));
		}
	}
}());
