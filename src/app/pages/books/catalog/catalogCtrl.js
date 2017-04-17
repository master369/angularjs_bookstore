(function () {
	'use strict';

	angular.module('app')
		.controller('catalogCtrl', catalogCtrl);

	catalogCtrl.$inject = ['$scope', 'booksListQ', '$state', 'categoryService', '$stateParams'];
	function catalogCtrl($scope, booksListQ, $state, categoryService, $stateParams) {
		var vm = this;
		vm.sizes = [{
			value: 5
		},
		{
			value: 10
		},
		{
			value: 15
		},
		{
			value: 25
		}];
		vm.currentPage = 0;
		vm.currentSize = vm.sizes[2];
		vm.data = booksListQ.books;
		vm.onSizeChange = onSizeChange;
		vm.search = search;
		vm.sort = sort;
		vm.pagesCount = booksListQ.pageCount;
		vm.pageSize = vm.currentSize.value;
		vm.isSearch = $stateParams.search || false;
		vm.header = _.get(booksListQ, 'catalog.name') || _.get(booksListQ, 'genre.name') || 'Каталог';

		vm.searchTerms = angular.extend(_.clone($stateParams.query) || {}, {
			sortBy: 'price',
			page: vm.currentPage,
			pageSize: vm.currentSize.value
		});


		_activate();
		function _activate() {
		}

		function onSizeChange() {
			vm.searchTerms.pageSize = vm.currentSize.value;
			vm.currentPage = 0;
			search(vm.searchTerms);

		}
		function search(searchTerms, fromPagination) {
			vm.searchTerms = angular.extend(vm.searchTerms, searchTerms);
			_.forEach(vm.searchTerms, function(x, y) {
				if(x && x.length === 0) {
					_.unset(vm.searchTerms, y);
				}
			});
			if(!fromPagination) {
				vm.searchTerms.page = 0;
			}
			categoryService.books.search(vm.searchTerms, function (booksList) {
				vm.pagesCount = booksList.pageCount;
				vm.data = booksList.books;
				vm.pageSize = vm.currentSize.value;
			});
		}

		function sort() {
			search(vm.searchTerms);
		}

	}
}());
