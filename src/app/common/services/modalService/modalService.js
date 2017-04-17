(function () {
	'use strict';
	angular.module('app.common')
		.service('modalService', modalService);
	modalService.$inject = ['$modal'];
	function modalService($modal) {
		var defaultSettings = {
			animation: true,
			controllerAs: 'vm',
			controller: 'modalCtrl',
			backdrop: true,
			keyboard: true,
			size: 'sm',
			time: false

		};

		return {
			showModal: showModal
		};

		function showModal(config) {
			return $modal.open(_.merge({}, defaultSettings, config));
		}

	}
}());

