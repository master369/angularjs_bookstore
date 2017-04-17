(function () {
	'use strict';

	angular
		.module('app')
		.component('carouselCustom', {
			restrict: 'E',
			replace: true,
			bindings: {
				data: '=',
				totalCount: '@',
				pageSize: '=',
				page: '=',
				loadPage: '&'
			},
			bindToController: true,
			controllerAs: 'vm',
			controller: controller,
			templateUrl: 'app/common/components/carousel/carouselComp.html',
		});

	function controller() {
		var vm = this;
		vm.set = set;

		function set(action) {
			vm.loadPage({ page: vm.page + action });
		}

		vm.checkEnd = function () {
			var rightCorner = vm.page * vm.pageSize + vm.pageSize;
			return rightCorner >= vm.totalCount ? vm.totalCount : rightCorner;
		};
	}
} ());