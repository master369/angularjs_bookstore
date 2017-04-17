(function () {
	'use strict';

	angular
		.module('app.common')
		.directive('inputSubmit', inputSubmit);

	inputSubmit.$inject = ['enums'];
	function inputSubmit(enums) {
		return {
			restrict: 'A',
			scope: {
				inputSubmit: '&',
				model: '=ngModel'
			},
			controller: controller,
			controllerAs: 'vm',
			bindToController: true,
			link: link
		};

		function controller() {
			var vm = this;
			vm.jj = 'jej';
		}

		function link(scope, elem, attrs, ctrl) {
			elem.on('keydown', function (e) {
				if (e.keyCode === enums.keyCode.enter && ctrl.model.trim().length > 0) {
					ctrl.inputSubmit({
						$event: e,
						model: ctrl.model.trim()
					});
				}
			});

			scope.$on('$destroy', function () {
				elem.unbind('keydown');
			});
		}
	}
}());
