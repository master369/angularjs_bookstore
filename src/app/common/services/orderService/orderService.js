(function () {
	'use strict';

	angular.module('app')
		.service('orderService', orderService);

	orderService.$inject = ['$rootScope', '$q', 'orderManagerService', 'cartService', 'deliveryService', 'localStorageService', 'enums', 'states'];

	function orderService($rootScope, $q, orderManagerService, cartService, deliveryService, localStorageService, enums, states) {
		var cart = {},
			delivery = {},
			address = {},
			user = {},
			paymentMethod = {},
			lastStep = 0,
			data = {},
			addressee = {},
			steps = enums.ORDER_STEPS,
			completedSteps = {};

		_activate();

		return {
			getOrder: _getOrder,
			setOrder: _setOrder,

			getCart: _getCart,

			getInfo: _getInfo,
			setInfo: _setInfo,


			getAddress: _getAddress,
			setAddress: _setAddress,

			getDelivery: _getDelivery,
			setDelivery: _setDelivery,

			getUser: _getUser,
			setUser: _setUser,

			getAddressee: _getAddressee,
			setAddressee: _setAddressee,

			setPaymentMethod: _setPaymentMethod,
			isPaid: _isPaid,

			clear: _clear,
			confirm: _confirm,

			// Route control
			isValidRoute: isValidRoute,
			setStep: _setStep,
			getLastStep: _getLastStep,
			getPreviousStep: _getPreviousStep,
			getLastStepRoute: _getLastStepRoute,
			clearStep: _clearStep,
			getSteps: _getSteps
		};

		function _getSteps() {
			return completedSteps;
		}

		function _clearStep() {
			lastStep = 0;
			_clearLocalStorage();
			_clearOrder();
		}

		function _getLastStep() {
			if (_.keys(completedSteps).length > 0) {
				return completedSteps[_.last(_.keys(completedSteps))].route;
			}
		}

		function _getLastStepRoute() {
			return lastStep === 0 ? states['cart'].data.stateName : _.find(steps, { id: lastStep }).route;
		}

		function _getPreviousStep(skip) {
			_.unset(completedSteps, _.last(_.keys(completedSteps)));
			lastStep -= skip || 1;
			return _getLastStep();
		}

		function _setStep(step) {
			lastStep = steps[step].id;
			completedSteps[step] = steps[step];
			_saveToLocalStorage();
			return _getLastStep();
		}

		function isValidRoute(stateName) {
			if (lastStep === 0) {
				return false;
			}
			var targetState = _.find(steps, { route: stateName });
			return _.find(steps, { id: lastStep }).id >= targetState.id ? true : false;
		}


		function _activate() {
			// _clearLocalStorage();
			_loadCart();
			_loadFromLocalStorage();
		}

		function _confirm() {
			var deferred = $q.defer();

			orderManagerService.save(_getOrder(), function (response) {
				cartService.removeAll();
				deferred.resolve(response);
			}, function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function _getOrder() {
			return {
				cart: cart,
				delivery: delivery,
				address: address,
				user: user,
				addressee: addressee,
				data: data,
				paymentMethod: paymentMethod,
				price: cart.price + delivery.price,
			};
		}
		function _setOrder(order) {
			var deferred = $q.defer(),
				deliveryPromise = _setDelivery(order.delivery);

			_setUser(order.user);
			_setAddress(order.address);
			_setAddressee(order.addressee)

			deliveryPromise.then(function () {
				deferred.resolve();
			}, function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function _getInfo() {
			return data;
		}
		function _setInfo(_info) {
			_.extend(data, _info);
			_saveToLocalStorage();
		}


		function _getCart() {
			_loadCart();
			return cart;
		}

		function _getAddress() {
			return address;
		}
		function _setAddress(_address) {
			_.extend(address, _address);
			_saveToLocalStorage();
		}

		function _getUser() {
			return user;
		}
		function _setUser(_user) {
			_.extend(user, _user);
			_saveToLocalStorage();
		}

		function _getAddressee() {
			return addressee;
		}
		function _setAddressee(_addressee) {
			// _.extend(addressee, _addressee);
			addressee = _.clone(_addressee);
			_saveToLocalStorage();
		}

		function _getDelivery() {
			return delivery;
		}
		function _setDelivery(id) {
			var deferred = $q.defer();

			deliveryService.get({ id: id }, function (response) {
				_.extend(delivery, response);
				_saveToLocalStorage();
				$rootScope.$broadcast('orderChanged', delivery);
				deferred.resolve(delivery);
			}, function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function _clear() {
			_clearLocalStorage();
			_clearOrder();
		}

		function _clearOrder() {
			cart = {};
			delivery = {};
			address = {};
			user = {};
			addressee = {};
			paymentMethod = {};
			lastStep = 0;
			completedSteps = {};
		}

		function _loadCart() {
			cart = cartService.getCart();
		}

		function _loadFromLocalStorage() {
			var order = localStorageService.get('order');
			if (order) {
				cart = order.cart;
				delivery = order.delivery;
				address = order.address;
				user = order.user;
				addressee = order.addressee;
				paymentMethod = order.paymentMethod;
				lastStep = order.lastStep;
				completedSteps = order.completedSteps;
			}
		}
		function _saveToLocalStorage() {
			localStorageService.set('order', {
				cart: cart,
				delivery: delivery,
				address: address,
				user: user,
				addressee: addressee,
				paymentMethod: paymentMethod,
				lastStep: lastStep,
				completedSteps: completedSteps
			});
		}

		function _setPaymentMethod(newPayment) {
			paymentMethod = newPayment;
			_saveToLocalStorage();

			return this;
		}

		function _isPaid() {
			return angular.isDefined(paymentMethod) ? enums.PAYMENT_METHOD.PAYMENT === paymentMethod.type : false;
		}

		function _clearLocalStorage() {
			localStorageService.remove('order');
		}
	}
}());