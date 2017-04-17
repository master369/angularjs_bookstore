(function (){
	'use strict';

	angular
		.module('app.common')
		.factory('creditCardService', creditCardService);

	creditCardService.$inject = ['$http', 'urls'];
	function creditCardService($http, urls) {
		return {
			pay: pay
		};

		function pay(card) {
			return $http({
				method: 'POST',
				url: urls.api('pay'),
				data: card
			});
		}
	}

} ());
