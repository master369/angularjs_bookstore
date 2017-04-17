(function () {
	'use strict';

	angular
		.module('app')
		.directive('phone', [function () {
			return {
				restrict: 'E',
				replace: true,
				require: ['^form', '?ngModel'],
				scope: {},
				templateUrl: 'app/common/directives/phone/phone.html',
				link: _link
			};
		}]);

	function _link(scope, el, attrs, ctrls) {
		var watcher,
			form = ctrls[0],
			ngModel = ctrls[1];

		scope.form = form;

		if (!ngModel) return;

		ngModel.$render = function () {
			var regex = /^([+]?\d)(\d{3})(\d{7})$/,
				matches,
				value = String(ngModel.$viewValue),
				country = attrs.country || '+7',
				operator = '',
				number = '';

			if (ngModel.$viewValue && regex.test(value)) {
				matches = value.match(regex);
				country = matches[1];
				operator = matches[2];
				number = matches[3];
			}

			scope.phone = {
				country: country,
				operator: operator,
				number: number
			};
		};

		watcher = scope.$watchCollection(function () {
			return scope.phone;
		}, function (phone) {
			ngModel.$setViewValue(
				(phone.country || '') +
				(phone.operator || '') +
				(phone.number || '')
			);
		});

		scope.$on('$destroy', function () {
			watcher();
		});
	}
}());
