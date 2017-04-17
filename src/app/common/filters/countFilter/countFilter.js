(function () {
	'use strict';
	angular.module('app.common')
		.filter('count', count);

	function count() {
		return function (value) {
			if (!value) {
				value = 0;
			}

			return value + ' шт';
		}
	}
}());

