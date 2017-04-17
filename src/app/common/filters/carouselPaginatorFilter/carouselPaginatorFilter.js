(function () {
	'use strict';

	angular.module('app.common')
		.filter('carouselPaginator', carouselPaginator);

	function carouselPaginator() {
		return function (data, length) {
			length = +length;
			return data.slice(length);
		}
	};

}());
