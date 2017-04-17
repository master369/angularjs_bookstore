(function () {
	'use strict';

	describe('countFilter', function () {
		var countFilter;

		beforeEach(module('app'));

		beforeEach(function () {
			inject(function ($injector) {
				countFilter = $injector.get('countFilter');
			})
		});

		it('should properly initialize', function () {
			expect(countFilter).toBeDefined();
		});

		it('should return correct value for NON empty input', function () {
			// act
			var value = '10',
				postFilter = countFilter(value);

			// assert
			expect(postFilter).toEqual('10 шт');
		});

		it('should return correct value for empty input', function () {
			// act
			var value = '',
				postFilter = countFilter(value);

			// assert
			expect(postFilter).toEqual('0 шт');
		});
	});

}());
