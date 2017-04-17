(function () {
	'use strict';

	angular
		.module('app')
		.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['userService', '$state', 'states'];

	function loginCtrl(userService, $state, states) {
		var vm = this;

		vm.stateGo = _stateGo;
		vm.login = login;
		vm.isType = isType;
		vm.loginForm = {
			loginEmail: '',
			loginPass: '',
			registerEmail: '',
			registerPass: '',
			confirmPass: '',
			authType: 'login',
			agreement: false
		}
		function _stateGo(state, params) {
			$state.go(states[state].data.stateName, params);
		}

		function isType(type) {
			return vm.loginForm.authType === type;
		}

		function login() {
			if (isType('login')) {
				userService.login(vm.loginForm.loginEmail);
				return;
			}
			// registration
		}

	}

}());
