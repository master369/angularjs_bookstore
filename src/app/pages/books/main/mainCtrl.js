(function () {
	'use strict';

	angular.module('app')
		.controller('mainCtrl', mainCtrl);

	mainCtrl.$inject = ['catalogBooksQ', '$q', 'categoryService', 'modalService', 'messageService'];

	function mainCtrl(catalogBooksQ, $q, categoryService, modalService, messageService) {
		var vm = this;
		vm.catalogs = catalogBooksQ;
		vm.catalogsPagination = {};
		vm.loadPage = loadPage;

		init();
		function init() {
			angular.forEach(catalogBooksQ, function (x) {
				vm.catalogsPagination[x.catalog.id] = angular.extend(x.catalog, {
					page: x.page
				})
			});
		}

		function loadPage(catalog, page) {
			categoryService.books.search({
				catalog: catalog,
				page: page,
				pageSize: 5
			}, function (res) {
				vm.catalogsPagination[catalog].page = page;
				vm.catalogs[_.findIndex(vm.catalogs, function (x) {
					return x.catalog.id === catalog;
				})] = res;
			});
		}
	}

} ());
