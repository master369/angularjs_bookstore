(function () {
    'use strict';

    angular.module('app')
        .controller('modalCtrl', modalCtrl);

        modalCtrl.$inject = ['config', '$modalInstance', '$timeout'];

        function modalCtrl (config, $modalInstance, $timeout) {
            var vm = this;
            vm.config = config;

            init();
            function init() {
                if (config.time) {
                    $timeout(_closeNotify, config.time);
                }
            }

            vm.ok = function () {
                $modalInstance.close();
            };
            vm.cancel = function () {
                $modalInstance.dismiss();
            };

            function _closeNotify() {
                $modalInstance.close();
            }
        }

} ());
