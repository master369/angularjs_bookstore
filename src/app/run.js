(function () {
	'use strict';

	angular
		.module('app')
		.run(run);

	run.$inject = ['authGuard', '$rootScope', '$injector', '$state'];

	function run(authGuard, $rootScope, $injector, $state) {
		var onChangeStart;
		//  guards init
		authGuard.init();

		// ============================
		// Verifying access permissions
		// ============================
		onChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			if(toState.data.validateRoute) {
				if(!$injector.invoke(toState.data.validateRoute, {stateName: toState.name})) {
					event.preventDefault();
					$state.go($injector.invoke(toState.data.redirectTo));
				}
			}
		});

		$rootScope.$on('$destroy', function(){
			onChangeStart();
		});
	}
}());
