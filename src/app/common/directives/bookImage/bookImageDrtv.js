(function () {
	'use strict';

	angular
		.module('app')
		.controller('bookImageDrtvCtrl', bookImageDrtvCtrl)
		.directive('bookImage', [function () {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					bookId: '@',
					size: '@'
				},
				bindToController: true,
				controllerAs: 'vm',
				controller: 'bookImageDrtvCtrl',
				templateUrl: 'app/common/directives/bookImage/bookImage.html',
			};
		}]);

	bookImageDrtvCtrl.$inject = ['imageService'];
	function bookImageDrtvCtrl(imageService) {
		var vm = this;

		vm.image = '';

		_activate();

		function _activate() {
			_getImage(vm.bookId, vm.size);
		}

		function _getImage(id, size) {
			vm.image = imageService.get(id, size);
		}
	}
}());
