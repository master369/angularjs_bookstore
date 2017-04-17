(function () {
	'use strict';

	describe('Book card', function () {
		var ctrl,
			bindings,
			$componentController;

		beforeEach(module('app'));

		beforeEach(inject(function ($injector, $compile) {
			$componentController = $injector.get('$componentController');

			bindings = {
				item: {
					'id': 1,
					'name': 'citroma',
					'author': 'Douglas Jackson',
					'price': 1830,
					'oldPrice': 1947,
					'count': 0,
					'addDate': '2013-03-17T21:16:22Z',
					'createYear': '1967-04-13T08:03:27Z',
					'language': 'New Zealand Sign Language',
					'publisher': 'Hegmann-Kunze',
					'description': 'Removal of Nonautologous',
					'ISBN': '645864579-1',
					'weight': 1016,
					'genre': 1,
					'catalog': 1
				}
			};

			ctrl = $componentController('bookCard', null, bindings);
		}));

		it('should properly initialize', function () {
			// assert
			expect(ctrl).toBeDefined();
		});

		it('should return false for old book', function () {
			ctrl.item.addDate = new Date(2010, 0, 1);
			// assert
			expect(ctrl.isNewBook()).toBe(false);
		});

		it('should reurn true for new book', function () {
			ctrl.item.addDate = new Date();
			// assert
			expect(ctrl.isNewBook()).toBe(true);
		});

		it('should reurn false for invalid date', function () {
			ctrl.item.addDate = null;
			// assert
			expect(ctrl.isNewBook()).toBe(false);
		});
	});
}());
