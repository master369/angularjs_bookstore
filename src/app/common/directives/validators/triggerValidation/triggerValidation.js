(function () {
	'use strict';

	angular
		.module('app.common')
		.directive('triggerValidation', triggerValidation);

	triggerValidation.$inject = ['messageService', '$timeout'];
	function triggerValidation(messageService, $timeout) {
		return {
			restrict: 'A',
			scope: {},
			require: '^form',
			link: link
		};

		function link(scope, elem, attr, form) {
			var message,
				observer = attr.$observe('triggerValidation', function (val) {
					message = val;
				});
			elem.on('click', function (e) {
				if (!form.$valid) {
					e.stopImmediatePropagation();
					e.preventDefault();
					messageService.error('Ошибка', message).result.finally(function () {
						$timeout(function () {
							form.$submitted = true;
							var firstInvalid = $('.ng-invalid:first', elem.parents('form'));
							if (firstInvalid) {
								firstInvalid.focus();
							}
						}, 0, false);
					});
				}
			});

			scope.$on('$destroy', function () {
				observer();
				elem.unbind('click');
			});
		}
	}
}());
