(function () {
	'use strict';
	angular.module('app.common')
		.factory('locationService', locationService);

	locationService.$inject = ['$http', '$q'];

	function locationService($http, $q) {
		return {
			getAllCities: _getAllCities,
			getCities: _getCities,

			getLocation: _getLocation,
			getLocations: _getLocations,

			getRegiones: _getRegiones,
			getCity: _getCity,
			getRegion: _getRegion
		};

		function _getAllCities() {
			return $http.get('app/common/mocks/cityMocks.json')
				.then(function (mocks) {
					return $q.when(mocks.data);
				})
				.catch(function (reason) {
					return [];
				});
		}

		function _getCities(region) {
			region = parseInt(region, 10);
			return $http.get('app/common/mocks/cityMocks.json')
				.then(function (mocks) {
					var regionCity = mocks.data.filter(function (item) {
						return item.region === region;
					});
					return $q.when(regionCity);
				})
				.catch(function (reason) {
					return [];
				});
		}

		function _getCity(id) {
			id = parseInt(id, 10);
			return $http.get('app/common/mocks/cityMocks.json')
				.then(function (mocks) {
					var city = mocks.data.filter(function (item) {
						return item.id === id;
					});
					return $q.when(city);
				})
				.catch(function (reason) {
					return [];
				});
		}

		function _getRegion(id) {
			id = parseInt(id, 10);
			return $http.get('app/common/mocks/regionMocks.json')
				.then(function (mocks) {
					var region = mocks.data.filter(function (item) {
						return item.id === id;
					});
					return $q.when(region);
				})
				.catch(function (reason) {
					return [];
				});
		}
		function _getRegiones() {
			return $http.get('app/common/mocks/regionMocks.json')
				.then(function (mocks) {
					return $q.when(mocks.data);
				})
				.catch(function (reason) {
					return [];
				});
		}


		function _getLocation(id) {
			id = parseInt(id, 10);

			return $http.get('app/common/mocks/locationMocks.json')
				.then(function (mocks) {
					var locations = mocks.data.filter(function (item) {
						return item.id === id;
					});

					return $q.when(locations[0]);
				})
				.catch(function (reason) {
					return [];
				});
		}
		function _getLocations(city) {
			city = parseInt(city, 10);

			return $http.get('app/common/mocks/locationMocks.json')
				.then(function (mocks) {
					var cityLocations = mocks.data.filter(function (item) {
						return item.city === city;
					});

					return $q.when(cityLocations);
				})
				.catch(function (reason) {
					return [];
				});
		}

	}
}());
