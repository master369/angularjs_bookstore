(function () {
	'use strict';

	angular
		.module('app.common')
		.factory('imageService', imageService);

	imageService.$inject = ['$resource', 'urls'];
	function imageService($resource, urls) {
		return {
			get: _get
		}

		function _get(id, size) {
			var id = parseInt(id, 10),
				size = size || 'sm',
				imageSrc;

			if (isNaN(id)) {
				id = 'default';
			}

			if (size !== 'sm' && size != 'bg') {
				size = 'sm';
			}

			// for test
			id = id % 4;

			imageSrc = _getUrl(id, size);
			return imageSrc;
		}

		function _getUrl(id, size) {
			return 'images/book/' + id + '/' + id + '_' + size + '.jpg';
		}

	}
}());
