(function () {
	'use strict';
	angular.module('app.common')
		.factory('messageService', messageService);

	messageService.$inject = ['$q', 'modalService'];

	function messageService($q, modalService) {
		var MODAL_TYPES = {
			CONFIRM: 'MODAL_CONFIRM',
			INFORM: 'MODAL_INFORM',
			ERROR: 'MODAL_ERROR',
			REMOTE: 'MODAL_REMOTE'
		}

		return {
			inform: _inform,
			confirm: _confirm,
			error: _error,
			remote: _remote,
			notifyInform: _notifyInform,
			notifyConfirm: _notifyConfirm,
			notifyError: _notifyError
		};

		function _showMessage(title, message, type, promise, equalsBy) {
			var config = {
				headerText: title,
				messageText: message,
				btnActionText: 'OK',
				size: 'md',
				resolve: {
					config: function () {
						return config;
					}
				}
			}

			switch (type) {
				case MODAL_TYPES.CONFIRM:
					config.templateUrl = 'app/common/partials/messages/modal/confirm.html';
					config.btnActionText = 'OK';
					break;
				case MODAL_TYPES.CONFIRM:
					config.templateUrl = 'app/common/partials/messages/modal/inform.html';
					break;
				case MODAL_TYPES.ERROR:
					config.templateUrl = 'app/common/partials/messages/modal/error.html';
					break;
				case MODAL_TYPES.REMOTE:
					config.backdrop = 'static';
					config.controller = 'remoteModalCtrl';
					config.templateUrl = 'app/common/partials/messages/modal/remote.html';
					config.promise = promise;
					config.equalsBy = equalsBy;
					break;

				default:
					config.templateUrl = 'app/common/partials/messages/modal/inform.html';
					break;
			}

			return modalService.showModal(config);
		}

		function _showNotify(message, type) {
			var config = {
				messageText: message,
				size: 'sm',
				backdropClass: 'modal-layout',
				windowClass: 'window-modal',
				time: 3000,
				resolve: {
					config: function () {
						return config;
					}
				}
			}

			switch (type) {
				case MODAL_TYPES.CONFIRM:
					config.templateUrl = 'app/common/partials/messages/notify/confirm.html';
					break;
				case MODAL_TYPES.CONFIRM:
					config.templateUrl = 'app/common/partials/messages/notify/inform.html';
					break;
				case MODAL_TYPES.ERROR:
					config.templateUrl = 'app/common/partials/messages/notify/error.html';
					break;

				default:
					config.templateUrl = 'app/common/partials/messages/notify/inform.html';
					break;
			}

			return modalService.showModal(config);
		}

		// message
		function _inform(title, message) {
			return _showMessage(title, message, MODAL_TYPES.INFORM);
		}
		function _confirm(title, message) {
			return _showMessage(title, message, MODAL_TYPES.CONFIRM);
		}
		function _error(title, message) {
			return _showMessage(title, message, MODAL_TYPES.ERROR);
		}
		function _remote(title, messages, promise, equalsBy) {
			return _showMessage(title, messages, MODAL_TYPES.REMOTE, promise, equalsBy);
		}

		// notify
		function _notifyInform(message) {
			return _showNotify(message, MODAL_TYPES.INFORM).result
				.then(function (response) {
					return $q.when(response);
				})
				.catch(function (reason) {
					return $q.reject(reason);
				});
		}
		function _notifyConfirm(message) {
			return _showNotify(message, MODAL_TYPES.CONFIRM).result
				.then(function (response) {
					return $q.when(response);
				})
				.catch(function (reason) {
					return $q.reject(reason);
				});
		}
		function _notifyError(message) {
			return _showNotify(message, MODAL_TYPES.ERROR).result
				.then(function (response) {
					return $q.when(response);
				})
				.catch(function (reason) {
					return $q.reject(reason);
				});
		}
	}
}());

