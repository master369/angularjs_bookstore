// (function () {
// 	'use strict';

// 	describe('changePasswordCtrl', function () {
// 		var $controller,
// 			// $rootScope,
// 			// $scope,
// 			messageService,
// 			modalData,
// 			vm,
// 			modalTypes = {
// 				confirm: 'confirm',
// 				inform: 'inform'
// 			},
// 			modalData = {
// 				type: 'type',
// 				title: 'title',
// 				message: 'message'
// 			};

// 		beforeEach(module('app'));
// 		beforeEach(module('app.common'));
// 		beforeEach(module('ngMockE2E'));

// 		beforeEach(inject(function ($injector) {
// 			$controller = $injector.get('$controller');
// 			// $rootScope = $injector.get('$rootScope');
// 			// $scope = $rootScope.$new();

// 			// mock
// 			messageService = (function () {
// 				return {
// 					notifyInform: _notifyInform,
// 					notifyError: _notifyError
// 				};

// 				function _notifyInform() { };
// 				function _notifyError() { };
// 			}());
// 			// spy
// 			spyOn(messageService, 'notifyInform').and.callThrough();
// 			spyOn(messageService, 'notifyError').and.callThrough();
// 			// controller
// 			vm = $controller('modalCtrl', {
// 				messageService: messageService,
// 			});
// 		}));

// 		it('should properly initialize', function () {
// 			// assert
// 			expect(vm).toBeDefined();
// 			expect(vm.modalTypes).toEqual(modalTypes);
// 			expect(vm.type).toEqual(modalData.type);
// 			expect(vm.title).toEqual(modalData.title);
// 			expect(vm.message).toEqual(modalData.message);
// 		});

// 		it('should confirm modal window', function () {
// 			// act
// 			vm.confirm();

// 			// assert
// 			expect($modalInstance.close).toHaveBeenCalled();
// 		});

// 		it('should dismiss modal window', function () {
// 			// act
// 			vm.reject();

// 			// assert
// 			expect($modalInstance.dismiss).toHaveBeenCalled();
// 		});
// 	});

// }());
