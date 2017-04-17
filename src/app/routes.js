(function () {
	'use strict';

	angular
		.module('app')
		//.config(routes);
		.provider('states', ['enums', '$injector', function (enums, $injector) {
			var states = {};

			states.shell = {
				url: '',
				abstract: true,
				views: {
					'': {
						controller: 'shellCtrl',
						controllerAs: 'vm',
						templateUrl: 'app/common/partials/shell/shell.html',
					},
					'aside@shell': {
						templateUrl: 'app/common/partials/Aside/books.html',
						controller: 'asideCtrl',
						controllerAs: 'vm',
						resolve: {
							catalogsQ: ['categoryService', function (categoryService) {
								return categoryService.catalogs.query().$promise;
							}],
							genresQ: ['categoryService', function (categoryService) {
								return categoryService.genres.query().$promise;
							}]
						}
					},
					'content@shell': {
						template: ''
					}
				},
				data: {
					stateName: 'shell',
					name: false
				}
			};

			states.main = {
				url: '/',
				resolve: {
					catalogBooksQ: ['categoryService', '$q', function (categoryService, $q) {
						var defer = $q.defer(),
							pagination = {
								page: 0,
								pageSize: 5
							},
							promises;

						promises = [
							categoryService.books.search(angular.extend(pagination, { catalog: 1 })).$promise,
							categoryService.books.search(angular.extend(pagination, { catalog: 2 })).$promise,
							categoryService.books.search(angular.extend(pagination, { catalog: 3 })).$promise,
						]
						$q.all(promises)
							.then(function (results) {
								defer.resolve(results);
							}, function () {
								defer.reject();
							})
						return defer.promise;
					}]
				},
				views: {
					'content': {
						templateUrl: 'app/pages/books/main/main.html',
						controller: 'mainCtrl',
						controllerAs: 'vm',
						title: 'main'
					}
				},
				data: {
					name: 'Главная',
					stateName: 'shell.main',
					breadcrumbs: false
				}
			};
			states.catalog = {
				url: '/books/catalog?search',
				params: {
					query: {
						value: {}
					},
					search: {
						type: 'bool',
						value: false,
						squash: true
					}
				},
				views: {
					'content': {
						controller: 'catalogCtrl',
						controllerAs: 'vm',
						templateUrl: 'app/pages/books/catalog/catalog.html',
						resolve: {
							booksListQ: ['categoryService', '$stateParams', function (categoryService, $stateParams) {
								var query = $stateParams.query;
								_.extend(query, enums.PAGINATION);
								return categoryService.books.search(query).$promise;
							}]
						}
					}
				},
				data: {
					stateName: 'shell.catalog',
					breadcrumbs: [{
						name: 'Главная',
						route: 'main',
					},
					{
						name: 'Каталог',
					}]
				}
			};
			states.detail = {
				url: '/books/{id:[0-9]+}',
				views: {
					'content': {
						templateUrl: 'app/pages/books/detail/detail.html',
						controller: 'detailCtrl',
						controllerAs: 'vm',
						title: 'Book detail',
						resolve: {
							bookQ: ['bookService', '$stateParams', '$state', '$q', function (bookService, $stateParams, $state, $q) {
								var bookId = parseInt($stateParams.id, 10);
								return bookService.get({ book: bookId }).$promise;
							}]
						}
					}
				},
				data: {
					stateName: 'shell.detail',
					breadcrumbs: [{
						name: 'Главная',
						route: 'main',
					},
					{
						name: 'Карточка товара',
					}]
				}
			};

			states.login = {
				url: '/login',
				views: {
					'content': {
						templateUrl: 'app/pages/login/login.html',
						controller: 'loginCtrl',
						controllerAs: 'vm',
						title: 'login'
					}
				},
				data: {
					breadcrumbs: false,
					stateName: 'shell.login',
				}
			};
			states.cart = {
				url: '/cart',
				views: {
					'content': {
						templateUrl: 'app/pages/cart/cart.html',
						controller: 'cartCtrl',
						controllerAs: 'vm',
						title: 'Cart'
					},
					'aside': {
						template: ''
					}
				},
				data: {
					stateName: 'shell.cart',
					breadcrumbs: [{
						name: 'Главная',
						route: 'main',
					},
					{
						name: 'Корзина',
					}]
				}
			};
			states.personal = {
				url: '/personal',
				abstract: true,
				views: {
					'content': {
						templateUrl: 'app/pages/personal/personal.html'
					},
					'aside': {
						templateUrl: 'app/common/partials/aside/personal.html',
						controller: 'personalCtrl',
						controllerAs: 'vm'
					}
				},
				data: {
					breadcrumbs: false,
					stateName: 'shell.personal'
				}
			};

			states.changePassword = {
				url: '/changePassword',
				views: {
					'personal': {
						templateUrl: 'app/pages/personal/changePassword/changePassword.html',
						title: 'Change Password',
						controller: 'changePasswordCtrl',
						controllerAs: 'vm'
					}
				},
				data: {
					stateName: 'shell.personal.changePassword',
					breadcrumbs: [{
						name: 'Главная',
						route: 'main',
					},
					{
						name: 'Сменить пароль',
					}]
				}
			};
			states.userDeliveryAddress = {
				url: '/deliveryAddress',
				views: {
					'personal': {
						templateUrl: 'app/pages/personal/deliveryAddress/userDeliveryAddress.html',
						controller: 'deliveryAdressCtrl',
						controllerAs: 'vm',
						title: 'Delivery adress'
					}
				},
				data: {
					stateName: 'shell.personal.deliveryAddress',
					breadcrumbs: [{
						name: 'Главная',
						route: 'main'
					},
					{
						name: 'Мои адреса доставки',
					}]
				}
			};
			states.orders = {
				url: '/orders',
				views: {
					'personal': {
						templateUrl: 'app/pages/personal/orders/orders.html',
						controller: 'ordersCtrl',
						controllerAs: 'vm',
						title: 'User Orders'
					}
				},
				data: {
					stateName: 'shell.personal.orders',
					breadcrumbs: [{
						name: 'Главная',
						route: 'main',
					},
					{
						name: 'Мои заказы',
					}]
				},
				restriction: {
					authorized: true
				},
			};
			states.registrationPage = {
				url: '/registrationPage',
				views: {
					'personal': {
						templateUrl: 'app/pages/personal/registrationPage/registrationPage.html',
						title: 'Registration page'
					}
				},
				data: {
					stateName: 'shell.personal.registrationPage',
					breadcrumbs: false
				}
			};
			states.order = {
				url: '/order',
				abstract: true,
				views: {
					'personal': {
						templateUrl: 'app/pages/personal/order/order.html',
						controller: 'orderCtrl',
						controllerAs: 'vm',
					}
				},
				data: {
					stateName: 'shell.personal.order'
				}
			};
			states.orderDelivery = {
				url: '/delivery',
				views: {
					'orders': {
						templateUrl: 'app/pages/personal/order/delivery/delivery.html',
						controller: 'deliveryOrderCtrl',
						controllerAs: 'vm',
						title: 'Order Delivery'
					}
				},
				data: {
					stateName: 'shell.personal.order.delivery',
					breadcrumbs: [{
						name: 'Главная',
						route: 'main'
					},
					{
						name: 'Корзина',
						route: 'cart'
					},
					{
						name: 'Доставка',
					}],
					validateRoute: ['orderService', function (orderService) {
						return orderService.isValidRoute(this.stateName);
					}],
					redirectTo: ['orderService', function (orderService) {
						return orderService.getLastStepRoute();
					}]
				}
			};
			states.orderDeliveryAddress = {
				url: '/deliveryAddress',
				views: {
					'orders': {
						templateUrl: 'app/pages/personal/deliveryAddress/deliveryAddress.html',
						controller: 'deliveryAdressCtrl',
						controllerAs: 'vm',
						title: 'Delivery adress'
					}
				},
				data: {
					stateName: 'shell.personal.order.deliveryAddress',
					breadcrumbs: [{
						name: 'Главная',
						route: 'main'
					},
					{
						name: 'Корзина',
						route: 'cart'
					},
					{
						name: 'Доставка',
						route: 'orderDelivery'
					},
					{
						name: 'Aдрес доставки',
					}],
					validateRoute: ['orderService', function (orderService) {
						return orderService.isValidRoute(this.stateName);
					}],
					redirectTo: ['orderService', function (orderService) {
						return orderService.getLastStepRoute();
					}]
				}
			};
			states.orderConfirm = {
				url: '/confirm',
				views: {
					'orders': {
						templateUrl: 'app/pages/personal/order/confirm/confirm.html',
						controller: 'confirmOrderCtrl',
						controllerAs: 'vm',
						title: 'Order Confirm'
					}
				},
				data: {
					stateName: 'shell.personal.order.confirm',
					breadcrumbs: ['orderService', function (orderService) {
						var breadcrumbs;
						if ( _.find(orderService.getSteps(), { id: 2 })) {
							breadcrumbs = [{
								name: 'Главная',
								route: 'main'
							},
							{
								name: 'Корзина',
								route: 'cart'
							},
							{
								name: 'Доставка',
								route: 'orderDelivery'
							},
							{
								name: 'Адрес доставки',
								route: 'orderDeliveryAddress'
							},
							{
								name: 'Подтверждение',
							}]
						}
						else {
							breadcrumbs = [{
								name: 'Главная',
								route: 'main'
							},
							{
								name: 'Корзина',
								route: 'cart'
							},
							{
								name: 'Доставка',
								route: 'orderDelivery'
							},
							{
								name: 'Подтверждение',
							}]
						}
						return breadcrumbs;
					}],
					validateRoute: ['orderService', function (orderService) {
						return orderService.isValidRoute(this.stateName);
					}],
					redirectTo: ['orderService', function (orderService) {
						return orderService.getLastStepRoute();
					}]
				}
			};
			states.orderPayment = {
				url: '/payment',
				views: {
					'orders': {
						templateUrl: 'app/pages/personal/order/payment/payment.html',
						controller: 'paymentCtrl',
						controllerAs: 'vm',
						title: 'Payment method'
					}
				},
				data: {
					stateName: 'shell.personal.order.payment',
					breadcrumbs: ['orderService', function (orderService) {
						var breadcrumbs = [];
						if (_.find(orderService.getSteps(), { id: 2 })) {
							breadcrumbs = [{
								name: 'Главная',
								route: 'main'
							},
							{
								name: 'Корзина',
								route: 'cart'
							},
							{
								name: 'Доставка',
								route: 'orderDelivery'
							},
							{
								name: 'Адрес доставки',
								route: 'orderDeliveryAddress'
							},
							{
								name: 'Подтверждение',
								route: 'orderConfirm'
							},
							{
								name: 'Оплата',

							}]
						}
						else {
							breadcrumbs = [{
								name: 'Главная',
								route: 'main'
							},
							{
								name: 'Корзина',
								route: 'cart'
							},
							{
								name: 'Доставка',
								route: 'orderDelivery'
							},
							{
								name: 'Подтверждение',
								route: 'orderConfirm'
							},
							{
								name: 'Оплата',

							}]
						}
						return breadcrumbs;
					}],
					validateRoute: ['orderService', function (orderService) {
						return orderService.isValidRoute(this.stateName);
					}],
					redirectTo: ['orderService', function (orderService) {
						return orderService.getLastStepRoute();
					}]
				}
			};
			states.accepted = {
				url: '/accepted',
				views: {
					'personal': {
						templateUrl: 'app/pages/personal/order/accepted/accepted.html',
						controller: 'acceptedOrderCtrl',
						controllerAs: 'vm',
						title: 'Accepted Order'
					}
				},
				data: {
					stateName: 'shell.personal.accepted',
					breadcrumbs: [{
						name: 'Главная',
						route: 'main'
					},
					{
						name: 'Заказ принят',
					}],
					validateRoute: ['orderService', function (orderService) {
						return orderService.isValidRoute(this.stateName);
					}],
					redirectTo: ['orderService', function (orderService) {
						return orderService.getLastStepRoute();
					}]
				}
			};

			return {
				states: states,
				$get: function () {
					return states;
				}
			};
		}])

		.config(function ($stateProvider, $urlRouterProvider, statesProvider) {
			var states = statesProvider.states;
			angular.forEach(states, function (state) {
				$stateProvider.state(state.data.stateName, state);
			});
			$urlRouterProvider.otherwise(function ($injector) {
				$injector.get('$state').go('shell.main');
			});
		});
}());
