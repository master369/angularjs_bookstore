(function () {
	'use strict';

	angular
		.module('app')
		.directive('bnLatin', [function () {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function (scope, el, attrs, ctrl) {
					var regex = /[^a-zA-Z\s]/g;

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
