(function () {
	'use strict';

	angular
		.module('app')
		.constant('enums', {
			TIME_PERIOD: {
				YEAR: 1000 * 60 * 60 * 24 * 30 * 12,
				MONTH: 1000 * 60 * 60 * 24 * 30,
				WEEK: 1000 * 60 * 60 * 24 * 7,
				DAY: 1000 * 60 * 60 * 24
			},
			ORDER_STATE: {
				ACTIVE_STATES: [2, 3, 4, 5, 6],
				COMPLETE: {
					value: 0,
					label: 'Выполнен'
				},
				CANCELED: {
					value: 1,
					label: 'Отменен'
				},
				POST: {
					value: 2,
					label: 'Передан в службу доставки'
				},
				FORMED: {
					value: 3,
					label: 'Сформирован'
				},
				EQUIPMENT: {
					value: 4,
					label: 'Комплектация'
				},
				SENT: {
					value: 5,
					label: 'Отправлен'
				},
				FORMALIZE: {
					value: 6,
					label: 'Оформлен'
				}
			},
			ORDER_DELIVERY_MODE: {
				PICKUP: 0,
				COURIER: 1,
				POST: 2
			},
			PAYMENT_METHOD: {
				RECEIVING: 0,
				PAYMENT: 1
			},
			MESSAGES: {
				EM_022: 'Идет проверка оплаты. Это может занять несколько минут. Пожалуйста, подождите.',
				EM_023: 'Заказ успешно оплачен',
				EM_024: 'Оплата заказа не подтверждена. Воспользуйтесь другой картой или выберите другой способ оплаты'
			},
			MONTHS: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			STATE: {
				CATALOG: 'shell.catalog',
				MAIN: 'shell.main',
				DETAIL: 'shell.detail',
				LOGIN: 'shell.login',
				CART: 'shell.cart',
				PERSONAL: {
					DELIVERY_ADDRESS: 'shell.personal.deliveryAddress',
					CHANGE_PASSWORD: 'shell.personal.changePassword',
					ORDERS: 'shell.personal.orders',
					REGISTRATION_PAGE: 'shell.personal.registrationPage',
					ORDER: {
						DELIVERY: 'shell.personal.order.delivery',
						DELIVERY_ADDRESS: 'shell.personal.order.deliveryAddress',
						CONFIRM: 'shell.personal.order.confirm',
						PAYMENT: 'shell.personal.order.payment',
						ACCEPTED: 'shell.personal.accepted'
					}
				}
			},
			PAGINATION: {
				page: 0,
				pageSize: 15
			},
			ORDER_STEPS: {
				delivery: {
					id: 1,
					route: 'shell.personal.order.delivery'
				},
				deliveryAddress: {
					id: 2,
					route: 'shell.personal.order.deliveryAddress'
				},
				confirm: {
					id: 3,
					route: 'shell.personal.order.confirm'
				},
				payment: {
					id: 4,
					route: 'shell.personal.order.payment'
				},
				accepted: {
					id: 5,
					route: 'shell.personal.accepted'
				}
			},
			keyCode: {
				enter: 13
			}
		});
}());
