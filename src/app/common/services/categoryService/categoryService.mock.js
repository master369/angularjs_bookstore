(function () {
	'use strict';

	angular
		.module('app.common')
		.run(run);

	run.$inject = ['$httpBackend', 'urls', '$http'];

	function run($httpBackend, urls, $http) {
		var catalogs = [
			{
				id: 1,
				name: 'Новинки'
			}, {
				id: 2,
				name: 'Распродажа'
			}, {
				id: 3,
				name: 'Бестселлеры'
			}
		],
			genres = [
				{
					id: 1,
					name: 'Научная литература'
				}, {
					id: 2,
					name: 'Детская литература'
				}, {
					id: 3,
					name: 'Художественная литература'
				}
			],
			books;

		$http.get('app/common/mocks/bookMocks.json')
			.then(function (mocks) {
				books = mocks.data;
			});

		$httpBackend.whenGET(urls.mock('category', 'catalogs'))
			.respond(function (method, url, data, headers, params) {
				return [200, angular.toJson(catalogs), {}];
			});
		$httpBackend.whenGET(urls.mock('category', 'genres'))
			.respond(function (method, url, data, headers, params) {
				return [200, angular.toJson(genres), {}];
			});

		$httpBackend.whenGET(urls.mock('category'))

			.respond(function (method, url, data, headers, params) {
				var searchQuery = angular.fromJson(params),
					page = parseInt(searchQuery.page, 10),
					pageSize = parseInt(searchQuery.pageSize, 10),
					searchResult,
					rangeSelector,
					ranges,
					staticSelector,
					resultObject;


				rangeSelector = {
					createYearMin: '',
					createYearMax: '',
					priceMin: '',
					priceMax: ''
				};
				staticSelector = {
					catalog: '',
					genre: '',
					name: '',
					ISBN: '',
					author: '',
					publisher: '',
					language: ''
				};
				// Search
				if (angular.isDefined(searchQuery)) {
					if (searchQuery.length === 0) {
						return books;
					}
					rangeSelector = _.pick(searchQuery, _.keys(rangeSelector));
					staticSelector = _.pick(searchQuery, _.keys(staticSelector));
					ranges = {};
					angular.forEach(rangeSelector, function (value, prop) {
						var term = prop.split(/(Max|Min)/),
							temp = {};
						if (value.length !== 0) {
							temp[term[0]] = temp[term[0]] || {};
							temp[term[0]][term[1]] = value;
							ranges = _.merge(ranges, temp);
						}
					});
					searchResult =
						_.filter(books, function (x) {
							var fit = true;
							angular.forEach(staticSelector, function (value, term) {
								if (angular.isUndefined(x[term]) || x[term].toString().toLowerCase().indexOf(value.toString().toLowerCase()) === -1) {
									fit = false;
								}
							});
							return fit;
						}).filter(function (x) {
							var count = 0,
								require = _.keys(ranges).length || 0;
							angular.forEach(ranges, function (value, term) {
								var srcVal = term == 'createYear' ? new Date(x[term]).getFullYear() : x[term];
								if (srcVal > (+value.Min || srcVal - 1) && srcVal < (+value.Max || srcVal + 1)) {
									count++;
								}
							});
							return count === require;
						});
				}
				if (angular.isDefined(searchQuery.sortBy) && angular.isDefined(searchQuery.sortDir)) {
					searchResult = searchQuery.sortDir === 'asc' ? _.sortBy(searchResult, searchQuery.sortBy).reverse() : _.sortBy(searchResult, searchQuery.sortBy);
				}
				resultObject = {
					totalCount: searchResult.length,
					pageCount: Math.ceil(searchResult.length / pageSize) - 1,
					pageSize: pageSize,
					page: page,
					books: _.slice(searchResult, page * pageSize, page * pageSize + pageSize)
				};
				if (angular.isDefined(staticSelector.catalog)) {
					resultObject.catalog = _.find(catalogs, { id: parseInt(staticSelector.catalog, 10) });
				}
				if (angular.isDefined(staticSelector.genre)) {
					resultObject.genre = _.find(genres, { id: parseInt(staticSelector.genre, 10) });
				}
				return [200, angular.toJson(resultObject), {}];
			});
	}

} ());
