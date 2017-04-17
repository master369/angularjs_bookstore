(function () {
	'use strict';

	angular.module('app')
		.controller('shellCtrl', shellCtrl);

	shellCtrl.$inject = ['$rootScope', '$scope', 'cartService', 'userService', 'breadcrumbsService', '$state', 'messageService', 'enums', 'states'];

	function shellCtrl($rootScope, $scope, cartService, userService, breadcrumbsService, $state, messageService, enums, states) {
		var vm = this,
			handlers = [],
			states = states;

		vm.hasMenu = hasMenu();
		vm.isMenuExpanded = true;
		vm.toggleMenu = toggleMenu;

		vm.cartCount = _getCartItemCount;
		vm.currentUser;
		vm.logout = _logout;
		vm.stateGo = _stateGo;
		vm.searchField = '';
		vm.search = search;

		_activate();

		function _activate() {
			updateUser();

			_setHandlers();
		}

		function _setHandlers() {
			handlers.push(
				$rootScope.$on('loginStatusChanged', function (event, data) {
					updateUser();
					if (data.logged) {
						messageService.notifyInform('Signing in as ' + data.user.name);
					}
					else {
						messageService.notifyInform('Signing out');
					}
				})
			);
			handlers.push(
				$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
					vm.hasMenu = hasMenu();
				})
			);

			$scope.$on('$destroy', function () {
				_destroyHandlers();
			});
		}
		function _destroyHandlers() {
			handlers.forEach(function (handler) {
				handler();
			});
		}

		function _getCartItemCount() {
			return cartService.getCount();
		}

		function _logout() {
			userService.logout();
		}

		function toggleMenu() {
			vm.isMenuExpanded = !vm.isMenuExpanded;
		}

		function search(e, model) {
			e.preventDefault();
			$state.go(enums.STATE.CATALOG, {
				search: true,
				query: {
					name: model
				}
			});
			vm.searchField = '';
		}

		function updateUser() {
			vm.currentUser = userService.getCurrentUser();
		}

		function hasMenu(state) {
			state = state || $state.$current;
			var asideView = state.views['aside@shell'];
			return angular.isDefined(asideView) ? asideView.template !== '' ? true : false : hasMenu(state.parent);
		}

		function _stateGo(parametr) {
			$state.go(states[parametr].data.stateName);
		}
	};
}());
