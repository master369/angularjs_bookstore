(function () {
	'use strict';

	var lastUserId = 99,
		users = [];

	angular.module('app.common')
		.run(run);

	run.$inject = ['$http', '$httpBackend', 'urls'];

	function run($http, $httpBackend, urls) {
		$http.get('app/common/mocks/userMocks.json').then(function (mocks) {
			users = mocks.data;
		});

		$httpBackend.whenGET(urls.mock('users'), undefined, ['id'])
			.respond(function (method, url, data, headers, params) {
				var id = parseInt(params.id, 10),
					user;

				if (isNaN(id)) {
					return [200, angular.toJson(_getAll()), {}];
				}

				user = _find(id);
				if (!user) {
					return [404, angular.toJson({ error: 'user does not exist' }), {}];
				}

				return [200, angular.toJson(user), {}];
			});

		$httpBackend.whenPOST(urls.mock('users'))
			.respond(function (method, url, data, headers) {
				var user = angular.fromJson(data);

				_add(user);

				return [200, {}, {}];
			});

		$httpBackend.whenDELETE(urls.mock('users'), undefined, ['id'])
			.respond(function (method, url, data, headers, params) {
				var id = parseInt(params.id, 10),
					removedUser = _remove(id);

				if (!removedUser) {
					return [404, angular.toJson({ error: 'user does not exist' }), {}];
				}

				return [200, {}, {}];
			});
		$httpBackend.whenPUT(urls.mock('users'), undefined, undefined, ['id'])
			.respond(function (method, url, data, headers, params) {
				var id = parseInt(params.id, 10),
					user;

				if (isNaN(id)) {
					return [400, null, {}];
				}

				user = _find(id);

				if (!user) {
					return [404, angular.toJson({ error: 'user does not exist' }), {}];
				}

				_update(user, data);

				return [200, angular.toJson(user), {}];
			});

		function _getAll() {
			return users.slice();
		}

		function _add(user) {
			lastUserId += 1;

			users.push({
				id: lastUserId,
				login: user.login,
				password: user.password
			});

			users.push(user);
		}

		function _find(id) {
			return users.find(function (item) {
				return item.id === id;
			});
		}

		function _remove(id) {
			return _.remove(users, function (item) {
				return item.id === id;
			});
		}

		function _update(user, updateData) {
			angular.extend(user, angular.fromJson(updateData));
		}
	}
} ());
