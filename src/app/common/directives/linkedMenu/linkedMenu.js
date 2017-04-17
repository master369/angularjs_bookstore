(function () {
	'use strict';

	angular
		.module('app.common')
		.directive('linkedMenu', linkedMenu);

	linkedMenu.$inject = ['$state','states'];
	function linkedMenu() {
		return {
			restrict: 'E',
			scope: {
				links: '=',
				route: '@'
			},
			templateUrl: 'app/common/directives/linkedMenu/linkedMenu.html',
			controller: controller,
			controllerAs: 'vm',
			bindToController: true,
			link: link
		};

		function link(scope, elem, attr, ctrl) {

		}

		function controller($state, states) {
			var vm = this;
			vm.goto = goto;
			vm.stateGo = _stateGo;

			function goto(state, type, id, e) {
				e.preventDefault();
				var params = {
					query: {}
				};
				params.query[type] = id;
				$state.go(state, params, {
					inherit: false
				});

			}

			function _stateGo(state, params) {
				$state.go(states[state].data.stateName, params);
			}
		}
	}
} ());
