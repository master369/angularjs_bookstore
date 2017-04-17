(function () {
	'use strict';
	angular.module('app.common')
		.factory('userService', userService);

	userService.$inject = ['$rootScope', '$http', '$state', 'states', 'localStorageService'];

	function userService($rootScope, $http, $state, states, localStorageService) {
		var users = [],
			currentUser = null;

		_activate();

		return {
			getAll: _getAll,
			getCurrentUser: _getCurrentUser,
			setCurrentUser: _setCurrentUser,

			login: _login,
			logout: _logout,

			isLogin: _isLogin
		};

		function _activate() {
			$http.get('app/common/mocks/userMocks.json').then(function (mocks) {
				users = mocks.data;
			});

			_loadFromLocalStorage();
		}

		function _logout() {
			_clearCurrentUser();
			$rootScope.$broadcast('loginStatusChanged', {
				logged: false
			});
			$state.go(states['main']);
		}
		function _login(email) {
			var user = _getUserByEmail(email);

			if (user) {
				user.logged = true;
				_setCurrentUser(user);
				$rootScope.$broadcast('loginStatusChanged', {
					logged: true,
					user: user
				});
				$state.go(states['main']);
			}
		}

		function _isLogin() {
			return _getCurrentUser().logged === true;
		}

		function _getAll() {
			return users.slice();
		}

		function _getCurrentUser() {
			_loadFromLocalStorage();

			if (!currentUser) {
				//	default user
				currentUser = {
					name: 'Гость',
					logged: false
				};
			}

			return currentUser;
		}
		function _clearCurrentUser() {
			currentUser = null;
			localStorageService.remove('user');
		}

		function _setCurrentUser(user) {
			// user.logged = true;
			currentUser = user;
			_saveToLocalStorage();
		}

		function _getUserByEmail(email) {
			return users.find(function (item) {
				return item.email === email;
			});
		}

		function _loadFromLocalStorage() {
			currentUser = localStorageService.get('user');
		}
		function _saveToLocalStorage() {
			localStorageService.set('user', currentUser);
		}
	}
}());
