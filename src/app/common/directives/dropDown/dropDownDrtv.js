(function () {
	'use strict';

	angular
		.module('app')
		.controller('dropDownDrtvCtrl', dropDownDrtvCtrl)
		.directive('dropDown', [function () {
			return {
				restrict: 'E',
				require: ['^form', 'ngModel'],
				scope: {
					list: '=',
					property: '@',
					name: '@',
					placeholder: '@',
					ngModel: '=',
					ngChange: '&'
				},
				bindToController: true,
				controllerAs: 'vm',
				controller: 'dropDownDrtvCtrl',
				templateUrl: 'app/common/directives/dropDown/dropDown.html',
				link: _link
			};
		}]);

	function _link(scope, el, attrs, ctrl) {
		scope.vm.form = ctrl[0];
	}

	dropDownDrtvCtrl.$inject = [];
	function dropDownDrtvCtrl() {
		var vm = this;

		vm.selectedItem;
		vm.change = _change;
		vm.isEmpty = _isEmpty;
		vm.isError = _isError;

		_activate();

		function _activate() {
		}

		function _change() {
			vm.ngModel = vm.selectedItem;

			if (vm.ngChange()) {
				vm.ngChange()(vm.ngModel);
			}
		}
		function _isEmpty() {
			return vm.list.length === 0;
		}

		function _isError() {
			return !vm.form[vm.name].$valid && vm.form.$submitted;
		}
	}
}());
