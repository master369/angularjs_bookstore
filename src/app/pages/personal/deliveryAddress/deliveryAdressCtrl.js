(function () {
	'use strict';

	angular.module('app')
		.controller('deliveryAdressCtrl', deliveryAdressCtrl);

	deliveryAdressCtrl.$inject = ['$http', 'locationService', 'orderService', 'userService', '$state', 'states'];

	function deliveryAdressCtrl($http, locationService, orderService, userService, $state, states) {
		var vm = this;

		vm.addresses = [];
		vm.cities = [];
		vm.regiones = [];
		vm.updateLocations = _updateLocations;
		vm.updateCities = _updateCities;
		vm.addNewAdress = _addNewAdress;
		vm.deleteAddress = _deleteAddress;
		vm.submit = _submit;
		vm.locations = [];
		vm.delivery = {
			region: null,
			city: null,
			street: null,
			house: null,
			corpus: null,
			appt: null,
			postNum: null,
			addressee: null
		};
		vm.availableUsers = {
			current: {},
			other: {}
		};
		vm.secondUser;
		vm.deliveryUser;
		vm.oldAdress;
		vm.checkAddress = _checkAddress;
		vm.newAddressShow = false;
		vm.toggleNewAddress = _toggleNewAddress;

		_activate();
		function _checkAddress() {
			angular.forEach(vm.addresses, function (address) {
				if (orderService.getAddress().id == address.id) {
					vm.oldAdress = address;
				}
				else {
					vm.oldAdress = vm.addresses[0];
				}
			});
		}

		function _activate() {
			locationService.getCities().then(function (response) {
				vm.cities = response;
			});
			locationService.getRegiones().then(function (response) {
				vm.regiones = response;
			});
			_loadCurrentUser();
			_checkUser();
			vm.addresses = vm.availableUsers.current.addresses || [];
			vm.checkAddress();
		}
		function _loadCurrentUser() {
			vm.availableUsers.current = userService.getCurrentUser();
		}
		function _updateLocations(city) {
			_resetLocation();
			locationService.getLocations(city).then(function (response) {
				vm.locations = response;
			}, function (error) {
				console.log(error);
			});
		}
		function _resetLocation() {
			vm.delivery.location = null;
		}

		function _updateCities(region) {
			_resetCities();
			locationService.getCities(region).then(function (response) {
				vm.cities = response;
			}, function (error) {
				console.log(error);
			});
		}
		function _resetCities() {
			vm.delivery.city = null;
		}

		function _addNewAdress() {
			var addresseslength = vm.addresses.length,
				id = addresseslength + 1,
				delivery = {},
				addressee = {},
				user = angular.copy(vm.availableUsers.current);

			_.extend(delivery, vm.delivery);
			delivery.id = id;
			_checkUser();
			_.extend(addressee, vm.addressee);
			addressee.addresses = null;
			delivery.addressee = addressee;
			locationService.getCity(+vm.delivery.city).then(function (response) {
				delivery.city = response[0].name;
			}, function (error) {
				console.log(error);
			});
			locationService.getRegion(+vm.delivery.region).then(function (response) {
				delivery.region = response[0].name;
				if (addresseslength === 0) {
					vm.oldAdress = delivery;
				}
				vm.addresses.push(delivery);
				user.addresses = _.clone(vm.addresses);
				userService.setCurrentUser(user);
			}, function (error) {
				console.log(error);
			});
			vm.delivery = {
				region: null,
				city: null,
				street: null,
				house: null,
				corpus: null,
				appt: null,
				postNum: null
			};
			$state.go(states.orderDeliveryAddress);
			//vm.availableUsers.current.addresses.push(vm.delivery);
		}
		vm.prevStep = function () {
			$state.go(orderService.getPreviousStep());
		}
		function _submit() {
			var oldAdress = angular.fromJson(vm.oldAdress);
			_.extend(vm.delivery, oldAdress);
			orderService.setAddress(vm.delivery);
			orderService.setAddressee(vm.delivery.addressee);

			$state.go(orderService.setStep('confirm'));
		}
		function _checkUser() {
			if (vm.userMode === 'other') {
				vm.addressee = vm.secondUser;
				vm.secondUser= {};
				vm.userMode = 'current';
			}
			else {
				vm.addressee = vm.availableUsers.current;
			}
		}
		function _deleteAddress(id) {
			var address = vm.addresses.filter(function (item) {
				return item.id === id;
			}),
				index = vm.addresses.indexOf(address[0]);
			vm.addresses.splice(index, 1);
			userService.setCurrentUser(vm.availableUsers.current);
		}

		function _toggleNewAddress() {
			vm.newAddressShow = !vm.newAddressShow;
		}

	};
}());