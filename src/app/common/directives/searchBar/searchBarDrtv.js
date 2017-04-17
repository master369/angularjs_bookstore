(function(){
	'use strict';

	angular
		.module('app.common')
		.directive('searchBar', searchBar);

	function searchBar() {
		return {
			restrict: 'E',
			scope: {
				onSearch: '&',
				searchTerms: '='
			},
			templateUrl: 'app/common/directives/searchBar/searchBar.html',
			controller: controller,
			controllerAs: 'vm',
			bindToController: true,
			replace: true,
			link: link
		};

		function controller() {
			var vm = this;
			vm.search = search;
			vm.terms = vm.searchTerms;

			function search() {
				vm.onSearch({
					searchTerms: vm.terms
				});
			}
		}

		function link(scope, elem, attr, vm) {

		}
	}

}());
