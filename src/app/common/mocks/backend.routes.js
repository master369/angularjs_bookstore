(function () {
	'use strict';

	angular
		.module('app.backend')
		.run(backendRoutes);

	function backendRoutes($httpBackend) {
		$httpBackend.whenGET(/.*/).passThrough();
		$httpBackend.whenPOST(/.*/).passThrough();
		$httpBackend.whenPUT(/.*/).passThrough();
		$httpBackend.whenDELETE(/.*/).passThrough();
	}
} ());
