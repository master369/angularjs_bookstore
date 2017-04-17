(function () {
	'use strict';

	angular
		.module('app')
		.directive('bnHomeNumber', [function () {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function (scope, el, attrs, ctrl) {
					var regex = /[^0-9\/\\]/g;

					ctrl.$parsers.push(function (inputValue) {
						var transformedValue = inputValue ? inputValue.replace(regex, '') : null;

						if (transformedValue != inputValue) {
							ctrl.$setViewValue(transformedValue);
							ctrl.$render();
						}

						return transformedValue;
					});
				}
			};
		}]);


}());
