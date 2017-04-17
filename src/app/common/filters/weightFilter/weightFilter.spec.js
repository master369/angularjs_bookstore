(function () {
	'use strict';

	describe('weightFilter', function () {
		var weightFilter;

		beforeEach(module('app'));

		beforeEach(function () {
			inject(function ($injector) {
				weightFilter = $injector.get('weightFilter');
			})
		});

		it('should properly initialize', function () {
			expect(weightFilter).toBeDefined();
		});

		it('should return the correct value for weight LESS than a kilogram', function () {
			// act
			var value = '123',
				postFilter = weightFilter(value);

			// assert
			expect(postFilter).toEqual('123 гр');
		});

		it('should return the correct value for weight MORE than a kilogram', function () {
			// act
			var value = '12345',
				postFilter = weightFilter(value);

			// assert
			expect(postFilter).toEqual('12 кг 345 гр');
		});

		it('should return the correct value for weight WITHOUT grams', function () {
			// act
			var value = '1000',
				postFilter = weightFilter(value);

			// assert
			expect(postFilter).toEqual('1 кг');
		});

		it('should return the correct value for INVALID input', function () {
			// act
			var value = 'some rubbish',
				postFilter = weightFilter(value);

			// assert
			expect(postFilter).toEqual('0 гр');
		});

	});

}());
