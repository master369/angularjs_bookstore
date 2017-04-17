(function() {
	'use strict';

	angular
		.module('app.common')
		.directive('validate', validate);

	function validate() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: link,
			scope: {
				validate: '='
			}
		};

		function link(scope, elem, attrs, model) {
			var observer = scope.$watch('validate', function(val) {
					_.keys(model.$validators).forEach(function(x) {
						model.$setValidity(x, !val);
					});
				});

			scope.$on('$destroy', function() {
				observer();
			});
		}
	}
}());
