(function () {
	'use strict';

	angular
		.module('app')
		.directive('bnMaxLength', [function () {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function (scope, el, attrs, ctrl) {
					var defaultmaxLength = 5,
						maxLength = parseInt(attrs.bnMaxLength, 10) || defaultmaxLength;

					ctrl.$parsers.push(function (inputValue) {
						if (inputValue && inputValue.length > maxLength) {
							inputValue = inputValue.substring(0, maxLength);
							ctrl.$setViewValue(inputValue);
							ctrl.$render();
						}

						return inputValue;
					});
				}
			};
		}]);


}());
