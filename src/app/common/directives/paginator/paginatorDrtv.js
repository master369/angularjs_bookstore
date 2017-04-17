(function () {
	'use strict';

	angular
		.module('app')
		.controller('paginatorDrtvCtrl', paginatorDrtvCtrl)
		.directive('paginator', [function () {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					size: '=',
					page: '=',
					search: '&',
					pageCount: '='
				},
				bindToController: true,
				controllerAs: 'vm',
				controller: 'paginatorDrtvCtrl',
				templateUrl: 'app/common/directives/paginator/paginator.html'
			};
		}]);

	function paginatorDrtvCtrl($scope, $timeout) {
		var vm = this,
			unsubscribePageCount;

		vm.pages = [];
		vm.toNextPage = _toNextPage;
		vm.toPreviousPage = _toPreviousPage;
		vm.toFirstPage = _toFirstPage;
		vm.toLastPage = _toLastPage;
		vm.isFirstPage = _isFirstPage;
		vm.isLastPage = _isLastPage;
		vm.setPage = _setPage;
		vm.changeSize = _changeSize;
		vm.pagesRender = _pagesRender;
		vm.makePart = _makePart;

		init();

		function init() {
			vm.pagesRender();
		}

		function _toNextPage() {
			if (vm.isLastPage()) {
				return;
			}
			vm.setPage(vm.page + 1)
			_pagesRender();
		};
		function _toPreviousPage() {
			if (vm.isFirstPage()) {
				return;
			}
			vm.setPage(vm.page - 1)
			vm.pagesRender();
		};
		function _toFirstPage() {
			vm.setPage(0);
			vm.pagesRender();
		};
		function _toLastPage() {
			vm.setPage(vm.pageCount);
			vm.pagesRender();
		};
		function _isFirstPage() {
			return vm.page === 0;
		};
		function _isLastPage() {
			return vm.page === vm.pageCount;
		};
		function _setPage(i) {
			vm.page = i;
			var resolve = {
				page: {
					page: i
				},
				fromPagination: true
			};
			vm.search(resolve);
			vm.pagesRender();
		};
		function _changeSize() {
			vm.setPage(0);
		}
		function _pagesRender() {
			var numberPages = vm.pageCount + 1,
				itemOnSide = 5,
				currentPage = vm.page + 1;

			if (numberPages === 0) {
				vm.makePart(1, 1);
			}
			else if (numberPages < itemOnSide + 1) {
				vm.makePart(1, numberPages);
			}
			else if (currentPage < itemOnSide / 2 + 1) {
				vm.makePart(1, itemOnSide + 1);
			}
			else if (currentPage >= itemOnSide / 2 + 1 && currentPage < numberPages - itemOnSide / 2) {
				vm.makePart(currentPage - itemOnSide / 2, currentPage + itemOnSide / 2);
			}
			else if (currentPage >= numberPages - itemOnSide / 2) {
				vm.makePart(numberPages - itemOnSide, numberPages);
			}

			return vm.pages;
		};
		function _makePart(start, end) {
			var i;

			vm.pages = [];
			for (i = start; i <= end; i++) {
				vm.pages.push(Math.ceil(i));
			}
		}
		unsubscribePageCount = $scope.$watch('vm.pageCount', _pagesRender);

		$scope.$on('$destroy', function() {
			unsubscribePageCount();
		});
	}
}());
