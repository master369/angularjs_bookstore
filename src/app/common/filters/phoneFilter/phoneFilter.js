(function () {
	'use strict';
	angular.module('app.common')
		.filter('phone', phone);

	function phone() {
		return function (value) {
			var regex = /^([+]?\d)(\d{3})(\d{7})$/,
				matches;

			if (regex.test(value)) {
				matches = value.match(regex);
				value = matches[1] +
					' (' + matches[2] + ') ' +
					matches[3].slice(0, 3) + '-' +
					matches[3].slice(3, 5) + '-' +
					matches[3].slice(5);
			}

			return value;
		}
	}
}());

