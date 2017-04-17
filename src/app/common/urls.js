(function () {
	'use strict';

	angular
		.module('app.common')
		.factory('urls', function ($window, settings) {
			var urls;

			urls = {
				pay: {
					api: function() {
						return 'api/pay'
					},
					mock: function() {
						return new RegExp('api\/pay');
					},
					isMocked: true
				},
				books: {
					api: function (term) {
						return 'api/books/:book';
					},
					mock: function () {
						return new RegExp('api\/books(?:\/)?([0-9]+)?');
					},
					isMocked: true
				},
				category: {
					api: function (part) {
						return 'api/category' + (part || '');
					},
					mock: function (part) {
						if (part) {
							return new RegExp('api\/category\/' + part);
						}
						return new RegExp('api\/category(\/.+)?');
					},
					isMocked: true
				},
				users: {
					api: function (term) {
						return 'api/users/:id';
					},
					mock: function (term) {
						return new RegExp('api\/users(?:\/)?([0-9]+)?');
					},
					isMocked: true
				},
				images: {
					api: function (term) {
						return 'api/images/:id';
					},
					mock: function () {
						return new RegExp('api\/images(?:\/)?([0-9]+)?');
					},
					isMocked: true
				},
				delivery: {
					api: function (term) {
						return 'api/delivery/:id';
					},
					mock: function () {
						return new RegExp('api\/delivery(?:\/)?([0-9]+)?');
					},
					isMocked: true
				},
				orders: {
					api: function (term) {
						return 'api/orders/:id';
					},
					mock: function () {
						return new RegExp('api\/orders(?:\/)?([0-9]+)?');
					},
					isMocked: true
				}
			};

			function api(name) {
				var args = _.slice(arguments, 1, arguments.length),
					apiUrl = urls[name].api,
					rawUrl = angular.isString(apiUrl) ? apiUrl : apiUrl.apply({}, args);

				if (settings.testMode || urls[name].isMocked) {
					return rawUrl;
				}
				return $window.location.protocol + settings.webApiUrl + rawUrl;
			}

			function mock(name, term) {
				return urls[name].mock(term);
			}

			return {
				api: api,
				mock: mock
			};
		});
} ());
