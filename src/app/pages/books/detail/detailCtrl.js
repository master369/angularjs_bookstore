(function () {
	'use strict';

	angular.module('app')
		.controller('detailCtrl', detailCtrl);

	detailCtrl.$inject = ['bookQ', 'bookService', 'imageService', '$state', 'cartService', 'orderService'];
	function detailCtrl(bookQ, bookService, imageService, $state, cartService, orderService) {
		var vm = this;
		vm.item = bookQ;
		vm.buyBook = _buyBook;
		vm.isAvailable = _isAvailable;

		_activate();

		function _activate() {
			_getImage(vm.item.id);
		}

		function _buyBook(item) {
			if (!cartService.has(item.id)) {
				cartService.add(item);
			}
			$state.go(orderService.setStep('delivery'));
		}
		function _getImage(id) {
			vm.item.image = imageService.get(id, 'bg');
		}
		function _isAvailable() {
			return vm.item.count && vm.item.count > 0;
		}
	}

}());