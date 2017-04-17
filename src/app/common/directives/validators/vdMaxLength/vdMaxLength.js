(function () {
	'use strict';

	angular
		.module('app')
		.directive('vdMaxLength', vdMaxLength);

	function vdMaxLength() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, el, attrs, ctrl) {
				var maxLength = attrs.vdMaxLength || 10;

				ctrl.$parsers.push(function (value) {
					ctrl.$setValidity('maxlength', value.length && value.length <= maxLength);

					return value;
				});
			}
		};
	}


}());
