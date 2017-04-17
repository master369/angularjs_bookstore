(function () {
	'use strict';

	angular.module('app')
		.controller('remoteModalCtrl', remoteModalCtrl);

		remoteModalCtrl.$inject = ['config', '$modalInstance'];

		function remoteModalCtrl (config, $modalInstance) {
			var vm = this,
				result;
			vm.config = config;
			vm.resolved = false;
			vm.currentState = {
				state: 'pending',
				message: config.messageText.pending
			};

			vm.config.promise
				.then(function(res) {
					result = res.data;
					if(config.equalsBy) {
						if(_.find(res, config.equalsBy)) {
							setState('success');
							return;
						}
						setState('error');
						return;
					}
					setState('success');
				})
				.catch(function() {
					setState('error');
				})
				.finally(function() {
					vm.resolved = true;
				});

			vm.close = function () {
				vm.currentState.state === 'success' ? $modalInstance.close(result) : $modalInstance.dismiss();
			};

			function setState(state) {
				vm.currentState.message = config.messageText[state];
				vm.currentState.state = state;
			}
		}

} ());
