(function () {
	'use strict';

	angular
		.module('app.common')
		.factory('bookService', bookService);

	bookService.$inject = ['urls', '$resource'];
	function bookService(urls, $resource){
		var courseFactory = $resource(urls.api('books'), {
			book: '@book'
		}, {
			update: {
				method: 'PUT'
			}
		});
		return courseFactory;
	}
}());
