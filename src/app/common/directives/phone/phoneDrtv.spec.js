(function () {
	'use strict';

	describe('phone', function () {
		var $rootScope,
			$scope,
			phoneScope,
			element,
			operatorControl,
			numberControl;

		beforeEach(module('app'));
		beforeEach(module('app.common'));
		beforeEach(module('ngMockE2E'));

		beforeEach(inject(function ($injector, $compile) {
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
		}));

		describe('WITH ng-model', function () {
			beforeEach(inject(function ($injector, $compile) {
				var html = angular.element('<form><phone ng-model="phone" country="+7"></phone></form>');

				// $scope.phone = '+79991234567';
				element = $compile(html)($scope);
				$scope.$digest();

				element = angular.element(element.find('.phone')[0]);
				operatorControl = angular.element(element.find('#phoneOperator')[0]);
				numberControl = angular.element(element.find('#phoneNumber')[0]);
				phoneScope = element.isolateScope();
			}));

			it('should properly initialize', function () {
				// assert
				expect(element).toBeDefined();
				expect(operatorControl).toBeDefined();
				expect(numberControl).toBeDefined();
			});

			it('should change parent scope value on directive scope value change', function () {
				var country = '+7',
					operator = '999',
					number = '1234567';

				// act
				phoneScope.phone.country = country;
				phoneScope.phone.operator = operator;
				phoneScope.phone.number = number;
				phoneScope.$digest();

				// assert
				expect($scope.phone).toBe(country + operator + number);
			});

			it('should change parent scope value on input value change', function () {
				var country = '+7',
					operator = '999',
					number = '1234567';

				// act
				phoneScope.phone.country = country;
				operatorControl.val(operator).trigger('change');
				numberControl.val(number).trigger('change');

				phoneScope.$digest();

				// assert
				expect($scope.phone).toBe(country + operator + number);
			});

			// it('should change input value on ng-model changing', function () {
			// 	var country = '+7',
			// 		operator = '999',
			// 		number = '1234567';
			// 	// act
			// 	// $scope.phone = '+79991234567';// country + operator + number;
			// 	// $scope.$digest();

			// 	$scope.$apply(function () {
			// 		return $scope.phone = '+79991234567';
			// 	});

			// 	// assert
			// 	expect(phoneScope.phone.country).toEqual(country);
			// 	expect(phoneScope.phone.operator).toEqual(operator);
			// 	expect(phoneScope.phone.number).toEqual(number);
			// });
		});

		describe('WITHOUT ng-model', function () {
			beforeEach(inject(function ($injector, $compile) {
				var html = angular.element('<form><phone></phone></form>');

				element = $compile(html)($scope);
				$scope.$digest();

				element = angular.element(element.find('.phone')[0]);
				operatorControl = angular.element(element.find('#phoneOperator')[0]);
				numberControl = angular.element(element.find('#phoneNumber')[0]);
			}));

			it('should properly initialize WITHOUT ng-model', function () {
				expect(element).toBeDefined();
				expect(operatorControl).toBeDefined();
				expect(numberControl).toBeDefined();
			});
		});
	});

}());
