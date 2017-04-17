(function () {
	'use strict';

	angular
		.module('app')
		.controller('changePasswordCtrl', changePasswordCtrl);

	changePasswordCtrl.$inject = ['messageService'];

	function changePasswordCtrl(messageService) {
		var vm = this;

		vm.newPassword = '';
		vm.confirmPassword = '';

		vm.submit = submit;

		function submit() {
			if (_isPasswordsMatch()) {
				messageService.notifyInform('Submit');
			}
			else {
				messageService.notifyError('Passwords do not match');
			}
		}

		function _isPasswordsMatch() {
			return vm.newPassword === vm.confirmPassword;
		}
	};
}());
