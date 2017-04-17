(function () {
	'use strict';

	angular
		.module('app')
		.controller('breadcrumbsDrtvCtrl', breadcrumbsDrtvCtrl)
		.component('breadcrumbs', {
			restrict: 'E',
			replace: true,
			bindings: {
				breadcrumbs: '<'
			},
			controllerAs: 'vm',
			controller: 'breadcrumbsDrtvCtrl',
			templateUrl: 'app/common/components/breadcrumbs/breadcrumbs.html',
		});

	breadcrumbsDrtvCtrl.$inject = ['breadcrumbsService', '$state', '$scope', 'states'];
	function breadcrumbsDrtvCtrl(breadcrumbsService, $state, $scope, states) {
		var vm = this;
		vm.breadcrumbs = getBreadcrumbs();
		vm.stateGo = _stateGo;
		function getBreadcrumbs() {
			$scope.$on('$stateChangeSuccess', function () {
				if ($state.$current.data.breadcrumbs !== '') {
					vm.breadcrumbs = breadcrumbsService.updateBreadcrumbsArray();
				}
			});
		}

		function _stateGo(state) {
			$state.go(states[state].data.stateName);
		}
	}
} ());
