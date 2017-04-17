(function () {
	'use strict';

	angular
		.module('app')
		.factory('authGuard', authGuard);

	authGuard.$inject = ['$rootScope', '$state', 'states', 'userService', 'messageService'];

	function authGuard($rootScope, $state, states, userService, messageService) {
		return {
			init: init
		};

		function init() {
			$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
				if (!toState.restriction) {
					return;
				}

				if (toState.restriction.authorized && !userService.isLogin()) {
					event.preventDefault();
					$state.go(states['login']);
					messageService.notifyConfirm('access denied');
				}
			});
		}

	}
}());
