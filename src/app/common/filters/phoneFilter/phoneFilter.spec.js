(function () {
	'use strict';

	describe('phoneFilter', function () {
		var phoneFilter;

		beforeEach(module('app'));

		beforeEach(function () {
			inject(function ($injector) {
				phoneFilter = $injector.get('phoneFilter');
			})
		});

		it('should properly initialize', function () {
			expect(phoneFilter).toBeDefined();
		});

		it('should return correct value for valid input', function () {
			// act
			var value = '+79991234567',
				postFilter = phoneFilter(value);

			// assert
			expect(postFilter).toEqual('+7 (999) 123-45-67');
		});

		it('should return correct value for NOT valid input', function () {
			// act
			var value = '12-34-56',
				postFilter = phoneFilter(value);

			// assert
			expect(postFilter).toEqual(value);
		});
	});

}());
