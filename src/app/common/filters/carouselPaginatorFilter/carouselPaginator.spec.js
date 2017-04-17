(function () {
	'use strict';

	describe('carouselPaginatorFilter', function () {
		var carouselPaginator;

		beforeEach(module('app'));

		beforeEach(function () {
			inject(function ($injector) {
				carouselPaginator = $injector.get('carouselPaginatorFilter');
			})
		});

		it('should properly initialize', function () {
			expect(carouselPaginator).toBeDefined();
		});

		it('should return correct value for valid input', function () {
			// act
			var data = [0, 1, 2, 3, 4, 5],
				length = 3,
				postFilter = carouselPaginator(data, length);

			// assert
			expect(postFilter).toEqual(data.slice(length));
		});
	});

}());
