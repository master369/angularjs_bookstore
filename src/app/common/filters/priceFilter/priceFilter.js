(function () {
	'use strict';
	angular.module('app.common')
		.filter('price', price);

	function price() {
		return function (value) {
			if (!value || !parseFloat(value)) { value = 0; }

			var regex = /(?=(?:\d{3})+(?!\d))/,
				separator = '\'',
				number;

			number = value.toString().split('.');

			number[0] = number[0].split(regex).join(separator);
			value = number.join('') + ' руб';

			return value;
		}
	}
}());

