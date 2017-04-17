(function () {
	'use strict';

	angular.module('app')
		.controller('deliveryOrderCtrl', deliveryOrderCtrl);

	deliveryOrderCtrl.$inject = ['$state', '$q', 'locationService', 'orderService', 'deliveryService', 'userService', 'enums', 'states'];

	function deliveryOrderCtrl($state, $q, locationService, orderService, deliveryService, userService, enums, states) {
		var vm = this;

		vm.ORDER_DELIVERY_MODE = enums.ORDER_DELIVERY_MODE;


		vm.currentUser;
		vm.userMode;
		vm.secondUser;

		vm.cities = [];
		vm.locations = [];
		vm.address = {};
		vm.deliveryMode = vm.ORDER_DELIVERY_MODE.PICKUP;
		vm.deliveryModes = [];
		vm.deliveryUser = {};

		vm.updateLocations = _updateLocations;
		vm.deliverModeChanged = _deliverModeChanged;
		vm.isMode = _isMode;
		vm.submit = _submit;

		_activate();

		function _activate() {
			var promises = [];

			promises.push(_loadDeliveryModes());
			promises.push(_loadCurrentUser());
			promises.push(_loadCityList());

			$q.all(promises).then(function () {
				_restoreOrderData()
			});
		}
		vm.prevStep = function () {
			orderService.clearStep();
			$state.go(states['cart'].data.stateName);
		}

		function _restoreOrderData() {
			var order = orderService.getOrder();

			if (order.addressee) {
				if (order.addressee.logged) {
					vm.userMode = 'current';
				}
				else {
					vm.secondUser = order.addressee;
					vm.userMode = 'other';
				}
			}
		}

		function _loadDeliveryModes() {
			return deliveryService.query(function (response) {
				vm.deliveryModes = response;
				_deliverModeChanged();
				return $q.when();
			}, function (error) {
				return $q.reject();
			});
		}

		function _loadCityList() {
			return locationService.getAllCities()
				.then(function (response) {
					vm.cities = response;
					return $q.when(response);
				})
				.catch(function (error) {
					console.error(error);
					return $q.reject();
				});
		}

		function _loadCurrentUser() {
			vm.currentUser = userService.getCurrentUser();
		}

		function _updateLocations(city) {
			_resetLocation();
			return locationService.getLocations(city).then(function (response) {
				vm.locations = response;
				return $q.when();
			}, function (error) {
				console.error(error);
				return $q.reject();
			});
		}
		function _resetLocation() {
			vm.address.location = null;
		}

		function _deliverModeChanged() {
			orderService.setDelivery(vm.deliveryMode)
				.catch(function () {
					console.log('Cant change delivery mode');
				});
		}
		function _isMode(mode) {
			return vm.ORDER_DELIVERY_MODE[mode] === parseInt(vm.deliveryMode, 10);
		}

		function _submit() {
			if (vm.deliveryMode == vm.ORDER_DELIVERY_MODE.PICKUP) {
				_goToConfirm();
			}
			else {
				$state.go(orderService.setStep('deliveryAddress'));
			}
		}


		function _goToConfirm() {
			var cityPromise = _loadCityById(vm.address.city),
				locationPromise = _loadLocationById(vm.address.location);

			cityPromise.then(function (response) {
				vm.address.city = response.name;
			});
			locationPromise.then(function (response) {
				vm.address.location = response.address;
			});

			Promise.all([cityPromise, locationPromise]).then(function (values) {
				if (vm.userMode === 'other') {
					vm.deliveryUser = vm.secondUser;
				}

				orderService.setOrder({
					address: vm.address,
					user: vm.currentUser,
					addressee: vm.deliveryUser,
					delivery: vm.deliveryMode
				});

				$state.go(orderService.setStep('confirm'));
			});
		}

		function _loadCityById(id) {
			return locationService.getCity(id)
				.then(function (response) {
					return $q.when(response[0]);
				})
				.catch(function (reason) {
					return $q.reject(reason);
				});
		}
		function _loadLocationById(id) {
			return locationService.getLocation(id)
				.then(function (response) {
					return $q.when(response);
				})
				.catch(function (reason) {
					return $q.reject(reason);
				});
		}
	}
}());
