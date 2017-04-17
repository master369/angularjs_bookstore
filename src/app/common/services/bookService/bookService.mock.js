(function () {
	'use strict';

	angular
		.module('app.common')
		.run(run);

	run.$inject = ['$httpBackend', 'urls', '$http'];

	function run($httpBackend, urls, $http) {
		var books = [];

		$http.get('app/common/mocks/bookMocks.json').then(function (mocks) {
			books = mocks.data;
		});

		$httpBackend.whenGET(urls.mock('books'), undefined, ['book'])
			.respond(function (method, url, data, headers, params) {
				var bookId,
					book;

				bookId = parseInt(params.book, 10);
				// Query all
				if (isNaN(bookId)) {
					return [200, angular.toJson(books), {}];
				}
				// Query single
				book = _.find(books, function (x) {
					return x.id === bookId;
				});
				if (angular.isDefined(book)) {
					return [200, angular.toJson(book), {}];
				}
				return [400, angular.toJson(null), {}];
			});

		$httpBackend.whenDELETE(urls.mock('books'), undefined, ['book'])
			.respond(function (method, url, data, headers, params) {
				var bookId = parseInt(params.book, 10),
					removedBook = _.remove(books, function (x) {
						return x.id === bookId;
					});
				if (angular.isDefined(removedBook)) {
					return [200, angular.toJson(true), {}];
				}
				return [400, angular.toJson(false), {}];
			});

		$httpBackend.whenPUT(urls.mock('books'), undefined, undefined, ['book'])
			.respond(function (method, url, updatedData, headers, params) {

				var bookId = parseInt(params.book, 10);
				if (angular.isUndefined(bookId)) {
					return [400, {}, {}];
				}
				var book = _.find(books, function (x) {
					return x.id === bookId;
				});

				if (angular.isUndefined(book)) {
					return [400, {}, {}];
				}
				angular.extend(book, angular.fromJson(updatedData));
				return [200, angular.toJson(course), {}];
			});

		$httpBackend.whenPOST(urls.mock('books'))
			.respond(function (method, url, data, headers, params) {
				var book = angular.fromJson(data);
				book.id = books[books.length - 1].id + 1;
				books.unshift(book);
				return [202, book, {}];
			});
	}

} ());
