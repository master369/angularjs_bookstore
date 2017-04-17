(function () {
    'use strict';

    angular.module('app')
        .service('breadcrumbsService', breadcrumbsService);
    breadcrumbsService.$inject = ['$state', '$rootScope','$injector'];

    function breadcrumbsService($state, $rootScope, $injector) {

        return {
            updateBreadcrumbsArray: updateBreadcrumbsArray,
        };



        function updateBreadcrumbsArray() {
            var breadcrumbs = [];
            if ($state.$current.data.breadcrumbs !== false && $state.$current.data.breadcrumbs[0] === 'orderService') {
                breadcrumbs = $injector.invoke($state.$current.data.breadcrumbs);
            }
            else if ($state.$current.data.breadcrumbs !== false && $state.$current.data.breadcrumbs[0] !== 'orderService') {
                breadcrumbs = angular.copy($state.$current.data.breadcrumbs);
            }
            else {
                breadcrumbs = [];
            }
            return breadcrumbs;

        }
    };
} ());
