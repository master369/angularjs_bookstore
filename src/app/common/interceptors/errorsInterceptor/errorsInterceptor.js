(function() {
	'use strict';

	angular
		.module('app.common')
		.factory('errorsInterceptor', errorsInterceptor);

	errorsInterceptor.$inject = ['$q', '$injector'];

	function errorsInterceptor($q, $injector) {
		var intercep = {},
			messageService,
			messages = {
				'unknown': 'Неизвестная ошибка',
				'400': 'Неверный запрос',
				'401': 'Не авторизован',
				'403': 'Запрещено',
				'404': 'Страница не найдена',
				'500': 'Внутренняя ошибка сервера',
				'503': 'Сервис недоступен'
			};

		intercep.responseError = function(response) {
			var statusCode = response.status,
				message = messages[statusCode] || (response.statusText.length > 0 ? response.statusText : messages.unknown);
			messageService = messageService || $injector.get('messageService');
			messageService.error('Ошибка запроса', message);
			return $q.reject(response);
		};

		return intercep;
	}

}());
