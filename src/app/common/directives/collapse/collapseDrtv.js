(function () {
	'use strict';

	angular
		.module('app')
		.directive('collapse', [function () {
			return {
				restrict: 'E',
				transclude: true,
				scope: {},
				templateUrl: 'app/common/directives/collapse/collapseDrtv.html',
				link: function (scope, elem, attrs) {
					var switcher = elem.find('.collapse-switch'),
						content = elem.find('.collapse');

					if (switcher && content) {
						switcher.bind('click', function () {
							content.toggleClass('in');
						});
					}

					scope.$on('$destroy', function () {
						console.log('asdf');
						if (switcher) {
							switcher.unbind('click');
						}
					});
				}
			};
		}]);
}());
