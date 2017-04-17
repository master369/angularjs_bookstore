(function() {
	'use strict';

	angular
		.module('app.common')
		.controller('asideCtrl', asideCtrl);

	asideCtrl.$inject = ['catalogsQ', 'genresQ', 'states'];
	function asideCtrl(catalogsQ, genresQ, states) {
		var vm = this;

		var catalogs = _.clone(catalogsQ)
		catalogs.unshift({
			name: 'Посмотреть весь каталог'
		});

		vm.route = states['catalog'].data.stateName;
		vm.links = {
			catalogs: {
				header: 'Каталог',
				data: catalogs,
				type: 'catalog'
			},
			genres: {
				header: 'Жанры',
				data: genresQ,
				type: 'genre'
			}
		}

	}

}());
