(function () {
	'use strict';

	angular
		.module('app')
		.controller('paymentCtrl', paymentCtrl);

	paymentCtrl.$inject = ['orderService', 'creditCardService', 'messageService', 'enums', '$state', '$log'];

	function paymentCtrl(orderService, creditCardService, messageService, enums, $state, $log) {
		var vm = this;

		vm.months = enums.MONTHS;
		vm.years = (function (additive) {
			var arr = [], i,
				year = new Date().getFullYear();
			for (i = 0; i <= additive; i++) {
				arr.push(year + i);
			}
			return arr;
		}(10));

		vm.paymentType = 0;
		vm.isPaymentType = isPaymentType;
		vm.paymentMethods = enums.PAYMENT_METHOD;
		vm.card = {
			number: {
				part1: null,
				part2: null,
				part3: null,
				part4: null
			},
			owner: null,
			expiration: {
				month: null,
				year: null
			},
			cvv: null
		};


		vm.submit = submit;

		vm.prevStep = function() {
			$state.go(orderService.getPreviousStep());
		}

		activate();

		function activate() {
			if (orderService.isPaid()) {
				checkout();
			}
		}

		function submit() {
			if (isPaymentType('PAYMENT')) {
				var remoteModal =
					messageService.remote('Оплата', {
						pending: enums.MESSAGES.EM_022,
						success: enums.MESSAGES.EM_023,
						error: enums.MESSAGES.EM_024
					}, creditCardService.pay(vm.card), { result: true });

				remoteModal.result
					.then(function (paymentConfirmation) {
						savePaymentMethod({
							type: vm.paymentMethods.PAYMENT,
							transaction: paymentConfirmation
						});
						checkout();
					});

				return;
			}

			savePaymentMethod({
				type: vm.paymentMethods.RECEIVING
			});
			checkout();
		};

		function savePaymentMethod(paymentMethod) {
			orderService
				.setPaymentMethod(paymentMethod);
		}

		function isPaymentType(type) {
			return vm.paymentMethods[type] === parseInt(vm.paymentType, 10);
		}

		function checkout() {
			orderService.confirm()
				.then(function (response) {
					$log.log(response)
					$state.go(orderService.setStep('accepted'));
				})
				.catch(function (reason) {
					$log.error('Cant confrim order: ', reason);
				});
		}
	}
}());
