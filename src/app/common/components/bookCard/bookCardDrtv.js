(function () {
	'use strict';

	angular
		.module('app')
		.component('bookCard', {
			restrict: 'E',
			replace: true,
			bindings: {
				item: '='
			},
			controllerAs: 'vm',
			controller: bookCardCtrl,
			templateUrl: 'app/common/components/bookCard/bookCard.html',
		}
		);

	bookCardCtrl.$inject = ['$state', 'states', 'cartService', 'enums'];
	function bookCardCtrl($state, states, cartService, enums) {
		var vm = this,
			EXPIRATION_PERIOD = enums.TIME_PERIOD.YEAR;

		vm.buyButton = {
			isAvailable: false,
			text: ''
		};

		vm.isNewBook = _isNewBook;
		vm.stateGo = _stateGo;
		_activate();

		function _activate() {
		}

		function _isNewBook() {
			if (!vm.item.addDate) {
				return false;
			}

			var now = new Date(),
				bookAddDate = moment(vm.item.addDate),
				passTime = now - bookAddDate;

			return passTime < EXPIRATION_PERIOD;
		}
		function _stateGo(state, params) {
			$state.go(states[state].data.stateName, params);
		}
	}
}());
