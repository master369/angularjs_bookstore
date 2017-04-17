(function () {
	'use strict';

	describe('priceFilter', function () {
		var priceFilter;

		beforeEach(module('app'));

		beforeEach(function () {
			inject(function ($injector) {
				priceFilter = $injector.get('priceFilter');
			})
		});

		it('should properly initialize', function () {
			expect(priceFilter).toBeDefined();
		});

		it('should add currency suffix for price', function () {
			// act
			var value = '123',
				postFilter = priceFilter(value);

			// assert
			expect(postFilter).toEqual('123 руб');
		});


		it('should add thousands separator', function () {
			// act
			var value = '1234567',
				postFilter = priceFilter(value);

			// assert
			expect(postFilter).toEqual('1\'234\'567 руб');
		});

		it('should return correct zero value for NON valid input', function () {
			// act
			var value = 'some rubbish',
				postFilter = priceFilter(value);

			// assert
			expect(postFilter).toEqual('0 руб');
		});
	});

}());
