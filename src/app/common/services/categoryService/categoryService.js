(function () {
	'use strict';

	angular
		.module('app.common')
		.factory('categoryService', categoryService);

	categoryService.$inject = ['urls', '$http', '$resource', '$q'];
	function categoryService(urls, $http, $resource, $q) {
		var factory = {};

		factory.catalogs =
			$resource(urls.api('category', '/catalogs'), {
				id: '@id'
			}, {
				update: {
					method: 'PUT'
				}
			});

		factory.genres =
			$resource(urls.api('category', '/genres'), {
				id: '@id'
			}, {
				update: {
					method: 'PUT'
				}
			});
		factory.books =
			$resource(urls.api('category'), {}, {
				search: {
					method: 'GET',
					params:  {
						catalog: '@catalog',
						genre: '@genre',
						name: '@name',
						ISBN: '@ISBN',
						author: '@author',
						publisher: '@publisher',
						language: '@language',

						createYearMin: '@createYearMin',
						createYearMax: '@createYearMax',
						priceMin: '@priceMin',
						priceMax: '@priceMax',

						sortBy: '@sortBy',
						sortDir: '@sortDir',

						page: '@page',
						pageSize: '@pageSize'
					}
				}
			});

		return factory;
	}
}());
