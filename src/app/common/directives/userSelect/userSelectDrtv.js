(function () {
	'use strict';

	angular
		.module('app')
		.controller('userSelectDrtvCtrl', userSelectDrtvCtrl)
		.directive('userSelect', [function () {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					user: '=',
					userMode: '=',
					secondUser: '='
				},
				require: '^form',
				bindToController: true,
				controllerAs: 'vm',
				controller: 'userSelectDrtvCtrl',
				templateUrl: 'app/common/directives/userSelect/userSelect.html',
				link: _link
			};
		}]);

	function _link(scope, el, attrs, ctrl) {
		scope.vm.form = ctrl;

		scope.$watch('vm.userMode', function (value) {
			scope.vm.changeMode(value);
		});
	}


	userSelectDrtvCtrl.$inject = ['userService'];
	function userSelectDrtvCtrl(userService) {
		var vm = this;

		vm.availableUsers = {
			current: {},
			other: {}
		};

		vm.isMode = _isMode;
		vm.changeMode = _changeMode;

		_activate();

		function _activate() {
			_changeMode('other');
			_loadCurrentUser();
		}

		function _loadCurrentUser() {
			vm.availableUsers.current = userService.getCurrentUser();
			if (vm.availableUsers.current.logged) {
				_changeMode('current');
			}
		}

		function _changeMode(mode) {
			vm.userMode = mode;
			if (_isMode('current')) {
				vm.user = vm.availableUsers.current;
			}
			else {
				vm.user = vm.secondUser;
			}
		}

		function _isMode(mode) {
			return vm.userMode === mode;
		}
	}
}());
