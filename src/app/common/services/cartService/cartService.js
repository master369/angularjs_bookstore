(function () {
	'use strict';

	angular.module('app')
		.service('cartService', cartService);

	cartService.$inject = ['localStorageService'];

	function cartService(localStorageService) {
		var cart = [];

		_activate();

		return {
			get: _get,
			getAll: _getAll,
			getCount: _getCount,
			getTotalPrice: _getTotalPrice,
			getCart: _getCart,

			removeAll: _removeAll,
			remove: _remove,

			add: _add,
			has: _has,

			changeCount: _changeCount
		};

		function _activate() {
			_loadCart();
		}

		function _loadCart() {
			var localCart = localStorageService.get('cart');

			if (localCart) {
				_setCart(localCart);
			}
		}
		function _saveCart() {
			localStorageService.set('cart', cart);
		}
		function _setCart(localCart) {
			cart = localCart;
		}

		function _getAll() {
			return cart.slice();
		}
		function _getCount() {
			var totalCount = cart.reduce(function (prevValue, item) {
				return prevValue + item.buyCount;
			}, 0);

			return totalCount;
		}
		function _get(id) {
			return _findItem(id);
		}
		function _getCart() {
			return {
				items: _.clone(cart),
				price: _getTotalPrice(),
				count: _getCount()
			};
		}

		function _create(_item) {
			var item = _.extend({}, _item);
			item.buyCount = 1;

			cart.push(item);

			return cart.length - 1;
		}
		function _add(item) {
			var index = _findIndex(item.id);

			if (index >= 0) {
				_increaseCount(index);
				return;
			}

			_create(item);
			_saveCart();
		}

		function _removeAll() {
			cart = [];
			_saveCart();
		}
		function _remove(id) {
			var index = _findIndex(id);

			if (index < 0) {
				return;
			}

			cart.splice(index, 1);
			_saveCart();
		}

		function _has(id) {
			return _findIndex(id) >= 0;
		}

		function _getTotalPrice() {
			var totalPrice = cart.reduce(function (prevValue, item) {
				return prevValue + item.buyCount * item.price;
			}, 0);

			return totalPrice;
		}

		function _changeCount(item, count) {
			var itemIndex = _findIndex(item.id);

			if (count === 0 && itemIndex >= 0) {
				_remove(item.id);
				return;
			}

			if (itemIndex < 0) {
				itemIndex = _create(item);
			}

			cart[itemIndex].buyCount = count;
			_saveCart();
		}
		function _increaseCount(index) {
			cart[index].buyCount += 1;
			_saveCart();
		}

		function _findIndex(id) {
			return cart.findIndex(function (item) {
				return item.id === id;
			});
		}
		function _findItem(id) {
			var itemIndex = _findIndex(id);

			if (itemIndex < 0) {
				return null;
			}

			return _.clone(cart[itemIndex]);
		}

	}
}());